import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/**
 * KpiCard — reusable billing/stats KPI card
 *
 * Props:
 *  icon        — lucide-react icon element shown in the badge (top-right)
 *  label       — primary metric name
 *  subLabel    — secondary descriptor line
 *  value       — formatted value string  e.g. "1,284" or "$49,118"
 *  trendUp     — boolean; true = green up arrow, false = red down arrow
 *  trendText   — trend label e.g. "↑ 8.2%"
 *  accentColor — left border + icon colour (defaults to navy #1F3A5F)
 */
export default function KpiCard({
  icon,
  label,
  subLabel,
  value,
  trendUp,
  trendText,
  accentColor = '#1F3A5F',
}) {
  const iconBg = accentColor + '18'   // ~10% opacity tint of the accent colour

  return (
    <Card
      className="border-l-[4px] shadow-sm overflow-hidden"
      style={{ borderLeftColor: accentColor }}
    >
      <CardContent className="p-5">

        {/* ── Row 1: label + icon badge ── */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-3">
            <p className="text-[13px] font-semibold text-slate-700 leading-tight mb-0.5">
              {label}
            </p>
            <p className="text-[11.5px] text-slate-400 leading-snug">
              {subLabel}
            </p>
          </div>

          {/* Icon badge */}
          <div
            className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
            style={{ background: iconBg, color: accentColor }}
          >
            {icon}
          </div>
        </div>

        {/* ── Row 2: big value ── */}
        <p className="text-[30px] font-extrabold text-slate-900 leading-none tracking-tight mb-3">
          {value}
        </p>

        {/* ── Row 3: trend badge + context ── */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'inline-flex items-center gap-1 text-[11.5px] font-semibold px-2 py-0.5 rounded-full',
              trendUp
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-600'
            )}
          >
            {trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trendText}
          </span>
          <span className="text-[11.5px] text-slate-400">vs last year</span>
        </div>

      </CardContent>
    </Card>
  )
}
