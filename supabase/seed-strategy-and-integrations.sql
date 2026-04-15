update accounts
set sub_industry = case slug
  when 'boa' then 'Banking'
  when 'state-farm' then 'Insurance'
  when 'capital-one' then 'Banking'
  when 'jnj' then 'Pharma / MedTech'
  when 'eli-lilly' then 'Pharma'
  else sub_industry
end
where slug in ('boa', 'state-farm', 'capital-one', 'jnj', 'eli-lilly');

insert into integration_settings (integration_name, status, config_summary, last_synced_at)
values
  ('Airtable', 'Ready for setup', 'Connect your industry and account boards so Airtable can feed Supabase.', null),
  ('Outlook / Teams', 'Planned', 'Will require Microsoft Graph credentials and permissions.', null),
  ('HubSpot', 'Planned', 'Will require a HubSpot private app token or OAuth connection.', null)
on conflict (integration_name) do update set
  status = excluded.status,
  config_summary = excluded.config_summary,
  last_synced_at = excluded.last_synced_at,
  updated_at = now();

delete from strategy_overview_cards;

insert into strategy_overview_cards (title, text, display_order)
values
  ('Portfolio Shift', 'Move from broad awareness language to consultant-led account narratives grounded in pain, proof, and the next 30-day action.', 1),
  ('Best Growth Wedge', 'Use live company and industry signals to shape account-specific sales hooks before monthly stakeholder meetings.', 2),
  ('Biggest Gap', 'A lot of the strongest themes exist, but they are not always being translated into seller-ready messaging by account and channel.', 3);

delete from strategy_account_moves
where account_id in (select id from accounts where slug in ('boa', 'state-farm', 'capital-one', 'jnj', 'eli-lilly'));

insert into strategy_account_moves (account_id, strategic_shift, next_move)
values
  ((select id from accounts where slug = 'boa'), 'Sharpen the story around AML, fraud, and controlled AI adoption instead of treating modernization as one broad bucket.', 'Build one proof-led follow-up sequence that sales can use after meetings with compliance, fraud, and cloud stakeholders.'),
  ((select id from accounts where slug = 'state-farm'), 'Position Insight Global as the practical support partner for claims pressure, data execution, and compliant AI progression.', 'Translate insurance volatility and operating pressure into a clearer consultant message for the next account conversation.'),
  ((select id from accounts where slug = 'capital-one'), 'Treat the account as a trust rebuild motion first and a demand generation motion second.', 'Package a low-risk re-entry narrative that procurement and risk leaders can defend internally.'),
  ((select id from accounts where slug = 'jnj'), 'Anchor the conversation in manufacturing readiness, R&D execution, and FSP-supported continuity rather than broad innovation.', 'Package manufacturing and facility-support proof into a more board-friendly operational story.'),
  ((select id from accounts where slug = 'eli-lilly'), 'Use scale-up urgency to position IG around M&Q support, digital execution, and FSP leverage.', 'Create a tighter point of view on what sales should say when speed and readiness come up in the room.');

delete from strategy_channel_moves;

insert into strategy_channel_moves (channel_name, recommendation)
values
  ('Email & ABM', 'Use shorter, account-specific briefs with one business pressure, one proof point, and one next-step CTA.'),
  ('Content & SEO', 'Separate company and industry signal intelligence from Insight Global content so the account pages feel like intelligence, not a content library.'),
  ('Events & Field', 'Use local touchpoints as trust accelerators tied to one concrete account pain, not broad relationship maintenance.'),
  ('Web', 'Treat account-adjacent landing pages as proof environments that support the exact story sales needs to tell.');

delete from strategy_knowledge_gaps;

insert into strategy_knowledge_gaps (note, display_order)
values
  ('Which stakeholders are most likely to sponsor or block the next move in each account?', 1),
  ('Which proof points are strong enough to survive procurement or risk scrutiny?', 2),
  ('Which live company or industry signals should directly change next month''s agenda and talking points?', 3),
  ('Where are we still using broad messaging when the account needs a narrower consultant point of view?', 4);
