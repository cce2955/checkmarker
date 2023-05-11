chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "checkAll") {
      var inputs = document.getElementsByTagName("input");
      var text = message.text.toLowerCase();
      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.type === "text" && input.value.toLowerCase().indexOf(text) !== -1) {
          input.checked = true;
        }
      }
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
  