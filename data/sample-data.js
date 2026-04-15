export const sampleData = {
  welcome: {
    title: "Amenitra's Command Center",
    greeting: "Hello Amenitra",
    summaryCards: [
      {
        title: "Today's Priorities",
        text: "Prep the State Farm meeting brief, review BOA signals, and align next steps for Eli Lilly content activation."
      },
      {
        title: "Launch Watch",
        text: "2 launches need post-launch follow-up this week, with one financial services campaign due for status review."
      },
      {
        title: "What Changed",
        text: "Fresh weekly intelligence is ready for competitors, pain signals, and consultant talking points."
      },
      {
        title: "Goals Snapshot",
        text: "You are trending toward your quarterly account growth goals with strong momentum in key accounts."
      }
    ]
  },
  quote: {
    text: "Think like a queen. A queen is not afraid to fail. Failure is another steppingstone to greatness.",
    author: "Oprah Winfrey"
  },
  navItems: [
    "Home",
    "Accounts",
    "Channel Command",
    "Strategy Lab",
    "Tasks & Launches",
    "Meetings",
    "Goals & Wins",
    "Leadership",
    "Automation Hub"
  ],
  overviewCards: [
    { title: "Open Tasks", value: "14", text: "5 are high priority and tied to active accounts." },
    { title: "Launches This Week", value: "3", text: "1 needs immediate post-launch follow-up planning." },
    { title: "Accounts To Watch", value: "2", text: "State Farm and Capital One show high movement signals." },
    { title: "Weekly Wins", value: "6", text: "Wins are being tracked from completed work and launch support." }
  ],
  whatDidIMiss: [
    {
      title: "State Farm",
      text: "AI and claims modernization remain strong themes for positioning surge staffing and data support."
    },
    {
      title: "Bank of America",
      text: "AML, fraud, and cloud narratives remain central to credibility and proof-driven selling."
    },
    {
      title: "Eli Lilly",
      text: "M&Q scale-up and digital acceleration continue to support the FSP and operations story."
    }
  ],
  priorities: [
    {
      title: "Top Focus This Week",
      items: [
        "Refresh account intelligence for all five accounts",
        "Prepare the monthly State Farm meeting deck preview",
        "Review channel activation gaps across Financial Services content"
      ]
    },
    {
      title: "Automation Queue",
      items: [
        "Monday 7:00am refresh should regenerate current signals and consultant talking points",
        "Airtable industry and account board sync remains read-only",
        "HubSpot and Teams source ingestion should feed meeting prep and reminders"
      ]
    }
  ],
  accounts: [
    {
      id: "boa",
      name: "Bank of America",
      industry: "Financial Services",
      target: "$102M",
      stakeholders: ["Emily Outen", "Lia Larson"],
      focus: "AML, cloud, AI, fraud",
      status: "Key account",
      marketPosition: "Established partner with room to deepen proof-led professional services credibility in regulated transformation work.",
      consultantPositioning: "Lead with controlled execution, procurement-defensible proof, and a point of view on AML, fraud, cloud, and AI adoption with governance.",
      reminders: [
        "Bring stronger proof points tied to AML and fraud throughput improvements",
        "Surface any cloud modernization wins that help expand beyond current trust zones"
      ],
      signals: [
        {
          title: "Financial crimes and AML pressure remain a strong opening",
          detail: "Use backlog reduction, compliant delivery, and governance language in account storytelling.",
          sourceLabel: "FS Strategy",
          sourceUrl: "#"
        },
        {
          title: "AI and cloud conversations require a safe-path narrative",
          detail: "Position AI as governed enablement instead of experimentation.",
          sourceLabel: "Account Notes",
          sourceUrl: "#"
        },
        {
          title: "Identity risk is becoming a sharper board-level conversation",
          detail: "Tie your proof points to identity, access, and machine-identity control rather than broad cyber language.",
          sourceLabel: "IG Blog: Identity Question",
          sourceUrl: "https://insightglobal.com/blog/the-identity-question-every-financial-organization-should-ask-themselves/"
        },
        {
          title: "Customer experience pressure is still shaping investment priorities",
          detail: "Frame modernization and AI support around trust, efficiency, and smoother regulated customer experiences.",
          sourceLabel: "IG Blog: CX in FS",
          sourceUrl: "https://insightglobal.com/blog/customer-experience-in-financial-services/"
        },
        {
          title: "2026 planning is shifting from foundation-building to leverage",
          detail: "Bring a point of view on how Insight Global helps turn modernization work into operational gains now.",
          sourceLabel: "IG Blog: 7 FS Trends",
          sourceUrl: "https://insightglobal.com/blog/2026-financial-services-trends/"
        }
      ],
      notes: [
        "Protect and expand AML and financial crimes work",
        "Advance position in AI and cloud with proof-led storytelling",
        "Strengthen procurement-defensible credibility"
      ]
    },
    {
      id: "state-farm",
      name: "State Farm",
      industry: "Financial Services",
      target: "$2M",
      stakeholders: ["Erin Meadows", "Charlie Loveall", "Rachel Peacock"],
      focus: "CSP path, surge staffing, data + AI",
      status: "New logo",
      marketPosition: "Promising new-logo opportunity with strong regional relevance and room to build trust across data, AI, and surge staffing.",
      consultantPositioning: "Show up as a practical partner who can stabilize operations, support claims and underwriting pressure, and create a credible CSP path.",
      reminders: [
        "Mention any claims, AI, or staffing updates that support surge delivery relevance",
        "Reinforce the Atlanta proximity and local credibility angle"
      ],
      signals: [
        {
          title: "Claims and underwriting workload pressure supports surge staffing plays",
          detail: "Tie staffing relief to faster cycle times and more stable delivery.",
          sourceLabel: "FS Strategy",
          sourceUrl: "#"
        },
        {
          title: "Data and AI narrative needs proof and consistency",
          detail: "Position secure delivery discipline as part of the value proposition.",
          sourceLabel: "Current Signal",
          sourceUrl: "#"
        },
        {
          title: "Insurance organizations are under simultaneous volatility, regulation, and cost pressure",
          detail: "Lead with cost-safe execution and operational stability rather than abstract transformation messaging.",
          sourceLabel: "IG Blog: Cost-Safe Insurance Ops",
          sourceUrl: "https://insightglobal.com/blog/cost-safe-insurance-operations/"
        },
        {
          title: "Claims spikes are a timely operational wedge",
          detail: "Use surge staffing and follow-through language around stabilizing operations when claims volume surges.",
          sourceLabel: "IG Blog: Stabilize Insurance Operations",
          sourceUrl: "https://insightglobal.com/blog/how-to-stabilize-your-insurance-operations/"
        },
        {
          title: "Compliant modernization for data and AI is now a practical insurance conversation",
          detail: "Position data + AI as compliant modernization with strong controls, not experimental AI transformation.",
          sourceLabel: "IG Blog: Compliant Modernization in Insurance",
          sourceUrl: "https://insightglobal.com/blog/compliant-modernization-in-insurance/"
        }
      ],
      notes: [
        "Own the backyard story with Atlanta proximity",
        "Support claims and underwriting workload pressure",
        "Build trust in data and AI delivery with proof"
      ]
    },
    {
      id: "capital-one",
      name: "Capital One",
      industry: "Financial Services",
      target: "Re-entry",
      stakeholders: ["Grace Han", "Charlie Loveall", "Rachel Peacock"],
      focus: "Fraud-first, AML/KYC, procurement trust rebuild",
      status: "Re-entry",
      marketPosition: "Re-entry motion where credibility and vendor trust matter more than volume of outreach.",
      consultantPositioning: "Lead with fraud-first controls, low-risk re-entry, and clean delivery proof that procurement can trust.",
      reminders: [
        "Bring controlled-entry language and proof assets into the next meeting",
        "Reinforce how IG lowers risk instead of adding vendor friction"
      ],
      signals: [
        {
          title: "Procurement trust is the central barrier",
          detail: "All messaging should reduce perceived risk and reinforce governance.",
          sourceLabel: "FS Strategy",
          sourceUrl: "#"
        },
        {
          title: "Fraud and false-candidate concerns shape the account story",
          detail: "Use screening and authenticity language as differentiators.",
          sourceLabel: "Account Strategy",
          sourceUrl: "#"
        },
        {
          title: "Identity and access risk is becoming more visible in financial organizations",
          detail: "Use this to reinforce fraud-first controls and compliant re-entry messaging.",
          sourceLabel: "IG Blog: Identity Question",
          sourceUrl: "https://insightglobal.com/blog/the-identity-question-every-financial-organization-should-ask-themselves/"
        },
        {
          title: "Financial institutions are expecting leverage from earlier modernization investments",
          detail: "Bring low-risk proof that shows how IG helps realize gains without adding procurement friction.",
          sourceLabel: "IG Blog: 7 FS Trends",
          sourceUrl: "https://insightglobal.com/blog/2026-financial-services-trends/"
        },
        {
          title: "Fraud, AI, and customer trust are converging in buying conversations",
          detail: "Keep the message narrow: safe execution, reliable consultants, and documented proof.",
          sourceLabel: "IG Blog: CX in FS",
          sourceUrl: "https://insightglobal.com/blog/customer-experience-in-financial-services/"
        }
      ],
      notes: [
        "Lead with fraud-first controls and credibility",
        "Rebuild procurement trust through low-risk re-entry",
        "Position IG as a safe, reliable extension of internal teams"
      ]
    },
    {
      id: "jnj",
      name: "Johnson & Johnson",
      industry: "Life Sciences",
      target: "$104M",
      stakeholders: ["Ashley Nash", "Katie Wasko"],
      focus: "R&D, manufacturing, FSP",
      status: "Key account",
      marketPosition: "Major strategic account with room to strengthen manufacturing, R&D, and FSP-led partnership depth.",
      consultantPositioning: "Show how IG supports scale, speed, and operational readiness across manufacturing and R&D environments without sacrificing quality.",
      reminders: [
        "Bring facility stand-up and FSP proof into the meeting narrative",
        "Connect manufacturing support to practical readiness and throughput"
      ],
      signals: [
        {
          title: "Manufacturing and R&D remain central opportunity areas",
          detail: "Keep positioning tied to execution support, speed, and reliability.",
          sourceLabel: "Life Sciences Strategy",
          sourceUrl: "#"
        },
        {
          title: "FSP language should anchor consultant credibility",
          detail: "Use it to differentiate from larger consulting competitors.",
          sourceLabel: "Account Summary",
          sourceUrl: "#"
        },
        {
          title: "Optimization pressure is accelerating across life sciences operations",
          detail: "Position J&J support around faster execution, fewer slowdowns, and more resilient delivery.",
          sourceLabel: "IG Blog: Accelerating Innovation",
          sourceUrl: "https://insightglobal.com/blog/life-sciences-accelerating-innovation/"
        },
        {
          title: "AI and MedTech convergence is shaping 2026 planning",
          detail: "Bring a practical point of view on where digital enablement supports R&D and manufacturing outcomes.",
          sourceLabel: "IG Blog: LS Trends 2026",
          sourceUrl: "https://insightglobal.com/blog/top-trends-shaping-life-sciences/"
        },
        {
          title: "Innovation stories are landing best when tied to speed and optimization",
          detail: "Use innovation language only when it leads back to operational readiness and scale.",
          sourceLabel: "IG Blog: Innovation in Life Sciences",
          sourceUrl: "https://insightglobal.com/blog/innovation-in-life-sciences/"
        }
      ],
      notes: [
        "Lean into R&D and manufacturing support",
        "Use FSP and facility stand-up credibility",
        "Connect delivery proof to scale and operational readiness"
      ]
    },
    {
      id: "eli-lilly",
      name: "Eli Lilly",
      industry: "Life Sciences",
      target: "Growth",
      stakeholders: ["Charlie Loveall", "Katie Wasko"],
      focus: "M&Q, AI/digital, FSP model positioning",
      status: "Growth",
      marketPosition: "High-growth account where scale-up urgency creates room for sharper consultant-led guidance.",
      consultantPositioning: "Position IG around M&Q support, digital acceleration, and FSP structure that helps the business move quickly and confidently.",
      reminders: [
        "Tie talking points to scale-up pressure and operational readiness",
        "Bring a clear point of view on digital acceleration, not just staffing support"
      ],
      signals: [
        {
          title: "M&Q scale-up keeps the urgency high",
          detail: "Anchor actions in speed, support, and throughput.",
          sourceLabel: "Life Sciences Summary",
          sourceUrl: "#"
        },
        {
          title: "AI and digital acceleration can widen the conversation",
          detail: "Bring concrete next-step ideas rather than broad innovation language.",
          sourceLabel: "Account Notes",
          sourceUrl: "#"
        },
        {
          title: "Optimization is becoming a competitive necessity in life sciences",
          detail: "Tie your point of view to speed, quality, and process stability rather than just digital buzzwords.",
          sourceLabel: "IG Blog: Accelerating Innovation",
          sourceUrl: "https://insightglobal.com/blog/life-sciences-accelerating-innovation/"
        },
        {
          title: "2026 trends are reinforcing AI, data, and compliance together",
          detail: "Frame AI and digital support around practical adoption in regulated environments.",
          sourceLabel: "IG Blog: LS Trends 2026",
          sourceUrl: "https://insightglobal.com/blog/top-trends-shaping-life-sciences/"
        },
        {
          title: "Innovation stories are landing best when tied to actual operating lift",
          detail: "Use AI and digital acceleration language only when it clearly ties back to speed, throughput, and readiness.",
          sourceLabel: "IG Blog: Innovation in Life Sciences",
          sourceUrl: "https://insightglobal.com/blog/innovation-in-life-sciences/"
        }
      ],
      notes: [
        "Anchor on AI and digital acceleration",
        "Support M&Q scale-up priorities",
        "Use FSP positioning against larger consulting competitors"
      ]
    }
  ],
  channels: [
    {
      id: "paid-media",
      name: "Paid Media",
      idea: "Geo-target account priority locations and retarget engagement from thought leadership content.",
      plays: [
        "Geo-fence Charlotte for Bank of America, Atlanta for State Farm, and Richmond/McLean for Capital One.",
        "Use proof-led retargeting to move known engaged contacts toward account-specific conversion moments."
      ],
      developments: [
        "LinkedIn formats continue favoring higher-trust thought leadership amplification.",
        "Retargeting works best when tied to case study or proof-driven landing experiences."
      ]
    },
    {
      id: "email-abm",
      name: "Email & ABM",
      idea: "Build account-specific drips with fraud, AML, AI, and manufacturing messaging by audience.",
      plays: [
        "Use Bank of America AML and fraud proof points in short value-focused nurture sequences.",
        "Keep Capital One messaging risk-first and controlled, with credibility over volume."
      ],
      developments: [
        "AI-assisted copy tools can speed iteration, but account-specific editing remains essential.",
        "Smaller buying-group messaging clusters tend to perform better than broad nurture tracks."
      ]
    },
    {
      id: "content-seo",
      name: "Content & SEO",
      idea: "Map blog and resource content to industry pain points, then flag activation gaps by channel.",
      plays: [
        "Align financial services content to fraud, AML, cloud modernization, and AI governance.",
        "Align life sciences content to manufacturing readiness, FSP, and digital acceleration."
      ],
      developments: [
        "Search is rewarding clearer answers and stronger expertise signals in regulated categories.",
        "Activation matters as much as publishing, so distribution gaps need visible tracking."
      ]
    },
    {
      id: "events-field",
      name: "Events & Field",
      idea: "Use intimate local touchpoints to deepen trust and open new stakeholder doors.",
      plays: [
        "Use local market presence to support State Farm and other proximity-sensitive account narratives.",
        "Keep events tight, purposeful, and aligned to one stakeholder outcome."
      ],
      developments: [
        "Smaller executive and peer roundtables continue outperforming large generic event motions.",
        "Field activations work best when follow-up assets are already prepared for sales."
      ]
    },
    {
      id: "philanthropy",
      name: "Philanthropy",
      idea: "Use local and community-centered storytelling to reinforce trust and regional relevance.",
      plays: [
        "Tie community impact back to local credibility when it strengthens account resonance.",
        "Only activate when it supports the account story instead of distracting from it."
      ],
      developments: [
        "Values-led narratives matter most when they are concrete and locally grounded.",
        "Community stories are strongest when paired with proof of execution and continuity."
      ]
    },
    {
      id: "web",
      name: "Web",
      idea: "Create resource hubs that explain your value in under a minute and support proof-based selling.",
      plays: [
        "Build account-ready landing experiences that mirror how you want sellers to position Insight Global.",
        "Use web pages as the single-link proof source that supports meetings and follow-up."
      ],
      developments: [
        "Shorter narrative pathways are outperforming dense capability pages.",
        "Pages tied to clear service stories help bridge brand perception and conversion."
      ]
    },
    {
      id: "creative",
      name: "Creative",
      idea: "Package proof, differentiation, and account-specific messaging into fast seller-friendly formats.",
      plays: [
        "Create proof recap assets that sales can use without rewriting the story themselves.",
        "Design for clarity and procurement defensibility rather than aesthetic excess."
      ],
      developments: [
        "Smaller proof packages are easier to activate than heavyweight one-off decks.",
        "Reusable visual systems matter more than isolated campaign assets."
      ]
    },
    {
      id: "organic-social",
      name: "Organic Social",
      idea: "Use executive and account-adjacent storytelling to reinforce credibility and keep campaigns visible.",
      plays: [
        "Support paid and email motions with trust-building proof snippets and thought leadership.",
        "Use social to echo strategic themes, not carry the entire conversion burden."
      ],
      developments: [
        "Executive and subject-matter visibility continues to outperform generic brand posts.",
        "Social works best when it extends a larger account motion across channels."
      ]
    }
  ],
  contentAssets: [
    {
      id: "fs-ai-governance",
      title: "7 Financial Services Trends to Watch This Year",
      industry: "Financial Services",
      link: "https://insightglobal.com/blog/2026-financial-services-trends/",
      status: "Live",
      channels: ["Web", "Content & SEO", "Email & ABM"],
      score: "3/8",
      gap: "Paid Media and Organic Social are still open opportunities."
    },
    {
      id: "fraud-readiness",
      title: "The identity question every financial organization should ask themselves",
      industry: "Financial Services",
      link: "https://insightglobal.com/blog/the-identity-question-every-financial-organization-should-ask-themselves/",
      status: "Needed",
      channels: ["Content & SEO"],
      score: "1/8",
      gap: "This topic needs a stronger activation plan before monthly account meetings."
    },
    {
      id: "fs-cx",
      title: "Elevating the Customer Experience in Financial Services",
      industry: "Financial Services",
      link: "https://insightglobal.com/blog/customer-experience-in-financial-services/",
      status: "Live",
      channels: ["Web", "Email & ABM"],
      score: "2/8",
      gap: "Creative and Organic Social can help turn this into a stronger sales enablement asset."
    },
    {
      id: "insurance-cost-safe",
      title: "4 Cost-Safe Insurance Operations That Don’t Break Quality",
      industry: "Insurance",
      link: "https://insightglobal.com/blog/cost-safe-insurance-operations/",
      status: "Live",
      channels: ["Web", "Content & SEO"],
      score: "2/8",
      gap: "This should be activated into sales-facing talking points for State Farm."
    },
    {
      id: "insurance-claims",
      title: "5 Steps to Stabilize Your Operations When Claims Volumes Spike",
      industry: "Insurance",
      link: "https://insightglobal.com/blog/how-to-stabilize-your-insurance-operations/",
      status: "Live",
      channels: ["Web", "Content & SEO", "Email & ABM"],
      score: "3/8",
      gap: "Paid Media and Events & Field could extend this into a stronger State Farm support motion."
    },
    {
      id: "insurance-ai",
      title: "Compliant Modernization for Data and AI in Insurance",
      industry: "Insurance",
      link: "https://insightglobal.com/blog/compliant-modernization-in-insurance/",
      status: "Live",
      channels: ["Web", "Content & SEO", "Creative"],
      score: "3/8",
      gap: "Organic Social and Email & ABM are still open for activation."
    },
    {
      id: "insurance-ai-value",
      title: "Insurance AI Solutions That Are Delivering Real Value Now",
      industry: "Insurance",
      link: "https://insightglobal.com/blog/insurance-ai-solutions-that-are-delivering-real-value-now/",
      status: "Needed",
      channels: ["Content & SEO"],
      score: "1/8",
      gap: "This should be turned into a stronger data-and-AI talking point set for insurance accounts."
    },
    {
      id: "life-sciences-fsp",
      title: "Trends Shaping the Life Sciences Landscape in 2026",
      industry: "Life Sciences",
      link: "https://insightglobal.com/blog/top-trends-shaping-life-sciences/",
      status: "Live",
      channels: ["Web", "Events & Field", "Creative"],
      score: "3/8",
      gap: "Organic Social and Email & ABM are still available activation moves."
    },
    {
      id: "life-sciences-optimization",
      title: "Accelerating Innovation in Life Sciences: The Race for Optimization",
      industry: "Life Sciences",
      link: "https://insightglobal.com/blog/life-sciences-accelerating-innovation/",
      status: "Live",
      channels: ["Web", "Content & SEO", "Email & ABM"],
      score: "3/8",
      gap: "Use this more directly in J&J and Eli Lilly consultant positioning."
    },
    {
      id: "life-sciences-innovation",
      title: "Innovation in Life Sciences: Where the Future is Heading",
      industry: "Life Sciences",
      link: "https://insightglobal.com/blog/innovation-in-life-sciences/",
      status: "Live",
      channels: ["Web", "Creative"],
      score: "2/8",
      gap: "Field and Email activation would make this much more useful in your meeting prep."
    }
  ],
  goals: [
    {
      title: "Show up as the consultant to sales",
      progress: "Strong momentum",
      detail: "Build account-specific strategic guidance that sales can immediately use in-room and between meetings."
    },
    {
      title: "Strengthen meeting prep quality",
      progress: "In progress",
      detail: "Turn tasks, launches, source signals, and wins into polished meeting narratives and next steps."
    },
    {
      title: "Track and prove marketing impact",
      progress: "On track",
      detail: "Connect channel activity, launches, and stakeholder priorities to clearer account-level outcomes."
    }
  ],
  meetingPrep: {
    title: "Meeting Prep Agent",
    text: "Generate a structured account briefing that pulls wins, launches, source signals, and reminders into a polished in-app meeting preview.",
    bullets: [
      "Agenda draft tailored to the selected account",
      "Teams follow-up message draft",
      "2-slide account preview matching your preferred structure",
      "Reminders to bring up based on notes, launches, and current signals"
    ]
  },
  strategyRecommendations: [
    {
      title: "Turn proof into a reusable seller system",
      detail: "The strongest near-term opportunity is packaging clearer proof across FS accounts so sellers do not have to improvise the regulated-services story."
    },
    {
      title: "Use signals to shift from awareness to account credibility",
      detail: "Your best consultant move is translating launches, industry developments, and account pain into sharper talk tracks by stakeholder group."
    },
    {
      title: "Strengthen account-to-channel alignment",
      detail: "Content activation should map directly to named account priorities instead of being distributed evenly across the portfolio."
    }
  ],
  tasks: [
    {
      id: "task-1",
      title: "Prep State Farm monthly briefing",
      due: "This week",
      priority: "High",
      source: "App",
      status: "Open"
    },
    {
      id: "task-2",
      title: "Review BOA proof assets for AML story",
      due: "Tomorrow",
      priority: "High",
      source: "Airtable",
      status: "Open"
    },
    {
      id: "task-3",
      title: "Create follow-up notes for Eli Lilly account sync",
      due: "Friday",
      priority: "Medium",
      source: "Teams",
      status: "Open"
    }
  ],
  launches: [
    {
      id: "launch-1",
      title: "New Logo: Capital One",
      phase: "Upcoming",
      owner: "Amenitra",
      note: "Needs tighter supporting proof and channel activation planning."
    },
    {
      id: "launch-2",
      title: "New Logo: State Farm",
      phase: "In Progress",
      owner: "Amenitra",
      note: "Keep post-launch follow-up tied to claims, staffing, and data narratives."
    }
  ],
  leadershipPrompts: [
    {
      title: "Follow-through check",
      detail: "After each launch, ask: what did we learn, what changed, and what needs to be closed with sales?"
    },
    {
      title: "Consultant habit",
      detail: "Walk into each stakeholder meeting with one sharp point of view and one recommended next action."
    },
    {
      title: "Coaching move",
      detail: "Turn every win into a reusable proof point that can help another account advance faster."
    }
  ],
  automationStatus: [
    {
      source: "Airtable",
      status: "Ready",
      note: "Industry and account boards will be treated as read-only source data."
    },
    {
      source: "Outlook",
      status: "Planned",
      note: "Will feed account updates, reminders, and meeting prep context."
    },
    {
      source: "Teams",
      status: "Planned",
      note: "Will feed conversation context and reminders to bring up next meeting."
    },
    {
      source: "HubSpot",
      status: "Planned",
      note: "Will feed account activity and performance context for meeting prep."
    }
  ],
  placeholders: {
    strategyLab: {
      title: "Strategy Lab",
      text: "This page will become the AI recommendation engine for channel optimization, strategic shifts, competitive positioning, and consultant talking points."
    }
  }
};
