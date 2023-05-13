document.addEventListener("DOMContentLoaded", function () {
  // Get the "check-all" button
  var checkAllButton = document.getElementById("check-all");

  // Get the flip switch checkbox
  var flipSwitch = document.getElementById("flip-switch");

  // Add a click event listener to the "check-all" button
  checkAllButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ["content.js"],
        },
        function () {
          chrome.tabs.sendMessage(tabId, {
            action: "checkAll"
          });
        }
      );
    });
  });

  // Add a change event listener to the flip switch checkbox
  flipSwitch.addEventListener("change", function () {
    if (this.checked) {
      // Set a variable to true when the flip switch is on
      chrome.storage.sync.set({ automaticCheckAllEnabled: true }, function() {
        console.log('Automatic check-all enabled');
      });
    } else {
      // Set a variable to false when the flip switch is off
      chrome.storage.sync.set({ automaticCheckAllEnabled: false }, function() {
        console.log('Automatic check-all disabled');
      });
    }
  });

  // Listen for updates to the active tab
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if the flip switch is on
    chrome.storage.sync.get(['automaticCheckAllEnabled'], function(result) {
      if (result.automaticCheckAllEnabled) {
        // Automatically apply the checkAll code when a new page is loaded and the flip switch is on
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["content.js"],
          },
          function () {
            chrome.tabs.sendMessage(tab.id, {
              action: "checkAll"
            });
          }
        );
      }
    });
  });

  // Load the status of the flip switch from storage
  chrome.storage.sync.get(['automaticCheckAllEnabled'], function(result) {
    flipSwitch.checked = result.automaticCheckAllEnabled;
  });
});
