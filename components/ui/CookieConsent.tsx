'use client'

import { useState, useEffect } from 'react'
import { Cookie, ChevronDown, ChevronUp } from 'lucide-react'
import { getCookie, setCookie } from '@/lib/cookies'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Show banner if consent has not been allowed
    const consent = getCookie('cookie_consent')
    if (consent !== 'allowed') {
      // Smooth slide-up transition after 1 second delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAllow = () => {
    // Save consent for 10 years (3650 days)
    setCookie('cookie_consent', 'allowed', 3650)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-[9999] max-w-sm w-[calc(100vw-3rem)] bg-surface border border-border rounded-2xl p-5 shadow-card-lg animate-slide-up flex flex-col items-center text-center">
      
      {/* Cookie Icon Centered */}
      <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center mb-3 shadow-inner">
        <Cookie className="w-6 h-6 text-white" />
      </div>

      {/* Main Content */}
      <h3 className="text-brand-dark font-bold text-base mb-1.5">
        Accept Cookies & Tracking?
      </h3>
      <p className="text-text-muted text-xs leading-relaxed mb-3 px-1">
        We use cookies to remember affiliate referrals, measure marketing campaign performance, and maintain secure administrator sessions.
      </p>

      {/* Toggle Details Link */}
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="text-brand-border hover:text-brand-dark font-semibold text-xs underline mb-3 inline-flex items-center gap-1 transition-colors duration-150"
      >
        Learn more details
        {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* Expandable Explanation of Cookie */}
      {showDetails && (
        <div className="w-full text-left bg-surface-2 border border-border rounded-lg p-3 mb-4 text-xs space-y-2.5 max-h-48 overflow-y-auto animate-fade-in transition-all duration-200">
          <p className="text-brand-dark font-medium border-b border-border/50 pb-1">
            🍪 Cookie Roles on Website:
          </p>
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-brand-accent">1. Affiliate Referral:</span>
              <p className="text-text-muted mt-0.5 pl-2 border-l-2 border-brand-accent/30">
                If you visited via a referral link, a cookie stores the referral code for <strong>30 days</strong> to automatically attribute and award commission to the referrer when you register for a course.
              </p>
            </div>
            <div>
              <span className="font-semibold text-brand-olive">2. Marketing Analytics (UTM):</span>
              <p className="text-text-muted mt-0.5 pl-2 border-l-2 border-brand-olive/30">
                Remembers the source of your visit (e.g., Facebook Ads, Youtube) to help us analyze marketing performance and optimize operation costs.
              </p>
            </div>
            <div>
              <span className="font-semibold text-brand-dark">3. Admin Authentication:</span>
              <p className="text-text-muted mt-0.5 pl-2 border-l-2 border-brand-dark/30">
                Stores a secure token to keep administrators logged in, avoiding the need to repeatedly enter credentials.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Full-width Button Bottom */}
      <button 
        onClick={handleAllow}
        className="w-full bg-brand-accent hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-xl shadow-btn hover:shadow-btn-hover active:scale-[0.98] transition-all duration-150 text-sm select-none"
      >
        Accept & Continue
      </button>
    </div>
  )
}
