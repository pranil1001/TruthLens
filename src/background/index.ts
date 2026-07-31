// TruthLens Background Service Worker (Manifest V3)

// Register Context Menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'truthlens-analyze-selection',
    title: 'Analyze credibility with TruthLens',
    contexts: ['selection', 'page', 'link']
  });

  console.log('[TruthLens] Background Service Worker initialized.');
});

// Handle Context Menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'truthlens-analyze-selection' && tab?.id) {
    chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_ARTICLE' }, (response) => {
      if (chrome.runtime.lastError || !response?.article) {
        console.warn('[TruthLens] Could not extract from context menu click:', chrome.runtime.lastError?.message);
        return;
      }
      
      // Store transient analysis request for popup opening
      chrome.storage.local.set({
        pendingAnalysis: {
          article: response.article,
          timestamp: Date.now()
        }
      });

      // Open extension popup if possible
      chrome.action.openPopup?.().catch(() => {
        // openPopup may require specific user gesture in some Chrome versions
        console.log('[TruthLens] Pending analysis saved to chrome.storage.local');
      });
    });
  }
});

// Message listener for tab navigation updates or scan triggers
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'ARTICLE_DETECTED') {
    // Optionally update action badge indicator
    if (message.isArticle) {
      chrome.action.setBadgeText({ text: 'NEWS' });
      chrome.action.setBadgeBackgroundColor({ color: '#16C784' });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }
    sendResponse({ ack: true });
  }
  return true;
});
