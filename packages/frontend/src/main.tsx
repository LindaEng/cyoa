import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
  // END: ed8c6549bwf9
  <React.StrictMode>
          <App />
  </React.StrictMode>,
)}
