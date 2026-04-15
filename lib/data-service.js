import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { sampleData } from "../data/sample-data.js";
import { supabaseConfig } from "../data/supabase-config.js";

const STORAGE_KEY = "amenitra-command-center-state";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getStoredState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function saveLocalState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createFallbackState() {
  const saved = getStoredState();
  return saved || clone(sampleData);
}

function isSupabaseConfigured() {
  return Boolean(supabaseConfig.enabled && supabaseConfig.url && supabaseConfig.anonKey);
}

function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  return createClient(supabaseConfig.url, supabaseConfig.anonKey);
}

function mergeRelationships({ accounts, stakeholders, signals, reminders, channels, plays, developments, contentAssets, contentAssetChannels, goals, tasks, launches, leadershipPrompts, automationSources }) {
  const mergedAccounts = accounts.map((account) => ({
    id: account.slug,
    name: account.name,
    industry: account.industry_name || "Unknown",
    target: account.revenue_target || "",
    stakeholders: stakeholders.filter((item) => item.account_slug === account.slug).map((item) => item.name),
    focus: account.focus || "",
    status: account.status || "",
    marketPosition: account.market_position || "",
    consultantPositioning: account.consultant_positioning || "",
    reminders: reminders.filter((item) => item.account_slug === account.slug).map((item) => item.note),
    signals: signals
      .filter((item) => item.account_slug === account.slug)
      .map((item) => ({
        title: item.title,
        detail: item.detail,
        sourceLabel: item.source_label || "Source",
        sourceUrl: item.source_url || "#"
      })),
    notes: [
      account.focus || "Account focus coming soon",
      account.market_position || "Market position coming soon",
      account.consultant_positioning || "Consultant positioning coming soon"
    ].filter(Boolean)
  }));

  const mergedChannels = channels.map((channel) => ({
    id: channel.slug,
    name: channel.name,
    idea: channel.strategy || "",
    plays: plays.filter((item) => item.channel_slug === channel.slug).map((item) => item.play),
    developments: developments.filter((item) => item.channel_slug === channel.slug).map((item) => item.note)
  }));

  const mergedContentAssets = contentAssets.map((asset) => ({
    id: asset.slug,
    title: asset.title,
    industry: asset.industry || "",
    link: asset.link || "#",
    status: asset.status || "",
    channels: contentAssetChannels.filter((item) => item.content_asset_slug === asset.slug).map((item) => item.channel_name),
    score: asset.activation_score || "",
    gap: asset.gap_note || ""
  }));

  return {
    ...clone(sampleData),
    accounts: mergedAccounts.length ? mergedAccounts : clone(sampleData.accounts),
    channels: mergedChannels.length ? mergedChannels : clone(sampleData.channels),
    contentAssets: mergedContentAssets.length ? mergedContentAssets : clone(sampleData.contentAssets),
    goals: goals.length
      ? goals.map((item) => ({ title: item.title, progress: item.progress || "", detail: item.detail || "" }))
      : clone(sampleData.goals),
    tasks: tasks.length
      ? tasks.map((item) => ({
          id: item.id,
          title: item.title,
          due: item.due_label || "",
          priority: item.priority || "",
          source: item.source || "",
          status: item.status || ""
        }))
      : clone(sampleData.tasks),
    launches: launches.length
      ? launches.map((item) => ({
          id: item.id,
          title: item.title,
          phase: item.phase || "",
          owner: item.owner || "",
          note: item.note || ""
        }))
      : clone(sampleData.launches),
    leadershipPrompts: leadershipPrompts.length
      ? leadershipPrompts.map((item) => ({ title: item.title, detail: item.detail || "" }))
      : clone(sampleData.leadershipPrompts),
    automationStatus: automationSources.length
      ? automationSources.map((item) => ({ source: item.source_name, status: item.status || "", note: item.note || "" }))
      : clone(sampleData.automationStatus)
  };
}

async function loadSupabaseState() {
  const client = getSupabaseClient();
  if (!client) {
    return { state: createFallbackState(), mode: "local" };
  }

  try {
    const [
      industriesResult,
      accountsResult,
      stakeholdersResult,
      signalsResult,
      remindersResult,
      channelsResult,
      playsResult,
      developmentsResult,
      contentAssetsResult,
      contentAssetChannelsResult,
      goalsResult,
      tasksResult,
      launchesResult,
      leadershipResult,
      automationResult
    ] = await Promise.all([
      client.from("industries").select("id, name"),
      client.from("accounts").select("id, slug, name, revenue_target, status, focus, market_position, consultant_positioning, industry_id"),
      client.from("account_stakeholders").select("name, account_id"),
      client.from("account_signals").select("title, detail, source_label, source_url, account_id"),
      client.from("account_reminders").select("note, account_id"),
      client.from("channels").select("slug, name, strategy, id"),
      client.from("channel_plays").select("play, channel_id"),
      client.from("channel_developments").select("note, channel_id"),
      client.from("content_assets").select("slug, title, industry, link, status, activation_score, gap_note, id"),
      client.from("content_asset_channels").select("channel_name, content_asset_id"),
      client.from("goals").select("title, progress, detail"),
      client.from("tasks").select("id, title, due_label, priority, source, status"),
      client.from("launches").select("id, title, phase, owner, note"),
      client.from("leadership_prompts").select("title, detail"),
      client.from("automation_sources").select("source_name, status, note")
    ]);

    const errors = [
      industriesResult.error,
      accountsResult.error,
      stakeholdersResult.error,
      signalsResult.error,
      remindersResult.error,
      channelsResult.error,
      playsResult.error,
      developmentsResult.error,
      contentAssetsResult.error,
      contentAssetChannelsResult.error,
      goalsResult.error,
      tasksResult.error,
      launchesResult.error,
      leadershipResult.error,
      automationResult.error
    ].filter(Boolean);

    if (errors.length) {
      throw new Error(errors.map((item) => item.message).join(" | "));
    }

    const industries = industriesResult.data || [];
    const accounts = (accountsResult.data || []).map((account) => ({
      ...account,
      industry_name: industries.find((industry) => industry.id === account.industry_id)?.name
    }));

    const accountSlugById = Object.fromEntries((accountsResult.data || []).map((item) => [item.id, item.slug]));
    const channelSlugById = Object.fromEntries((channelsResult.data || []).map((item) => [item.id, item.slug]));
    const contentSlugById = Object.fromEntries((contentAssetsResult.data || []).map((item) => [item.id, item.slug]));

    const mergedState = mergeRelationships({
      accounts,
      stakeholders: (stakeholdersResult.data || []).map((item) => ({
        name: item.name,
        account_slug: accountSlugById[item.account_id]
      })),
      signals: (signalsResult.data || []).map((item) => ({
        ...item,
        account_slug: accountSlugById[item.account_id]
      })),
      reminders: (remindersResult.data || []).map((item) => ({
        ...item,
        account_slug: accountSlugById[item.account_id]
      })),
      channels: channelsResult.data || [],
      plays: (playsResult.data || []).map((item) => ({
        ...item,
        channel_slug: channelSlugById[item.channel_id]
      })),
      developments: (developmentsResult.data || []).map((item) => ({
        ...item,
        channel_slug: channelSlugById[item.channel_id]
      })),
      contentAssets: contentAssetsResult.data || [],
      contentAssetChannels: (contentAssetChannelsResult.data || []).map((item) => ({
        ...item,
        content_asset_slug: contentSlugById[item.content_asset_id]
      })),
      goals: goalsResult.data || [],
      tasks: tasksResult.data || [],
      launches: launchesResult.data || [],
      leadershipPrompts: leadershipResult.data || [],
      automationSources: automationResult.data || []
    });

    saveLocalState(mergedState);
    return { state: mergedState, mode: "supabase" };
  } catch (error) {
    console.error("Supabase load failed, falling back to local mode.", error);
    return { state: createFallbackState(), mode: "local" };
  }
}

async function updateAccountInSupabase(client, account) {
  const accountLookup = await client.from("accounts").select("id").eq("slug", account.id).maybeSingle();
  const accountId = accountLookup.data?.id;

  if (!accountId) {
    throw new Error(`Account not found in Supabase for slug ${account.id}`);
  }

  await client
    .from("accounts")
    .update({
      revenue_target: account.target,
      focus: account.focus,
      market_position: account.marketPosition,
      consultant_positioning: account.consultantPositioning,
      updated_at: new Date().toISOString()
    })
    .eq("id", accountId);

  const stakeholdersDelete = await client.from("account_stakeholders").delete().eq("account_id", accountId);
  const remindersDelete = await client.from("account_reminders").delete().eq("account_id", accountId);

  if (stakeholdersDelete.error || remindersDelete.error) {
    throw new Error([stakeholdersDelete.error?.message, remindersDelete.error?.message].filter(Boolean).join(" | "));
  }

  if (account.stakeholders.length) {
    const stakeholdersInsert = await client.from("account_stakeholders").insert(
      account.stakeholders.map((name) => ({
        account_id: accountId,
        name
      }))
    );

    if (stakeholdersInsert.error) {
      throw new Error(stakeholdersInsert.error.message);
    }
  }

  if (account.reminders.length) {
    const remindersInsert = await client.from("account_reminders").insert(
      account.reminders.map((note) => ({
        account_id: accountId,
        note
      }))
    );

    if (remindersInsert.error) {
      throw new Error(remindersInsert.error.message);
    }
  }
}

async function updateChannelInSupabase(client, channel) {
  const channelLookup = await client.from("channels").select("id").eq("slug", channel.id).maybeSingle();
  const channelId = channelLookup.data?.id;

  if (!channelId) {
    throw new Error(`Channel not found in Supabase for slug ${channel.id}`);
  }

  await client
    .from("channels")
    .update({
      strategy: channel.idea,
      updated_at: new Date().toISOString()
    })
    .eq("id", channelId);

  const playsDelete = await client.from("channel_plays").delete().eq("channel_id", channelId);
  const developmentsDelete = await client.from("channel_developments").delete().eq("channel_id", channelId);

  if (playsDelete.error || developmentsDelete.error) {
    throw new Error([playsDelete.error?.message, developmentsDelete.error?.message].filter(Boolean).join(" | "));
  }

  if (channel.plays.length) {
    const playsInsert = await client.from("channel_plays").insert(
      channel.plays.map((play) => ({
        channel_id: channelId,
        play
      }))
    );

    if (playsInsert.error) {
      throw new Error(playsInsert.error.message);
    }
  }

  if (channel.developments.length) {
    const developmentsInsert = await client.from("channel_developments").insert(
      channel.developments.map((note) => ({
        channel_id: channelId,
        note
      }))
    );

    if (developmentsInsert.error) {
      throw new Error(developmentsInsert.error.message);
    }
  }
}

async function updateContentAssetInSupabase(client, asset) {
  const assetLookup = await client.from("content_assets").select("id").eq("slug", asset.id).maybeSingle();
  const assetId = assetLookup.data?.id;

  if (!assetId) {
    throw new Error(`Content asset not found in Supabase for slug ${asset.id}`);
  }

  await client
    .from("content_assets")
    .update({
      status: asset.status,
      activation_score: asset.score,
      gap_note: asset.gap,
      updated_at: new Date().toISOString()
    })
    .eq("id", assetId);

  const channelsDelete = await client.from("content_asset_channels").delete().eq("content_asset_id", assetId);
  if (channelsDelete.error) {
    throw new Error(channelsDelete.error.message);
  }

  if (asset.channels.length) {
    const channelsInsert = await client.from("content_asset_channels").insert(
      asset.channels.map((channelName) => ({
        content_asset_id: assetId,
        channel_name: channelName
      }))
    );

    if (channelsInsert.error) {
      throw new Error(channelsInsert.error.message);
    }
  }
}

export async function loadAppState() {
  return loadSupabaseState();
}

export async function persistAppState(state, type, entityId) {
  saveLocalState(state);

  const client = getSupabaseClient();
  if (!client) {
    return { ok: true, mode: "local" };
  }

  try {
    if (type === "account") {
      const account = state.accounts.find((item) => item.id === entityId);
      if (account) {
        await updateAccountInSupabase(client, account);
      }
    }

    if (type === "channel") {
      const channel = state.channels.find((item) => item.id === entityId);
      if (channel) {
        await updateChannelInSupabase(client, channel);
      }
    }

    if (type === "content") {
      const asset = state.contentAssets.find((item) => item.id === entityId);
      if (asset) {
        await updateContentAssetInSupabase(client, asset);
      }
    }

    return { ok: true, mode: "supabase" };
  } catch (error) {
    console.error("Supabase save failed, changes remain local.", error);
    return { ok: false, mode: "local", error };
  }
}

export function resetToSeed() {
  const fresh = clone(sampleData);
  saveLocalState(fresh);
  return fresh;
}

export function getConnectionModeLabel(mode) {
  return mode === "supabase" ? "Supabase Connected" : "Local Preview Mode";
}
