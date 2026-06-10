import { useEffect, useState } from 'react'

const STORAGE_KEY = 'naya_projects'

function getInitialProjects() {
  if (typeof window === 'undefined') return []

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function mergeProjects(localProjects, remoteProjects) {
  const byId = new Map()

  ;[...localProjects, ...remoteProjects].forEach(project => {
    const existing = byId.get(project.id)
    if (!existing) {
      byId.set(project.id, project)
      return
    }

    const existingDate = new Date(existing.createdAt || 0).getTime()
    const incomingDate = new Date(project.createdAt || 0).getTime()
    byId.set(project.id, incomingDate > existingDate ? project : existing)
  })

  return Array.from(byId.values()).sort((a, b) => {
    const aDate = new Date(a.createdAt || 0).getTime()
    const bDate = new Date(b.createdAt || 0).getTime()
    return bDate - aDate
  })
}

function toRemoteProject(project) {
  return {
    id: project.id,
    created_at: project.createdAt || new Date().toISOString(),
    title: project.title,
    description: project.description || '',
    service: project.service || '',
    checklist: project.checklist || [],
    packageName: project.packageName || '',
    packageDetail: project.packageDetail || ''
  }
}

function fromRemoteProject(item) {
  return {
    ...item,
    id: item.id,
    createdAt: item.created_at,
    title: item.title,
    description: item.description,
    service: item.service,
    checklist: item.checklist || [],
    packageName: item.packageName,
    packageDetail: item.packageDetail
  }
}

function getApiUrl() {
  if (typeof window === 'undefined') return '/api/projects'
  return `${window.location.origin}/api/projects`
}

async function syncProjectsToApi(projects) {
  const response = await fetch(getApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projects)
  })

  if (!response.ok) {
    throw new Error('Falha ao sincronizar com o backend')
  }

  const payload = await response.json()
  return Array.isArray(payload) ? payload.map(fromRemoteProject) : []
}

async function loadProjectsFromApi() {
  const response = await fetch(getApiUrl())
  if (!response.ok) return null

  const payload = await response.json()
  return Array.isArray(payload) ? payload.map(fromRemoteProject) : null
}

export function useProjects() {
  const [projects, setProjects] = useState(getInitialProjects)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    }

    if (!hasLoaded) return
    syncProjectsToApi(projects).catch(error => {
      console.error('Falha ao sincronizar com o backend:', error)
    })
  }, [projects, hasLoaded])

  useEffect(() => {
    let ignore = false

    async function boot() {
      const localProjects = getInitialProjects()
      setProjects(localProjects)

      try {
        const remoteProjects = await loadProjectsFromApi()
        if (!ignore && remoteProjects && remoteProjects.length) {
          setProjects(mergeProjects(localProjects, remoteProjects))
        }
      } catch (error) {
        console.error('Falha ao carregar projetos do backend:', error)
      }

      if (!ignore) {
        setHasLoaded(true)
      }
    }

    boot()

    return () => {
      ignore = true
    }
  }, [])

  function addProject(project) {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setProjects(prev => [newProject, ...prev])
    return newProject.id
  }

  function updateProject(id, updates) {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  function deleteProject(id) {
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  function updateChecklist(projectId, sections) {
    updateProject(projectId, { checklist: sections })
  }

  function toggleItem(projectId, sectionId, itemId) {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p
      const checklist = p.checklist.map(section => {
        if (section.id !== sectionId) return section
        return {
          ...section,
          items: section.items.map(item => {
            if (item.id !== itemId) return item
            const next = { todo: 'doing', doing: 'done', done: 'todo' }
            return { ...item, status: next[item.status] }
          })
        }
      })
      return { ...p, checklist }
    }))
  }

  function editItemText(projectId, sectionId, itemId, text) {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p
      const checklist = p.checklist.map(section => {
        if (section.id !== sectionId) return section
        return {
          ...section,
          items: section.items.map(item =>
            item.id === itemId ? { ...item, text } : item
          )
        }
      })
      return { ...p, checklist }
    }))
  }

  function editItemNote(projectId, sectionId, itemId, note) {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p
      const checklist = p.checklist.map(section => {
        if (section.id !== sectionId) return section
        return {
          ...section,
          items: section.items.map(item =>
            item.id === itemId ? { ...item, note } : item
          )
        }
      })
      return { ...p, checklist }
    }))
  }

  function addItem(projectId, sectionId, text) {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p
      const checklist = p.checklist.map(section => {
        if (section.id !== sectionId) return section
        return {
          ...section,
          items: [...section.items, {
            id: Math.random().toString(36).substr(2, 9),
            text,
            status: 'todo',
            note: ''
          }]
        }
      })
      return { ...p, checklist }
    }))
  }

  function deleteItem(projectId, sectionId, itemId) {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p
      const checklist = p.checklist.map(section => {
        if (section.id !== sectionId) return section
        return { ...section, items: section.items.filter(i => i.id !== itemId) }
      })
      return { ...p, checklist }
    }))
  }

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    updateChecklist,
    toggleItem,
    editItemText,
    editItemNote,
    addItem,
    deleteItem
  }
}

export function getProgress(checklist) {
  if (!checklist?.length) return 0
  const all = checklist.flatMap(s => s.items)
  if (!all.length) return 0
  const done = all.filter(i => i.status === 'done').length
  return Math.round((done / all.length) * 100)
}

export function getSectionProgress(section) {
  if (!section.items.length) return { done: 0, total: 0, pct: 0 }
  const done = section.items.filter(i => i.status === 'done').length
  return { done, total: section.items.length, pct: Math.round((done / section.items.length) * 100) }
}
