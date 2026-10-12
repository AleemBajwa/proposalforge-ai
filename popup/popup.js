// ProposalForge Popup Controller (Manifest V3)

document.addEventListener("DOMContentLoaded", async () => {
  const jobTitleDisplay = document.getElementById("jobTitleDisplay");
  const jobBudgetDisplay = document.getElementById("jobBudgetDisplay");
  const jobLocationDisplay = document.getElementById("jobLocationDisplay");
  const jobSkillsDisplay = document.getElementById("jobSkillsDisplay");

  const generateBtn = document.getElementById("generateBtn");
  const proposalOutput = document.getElementById("proposalOutput");
  const copyBtn = document.getElementById("copyBtn");
  const autofillBtn = document.getElementById("autofillBtn");

  const planBadge = document.getElementById("planBadge");
  const toneBtns = document.querySelectorAll(".tone-btn");
  const loadDemoBtn = document.getElementById("loadDemoBtn");

  const toggleProfileBtn = document.getElementById("toggleProfileBtn");
  const profileModal = document.getElementById("profileModal");
  const profName = document.getElementById("profName");
  const profTitle = document.getElementById("profTitle");
  const profYears = document.getElementById("profYears");
  const profPortfolio = document.getElementById("profPortfolio");
  const saveProfileBtn = document.getElementById("saveProfileBtn");

  const toggleLicenseBtn = document.getElementById("toggleLicenseBtn");
  const licenseModal = document.getElementById("licenseModal");
  const licenseKeyInput = document.getElementById("licenseKeyInput");
  const activateLicenseBtn = document.getElementById("activateLicenseBtn");

  let currentJobData = null;
  let selectedTone = "authority";

  // 1. Load saved profile and preferences
  const state = await chrome.storage.local.get([
    "userProfile",
    "selectedTone",
    "isPro",
    "lastGeneratedProposal"
  ]);

  if (state.selectedTone) selectedTone = state.selectedTone;
  if (state.lastGeneratedProposal) proposalOutput.value = state.lastGeneratedProposal;

  updateProBadge(state.isPro || false);
  highlightToneBtn(selectedTone);

  const profile = state.userProfile || {
    name: "Alex Rivera",
    title: "Senior Full-Stack Engineer",
    experienceYears: 6,
    portfolioUrl: ""
  };
  profName.value = profile.name || "";
  profTitle.value = profile.title || "";
  profYears.value = profile.experienceYears || 5;
  profPortfolio.value = profile.portfolioUrl || "";

  // 2. Query Active Upwork Tab and Extract Job Info
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url && tab.url.includes("upwork.com")) {
    chrome.tabs.sendMessage(tab.id, { action: "EXTRACT_CURRENT_JOB" }, (response) => {
      if (response && response.job) {
        currentJobData = response.job;
        renderJobPreview(currentJobData);
      } else {
        // Fallback: Inject extractor
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["content/upwork_injector.js"]
          },
          () => {
            chrome.tabs.sendMessage(tab.id, { action: "EXTRACT_CURRENT_JOB" }, (resp) => {
              if (resp && resp.job) {
                currentJobData = resp.job;
                renderJobPreview(currentJobData);
              } else {
                jobTitleDisplay.textContent = "Open any Upwork job post to auto-tailor";
              }
            });
          }
        );
      }
    });
  } else {
    jobTitleDisplay.textContent = "Open an Upwork job tab to begin";
    jobBudgetDisplay.textContent = "Browse jobs on Upwork";
  }

  // Demo Jobs for Instant Testing
  const demoJobs = [
    {
      title: "Senior Full-Stack Developer for SaaS MVP (React & Node.js)",
      description: "We are looking for a reliable full-stack developer to help build and launch our SaaS customer portal. Must have clean architecture, API integration experience, and ability to deliver within 3 weeks.",
      budget: "$3,500 Fixed Price",
      clientLocation: "United States (Verified)",
      clientSpend: "$65k+ spent (4.9★)",
      skills: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "REST APIs"]
    },
    {
      title: "Python Automation Specialist to Build Data Pipelines",
      description: "Seeking an experienced Python engineer to automate public data extraction and sync to our internal PostgreSQL database. Needs robust error handling and proxy rotation.",
      budget: "$65/hr (20-30 hrs/wk)",
      clientLocation: "United Kingdom (Verified)",
      clientSpend: "$120k+ spent (5.0★)",
      skills: ["Python", "FastAPI", "Web Scraping", "PostgreSQL", "Docker"]
    }
  ];
  let demoIdx = 0;

  if (loadDemoBtn) {
    loadDemoBtn.addEventListener("click", () => {
      currentJobData = demoJobs[demoIdx % demoJobs.length];
      demoIdx++;
      renderJobPreview(currentJobData);
      generateProposal();
    });
  }

  // Tone selector
  toneBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedTone = btn.getAttribute("data-tone");
      highlightToneBtn(selectedTone);
      chrome.storage.local.set({ selectedTone: selectedTone });
      if (currentJobData) {
        generateProposal();
      }
    });
  });

  // Generate Button
  generateBtn.addEventListener("click", () => {
    generateProposal();
  });

  // Copy Button
  copyBtn.addEventListener("click", () => {
    const text = proposalOutput.value.trim();
    if (!text) {
      alert("Please generate a proposal first!");
      return;
    }
    navigator.clipboard.writeText(text);
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => (copyBtn.textContent = "📋 Copy Proposal"), 2000);
  });

  // Auto-Fill Button
  autofillBtn.addEventListener("click", async () => {
    const text = proposalOutput.value.trim();
    if (!text) {
      alert("Please generate a proposal first!");
      return;
    }

    if (tab && tab.id) {
      chrome.tabs.sendMessage(tab.id, { action: "AUTOFILL_TEXT", text }, (resp) => {
        if (resp && resp.success) {
          autofillBtn.textContent = "✅ Filled into Upwork!";
          setTimeout(() => (autofillBtn.textContent = "✍️ Auto-Fill Cover Letter"), 2000);
        } else {
          navigator.clipboard.writeText(text);
          alert("Cover letter textarea not found on this view. Copied to clipboard instead!");
        }
      });
    }
  });

  // Toggle Profile Settings
  toggleProfileBtn.addEventListener("click", () => {
    profileModal.style.display = profileModal.style.display === "block" ? "none" : "block";
    licenseModal.style.display = "none";
  });

  // Save Profile
  saveProfileBtn.addEventListener("click", async () => {
    const updated = {
      name: profName.value.trim() || "Freelancer",
      title: profTitle.value.trim() || "Specialist",
      experienceYears: parseInt(profYears.value, 10) || 5,
      portfolioUrl: profPortfolio.value.trim() || ""
    };
    await chrome.storage.local.set({ userProfile: updated });
    profileModal.style.display = "none";
    alert("Profile settings saved! Proposals will now use your custom credentials.");
    if (currentJobData) generateProposal();
  });

  // Toggle License Modal
  toggleLicenseBtn.addEventListener("click", () => {
    licenseModal.style.display = licenseModal.style.display === "block" ? "none" : "block";
    profileModal.style.display = "none";
  });

  // Activate License
  activateLicenseBtn.addEventListener("click", async () => {
    const key = licenseKeyInput.value.trim();
    if (key.length >= 6) {
      await chrome.storage.local.set({ isPro: true, licenseKey: key });
      updateProBadge(true);
      licenseModal.style.display = "none";
      alert("Pro License Activated! Unlimited tailored proposals unlocked.");
    } else {
      alert("Please enter a valid license key (min 6 chars).");
    }
  });

  function renderJobPreview(job) {
    jobTitleDisplay.textContent = job.title || "Target Project";
    jobBudgetDisplay.textContent = `Budget: ${job.budget || "Competitive"}`;
    jobLocationDisplay.textContent = `Client: ${job.clientLocation || "Verified"}`;
    jobSkillsDisplay.textContent = `Stack: ${job.skills.length > 0 ? job.skills.join(", ") : "Required Skills"}`;
  }

  function highlightToneBtn(tone) {
    toneBtns.forEach((b) => {
      if (b.getAttribute("data-tone") === tone) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
  }

  function updateProBadge(isPro) {
    if (isPro) {
      planBadge.textContent = "⭐ PRO UNLIMITED";
      planBadge.classList.add("pro");
      toggleLicenseBtn.style.display = "none";
    } else {
      planBadge.textContent = "FREE TIER";
      planBadge.classList.remove("pro");
      toggleLicenseBtn.style.display = "inline";
    }
  }

  async function generateProposal() {
    const st = await chrome.storage.local.get(["userProfile"]);
    const prof = st.userProfile || { name: "Freelancer", experienceYears: 5 };
    const job = currentJobData || {
      title: "Your Project",
      description: "Delivering high-quality execution.",
      skills: ["the required stack"],
      budget: "$500"
    };

    const text = buildProposal(job, prof, selectedTone);
    proposalOutput.value = text;
    chrome.storage.local.set({ lastGeneratedProposal: text });
  }

  function buildProposal(job, prof, tone) {
    const name = prof.name || "Freelancer";
    const title = prof.title || "Specialist";
    const years = prof.experienceYears || "5+";
    const portfolio = prof.portfolioUrl ? `\n\nProof of Work / Past Projects:\n${prof.portfolioUrl}` : "";

    let problemFocus = "handle this project cleanly with zero back-and-forth";
    if (job.description) {
      const parts = job.description.split(/[.?!]/).map((s) => s.trim()).filter(Boolean);
      if (parts.length > 0) {
        problemFocus = parts[0].replace(/^(we need|looking for|seeking|i need)/i, "").trim();
      }
    }

    const mainSkill = job.skills.length > 0 ? job.skills[0] : "your tech stack";
    const otherSkills = job.skills.length > 1 ? job.skills.slice(1, 4).join(", ") : "modern best practices";

    if (tone === "direct") {
      return `Hi there,

Read your requirements for "${job.title}" — I can deliver this cleanly and ensure you ${problemFocus}.

Here is my direct approach:
1. Immediate kickoff: lock in milestone specifications and repository access.
2. Core execution: implement ${mainSkill} alongside ${otherSkills} with clean test coverage.
3. Handover: structured documentation and seamless deployment.

I have ${years} years of production experience in ${mainSkill}.

Do you have 5 minutes for a quick chat today to review the roadmap?

Best regards,
${name}`;
    }

    if (tone === "technical") {
      return `Hello,

Your project caught my attention — specifically your requirements for "${job.title}".

Technical Overview:
• Core Objective: ${problemFocus}
• Proposed Stack & Pattern: Implementing ${mainSkill} combined with ${otherSkills} to ensure optimal latency, maintainability, and clean architecture.
• Code Integrity: Thorough modularization, zero dependencies bloat, and automated checks.

With ${years} years specializing in ${mainSkill}, I have deployed similar production workflows.

Available for a brief technical call today to review your architecture and sprint milestones.

Cheers,
${name}
${title}`;
    }

    // Default Authority Tone
    return `Hi,

Saw your posting for "${job.title}". Most proposals you receive will be generic AI spam, so I’ll be direct: I read your scope carefully and know exactly how to ${problemFocus}.

Why I'm the right fit to deliver this:
• Domain Depth: ${years} years building production solutions with ${mainSkill} and ${otherSkills}.
• Fast Turnaround: Rapid execution with daily progress updates so you never have to chase status.
• Clean Execution: Fully tested deliverables with zero technical debt.${portfolio}

Do you have a few minutes for a brief call to align on scope and get started?

Best,
${name}
${title}`;
  }
});
