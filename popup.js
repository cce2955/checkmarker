document.addEventListener("DOMContentLoaded", function() {
  let flipSwitch = document.getElementById("flip-switch");
  let textField = document.getElementById("text-field");
  let submitButton = document.getElementById("submit-button");

  flipSwitch.addEventListener("change", function() {
    chrome.storage.sync.set({ autoCheckAll: flipSwitch.checked });
    updateTextFields();
  });

  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    let text = textField.value;
    chrome.storage.sync.set({ addedText: text }, function() {
      updateTextFields();
    });
  });

  function updateTextFields() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "updateTextFields" });
    });
  }

  chrome.storage.sync.get(["addedText", "autoCheckAll"], function(data) {
    flipSwitch.checked = data.autoCheckAll || false;
    updateTextFields();
  });
});
