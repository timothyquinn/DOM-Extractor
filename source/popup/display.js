
  function displayContent(results) {

    // initialize
      displayError('');
      const bsCollapse = new bootstrap.Collapse('#contentResults', { show: true });

    // populate text fields
      const elements = ['title', 'excerpt', 'byline', 'domain', 'website', 'platform', 'language', 'published', 'textContent', 'htmlContent', 'markdownContent', 'isIframe'];
      elements.forEach(element => {
        document.getElementById(element + 'Container').style.display = 'none';
        document.getElementById(element + 'Input').value = results[element];
        if (results[element]) document.getElementById(element + 'Container').style.display = 'block';
      });

    // iFrame URLs
      const iframeInput = document.getElementById('iframeInput');
      if (!results.iframeURLs || !results.iframeURLs.length) iframeInput.textContent = "None";
      else {

        iframeInput.innerHTML = "<ul>\n";
        results.iframeURLs.forEach(url => {
          iframeInput.innerHTML += "<li class='forceBreak'><a href='" + url + "' target='_blank'>" + url + "</a></li>";
        });
        iframeInput.innerHTML += "</ul>\n";

      }

    // trackers
      const trackersInput = document.getElementById('trackersInput');
      if (!results.trackers || !results.trackers.length) trackersInput.textContent = "None";
      else {
        trackersInput.innerHTML = "<ul>\n";
        results.trackers.forEach(tracker => {
          trackersInput.innerHTML += "<li>" + tracker + "</li>";
        });
        trackersInput.innerHTML += "</ul>\n";
      }

    // domain warnings
      const domainWarningsInput = document.getElementById('domainWarningsInput');
      if (!results.domainWarnings || !results.domainWarnings.length) {
        document.getElementById('domainWarningsContainer').style.display = 'none';
      }
      else {
        domainWarningsInput.innerHTML = "<ul>\n";
        results.domainWarnings.forEach(warning => {
          domainWarningsInput.innerHTML += "<li>" + warning + "</li>";
        });
        domainWarningsInput.innerHTML += "</ul>\n";
      }

    // images
      const imagesInput = document.getElementById('imagesInput');
      if (!results.imageURLs || !results.imageURLs.length) imagesInput.textContent = "None";
      else {

        results.imageURLs.forEach(url => {
          processImageUrl(url);
        });

      }

  }

  async function getExifDataFromUrl(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  }

  async function processImageUrl(imageUrl) {
    const imageBuffer = await getExifDataFromUrl(imageUrl);
    if (imageBuffer) {
      try {
        // get EXIF data
          const tags = ExifReader.load(imageBuffer);
          console.log(tags);
          console.log(tags.ImageWidth);

        // display data
          if (tags['Image Width']['value'] > 100 && tags['Image Height']['value'] > 100) {
            input = "<div class='row mb-3'>\n";
            input += "  <div class='col-4'>\n";
            input += "    <a href='" + imageUrl + "' target='_blank'><img src='" + imageUrl + "' class='img-fluid' /></a>\n";
            input += "  </div>\n";
            input += "  <div class='col-8'>\n";
            input += "    <div><a href='" + imageUrl + "' target='_blank'>" + imageUrl.split('/').pop().split("?")[0] + "</a></div>\n";
            input += "    <div>Dimensions: " + tags['Image Width']['value'] + " x " + tags['Image Height']['value'] + " px</div>\n";
            if (tags.DateTimeOriginal) {
              input += "    <div>Date Taken: " + tags.DateTimeOriginal.description + "</div>\n";
            }
            if (tags.GPSLatitude && tags.GPSLongitude) {
              if (tags.GPSLatitude.description != 0 && tags.GPSLongitude.description != 0) {
                input += "    <div>GPS: " + tags.GPSLatitude.description.toFixed(5) + " x " + tags.GPSLongitude.description.toFixed(5) + "</div>\n";
              }
            }
            if (tags.GPSAltitude) {
              input += "    <div>Altitude: " + tags.GPSAltitude.description + "</div>\n";
            }
            if (tags.Make || tags.Model) {
              input += "    <div>Camera: " + tags.Make.description + " " + tags.Model.description + "</div>\n";
            }
            input += "  </div>\n";
            input += "</div>\n";
            imagesInput.innerHTML += input;
          }
      } catch (error) {
        console.log('Error parsing EXIF data:', error);
      }
    }
  }

  function displayError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    if (message) errorDiv.style.display = 'block';
    else errorDiv.style.display = 'none';
  }
