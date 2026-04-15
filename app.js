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
  return `Hi team, here is the ${account.name} monthly meeting prep. Key themes to reinforce: ${account.focus}. Biggest consultant POV: ${account.consultantPositioning} Next, I recommend we align on one proof-led follow-up, one stakeholder-specific talking point, and one immediate activation move coming out of the meeting.`;
}

function buildDeckBullets(account) {
  return [
    `Performance Snapshot: momentum is building in ${account.focus}, but credibility still needs stronger proof packaging.`,
    `What Sales Should Do Next: lead with one clear point of view, one proof point, and one immediate next-step ask.`,
    `Reminders To Bring Up: ${account.reminders.join(" | ")}`
  ];
}

function renderMeetingOutputPanels(account) {
  const output = getMeetingOutput(account.id);
  if (!output.teamsMessage && !output.deckBullets) {
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
      ${
        output.deckBullets
          ? `
            <article class="goal-box">
              <span class="label">Generated 2-Slide Deck Notes</span>
              <ul>
                ${output.deckBullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </article>
          `
          : ""
      }
    </div>
  `;
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
      <div>
        <p class="eyebrow">${account.industry}</p>
        <h2>${account.name}</h2>
      </div>
      <div class="actions-row">
        <button class="secondary-button" data-refresh-account="${account.id}" type="button">Refresh Account</button>
        <button class="ghost-button" data-edit-account="${account.id}" type="button">Edit Account</button>
      </div>
    </div>

    <div class="detail-layout">
      <div class="detail-main">
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

        <article class="feature-card detail-section">
          <div class="card-title-row">
            <div>
              <p class="eyebrow">Current Signals</p>
              <h3>What Is Happening Right Now</h3>
            </div>
            <span class="tag">Source Linked</span>
          </div>
          <div class="signal-list">
            ${account.signals
              .map(
                (signal) => `
                  <div class="signal-item">
                    <strong>${signal.title}</strong>
                    <p>${signal.detail}</p>
                    <p class="meta"><a href="${signal.sourceUrl}">${signal.sourceLabel}</a></p>
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
      <span class="tag">AI Recs Framing</span>
    </div>
    <div class="goal-grid">
      ${state.strategyRecommendations
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
    <div class="placeholder-layout">
      <article class="feature-card detail-section">
        <p class="eyebrow">Next Build Layer</p>
        <h3>${state.placeholders.strategyLab.title}</h3>
        <p>${state.placeholders.strategyLab.text}</p>
      </article>
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
    <article class="feature-card detail-section">
      <div class="card-title-row">
        <div>
          <p class="eyebrow">Source Pulls</p>
          <h3>What Needs To Be Connected</h3>
        </div>
        <span class="tag">${getConnectionModeLabel(connectionMode)}</span>
      </div>
      <ul>
        <li>Airtable needs your base ID and API access so the app can read your Financial Services and Life Sciences boards.</li>
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
    deckBullets: buildDeckBullets(account)
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
  welcomeScreen.classList.add("hidden");
  workspace.classList.remove("hidden");
  activeView = { page: "Home" };
  renderPage();
}

async function init() {
  const result = await loadAppState();
  state = result.state;
  connectionMode = result.mode;

  renderWelcomeCards();
  renderNav();
  renderQuote();
  renderPage();
}

enterWorkspaceButton.addEventListener("click", enterWorkspace);
document.addEventListener("click", handlePageClick);
closeModalButton.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

init();
