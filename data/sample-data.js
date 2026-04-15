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
      subIndustry: "Banking",
      target: "$102M",
      stakeholders: ["Emily Outen", "Lia Larson"],
      focus: "AML, cloud, AI, fraud",
      status: "Key account",
      marketPosition: "Bank of America remains a large-scale modernization and control environment where execution credibility matters as much as innovation language. The account is under constant pressure to improve resilience, fraud controls, AML throughput, data access, and cloud maturity without increasing operational risk. That creates room for a partner who can show disciplined delivery, not just ideas.",
      consultantPositioning: "Lead with controlled execution, procurement-defensible proof, and a point of view on AML, fraud, cloud, and AI adoption with governance.",
      painHierarchy: [
        "AML and fraud operations still require throughput improvement without weakening controls or audit readiness.",
        "AI conversations are moving forward, but they need a clear governance and adoption path instead of broad experimentation.",
        "Cloud and data modernization work must show business value without creating new risk for already-complex teams.",
        "Vendor trust remains tied to proof, documentation, and execution discipline rather than capability claims alone.",
        "Stakeholder attention is fragmented across compliance, technology, security, and customer pressure."
      ],
      reminders: [
        "Bring stronger proof points tied to AML and fraud throughput improvements",
        "Surface any cloud modernization wins that help expand beyond current trust zones"
      ],
      signals: [
        {
          title: "Financial crime and fraud pressure continues to keep operational efficiency and control in the spotlight",
          detail: "This keeps AML, fraud operations, and identity-focused support relevant when the story is tied to throughput, risk reduction, and clean execution.",
          sourceLabel: "Earnings / Investor Commentary",
          sourceUrl: "#"
        },
        {
          title: "AI remains a live topic, but the buying lens is governed enablement rather than experimentation",
          detail: "Position AI as a safe path tied to operations, controls, analytics, and business outcomes instead of futuristic transformation language.",
          sourceLabel: "Industry / Company Trend",
          sourceUrl: "#"
        },
        {
          title: "Identity, access, and trust architecture conversations are getting more executive visibility",
          detail: "That makes identity-first security and compliant delivery more important than generic cyber positioning.",
          sourceLabel: "Security / Risk Theme",
          sourceUrl: "#"
        },
        {
          title: "Customer experience and internal efficiency are increasingly connected in modernization work",
          detail: "Frame cloud, data, and AI support around speed, trust, and smoother customer-facing operations in regulated environments.",
          sourceLabel: "CX / Ops Signal",
          sourceUrl: "#"
        },
        {
          title: "The market expectation is shifting from foundation-building to measurable leverage from existing investments",
          detail: "Show how Insight Global helps turn transformation effort into actual delivery lift now, not just longer-term potential.",
          sourceLabel: "2026 Planning Signal",
          sourceUrl: "#"
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
      subIndustry: "Insurance",
      target: "$2M",
      stakeholders: ["Erin Meadows", "Charlie Loveall", "Rachel Peacock"],
      focus: "CSP path, surge staffing, data + AI",
      status: "New logo",
      marketPosition: "State Farm is balancing digital transformation, data and analytics integration, claims and underwriting pressure, and insurance-market volatility at the same time. The account story is not just modernization, it is modernization while managing catastrophe exposure, profitability pressure, customer experience expectations, and operating scale. That makes speed-with-control and surge support especially relevant.",
      consultantPositioning: "Show up as a practical partner who can stabilize operations, support claims and underwriting pressure, and create a credible CSP path.",
      painHierarchy: [
        "Claims, underwriting, and service operations need support while the business is still absorbing volatility and catastrophe pressure.",
        "Data, analytics, and AI ambitions require more delivery talent and operating discipline to move from interest to scaled execution.",
        "Digital modernization has to move quickly without disrupting customer-facing stability or core insurance operations.",
        "Insurance profitability pressure raises the bar for any outside partner to show cost discipline and measurable operational lift.",
        "The buying conversation is likely to favor practical, regionally credible partners over abstract transformation narratives."
      ],
      reminders: [
        "Mention any claims, AI, or staffing updates that support surge delivery relevance",
        "Reinforce the Atlanta proximity and local credibility angle"
      ],
      signals: [
        {
          title: "Claims and underwriting pressure keeps surge support and staffing stability highly relevant",
          detail: "Tie the story to operational stability, improved cycle times, and practical relief for overloaded teams.",
          sourceLabel: "Insurance Operating Signal",
          sourceUrl: "#"
        },
        {
          title: "Data, analytics, and AI are converging under a more integrated digital mandate",
          detail: "Position your value around delivery support, data talent, and consistent execution rather than innovation language alone.",
          sourceLabel: "Leadership / Org Signal",
          sourceUrl: "#"
        },
        {
          title: "Insurance carriers are operating under simultaneous catastrophe, regulatory, and cost pressure",
          detail: "Lead with cost-conscious operational lift and stable delivery instead of abstract transformation positioning.",
          sourceLabel: "Insurance Industry Signal",
          sourceUrl: "#"
        },
        {
          title: "Claims spikes and property-loss volatility create a strong wedge for practical consultant support",
          detail: "Use surge staffing, follow-through, and process stability language when you want to make the account story feel immediate.",
          sourceLabel: "Claims / Catastrophe Signal",
          sourceUrl: "#"
        },
        {
          title: "Compliant modernization for data and AI is becoming a practical operating conversation",
          detail: "Position data + AI as disciplined modernization with strong controls, not experimental AI transformation.",
          sourceLabel: "AI / Modernization Signal",
          sourceUrl: "#"
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
      subIndustry: "Banking",
      target: "Re-entry",
      stakeholders: ["Grace Han", "Charlie Loveall", "Rachel Peacock"],
      focus: "Fraud-first, AML/KYC, procurement trust rebuild",
      status: "Re-entry",
      marketPosition: "Capital One is a re-entry account where trust, risk posture, and procurement credibility are central. The opportunity is not about flooding the zone with marketing; it is about showing that Insight Global can be a safe, documented, low-friction extension of internal teams in areas like fraud, AML/KYC, and controlled delivery support.",
      consultantPositioning: "Lead with fraud-first controls, low-risk re-entry, and clean delivery proof that procurement can trust.",
      painHierarchy: [
        "Procurement trust and vendor risk posture create a higher bar for entry than standard demand generation alone can solve.",
        "Fraud, candidate authenticity, and delivery quality are likely shaping how outside partners are evaluated.",
        "Any new engagement path has to feel low-risk, controlled, and easy to defend internally.",
        "Risk, compliance, and operations teams need proof of reliability before broader positioning will land.",
        "Expansion depends on getting the first scoped win cleanly and visibly."
      ],
      reminders: [
        "Bring controlled-entry language and proof assets into the next meeting",
        "Reinforce how IG lowers risk instead of adding vendor friction"
      ],
      signals: [
        {
          title: "Procurement trust remains the biggest barrier to re-entry",
          detail: "All messaging should reduce perceived risk, reinforce governance, and feel easy for stakeholders to defend internally.",
          sourceLabel: "Account Strategy Signal",
          sourceUrl: "#"
        },
        {
          title: "Fraud and candidate-authenticity concerns are shaping vendor evaluation",
          detail: "Use screening controls, retention stability, and clean delivery language as differentiators.",
          sourceLabel: "Risk / Vendor Signal",
          sourceUrl: "#"
        },
        {
          title: "Identity, access, and trust concerns are becoming more visible across financial institutions",
          detail: "Use this to reinforce fraud-first controls and compliant re-entry messaging rather than generic talent language.",
          sourceLabel: "Security / Risk Signal",
          sourceUrl: "#"
        },
        {
          title: "Financial organizations are expecting more leverage from existing modernization investments",
          detail: "Bring low-risk proof that shows how IG helps realize gains without increasing procurement friction.",
          sourceLabel: "Planning Signal",
          sourceUrl: "#"
        },
        {
          title: "Fraud, AI, and customer trust are increasingly connected in buying conversations",
          detail: "Keep the message narrow: safe execution, reliable consultants, and documented proof over broad transformation positioning.",
          sourceLabel: "Market Signal",
          sourceUrl: "#"
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
      subIndustry: "Pharma / MedTech",
      target: "$104M",
      stakeholders: ["Ashley Nash", "Katie Wasko"],
      focus: "R&D, manufacturing, FSP",
      status: "Key account",
      marketPosition: "Johnson & Johnson is a scale account where manufacturing readiness, R&D execution, and disciplined support models matter. The opportunity is not only to position around innovation, but to show how Insight Global helps complex programs move faster with better continuity across manufacturing, facility readiness, and functional service support.",
      consultantPositioning: "Show how IG supports scale, speed, and operational readiness across manufacturing and R&D environments without sacrificing quality.",
      painHierarchy: [
        "Manufacturing and supply chain readiness create pressure for reliable execution support, not just strategic planning.",
        "R&D and product development environments still need speed without sacrificing quality, continuity, or documentation.",
        "FSP positioning has to feel like operational leverage, not just another staffing label.",
        "Large-scale programs demand partners that can support facility stand-up, transfer, and continuity across regions.",
        "Innovation messaging only lands when it is grounded in actual program movement and output."
      ],
      reminders: [
        "Bring facility stand-up and FSP proof into the meeting narrative",
        "Connect manufacturing support to practical readiness and throughput"
      ],
      signals: [
        {
          title: "Manufacturing and R&D remain central operating pressure points",
          detail: "Keep positioning tied to execution support, speed, reliability, and continuity rather than just innovation language.",
          sourceLabel: "Life Sciences Strategy",
          sourceUrl: "#"
        },
        {
          title: "FSP remains a strong credibility anchor when the conversation is about execution depth",
          detail: "Use it to differentiate from larger consulting competitors by making it feel practical and operational.",
          sourceLabel: "Account Summary",
          sourceUrl: "#"
        },
        {
          title: "Optimization pressure is accelerating across life sciences operations",
          detail: "Position J&J support around faster execution, fewer slowdowns, and more resilient delivery.",
          sourceLabel: "Industry Operating Signal",
          sourceUrl: "#"
        },
        {
          title: "AI and digital enablement are influencing 2026 planning, but with a practical execution lens",
          detail: "Bring a point of view on where digital support helps R&D and manufacturing outcomes instead of over-indexing on innovation buzzwords.",
          sourceLabel: "Planning Signal",
          sourceUrl: "#"
        },
        {
          title: "Innovation stories land best when tied to readiness, speed, and optimization",
          detail: "Use innovation language only when it leads back to operational readiness and scale.",
          sourceLabel: "Market Signal",
          sourceUrl: "#"
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
      subIndustry: "Pharma",
      target: "Growth",
      stakeholders: ["Charlie Loveall", "Katie Wasko"],
      focus: "M&Q, AI/digital, FSP model positioning",
      status: "Growth",
      marketPosition: "Eli Lilly is a growth account where scale-up urgency creates space for a much sharper consultant-led story. The account is well suited for positioning around manufacturing and quality support, AI and digital enablement, and FSP-based execution leverage, especially when the narrative stays focused on speed, throughput, and readiness.",
      consultantPositioning: "Position IG around M&Q support, digital acceleration, and FSP structure that helps the business move quickly and confidently.",
      painHierarchy: [
        "M&Q scale-up pressure raises the value of practical execution support that can move quickly.",
        "AI and digital conversations need to connect directly to throughput, readiness, and operational value.",
        "FSP has to be positioned as a model for speed and continuity, not a generic delivery label.",
        "Rapid growth increases the importance of specialized support and clean stakeholder follow-through.",
        "The strongest conversation will center on scale, speed, and confidence rather than broad innovation language."
      ],
      reminders: [
        "Tie talking points to scale-up pressure and operational readiness",
        "Bring a clear point of view on digital acceleration, not just staffing support"
      ],
      signals: [
        {
          title: "M&Q scale-up keeps the urgency high",
          detail: "Anchor actions in speed, support, and throughput rather than generic growth messaging.",
          sourceLabel: "Life Sciences Summary",
          sourceUrl: "#"
        },
        {
          title: "AI and digital acceleration can widen the conversation when it is tied to specific operating outcomes",
          detail: "Bring concrete next-step ideas rather than broad innovation language.",
          sourceLabel: "Account Notes",
          sourceUrl: "#"
        },
        {
          title: "Optimization is becoming a competitive necessity across life sciences operations",
          detail: "Tie your point of view to speed, quality, and process stability rather than digital buzzwords alone.",
          sourceLabel: "Industry Operating Signal",
          sourceUrl: "#"
        },
        {
          title: "2026 planning is reinforcing AI, data, and compliance together",
          detail: "Frame AI and digital support around practical adoption in regulated environments.",
          sourceLabel: "Planning Signal",
          sourceUrl: "#"
        },
        {
          title: "Innovation stories land best when tied to actual operating lift",
          detail: "Use AI and digital acceleration language only when it clearly ties back to speed, throughput, and readiness.",
          sourceLabel: "Market Signal",
          sourceUrl: "#"
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
  strategyLab: {
    overview: [
      {
        title: "Portfolio Shift",
        text: "Move from broad awareness language to consultant-led account narratives grounded in pain, proof, and the next 30-day action."
      },
      {
        title: "Best Growth Wedge",
        text: "Use live company and industry signals to shape account-specific sales hooks before monthly stakeholder meetings."
      },
      {
        title: "Biggest Gap",
        text: "A lot of the strongest themes exist, but they are not always being translated into seller-ready messaging by account and channel."
      }
    ],
    accountMoves: [
      {
        accountId: "boa",
        shift: "Sharpen the story around AML, fraud, and controlled AI adoption instead of treating modernization as one broad bucket.",
        nextMove: "Build one proof-led follow-up sequence that sales can use after meetings with compliance, fraud, and cloud stakeholders."
      },
      {
        accountId: "state-farm",
        shift: "Position Insight Global as the practical support partner for claims pressure, data execution, and compliant AI progression.",
        nextMove: "Translate insurance volatility and operating pressure into a clearer consultant message for the next account conversation."
      },
      {
        accountId: "capital-one",
        shift: "Treat the account as a trust rebuild motion first and a demand generation motion second.",
        nextMove: "Package a low-risk re-entry narrative that procurement and risk leaders can defend internally."
      },
      {
        accountId: "jnj",
        shift: "Anchor the conversation in manufacturing readiness, R&D execution, and FSP-supported continuity rather than broad innovation.",
        nextMove: "Package manufacturing and facility-support proof into a more board-friendly operational story."
      },
      {
        accountId: "eli-lilly",
        shift: "Use scale-up urgency to position IG around M&Q support, digital execution, and FSP leverage.",
        nextMove: "Create a tighter point of view on what sales should say when speed and readiness come up in the room."
      }
    ],
    channelMoves: [
      {
        channel: "Email & ABM",
        recommendation: "Use shorter, account-specific briefs with one business pressure, one proof point, and one next-step CTA."
      },
      {
        channel: "Content & SEO",
        recommendation: "Separate company/industry signal intelligence from Insight Global content so the account pages feel like intelligence, not a content library."
      },
      {
        channel: "Events & Field",
        recommendation: "Use local touchpoints as trust accelerators tied to one concrete account pain, not broad relationship maintenance."
      },
      {
        channel: "Web",
        recommendation: "Treat account-adjacent landing pages as proof environments that support the exact story sales needs to tell."
      }
    ],
    knowledgeGaps: [
      "Which stakeholders are most likely to sponsor or block the next move in each account?",
      "Which proof points are strong enough to survive procurement or risk scrutiny?",
      "Which live company or industry signals should directly change next month’s agenda and talking points?",
      "Where are we still using broad messaging when the account needs a narrower consultant point of view?"
    ]
  },
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
  integrationSettings: [
    {
      name: "Airtable",
      status: "Ready for setup",
      summary: "Connect your industry and account boards so Airtable can feed Supabase.",
      lastSyncedAt: ""
    },
    {
      name: "Outlook / Teams",
      status: "Planned",
      summary: "Will require Microsoft Graph credentials and permissions.",
      lastSyncedAt: ""
    },
    {
      name: "HubSpot",
      status: "Planned",
      summary: "Will require a HubSpot private app token or OAuth connection.",
      lastSyncedAt: ""
    }
  ],
  placeholders: {
    strategyLab: {
      title: "Strategy Lab",
      text: "This page will become the AI recommendation engine for channel optimization, strategic shifts, competitive positioning, and consultant talking points."
    }
  }
};
