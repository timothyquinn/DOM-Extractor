
	function copyToClipboard(content, inputElement, buttonElement, originalButtonLabel, copiedButtonLabel) {

		// Get the content
			if (!content) {
				if (inputElement) {
					const element = document.getElementById(inputElement);
					element.select();
					element.setSelectionRange(0, 99999); // For mobile devices
					content = element.value;
				}
			}

			if (!content) return false;
			console.log(content);

		// Copy the text inside the text field
			navigator.clipboard.writeText(content);

		// update button
			if (buttonElement) {
				document.querySelector("#"+buttonElement).innerHTML = copiedButtonLabel;
				setTimeout(function(){ document.querySelector("#"+buttonElement).innerHTML = originalButtonLabel; }, 1000);
			}

		return true;

	}
