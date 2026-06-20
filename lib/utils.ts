import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B₫`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M₫`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K₫`
  }
  return `${value.toLocaleString('vi-VN')}₫`
}

export function formatNumber(value: number): string {
  return value.toLocaleString('vi-VN')
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function getChangeColor(change: number): string {
  if (change > 0) return 'text-success'
  if (change < 0) return 'text-danger'
  return 'text-text-muted'
}

export function getChangePrefix(change: number): string {
  if (change > 0) return '+'
  return ''
}
