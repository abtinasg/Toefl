import { Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Roadmap } from './pages/Roadmap'
import { Skills } from './pages/Skills'
import { Resources } from './pages/Resources'
import { Settings } from './pages/Settings'

export default function App() {
  return (
    <ProgressProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </ProgressProvider>
  )
}
