# DOM Extractor

Chrome extension which parses DOM of any website to create structured content for exfilration and analysis. Compliant with Manifest 3.

# Installation

- Enable Developer Mode for Chrome extensions
- Click LOAD UNPACKED button and navigation to root directory
- Click SELECT FOLDER
- Pin extension for ease of access

# Usage

On any website (particularly content-heavy websites like news articles), click the extension icon and then the CAPTURE button.

# Analyses

- Extracts content in HTML, plaintext and markdown
- Extracts title, byline and excerpt where available
- Extracts date of publication where available
- Extracts domain and matches name against highest traffic websites
- Detects suspicious domain structures
- Determines underlying platform for a large number of CMSes and other website builders
- Detects language
- Checks for external iframes and clickjacked iframe
- Detects analytics and other trackers
- Extracts meaningful images, and provides pixel dimensions, date of capture, geocoordinates and altitude where available

# Dependencies

All libraries are open source, and are packaged in the build to prevent risk of cross-site scripting.

- Bootstrap
- DOMPurify
- Efficient Language Detector
- EXIF Reader
- jQuery
- Readability
- Turndown
