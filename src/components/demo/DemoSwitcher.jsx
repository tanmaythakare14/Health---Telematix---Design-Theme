import { useVariant } from '../../context/VariantContext'

const THEMES = [
  { id: 1, label: 'Variation 1', color: '#1F3A5F' },
  { id: 2, label: 'Variation 2', color: '#2563EB' },
  { id: 4, label: 'Variation 3', color: '#0D9488' },
]

/* All styles are inline so the switcher looks identical
   regardless of which variant's CSS is currently active.   */
export default function DemoSwitcher() {
  const { variant, setVariant } = useVariant()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        background: 'white',
        borderRadius: 999,
        padding: '5px 6px 5px 14px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.14), 0 1px 6px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.08)',
        fontFamily: 'Inter, system-ui, sans-serif',
        userSelect: 'none',
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#94a3b8',
          marginRight: 6,
          flexShrink: 0,
        }}
      >
        Demo
      </span>

      {/* Theme buttons */}
      {THEMES.map((t) => {
        const isActive = variant === t.id
        return (
          <button
            key={t.id}
            onClick={() => setVariant(t.id)}
            title={`Switch to ${t.label}`}
            style={{
              height: 30,
              padding: '0 13px',
              borderRadius: 999,
              border: isActive ? 'none' : '1px solid transparent',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.18s ease',
              whiteSpace: 'nowrap',
              ...(isActive
                ? { background: t.color, color: '#fff', boxShadow: `0 2px 8px ${t.color}55` }
                : { background: 'transparent', color: '#64748b' }),
            }}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
