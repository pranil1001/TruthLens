// TruthLens Content Script — Article Content Extractor & Smart Article Detector

export interface ExtractedArticle {
  isNewsArticle: boolean;
  url: string;
  domain: string;
  title: string;
  body: string;
  author?: string;
  publishDate?: string;
  description?: string;
  siteName?: string;
  wordCount: number;
}

/**
 * Smart Detector: Determines if the current page is a news article or opinion piece.
 */
function isNewsArticlePage(): boolean {
  const url = window.location.href.toLowerCase();
  
  // 1. Skip non-article URLs (homepage, search, login, settings, account, category listings)
  if (url.match(/\/(category|tag|author|search|login|register|archive|index\.html?)$/) || url === window.location.origin + '/') {
    return false;
  }

  // 2. Check JSON-LD / schema.org Article or NewsArticle metadata
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (const script of Array.from(jsonLdScripts)) {
    try {
      const data = JSON.parse(script.textContent || '{}');
      const types = Array.isArray(data) ? data.map(d => d['@type']) : [data['@type'], data['@graph']?.map((g: any) => g['@type'])].flat();
      if (types.some(t => ['NewsArticle', 'Article', 'ReportageNewsArticle', 'AnalysisNewsArticle', 'OpinionNewsArticle'].includes(t))) {
        return true;
      }
    } catch {
      // Ignore JSON parse errors
    }
  }

  // 3. Check OpenGraph type tag
  const ogType = document.querySelector('meta[property="og:type"]')?.getAttribute('content');
  if (ogType === 'article') {
    return true;
  }

  // 4. Check for standard article container elements
  if (document.querySelector('article') || document.querySelector('[role="main"] article')) {
    return true;
  }

  // 5. URL path heuristics (e.g., contains date patterns like /2026/07/31/ or article IDs)
  if (url.match(/\/\d{4}\/\d{2}\/\d{2}\//) || url.match(/\/article[s]?\//) || url.match(/\-[a-f0-9]{8,}/)) {
    return true;
  }

  return false;
}

/**
 * Extract clean main article text bypassing navigation, sidebars, comments, and ads.
 */
function extractArticleDetails(): ExtractedArticle {
  const isNews = isNewsArticlePage();
  const url = window.location.href;
  const domain = window.location.hostname.replace(/^www\./, '');

  // Extract Title
  let title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
              document.querySelector('h1')?.innerText?.trim() ||
              document.title;

  // Extract Meta Description
  const description = document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                      document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

  // Extract Author
  let author = document.querySelector('meta[name="author"]')?.getAttribute('content') ||
               document.querySelector('meta[property="article:author"]')?.getAttribute('content') ||
               document.querySelector('.byline, [class*="author"], [rel="author"]')?.textContent?.trim() || 'Unknown Author';
  
  if (author.length > 80) author = author.substring(0, 80);

  // Extract Publication Date
  const publishDate = document.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ||
                      document.querySelector('time')?.getAttribute('datetime') ||
                      document.querySelector('time')?.innerText || '';

  // Extract Site Name
  const siteName = document.querySelector('meta[property="og:site_name"]')?.getAttribute('content') || domain;

  // Extract Body Text cleanly
  let bodyParagraphs: string[] = [];

  // Try finding <article> tag first
  const articleNode = document.querySelector('article') || document.querySelector('main') || document.body;

  // Clone node to safely sanitize without altering live DOM
  const clone = articleNode.cloneNode(true) as HTMLElement;

  // Remove irrelevant elements (ads, comments, nav, footers, scripts, styles)
  const selectorsToRemove = [
    'nav', 'header', 'footer', 'aside', 'script', 'style', 'iframe', 'noscript',
    '.comments', '#comments', '.disqus', '.advertisement', '.ad-slot', '.social-share',
    '.related-posts', '.trending-news', '.newsletter-signup', '[class*="ad-"]'
  ];
  selectorsToRemove.forEach(selector => {
    clone.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Extract paragraphs with meaningful text length
  const paragraphs = clone.querySelectorAll('p, h2, h3');
  paragraphs.forEach(p => {
    const text = p.textContent?.trim() || '';
    // Ignore short disclaimers, cookie notices, or share buttons
    if (text.length > 35 && !text.toLowerCase().includes('all rights reserved') && !text.toLowerCase().includes('subscribe')) {
      bodyParagraphs.push(text);
    }
  });

  const fullBody = bodyParagraphs.join('\n\n');
  const wordCount = fullBody.split(/\s+/).filter(Boolean).length;

  return {
    isNewsArticle: isNews,
    url,
    domain,
    title,
    body: fullBody,
    author,
    publishDate,
    description,
    siteName,
    wordCount
  };
}

// Listen for messages from background script or popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === 'EXTRACT_ARTICLE') {
    const article = extractArticleDetails();
    sendResponse({ success: true, article });
  } else if (request.type === 'CHECK_IS_ARTICLE') {
    sendResponse({ isArticle: isNewsArticlePage() });
  }
  return true;
});

// Auto-run on load to inform background script if on news page
try {
  const isArticle = isNewsArticlePage();
  chrome.runtime.sendMessage({ type: 'ARTICLE_DETECTED', isArticle, url: window.location.href });
} catch {
  // Extension context might be invalidated during dev reloads
}
