declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

export function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

export function trackLead(params?: Record<string, unknown>) {
  fbq('track', 'Lead', params)
}

export function trackPurchase(value: number, currency = 'VND') {
  fbq('track', 'Purchase', { value, currency })
}

export function trackInitiateCheckout(value: number, currency = 'VND') {
  fbq('track', 'InitiateCheckout', { value, currency })
}

export function trackViewContent(contentName: string) {
  fbq('track', 'ViewContent', { content_name: contentName })
}
