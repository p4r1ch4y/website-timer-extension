let currentTabId;
let startTime;
let totalTime = {};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;

  if (currentTabId !== undefined && startTime !== undefined) {
    const timeSpent = Date.now() - startTime;
    totalTime[currentTabId] = (totalTime[currentTabId] || 0) + timeSpent;
  }

  currentTabId = tabId;
  startTime = Date.now();
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === currentTabId && startTime !== undefined) {
    const timeSpent = Date.now() - startTime;
    totalTime[tabId] = (totalTime[tabId] || 0) + timeSpent;
    startTime = undefined;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getTimeSpent") {
    const tabId = request.tabId;
    const timeSpent = totalTime[tabId] || 0;
    sendResponse({ timeSpent });
  }
});
