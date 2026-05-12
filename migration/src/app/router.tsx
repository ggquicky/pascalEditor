import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './routes/home-page'
import { PrivacyPage } from './routes/privacy-page'
import { ScenePage } from './routes/scene-page'
import { ScenesPage } from './routes/scenes-page'
import { TermsPage } from './routes/terms-page'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<ScenesPage />} path="/scenes" />
      <Route element={<ScenePage />} path="/scene/:id" />
      <Route element={<PrivacyPage />} path="/privacy" />
      <Route element={<TermsPage />} path="/terms" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}
