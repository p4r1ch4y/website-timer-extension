let timerElement = document.createElement("div");
timerElement.style.position = "fixed";
timerElement.style.bottom = "10px";
timerElement.style.right = "10px";
timerElement.style.padding = "10px";
timerElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
timerElement.style.color = "white";
timerElement.style.borderRadius = "5px";
timerElement.style.zIndex = "9999";
document.body.appendChild(timerElement);

let startTime = Date.now();

function updateTimer() {
  chrome.runtime.sendMessage({ message: "getTimeSpent", tabId: chrome.devtools.inspectedWindow.tabId }, (response) => {
    let timeSpent = response.timeSpent + (Date.now() - startTime);
    let hours = Math.floor(timeSpent / 3600000);
    let minutes = Math.floor((timeSpent % 3600000) / 60000);
    let seconds = Math.floor((timeSpent % 60000) / 1000);
    timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });
}

setInterval(updateTimer, 1000);
