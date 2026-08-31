// TruthLens Background Service Worker (Manifest V3)
import { ExtractedArticle } from '../content/index';

/**
 * Message Types & Interfaces
 */
type MessageType = 'EXTRACT_ARTICLE' | 'CHECK_IS_ARTICLE' | 'ANALYZE_ARTICLE' | 'ARTICLE_DETECTED';

interface RequestMessage {
  type: MessageType;
  payload?: any;
}

interface ResponseMessage {
  success: boolean;
  data?: any;
  error?: string;
}

interface AnalysisResult {
  score: number;
  confidence: number;
  prediction: 'credible' | 'uncertain' | 'misleading';
  summary: string;
  breakdown: Array<{ label: string; score: number }>;
  findings: Array<{ id: string; type: 'positive' | 'neutral' | 'negative'; label: string; explanation: string }>;
  warnings: string[];
}

/**
 * Background Worker State Management
 */
const analyzeArticleMock = async (article: ExtractedArticle): Promise<AnalysisResult> => {
  // Mocking the AI Pipeline analysis delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Deterministic mock score based on domain length as a placeholder
  const mockScore = (article.domain.length % 100);

  return {
    score: mockScore,
    confidence: 95,
    prediction: mockScore > 70 ? 'credible' : mockScore > 40 ? 'uncertain' : 'misleading',
    summary: `AI Analysis of ${article.title}: The content appears to be ${mockScore > 70 ? 'factually supported' : 'questionable'}.`,
    breakdown: [
      { label: 'Source Reputation', score: 80 },
      { label: 'Evidence Quality', score: 70 },
      { label: 'Language Neutrality', score: 90 },
    ],
    findings: [
      { id: '1', type: 'positive', label: 'Verified Source', explanation: 'Domain is recognized as a high-trust news outlet.' },
      { id: '2', type: 'neutral', label: 'Tone Analysis', explanation: 'The tone is generally objective.' },
    ],
    warnings: mockScore < 50 ? ['low-evidence', 'sensational-headline'] : ['well-supported'],
  };
};

/**
 * Initialization
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'truthlens-analyze-selection',
    title: 'Analyze credibility with TruthLens',
    contexts: ['selection', 'page', 'link']
  });
  console.log('[TruthLens] Background Service Worker initialized.');
});

/**
 * Context Menu Handler
 */
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'truthlens-analyze-selection' && tab?.id) {
    try {
      const response = await chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_ARTICLE' });
      if (!response?.success || !response?.article) {
        throw new Error('Extraction failed');
      }

      const article = response.article;

      // Store the article for the popup to find
      await chrome.storage.local.set({
        currentArticle: article,
        lastAnalysisTimestamp: Date.now(),
        pendingAnalysis: true
      });

      // Attempt to open popup (limited browser support)
      chrome.action.openPopup?.().catch(() => {
        console.log('[TruthLens] Analysis saved. Open popup to see results.');
      });
    } catch (error: any) {
      console.error('[TruthLens] Context menu error:', error.message);
    }
  }
});

/**
 * Global Message Router
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, payload } = message as RequestMessage;

  if (type === 'ARTICLE_DETECTED') {
    handleArticleDetected(payload);
    sendResponse({ success: true });
    return;
  }

  if (type === 'EXTRACT_ARTICLE') {
    handleExtractArticle(sender, sendResponse);
    return;
  }

  if (type === 'CHECK_IS_ARTICLE') {
    handleCheckIsArticle(sender, sendResponse);
    return;
  }

  if (type === 'ANALYZE_ARTICLE') {
    handleAnalyzeArticle(payload, sendResponse);
    return;
  }

  sendResponse({ success: false, error: 'Unknown message type' });
  return true; // Keep channel open for async responses
});

/**
 * Handlers
 */

async function handleArticleDetected(payload: any) {
  const { isArticle } = payload;
  if (isArticle) {
    chrome.action.setBadgeText({ text: 'NEWS' });
    chrome.action.setBadgeBackgroundColor({ color: '#16C784' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

async function handleExtractArticle(sender: chrome.runtime.MessageSender, sendResponse: (response: ResponseMessage) => void) {
  // If the message came from the popup, we need to find the active tab
  if (!sender.tab) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      sendResponse({ success: false, error: 'No active tab found' });
      return;
    }

    chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_ARTICLE' }, (response) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError?.message });
      } else {
        sendResponse({ success: true, data: response });
      }
    });
  } else {
    // Already in the tab, return success
    sendResponse({ success: true, data: { isArticle: true } });
  }
}

async function handleCheckIsArticle(sender: chrome.runtime.MessageSender, sendResponse: (response: ResponseMessage) => void) {
  if (!sender.tab) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      sendResponse({ success: false, error: 'No active tab found' });
      return;
    }

    chrome.tabs.sendMessage(tab.id, { type: 'CHECK_IS_ARTICLE' }, (response) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError?.message });
      } else {
        sendResponse({ success: true, data: response });
      }
    });
  } else {
    sendResponse({ success: true, data: { isArticle: true } });
  }
}

async function handleAnalyzeArticle(payload: any, sendResponse: (response: ResponseMessage) => void) {
  const article = payload as ExtractedArticle;
  if (!article) {
    sendResponse({ success: false, error: 'No article data provided' });
    return;
  }

  try {
    const result = await analyzeArticleMock(article);

    // Store the analysis result in local storage for the popup
    await chrome.storage.local.set({
      lastAnalysis: result,
      lastAnalysisTimestamp: Date.now(),
      pendingAnalysis: false
    });

    sendResponse({ success: true, data: result });
  } catch (error: any) {
    sendResponse({ success: false, error: `Analysis failed: ${error.message}` });
  }
}
