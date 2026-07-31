# TruthLens – Implementation Plan

**Version:** 1.0  
**Status:** Approved  
**Project Type:** AI-Powered Chrome Extension (Manifest V3)

---

# Project Overview

## Vision

TruthLens is an AI-powered Chrome Extension that helps users determine the credibility of online news articles in real time.

Instead of simply classifying articles as "Fake" or "Real", TruthLens explains **why** an article receives a particular credibility score using Explainable AI (XAI), rule-based analysis, and modern Natural Language Processing.

The goal is to build a production-quality application that demonstrates modern software engineering, UI/UX design, scalable architecture, and AI integration.

---

# Objectives

The project should demonstrate:

- Professional Chrome Extension development
- Modern React architecture
- Clean TypeScript code
- Modular frontend architecture
- FastAPI backend
- Explainable AI
- Hybrid AI + Rule-Based scoring
- Production-ready design
- Excellent UI/UX
- Security best practices
- Scalable architecture

---

# Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React

---

## Chrome Extension

- Manifest V3
- Background Service Worker
- Content Script
- Chrome Storage API
- Chrome Runtime Messaging
- Context Menu API
- Side Panel API (Future)

---

## Backend

- Python 3.12+
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic

---

## Artificial Intelligence

- HuggingFace Transformers
- RoBERTa
- DeBERTa
- DistilBERT
- Sentence Transformers
- spaCy

---

## Deployment

- Docker
- Docker Compose
- GitHub Actions

---

# Project Architecture

TruthLens consists of four major systems.

## 1. Chrome Extension

Responsible for

- Detecting pages
- Extracting article content
- Communicating with backend
- Displaying results

---

## 2. Backend API

Responsible for

- AI inference
- Rule-based analysis
- Caching
- Database
- Response formatting

---

## 3. AI Pipeline

Responsible for

- Classification
- Summarization
- Emotion Detection
- Bias Detection
- Explainable AI

---

## 4. Database

Stores

- Analysis history
- Cached articles
- Trusted domains
- User preferences

---

# Design Philosophy

TruthLens should feel like

- Arc Browser
- Linear
- Raycast
- Apple
- Vercel

Characteristics

- Minimal
- Elegant
- Premium
- Fast
- Smooth
- Clean

---

# UI Design

Popup Size

420 × 700 px

Theme

Dark-first

Primary Color

#16C784

Background

#1A1A2E

Accent

Glassmorphism

Typography

Inter

JetBrains Mono

Animations

Framer Motion

Animation Goals

- Smooth
- Lightweight
- 60 FPS
- Hardware Accelerated

---

# Popup Layout

## Above the Fold

Floating Header

Contains

- Logo
- Theme Toggle
- Extension Status

---

Credibility Gauge

Displays

- Overall Score
- Animated Gauge
- Confidence

---

Prediction Badge

Examples

Trusted

Suspicious

Needs Verification

---

Warning Badges

Examples

Clickbait

Emotional Language

Missing Sources

AI Generated

Poor Evidence

---

AI Summary

Short explanation of article.

---

Source Reputation

Shows

- Domain
- Reputation
- Trust Score

---

## Below the Fold

Trust Breakdown

Includes

- Source Reputation
- Citation Quality
- Headline Reliability
- Language Neutrality
- AI Confidence

---

Key Findings

Important observations.

---

Headline Analysis

Evaluates

- Clickbait
- Emotion
- Capitalization
- Sensationalism

---

Suspicious Phrases

Highlights manipulative wording.

---

Evidence Check

Analyzes

- Citations
- External references
- Supporting evidence

---

Explainable AI

Shows

Why the article received its score.

Instead of

"Fake"

Show

Examples

- Highly emotional wording
- Limited evidence
- Trusted source
- Neutral language

---

Related Articles

Shows

Supporting or conflicting news.

---

Action Bar

Buttons

Share

Report

Save

Reanalyze

---

# Credibility Scoring

TruthLens uses Hybrid Scoring.

Overall Score

40%

Rule-Based Analysis

+

60%

AI Analysis

---

## Rule-Based Analysis

Evaluate

HTTPS

Domain reputation

Citation count

Headline quality

Metadata

Reading complexity

Author presence

Publication date

Source quality

---

## AI Analysis

Perform

Fake News Classification

Summarization

Emotion Analysis

Bias Detection

Semantic Analysis

Explainable AI

---

# Final Response

Display

Overall Score

Rule-Based Score

AI Score

AI Confidence

Trust Breakdown

Warnings

Reasons

---

# Warning Badge System

Every warning badge includes

Icon

Color

Tooltip

Expandable explanation

Possible badges

Clickbait

Emotional Language

Missing Sources

AI Generated

Well Supported

Biased Language

Low Credibility

Trusted Publisher

---

# Content Extraction

Extract

Title

Author

Published Date

Canonical URL

Main Article

Images

Metadata

Ignore

Navigation

Advertisements

Comments

Related widgets

Footer

Sidebar

Only analyze actual article content.

---

# Background Worker

Responsibilities

Communicate with backend

Cache results

Retry failed requests

Store preferences

Handle extension messaging

Support offline mode

---

# Caching

Cache articles using

Hashed URL

Cached data includes

Analysis

Timestamp

AI response

Expire cache automatically.

---

# Offline Mode

If backend is unavailable

Continue using

Rule-Based Analysis

Warn user

"Limited analysis available."

---

# Backend API

Endpoints

POST /analyze

GET /history

GET /stats

GET /source/{domain}

Future

Authentication

User Profiles

Cloud Sync

---

# AI Pipeline

Article

↓

Cleaning

↓

Content Extraction

↓

Rule-Based Analysis

↓

AI Analysis

↓

Hybrid Scoring

↓

Explainable AI

↓

API Response

---

# Security

Validate inputs

Sanitize content

Rate limiting

Secure environment variables

HTTPS

Content Security Policy

Future

JWT Authentication

---

# Performance

Lazy loading

Memoization

Reusable components

Optimized animations

Efficient state management

Cached responses

Minimal re-renders

---

# Accessibility

Keyboard navigation

ARIA labels

High contrast support

Screen reader support

Responsive popup

Reduced motion support

---

# Phase Roadmap

## Phase 1

Project Foundation

Status

Completed

Includes

React

Tailwind

Manifest V3

Vite

Git

GitHub

---

## Phase 2

Frontend UI

Build

Floating Header

Credibility Gauge

Prediction Badge

Warning Badges

AI Summary

Source Card

Trust Breakdown

Deep Dive

History

Settings

Pause for review.

---

## Phase 3

Extension Logic

Content Script

Background Worker

Chrome Storage

Messaging

Caching

Offline Support

Pause.

---

## Phase 4

Backend

FastAPI

Database

AI Models

Hybrid Scoring

Caching

API

Pause.

---

## Phase 5

Integration

Frontend

Backend

Error Handling

Loading States

Retry Logic

Pause.

---

## Phase 6

Production Polish

Accessibility

Performance

Animations

Documentation

Testing

Deployment

Pause.

---

# Future Enhancements

OCR

Deepfake Detection

Timeline Comparison

Claim Extraction

Fact Checking APIs

Multilingual Support

Chrome Side Panel

User Accounts

Cloud Sync

Analytics Dashboard

---

# Documentation

Maintain

README.md

IMPLEMENTATION_PLAN.md

ARCHITECTURE.md

PROJECT_PROGRESS.md

API.md

---

# Git Workflow

Commit frequently.

Example commits

Initial project scaffold

Add floating header

Implement credibility gauge

Add warning badges

Complete popup UI

Implement content extraction

Create backend API

Integrate AI pipeline

Production polish

---

# Development Rules

Before coding

- Inspect existing project.
- Never regenerate completed work.
- Reuse existing components.

During coding

- Implement only one feature at a time.
- Keep components modular.
- Use TypeScript strictly.
- Follow React best practices.
- Write maintainable code.

After coding

- Verify the project builds.
- Explain every change.
- Update PROJECT_PROGRESS.md.
- Do not continue automatically.
- Wait for approval before the next feature.

---

# Success Criteria

TruthLens should be

- Professional
- Modular
- Explainable
- Fast
- Beautiful
- Production-ready
- Easy to maintain
- Portfolio-worthy

This document serves as the single source of truth for the TruthLens project.