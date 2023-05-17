// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get references to the necessary elements in the HTML
  let flipSwitch = document.getElementById("flip-switch");
  let textField = document.getElementById("text-field");
  let submitButton = document.getElementById("submit-button");

  // Add an event listener for changes in the flip switch
  flipSwitch.addEventListener("change", function() {
    // Save the state of the flip switch to chrome.storage
    chrome.storage.sync.set({ autoCheckAll: flipSwitch.checked }, function() {
      // Call the updateTextFields function to apply the changes
      updateTextFields();
    });
  });

  // Add an event listener for the submit button
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    // Get the text from the text field
    let text = textField.value;
    // Save the text to chrome.storage
    chrome.storage.sync.set({ addedText: text }, function() {
      // Call the updateTextFields function to apply the changes
      updateTextFields();
    });
  });

  // Function to update the text fields in the active tab
  function updateTextFields() {
    // Query the active tab to send a message for updating text fields
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "updateTextFields" });
    });
  }

  // Retrieve the values of "addedText" and "autoCheckAll" from chrome.storage
  chrome.storage.sync.get(["addedText", "autoCheckAll"], function(data) {
    // Set the state of the flip switch based on the retrieved value
    flipSwitch.checked = data.autoCheckAll || false;

    // Call the updateTextFields function initially to apply any saved changes
    updateTextFields();
  });
});
