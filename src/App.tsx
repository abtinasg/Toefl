import { Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Roadmap } from './pages/Roadmap'
import { Skills } from './pages/Skills'
import { Resources } from './pages/Resources'
import { ErrorLog } from './pages/ErrorLog'
import { Notes } from './pages/Notes'
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
          <Route path="/errorlog" element={<ErrorLog />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </ProgressProvider>
  )
}
