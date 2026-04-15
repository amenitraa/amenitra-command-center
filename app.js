import { loadAppState, persistAppState, getConnectionModeLabel } from "./lib/data-service.js";

const welcomeScreen = document.getElementById("welcome-screen");
const workspace = document.getElementById("workspace");
const enterWorkspaceButton = document.getElementById("enter-workspace");
const welcomeGrid = document.getElementById("welcome-grid");
const sidebarNav = document.getElementById("sidebar-nav");
const quoteCard = document.getElementById("quote-card");
const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const editModal = document.getElementById("edit-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const closeModalButton = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const editForm = document.getElementById("edit-form");

let state;
let activeView = { page: "Home" };
let connectionMode = "local";
let meetingOutputState = {};
let appReady = false;
let isEnteringWorkspace = false;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getMeetingOutput(accountId) {
  return meetingOutputState[accountId] || {};
}

function buildTeamsMessage(account) {
  const primarySignal = account.signals[0]?.title || account.focus;
  const reminder = account.reminders[0] || "align on the strongest next step";
  return `Hi team, ahead of our ${account.name} meeting I wanted to send a quick preview of where I think the conversation should go. The biggest theme to lean into is ${primarySignal.toLowerCase()}. From a marketing and account-positioning standpoint, I think we should show up with a stronger point of view around ${account.focus}, while keeping the conversation grounded in proof and practical next steps. I’d especially like us to reinforce ${reminder.toLowerCase()}. I’ll come in with a fuller snapshot, but wanted to share the direction in advance so we’re aligned before the meeting.`;
}

function buildDeckBullets(account) {
  const signals = account.signals.slice(0, 3);
  return {
    slideOneTitle: `Performance Snapshot: ${account.name}`,
    slideOneTakeaway: `Momentum is building in ${account.focus}, but we are still leaving value on the table when the account story is not packaged tightly enough around proof, urgency, and a clear next move.`,
    whatWorking: [
      `${account.notes[0] || account.focus}`,
      `${account.notes[1] || account.consultantPositioning}`,
      `${signals[0]?.title || "Recent signals are creating room for a stronger consultant-led conversation"}`
    ],
    whereLosing: [
      "Some of the strongest account themes are not yet being translated into concise seller-ready talk tracks.",
      "Current momentum could stall if the next ask is not tied directly to the account's most visible pain and urgency.",
      "Proof is present, but it still needs tighter packaging to drive stakeholder confidence."
    ],
    funnelSignals: [
      `${signals[0]?.detail || "Awareness is present, but conversion depth is inconsistent."}`,
      `${signals[1]?.detail || "Engagement is strongest when the story is specific to the account pain."}`,
      `${signals[2]?.detail || "The next best move is to connect current signals to a clearer in-room recommendation."}`
    ],
    accountReality: [
      `Market position: ${account.marketPosition}`,
      `Consultant angle: ${account.consultantPositioning}`,
      `Immediate meeting reminders: ${account.reminders.join(" | ")}`
    ],
    slideTwoTitle: "Strategic POV: Where We Win Next",
    coreInsight: account.consultantPositioning,
    opportunityAreas: [
      `Double down on ${account.focus} with proof-led messaging.`,
      "Expand the conversation into the buying group that is closest to the live business pressure.",
      "Reposition the value around speed, trust, operational lift, and low-risk execution."
    ],
    immediateActions: [
      "Launch one sharper follow-up asset or message tied directly to the current account signal.",
      "Activate sales with a one-line hook, one proof point, and one next-step ask.",
      "Use the meeting to align on the next 30-day marketing and stakeholder motion."
    ],
    salesNeedsToDo: [
      "Target the stakeholder group closest to the most urgent business pressure.",
      "Lead with a concise hook focused on pain reduction without increasing risk.",
      "Use the strongest proof point or relevant content asset as support."
    ]
  };
}

function renderMeetingOutputPanels(account) {
  const output = getMeetingOutput(account.id);
  if (!output.teamsMessage && !output.deckData) {
    return "";
  }

  return `
    <div class="goal-grid">
      ${
        output.teamsMessage
          ? `
            <article class="goal-box">
              <span class="label">Generated Teams Message</span>
              <p>${escapeHtml(output.teamsMessage)}</p>
            </article>
          `
          : ""
      }
      ${output.deckData
        ? `
            <article class="goal-box">
              <span class="label">Generated 2-Slide Preview</span>
              <div class="deck-preview">
                <div class="deck-slide">
                  <p class="eyebrow">Slide 1</p>
                  <h3>${escapeHtml(output.deckData.slideOneTitle)}</h3>
                  <p><strong>Executive takeaway:</strong> ${escapeHtml(output.deckData.slideOneTakeaway)}</p>
                  <p><strong>What’s working</strong></p>
                  <ul>
                    ${output.deckData.whatWorking.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                  <p><strong>Where we’re losing</strong></p>
                  <ul>
                    ${output.deckData.whereLosing.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                  <p><strong>Funnel signals</strong></p>
                  <ul>
                    ${output.deckData.funnelSignals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                  <p><strong>Account reality check</strong></p>
                  <ul>
                    ${output.deckData.accountReality.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
                <div class="deck-slide">
                  <p class="eyebrow">Slide 2</p>
                  <h3>${escapeHtml(output.deckData.slideTwoTitle)}</h3>
                  <p><strong>Core insight:</strong> ${escapeHtml(output.deckData.coreInsight)}</p>
                  <p><strong>Opportunity areas</strong></p>
                  <ul>
                    ${output.deckData.opportunityAreas.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                  <p><strong>Immediate actions</strong></p>
                  <ul>
                    ${output.deckData.immediateActions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                  <p><strong>What sales needs to do</strong></p>
                  <ul>
                    ${output.deckData.salesNeedsToDo.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </article>
          `
        : ""}
    </div>
  `;
}

function renderSignalSource(signal) {
  if (!signal.sourceUrl || signal.sourceUrl === "#") {
    return `<p class="meta">${escapeHtml(signal.sourceLabel)}</p>`;
  }

  return `<p class="meta"><a href="${signal.sourceUrl}">${escapeHtml(signal.sourceLabel)}</a></p>`;
}

function deriveSignalNextStep(signal, account) {
  if (signal.nextStep) {
    return signal.nextStep;
  }

  const sourceText = `${signal.title} ${signal.detail}`.toLowerCase();

  if (sourceText.includes("claims") || sourceText.includes("underwriting")) {
    return `Turn this into a practical ${account.name} talking point around surge support, workflow stability, and faster operational throughput.`;
  }

  if (sourceText.includes("ai") || sourceText.includes("analytics") || sourceText.includes("data")) {
    return `Keep the recommendation grounded in governed execution by showing how ${account.name} can move from interest to practical delivery support.`;
  }

  if (sourceText.includes("procurement") || sourceText.includes("trust") || sourceText.includes("risk")) {
    return `Use this signal to tighten the risk-safe narrative and bring one proof point that makes the next step feel easier to approve.`;
  }

  if (sourceText.includes("manufacturing") || sourceText.includes("r&d") || sourceText.includes("m&q")) {
    return `Translate this into a speed-and-readiness message that shows how Insight Global can reduce friction in execution, staffing, or scale-up.`;
  }

  return `Use this signal to sharpen the next meeting agenda, align one stakeholder-specific hook, and recommend one immediate follow-up action tied to ${account.focus}.`;
}

function formatSignalsForEditor(signals) {
  return signals
    .map((signal) => [signal.title, signal.detail, signal.sourceLabel, signal.sourceUrl, signal.nextStep || ""].map((item) => item || "").join(" | "))
    .join("\n");
}

function parseSignalsFromEditor(value) {
  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title = "", detail = "", sourceLabel = "Source", sourceUrl = "#", nextStep = ""] = line.split("|").map((item) => item.trim());
      return {
        title,
        detail,
        sourceLabel: sourceLabel || "Source",
        sourceUrl: sourceUrl || "#",
        nextStep: nextStep || ""
      };
    })
    .filter((signal) => signal.title && signal.detail);
}

function renderWelcomeCards() {
  welcomeGrid.innerHTML = state.welcome.summaryCards
    .map(
      (card) => `
        <article class="card mini-card">
          <h3>${card.title}</h3>
          <p>${card.text}</p>
        </article>
      `
    )
    .join("");
}

function renderNav() {
  sidebarNav.innerHTML = state.navItems
    .map(
      (item) => `
        <button class="nav-item ${activeView.page === item ? "active" : ""}" data-page="${item}" type="button">
          ${item}
        </button>
      `
    )
    .join("");
}

function renderQuote() {
  quoteCard.innerHTML = `
    <p class="eyebrow">${getConnectionModeLabel(connectionMode)}</p>
    <p>"${state.quote.text}"</p>
    <p class="meta">${state.quote.author}</p>
  `;
}

function renderHomePage() {
  pageContent.innerHTML = `
    <div class="overview-grid">
      ${state.overviewCards
        .map(
          (card) => `
            <article class="feature-card">
              <div class="card-title-row">
                <div>
                  <p class="eyebrow">${card.title}</p>
                  <h2>${card.value}</h2>
                </div>
              </div>
              <p>${card.text}</p>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="feature-grid">
      <article class="feature-card">
        <div class="section-header">
          <h2>What Did I Miss?</h2>
          <button class="ghost-button" type="button">Refresh Snapshot</button>
        </div>
        <div class="list-stack">
          ${state.whatDidIMiss
            .map(
              (item) => `
                <div class="list-item">
                  <strong>${item.title}</strong>
                  <p>${item.text}</p>
                </div>
              `
            )
            .join("")}
        </div>
      </article>

      <article class="feature-card">
        <div class="section-header">
          <h2>Weekly Focus</h2>
          <span class="tag">Monday 7:00am Refresh</span>
        </div>
        <div class="list-stack">
          ${state.priorities
            .map(
              (group) => `
                <div class="list-item">
                  <strong>${group.title}</strong>
                  <ul>
                    ${group.items.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </div>
              `
            )
            .join("")}
        </div>
      </article>
    </div>
    <div class="section-header">
      <h2>Accounts Snapshot</h2>
      <button class="secondary-button" data-open-page="Accounts" type="button">Open Accounts Hub</button>
    </div>
    <div class="account-grid">
      ${state.accounts
        .map(
          (account) => `
            <article class="account-card">
              <div class="account-card-header">
                <div>
                  <p class="eyebrow">${account.industry}</p>
                  <h3>${account.name}</h3>
                </div>
                <span class="tag">${account.status}</span>
              </div>
              <p><strong>Focus:</strong> ${account.focus}</p>
              <p><strong>Target:</strong> ${account.target}</p>
              <p><strong>Stakeholders:</strong> ${account.stakeholders.join(", ")}</p>
              <ul>
                ${account.notes.map((note) => `<li>${note}</li>`).join("")}
              </ul>
              <div class="actions-row">
                <button class="secondary-button" data-open-account="${account.id}" type="button">Open Account</button>
                <button class="ghost-button" data-open-meeting="${account.id}" type="button">Prep Meeting</button>
              </div>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="section-header">
      <h2>Channel Command Preview</h2>
      <button class="secondary-button" data-open-page="Channel Command" type="button">Open Channel Command</button>
    </div>
    <div class="channel-grid">
      ${state.channels
        .map(
          (channel) => `
            <article class="feature-card">
              <div class="card-title-row">
                <div>
                  <p class="eyebrow">Editable Channel Card</p>
                  <h3>${channel.name}</h3>
                </div>
                <span class="tag">AI Recs Planned</span>
              </div>
              <p>${channel.idea}</p>
            </article>
          `
        )
        .join("")}
    </div>

    <article class="meeting-card">
      <div class="meeting-header">
        <div>
          <p class="eyebrow">Meetings</p>
          <h3>${state.meetingPrep.title}</h3>
        </div>
        <span class="tag">In-App Preview First</span>
      </div>
      <p>${state.meetingPrep.text}</p>
      <ul>
        ${state.meetingPrep.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
      </ul>
      <div class="meeting-card-footer">
        <button class="primary-button" data-open-meeting="state-farm" type="button">Generate Prep</button>
        <button class="ghost-button" data-open-page="Meetings" type="button">Open Meeting Workspace</button>
      </div>
    </article>
  `;
}

function renderAccountsPage() {
  pageContent.innerHTML = `
    <div class="section-header">
      <h2>Accounts Hub</h2>
      <span class="tag">Editable War Rooms</span>
    </div>
    <div class="account-grid">
      ${state.accounts
        .map(
          (account) => `
            <article class="account-card">
              <div class="account-card-header">
                <div>
                  <p class="eyebrow">${account.industry}</p>
                  <h3>${account.name}</h3>
                </div>
                <span class="tag">${account.status}</span>
              </div>
              <p>${account.marketPosition}</p>
              <div class="meta-row">
                <span class="tag">${account.target}</span>
                <span class="tag">${account.focus}</span>
              </div>
              <div class="actions-row">
                <button class="secondary-button" data-open-account="${account.id}" type="button">Open War Room</button>
                <button class="ghost-button" data-edit-account="${account.id}" type="button">Edit</button>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderAccountDetailPage(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account) {
    renderAccountsPage();
    return;
  }

  pageContent.innerHTML = `
    <div class="section-header">
      <div class="account-hero">
        <div class="account-mark">${escapeHtml(account.name.slice(0, 2).toUpperCase())}</div>
        <div>
          <h2>${account.name}</h2>
          <p class="meta">${account.industry}${account.subIndustry ? ` • ${account.subIndustry}` : ""}</p>
        </div>
      </div>
      <div class="actions-row">
        <button class="secondary-button" data-refresh-account="${account.id}" type="button">Refresh Account</button>
        <button class="ghost-button" data-edit-account="${account.id}" type="button">Edit Account</button>
      </div>
    </div>

    <article class="feature-card detail-section">
      <div class="card-title-row">
        <div>
          <p class="eyebrow">Market Position</p>
          <h3>Account Reality Check</h3>
        </div>
        <span class="tag">${account.status}</span>
      </div>
      <p>${account.marketPosition}</p>
      <div class="meta-row">
        <span class="tag">Target ${account.target}</span>
        <span class="tag">${account.focus}</span>
      </div>
    </article>

    <div class="detail-layout detail-layout-top">
      <div class="detail-main">
        <article class="feature-card detail-section intelligence-panel">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Current Signals</p>
              <h3>What Is Happening In The Company And Industry</h3>
            </div>
            <span class="tag">Intelligence View</span>
          </div>
          <div class="signal-list">
            ${account.signals
              .map(
                (signal) => `
                  <div class="signal-item signal-item-accent">
                    <strong>${signal.title}</strong>
                    <p>${signal.detail}</p>
                    ${renderSignalSource(signal)}
                    <div class="signal-next-step">
                      <span class="label">How We Stay Relevant</span>
                      <p>${escapeHtml(deriveSignalNextStep(signal, account))}</p>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      </div>

      <div class="detail-side">
        <article class="feature-card detail-section intelligence-panel">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Pain Hierarchy</p>
              <h3>What Matters Most Right Now</h3>
            </div>
          </div>
          <div class="pain-stack">
            ${account.painHierarchy
              .map(
                (pain, index) => `
                  <div class="pain-item">
                    <span class="pain-rank">#${index + 1}</span>
                    <p>${pain}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      </div>
    </div>

    <div class="detail-layout">
      <div class="detail-main">
        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Consultant Positioning</p>
              <h3>How You Show Up</h3>
            </div>
          </div>
          <p>${account.consultantPositioning}</p>
          <ul>
            ${account.notes.map((note) => `<li>${note}</li>`).join("")}
          </ul>
        </article>
      </div>

      <div class="detail-side">
        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Stakeholders</p>
              <h3>People To Keep Close</h3>
            </div>
          </div>
          <div class="stakeholder-list">
            ${account.stakeholders
              .map(
                (stakeholder) => `
                  <div class="signal-item">
                    <span class="label">Stakeholder</span>
                    <span class="value">${stakeholder}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>

        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Next Meeting</p>
              <h3>Bring This Up</h3>
            </div>
          </div>
          <ul>
            ${account.reminders.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <div class="actions-row">
            <button class="primary-button" data-open-meeting="${account.id}" type="button">Prep Meeting</button>
          </div>
        </article>
      </div>
    </div>
  `;
}

function renderChannelPage() {
  pageContent.innerHTML = `
    <div class="section-header">
      <h2>Channel Command</h2>
      <span class="tag">Editable</span>
    </div>
    <div class="channel-grid">
      ${state.channels
        .map(
          (channel) => `
            <article class="feature-card">
              <div class="card-title-row">
                <div>
                  <p class="eyebrow">Channel Strategy</p>
                  <h3>${channel.name}</h3>
                </div>
                <button class="ghost-button" data-edit-channel="${channel.id}" type="button">Edit</button>
              </div>
              <p>${channel.idea}</p>
              <ul>
                ${channel.plays.map((play) => `<li>${play}</li>`).join("")}
              </ul>
              <p class="meta">Developments: ${channel.developments.join(" • ")}</p>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="section-header">
      <h2>Content & Activation</h2>
      <span class="tag">Live Tracking</span>
    </div>
    <div class="account-grid">
      ${state.contentAssets
        .map(
          (asset) => `
            <article class="account-card">
              <div class="account-card-header">
                <div>
                  <p class="eyebrow">${asset.industry}</p>
                  <h3>${asset.title}</h3>
                </div>
                <span class="tag">${asset.status}</span>
              </div>
              <p><strong>Activation Score:</strong> ${asset.score}</p>
              <p><strong>Channels:</strong> ${asset.channels.join(", ")}</p>
              <p>${asset.gap}</p>
              <div class="actions-row">
                <a class="secondary-button" href="${asset.link}">Open Link</a>
                <button class="ghost-button" data-edit-content="${asset.id}" type="button">Edit</button>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMeetingPage(accountId) {
  const account = state.accounts.find((item) => item.id === accountId) || state.accounts[0];

  pageContent.innerHTML = `
    <div class="section-header">
      <div>
        <p class="eyebrow">Meeting Prep</p>
        <h2>${account.name} Performance Snapshot</h2>
      </div>
      <div class="actions-row">
        <button class="secondary-button" data-open-account="${account.id}" type="button">Back To Account</button>
        <button class="ghost-button" data-edit-account="${account.id}" type="button">Edit Source Notes</button>
      </div>
    </div>

    <div class="detail-layout">
      <div class="meeting-main">
        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Slide 1</p>
              <h3>Performance Snapshot: ${account.name}</h3>
            </div>
            <span class="tag">In-App Preview</span>
          </div>
          <div class="prep-grid">
            <div class="prep-box">
              <span class="label">Executive Takeaway</span>
              <p>Momentum is building in ${account.focus}, but we still need stronger proof and stakeholder confidence to turn traction into expansion.</p>
            </div>
            <div class="prep-box">
              <span class="label">What's Working</span>
              <ul>
                ${account.notes.slice(0, 2).map((note) => `<li>${note}</li>`).join("")}
              </ul>
            </div>
            <div class="prep-box">
              <span class="label">Where We Are Losing</span>
              <ul>
                <li>Signals are strong, but credibility still needs clearer proof packaging.</li>
                <li>Stakeholder momentum can drop when next steps are not tightly tied to account pain.</li>
              </ul>
            </div>
          </div>
        </article>

        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Slide 2</p>
              <h3>Strategic POV: Where We Win Next</h3>
            </div>
          </div>
          <div class="prep-grid">
            <div class="prep-box">
              <span class="label">Core Insight</span>
              <p>${account.consultantPositioning}</p>
            </div>
            <div class="prep-box">
              <span class="label">Immediate Actions</span>
              <ul>
                <li>Launch one focused proof-led follow-up tied to current stakeholder priorities.</li>
                <li>Activate sales with one clear message, one proof point, and one next-step ask.</li>
                <li>Use current signals to shift from broad visibility to account-specific credibility.</li>
              </ul>
            </div>
          </div>
        </article>
      </div>

      <div class="meeting-side">
        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Agenda</p>
              <h3>Suggested Meeting Flow</h3>
            </div>
          </div>
          <ul>
            <li>Open with current business context and recent account signals</li>
            <li>Review what is working and where momentum is slowing</li>
            <li>Present a consultant POV on where to win next</li>
            <li>Align on immediate actions for sales and marketing</li>
          </ul>
        </article>

        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Reminders</p>
              <h3>Bring These Up</h3>
            </div>
          </div>
          <ul>
            ${account.reminders.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <div class="actions-row">
            <button class="primary-button" data-generate-teams="${account.id}" type="button">Generate Teams Message</button>
            <button class="ghost-button" data-generate-deck="${account.id}" type="button">Generate 2-Slide Deck</button>
          </div>
        </article>
      </div>
    </div>

    ${renderMeetingOutputPanels(account)}
  `;
}

function renderGoalsPage() {
  pageContent.innerHTML = `
    <div class="section-header">
      <h2>Goals & Wins</h2>
      <span class="tag">Auto-Tracked Direction</span>
    </div>
    <div class="goal-grid">
      ${state.goals
        .map(
          (goal) => `
            <article class="goal-box">
              <span class="label">${goal.progress}</span>
              <h3>${goal.title}</h3>
              <p>${goal.detail}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderStrategyLabPage() {
  pageContent.innerHTML = `
    <div class="section-header">
      <h2>Strategy Lab</h2>
      <span class="tag">Working Layer</span>
    </div>

    <div class="overview-grid">
      ${state.strategyLab.overview
        .map(
          (item) => `
            <article class="feature-card detail-section">
              <p class="eyebrow">Strategy Snapshot</p>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="section-header">
      <h2>Account Strategic Shifts</h2>
      <span class="tag">Consultant POV</span>
    </div>
    <div class="account-grid">
      ${state.strategyLab.accountMoves
        .map((move) => {
          const account = state.accounts.find((item) => item.id === move.accountId);
          return `
            <article class="account-card">
              <div class="account-card-header">
                <div>
                  <p class="eyebrow">${account?.industry || "Account"}</p>
                  <h3>${account?.name || move.accountId}</h3>
                </div>
              </div>
              <p><strong>Strategic shift:</strong> ${move.shift}</p>
              <p><strong>Next move:</strong> ${move.nextMove}</p>
            </article>
          `;
        })
        .join("")}
    </div>

    <div class="detail-layout">
      <div class="detail-main">
        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Channel Moves</p>
              <h3>Where To Optimize Next</h3>
            </div>
          </div>
          <div class="list-stack">
            ${state.strategyLab.channelMoves
              .map(
                (move) => `
                  <div class="list-item">
                    <strong>${move.channel}</strong>
                    <p>${move.recommendation}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      </div>
      <div class="detail-side">
        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Knowledge Gaps</p>
              <h3>What To Close Next</h3>
            </div>
          </div>
          <ul>
            ${state.strategyLab.knowledgeGaps.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      </div>
    </div>
  `;
}

function renderTasksPage() {
  pageContent.innerHTML = `
    <div class="section-header">
      <h2>Tasks & Launches</h2>
      <span class="tag">Operating Layer</span>
    </div>
    <div class="detail-layout">
      <div class="detail-main">
        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Tasks</p>
              <h3>Current Priorities</h3>
            </div>
          </div>
          <div class="list-stack">
            ${state.tasks
              .map(
                (task) => `
                  <div class="list-item">
                    <strong>${task.title}</strong>
                    <p>${task.priority} priority • ${task.due} • Source: ${task.source}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      </div>
      <div class="detail-side">
        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Launch Tracker</p>
              <h3>Active Launches</h3>
            </div>
          </div>
          <div class="list-stack">
            ${state.launches
              .map(
                (launch) => `
                  <div class="list-item">
                    <strong>${launch.title}</strong>
                    <p>${launch.phase} • ${launch.owner}</p>
                    <p>${launch.note}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      </div>
    </div>
  `;
}

function renderLeadershipPage() {
  pageContent.innerHTML = `
    <div class="section-header">
      <h2>Leadership</h2>
      <span class="tag">Coaching Corner</span>
    </div>
    <div class="goal-grid">
      ${state.leadershipPrompts
        .map(
          (item) => `
            <article class="goal-box">
              <h3>${item.title}</h3>
              <p>${item.detail}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderAutomationPage() {
  pageContent.innerHTML = `
    <div class="section-header">
      <h2>Automation Hub</h2>
      <span class="tag">Monday 7:00am EST</span>
    </div>
    <div class="goal-grid">
      ${state.automationStatus
        .map(
          (item) => `
            <article class="goal-box">
              <span class="label">${item.status}</span>
              <h3>${item.source}</h3>
              <p>${item.note}</p>
            </article>
          `
        )
        .join("")}
    </div>
    <div class="section-header">
      <h2>Integration Setup</h2>
      <span class="tag">Supabase-Backed</span>
    </div>
    <div class="goal-grid">
      ${state.integrationSettings
        .map(
          (item) => `
            <article class="goal-box">
              <span class="label">${item.status}</span>
              <h3>${item.name}</h3>
              <p>${item.summary}</p>
              <p class="meta">${item.lastSyncedAt ? `Last synced: ${item.lastSyncedAt}` : "No sync has run yet."}</p>
            </article>
          `
        )
        .join("")}
    </div>
    <article class="feature-card detail-section">
      <div class="card-title-row">
        <div>
          <p class="eyebrow">Source Pulls</p>
          <h3>What Needs To Be Connected</h3>
        </div>
        <span class="tag">${getConnectionModeLabel(connectionMode)}</span>
      </div>
      <ul>
        <li>Airtable needs your base ID, table/view names, and API access so the app can read your Financial Services and Life Sciences industry/account boards.</li>
        <li>Outlook and Teams need Microsoft Graph credentials and permissions for mail, meetings, and chat context.</li>
        <li>HubSpot needs a private app token or OAuth connection for activity and performance context.</li>
        <li>Until those are connected, this page can show the workflow but it cannot truly pull live source data.</li>
      </ul>
      <div class="actions-row">
        <button class="secondary-button" data-open-automation-help="refresh" type="button">Run Monday Refresh</button>
        <button class="ghost-button" data-open-automation-help="sources" type="button">Scan Sources</button>
      </div>
    </article>
  `;
}

function renderPage() {
  pageTitle.textContent =
    activeView.page === "Account Detail"
      ? state.accounts.find((account) => account.id === activeView.accountId)?.name || "Accounts"
      : activeView.page === "Meetings" && activeView.accountId
        ? "Meeting Prep"
        : activeView.page;

  renderNav();

  switch (activeView.page) {
    case "Home":
      renderHomePage();
      break;
    case "Accounts":
      renderAccountsPage();
      break;
    case "Account Detail":
      renderAccountDetailPage(activeView.accountId);
      break;
    case "Channel Command":
      renderChannelPage();
      break;
    case "Meetings":
      renderMeetingPage(activeView.accountId);
      break;
    case "Goals & Wins":
      renderGoalsPage();
      break;
    case "Strategy Lab":
      renderStrategyLabPage();
      break;
    case "Tasks & Launches":
      renderTasksPage();
      break;
    case "Leadership":
      renderLeadershipPage();
      break;
    case "Automation Hub":
      renderAutomationPage();
      break;
    default:
      renderHomePage();
  }
}

function openModal() {
  editModal.classList.remove("hidden");
  editModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  editModal.classList.add("hidden");
  editModal.setAttribute("aria-hidden", "true");
  editForm.innerHTML = "";
  editForm.onsubmit = null;
}

function openAutomationHelp(mode) {
  modalTitle.textContent = mode === "refresh" ? "Monday Refresh Requirements" : "Source Scan Requirements";
  editForm.innerHTML = `
    <div class="form-field">
      <label>What has to be connected first</label>
      <textarea readonly>${
        mode === "refresh"
          ? "To make Monday 7:00am refresh truly work, the app needs Supabase connected for storage plus Airtable, Outlook, Teams, HubSpot, and a news/data source connected through APIs or serverless functions."
          : "To make source scans work, we need Airtable API access, Microsoft Graph access for Outlook and Teams, and HubSpot access. Right now the prototype is ready for the workflow, but it is not yet authenticated to those services."
      }</textarea>
    </div>
    <div class="form-field">
      <label>Next setup step</label>
      <textarea readonly>Connect Supabase first, then add source credentials, then build the server-side sync functions that write fresh source data into the database.</textarea>
    </div>
    <div class="form-actions">
      <button class="ghost-button" data-close-form type="button">Close</button>
    </div>
  `;
  openModal();
}

async function saveAndRender(type, entityId) {
  await persistAppState(state, type, entityId);
  renderQuote();
  renderPage();
}

function openAccountEditor(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account) {
    return;
  }

  modalTitle.textContent = `Edit ${account.name}`;
  editForm.innerHTML = `
    <div class="form-field">
      <label for="account-target">Revenue Target</label>
      <input id="account-target" name="target" value="${account.target}" />
    </div>
    <div class="form-field">
      <label for="account-focus">Strategic Focus</label>
      <input id="account-focus" name="focus" value="${account.focus}" />
    </div>
    <div class="form-field">
      <label for="account-stakeholders">Stakeholders</label>
      <textarea id="account-stakeholders" name="stakeholders">${account.stakeholders.join(", ")}</textarea>
    </div>
    <div class="form-field">
      <label for="account-market-position">Market Position</label>
      <textarea id="account-market-position" name="marketPosition">${account.marketPosition}</textarea>
    </div>
    <div class="form-field">
      <label for="account-positioning">Consultant Positioning</label>
      <textarea id="account-positioning" name="consultantPositioning">${account.consultantPositioning}</textarea>
    </div>
    <div class="form-field">
      <label for="account-pain-hierarchy">Pain Hierarchy</label>
      <textarea id="account-pain-hierarchy" name="painHierarchy">${account.painHierarchy.join("\n")}</textarea>
    </div>
    <div class="form-field">
      <label for="account-signals">Current Signals</label>
      <textarea id="account-signals" name="signals">${formatSignalsForEditor(account.signals)}</textarea>
    </div>
    <div class="form-field">
      <label for="account-signals-help">Current Signals Format</label>
      <textarea id="account-signals-help" readonly>Use one line per signal in this format:
Title | Detail | Source Label | Source URL | Next Step

Example:
State Farm promoted a new CDAO | Leadership change is making data and AI more central to digital strategy. | Company signal | https://example.com | Bring a consultant POV on data and AI execution support for the next meeting.</textarea>
    </div>
    <div class="form-field">
      <label for="account-reminders">Reminders For Next Meeting</label>
      <textarea id="account-reminders" name="reminders">${account.reminders.join("\n")}</textarea>
    </div>
    <div class="form-actions">
      <button class="primary-button" type="submit">Save Changes</button>
      <button class="ghost-button" data-close-form type="button">Cancel</button>
    </div>
  `;

  editForm.onsubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(editForm);

    account.target = String(formData.get("target") || "").trim();
    account.focus = String(formData.get("focus") || "").trim();
    account.stakeholders = String(formData.get("stakeholders") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    account.marketPosition = String(formData.get("marketPosition") || "").trim();
    account.consultantPositioning = String(formData.get("consultantPositioning") || "").trim();
    account.painHierarchy = String(formData.get("painHierarchy") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    account.signals = parseSignalsFromEditor(formData.get("signals") || "");
    account.reminders = String(formData.get("reminders") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    await saveAndRender("account", account.id);
    closeModal();
  };

  openModal();
}

function openChannelEditor(channelId) {
  const channel = state.channels.find((item) => item.id === channelId);
  if (!channel) {
    return;
  }

  modalTitle.textContent = `Edit ${channel.name}`;
  editForm.innerHTML = `
    <div class="form-field">
      <label for="channel-idea">Channel Strategy</label>
      <textarea id="channel-idea" name="idea">${channel.idea}</textarea>
    </div>
    <div class="form-field">
      <label for="channel-plays">Account-Specific Plays</label>
      <textarea id="channel-plays" name="plays">${channel.plays.join("\n")}</textarea>
    </div>
    <div class="form-field">
      <label for="channel-developments">Developments</label>
      <textarea id="channel-developments" name="developments">${channel.developments.join("\n")}</textarea>
    </div>
    <div class="form-actions">
      <button class="primary-button" type="submit">Save Changes</button>
      <button class="ghost-button" data-close-form type="button">Cancel</button>
    </div>
  `;

  editForm.onsubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(editForm);
    channel.idea = String(formData.get("idea") || "").trim();
    channel.plays = String(formData.get("plays") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    channel.developments = String(formData.get("developments") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    await saveAndRender("channel", channel.id);
    closeModal();
  };

  openModal();
}

function openContentEditor(contentId) {
  const asset = state.contentAssets.find((item) => item.id === contentId);
  if (!asset) {
    return;
  }

  modalTitle.textContent = `Edit ${asset.title}`;
  editForm.innerHTML = `
    <div class="form-field">
      <label for="content-status">Status</label>
      <input id="content-status" name="status" value="${asset.status}" />
    </div>
    <div class="form-field">
      <label for="content-channels">Activated Channels</label>
      <textarea id="content-channels" name="channels">${asset.channels.join(", ")}</textarea>
    </div>
    <div class="form-field">
      <label for="content-score">Activation Score</label>
      <input id="content-score" name="score" value="${asset.score}" />
    </div>
    <div class="form-field">
      <label for="content-gap">Gap Note</label>
      <textarea id="content-gap" name="gap">${asset.gap}</textarea>
    </div>
    <div class="form-actions">
      <button class="primary-button" type="submit">Save Changes</button>
      <button class="ghost-button" data-close-form type="button">Cancel</button>
    </div>
  `;

  editForm.onsubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(editForm);
    asset.status = String(formData.get("status") || "").trim();
    asset.channels = String(formData.get("channels") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    asset.score = String(formData.get("score") || "").trim();
    asset.gap = String(formData.get("gap") || "").trim();
    await saveAndRender("content", asset.id);
    closeModal();
  };

  openModal();
}

function refreshAccount(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account) {
    return;
  }

  account.signals = [
    {
      title: `Weekly refresh completed for ${account.name}`,
      detail: "Current signals were refreshed for market position, reminders, and consultant talking points.",
      sourceLabel: "Weekly Refresh",
      sourceUrl: "#"
    },
    ...account.signals.slice(0, 1)
  ];

  renderPage();
}

function generateTeamsMessage(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account) {
    return;
  }

  meetingOutputState[accountId] = {
    ...getMeetingOutput(accountId),
    teamsMessage: buildTeamsMessage(account)
  };

  activeView = { page: "Meetings", accountId };
  renderPage();
}

function generateDeck(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account) {
    return;
  }

  meetingOutputState[accountId] = {
    ...getMeetingOutput(accountId),
    deckData: buildDeckBullets(account)
  };

  activeView = { page: "Meetings", accountId };
  renderPage();
}

function handlePageClick(event) {
  const navButton = event.target.closest("[data-page]");
  const pageButton = event.target.closest("[data-open-page]");
  const accountButton = event.target.closest("[data-open-account]");
  const meetingButton = event.target.closest("[data-open-meeting]");
  const editButton = event.target.closest("[data-edit-account]");
  const editChannelButton = event.target.closest("[data-edit-channel]");
  const editContentButton = event.target.closest("[data-edit-content]");
  const generateTeamsButton = event.target.closest("[data-generate-teams]");
  const generateDeckButton = event.target.closest("[data-generate-deck]");
  const automationHelpButton = event.target.closest("[data-open-automation-help]");
  const refreshButton = event.target.closest("[data-refresh-account]");
  const cancelButton = event.target.closest("[data-close-form]");

  if (navButton) {
    activeView = { page: navButton.dataset.page };
    renderPage();
    return;
  }

  if (pageButton) {
    activeView = { page: pageButton.dataset.openPage };
    renderPage();
    return;
  }

  if (accountButton) {
    activeView = { page: "Account Detail", accountId: accountButton.dataset.openAccount };
    renderPage();
    return;
  }

  if (meetingButton) {
    activeView = { page: "Meetings", accountId: meetingButton.dataset.openMeeting };
    renderPage();
    return;
  }

  if (editButton) {
    openAccountEditor(editButton.dataset.editAccount);
    return;
  }

  if (editChannelButton) {
    openChannelEditor(editChannelButton.dataset.editChannel);
    return;
  }

  if (editContentButton) {
    openContentEditor(editContentButton.dataset.editContent);
    return;
  }

  if (generateTeamsButton) {
    generateTeamsMessage(generateTeamsButton.dataset.generateTeams);
    return;
  }

  if (generateDeckButton) {
    generateDeck(generateDeckButton.dataset.generateDeck);
    return;
  }

  if (automationHelpButton) {
    openAutomationHelp(automationHelpButton.dataset.openAutomationHelp);
    return;
  }

  if (refreshButton) {
    refreshAccount(refreshButton.dataset.refreshAccount);
    return;
  }

  if (cancelButton) {
    closeModal();
  }
}

function enterWorkspace() {
  if (!appReady || !state) {
    enterWorkspaceButton.textContent = "Loading Command Center...";
    return;
  }

  if (isEnteringWorkspace) {
    return;
  }

  isEnteringWorkspace = true;
  document.body.classList.add("workspace-entered");
  workspace.classList.remove("hidden");
  workspace.classList.add("workspace-visible");
  enterWorkspaceButton.textContent = "Opening...";

  window.setTimeout(() => {
    welcomeScreen.classList.add("hidden");
    document.body.classList.remove("workspace-entered");
    isEnteringWorkspace = false;
  }, 520);

  try {
    activeView = { page: "Home" };
    renderPage();
  } catch (error) {
    console.error("Workspace render failed during enter transition.", error);
    welcomeScreen.classList.add("hidden");
    document.body.classList.remove("workspace-entered");
    isEnteringWorkspace = false;
    enterWorkspaceButton.textContent = "Enter Command Center";
  }
}

async function init() {
  const result = await loadAppState();
  state = result.state;
  connectionMode = result.mode;
  appReady = true;

  renderWelcomeCards();
  renderNav();
  renderQuote();
  renderPage();
  enterWorkspaceButton.disabled = false;
  enterWorkspaceButton.textContent = "Enter Command Center";
}

enterWorkspaceButton.disabled = true;
enterWorkspaceButton.textContent = "Loading Command Center...";
enterWorkspaceButton.addEventListener("click", enterWorkspace);
document.addEventListener("click", handlePageClick);
closeModalButton.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

init();
