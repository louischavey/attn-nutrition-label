// Import attention summaries
const ATTENTION_SUMMARIES = {
  'Reels': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
  'Home': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  'Search': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
  'Explore': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  'Messages': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
  'Notifications': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  'Create': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`
};

// Configuration: Add selectors for icons you want to track
const ICON_SELECTORS = [
  {
    // name: 'Reels',
    ariaLabel: 'Reels',
    // childTitle: 'Reels'
  }
  // Add more selectors here as needed:
  // {
  //   name: 'Home',
  //   ariaLabel: 'Home',
  //   childTitle: 'Home'
  // }
];

// Track which icons already have overlays to avoid duplicates
const processedIcons = new WeakSet();

/**
 * Find icon nodes matching our selectors
 * @returns {Array} Array of {element, iconConfig} objects
 */
function findIconNodes() {
  const foundIcons = [];
  
  ICON_SELECTORS.forEach(config => {
    // Find elements with matching aria-label
    const candidates = document.querySelectorAll(`[aria-label="${config.ariaLabel}"]`);
    // console.log(`[Attention Label] Found ${candidates.length} element(s) with aria-label="${config.ariaLabel}"`);
    
    candidates.forEach(element => {
      // Skip if already processed
      if (processedIcons.has(element)) {
        console.log('[Attention Label] Skipping already processed element');
        return;
      }
      
      console.log('[Attention Label] Adding new icon:', element);
      foundIcons.push({
        element,
        iconConfig: config
      });
      processedIcons.add(element);
    });
  });
  
  console.log(`[Attention Label] Total icons found: ${foundIcons.length}, Total processed: ${processedIcons}`);
  return foundIcons;
}

/**
 * Create a red-dot overlay element
 * @param {HTMLElement} iconElement - The icon element to attach the overlay to
 * @param {Object} iconConfig - Configuration for this icon
 * @returns {HTMLElement} The created overlay element
 */
function createOverlay(iconElement, iconConfig) {
  // Create the red dot element
  const overlay = document.createElement('div');
  overlay.className = 'attention-label-overlay';
  
  // Style the overlay as a red dot
  Object.assign(overlay.style, {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '12px',
    height: '12px',
    backgroundColor: '#ff4444',
    borderRadius: '50%',
    border: '2px solid white',
    zIndex: '9999',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease',
    pointerEvents: 'auto'
  });
  
  // Add hover effect
  overlay.addEventListener('mouseenter', () => {
    overlay.style.transform = 'scale(1.2)';
  });
  
  overlay.addEventListener('mouseleave', () => {
    overlay.style.transform = 'scale(1)';
  });
  
  // Find the appropriate parent container to attach the overlay
  // SVGs don't render HTML children, so we need to attach to the parent
  let container = iconElement;
  
  // If the icon is an SVG, use its parent as the container
  if (iconElement.tagName.toLowerCase() === 'svg') {
    container = iconElement.parentElement;
    console.log('[Attention Label] Icon is SVG, using parent container:', container);
  }
  
  // Ensure the container has relative positioning
  const computedPosition = window.getComputedStyle(container).position;
  if (computedPosition === 'static') {
    container.style.position = 'relative';
  }
  
  // Append the overlay to the container
  container.appendChild(overlay);
  
  console.log('[Attention Label] Created overlay for:', iconConfig.ariaLabel);
  
  // Add click handler to show tooltip
  overlay.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering the original icon click
    e.preventDefault();
    showTooltip(overlay, iconConfig);
  });
  
  return overlay;
}

/**
 * Show a tooltip with attention summary when overlay is clicked
 * @param {HTMLElement} overlayElement - The overlay element that was clicked
 * @param {Object} iconConfig - Configuration for this icon
 */
function showTooltip(overlayElement, iconConfig) {
  // Remove any existing tooltip
  const existingTooltip = document.querySelector('.attention-label-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }
  
  // Get the summary text for this icon
  const summaryText = ATTENTION_SUMMARIES[iconConfig.ariaLabel] || 'No summary available.';
  
  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'attention-label-tooltip';
  
  // Style the tooltip
  Object.assign(tooltip.style, {
    position: 'fixed',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '12px 16px',
    maxWidth: '300px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: '10000',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#262626'
  });
  
  // Create tooltip content
  const title = document.createElement('div');
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '8px';
  title.textContent = iconConfig.ariaLabel;
  
  const summary = document.createElement('div');
  summary.textContent = summaryText;
  
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '8px',
    right: '8px',
    border: 'none',
    background: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#999',
    padding: '0',
    width: '20px',
    height: '20px',
    lineHeight: '20px'
  });
  
  closeBtn.addEventListener('click', () => {
    tooltip.remove();
  });
  
  tooltip.appendChild(closeBtn);
  tooltip.appendChild(title);
  tooltip.appendChild(summary);
  
  // Position tooltip near the overlay
  document.body.appendChild(tooltip);
  
  const overlayRect = overlayElement.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  // Position below and to the right of the overlay
  let top = overlayRect.bottom + 8;
  let left = overlayRect.left;
  
  // Adjust if tooltip goes off screen
  if (left + tooltipRect.width > window.innerWidth) {
    left = window.innerWidth - tooltipRect.width - 16;
  }
  
  if (top + tooltipRect.height > window.innerHeight) {
    top = overlayRect.top - tooltipRect.height - 8;
  }
  
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  
  // Close tooltip when clicking outside
  const closeOnClickOutside = (e) => {
    if (!tooltip.contains(e.target) && e.target !== overlayElement) {
      tooltip.remove();
      document.removeEventListener('click', closeOnClickOutside);
    }
  };
  
  setTimeout(() => {
    document.addEventListener('click', closeOnClickOutside);
  }, 0);
  
  console.log('[Attention Label] Showing tooltip for:', iconConfig.ariaLabel);
}

/**
 * Initialize the MutationObserver to watch for DOM changes
 */
function initObserver() {
  console.log('[Attention Label] Starting DOM observer...');
  
  // Initial scan of existing elements
  const initialIcons = findIconNodes();
  console.log(`[Attention Label] Found ${initialIcons.length} icon(s) on initial scan`);
  
  // Create overlays for initial icons
  initialIcons.forEach(({ element, iconConfig }) => {
    createOverlay(element, iconConfig);
  });
  
  // Create observer to watch for DOM changes
  const observer = new MutationObserver((mutations) => {
    // Check if any mutations added new nodes
    let shouldRescan = false;
    
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        shouldRescan = true;
        break;
      }
    }
    
    if (shouldRescan) {
      const icons = findIconNodes();
      if (icons.length > 0) {
        console.log(`[Attention Label] Found ${icons.length} new icon(s)`);
        // Create overlays for newly found icons
        icons.forEach(({ element, iconConfig }) => {
          createOverlay(element, iconConfig);
        });
      }
    }
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,  // Watch for added/removed children
    subtree: true     // Watch entire subtree (all descendants)
  });
  
  console.log('[Attention Label] Observer initialized and watching for changes');
}

// Wait for DOM to be ready before initializing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initObserver);
} else {
  initObserver();
}
