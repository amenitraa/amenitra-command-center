// ═══ DATA — All accounts, channels, content, defaults ═══

export const CHANNELS = ["Paid Media","Email & ABM","Content & SEO","Events & Field","Philanthropy","Web","Creative","Organic Social"];

export const TASK_STATUSES = ["Not Started","In Progress","Blocked","Complete"];

export const QUOTES = [
  {t:"I never dreamed about success. I worked for it.",a:"Estée Lauder"},
  {t:"Think like a queen. A queen is not afraid to fail.",a:"Oprah Winfrey"},
  {t:"The most effective way to do it, is to do it.",a:"Amelia Earhart"},
  {t:"Done is better than perfect.",a:"Sheryl Sandberg"},
  {t:"Power is not given to you. You have to take it.",a:"Beyoncé"},
  {t:"I am deliberate and afraid of nothing.",a:"Audre Lorde"},
  {t:"A woman with a voice is, by definition, a strong woman.",a:"Melinda Gates"},
  {t:"The question isn't who's going to let me; it's who is going to stop me.",a:"Ayn Rand"},
  {t:"You can waste your lives drawing lines. Or you can live your life crossing them.",a:"Shonda Rhimes"},
  {t:"Life shrinks or expands in proportion to one's courage.",a:"Anaïs Nin"},
];

export const ACCOUNTS = [
  {id:"boa",name:"Bank of America",ini:"BA",ind:"Financial Services",st:"key",hp:88,rev:"$102M",
    mp:"Powers BOA execution across AML, cloud, and AI. Key account with strong infrastructure partnership. Competitive pressure from Oxford, Capgemini, Slalom.",
    signals:["Third-party risk governance tightening","Data privacy and cross-border compliance increasing","Open banking readiness","Financial crime, AML, KYC acceleration"],
    pains:["Cost, conversion, scalability objections","Need customization vs rigid models","Enablement gaps: thought leadership, AI proof","Talent Services not landing — needs positioning","Competitor pressure: Oxford, Capgemini, Slalom"],
    goals:["Protect/expand AML + Financial Crimes","Advance AI + Cloud position","Credibility driving sales enablement","Strengthen stakeholder access"],
    audience:["Procurement/Vendor Management","Financial Crimes/AML leaders","Infrastructure/Cloud Leaders","AI/Data leaders","Fraud/Security stakeholders"],
    services:["AML program delivery","Fraud protection support","Tech delivery + infrastructure","Staff aug for cloud environments","Expansion: Crimes/AML, Cloud, AI"],
    tactics:["Web — new messaging + global","Thought Leadership — AI, AML outcomes","Brand Advocacy — Charlotte sales leaders","Local Activation — Charlotte momentum","Sales enablement — case studies into BOA assets"],
    channels:["Email & ABM","Content & SEO","Web","Paid Media","Events & Field"],
    smes:["Grace Han"],notes:"",strat:"",lt:"2026-04-05",
    reminders:["Follow up on AML thought leadership series performance","Check with Grace on Charlotte stakeholder meeting status","Review Q1 enablement usage metrics"],
    newsLastRefresh:""},

  {id:"sf",name:"State Farm",ini:"SF",ind:"Financial Services",st:"new-logo",hp:45,rev:"$2M",
    mp:"Navigating digital transformation + catastrophic loss recovery. Net income $12.9B in 2025. New CDAO Jon Francis appointed March 2026. Deploying AI for claims triage via OpenAI. Goal: turn ATL proximity into partnership.",
    signals:["Net income $12.9B, revenue $132.3B (+7.5% YoY)","$3.1B homeowners underwriting loss (improved from $3.6B)","Jon Francis promoted to CDAO + Head of Digital","Dual digital leadership: Francis + Joe Park as EVP/CDIO","AI claims triage via OpenAI Frontier platform","Digital knowledge assistant for contact centers"],
    pains:["AI/ML talent for claims automation — competing nationally","Data/analytics hiring surge under new CDAO mandate","Digital product/UX engineers for platform modernization","Transformation speed vs homeowners loss management","Property insurance cat-risk and climate modeling talent gap"],
    goals:["Turn ATL proximity into partnership","Reposition from OSP vendor to trusted delivery partner","Earn CSP eligibility (Tech + Non-Tech)","$2M 2026 revenue goal","Measurable CSP milestone progress"],
    audience:["Procurement: Vendor Mgmt, Directors, Category Leads","Claims/Underwriting: Directors/VP, Ops Managers","Data + Tech: Head of Data, AI/Automation Leaders"],
    services:["Cost Optimization — reduce spend without risk","Rapid Response — surge support for operations","Tech Scale — data delivery + AI-ready foundations"],
    tactics:["Web — Insurance page with OSP/CSP language","Social/PR — organic through IG SMEs, local PR","Brand Advocacy — LinkedIn credibility coaching","TL Ads — targeted to top-of-funnel","Local Activation — ATL 'IG experience' sessions","IP-based customization for SF contacts","Proof pack: case snapshots + metrics"],
    channels:["Paid Media","Email & ABM","Web","Organic Social","Events & Field","Content & SEO"],
    smes:["Charlie Loveall","Rachel Peacock"],notes:"",strat:"Two-track: Track A (Deepen Tech) + Track B (Break Non-Tech). CSP eligibility within 6-9 months.",lt:"2026-04-01",
    reminders:["Confirm ATL local activation event date","Follow up on insurance page web update","Check background check approval status"],
    newsLastRefresh:""},

  {id:"c1",name:"Capital One",ini:"C1",ind:"Financial Services",st:"re-entry",hp:30,rev:"TBD",
    mp:"Re-entering after long non-engagement. Post-Discover merger reduced vendor list. Fraud risk driving vendor scrutiny. Must rebuild trust from 'vendor risk' to fraud-aware partner.",
    signals:["Procurement trust is the barrier","Fraud risk driving vendor scrutiny","Post-Discover merger raised vendor bar","AML/KYC regulatory pressure increasing","Third-party risk governance tightening"],
    pains:["Fraud + false candidate exposure","AML/KYC throughput + regulatory pressure","Procurement trust + vendor consolidation","Rebuilding from 'vendor risk' perception","Limited access beyond MSP layer"],
    goals:["Re-enter vendor ecosystem — earn one safe yes","Rebuild procurement/ESM trust","Reposition as fraud-aware partner","Win low-risk first engagement","Expand based on performance, not persuasion"],
    audience:["Fraud Risk/Security/Talent Risk Leaders","AML/KYC Program Owners, Transaction Monitoring","Procurement Category Leaders, ESM Leadership VP+"],
    services:["Fraud/Risk Protection — fraud-first screening","AML/KYC Solutions — compliant delivery","Procurement Re-Entry — controlled low-risk approach"],
    tactics:["Web — C1 landing page + proof hub","Paid Social — organic through IG SMEs","Email — FS tailored to known C1 contacts","Brand Advocacy — risk-first delivery posts","Targeted Outreach — procurement + AML/KYC leaders","Events — small local touchpoint for trust"],
    channels:["Paid Media","Email & ABM","Web","Content & SEO","Events & Field"],
    smes:["Grace Han"],notes:"",strat:"Lead with protection → Earn low-risk win → Convert proof into expansion",lt:"2026-03-15",
    reminders:["Check on Discover merger integration timeline","Follow up with Grace on procurement contact status","Review risk-first POV draft"],
    newsLastRefresh:""},

  {id:"jnj",name:"Johnson & Johnson",ini:"JJ",ind:"Life Sciences",st:"key",hp:90,rev:"$104M",
    mp:"Accelerate innovation across R&D, manufacturing, supply chain. Proven long-term partnership. Strong custom teams and managed service delivery. Shifting from building facilities to operationalizing them.",
    signals:["Shift to operationalizing equipment, tech, workforce","New US facility builds with major investment","AI enablement in manufacturing/operations","Continued specialized scientific talent need","LATAM global delivery expansion"],
    pains:["Limited brand recognition in enterprise procurement","Vendor selection influenced by analyst platforms","Perceived gap in R+D and manufacturing expertise","Difficulty demonstrating credibility in technical LS","Competitive pressure from specialized consultants","Lost opportunities from executive consulting questions"],
    goals:["Protect & expand existing delivery","Strengthen executive/procurement engagement","Position as services partner beyond staffing","Grow services across R&D, manufacturing, supply chain"],
    audience:["Procurement/Vendor Management","Manufacturing/Operations Senior Leaders","R+D/Scientific program leadership","Supply chain/Commercialization stakeholders","Digital innovation leaders (AI + data)"],
    services:["FSP custom teams","LS technical staffing + consulting","Manufacturing ops + facility staffing","QA/QC + technical documentation","Data engineering + enablement","Scientific insourcing + R+D expertise","Tech transfer + commercialization","Facility stand-up + operational readiness"],
    tactics:["Content — Speed to Commercialization, GxP, Tech Transfer, AI","Brand Advocacy — consistent LS talk track","Sales Enablement — proof packs by service line","Priority Account Plays — geo-targeted + account narrative","Web — updated J+J pages with proof + CTAs"],
    channels:["Content & SEO","Web","Paid Media","Email & ABM","Events & Field","Organic Social"],
    smes:["Charlie Loveall","Bretlyn Morales","Chandan Barhate"],notes:"",strat:"",lt:"2026-04-06",
    reminders:["Check LATAM expansion timeline with delivery team","Follow up on manufacturing proof pack distribution","Review tech transfer content performance"],
    newsLastRefresh:""},

  {id:"lilly",name:"Eli Lilly",ini:"EL",ind:"Life Sciences",st:"growth",hp:55,rev:"TBD",
    mp:"Rapid GLP-1 scale-up driving M&Q demand. 80% of investment in Manufacturing & Quality. Investing heavily in AI process optimization. Saturated with vendors — needs strategic FSP partners. IG underrecognized in M&Q and AI/Data.",
    signals:["Rapid M&Q scale-up: oral GLP-1 + future pipeline","Accelerating digital transformation + AI/data","Cost, quality, compliance pressure while scaling","New facilities: Lebanon IN, Virginia, Houston, Cork Ireland","80% of investment in Manufacturing & Quality"],
    pains:["Rapid M&Q Scale Up — compliant workforce fast","Digital/AI Acceleration — AI-driven optimization","Cost/Compliance Pressure vs Accenture/Deloitte","Limited IG visibility beyond staffing","Not yet positioned as trusted FSP leader"],
    goals:["Increase brand awareness + relationship depth","Position as trusted FSP (not just staffing)","Increased meetings with decision makers","Recognition as trusted FSP partner"],
    audience:["M&Q: VP Manufacturing, Director Engineering, QA","AI/Digital: Heads of Data, AI Digital Labs","Procurement: Procurement & Category Leaders"],
    services:["M&Q — stand up, train, manage compliant workforce","AI/Data/Digital — build + integrate compliant AI/ML","FSP Model — customizable, scalable delivery","Engineering teams + documentation","Validation (CQV/CSV)"],
    tactics:["Web — LS page anchored in FSP model","Social/PR — organic through LS SMEs, Chandan PR","Personal Branding — sessions for Lilly sales leaders","TL Ads — targeted to top-of-funnel","IP-based customization for Lilly contacts","Email — LS tailored to known Lilly contacts","Retargeting — highlight partnership wins"],
    channels:["Content & SEO","Web","Paid Media","Email & ABM","Organic Social","Events & Field"],
    smes:["Charlie Loveall","Bretlyn Morales","Chandan Barhate","Bri Sundstrom"],notes:"",strat:"Showcase J&J/Merck delivery success, position as equally capable FSP.",lt:"2026-04-02",
    reminders:["Schedule personal branding sessions with Bretlyn and Bri","Check on Lebanon IN facility build timeline","Review Chandan PR release status"],
    newsLastRefresh:""}
];

// ═══ REAL INSIGHT GLOBAL BLOG CONTENT WITH LINKS ═══
export const CONTENT = [
  // Financial Services
  {id:"c1",title:"AI Implementations Transforming Financial Services in Real Time",type:"Blog",ch:"Content & SEO",ind:"FS",status:"live",activated:["Web","Paid Media","Organic Social"],url:"https://insightglobal.com/blog/ai-implementations-that-are-transforming-financial-services-in-real-time/"},
  {id:"c2",title:"4 Trends in Financial Services in 2026 & Beyond",type:"Blog",ch:"Content & SEO",ind:"FS",status:"live",activated:["Web","Email & ABM","Paid Media"],url:"https://insightglobal.com/blog/financial-services-industry-trends/"},
  {id:"c3",title:"Elevating the Customer Experience in Financial Services",type:"Blog",ch:"Content & SEO",ind:"FS",status:"live",activated:["Web"],url:"https://insightglobal.com/blog/customer-experience-in-financial-services/"},
  {id:"c4",title:"Anti-Money Laundering: The Compliance Bottleneck No One Talks About",type:"Blog",ch:"Content & SEO",ind:"FS",status:"live",activated:["Web","Paid Media","Email & ABM"],url:"https://insightglobal.com/blog/anti-money-laundering-compliance-bottleneck/"},
  {id:"c5",title:"6 Benefits of Partnering with a Staffing Agency for Financial Services",type:"Blog",ch:"Content & SEO",ind:"FS",status:"live",activated:["Web"],url:"https://insightglobal.com/blog/partnering-with-staffing-agency-for-financial-services/"},
  {id:"c6",title:"Open Banking Clarity in 2026: What Financial Leaders Need to Know",type:"Blog",ch:"Content & SEO",ind:"FS",status:"live",activated:["Web","Paid Media"],url:"https://insightglobal.com/blog/open-banking-clarity-for-financial-leaders"},
  {id:"c7",title:"Where Tokenization and Digital Currency Fit in Financial Services",type:"Blog",ch:"Content & SEO",ind:"FS",status:"live",activated:["Web"],url:"https://insightglobal.com/blog/tokenization-and-digital-currency"},
  {id:"c8",title:"Leading Business Transformation with AI",type:"Blog",ch:"Content & SEO",ind:"FS",status:"live",activated:["Web"],url:"https://insightglobal.com/blog/leading-business-transformation-with-ai/"},

  // Life Sciences
  {id:"c9",title:"Trends Shaping the Life Sciences Landscape in 2026",type:"Blog",ch:"Content & SEO",ind:"LS",status:"live",activated:["Web","Organic Social","Email & ABM"],url:"https://insightglobal.com/blog/top-trends-shaping-life-sciences/"},
  {id:"c10",title:"10 Amazing Ways AI is Revolutionizing Life Sciences",type:"Blog",ch:"Content & SEO",ind:"LS",status:"live",activated:["Web","Organic Social"],url:"https://insightglobal.com/blog/ai-in-life-sciences/"},
  {id:"c11",title:"Innovation in Life Sciences: Where the Future is Heading",type:"Blog",ch:"Content & SEO",ind:"LS",status:"live",activated:["Web","Paid Media"],url:"https://insightglobal.com/blog/innovation-in-life-sciences/"},
  {id:"c12",title:"Accelerating Innovation in Life Sciences: The Race for Optimization",type:"Blog",ch:"Content & SEO",ind:"LS",status:"live",activated:["Web","Organic Social"],url:"https://insightglobal.com/blog/life-sciences-accelerating-innovation/"},
  {id:"c13",title:"Why Digital Twins Are the Future of Healthcare/Pharma Innovation",type:"Blog",ch:"Content & SEO",ind:"LS",status:"live",activated:["Web"],url:"https://insightglobal.com/blog/digital-twins-healthcare-pharma/"},
  {id:"c14",title:"11 Leading Life Sciences Jobs Hiring in 2026",type:"Blog",ch:"Content & SEO",ind:"LS",status:"live",activated:["Web"],url:"https://insightglobal.com/blog/11-hiring-life-sciences-jobs/"},
  {id:"c15",title:"5 Essential Roles & Top Skills in Life Sciences",type:"Blog",ch:"Content & SEO",ind:"LS",status:"live",activated:["Web"],url:"https://insightglobal.com/blog/roles-in-life-s/"},
  {id:"c16",title:"Intro to Life Sciences with Chandan Barhate (Video)",type:"Video",ch:"Organic Social",ind:"LS",status:"live",activated:["Web","Organic Social"],url:"https://evergreen.insightglobal.com/our-experts/chandan-barhate/"},

  // Industry Pages (not blog posts but important content)
  {id:"c17",title:"Financial Services Industry Page",type:"Web Page",ch:"Web",ind:"FS",status:"live",activated:["Web"],url:"https://insightglobal.com/industries/financial-services/"},
  {id:"c18",title:"Life Sciences Trends Hub",type:"Web Page",ch:"Web",ind:"LS",status:"live",activated:["Web"],url:"https://insightglobal.com/life-sciences-trends/"},

  // Content NEEDED (from strategy decks)
  {id:"c19",title:"State Farm POV (1-pager + LinkedIn carousel)",type:"PDF",ch:"Content & SEO",ind:"FS",status:"needed",activated:[],url:""},
  {id:"c20",title:"BOA AML Case Study",type:"Case Study",ch:"Content & SEO",ind:"FS",status:"needed",activated:[],url:""},
  {id:"c21",title:"Capital One Risk-First Re-Entry POV",type:"Blog",ch:"Content & SEO",ind:"FS",status:"in-progress",activated:[],url:""},
  {id:"c22",title:"Insurance Cost Optimization Content (for State Farm)",type:"Blog",ch:"Content & SEO",ind:"FS",status:"needed",activated:[],url:""},
  {id:"c23",title:"CSP Delivery Case Study",type:"Case Study",ch:"Content & SEO",ind:"FS",status:"needed",activated:[],url:""},
  {id:"c24",title:"J&J Manufacturing Case Study",type:"Case Study",ch:"Content & SEO",ind:"LS",status:"needed",activated:[],url:""},
  {id:"c25",title:"Eli Lilly M&Q/AI Case Study",type:"Case Study",ch:"Content & SEO",ind:"LS",status:"needed",activated:[],url:""},
  {id:"c26",title:"Surge Staffing + Data & AI Landing Page",type:"Web Page",ch:"Web",ind:"FS",status:"needed",activated:[],url:""},
  {id:"c27",title:"State Farm Resource Hub",type:"Web Page",ch:"Web",ind:"FS",status:"needed",activated:[],url:""},
  {id:"c28",title:"Capital One Proof Hub / Landing Page",type:"Web Page",ch:"Web",ind:"FS",status:"needed",activated:[],url:""},
  {id:"c29",title:"Eli Lilly IP-Based Personalized Landing Page",type:"Web Page",ch:"Web",ind:"LS",status:"needed",activated:[],url:""},
];

export const CHANNEL_STRATEGIES = {
  "Paid Media":{e:"📣",s:"Geo-targeted thought leadership ads by account. Retarget engaged contacts. Boost SME posts.",opts:["LinkedIn TL ads — higher CTR for FS/LS decision-maker titles","Geo-fence account HQs: Charlotte (BOA), ATL (SF), McLean (C1), RTP (Lilly)","Retargeting: TOF engagers → MOF proof packs → BOF case study","A/B test: outcomes messaging vs people-first trust per industry","IP-based targeting for known account domains"],news:["LinkedIn Thought Leader Ads allow boosting employee posts directly","Meta B2B targeting now includes job function + seniority layering","Google Performance Max supports B2B lead gen with CRM integration","ABM platforms (6sense, Demandbase) offer intent signal layering"],plays:["BOA → Charlotte retarget with AML/AI proof","SF → ATL geo-targeted, proximity + cost optimization","C1 → Light LinkedIn to fraud/procurement in Dallas/Richmond","J&J → RTP/Lebanon geo-target, manufacturing + FSP","Lilly → TL ads to M&Q/AI titles at target locations"]},
  "Email & ABM":{e:"📧",s:"Account-tailored email series. Nurture by funnel stage. Proof-driven content drops.",opts:["Segment by account + funnel stage","Personalize: 'AML execution' for BOA vs 'GxP-ready delivery' for J&J","Trigger-based: website visit → email within 24hrs","SME quotes/headshots build recognition pre-meeting","Track email-to-meeting conversion by account"],news:["HubSpot AI email writer for personalized sequences","Intent data (Bombora, 6sense) feeds into HubSpot workflows","Gmail/Yahoo DMARC authentication now required","Interactive email elements showing 2-3x engagement"],plays:["BOA → AML/AI drip + proof pack follow-up","SF → Insurance content, CSP-language to procurement","C1 → Risk-first fraud prevention content","J&J → Manufacturing + tech transfer to R&D leaders","Lilly → FSP model + M&Q to procurement/engineering"]},
  "Content & SEO":{e:"📝",s:"POV content builds credibility. Success = referenced in meetings unlocking stakeholder access.",opts:["Prioritize proof content over awareness — case studies move deals","SEO clusters: 'AML staffing', 'FSP life sciences partner'","Account-specific repurposing: POV → PDF + carousel + email","Quarterly cadence: Speed to Commercialization, GxP, AI in FS","Gate BOF content to capture unknown visitor info"],news:["Google AI Overviews dominating SERP — optimize for snippets","LinkedIn articles indexed by Google — dual visibility","Short-form (<1200 words) outperforming for B2B","Video SEO: embed 2-3 min explainers for 2x time-on-page"],plays:["BOA → AI in AML, deepfake fraud, execution outcomes","SF → Cost optimization, OSP-to-CSP, surge staffing","C1 → Risk-first POV, fraud prevention, AML compliance","J&J → Speed to commercialization, tech transfer, facility readiness","Lilly → AI in pharma manufacturing, GLP-1 delivery, FSP positioning"]},
  "Events & Field":{e:"🎯",s:"Local activation. 'Show don't tell' sessions for stakeholder relationship building.",opts:["Small 8-12 person dinners over large conferences","'IG Experience': 45-min showcase + Q&A at IG offices","Bundle events with account campaigns for conversion","Immediate follow-up: email 24hrs, LinkedIn 48hrs","Document events for social proof + retargeting"],news:["In-person outperforming hybrid for relationship accounts","Executive roundtable format trending (6-8 C-suite, no pitch)","Micro-events showing higher ABM conversion","Event platforms (Splash, Bizzabo) integrate with HubSpot"],plays:["BOA → Charlotte in-office stakeholder touchpoints","SF → ATL 'show don't tell' CSP session","C1 → Small Richmond/McLean trust-building touchpoint","J&J → RTP facility visit, manufacturing showcase","Lilly → Indianapolis/Lebanon M&Q activation"]},
  "Philanthropy":{e:"💝",s:"Community stories build trust. Proof we invest where we work.",opts:["Align with account geographies — ATL, Charlotte, Indianapolis","Create shareable 'community impact' content","Partner with local orgs near account HQs","Document with video/photo for social + retargeting","Connect to brand shift: 'community partners, not vendors'"],news:["CSR influencing vendor selection in procurement","ESG reporting growing — document for RFPs","Employee volunteerism boosting brand advocacy","Local community stories 3x engagement on LinkedIn"],plays:["SF → ATL community investment stories","BOA → Charlotte community engagement","Lilly → Indianapolis community presence","J&J → Community health initiatives","C1 → Richmond/McLean brand warmth rebuilding"]},
  "Web":{e:"🌐",s:"FS/LS story in 60 seconds. Account-specific landing pages. IP-based customization.",opts:["Account landing pages: SF hub, C1 proof hub, Lilly capabilities","IP-based customization for known account domains","FS page: sub-sector language + proof modules","LS page: FSP model + manufacturing + global delivery","Clear CTAs: 'See how we deliver' + gated case studies"],news:["Personalization platforms (Mutiny) support ABM customization","Core Web Vitals: Google prioritizing page speed","AI chatbots showing 30-40% qualified lead increase","Progressive profiling replacing single gate forms"],plays:["SF → OSP+CSP language, insurance proof, ATL proximity","C1 → Fraud-first proof hub, pain point anchored","BOA → Updated global delivery + AML/AI proof","J&J → Manufacturing proof + tech transfer","Lilly → IP-personalized M&Q + FSP + SME spotlights"]},
  "Creative":{e:"🎨",s:"Account-specific visual assets. Carousels, infographics, video spotlights, proof packs.",opts:["Visual proof packs: 1-page PDF + carousel + email hero","SME spotlight videos (2-3 min) — Chandan for LS","Industry infographics: 'IG in FS' and 'IG in LS'","Consistent visual system per account — branded templates","Short-form video: 60-sec overviews, 30-sec proof clips"],news:["LinkedIn carousels getting 2-3x engagement vs single image","Short-form vertical video viable for B2B","Canva enterprise supports brand template locking","AI-generated creative accelerating ideation speed"],plays:["SF → POV → PDF + carousel + boosted","BOA → AML metrics proof pack + timeline visual","C1 → Screening rigor infographic","J&J → Manufacturing capabilities chart, FSP comparison","Lilly → M&Q infographic, Chandan spotlight"]},
  "Organic Social":{e:"📱",s:"SME-led organic. Personal branding coaching for target audience visibility.",opts:["Personal branding sessions — coach to post 2-3x/week","'React and comment' calendar for industry news","Pre-approved LinkedIn post library by industry","Employee advocacy: 10 employees = 5-10x company page reach","Track top-performing SME posts, double down"],news:["LinkedIn algorithm favors comments over likes","LinkedIn newsletters gaining B2B traction","Employee advocacy platforms integrate for one-click sharing","LinkedIn Collaborative Articles driving profile visibility"],plays:["BOA → Sales leaders share AI/AML targeting Charlotte contacts","SF → LinkedIn coaching, insurance expertise to procurement","C1 → Personalized outreach + discussion prompting","J&J → LS SMEs share manufacturing + tech transfer insights","Lilly → Chandan + team personal branding on pharma AI/M&Q"]}
};

export const DEFAULT_TASKS = [
  {id:"t1",text:"Finalize Q2 BOA campaign brief — AML thought leadership",status:"In Progress",due:"2026-04-08",pr:"high",notes:"Need to pull latest AML metrics. Check with Grace for stakeholder updates.",acc:"Bank of America",archived:false},
  {id:"t2",text:"Update State Farm Insurance page with OSP + CSP language",status:"Not Started",due:"2026-04-10",pr:"high",notes:"Coordinate with web team. Reference slides 21-23 from FS strategy deck.",acc:"State Farm",archived:false},
  {id:"t3",text:"Build Capital One risk-first re-entry POV",status:"Not Started",due:"2026-04-12",pr:"medium",notes:"Blog/article format. Focus on fraud-first screening. Grace Han to review.",acc:"Capital One",archived:false},
  {id:"t4",text:"Prep J&J monthly deck — manufacturing proof points",status:"In Progress",due:"2026-04-11",pr:"high",notes:"Include tech transfer metrics, facility timeline, LATAM update.",acc:"Johnson & Johnson",archived:false},
  {id:"t5",text:"Eli Lilly personal branding sessions for sales leaders",status:"Not Started",due:"2026-04-14",pr:"medium",notes:"Schedule with Bretlyn and Bri. Focus on M&Q and AI/Digital for LinkedIn.",acc:"Eli Lilly",archived:false},
  {id:"t6",text:"Review LinkedIn ad performance — FS thought leadership",status:"Not Started",due:"2026-04-09",pr:"medium",notes:"Pull CTR by account geo. Compare Charlotte vs ATL vs Dallas.",acc:"",archived:false},
  {id:"t7",text:"Create State Farm proof pack: case snapshots + metrics",status:"Complete",due:"2026-04-05",pr:"high",notes:"Completed. Includes cost optimization case and retention metrics.",acc:"State Farm",archived:true},
];

export const DEFAULT_LAUNCHES = [
  {id:"l1",name:"BOA AML Thought Leadership Series",st:"in-progress",acc:"Bank of America",ch:"Content & SEO",dt:"2026-04-15"},
  {id:"l2",name:"State Farm Local Activation — ATL",st:"upcoming",acc:"State Farm",ch:"Events & Field",dt:"2026-04-22"},
  {id:"l3",name:"Capital One Risk-First POV Campaign",st:"upcoming",acc:"Capital One",ch:"Paid Media",dt:"2026-04-28"},
  {id:"l4",name:"J&J Manufacturing Proof Pack",st:"in-progress",acc:"Johnson & Johnson",ch:"Web",dt:"2026-04-12"},
  {id:"l5",name:"Eli Lilly IP-Based Landing Page",st:"upcoming",acc:"Eli Lilly",ch:"Web",dt:"2026-05-01"},
  {id:"l6",name:"FS Geo-Targeted LinkedIn Campaign",st:"launched",acc:"Bank of America",ch:"Paid Media",dt:"2026-03-28"},
];

export const DEFAULT_GOALS = [
  {id:"g1",name:"Progress priority FS accounts",tgt:3,cur:1,tp:"accounts"},
  {id:"g2",name:"Launch 8 campaigns this quarter",tgt:8,cur:4,tp:"launches"},
  {id:"g3",name:"Complete 25 tasks this week",tgt:25,cur:15,tp:"tasks"},
  {id:"g4",name:"Build proof packs per service line",tgt:6,cur:2,tp:"strategy"},
  {id:"g5",name:"Document case studies",tgt:5,cur:1,tp:"strategy"},
];
