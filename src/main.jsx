// Import StrictMode - a React wrapper that runs extra dev-only checks
import { StrictMode } from 'react'
// Import createRoot - the React 18+ way to attach React to a DOM element
import { createRoot } from 'react-dom/client'
// Import the global CSS file so styles apply to the whole app
import './index.css'
// Import the root App component
import App from './App.jsx'

// Find <div id="root"> in index.html and tell React to render inside it
createRoot(document.getElementById('root')).render(
  // StrictMode wraps the app for dev warnings (doesn't affect production build)
  <StrictMode>
    <App /> {/* Render the whole app inside StrictMode */}
  </StrictMode>,
)

// ============================================================
// SUMMARY
// ============================================================
// The starting point of the app. Finds <div id="root"> in index.html
// and tells React to draw <App /> inside it. Think of it as turning
// on the engine. You rarely edit this file.
// ============================================================
