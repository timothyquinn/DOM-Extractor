
	function extractContent() {

		// initialize
			let results = {};
			results.error = '';

			const parser = new DOMParser();
			const html = document.documentElement.innerHTML;
      const sanitizedHTML = DOMPurify.sanitize(html);
			const doc = parser.parseFromString(html, 'text/html');
			const sanitizedDoc = parser.parseFromString(sanitizedHTML, 'text/html');
      const allElements = Array.from(doc.body.getElementsByTagName('*'));


    // simplify with Readability
      var article = new Readability(sanitizedDoc).parse();

		// get title
			results.title = article.title ? article.title : doc.title;

		// get excerpt
			results.excerpt = article.excerpt;
			if (results.excerpt == 'Advertisement') results.excerpt = '';

		// get content
			results.textContent = article.textContent.trim();;
			results.htmlContent = article.content.trim();

      var turndownService = new TurndownService();
      results.markdownContent = turndownService.turndown(article.content.trim());

		// get byline
			results.byline = article.byline;
			if (results.byline == 'By') results.byline = '';
      if (results.byline && results.byline.substring(0,3) == 'By ') results.byline = results.byline.substring(3);

		// get URL
			results.url = doc.URL;
			results.uri = doc.baseURI;
      const urlObject = new URL(results.url);
      results.domain = urlObject.hostname.replace('www.', '');

		// get site
			results.website = article.siteName;
      if (!results.website) {
        for (var key in domains) {
          if (results.domain == key) {
            results.website = domains[key];
          }
        }
      }

    // get platform
      results.platform = '';
      for (var key in platforms) {
        if (html.indexOf(key) !== -1) {
          results.platform = platforms[key];
        }
      }

		// get language
			results.language = article.lang;
      if (!article.lang) {
        results.languageID = eld.detect(results.textContent).language;
        results.language = languages[results.languageID] ? languages[results.languageID] : 'Unknown';
      }

		// get date
      results.published = article.publishedTime;
      if (!results.published) {
        const dateRegex = /\b(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}\b/g;
        const matches = results.markdownContent.match(dateRegex);
        if (matches) {
          results.published = matches[0] ? matches[0] : article.publishedTime;
          const date = new Date(results.published); // Or any Date object you have
          results.published = date.toISOString().slice(0, 10);
        }
      }

    // detect iframe
      results.isIframe = window.self !== window.top ? "Yes" : "No";

			iframes = doc.getElementsByTagName('iframe');
      iframeURLs = Array.from(iframes).map(iframe => iframe.src);
      if (iframeURLs.length > 0) {
        iframeURLs.forEach(url => {
          if (url && url.startsWith('http') && !url.startsWith(results.domain)) {
            results.iframeURLs = results.iframeURLs || [];
            results.iframeURLs.push(url);
          }
        });
      }

    // get trackers
			results.trackers = [];
      for (var key in trackers) {
        if (html.indexOf(key) !== -1) {
          if (!results.trackers.includes(trackers[key])) {
            results.trackers.push(trackers[key]);
          }
        }
      }

		// images
			images = doc.getElementsByTagName('img');
	
    // extract image URLs from doc object into an array
      results.imageURLs = Array.from(images).map(img => img.src);

		return results;
	}