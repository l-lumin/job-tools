const WEB_APP_URL = "GOOGLE_APPS_SCRIPT_WEB_APP_URL"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendToSheets") {

    console.log("1. Extension caught data from page:", message.data);
    console.log("2. Sending data to URL:", WEB_APP_URL);

    fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(message.data)
    })
    .then((response) => {
      console.log("3. Fetch finished executing. If sheet is empty, the URL is wrong or unauthenticated.");
      sendResponse({ status: "success" });
    })
    .catch(err => {
      console.error("CRITICAL ERROR - Fetch failed entirely:", err);
      sendResponse({ status: "error", error: err.message });
    });

    return true;
  }
});