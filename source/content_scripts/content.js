 
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

        if (request.action == "get-content") {

            sendResponse({
                action: "display-content",
                content: extractContent()
            });

            return true;

        }

    });
