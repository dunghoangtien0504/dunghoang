'use client'

import { useState } from 'react'
import { User, Bell, Shield, CreditCard, Globe, Palette, Save, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'profile' | 'notifications' | 'security' | 'billing' | 'integrations'

const TABS: { key: Tab; label: string; icon: typeof User }[] = [
  { key: 'profile',       label: 'Ho so',         icon: User    },
  { key: 'notifications', label: 'Thong bao',     icon: Bell    },
  { key: 'security',      label: 'Bao mat',       icon: Shield  },
  { key: 'billing',       label: 'Thanh toan',    icon: CreditCard },
  { key: 'integrations',  label: 'Tich hop',      icon: Globe   },
]

const NOTIF_SETTINGS = [
  { key: 'new_order',    label: 'Don hang moi',         desc: 'Khi co don hang thanh toan thanh cong',     email: true,  push: true  },
  { key: 'new_student',  label: 'Hoc vien moi',         desc: 'Khi co hoc vien dang ky khoa hoc moi',     email: true,  push: false },
  { key: 'email_sent',   label: 'Campaign gui xong',    desc: 'Sau khi email campaign gui hoan tat',      email: true,  push: false },
  { key: 'deal_won',     label: 'Deal chot thanh cong', desc: 'Khi mot deal duoc chuyen sang Won',        email: true,  push: true  },
  { key: 'refund',       label: 'Yeu cau hoan tien',    desc: 'Khi co khach hang yeu cau hoan tien',      email: true,  push: true  },
  { key: 'affiliate',    label: 'Hoa hong Affiliate',   desc: 'Bao cao hoa hong hang tuan',               email: true,  push: false },
]

const INTEGRATIONS = [
  { name: 'Supabase',   status: 'Chua ket noi', color: 'text-text-muted', desc: 'Database & Authentication',       href: 'https://supabase.com' },
  { name: 'Resend',     status: 'Chua ket noi', color: 'text-text-muted', desc: 'Email delivery service',          href: 'https://resend.com' },
  { name: 'Meta Pixel', status: 'Chua ket noi', color: 'text-text-muted', desc: 'Facebook Ads tracking + CAPI',    href: '#' },
  { name: 'Zalo OA',    status: 'Chua ket noi', color: 'text-text-muted', desc: 'Zalo Official Account + ZNS',     href: '#' },
  { name: 'Sepay/PayOS',status: 'Chua ket noi', color: 'text-text-muted', desc: 'QR payment gateway Vietnam-native',href:'#' },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative w-9 h-5 rounded-full transition-colors duration-200',
        checked ? 'bg-brand-dark' : 'bg-border'
      )}
    >
      <span className={cn(
        'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200',
        checked ? 'translate-x-4' : 'translate-x-0'
      )} />
    </button>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [showPw, setShowPw] = useState(false)
  const [saved, setSaved] = useState(false)
  const [notifs, setNotifs] = useState(NOTIF_SETTINGS)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const toggleNotif = (key: string, field: 'email' | 'push') => {
    setNotifs(prev => prev.map(n => n.key === key ? { ...n, [field]: !n[field as keyof typeof n] } : n))
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Cai dat</h1>
          <p className="page-subtitle">Quan ly tai khoan, bao mat va tich hop</p>
        </div>
        <button onClick={handleSave} className="btn-primary text-xs py-2">
          {saved ? <><CheckCircle size={13} />Da luu!</> : <><Save size={13} />Luu thay doi</>}
        </button>
      </div>

      <div className="flex gap-5">
        {/* Sidebar tabs */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {TABS.map(t => {
              const Icon = t.icon
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={cn(
                    'w-full sidebar-item rounded-xl',
                    activeTab === t.key
                      ? 'bg-brand-dark text-text-on-dark'
                      : 'bg-surface border border-border text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                  )}
                >
                  <Icon size={14} className={activeTab === t.key ? 'text-text-on-dark' : 'text-text-muted'} />
                  {t.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Profile */}
          {activeTab === 'profile' && (
            <>
              <div className="card card-hover">
                <h3 className="section-title mb-4">Thong tin ca nhan</h3>
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border">
                  <div className="w-16 h-16 rounded-2xl bg-brand-dark flex items-center justify-center">
                    <span className="text-text-on-dark font-bold text-xl">DH</span>
                  </div>
                  <div>
                    <p className="text-text-primary font-semibold">Dung Hoang</p>
                    <p className="text-text-muted text-xs">admin@dunghoang.com</p>
                    <button className="btn-ghost text-xs mt-1.5 px-2 py-1">Doi anh dai dien</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-text-secondary text-xs font-medium block mb-1.5">Ho va ten</label><input defaultValue="Dung Hoang" className="input-field text-sm h-10"/></div>
                  <div><label className="text-text-secondary text-xs font-medium block mb-1.5">Email</label><input defaultValue="admin@dunghoang.com" type="email" className="input-field text-sm h-10"/></div>
                  <div><label className="text-text-secondary text-xs font-medium block mb-1.5">So dien thoai</label><input defaultValue="0901234567" type="tel" className="input-field text-sm h-10"/></div>
                  <div><label className="text-text-secondary text-xs font-medium block mb-1.5">Gia tri thuong hieu</label><input defaultValue="dunghoang.com" className="input-field text-sm h-10"/></div>
                  <div className="col-span-2"><label className="text-text-secondary text-xs font-medium block mb-1.5">Bio ngan</label>
                    <textarea defaultValue="Creator, Coach va Affiliate Marketer." rows={3} className="input-field text-sm resize-none"/>
                  </div>
                </div>
              </div>
              <div className="card card-hover">
                <h3 className="section-title mb-1">Ten mien tuy chinh</h3>
                <p className="text-text-muted text-xs mb-4">Ket noi domain rieng cho platform cua ban</p>
                <div className="flex gap-3">
                  <input placeholder="academy.dunghoang.com" className="input-field text-sm h-10 flex-1"/>
                  <button className="btn-primary text-sm py-2 px-4">Ket noi</button>
                </div>
              </div>
            </>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="card card-hover">
              <h3 className="section-title mb-1">Cai dat thong bao</h3>
              <p className="text-text-muted text-xs mb-5">Chon loai thong bao ban muon nhan</p>
              <div className="grid grid-cols-3 gap-3 text-xs text-text-muted mb-4 px-4">
                <span>Loai thong bao</span>
                <span className="text-center">Email</span>
                <span className="text-center">Push</span>
              </div>
              <div className="space-y-1">
                {notifs.map(n => (
                  <div key={n.key} className="grid grid-cols-3 gap-3 items-center px-4 py-3 rounded-xl hover:bg-surface-2 transition-colors">
                    <div>
                      <p className="text-text-primary text-sm font-medium">{n.label}</p>
                      <p className="text-text-muted text-[10px]">{n.desc}</p>
                    </div>
                    <div className="flex justify-center">
                      <Toggle checked={n.email} onChange={() => toggleNotif(n.key, 'email')} />
                    </div>
                    <div className="flex justify-center">
                      <Toggle checked={n.push} onChange={() => toggleNotif(n.key, 'push')} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="card card-hover">
                <h3 className="section-title mb-4">Doi mat khau</h3>
                <div className="space-y-3 max-w-sm">
                  {[
                    { label: 'Mat khau hien tai', ph: 'Nhap mat khau hien tai' },
                    { label: 'Mat khau moi',      ph: 'Toi thieu 8 ky tu' },
                    { label: 'Xac nhan mat khau', ph: 'Nhap lai mat khau moi' },
                  ].map((f, i) => (
                    <div key={f.label}>
                      <label className="text-text-secondary text-xs font-medium block mb-1.5">{f.label}</label>
                      <div className="relative">
                        <input type={showPw ? 'text' : 'password'} placeholder={f.ph} className="input-field text-sm h-10 pr-10"/>
                        {i === 0 && (
                          <button type="button" onClick={() => setShowPw(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                            {showPw ? <EyeOff size={14}/> : <Eye size={14}/>}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button className="btn-primary text-sm py-2.5 mt-1">Cap nhat mat khau</button>
                </div>
              </div>
              <div className="card card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="section-title">Xac thuc 2 yeu to (2FA)</h3>
                    <p className="text-text-muted text-xs mt-0.5">Tang cuong bao mat bang OTP qua email hoac SMS</p>
                  </div>
                  <button className="btn-secondary text-sm py-2 px-4">Kich hoat</button>
                </div>
              </div>
              <div className="card card-hover border-danger/20 bg-danger-light/20">
                <h3 className="section-title text-danger mb-1">Vung nguy hiem</h3>
                <p className="text-text-muted text-xs mb-3">Cac hanh dong nay khong the hoan tac</p>
                <button className="text-danger border border-danger/30 bg-danger-light/30 hover:bg-danger/10 rounded-lg px-4 py-2 text-xs font-medium transition-colors">
                  Xoa tai khoan vinh vien
                </button>
              </div>
            </div>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <div className="card card-hover">
              <h3 className="section-title mb-1">Chi phi hien tai</h3>
              <p className="text-text-muted text-xs mb-5">Tong chi phi hang thang cho tat ca dich vu</p>
              <div className="space-y-3">
                {[
                  { name: 'Supabase Free',  cost: '$0',  note: '500MB database', status: 'active' },
                  { name: 'Vercel Pro',     cost: '$0',  note: 'Mien phi voi Supabase', status: 'active' },
                  { name: 'Resend Free',    cost: '$0',  note: '3,000 email/thang', status: 'active' },
                  { name: 'Domain / SSL',   cost: '~$15',note: 'Gia hang nam', status: 'optional' },
                ].map(s=>(
                  <div key={s.name} className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded-xl">
                    <div>
                      <p className="text-text-primary text-sm font-medium">{s.name}</p>
                      <p className="text-text-muted text-[10px]">{s.note}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`badge text-[10px] ${s.status==='active'?'badge-success':'badge-gray'}`}>
                        {s.status==='active'?'Active':'Ty chon'}
                      </span>
                      <span className="text-text-primary font-mono font-bold text-sm">{s.cost}</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-text-primary font-semibold">Tong cong</span>
                  <span className="text-brand-accent font-bold font-mono text-xl">~$0-25/thang</span>
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="card card-hover">
              <h3 className="section-title mb-1">Tich hop he thong</h3>
              <p className="text-text-muted text-xs mb-5">Ket noi cac dich vu de platform hoat dong day du</p>
              <div className="space-y-3">
                {INTEGRATIONS.map(intg => (
                  <div key={intg.name} className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl hover:border-brand-border/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-dark/8 border border-border flex items-center justify-center">
                        <Globe size={15} className="text-text-muted"/>
                      </div>
                      <div>
                        <p className="text-text-primary text-sm font-semibold">{intg.name}</p>
                        <p className="text-text-muted text-[10px]">{intg.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-gray text-[10px]">{intg.status}</span>
                      <button className="btn-primary text-xs py-1.5 px-3">Ket noi</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
