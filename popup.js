chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    chrome.runtime.sendMessage({ message: "getTimeSpent", tabId }, (response) => {
      let timeSpent = response.timeSpent;
      let hours = Math.floor(timeSpent / 3600000);
      let minutes = Math.floor((timeSpent % 3600000) / 60000);
      let seconds = Math.floor((timeSpent % 60000) / 1000);
      document.getElementById("timeDisplay").textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });
  });
  