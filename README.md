# English Janala Resources

A responsive, static vocabulary learning web app designed to help learners explore English words, meanings, pronunciation, and lesson levels.

## Overview

This project is built as a simple educational interface that fetches vocabulary lessons and word details from a remote API. Users can navigate lessons, search for words, view detailed definitions, and listen to pronunciation using browser speech synthesis.

## Features

- Responsive landing page with lesson navigation
- Fetches lesson and word data from `https://openapi.programming-hero.com`
- Interactive lesson cards with word details and pronunciation support
- Search functionality for vocabulary lookup
- Minimal dependencies using Tailwind CSS, DaisyUI, and Font Awesome

## Tech Stack

- HTML5
- CSS with Tailwind CSS and DaisyUI
- JavaScript (vanilla)
- Browser SpeechSynthesis API
- Remote API integration

## Files

- `index.html` - Main app layout and structure
- `script.js` - Application logic, API calls, event handling, and UI rendering
- `assets/` - Image and icon assets used by the UI
- `English-Janala.fig` - Design source file (Figma)

## Usage

1. Open `index.html` in a browser.
2. Enter a name and password to start the experience.
3. Select a lesson to load vocabulary cards.
4. Use the search input to find words across available vocabulary.
5. Click the info button for full word details and the speaker button to hear pronunciation.

## Notes

- The app relies on the external Programming Hero API, so a working internet connection is required.
- Error handling is included for failed API requests and empty search input.

## Contribution

This repository is a clean static resource suitable for portfolio use or further enhancement with authentication, persisted progress, and expanded lesson content.
