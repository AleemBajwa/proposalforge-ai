// ProposalForge Background Service Worker (Manifest V3)

chrome.runtime.onInstalled.addListener(() => {
  console.log("ProposalForge for Upwork initialized.");
  chrome.storage.local.get(
    ["isPro", "proposalsCount", "userProfile", "selectedTone"],
    (data) => {
      if (data.isPro === undefined) chrome.storage.local.set({ isPro: false });
      if (!data.proposalsCount) chrome.storage.local.set({ proposalsCount: 0 });
      if (!data.selectedTone) chrome.storage.local.set({ selectedTone: "authority" });
      if (!data.userProfile) {
        chrome.storage.local.set({
          userProfile: {
            name: "Freelancer",
            title: "Full-Stack Specialist",
            experienceYears: 5,
            keySkills: "Web Development, Automation, APIs, Data Extraction",
            portfolioUrl: ""
          }
        });
      }
    }
  );
});

// Relay messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "GET_JOB_DATA") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "EXTRACT_CURRENT_JOB" }, (resp) => {
          if (chrome.runtime.lastError) {
            sendResponse({ success: false, error: chrome.runtime.lastError.message });
          } else {
            sendResponse(resp || { success: false });
          }
        });
      } else {
        sendResponse({ success: false, error: "No active tab" });
      }
    });
    return true;
  }
});
