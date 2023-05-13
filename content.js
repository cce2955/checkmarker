chrome.storage.sync.get("automaticCheckAllEnabled", function (data) {
  var automaticCheckAllEnabled = data.automaticCheckAllEnabled;

  if (automaticCheckAllEnabled) {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if (input.type === "checkbox") {
        input.checked = true;
      }
    }
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "checkAll") {
    chrome.storage.sync.get("automaticCheckAllEnabled", function (data) {
      var automaticCheckAllEnabled = data.automaticCheckAllEnabled;

      if (automaticCheckAllEnabled) {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
          var input = inputs[i];
          if (input.type === "checkbox") {
            input.checked = true;
          }
        }
      }
    });
  } else if (message.action === "setText") {
    var inputs = document.getElementsByTagName("input");
    var text = message.text;
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if (input.type === "text") {
        input.value = text;
      }
    }
    console.log("Set text to: " + text);
  }
});
