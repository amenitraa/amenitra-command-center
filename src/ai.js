// AI Integration — uses OpenAI GPT-4o
// Add VITE_OPENAI_API_KEY to your Netlify environment variables

const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function callAI(systemPrompt, userMessage) {
  if (!OPENAI_KEY) {
    return "AI is not configured. Add your VITE_OPENAI_API_KEY in Netlify → Site Settings → Environment Variables.";
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    const data = await res.json();

    if (data.error) {
      console.error("OpenAI error:", data.error);
      return `AI error: ${data.error.message}`;
    }

    return data.choices?.[0]?.message?.content || "No response generated.";
  } catch (err) {
    console.error("AI call failed:", err);
    return "AI is unavailable right now — check your API key and try again.";
  }
}

// Pre-built prompts for different features
export const PROMPTS = {
  accountIntel: (account) => ({
    system: "You are Amenitra's AI marketing strategist at Insight Global. Generate strategic intelligence for this account. Be specific and actionable. Include competitive moves, industry signals with sources, and consultant-ready meeting prep. Always cite your sources with links when referencing news or data.",
    user: `Account: ${account.name}\nIndustry: ${account.ind}\nRevenue Target: ${account.rev}\nStatus: ${account.st}\nMarket Position: ${account.mp}\nPain Points: ${account.pains?.join("; ")}\nGoals: ${account.goals?.join("; ")}\nCurrent Strategy: ${account.strat}\n\nGenerate:\n1. WHAT'S HAPPENING NOW — real news, acquisitions, leadership changes, new initiatives at ${account.name}. Include source links.\n2. COMPETITIVE LANDSCAPE — who else is embedded, what are they doing\n3. STRATEGIC SHIFTS — what should Amenitra recommend this week\n4. CONSULTANT POSITIONING — how to show up in the next meeting\n5. REMINDERS — things to bring up based on the account's current situation`
  }),

  accountNews: (account) => ({
    system: "You are a market intelligence analyst. Find the latest real news, developments, acquisitions, leadership changes, and strategic initiatives for this company. Always include source names and be specific about dates. Format each item with a bullet point.",
    user: `Find the latest news and developments for ${account.name} in the ${account.ind} industry. I need:\n1. Recent news (last 30 days)\n2. Any new acquisitions or partnerships\n3. Leadership changes\n4. New lines of business or strategic initiatives\n5. Anything that would help a marketing consultant prepare for a stakeholder meeting\n\nFormat each with the source name.`
  }),

  channelRecs: (channel, accounts, launches) => ({
    system: "You are Amenitra's AI marketing strategist at Insight Global. Generate FRESH channel optimization recommendations based on her real account data. Be tactical, reference specific account names, and give recs she can act on this week.",
    user: `Channel: ${channel}\nAccounts using this channel: ${accounts.map(a => `${a.name} (${a.ind}, ${a.st})`).join(", ")}\nActive campaigns: ${launches.map(l => `${l.name} for ${l.acc}`).join(", ")}\n\nGive 5 specific optimization recs for RIGHT NOW. Reference accounts by name. Include one innovative idea she hasn't tried.`
  }),

  meetingPrep: (account, launches, tasks, recentWins) => ({
    system: `You are Amenitra's meeting prep assistant at Insight Global. Generate a comprehensive meeting prep package for a stakeholder meeting. Use the exact format specified. Be specific, reference real data, and position Amenitra as a marketing consultant to the internal sales team.`,
    user: `Account: ${account.name}
Industry: ${account.ind}
Revenue Target: ${account.rev}
Status: ${account.st}
Market Position: ${account.mp}
Pain Points: ${account.pains?.join("; ")}
Goals: ${account.goals?.join("; ")}
Strategy: ${account.strat}
Active Launches: ${launches.map(l => `${l.name} (${l.st})`).join(", ")}
Recent Tasks: ${tasks.map(t => `${t.text} (${t.status})`).join(", ")}
Recent Wins: ${recentWins.join(", ")}

Generate the following:

SLIDE 1: Performance Snapshot — ${account.name}
- Executive takeaway (1 line: "Momentum is building in X, but we're losing traction in Y due to Z")
- What's Working (data-backed, 3 bullets)
- Where We're Losing (3 bullets)
- Funnel Signals (Awareness → Engagement → Conversion, 3 bullets max)
- Account Reality Check: what's happening in the account right now, market position (us vs competitors)

SLIDE 2: Strategic POV — Where We Win Next
- Core Insight (consultant moment: "This account doesn't have a demand problem, it has a [clarity/trust/urgency] problem")
- Opportunity Areas (3 bullets: double down, expand into, reposition around)
- Immediate Actions — Next 30 Days (3 bullets: launch, activate, test)
- What Sales Needs to Do: who to go after (titles), what to say (1-line hook), what to use (asset/proof)

MEETING AGENDA (5-7 bullet agenda for a 30-min meeting)

TEAMS MESSAGE (a short, professional Teams message Amenitra can send to schedule or follow up on this meeting)

REMINDERS TO BRING UP (based on account situation, recent activity, things that went live)`
  }),

  strategist: (question, accounts, tasks, launches) => ({
    system: "You are Amenitra's AI marketing strategist at Insight Global. She manages Bank of America ($102M), State Farm ($2M new logo), Capital One (re-entry), Johnson & Johnson ($104M), and Eli Lilly (growth). Be specific, reference account names, and give actionable recommendations.",
    user: `Context:\nAccounts: ${accounts.map(a => `${a.name} (${a.st}, ${a.rev})`).join(", ")}\nOpen tasks: ${tasks.filter(t => t.status !== "Complete").length}\nActive launches: ${launches.filter(l => l.st !== "launched").length}\n\nAmenitra asks: ${question}`
  })
};
