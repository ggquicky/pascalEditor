import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './app/router.tsx'
import './app/globals.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>,
)
