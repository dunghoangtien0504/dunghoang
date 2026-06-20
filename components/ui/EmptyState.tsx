import { LucideIcon, Inbox, Construction } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  variant?: 'default' | 'coming-soon' | 'no-data' | 'search'
  className?: string
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  variant = 'default',
  className,
}: EmptyStateProps) {
  const FallbackIcon = variant === 'coming-soon' ? Construction : Inbox

  const iconBg: Record<string, string> = {
    default:      'bg-surface-2 text-text-muted',
    'coming-soon':'bg-brand-olive/10 text-brand-olive',
    'no-data':    'bg-surface-2 text-text-muted',
    search:       'bg-brand-dark/5 text-text-muted',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 gap-4 text-center', className)}>
      {/* Icon */}
      <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center shadow-card', iconBg[variant])}>
        {Icon ? <Icon size={28} strokeWidth={1.5} /> : <FallbackIcon size={28} strokeWidth={1.5} />}
      </div>

      {/* Text */}
      <div className="space-y-1.5 max-w-xs">
        <p className="text-text-primary font-semibold text-base">{title}</p>
        {description && (
          <p className="text-text-muted text-sm leading-relaxed">{description}</p>
        )}
      </div>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-1">
          {action && (
            action.href ? (
              <Link href={action.href} className="btn-primary text-sm py-2">
                {action.label}
              </Link>
            ) : (
              <button onClick={action.onClick} className="btn-primary text-sm py-2">
                {action.label}
              </button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Link href={secondaryAction.href} className="btn-secondary text-sm py-2">
                {secondaryAction.label}
              </Link>
            ) : (
              <button onClick={secondaryAction.onClick} className="btn-secondary text-sm py-2">
                {secondaryAction.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}

// ─── Inline coming-soon wrapper cho stub pages ────────────────────────────────
export function ComingSoon({ title, description }: { title: string; description?: string }) {
  return (
    <div className="page-wrapper">
      <div className="card">
        <EmptyState
          variant="coming-soon"
          title={title}
          description={description ?? 'Tính năng này đang được phát triển và sẽ sớm ra mắt.'}
          action={{ label: 'Quay lại Dashboard', href: '/admin' }}
        />
      </div>
    </div>
  )
}
