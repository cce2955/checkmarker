/**
 * Listens for messages from the content scripts.
 * If the action is "getTextValue", retrieves the value of "addedText" from chrome.storage and sends a response message back to the content script.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getTextValue") {
    // Retrieve the value of "addedText" from chrome.storage
    chrome.storage.sync.get("addedText", function(data) {
      // Send a response message with the value of "addedText" back to the content script
      sendResponse({ addedText: data.addedText });
    });

    // To keep the message channel open for sending the response asynchronously
    return true;
  }
});
