'use client'

import { useState } from 'react'
import {
  Target, CheckCircle, AlertTriangle, ExternalLink,
  Copy, Eye, Activity, Zap, Globe, BarChart3
} from 'lucide-react'

type PTab = 'setup' | 'events' | 'test' | 'capi'

const EVENTS = [
  { name: 'PageView',       fired: 1245, status: 'active',  type: 'Standard' },
  { name: 'ViewContent',    fired: 892,  status: 'active',  type: 'Standard' },
  { name: 'AddToCart',      fired: 234,  status: 'active',  type: 'Custom'   },
  { name: 'InitiateCheckout',fired:156,  status: 'active',  type: 'Standard' },
  { name: 'Purchase',       fired: 89,   status: 'active',  type: 'Standard' },
  { name: 'Lead',           fired: 445,  status: 'active',  type: 'Standard' },
  { name: 'CompleteRegistration', fired:67, status:'active',type:'Standard'  },
]

const PIXEL_CODE = `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->`

export default function PixelPage() {
  const [activeTab, setActiveTab] = useState<PTab>('setup')
  const [copied, setCopied] = useState(false)
  const [pixelId, setPixelId] = useState('')
  const [connected, setConnected] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(PIXEL_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Pixel & CAPI</h1>
          <p className="page-subtitle">Meta Pixel, Conversion API & su kien theo doi</p>
        </div>
        {connected && (
          <div className="flex items-center gap-2 bg-success-light border border-success/20 rounded-xl px-3 py-2">
            <CheckCircle size={14} className="text-success" />
            <span className="text-success text-xs font-medium">Pixel dang hoat dong</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {([
          { key:'setup',  label:'Cai dat Pixel' },
          { key:'events', label:'Su kien' },
          { key:'test',   label:'Kiem tra' },
          { key:'capi',   label:'Conversion API' },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 -mb-px transition-all ${
              activeTab === t.key ? 'border-brand-dark text-brand-dark' : 'border-transparent text-text-muted hover:text-text-secondary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SETUP */}
      {activeTab === 'setup' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* Pixel ID */}
            <div className="card card-hover">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-brand-dark/10 flex items-center justify-center">
                  <Target size={15} className="text-brand-dark" />
                </div>
                <h3 className="section-title">Ket noi Meta Pixel</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-text-secondary text-xs font-medium block mb-1.5">
                    Pixel ID <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    value={pixelId}
                    onChange={e => setPixelId(e.target.value)}
                    placeholder="123456789012345"
                    className="input-field text-sm h-10 font-mono"
                  />
                  <p className="text-text-muted text-[10px] mt-1">Tim tai: Meta Business Suite → Events Manager</p>
                </div>
                <div>
                  <label className="text-text-secondary text-xs font-medium block mb-1.5">Moi truong</label>
                  <select className="input-field text-xs">
                    <option>Production</option>
                    <option>Development / Test</option>
                  </select>
                </div>
                <button
                  onClick={() => { if (pixelId) setConnected(true) }}
                  className="btn-primary w-full justify-center text-sm py-2.5"
                >
                  <Zap size={14} />Ket noi Pixel
                </button>
                {connected && (
                  <div className="flex items-center gap-2 bg-success-light border border-success/20 rounded-lg p-3">
                    <CheckCircle size={13} className="text-success" />
                    <p className="text-success text-xs font-medium">Ket noi thanh cong!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Domain Verification */}
            <div className="card card-hover">
              <h3 className="section-title mb-1">Xac minh Domain</h3>
              <p className="text-text-muted text-xs mb-3">Them meta-domain-verification vao the head</p>
              <div className="bg-surface-2 border border-border rounded-lg p-3 font-mono text-xs text-text-secondary">
                {'<meta name="facebook-domain-verification" content="YOUR_CODE" />'}
              </div>
              <a
                href="https://business.facebook.com/settings/owned-domains"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-xs mt-3"
              >
                Mo Meta Business <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Pixel snippet */}
          <div className="card card-hover">
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title">Code Pixel</h3>
              <button onClick={copyCode} className="btn-secondary text-xs py-1.5">
                <Copy size={11} />{copied ? 'Da copy!' : 'Copy code'}
              </button>
            </div>
            <pre className="bg-brand-dark rounded-xl p-4 text-[10px] font-mono text-text-on-dark-2 overflow-auto max-h-64 leading-relaxed">
              {PIXEL_CODE}
            </pre>
            <div className="mt-3 flex items-start gap-2 bg-brand-olive/5 border border-brand-olive/20 rounded-lg p-3">
              <AlertTriangle size={13} className="text-brand-olive flex-shrink-0 mt-0.5" />
              <p className="text-text-muted text-[10px]">
                Code nay da duoc them tu dong vao <code className="bg-surface-3 px-1 rounded">&lt;head&gt;</code> khi ban nhap Pixel ID va ket noi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* EVENTS */}
      {activeTab === 'events' && (
        <div className="card card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Su kien da duoc theo doi</h3>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Activity size={12} className="text-success" />
              <span>Cap nhat theo thoi gian thuc</span>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Su kien</th>
                <th className="table-header">Loai</th>
                <th className="table-header text-right">Da fire</th>
                <th className="table-header">Trang thai</th>
              </tr>
            </thead>
            <tbody>
              {EVENTS.map(e => (
                <tr key={e.name} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <code className="text-text-primary text-xs font-mono font-semibold">{e.name}</code>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge text-[10px] ${e.type === 'Standard' ? 'bg-info-light text-info border border-info/20' : 'badge-success'}`}>
                      {e.type}
                    </span>
                  </td>
                  <td className="table-cell text-right font-mono font-semibold text-text-primary">{e.fired.toLocaleString()}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <CheckCircle size={11} className="text-success" />
                      <span className="badge badge-success text-[10px]">Active</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TEST */}
      {activeTab === 'test' && (
        <div className="max-w-lg space-y-4">
          <div className="card card-hover">
            <h3 className="section-title mb-3">Kiem tra Pixel</h3>
            <div className="space-y-3">
              <div>
                <label className="text-text-secondary text-xs font-medium block mb-1.5">URL trang can kiem tra</label>
                <input placeholder="https://dunghoang.com/courses" className="input-field text-sm h-10" />
              </div>
              <button className="btn-primary w-full justify-center text-sm py-2.5">
                <Eye size={14} />Mo Pixel Helper
              </button>
            </div>
          </div>
          <div className="card card-hover">
            <h3 className="section-title mb-3">Ket qua kiem tra</h3>
            <div className="space-y-2">
              {[
                { check: 'Pixel da duoc cai dat', ok: false },
                { check: 'PageView su kien fire', ok: false },
                { check: 'Xac minh domain', ok: false },
                { check: 'CAPI ket noi', ok: false },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-surface-2 rounded-lg">
                  {c.ok
                    ? <CheckCircle size={13} className="text-success" />
                    : <AlertTriangle size={13} className="text-brand-olive" />
                  }
                  <span className="text-text-secondary text-xs">{c.check}</span>
                  <span className={`ml-auto text-xs font-medium ${c.ok ? 'text-success' : 'text-text-muted'}`}>
                    {c.ok ? 'OK' : 'Chua ket noi'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CAPI */}
      {activeTab === 'capi' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="card card-hover">
            <h3 className="section-title mb-1">Conversion API (CAPI)</h3>
            <p className="text-text-muted text-xs mb-4">
              Gui su kien truc tiep tu server, tang do chinh xac khi browser block Pixel.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-text-secondary text-xs font-medium block mb-1.5">Access Token</label>
                <input type="password" placeholder="EAAxxxxxxxxxx..." className="input-field text-sm h-10 font-mono" />
              </div>
              <div>
                <label className="text-text-secondary text-xs font-medium block mb-1.5">Test Event Code</label>
                <input placeholder="TEST12345" className="input-field text-sm h-10 font-mono" />
              </div>
              <button className="btn-primary w-full justify-center text-sm py-2.5">
                <Zap size={14} />Ket noi CAPI
              </button>
            </div>
          </div>
          <div className="card card-hover bg-brand-dark/2 border-brand-border/15">
            <h3 className="section-title mb-2">Loi ich CAPI</h3>
            <div className="space-y-2.5 mt-3">
              {[
                { icon: Globe,    label: 'Khong bi block boi ad blocker' },
                { icon: BarChart3,label: 'Du lieu chinh xac hon 30-50%' },
                { icon: Activity, label: 'Tracking theo thoi gian thuc' },
                { icon: Target,   label: 'Toi uu chien dich quang cao tot hon' },
              ].map((b, i) => {
                const Icon = b.icon
                return (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <CheckCircle size={13} className="text-success flex-shrink-0" />
                    <Icon size={13} className="text-brand-border flex-shrink-0" />
                    {b.label}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
