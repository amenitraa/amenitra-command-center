-- Amenitra's Command Center
-- Starter seed data for industries, accounts, stakeholders,
-- pain hierarchy, current signals, and meeting reminders.

with financial_services as (
  insert into industries (name)
  values ('Financial Services')
  on conflict (name) do update set name = excluded.name
  returning id, name
),
life_sciences as (
  insert into industries (name)
  values ('Life Sciences')
  on conflict (name) do update set name = excluded.name
  returning id, name
),
industry_lookup as (
  select id, name from financial_services
  union all
  select id, name from life_sciences
),
upsert_accounts as (
  insert into accounts (
    slug,
    industry_id,
    name,
    revenue_target,
    status,
    focus,
    market_position,
    consultant_positioning
  )
  values
    (
      'boa',
      (select id from industry_lookup where name = 'Financial Services'),
      'Bank of America',
      '$102M',
      'Key account',
      'AML, cloud, AI, fraud',
      'Bank of America remains a large-scale modernization and control environment where execution credibility matters as much as innovation language. The account is under constant pressure to improve resilience, fraud controls, AML throughput, data access, and cloud maturity without increasing operational risk. That creates room for a partner who can show disciplined delivery, not just ideas.',
      'Lead with controlled execution, procurement-defensible proof, and a point of view on AML, fraud, cloud, and AI adoption with governance.'
    ),
    (
      'state-farm',
      (select id from industry_lookup where name = 'Financial Services'),
      'State Farm',
      '$2M',
      'New logo',
      'CSP path, surge staffing, data + AI',
      'State Farm is balancing digital transformation, data and analytics integration, claims and underwriting pressure, and insurance-market volatility at the same time. The account story is not just modernization, it is modernization while managing catastrophe exposure, profitability pressure, customer experience expectations, and operating scale. That makes speed-with-control and surge support especially relevant.',
      'Show up as a practical partner who can stabilize operations, support claims and underwriting pressure, and create a credible CSP path.'
    ),
    (
      'capital-one',
      (select id from industry_lookup where name = 'Financial Services'),
      'Capital One',
      'Re-entry',
      'Re-entry',
      'Fraud-first, AML/KYC, procurement trust rebuild',
      'Capital One is a re-entry account where trust, risk posture, and procurement credibility are central. The opportunity is not about flooding the zone with marketing; it is about showing that Insight Global can be a safe, documented, low-friction extension of internal teams in areas like fraud, AML/KYC, and controlled delivery support.',
      'Lead with fraud-first controls, low-risk re-entry, and clean delivery proof that procurement can trust.'
    ),
    (
      'jnj',
      (select id from industry_lookup where name = 'Life Sciences'),
      'Johnson & Johnson',
      '$104M',
      'Key account',
      'R&D, manufacturing, FSP',
      'Johnson & Johnson is a scale account where manufacturing readiness, R&D execution, and disciplined support models matter. The opportunity is not only to position around innovation, but to show how Insight Global helps complex programs move faster with better continuity across manufacturing, facility readiness, and functional service support.',
      'Show how IG supports scale, speed, and operational readiness across manufacturing and R&D environments without sacrificing quality.'
    ),
    (
      'eli-lilly',
      (select id from industry_lookup where name = 'Life Sciences'),
      'Eli Lilly',
      'Growth',
      'Growth',
      'M&Q, AI/digital, FSP model positioning',
      'Eli Lilly is a growth account where scale-up urgency creates space for a much sharper consultant-led story. The account is well suited for positioning around manufacturing and quality support, AI and digital enablement, and FSP-based execution leverage, especially when the narrative stays focused on speed, throughput, and readiness.',
      'Position IG around M&Q support, digital acceleration, and FSP structure that helps the business move quickly and confidently.'
    )
  on conflict (slug) do update set
    industry_id = excluded.industry_id,
    name = excluded.name,
    revenue_target = excluded.revenue_target,
    status = excluded.status,
    focus = excluded.focus,
    market_position = excluded.market_position,
    consultant_positioning = excluded.consultant_positioning,
    updated_at = now()
  returning id, slug
)
select 1;

delete from account_stakeholders
where account_id in (select id from accounts where slug in ('boa', 'state-farm', 'capital-one', 'jnj', 'eli-lilly'));

insert into account_stakeholders (account_id, name)
values
  ((select id from accounts where slug = 'boa'), 'Emily Outen'),
  ((select id from accounts where slug = 'boa'), 'Lia Larson'),
  ((select id from accounts where slug = 'state-farm'), 'Erin Meadows'),
  ((select id from accounts where slug = 'state-farm'), 'Charlie Loveall'),
  ((select id from accounts where slug = 'state-farm'), 'Rachel Peacock'),
  ((select id from accounts where slug = 'capital-one'), 'Grace Han'),
  ((select id from accounts where slug = 'capital-one'), 'Charlie Loveall'),
  ((select id from accounts where slug = 'capital-one'), 'Rachel Peacock'),
  ((select id from accounts where slug = 'jnj'), 'Ashley Nash'),
  ((select id from accounts where slug = 'jnj'), 'Katie Wasko'),
  ((select id from accounts where slug = 'eli-lilly'), 'Charlie Loveall'),
  ((select id from accounts where slug = 'eli-lilly'), 'Katie Wasko');

delete from account_reminders
where account_id in (select id from accounts where slug in ('boa', 'state-farm', 'capital-one', 'jnj', 'eli-lilly'));

insert into account_reminders (account_id, note)
values
  ((select id from accounts where slug = 'boa'), 'Bring stronger proof points tied to AML and fraud throughput improvements.'),
  ((select id from accounts where slug = 'boa'), 'Surface any cloud modernization wins that help expand beyond current trust zones.'),
  ((select id from accounts where slug = 'state-farm'), 'Mention any claims, AI, or staffing updates that support surge delivery relevance.'),
  ((select id from accounts where slug = 'state-farm'), 'Reinforce the Atlanta proximity and local credibility angle.'),
  ((select id from accounts where slug = 'capital-one'), 'Bring controlled-entry language and proof assets into the next meeting.'),
  ((select id from accounts where slug = 'capital-one'), 'Reinforce how IG lowers risk instead of adding vendor friction.'),
  ((select id from accounts where slug = 'jnj'), 'Bring facility stand-up and FSP proof into the meeting narrative.'),
  ((select id from accounts where slug = 'jnj'), 'Connect manufacturing support to practical readiness and throughput.'),
  ((select id from accounts where slug = 'eli-lilly'), 'Tie talking points to scale-up pressure and operational readiness.'),
  ((select id from accounts where slug = 'eli-lilly'), 'Bring a clear point of view on digital acceleration, not just staffing support.');

delete from account_pain_points
where account_id in (select id from accounts where slug in ('boa', 'state-farm', 'capital-one', 'jnj', 'eli-lilly'));

insert into account_pain_points (account_id, rank, note)
values
  ((select id from accounts where slug = 'boa'), 1, 'AML and fraud operations still require throughput improvement without weakening controls or audit readiness.'),
  ((select id from accounts where slug = 'boa'), 2, 'AI conversations are moving forward, but they need a clear governance and adoption path instead of broad experimentation.'),
  ((select id from accounts where slug = 'boa'), 3, 'Cloud and data modernization work must show business value without creating new risk for already-complex teams.'),
  ((select id from accounts where slug = 'boa'), 4, 'Vendor trust remains tied to proof, documentation, and execution discipline rather than capability claims alone.'),
  ((select id from accounts where slug = 'boa'), 5, 'Stakeholder attention is fragmented across compliance, technology, security, and customer pressure.'),

  ((select id from accounts where slug = 'state-farm'), 1, 'Claims, underwriting, and service operations need support while the business is still absorbing volatility and catastrophe pressure.'),
  ((select id from accounts where slug = 'state-farm'), 2, 'Data, analytics, and AI ambitions require more delivery talent and operating discipline to move from interest to scaled execution.'),
  ((select id from accounts where slug = 'state-farm'), 3, 'Digital modernization has to move quickly without disrupting customer-facing stability or core insurance operations.'),
  ((select id from accounts where slug = 'state-farm'), 4, 'Insurance profitability pressure raises the bar for any outside partner to show cost discipline and measurable operational lift.'),
  ((select id from accounts where slug = 'state-farm'), 5, 'The buying conversation is likely to favor practical, regionally credible partners over abstract transformation narratives.'),

  ((select id from accounts where slug = 'capital-one'), 1, 'Procurement trust and vendor risk posture create a higher bar for entry than standard demand generation alone can solve.'),
  ((select id from accounts where slug = 'capital-one'), 2, 'Fraud, candidate authenticity, and delivery quality are likely shaping how outside partners are evaluated.'),
  ((select id from accounts where slug = 'capital-one'), 3, 'Any new engagement path has to feel low-risk, controlled, and easy to defend internally.'),
  ((select id from accounts where slug = 'capital-one'), 4, 'Risk, compliance, and operations teams need proof of reliability before broader positioning will land.'),
  ((select id from accounts where slug = 'capital-one'), 5, 'Expansion depends on getting the first scoped win cleanly and visibly.'),

  ((select id from accounts where slug = 'jnj'), 1, 'Manufacturing and supply chain readiness create pressure for reliable execution support, not just strategic planning.'),
  ((select id from accounts where slug = 'jnj'), 2, 'R&D and product development environments still need speed without sacrificing quality, continuity, or documentation.'),
  ((select id from accounts where slug = 'jnj'), 3, 'FSP positioning has to feel like operational leverage, not just another staffing label.'),
  ((select id from accounts where slug = 'jnj'), 4, 'Large-scale programs demand partners that can support facility stand-up, transfer, and continuity across regions.'),
  ((select id from accounts where slug = 'jnj'), 5, 'Innovation messaging only lands when it is grounded in actual program movement and output.'),

  ((select id from accounts where slug = 'eli-lilly'), 1, 'M&Q scale-up pressure raises the value of practical execution support that can move quickly.'),
  ((select id from accounts where slug = 'eli-lilly'), 2, 'AI and digital conversations need to connect directly to throughput, readiness, and operational value.'),
  ((select id from accounts where slug = 'eli-lilly'), 3, 'FSP has to be positioned as a model for speed and continuity, not a generic delivery label.'),
  ((select id from accounts where slug = 'eli-lilly'), 4, 'Rapid growth increases the importance of specialized support and clean stakeholder follow-through.'),
  ((select id from accounts where slug = 'eli-lilly'), 5, 'The strongest conversation will center on scale, speed, and confidence rather than broad innovation language.');

delete from account_signals
where account_id in (select id from accounts where slug in ('boa', 'state-farm', 'capital-one', 'jnj', 'eli-lilly'));

insert into account_signals (account_id, title, detail, source_label, source_url)
values
  ((select id from accounts where slug = 'boa'), 'Financial crime and fraud pressure continues to keep operational efficiency and control in the spotlight', 'This keeps AML, fraud operations, and identity-focused support relevant when the story is tied to throughput, risk reduction, and clean execution.', 'Earnings / Investor Commentary', '#'),
  ((select id from accounts where slug = 'boa'), 'AI remains a live topic, but the buying lens is governed enablement rather than experimentation', 'Position AI as a safe path tied to operations, controls, analytics, and business outcomes instead of futuristic transformation language.', 'Industry / Company Trend', '#'),
  ((select id from accounts where slug = 'boa'), 'Identity, access, and trust architecture conversations are getting more executive visibility', 'That makes identity-first security and compliant delivery more important than generic cyber positioning.', 'Security / Risk Theme', '#'),
  ((select id from accounts where slug = 'boa'), 'Customer experience and internal efficiency are increasingly connected in modernization work', 'Frame cloud, data, and AI support around speed, trust, and smoother customer-facing operations in regulated environments.', 'CX / Ops Signal', '#'),
  ((select id from accounts where slug = 'boa'), 'The market expectation is shifting from foundation-building to measurable leverage from existing investments', 'Show how Insight Global helps turn transformation effort into actual delivery lift now, not just longer-term potential.', '2026 Planning Signal', '#'),

  ((select id from accounts where slug = 'state-farm'), 'Claims and underwriting pressure keeps surge support and staffing stability highly relevant', 'Tie the story to operational stability, improved cycle times, and practical relief for overloaded teams.', 'Insurance Operating Signal', '#'),
  ((select id from accounts where slug = 'state-farm'), 'Data, analytics, and AI are converging under a more integrated digital mandate', 'Position your value around delivery support, data talent, and consistent execution rather than innovation language alone.', 'Leadership / Org Signal', '#'),
  ((select id from accounts where slug = 'state-farm'), 'Insurance carriers are operating under simultaneous catastrophe, regulatory, and cost pressure', 'Lead with cost-conscious operational lift and stable delivery instead of abstract transformation positioning.', 'Insurance Industry Signal', '#'),
  ((select id from accounts where slug = 'state-farm'), 'Claims spikes and property-loss volatility create a strong wedge for practical consultant support', 'Use surge staffing, follow-through, and process stability language when you want to make the account story feel immediate.', 'Claims / Catastrophe Signal', '#'),
  ((select id from accounts where slug = 'state-farm'), 'Compliant modernization for data and AI is becoming a practical operating conversation', 'Position data + AI as disciplined modernization with strong controls, not experimental AI transformation.', 'AI / Modernization Signal', '#'),

  ((select id from accounts where slug = 'capital-one'), 'Procurement trust remains the biggest barrier to re-entry', 'All messaging should reduce perceived risk, reinforce governance, and feel easy for stakeholders to defend internally.', 'Account Strategy Signal', '#'),
  ((select id from accounts where slug = 'capital-one'), 'Fraud and candidate-authenticity concerns are shaping vendor evaluation', 'Use screening controls, retention stability, and clean delivery language as differentiators.', 'Risk / Vendor Signal', '#'),
  ((select id from accounts where slug = 'capital-one'), 'Identity, access, and trust concerns are becoming more visible across financial institutions', 'Use this to reinforce fraud-first controls and compliant re-entry messaging rather than generic talent language.', 'Security / Risk Signal', '#'),
  ((select id from accounts where slug = 'capital-one'), 'Financial organizations are expecting more leverage from existing modernization investments', 'Bring low-risk proof that shows how IG helps realize gains without increasing procurement friction.', 'Planning Signal', '#'),
  ((select id from accounts where slug = 'capital-one'), 'Fraud, AI, and customer trust are increasingly connected in buying conversations', 'Keep the message narrow: safe execution, reliable consultants, and documented proof over broad transformation positioning.', 'Market Signal', '#'),

  ((select id from accounts where slug = 'jnj'), 'Manufacturing and R&D remain central operating pressure points', 'Keep positioning tied to execution support, speed, reliability, and continuity rather than just innovation language.', 'Life Sciences Strategy', '#'),
  ((select id from accounts where slug = 'jnj'), 'FSP remains a strong credibility anchor when the conversation is about execution depth', 'Use it to differentiate from larger consulting competitors by making it feel practical and operational.', 'Account Summary', '#'),
  ((select id from accounts where slug = 'jnj'), 'Optimization pressure is accelerating across life sciences operations', 'Position J&J support around faster execution, fewer slowdowns, and more resilient delivery.', 'Industry Operating Signal', '#'),
  ((select id from accounts where slug = 'jnj'), 'AI and digital enablement are influencing 2026 planning, but with a practical execution lens', 'Bring a point of view on where digital support helps R&D and manufacturing outcomes instead of over-indexing on innovation buzzwords.', 'Planning Signal', '#'),
  ((select id from accounts where slug = 'jnj'), 'Innovation stories land best when tied to readiness, speed, and optimization', 'Use innovation language only when it leads back to operational readiness and scale.', 'Market Signal', '#'),

  ((select id from accounts where slug = 'eli-lilly'), 'M&Q scale-up keeps the urgency high', 'Anchor actions in speed, support, and throughput rather than generic growth messaging.', 'Life Sciences Summary', '#'),
  ((select id from accounts where slug = 'eli-lilly'), 'AI and digital acceleration can widen the conversation when it is tied to specific operating outcomes', 'Bring concrete next-step ideas rather than broad innovation language.', 'Account Notes', '#'),
  ((select id from accounts where slug = 'eli-lilly'), 'Optimization is becoming a competitive necessity across life sciences operations', 'Tie your point of view to speed, quality, and process stability rather than digital buzzwords alone.', 'Industry Operating Signal', '#'),
  ((select id from accounts where slug = 'eli-lilly'), '2026 planning is reinforcing AI, data, and compliance together', 'Frame AI and digital support around practical adoption in regulated environments.', 'Planning Signal', '#'),
  ((select id from accounts where slug = 'eli-lilly'), 'Innovation stories land best when tied to actual operating lift', 'Use AI and digital acceleration language only when it clearly ties back to speed, throughput, and readiness.', 'Market Signal', '#');
