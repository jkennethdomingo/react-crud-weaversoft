import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { ThemeProviderWrapper } from '@/context/ThemeContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <Router>
        <App />
      </Router>
    </ThemeProviderWrapper>
  </StrictMode>,
)
