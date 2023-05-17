// Function to update text fields with the provided value
function updateTextFields(value) {
  // Get all the text fields on the page
  let textFields = document.querySelectorAll("input[type='text']");

  // Loop through each text field and set the value
  textFields.forEach(function (textField) {
    textField.value = value;
  });
}

// Function to check or uncheck all checkboxes based on the provided state
function updateCheckboxes(checked) {
  // Get all the checkboxes on the page
  let checkboxes = document.querySelectorAll("input[type='checkbox']");

  // Set the checked state of each checkbox
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = checked;
  });
}

// Retrieve the values of "addedText" and "autoCheckAll" from chrome.storage
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

// Listen for messages from the popup.js
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
