import { useState } from 'react'
import { ArrowLeft, Plus, Filter, Moon, Sun } from 'lucide-react'
import ChecklistItem from './ChecklistItem'
import { getSectionProgress, getProgress } from '../hooks/useProjects'
import { SERVICES } from '../data/checklists'

const COLOR_MAP = {
  orange: { accent: '#ff741c', light: 'rgba(255, 116, 28, 0.12)', letterBg: '#ff741c' },
  blue: { accent: '#263baf', light: 'rgba(38, 59, 175, 0.12)', letterBg: '#263baf' },
  yellow: { accent: '#e2b813', light: 'rgba(226, 184, 19, 0.16)', letterBg: '#e2b813' }
}

function SectionHeader({ section, progress }) {
  const c = COLOR_MAP[section.color] || COLOR_MAP.orange
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: c.letterBg, color: '#fff',
        fontFamily: 'Funnel Display', fontSize: 18, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        {section.letter}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: c.accent, marginBottom: 1 }}>
              {section.subtitle}
            </div>
            <div style={{ fontFamily: 'Funnel Display', fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>
              {section.title}
            </div>
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {progress.done}/{progress.total}
          </span>
        </div>
        <div style={{ background: 'var(--border)', borderRadius: 99, height: 3, marginTop: 6 }}>
          <div style={{
            height: 3, borderRadius: 99, background: c.accent,
            width: `${progress.pct}%`, transition: 'width 0.3s'
          }} />
        </div>
      </div>
    </div>
  )
}

export default function ProjectView({ project, hooks, theme, onToggleTheme, onBack }) {
  const { toggleItem, editItemText, editItemNote, addItem, deleteItem } = hooks
  const [filter, setFilter] = useState('all')
  const [addingIn, setAddingIn] = useState(null)
  const [newItemText, setNewItemText] = useState('')

  const pct = getProgress(project.checklist)
  const isDark = theme === 'dark'

  function handleAddItem(sectionId) {
    if (newItemText.trim()) {
      addItem(project.id, sectionId, newItemText.trim())
      setNewItemText('')
      setAddingIn(null)
    }
  }

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'todo', label: 'A fazer' },
    { id: 'doing', label: 'Em progresso' },
    { id: 'done', label: 'Concluídos' }
  ]

  const serviceEntries = Object.keys(project.services || {})

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Sidebar */}
      <div style={{
        width: 260, flexShrink: 0, background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)', padding: '32px 24px',
        display: 'flex', flexDirection: 'column', gap: 24,
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto'
      }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13, marginBottom: 4 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <ArrowLeft size={14} /> Projetos
        </button>

        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 8 }}>
            CLIENTE
          </div>
          <div style={{ fontFamily: 'Funnel Display', fontSize: 20, fontWeight: 700 }}>
            {project.clientName}
          </div>
          {project.segment && (
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{project.segment}</div>
          )}
          {project.startDate && (
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
              Início: {new Date(project.startDate + 'T12:00:00').toLocaleDateString('pt-BR')}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 8 }}>
            SERVIÇOS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {serviceEntries.map(sid => {
              const s = SERVICES[sid]
              if (!s) return null
              const c = COLOR_MAP[s.color]
              return (
                <span key={sid} style={{
                  fontSize: 12, fontWeight: 600, color: c.accent,
                  background: c.light, padding: '4px 10px', borderRadius: 20,
                  display: 'inline-block'
                }}>
                  {s.label}
                </span>
              )
            })}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 8 }}>
            PROGRESSO GERAL
          </div>
          <div style={{ fontFamily: 'Funnel Display', fontSize: 28, fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--text)' }}>
            {pct}%
          </div>
          <div style={{ background: 'var(--border)', borderRadius: 99, height: 5, marginTop: 8 }}>
            <div style={{
              height: 5, borderRadius: 99,
              background: pct === 100 ? 'var(--green)' : 'var(--blue)',
              width: `${pct}%`, transition: 'width 0.4s'
            }} />
          </div>
          {pct === 100 && (
            <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 8, fontWeight: 600 }}>
              Projeto 100% concluído. ✓
            </div>
          )}
        </div>

        {project.notes && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 8 }}>
              NOTAS
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{project.notes}</div>
          </div>
        )}

        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 8 }}>
            SEÇÕES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {project.checklist?.map(section => {
              const p = getSectionProgress(section)
              const c = COLOR_MAP[section.color] || COLOR_MAP.orange
              return (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  style={{
                    fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none',
                    padding: '4px 8px', borderRadius: 6,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'background 0.1s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = c.light; e.currentTarget.style.color = c.accent }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <span>{section.title}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.done}/{p.total}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '40px 48px', maxWidth: 720 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: 'Funnel Display', fontSize: 24, fontWeight: 700 }}>Checklist</div>
          <button
            onClick={onToggleTheme}
            aria-label="Alternar tema"
            style={{
              width: 42, height: 42, borderRadius: 999, border: '1px solid var(--border)',
              background: 'var(--bg-card)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 36, alignItems: 'center' }}>
          <Filter size={13} color="var(--text-muted)" />
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                border: filter === f.id ? '1.5px solid var(--text)' : '1.5px solid var(--border)',
                background: filter === f.id ? 'var(--text)' : 'transparent',
                color: filter === f.id ? 'var(--bg)' : 'var(--text-muted)',
                transition: 'all 0.15s'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {project.checklist?.map(section => {
          const filtered = filter === 'all'
            ? section.items
            : section.items.filter(i => i.status === filter)
          const progress = getSectionProgress(section)

          return (
            <div
              key={section.id}
              id={`section-${section.id}`}
              style={{
                background: 'var(--bg-card)', borderRadius: 14,
                border: '1px solid var(--border)', padding: '24px 28px',
                marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <SectionHeader section={section} progress={progress} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filtered.length === 0 && filter !== 'all' ? (
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '8px 0' }}>
                    Nenhum item com este status.
                  </div>
                ) : (
                  filtered.map(item => (
                    <ChecklistItem
                      key={item.id}
                      item={item}
                      onToggle={(itemId) => toggleItem(project.id, section.id, itemId)}
                      onEditText={(itemId, text) => editItemText(project.id, section.id, itemId, text)}
                      onEditNote={(itemId, note) => editItemNote(project.id, section.id, itemId, note)}
                      onDelete={(itemId) => deleteItem(project.id, section.id, itemId)}
                    />
                  ))
                )}
              </div>

              {addingIn === section.id ? (
                <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                  <input
                    autoFocus
                    value={newItemText}
                    onChange={e => setNewItemText(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleAddItem(section.id)
                      if (e.key === 'Escape') { setAddingIn(null); setNewItemText('') }
                    }}
                    placeholder="Nome do entregável... (Enter para salvar)"
                    style={{
                      flex: 1, padding: '8px 12px', border: '1px solid var(--blue)',
                      borderRadius: 8, fontSize: 13, background: 'var(--bg-secondary)',
                      outline: 'none', color: 'var(--text)'
                    }}
                  />
                  <button
                    onClick={() => { setAddingIn(null); setNewItemText('') }}
                    style={{ fontSize: 12, color: 'var(--text-muted)', padding: '0 8px' }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setAddingIn(section.id); setNewItemText('') }}
                  style={{
                    marginTop: 14, display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 12, color: 'var(--text-muted)', padding: '6px 2px',
                    transition: 'color 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Plus size={14} /> Adicionar entregável
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
