'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Toast, ToastType } from '@/types'

// ─── Context ──────────────────────────────────────────────────────────────────
interface ToastContextValue {
  toasts: Toast[]
  toast: {
    success: (title: string, message?: string) => void
    error:   (title: string, message?: string) => void
    warning: (title: string, message?: string) => void
    info:    (title: string, message?: string) => void
  }
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const add = useCallback((type: ToastType, title: string, message?: string, duration = 4000) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev.slice(-4), { id, type, title, message, duration }])
    if (duration > 0) setTimeout(() => dismiss(id), duration)
  }, [dismiss])

  const toast = {
    success: (t: string, m?: string) => add('success', t, m),
    error:   (t: string, m?: string) => add('error',   t, m, 6000),
    warning: (t: string, m?: string) => add('warning', t, m),
    info:    (t: string, m?: string) => add('info',    t, m),
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

// ─── Container ───────────────────────────────────────────────────────────────
function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  if (!toasts.length) return null
  return (
    <div
      className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 pointer-events-none"
      aria-live="polite"
      role="region"
      aria-label="Thông báo"
    >
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

// ─── Single Toast ─────────────────────────────────────────────────────────────
const toastConfig: Record<ToastType, {
  icon: React.ElementType
  bg: string
  border: string
  iconColor: string
  bar: string
}> = {
  success: { icon: CheckCircle,    bg: 'bg-white', border: 'border-success/30',      iconColor: 'text-success',      bar: 'bg-success' },
  error:   { icon: XCircle,        bg: 'bg-white', border: 'border-danger/30',       iconColor: 'text-danger',       bar: 'bg-danger' },
  warning: { icon: AlertTriangle,  bg: 'bg-white', border: 'border-brand-olive/30',  iconColor: 'text-brand-olive',  bar: 'bg-brand-olive' },
  info:    { icon: Info,           bg: 'bg-white', border: 'border-brand-border/30', iconColor: 'text-brand-border', bar: 'bg-brand-border' },
}

function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false)
  const cfg = toastConfig[t.type]
  const Icon = cfg.icon

  useEffect(() => {
    const tid = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(tid)
  }, [])

  return (
    <div
      className={cn(
        'pointer-events-auto w-80 rounded-xl border shadow-card-md overflow-hidden',
        'transition-all duration-300',
        cfg.bg, cfg.border,
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
      )}
      role="alert"
    >
      {/* Progress bar */}
      {t.duration && t.duration > 0 && (
        <div className={cn('h-0.5 w-full', cfg.bar, 'animate-[shrink_linear]')}
          style={{ animationDuration: `${t.duration}ms`, animationFillMode: 'forwards' }}
        />
      )}

      <div className="flex items-start gap-3 p-4">
        <Icon size={18} className={cn('flex-shrink-0 mt-0.5', cfg.iconColor)} />
        <div className="flex-1 min-w-0">
          <p className="text-text-primary text-sm font-semibold">{t.title}</p>
          {t.message && <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{t.message}</p>}
        </div>
        <button
          onClick={() => onDismiss(t.id)}
          className="flex-shrink-0 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Đóng"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
