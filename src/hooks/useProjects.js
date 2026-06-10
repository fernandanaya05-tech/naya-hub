import { useState, useEffect } from 'react'

const STORAGE_KEY = 'naya_projects'

export function useProjects() {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

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
