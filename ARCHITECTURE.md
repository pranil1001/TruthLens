# TruthLens Architecture

**Version:** 1.0  
**Status:** Approved

---

# Overview

TruthLens is designed as a modular, scalable AI-powered Chrome Extension that analyzes online news articles and provides users with an explainable credibility score.

The architecture follows a layered design where each component has a single responsibility.

```
┌──────────────────────────────┐
│        Chrome Extension      │
│                              │
│  Popup UI                    │
│  Content Script              │
│  Background Service Worker   │
└──────────────┬───────────────┘
               │
               │ Chrome Messaging
               ▼
┌──────────────────────────────┐
│         FastAPI Backend      │
│                              │
│ API Layer                    │
│ Analysis Service             │
│ AI Service                   │
│ Cache Service                │
│ Database Layer               │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        PostgreSQL            │
│                              │
│ History                      │
│ Cached Results               │
│ Trusted Domains              │
│ User Settings                │
└──────────────────────────────┘
```

---

# High-Level Architecture

TruthLens consists of four independent systems.

## 1. Chrome Extension

Responsibilities

- Detect article pages
- Extract article content
- Communicate with backend
- Cache results
- Display analysis
- Store settings

Technologies

- Manifest V3
- React
- TypeScript
- Chrome APIs

---

## 2. Backend

Responsibilities

- Receive article data
- Run AI models
- Calculate credibility
- Generate explanations
- Return structured response

Technologies

- FastAPI
- SQLAlchemy
- PostgreSQL
- Python

---

## 3. AI Engine

Responsibilities

- Fake News Detection
- Summarization
- Bias Detection
- Emotion Detection
- Explainable AI

Models

- RoBERTa
- DeBERTa
- DistilBERT
- Sentence Transformers
- spaCy

---

## 4. Database

Stores

- Cached analyses
- Trusted domains
- User preferences
- Analysis history

---

# Project Structure

```
TruthLens/

├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │      Header/
│   │      ScoreGauge/
│   │      WarningBadges/
│   │      AISummary/
│   │      SourceCard/
│   │      TrustBreakdown/
│   │      DeepDive/
│   │      History/
│   │      Settings/
│   │
│   ├── pages/
│   │      Popup/
│   │      Options/
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │      api.ts
│   │      chrome.ts
│   │      cache.ts
│   │
│   ├── utils/
│   │
│   ├── types/
│   │
│   ├── constants/
│   │
│   ├── styles/
│   │
│   ├── background/
│   │
│   ├── content/
│   │
│   └── main.tsx
│
├── backend/
│   │
│   ├── app/
│   │     api/
│   │     models/
│   │     services/
│   │     database/
│   │     schemas/
│   │
│   ├── tests/
│   │
│   └── main.py
│
├── docs/
│
├── IMPLEMENTATION_PLAN.md
├── ARCHITECTURE.md
├── PROJECT_PROGRESS.md
├── README.md
└── package.json
```

---

# Frontend Architecture

```
Popup

│

├── Header
│
├── Credibility Gauge
│
├── Prediction Badge
│
├── Warning Badges
│
├── AI Summary
│
├── Source Reputation
│
├── Trust Breakdown
│
├── Deep Dive
│
├── Related Articles
│
├── History
│
└── Settings
```

Every UI element should be an independent reusable React component.

---

# Component Principles

Each component should:

- Be reusable
- Be independently testable
- Accept typed props
- Contain minimal business logic
- Use composition over inheritance

---

# Content Script

Responsibilities

- Detect supported article pages
- Extract article content
- Remove ads
- Remove comments
- Remove navigation
- Send article to background worker

---

# Background Service Worker

Responsibilities

- Receive messages
- Cache responses
- Communicate with backend
- Retry failed requests
- Store user preferences
- Handle offline mode

---

# Popup

The popup should never perform heavy computations.

Responsibilities

- Display results
- Request analysis
- Show loading state
- Handle user interactions

All AI processing happens in the backend.

---

# Backend Architecture

```
Request

↓

Validation

↓

Content Processing

↓

Rule-Based Analysis

↓

AI Pipeline

↓

Hybrid Scoring

↓

Explainable AI

↓

Database Cache

↓

Response
```

---

# Rule-Based Analysis

Evaluates

- HTTPS
- Domain Reputation
- Citations
- Publication Date
- Author
- Metadata
- Headline Quality

Produces

Rule Score

---

# AI Pipeline

```
Article

↓

Cleaning

↓

Tokenization

↓

Classification

↓

Summarization

↓

Emotion Detection

↓

Bias Detection

↓

Confidence Estimation

↓

Explainable AI

↓

AI Score
```

Produces

- AI Score
- Summary
- Confidence
- Warnings

---

# Hybrid Scoring

Final Score

```
40%

Rule-Based Score

+

60%

AI Score
```

Produces

Overall Credibility

---

# Explainable AI

Instead of simply saying

"Fake"

TruthLens explains

- Why
- Evidence
- Confidence
- Suspicious phrases
- Missing citations
- Trusted signals

---

# API Design

POST

```
/analyze
```

Returns

```
{
    overallScore,
    ruleScore,
    aiScore,
    confidence,
    summary,
    trustBreakdown,
    warnings,
    explanation
}
```

---

GET

```
/history
```

Returns previous analyses.

---

GET

```
/stats
```

Returns analytics.

---

GET

```
/source/{domain}
```

Returns domain reputation.

---

# Database Design

Tables

ArticleCache

- URL
- Hash
- Analysis
- Timestamp

History

- URL
- Score
- Date

TrustedDomains

- Domain
- Reputation
- Category

Settings

- Theme
- Preferences

---

# Caching Strategy

Use URL hashing.

If

URL already analyzed

↓

Return cached result.

Else

↓

Analyze article.

Store result.

Return response.

---

# Error Handling

Frontend

- Friendly messages
- Retry button
- Loading indicators

Backend

- Structured errors
- Logging
- Validation
- Timeouts

---

# Security

Implement

- HTTPS
- CSP
- Input validation
- Rate limiting
- Secure environment variables

Future

- JWT
- Authentication
- Cloud sync

---

# Performance

Frontend

- Lazy loading
- Memoization
- Component reuse

Backend

- Cached inference
- Efficient database queries

Extension

- Background processing
- Cached analyses

---

# Development Workflow

For every new feature

1. Inspect existing code.
2. Reuse existing components.
3. Build one feature only.
4. Test locally.
5. Verify build.
6. Update PROJECT_PROGRESS.md.
7. Commit changes.
8. Push to GitHub.
9. Wait for approval.

---

# Future Expansion

- OCR support
- Deepfake detection
- Side Panel
- Mobile companion app
- Cloud synchronization
- Browser support (Firefox, Edge)
- Fact-check API integration
- Multilingual analysis
- Analytics dashboard

---

# Architecture Principles

TruthLens follows these principles:

- Modular Design
- Separation of Concerns
- Single Responsibility Principle
- Reusable Components
- Scalable Architecture
- Explainable AI
- Production-Ready Code
- Clean Folder Structure
- Maintainability First

This document defines the technical architecture of TruthLens and should be referenced before making structural or architectural changes.

