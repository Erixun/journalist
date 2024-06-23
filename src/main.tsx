import './main.css'
import App from './app/App.tsx'
import React from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

const app = document.getElementById('app')

createRoot(app!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
