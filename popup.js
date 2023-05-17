// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get references to the necessary elements in the HTML
  let flipSwitch = document.getElementById("flip-switch");
  let textField = document.getElementById("text-field");
  let submitButton = document.getElementById("submit-button");

  /**
   * Event listener for the change event of the flip switch.
   * Saves the state of the flip switch to chrome.storage and updates the text fields.
   */
  flipSwitch.addEventListener("change", function() {
    chrome.storage.sync.set({ autoCheckAll: flipSwitch.checked }, function() {
      updateTextFields();
    });
  });

  /**
   * Event listener for the click event of the submit button.
   * Saves the value of the text field to chrome.storage and updates the text fields.
   */
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    let text = textField.value;
    chrome.storage.sync.set({ addedText: text }, function() {
      updateTextFields();
    });
  });

  /**
   * Updates the text fields in the active tab by sending a message to the content script.
   */
  function updateTextFields() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "updateTextFields" });
    });
  }

  // Retrieves the values of "addedText" and "autoCheckAll" from chrome.storage
  chrome.storage.sync.get(["addedText", "autoCheckAll"], function(data) {
    // Set the state of the flip switch based on the retrieved value
    flipSwitch.checked = data.autoCheckAll || false;

    // Call the updateTextFields function initially to apply any saved changes
    updateTextFields();
  });
});
