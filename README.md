# English Janala Resources

English Janala Resources is a responsive static web application that supports English vocabulary learning through lesson-based word exploration. The interface is designed for language learners who want to practice vocabulary, review meanings, and hear pronunciation in a clean, accessible experience.

## Summary

The application uses client-side JavaScript to load lesson data and vocabulary details from the Programming Hero open API. It provides an interactive learning flow with lesson selection, search capabilities, word detail modals, and speech synthesis for pronunciation.

## Key Features

- Responsive UI optimized for desktop and mobile browsers
- Lesson-based vocabulary browsing with dynamic content loading
- Word detail modal with definitions, example sentences, synonyms, and pronunciation
- Search feature for finding vocabulary items by keyword
- Lightweight implementation using CDN-hosted Tailwind CSS, DaisyUI, and Font Awesome

## Technology Stack

- HTML5
- CSS with Tailwind CSS and DaisyUI
- Vanilla JavaScript
- Browser SpeechSynthesis API for audio pronunciation
- Remote API data integration from `https://openapi.programming-hero.com`

## Project Structure

- `index.html` — Application layout and user interface structure
- `script.js` — Client-side logic, API requests, DOM rendering, and event handling
- `assets/` — Local image and icon resources used by the UI
- `English-Janala.fig` — Figma design source file

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in a modern web browser.
3. Enter a name and password to begin the experience.
4. Select a lesson to load vocabulary cards.
5. Use the search input to locate words across the available dataset.
6. Click the info icon to view word details and use the speaker icon to hear pronunciation.

## Notes

- A stable internet connection is required because the app fetches lesson and vocabulary data from an external API.
- Basic error handling is implemented for network failures and input validation.

## Future Improvements

- Add persistent user progress and authentication
- Enable offline support with local caching
- Expand lesson content and add quizzes or practice exercises
- Improve accessibility with enhanced keyboard navigation and ARIA labels

## License

This project is provided as a learning resource and portfolio demonstration.