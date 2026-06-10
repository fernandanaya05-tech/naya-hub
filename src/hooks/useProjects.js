import { useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

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

async function syncProjectsToSupabase(projects) {
  if (!isSupabaseConfigured || !supabase) return

  const { error } = await supabase.from('projects').upsert(
    projects.map(toRemoteProject),
    { onConflict: 'id' }
  )

  if (error) {
    console.error('Falha ao sincronizar com o Supabase:', error)
  }
}

async function loadProjectsFromSupabase() {
  if (!isSupabaseConfigured || !supabase) return null

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Falha ao carregar projetos do Supabase:', error)
    return null
  }

  return (data || []).map(fromRemoteProject)
}

export function useProjects() {
  const [projects, setProjects] = useState(getInitialProjects)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    }

    if (isSupabaseConfigured && supabase && initializedRef.current) {
      syncProjectsToSupabase(projects)
    }
  }, [projects])

  useEffect(() => {
    let ignore = false
    let channel = null

    async function boot() {
      initializedRef.current = true

      if (!isSupabaseConfigured || !supabase) return

      const localProjects = getInitialProjects()
      const remoteProjects = await loadProjectsFromSupabase()

      if (ignore) return

      if (remoteProjects && remoteProjects.length) {
        setProjects(mergeProjects(localProjects, remoteProjects))
      } else if (localProjects.length) {
        setProjects(localProjects)
        await syncProjectsToSupabase(localProjects)
      }

      channel = supabase.channel('projects-sync')
      channel.on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        payload => {
          if (ignore) return

          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const incoming = fromRemoteProject(payload.new)
            setProjects(prev => mergeProjects(prev, [incoming]))
          }

          if (payload.eventType === 'DELETE') {
            const removedId = payload.old?.id
            if (removedId) {
              setProjects(prev => prev.filter(project => project.id !== removedId))
            }
          }
        }
      )

      channel.subscribe()
    }

    boot()

    return () => {
      ignore = true
      if (channel) {
        supabase.removeChannel(channel)
      }
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
