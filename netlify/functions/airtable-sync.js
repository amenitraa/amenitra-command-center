const INDUSTRY_CAMPAIGN_TABLE = "Industry Campaign";
const TASKS_TABLE = "Tasks";
const INDUSTRY_RECORD_NAMES = new Set([
  "Financial Services Campaign",
  "Life Sciences & Pharma Campaign",
  "New Logo: Eli Lilly (Life Sciences)",
  "New Logo: Capital One (FS)",
  "New Logo: State Farm (FS)"
]);

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}

function normalizeAirtableValue(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item && typeof item === "object") {
          return item.name || item.email || item.id || "";
        }
        return item || "";
      })
      .filter(Boolean)
      .join(", ");
  }

  if (value && typeof value === "object") {
    return value.name || value.email || value.id || "";
  }

  return value || "";
}

function parseProgress(value) {
  const raw = normalizeAirtableValue(value);
  const match = String(raw).match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function resolveAccountSlug(text) {
  const value = String(text || "").toLowerCase();

  if (value.includes("state farm")) {
    return "state-farm";
  }

  if (value.includes("capital one")) {
    return "capital-one";
  }

  if (value.includes("eli lilly")) {
    return "eli-lilly";
  }

  if (value.includes("bank of america")) {
    return "boa";
  }

  if (value.includes("johnson") || value.includes("j&j")) {
    return "jnj";
  }

  return null;
}

function buildLaunchNote(fields) {
  const parts = [
    normalizeAirtableValue(fields["Marketing Priorities"]),
    normalizeAirtableValue(fields["Project Manager"]) ? `PM: ${normalizeAirtableValue(fields["Project Manager"])}` : "",
    normalizeAirtableValue(fields["Stakeholders"]) ? `Stakeholders: ${normalizeAirtableValue(fields["Stakeholders"])}` : ""
  ].filter(Boolean);

  return parts.join(" • ");
}

function formatDateLabel(value) {
  if (!value) {
    return "";
  }

  return String(value);
}

function isUpcoming(dateValue, daysAhead = 45) {
  if (!dateValue) {
    return false;
  }

  const today = new Date();
  const due = new Date(dateValue);
  const diff = due.getTime() - today.getTime();
  const dayMs = 1000 * 60 * 60 * 24;
  return diff >= 0 && diff <= dayMs * daysAhead;
}

function isAmenitraTask(fields) {
  return normalizeAirtableValue(fields.Assignee).toLowerCase().includes("amenitra");
}

function isRelevantTask(fields) {
  return (
    isAmenitraTask(fields) ||
    isUpcoming(fields["Due Date"]) ||
    Boolean(resolveAccountSlug(fields.Task)) ||
    /financial services|life sciences|state farm|capital one|eli lilly/i.test(String(fields.Task || ""))
  );
}

async function fetchAirtableRecords({ token, baseId, tableName }) {
  const records = [];
  let offset = "";

  do {
    const url = new URL(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`);
    if (offset) {
      url.searchParams.set("offset", offset);
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Airtable ${tableName} fetch failed: ${response.status} ${message}`);
    }

    const payload = await response.json();
    records.push(...(payload.records || []));
    offset = payload.offset || "";
  } while (offset);

  return records;
}

async function fetchSupabaseAccounts({ url, serviceRoleKey }) {
  const response = await fetch(`${url}/rest/v1/accounts?select=id,slug`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase accounts fetch failed: ${response.status} ${message}`);
  }

  const rows = await response.json();
  return Object.fromEntries(rows.map((row) => [row.slug, row.id]));
}

async function upsertSupabaseRows({ url, serviceRoleKey, table, onConflict, rows }) {
  if (!rows.length) {
    return;
  }

  const endpoint = new URL(`${url}/rest/v1/${table}`);
  if (onConflict) {
    endpoint.searchParams.set("on_conflict", onConflict);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "resolution=merge-duplicates"
    },
    body: JSON.stringify(rows)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase ${table} upsert failed: ${response.status} ${message}`);
  }
}

async function updateIntegrationStatus({ url, serviceRoleKey, status, summary }) {
  const response = await fetch(`${url}/rest/v1/integration_settings?integration_name=eq.Airtable`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`
    },
    body: JSON.stringify({
      status,
      config_summary: summary,
      last_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Integration status update failed: ${response.status} ${message}`);
  }
}

exports.handler = async function handler() {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!token || !baseId || !supabaseUrl || !supabaseServiceRoleKey) {
    return json(500, {
      ok: false,
      message: "Missing AIRTABLE_TOKEN, AIRTABLE_BASE_ID, SUPABASE_URL, or SUPABASE_SERVICE_ROLE_KEY."
    });
  }

  try {
    const [industryRecords, taskRecords, accountIdBySlug] = await Promise.all([
      fetchAirtableRecords({ token, baseId, tableName: INDUSTRY_CAMPAIGN_TABLE }),
      fetchAirtableRecords({ token, baseId, tableName: TASKS_TABLE }),
      fetchSupabaseAccounts({ url: supabaseUrl, serviceRoleKey: supabaseServiceRoleKey })
    ]);

    const scopedIndustryRecords = industryRecords.filter((record) =>
      INDUSTRY_RECORD_NAMES.has(normalizeAirtableValue(record.fields["Project Name"]))
    );

    const scopedTaskRecords = taskRecords.filter((record) => isRelevantTask(record.fields));

    const launches = scopedIndustryRecords.map((record) => {
      const fields = record.fields;
      const title = normalizeAirtableValue(fields["Project Name"]);
      const owner = normalizeAirtableValue(fields.Owner) || normalizeAirtableValue(fields["Project Manager"]);
      const accountSlug = resolveAccountSlug(title);

      return {
        external_id: `airtable:industry-campaign:${record.id}`,
        title,
        phase: normalizeAirtableValue(fields.Status) || "Open",
        owner,
        note: buildLaunchNote(fields),
        kickoff_date: fields.Kickoff || null,
        due_date: fields["Due Date"] || null,
        progress_percent: parseProgress(fields["Task progress"]),
        account_slug: accountSlug,
        sync_source: "Airtable"
      };
    });

    const tasks = scopedTaskRecords.map((record) => {
      const fields = record.fields;
      const title = normalizeAirtableValue(fields.Task);
      const accountSlug = resolveAccountSlug(title);
      const teamFunction = normalizeAirtableValue(fields["Team Function"]);
      const assignedTo = normalizeAirtableValue(fields.Assignee);

      return {
        external_id: `airtable:tasks:${record.id}`,
        title,
        due_label: formatDateLabel(fields["Due Date"]),
        priority: teamFunction || (isAmenitraTask(fields) ? "Assigned to me" : "Upcoming"),
        source: "Airtable",
        status: normalizeAirtableValue(fields.Status) || "Open",
        assigned_to: assignedTo,
        start_date: fields["Start Date"] || null,
        team_function: teamFunction,
        task_link: normalizeAirtableValue(fields["Task Link(s)"]) || null,
        account_slug: accountSlug,
        sync_source: "Airtable"
      };
    });

    await Promise.all([
      upsertSupabaseRows({
        url: supabaseUrl,
        serviceRoleKey: supabaseServiceRoleKey,
        table: "launches",
        onConflict: "external_id",
        rows: launches
      }),
      upsertSupabaseRows({
        url: supabaseUrl,
        serviceRoleKey: supabaseServiceRoleKey,
        table: "tasks",
        onConflict: "external_id",
        rows: tasks
      }),
      updateIntegrationStatus({
        url: supabaseUrl,
        serviceRoleKey: supabaseServiceRoleKey,
        status: "Connected",
        summary: `Syncing ${INDUSTRY_CAMPAIGN_TABLE} and ${TASKS_TABLE} from Airtable into Supabase.`
      })
    ]);

    return json(200, {
      ok: true,
      launchesSynced: launches.length,
      tasksSynced: tasks.length,
      industryRecordsChecked: industryRecords.length,
      taskRecordsChecked: taskRecords.length,
      filteredCampaignRows: scopedIndustryRecords.map((record) => normalizeAirtableValue(record.fields["Project Name"]))
    });
  } catch (error) {
    return json(500, {
      ok: false,
      message: error.message
    });
  }
};
