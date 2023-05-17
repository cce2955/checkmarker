/**
 * Sends a message to the background script to request the value of "addedText" from chrome.storage.
 * The background script will send a response message with the value back to this content script.
 */
chrome.runtime.sendMessage({ action: "getTextValue" }, function(response) {
  // Check if the response message contains the value of "addedText"
  if (response && response.addedText) {
    // Update the text fields with the value
    updateTextFields(response.addedText);
  }
});

/**
 * Updates text fields with the provided value.
 * @param {string} value - The value to set for the text fields.
 */
function updateTextFields(value) {
  let textFields = document.querySelectorAll("input[type='text']");
  textFields.forEach(function (textField) {
    textField.value = value;
  });
}

/**
 * Updates checkboxes with the provided checked state.
 * @param {boolean} checked - The checked state to set for the checkboxes.
 */
function updateCheckboxes(checked) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = checked;
  });
}

// Retrieves the values of "addedText" and "autoCheckAll" from chrome.storage
chrome.storage.sync.get(["addedText", "autoCheckAll"], function(data) {
  // Check if the value of "addedText" exists
  if (data.addedText) {
    // Update the text fields with the saved value
    updateTextFields(data.addedText);
  }

  // Check if the value of "autoCheckAll" exists
  if (data.autoCheckAll) {
    // Update the checkboxes based on the saved value
    updateCheckboxes(data.autoCheckAll);
  }
});

/**
 * Listens for messages from the popup.js script.
 * If the action is "updateTextFields", retrieves the value of "addedText" from chrome.storage and updates the text fields.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateTextFields") {
    // Retrieve the value of "addedText" from chrome.storage
    chrome.storage.sync.get("addedText", function(data) {
      // Check if the value exists
      if (data.addedText) {
        // Update the text fields with the value
        updateTextFields(data.addedText);
      }
    });
  }
});
