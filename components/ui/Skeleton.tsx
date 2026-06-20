import { cn } from '@/lib/utils'

// ─── Base Skeleton ─────────────────────────────────────────────────────────────
interface SkeletonProps {
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  style?: React.CSSProperties
}

export function Skeleton({ className, rounded = 'md', style }: SkeletonProps) {
  const roundedClass = {
    sm:   'rounded',
    md:   'rounded-lg',
    lg:   'rounded-xl',
    full: 'rounded-full',
  }[rounded]

  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-surface-3 via-surface-2 to-surface-3 bg-[length:200%_100%]',
        roundedClass,
        className,
      )}
      style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', ...style }}
    />
  )
}

// ─── Pre-built skeletons ────────────────────────────────────────────────────────
export function StatCardSkeleton() {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <Skeleton className="w-10 h-10" rounded="lg" />
        <Skeleton className="w-12 h-4" rounded="sm" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-20 h-3" rounded="sm" />
        <Skeleton className="w-32 h-7" rounded="sm" />
      </div>
      <Skeleton className="w-full h-1.5" rounded="full" />
    </div>
  )
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton
            className={`h-4 ${i === 0 ? 'w-32' : i === cols - 1 ? 'w-16' : 'w-24'}`}
            rounded="sm"
          />
        </td>
      ))}
    </tr>
  )
}

export function ChartSkeleton({ height = 230 }: { height?: number }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <Skeleton className="w-36 h-4" rounded="sm" />
          <Skeleton className="w-24 h-3" rounded="sm" />
        </div>
        <Skeleton className="w-16 h-6" rounded="md" />
      </div>
      <div className="flex items-end gap-1" style={{ height }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${20 + Math.random() * 70}%` }}
            rounded="sm"
          />
        ))}
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="page-wrapper animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="w-48 h-6" rounded="sm" />
          <Skeleton className="w-32 h-3" rounded="sm" />
        </div>
        <Skeleton className="w-28 h-9" rounded="lg" />
      </div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      {/* Table */}
      <div className="card">
        <div className="space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
