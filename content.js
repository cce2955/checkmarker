chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "updateTextFields") {
    updateTextFields();
  }
});

function updateTextFields() {
  chrome.storage.sync.get("addedText", function(data) {
    let text = data.addedText || "";
    let textFields = document.getElementsByTagName("input");
    for (let i = 0; i < textFields.length; i++) {
      if (textFields[i].type === "text") {
        textFields[i].value = text;
      }
    }
  });
}

chrome.storage.sync.get("autoCheckAll", function(data) {
  if (data.autoCheckAll) {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.autoCheckAll && changes.autoCheckAll.newValue) {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  } else {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }
});

updateTextFields(); // Call updateTextFields initially when the content script is loaded
