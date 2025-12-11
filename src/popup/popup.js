// Load the extension summary from imported EXTENSION_SUMMARY
const summaryElement = document.getElementById("extension-summary");
if (summaryElement && typeof EXTENSION_SUMMARY !== 'undefined') {
  summaryElement.textContent = EXTENSION_SUMMARY;
}

// Load the nutrition label image using chrome.runtime.getURL
const nutritionLabel = document.getElementById("nutrition-label");
if (nutritionLabel) {
  const imageUrl = chrome.runtime.getURL("assets/instagram-attentional-nutrition-label.jpg");
  nutritionLabel.src = imageUrl;
}