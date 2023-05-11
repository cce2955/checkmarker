document.addEventListener("DOMContentLoaded", function () {
    // Get the "check-all" button
    var checkAllButton = document.getElementById("check-all");
  
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
          var textField = document.getElementById("text-field");
          var textValue = textField.value.trim();
          chrome.tabs.sendMessage(tabId, {
            action: "checkAll",
            text: textValue,
          });
        }
      );
    });
  });
  
  
    // Get the "set-text" button
    var setTextButton = document.getElementById("set-text");
  
     // Add a click event listener to the "set-text" button
  setTextButton.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tabId = tabs[0].id;
      var textField = document.getElementById("text-field");
      var textValue = textField.value.trim();
      if (textValue !== "") {
        chrome.scripting.executeScript(
          {
            target: {tabId: tabId},
            files: ["content.js"]
          },
          function() {
            chrome.tabs.sendMessage(tabId, {action: "setText", text: textValue});
          }
        );
      } else {
        console.log("text-field is empty");
      }
    });
  });
});