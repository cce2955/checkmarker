document.addEventListener("DOMContentLoaded", function() {
  let flipSwitch = document.getElementById("flip-switch");

  flipSwitch.addEventListener("change", function() {
    chrome.storage.sync.set({ autoCheckAll: flipSwitch.checked });
  });
});

chrome.storage.sync.get("autoCheckAll", function(data) {
  flipSwitch.checked = data.autoCheckAll || false;
});
