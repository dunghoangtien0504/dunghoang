'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: string
  change?: number
  icon: React.ReactNode
  iconBg?: string
  badge?: string
  subtitle?: string
  progress?: number
  progressColor?: string
}

export default function StatsCard({
  label, value, change, icon,
  iconBg = 'bg-brand-accent/10',
  badge = '★ Mới',
  subtitle,
  progress,
  progressColor = 'bg-brand-accent',
}: StatsCardProps) {
  const isPositive = (change ?? 0) >= 0

  return (
    <div className="stat-card card-hover group">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-card', iconBg)}>
          {icon}
        </div>
        <span className="text-brand-olive text-[10px] font-medium opacity-70 group-hover:opacity-100 transition-opacity">
          {badge}
        </span>
      </div>

      {/* Value */}
      <div>
        <p className="text-text-muted text-xs mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-text-primary font-mono leading-tight">{value}</p>
      </div>

      {/* Progress */}
      {progress !== undefined && (
        <div className="progress-bar mt-1">
          <div
            className={cn('progress-fill', progressColor)}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}

      {/* Change */}
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 text-xs font-medium', isPositive ? 'text-success' : 'text-danger')}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{isPositive ? '+' : ''}{change}%</span>
          {subtitle && <span className="text-text-muted font-normal ml-1">{subtitle}</span>}
        </div>
      )}
    </div>
  )
}
