// ProposalForge - Upwork In-Page DOM Extractor & Proposal Injector (Manifest V3)

function cleanText(t) {
  if (!t) return "";
  return t.replace(/\s+/g, " ").replace(/[\r\n\t]/g, " ").trim();
}

// Extract current job details from Upwork DOM
function extractJobDetailsFromPage() {
  let title = "";
  let description = "";
  let budget = "";
  let skills = [];
  let clientLocation = "";
  let clientSpend = "";
  let screeningQuestions = [];

  // 1. Job Title
  const titleEl =
    document.querySelector("header h2, h4.job-title, [data-qa='job-title'], h1.m-0-bottom, .up-card-header h2") ||
    document.querySelector("h1, h2");
  if (titleEl) title = cleanText(titleEl.innerText);

  // 2. Job Description
  const descEl =
    document.querySelector("[data-qa='job-description'], .job-description, .break-word, .up-line-clamp-v2") ||
    document.querySelector("div.text-body-sm");
  if (descEl) description = cleanText(descEl.innerText);

  // 3. Budget / Rate
  const budgetEl =
    document.querySelector("[data-qa='client-budget'], [data-qa='job-budget'], .payment-status, [data-qa='fixed-price']") ||
    Array.from(document.querySelectorAll("strong, span")).find((el) => /^\$\d+/.test(el.innerText?.trim()));
  if (budgetEl) budget = cleanText(budgetEl.innerText);

  // 4. Skills
  const skillEls = document.querySelectorAll("[data-qa='skill'], .skill-badge, .up-skill-badge, a[href*='/freelance-jobs/']");
  skillEls.forEach((s) => {
    const txt = cleanText(s.innerText);
    if (txt && txt.length > 1 && !skills.includes(txt)) {
      skills.push(txt);
    }
  });

  // 5. Client Info
  const spendEl = document.querySelector("[data-qa='client-spend'], [data-qa='total-spent']");
  if (spendEl) clientSpend = cleanText(spendEl.innerText);

  const locEl = document.querySelector("[data-qa='client-location'], [data-qa='client-country']");
  if (locEl) clientLocation = cleanText(locEl.innerText);

  // 6. Screening Questions
  const questionLabels = document.querySelectorAll("label[for*='question'], .question-label, [data-qa='question']");
  questionLabels.forEach((q) => {
    const qText = cleanText(q.innerText);
    if (qText && qText.length > 5) screeningQuestions.push(qText);
  });

  return {
    title: title || "Upwork Project",
    description: description || "Client seeking experienced freelancer.",
    budget: budget || "Competitive",
    skills: skills.slice(0, 8),
    clientLocation: clientLocation || "Global",
    clientSpend: clientSpend || "",
    screeningQuestions: screeningQuestions
  };
}

// Auto-fill into Upwork's Cover Letter Textarea
function autoFillCoverLetter(proposalText) {
  const textarea =
    document.querySelector("textarea[aria-labelledby*='cover_letter']") ||
    document.querySelector("textarea[data-qa='cover-letter-text']") ||
    document.querySelector("textarea.up-textarea") ||
    document.querySelector("textarea");

  if (textarea) {
    textarea.value = proposalText;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.dispatchEvent(new Event("change", { bubbles: true }));
    textarea.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }
  return false;
}

// Generate Winning Proposal Framework
function generateProposalText(job, profile, tone) {
  const name = profile.name || "Freelancer";
  const userTitle = profile.title || "Specialist";
  const years = profile.experienceYears || "5+";
  const portfolio = profile.portfolioUrl ? `\n\nPortfolio / Proof of Work: ${profile.portfolioUrl}` : "";

  // Extract core challenge from job description
  let coreGoal = "deliver this project efficiently with clean, maintainable architecture";
  if (job.description) {
    const sentences = job.description.split(/[.?!]/).map(cleanText).filter(Boolean);
    if (sentences.length > 0) {
      coreGoal = sentences[0].replace(/^(we are looking for|seeking|need a|i need someone to)/i, "").trim();
    }
  }

  const primarySkill = job.skills.length > 0 ? job.skills[0] : "the required stack";
  const secondarySkills = job.skills.length > 1 ? job.skills.slice(1, 4).join(", ") : "modern best practices";

  if (tone === "direct") {
    return `Hi there,

Read through your requirements for "${job.title}" — I can help you ${coreGoal}.

Here is how I will approach this:
1. Review your current setup and lock in the exact milestones for ${primarySkill}.
2. Execute the core deliverables utilizing ${secondarySkills} with zero bloat.
3. Rigorous testing and direct deployment handover.

I have ${years} years of experience specializing in ${primarySkill} and similar production solutions.

Do you have 5 minutes for a quick chat today to discuss your timeline?

Best regards,
${name}`;
  }

  if (tone === "technical") {
    return `Hello,

Your project caught my attention — specifically your need for ${job.title}.

Key Technical Assessment:
• Primary Objective: ${coreGoal}
• Recommended Implementation: Leveraging ${primarySkill} alongside ${secondarySkills} to ensure optimal performance and long-term scalability.
• Timeline & Delivery: Clean, documented code delivered with clear git commits and post-delivery support.

I've spent ${years} years building production-grade solutions in ${primarySkill}. Happy to share code samples or walk through similar repositories I've built.

Let's schedule a brief 5-minute technical sync to review your requirements.

Cheers,
${name} — ${userTitle}`;
  }

  // Default: Authority & ROI Tone
  return `Hi,

Saw your posting for "${job.title}". Many freelancers will send you generic copy-pasted templates, but I took the time to read your exact scope: you need someone who can ${coreGoal}.

Why I'm a strong fit for this:
• Depth in Tech: Over ${years} years specializing in ${primarySkill} and ${secondarySkills}.
• Proven Track Record: Focus on fast turnaround, clean code, and zero hand-holding.
• Direct Communication: Transparent daily updates so you're never wondering about project status.${portfolio}

Are you available for a quick chat to discuss the next steps?

Best,
${name}
${userTitle}`;
}

// In-Page Floating Modal Widget
function showFloatingProposalModal(proposalText) {
  let modal = document.getElementById("proposalforge-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "proposalforge-modal";
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 580px;
      max-width: 90vw;
      background: #0a0e17;
      border: 1px solid #10b981;
      border-radius: 14px;
      padding: 24px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 20px rgba(16,185,129,0.3);
      z-index: 99999999;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
      <div style="font-size: 16px; font-weight: 700; color: #10b981; display: flex; align-items: center; gap: 8px;">
        <span style="background: #10b981; color: #0a0e17; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 800;">AI</span>
        ProposalForge: Winning Proposal
      </div>
      <button id="pf-close-btn" style="background: transparent; border: none; color: #94a3b8; font-size: 18px; cursor: pointer;">✕</button>
    </div>
    <textarea id="pf-proposal-text" style="width: 100%; height: 260px; background: #131c2e; border: 1px solid #243552; border-radius: 8px; color: #f0f4f8; padding: 12px; font-size: 13px; line-height: 1.5; outline: none; box-sizing: border-box; resize: vertical;">${proposalText}</textarea>
    <div style="display: flex; gap: 10px; margin-top: 14px;">
      <button id="pf-copy-btn" style="flex: 1; padding: 10px; background: #1c2840; border: 1px solid #243552; color: #fff; border-radius: 8px; font-weight: 600; cursor: pointer;">📋 Copy to Clipboard</button>
      <button id="pf-autofill-btn" style="flex: 1; padding: 10px; background: linear-gradient(135deg, #059669, #10b981); border: none; color: #fff; border-radius: 8px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(16,185,129,0.3);">✍️ Auto-Fill Cover Letter</button>
    </div>
  `;

  document.getElementById("pf-close-btn").onclick = () => modal.remove();

  document.getElementById("pf-copy-btn").onclick = () => {
    const text = document.getElementById("pf-proposal-text").value;
    navigator.clipboard.writeText(text);
    const btn = document.getElementById("pf-copy-btn");
    btn.textContent = "✅ Copied!";
    setTimeout(() => (btn.textContent = "📋 Copy to Clipboard"), 2000);
  };

  document.getElementById("pf-autofill-btn").onclick = () => {
    const text = document.getElementById("pf-proposal-text").value;
    const filled = autoFillCoverLetter(text);
    const btn = document.getElementById("pf-autofill-btn");
    if (filled) {
      btn.textContent = "✅ Filled into Upwork!";
      setTimeout(() => modal.remove(), 1200);
    } else {
      navigator.clipboard.writeText(text);
      alert("Cover letter textarea not found on this view. Proposal copied to clipboard instead!");
    }
  };
}

// Floating In-Page "⚡ Tailor Proposal" Button
function injectOnPagePill() {
  if (document.getElementById("proposalforge-pill")) return;

  const pill = document.createElement("div");
  pill.id = "proposalforge-pill";
  pill.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: linear-gradient(135deg, #059669, #10b981);
    color: #fff;
    padding: 10px 18px;
    border-radius: 30px;
    font-weight: 700;
    font-size: 13px;
    box-shadow: 0 6px 20px rgba(16,185,129,0.4);
    cursor: pointer;
    z-index: 999999;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.2s;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  pill.innerHTML = `⚡ ProposalForge AI`;

  pill.onmouseenter = () => (pill.style.transform = "scale(1.05)");
  pill.onmouseleave = () => (pill.style.transform = "scale(1)");

  pill.onclick = async () => {
    const job = extractJobDetailsFromPage();
    const state = await chrome.storage.local.get(["userProfile", "selectedTone"]);
    const profile = state.userProfile || { name: "Freelancer", experienceYears: 5 };
    const tone = state.selectedTone || "authority";
    const proposal = generateProposalText(job, profile, tone);
    showFloatingProposalModal(proposal);
  };

  document.body.appendChild(pill);
}

// Initialize pill on page load
if (window.location.href.includes("upwork.com")) {
  injectOnPagePill();
}

// Message Listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "EXTRACT_CURRENT_JOB") {
    const jobData = extractJobDetailsFromPage();
    sendResponse({ success: true, job: jobData });
  } else if (message.action === "SHOW_MODAL") {
    showFloatingProposalModal(message.proposalText);
    sendResponse({ success: true });
  } else if (message.action === "AUTOFILL_TEXT") {
    const filled = autoFillCoverLetter(message.text);
    sendResponse({ success: filled });
  }
  return true;
});
