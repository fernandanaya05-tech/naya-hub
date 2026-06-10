import { Moon, Plus, Sun, Trash2, ArrowRight } from 'lucide-react'
import { getProgress } from '../hooks/useProjects'
import { SERVICES } from '../data/checklists'

const COLOR = {
  orange: { bg: 'rgba(255, 116, 28, 0.12)', text: '#ff741c', dot: '#ff741c' },
  blue: { bg: 'rgba(38, 59, 175, 0.12)', text: '#263baf', dot: '#263baf' },
  yellow: { bg: 'rgba(226, 184, 19, 0.16)', text: '#e2b813', dot: '#e2b813' }
}

function ServiceTag({ serviceId }) {
  const s = SERVICES[serviceId]
  if (!s) return null
  const c = COLOR[s.color]
  return (
    <span style={{
      background: c.bg, color: c.text,
      fontSize: 11, fontWeight: 600, padding: '2px 8px',
      borderRadius: 20, letterSpacing: '0.02em'
    }}>
      {s.label}
    </span>
  )
}

function ProjectCard({ project, onOpen, onDelete }) {
  const pct = getProgress(project.checklist)
  const services = Object.keys(project.services || {})

  return (
    <div style={{
      background: 'var(--bg-card)', borderRadius: 12,
      border: '1px solid var(--border)', padding: '20px 22px',
      boxShadow: 'var(--shadow)',
      display: 'flex', flexDirection: 'column', gap: 14,
      cursor: 'pointer', transition: 'box-shadow 0.15s'
    }}
      onClick={() => onOpen(project.id)}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'Funnel Display', fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>
            {project.clientName}
          </div>
          {project.segment && (
            <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>{project.segment}</div>
          )}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onDelete(project.id) }}
          style={{ color: 'var(--text-muted)', padding: 4, borderRadius: 6, transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#ff741c'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {services.map(s => <ServiceTag key={s} serviceId={s} />)}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: 'var(--text-muted)' }}>
          <span>Progresso</span>
          <span style={{ fontWeight: 600, color: pct === 100 ? 'var(--green)' : 'var(--text)' }}>{pct}%</span>
        </div>
        <div style={{ background: 'var(--border)', borderRadius: 99, height: 5 }}>
          <div style={{
            height: 5, borderRadius: 99,
            background: pct === 100 ? 'var(--green)' : 'var(--blue)',
            width: `${pct}%`, transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {project.startDate ? new Date(project.startDate + 'T12:00:00').toLocaleDateString('pt-BR') : ''}
        </span>
        <span style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
          Abrir <ArrowRight size={13} />
        </span>
      </div>
    </div>
  )
}

export default function Dashboard({ projects, theme, onToggleTheme, onNewProject, onOpenProject, onDeleteProject }) {
  const isDark = theme === 'dark'

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 8 }}>
            NAYA · DESIGN ESTRATÉGICO
          </div>
          <h1 style={{ fontFamily: 'Funnel Display', fontSize: 36, fontWeight: 700, lineHeight: 1.1, color: 'var(--text)' }}>
            Project Hub
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
          <button
            onClick={onNewProject}
            style={{
              background: 'var(--text)', color: 'var(--bg)',
              padding: '10px 20px', borderRadius: 8,
              fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'opacity 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Plus size={15} /> Novo Projeto
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 0',
          color: 'var(--text-muted)', border: '1.5px dashed var(--border)', borderRadius: 16,
          background: 'var(--bg-secondary)'
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>◻</div>
          <div style={{ fontFamily: 'Funnel Display', fontSize: 18, color: 'var(--text)', marginBottom: 8 }}>
            Nenhum projeto ainda.
          </div>
          <div style={{ fontSize: 13 }}>Comece criando um.</div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20
        }}>
          {projects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpen={onOpenProject}
              onDelete={onDeleteProject}
            />
          ))}
        </div>
      )}
    </div>
  )
}
