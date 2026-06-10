import { useState, useRef, useEffect } from 'react'
import { Trash2, StickyNote, Check, Clock, Circle } from 'lucide-react'

const STATUS_CONFIG = {
  todo: { label: 'A fazer', color: 'var(--text-muted)', bg: 'var(--bg-secondary)', icon: Circle },
  doing: { label: 'Em progresso', color: '#263baf', bg: 'rgba(38, 59, 175, 0.12)', icon: Clock },
  done: { label: 'Concluído', color: 'var(--green)', bg: 'rgba(53, 177, 10, 0.14)', icon: Check }
}

export default function ChecklistItem({ item, onToggle, onEditText, onEditNote, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [editVal, setEditVal] = useState(item.text)
  const [showNote, setShowNote] = useState(!!item.note)
  const [noteVal, setNoteVal] = useState(item.note || '')
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef()

  useEffect(() => { if (editing) inputRef.current?.focus() }, [editing])

  function saveText() {
    setEditing(false)
    if (editVal.trim()) onEditText(item.id, editVal.trim())
    else setEditVal(item.text)
  }

  function saveNote(val) {
    setNoteVal(val)
    onEditNote(item.id, val)
  }

  const st = STATUS_CONFIG[item.status]
  const Icon = st.icon

  return (
    <div
      style={{ borderRadius: 8, transition: 'background 0.1s', padding: '2px 0' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <button
          onClick={() => onToggle(item.id)}
          title={`Status: ${st.label}`}
          style={{
            width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
            background: item.status === 'done' ? 'var(--green)' : item.status === 'doing' ? 'rgba(38, 59, 175, 0.12)' : 'var(--bg-secondary)',
            border: item.status === 'done' ? '1.5px solid var(--green)' : item.status === 'doing' ? '1.5px solid #263baf' : '1.5px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s', cursor: 'pointer'
          }}
        >
          <Icon size={12} color={item.status === 'done' ? '#fff' : item.status === 'doing' ? '#263baf' : 'var(--text-muted)'} />
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          {editing ? (
            <input
              ref={inputRef}
              value={editVal}
              onChange={e => setEditVal(e.target.value)}
              onBlur={saveText}
              onKeyDown={e => { if (e.key === 'Enter') saveText(); if (e.key === 'Escape') { setEditing(false); setEditVal(item.text) } }}
              style={{
                width: '100%', fontSize: 14, padding: '2px 6px',
                border: '1px solid var(--blue)', borderRadius: 6,
                background: 'var(--bg-secondary)', color: 'var(--text)', outline: 'none'
              }}
            />
          ) : (
            <span
              onDoubleClick={() => setEditing(true)}
              title="Clique duplo para editar"
              style={{
                fontSize: 14,
                color: item.status === 'done' ? 'var(--text-muted)' : 'var(--text)',
                textDecoration: item.status === 'done' ? 'line-through' : 'none',
                cursor: 'text', display: 'block', lineHeight: 1.5
              }}
            >
              {item.text}
            </span>
          )}

          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
            color: st.color, background: st.bg,
            padding: '1px 7px', borderRadius: 20, marginTop: 3
          }}>
            {st.label.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 4, opacity: hovered ? 1 : 0, transition: 'opacity 0.15s' }}>
          <button
            onClick={() => setShowNote(v => !v)}
            title="Nota"
            style={{
              padding: 4, borderRadius: 6, color: showNote || item.note ? 'var(--blue)' : 'var(--text-muted)',
              transition: 'color 0.15s'
            }}
          >
            <StickyNote size={14} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            title="Remover"
            style={{ padding: 4, borderRadius: 6, color: 'var(--text-muted)', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {showNote && (
        <div style={{ marginTop: 6, marginLeft: 32 }}>
          <textarea
            value={noteVal}
            onChange={e => saveNote(e.target.value)}
            placeholder="Adicionar nota, link ou prazo..."
            style={{
              width: '100%', fontSize: 12, padding: '8px 10px',
              border: '1px solid var(--border)', borderRadius: 6,
              background: 'var(--bg-secondary)', color: 'var(--text)', resize: 'vertical',
              minHeight: 60, outline: 'none', fontFamily: 'Inter'
            }}
            onFocus={e => e.target.style.border = '1px solid var(--blue)'}
            onBlur={e => e.target.style.border = '1px solid var(--border)'}
          />
        </div>
      )}
    </div>
  )
}
