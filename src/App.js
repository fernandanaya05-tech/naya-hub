import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import NewProject from './components/NewProject'
import ProjectView from './components/ProjectView'
import { useProjects } from './hooks/useProjects'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('naya_theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [view, setView] = useState('dashboard') // dashboard | project
  const [showNew, setShowNew] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState(null)
  const [theme, setTheme] = useState(getInitialTheme)

  const projectHooks = useProjects()
  const { projects, addProject, deleteProject } = projectHooks

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('naya_theme', theme)
  }, [theme])

  function handleSaveProject(data) {
    const id = addProject(data)
    setShowNew(false)
    setActiveProjectId(id)
    setView('project')
  }

  function handleOpenProject(id) {
    setActiveProjectId(id)
    setView('project')
  }

  function handleDeleteProject(id) {
    if (window.confirm('Remover este projeto?')) {
      deleteProject(id)
      if (activeProjectId === id) setView('dashboard')
    }
  }

  function toggleTheme() {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'))
  }

  const activeProject = projects.find(p => p.id === activeProjectId)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {view === 'dashboard' && (
        <Dashboard
          projects={projects}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNewProject={() => setShowNew(true)}
          onOpenProject={handleOpenProject}
          onDeleteProject={handleDeleteProject}
        />
      )}

      {view === 'project' && activeProject && (
        <ProjectView
          project={activeProject}
          hooks={projectHooks}
          theme={theme}
          onToggleTheme={toggleTheme}
          onBack={() => setView('dashboard')}
        />
      )}

      {showNew && (
        <NewProject
          onSave={handleSaveProject}
          onCancel={() => setShowNew(false)}
        />
      )}
    </div>
  )
}
