import { useState } from 'react'
import { X, ChevronRight } from 'lucide-react'
import { generateChecklist, SERVICES } from '../data/checklists'

const COLOR = {
  orange: { accent: '#ff741c', light: 'rgba(255, 116, 28, 0.12)' },
  blue: { accent: '#263baf', light: 'rgba(38, 59, 175, 0.12)' },
  yellow: { accent: '#e2b813', light: 'rgba(226, 184, 19, 0.16)' }
}

export default function NewProject({ onSave, onCancel }) {
  const [clientName, setClientName] = useState('')
  const [segment, setSegment] = useState('')
  const [startDate, setStartDate] = useState('')
  const [notes, setNotes] = useState('')
  const [selected, setSelected] = useState({
    branding: {},
    web: {},
    social: {}
  })

  function togglePackage(serviceId, pkgId) {
    setSelected(prev => {
      const service = prev[serviceId] || {}
      const already = service[pkgId]
      return {
        ...prev,
        [serviceId]: already ? {} : { [pkgId]: true }
      }
    })
  }

  const hasAny = Object.values(selected).some(s => Object.values(s).some(Boolean))

  function handleSubmit() {
    if (!clientName.trim() || !hasAny) return

    const services = {}
    if (Object.values(selected.branding).some(Boolean)) services.branding = selected.branding
    if (Object.values(selected.web).some(Boolean)) services.web = selected.web
    if (Object.values(selected.social).some(Boolean)) services.social = selected.social

    const checklist = generateChecklist(selected)

    onSave({ clientName: clientName.trim(), segment, startDate, notes, services, checklist })
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1px solid var(--border)', borderRadius: 8,
    fontSize: 14, background: 'var(--bg-secondary)',
    outline: 'none', transition: 'border 0.15s',
    color: 'var(--text)'
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(17, 17, 17, 0.55)',
      backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 100, padding: 24
    }}>
      <div style={{
        background: 'var(--bg-card)', borderRadius: 16, padding: '36px 40px',
        width: '100%', maxWidth: 560, boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        maxHeight: '90vh', overflowY: 'auto', color: 'var(--text)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'Funnel Display', fontSize: 24, fontWeight: 700 }}>Novo Projeto</h2>
          <button onClick={onCancel} style={{ color: 'var(--text-muted)', borderRadius: 8, padding: 4 }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              NOME DO CLIENTE *
            </label>
            <input
              style={inputStyle} placeholder="Ex: Studio Manon"
              value={clientName} onChange={e => setClientName(e.target.value)}
              onFocus={e => e.target.style.border = '1px solid var(--blue)'}
              onBlur={e => e.target.style.border = '1px solid var(--border)'}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                SEGMENTO / NICHO
              </label>
              <input
                style={inputStyle} placeholder="Ex: Cosméticos naturais"
                value={segment} onChange={e => setSegment(e.target.value)}
                onFocus={e => e.target.style.border = '1px solid var(--blue)'}
                onBlur={e => e.target.style.border = '1px solid var(--border)'}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                DATA DE INÍCIO
              </label>
              <input
                type="date" style={inputStyle}
                value={startDate} onChange={e => setStartDate(e.target.value)}
                onFocus={e => e.target.style.border = '1px solid var(--blue)'}
                onBlur={e => e.target.style.border = '1px solid var(--border)'}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              NOTAS INICIAIS
            </label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
              placeholder="Contexto, observações, canais de contato..."
              value={notes} onChange={e => setNotes(e.target.value)}
              onFocus={e => e.target.style.border = '1px solid var(--blue)'}
              onBlur={e => e.target.style.border = '1px solid var(--border)'}
            />
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 14 }}>
            SERVIÇOS CONTRATADOS *
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.values(SERVICES).map(service => {
              const c = COLOR[service.color]
              return (
                <div key={service.id}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: c.accent, marginBottom: 6 }}>
                    {service.label.toUpperCase()}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {Object.values(service.packages).map(pkg => {
                      const isSelected = selected[service.id]?.[pkg.id]
                      return (
                        <button
                          key={pkg.id}
                          onClick={() => togglePackage(service.id, pkg.id)}
                          style={{
                            padding: '10px 14px', borderRadius: 8, textAlign: 'left',
                            fontSize: 13, fontWeight: isSelected ? 600 : 400,
                            border: isSelected ? `1.5px solid ${c.accent}` : '1.5px solid var(--border)',
                            background: isSelected ? c.light : 'var(--bg-secondary)',
                            color: isSelected ? c.accent : 'var(--text-muted)',
                            transition: 'all 0.15s',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                          }}
                        >
                          {pkg.label}
                          {isSelected && <span style={{ fontSize: 16 }}>✓</span>}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!clientName.trim() || !hasAny}
          style={{
            width: '100%', padding: '13px',
            background: clientName.trim() && hasAny ? 'var(--text)' : 'var(--border)',
            color: clientName.trim() && hasAny ? 'var(--bg)' : 'var(--text-muted)', borderRadius: 8,
            fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'opacity 0.15s',
            cursor: clientName.trim() && hasAny ? 'pointer' : 'not-allowed'
          }}
        >
          Criar Projeto e Gerar Checklist <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
