
	document.getElementById('captureButton').addEventListener('click', function(e) {

		e.preventDefault();

		chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
			if (tabs[0].url) {
				chrome.tabs.sendMessage(tabs[0].id, { action: "get-content" }, function(response) {
					if (response) {
						const results = response.content;
						if (results.error) {
							displayError(results.error);
						} else {
              displayContent(results);
						}
					} else {
						displayError('No response from content script.');
					}
				});
			}
		});
		
	});

	document.getElementById('aboutButton').addEventListener('click', function(e) {

		e.preventDefault();

    const bsCollapse = new bootstrap.Collapse('#about', { toggle: true });

	});
