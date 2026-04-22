const GOOGLE_NEWS_RSS_BASE = "https://news.google.com/rss/search";
const MAX_ITEMS_PER_SCOPE = 4;

const SCOPE_QUERIES = [
  {
    scopeType: "account",
    scopeSlug: "boa",
    queries: ["Bank of America fraud AML AI cloud", "Bank of America earnings fraud risk"]
  },
  {
    scopeType: "account",
    scopeSlug: "state-farm",
    queries: ["State Farm insurance claims AI analytics", "State Farm underwriting catastrophe digital"]
  },
  {
    scopeType: "account",
    scopeSlug: "capital-one",
    queries: ["Capital One fraud AML KYC procurement risk", "Capital One banking fraud trust security"]
  },
  {
    scopeType: "account",
    scopeSlug: "jnj",
    queries: ["Johnson & Johnson manufacturing R&D medtech supply chain", "Johnson & Johnson pharma quality digital"]
  },
  {
    scopeType: "account",
    scopeSlug: "eli-lilly",
    queries: ["Eli Lilly manufacturing quality AI digital MQ", "Eli Lilly pharma expansion supply chain"]
  },
  {
    scopeType: "industry",
    scopeSlug: "financial-services",
    queries: ["financial services fraud AML banking insurance AI risk", "banking insurance modernization trust procurement"]
  },
  {
    scopeType: "industry",
    scopeSlug: "life-sciences",
    queries: ["life sciences manufacturing quality pharma AI digital", "pharma medtech supply chain manufacturing readiness"]
  },
  {
    scopeType: "industry",
    scopeSlug: "tech",
    queries: ["technology AI platform cloud product layoffs investment", "tech product AI platform efficiency security"]
  },
  {
    scopeType: "industry",
    scopeSlug: "telecom",
    queries: ["telecom network modernization customer experience infrastructure", "telecom operations infrastructure cost modernization"]
  }
];

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
}

function escapeQuery(value) {
  return encodeURIComponent(value);
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function parseRssItems(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);
  return items.map((item) => {
    const getTag = (tag) => {
      const matched = item.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
      return matched ? stripHtml(matched[1]) : "";
    };

    const sourceMatch = item.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
    return {
      title: getTag("title"),
      link: getTag("link"),
      pubDate: getTag("pubDate"),
      description: getTag("description"),
      source: sourceMatch ? stripHtml(sourceMatch[1]) : "News source"
    };
  });
}

async function fetchNewsItemsForQuery(query) {
  const url = `${GOOGLE_NEWS_RSS_BASE}?q=${escapeQuery(query)}&hl=en-US&gl=US&ceid=US:en`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`News feed fetch failed for "${query}": ${response.status}`);
  }
  const xml = await response.text();
  return parseRssItems(xml);
}

function dedupeItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.title}|${item.link}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function summarizeDescription(item) {
  const base = item.description || item.title;
  return base.length > 220 ? `${base.slice(0, 217)}...` : base;
}

function buildWhyItMatters(scopeSlug, item) {
  const text = `${item.title} ${item.description}`.toLowerCase();
  if (scopeSlug === "state-farm" || text.includes("claims") || text.includes("underwriting")) {
    return "This matters because it points to live operational pressure where a practical staffing, claims, or data-support narrative will feel immediately relevant.";
  }
  if (text.includes("ai") || text.includes("analytics") || text.includes("data")) {
    return "This matters because it shows where the conversation is moving from interest to real implementation pressure, which is where strategic guidance becomes useful.";
  }
  if (text.includes("fraud") || text.includes("aml") || text.includes("trust") || text.includes("risk")) {
    return "This matters because it reinforces that credibility, control, and risk-safe execution are still shaping how decisions get made.";
  }
  if (text.includes("manufacturing") || text.includes("quality") || text.includes("supply chain")) {
    return "This matters because it ties strategy back to readiness, continuity, and throughput in environments where execution quality is everything.";
  }
  return "This matters because it changes the context around urgency, stakeholder pressure, and what kind of recommendation will sound most strategic in the room.";
}

function buildResponse(scopeSlug, item) {
  const text = `${item.title} ${item.description}`.toLowerCase();
  if (scopeSlug === "financial-services" || text.includes("fraud") || text.includes("aml")) {
    return "Lead with a tighter trust-and-control POV, then bring one proof point that makes the next step feel more defensible.";
  }
  if (scopeSlug === "life-sciences" || text.includes("manufacturing") || text.includes("quality")) {
    return "Anchor your response in readiness, throughput, and execution continuity rather than broad innovation language.";
  }
  if (scopeSlug === "tech") {
    return "Translate this into a clearer future POV around product velocity, AI practicality, and efficient execution support.";
  }
  if (scopeSlug === "telecom") {
    return "Use this as a pattern signal around modernization, simplification, and reliability rather than abstract transformation.";
  }
  return "Turn this into a sharper talk track, a narrower point of view, and one practical next action for sales or stakeholders.";
}

function buildPainTitle(scopeSlug, item) {
  const text = `${item.title} ${item.description}`.toLowerCase();
  if (text.includes("fraud") || text.includes("aml")) {
    return "Risk, fraud, and control pressure remain central to the buying conversation.";
  }
  if (text.includes("claims") || text.includes("underwriting")) {
    return "Operational pressure in claims and underwriting keeps practical support highly relevant.";
  }
  if (text.includes("manufacturing") || text.includes("quality")) {
    return "Execution pressure around readiness, quality, and continuity is still shaping urgency.";
  }
  if (text.includes("ai") || text.includes("data") || text.includes("analytics")) {
    return "AI and data momentum still need clearer governance, execution support, and practical business value.";
  }
  if (scopeSlug === "tech") {
    return "Innovation pressure and efficiency pressure are happening at the same time.";
  }
  if (scopeSlug === "telecom") {
    return "Modernization has to feel like simplification and reliability, not just change.";
  }
  return "The market is still rewarding clearer, more practical narratives than broad transformation language.";
}

function toExternalId(scopeType, scopeSlug, itemType, item) {
  return `${scopeType}:${scopeSlug}:${itemType}:${item.link || item.title}`.slice(0, 500);
}

async function upsertSupabaseRows({ url, serviceRoleKey, table, onConflict, rows }) {
  if (!rows.length) return;
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
    throw new Error(`Supabase ${table} upsert failed: ${response.status} ${await response.text()}`);
  }
}

async function updateIntegrationStatus({ url, serviceRoleKey, status, summary }) {
  const response = await fetch(`${url}/rest/v1/integration_settings?integration_name=eq.Market Intelligence`, {
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
    throw new Error(`Integration status update failed: ${response.status} ${await response.text()}`);
  }
}

exports.handler = async function handler() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return json(500, { ok: false, message: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY." });
  }

  try {
    const results = [];
    const rows = [];

    for (const scope of SCOPE_QUERIES) {
      const fetchedGroups = await Promise.all(scope.queries.map((query) => fetchNewsItemsForQuery(query)));
      const deduped = dedupeItems(fetchedGroups.flat()).slice(0, MAX_ITEMS_PER_SCOPE);

      deduped.forEach((item, index) => {
        const publishedAt = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
        rows.push({
          external_id: toExternalId(scope.scopeType, scope.scopeSlug, "signal", item),
          scope_type: scope.scopeType,
          scope_slug: scope.scopeSlug,
          item_type: "signal",
          title: item.title,
          summary: summarizeDescription(item),
          why_it_matters: buildWhyItMatters(scope.scopeSlug, item),
          response: buildResponse(scope.scopeSlug, item),
          source_label: item.source || "News source",
          source_url: item.link || "",
          published_at: publishedAt,
          refreshed_at: new Date().toISOString()
        });

        rows.push({
          external_id: toExternalId(scope.scopeType, scope.scopeSlug, "pain", { ...item, title: `${index + 1}-${item.title}` }),
          scope_type: scope.scopeType,
          scope_slug: scope.scopeSlug,
          item_type: "pain",
          title: buildPainTitle(scope.scopeSlug, item),
          summary: summarizeDescription(item),
          why_it_matters: buildWhyItMatters(scope.scopeSlug, item),
          response: buildResponse(scope.scopeSlug, item),
          source_label: item.source || "News source",
          source_url: item.link || "",
          published_at: publishedAt,
          refreshed_at: new Date().toISOString()
        });
      });

      results.push({ scope: `${scope.scopeType}:${scope.scopeSlug}`, items: deduped.length });
    }

    await Promise.all([
      upsertSupabaseRows({
        url: supabaseUrl,
        serviceRoleKey: supabaseServiceRoleKey,
        table: "market_watch_items",
        onConflict: "external_id",
        rows
      }),
      updateIntegrationStatus({
        url: supabaseUrl,
        serviceRoleKey: supabaseServiceRoleKey,
        status: "Connected",
        summary: "Live market and news signals are syncing into account and industry war rooms."
      })
    ]);

    return json(200, {
      ok: true,
      scopesProcessed: results,
      totalRowsUpserted: rows.length
    });
  } catch (error) {
    return json(500, { ok: false, message: error.message });
  }
};
