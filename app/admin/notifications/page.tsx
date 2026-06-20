'use client'

import { useState } from 'react'
import {
  Bell, ShoppingCart, Users, Mail, TrendingUp,
  CheckCheck, Filter, Plus, Settings, Send,
  ChevronDown, Megaphone, Zap
} from 'lucide-react'

type NType = 'all' | 'order' | 'student' | 'email' | 'sale'
type NTab  = 'inbox' | 'send' | 'settings'

const NOTIFS = [
  { id:1,  type:'order'   as const, title:'Don hang moi',           body:'Nguyen Van An mua Affiliate Marketing 2026 — 1.99M', time:'2 phut',  read:false, href:'/admin/orders' },
  { id:2,  type:'student' as const, title:'Hoc vien moi',           body:'Tran Thi Binh dang ky Content System 10X',           time:'15 phut', read:false, href:'/admin/users' },
  { id:3,  type:'email'   as const, title:'Campaign da gui',        body:'Campaign "Update VEO3.1" gui thanh cong — 400 emails',time:'1 gio',  read:false, href:'/admin/email' },
  { id:4,  type:'sale'    as const, title:'Deal cap nhat',          body:'Le Minh Cuong -> giai doan Quan tam',                 time:'2 gio',  read:true,  href:'/admin/crm/pipeline' },
  { id:5,  type:'order'   as const, title:'Yeu cau hoan tien',      body:'Hoang Van Em hoan tien don DH240105 — 1.99M',        time:'3 gio',  read:true,  href:'/admin/orders' },
  { id:6,  type:'student' as const, title:'5 hoc vien hoan thanh',  body:'5 hoc vien hoan thanh khoa Affiliate Marketing',     time:'hom qua', read:true,  href:'/admin/users' },
  { id:7,  type:'sale'    as const, title:'Deal moi tao',           body:'Vu Thi Phuong tao deal moi — Content System 1.49M',  time:'hom qua', read:true,  href:'/admin/crm/pipeline' },
  { id:8,  type:'email'   as const, title:'Subscriber moi',         body:'12 nguoi dang ky moi trong 24 gio qua',               time:'hom qua', read:true,  href:'/admin/email' },
]

const TYPE_CFG = {
  order:   { icon: ShoppingCart, color: 'text-brand-accent', bg: 'bg-brand-accent/10', label: 'Don hang' },
  student: { icon: Users,        color: 'text-brand-border', bg: 'bg-brand-border/10', label: 'Hoc vien' },
  email:   { icon: Mail,         color: 'text-brand-olive',  bg: 'bg-brand-olive/10',  label: 'Email' },
  sale:    { icon: TrendingUp,   color: 'text-success',      bg: 'bg-success-light',   label: 'Sale' },
}

const SEND_TEMPLATES = [
  { id:1, title:'Thong bao khuyen mai',     type:'Broadcast',   audience:'Tat ca hoc vien', sent:605,  sent_at:'28/05/2026' },
  { id:2, title:'Khoa hoc moi ra mat',      type:'Broadcast',   audience:'Hoc vien active', sent:420,  sent_at:'20/05/2026' },
  { id:3, title:'Nhac nho hoan thanh bai',  type:'Automation',  audience:'Hoc vien chua hoan thanh', sent:188, sent_at:'15/05/2026' },
  { id:4, title:'Chuc mung sinh nhat',       type:'Automation',  audience:'KH co sinh nhat hom nay', sent:12, sent_at:'01/05/2026' },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab]     = useState<NTab>('inbox')
  const [typeFilter, setTypeFilter]   = useState<NType>('all')
  const [notifs, setNotifs]           = useState(NOTIFS)
  const [showCompose, setShowCompose] = useState(false)

  const filtered = notifs.filter(n => typeFilter === 'all' || n.type === typeFilter)
  const unread   = notifs.filter(n => !n.read).length
  const markAll  = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Thong bao</h1>
          <p className="page-subtitle">{unread} chua doc · {notifs.length} tong</p>
        </div>
        <div className="flex items-center gap-2">
          {unread > 0 && (
            <button onClick={markAll} className="btn-secondary text-xs py-1.5">
              <CheckCheck size={12} />Doc tat ca
            </button>
          )}
          <button onClick={() => setShowCompose(v => !v)} className="btn-primary text-xs py-1.5">
            <Send size={12} />Gui thong bao
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {([
          { key:'inbox', label:'Hop thu den', icon:Bell },
          { key:'send',  label:'Da gui',      icon:Send },
          { key:'settings', label:'Cai dat',  icon:Settings },
        ] as const).map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 -mb-px transition-all ${
                activeTab === t.key ? 'border-brand-dark text-brand-dark' : 'border-transparent text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon size={12} />{t.label}
              {t.key === 'inbox' && unread > 0 && (
                <span className="badge bg-brand-accent text-white text-[9px] ml-0.5">{unread}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* INBOX TAB */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-3 gap-4">
          {/* Notification list - 2/3 */}
          <div className="col-span-2 space-y-3">
            {/* Type filter */}
            <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1 w-fit shadow-card">
              {(['all','order','student','email','sale'] as NType[]).map(f => (
                <button
                  key={f}
                  onClick={() => setTypeFilter(f)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    typeFilter === f ? 'bg-brand-dark text-text-on-dark' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {f === 'all' ? 'Tat ca' : TYPE_CFG[f].label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="card divide-y divide-border/50 p-0 overflow-hidden">
              {filtered.map(n => {
                const cfg = TYPE_CFG[n.type]
                const Icon = cfg.icon
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-4 cursor-pointer transition-colors group ${
                      n.read ? 'hover:bg-surface-2' : 'bg-brand-dark/2 hover:bg-brand-dark/4'
                    }`}
                    onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                      <Icon size={15} className={cfg.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium ${n.read ? 'text-text-secondary' : 'text-text-primary'}`}>
                          {n.title}
                        </p>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0" />}
                      </div>
                      <p className="text-text-muted text-xs mt-0.5 line-clamp-1">{n.body}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-text-muted text-[10px]">{n.time}</p>
                      <span className={`badge text-[9px] mt-1 ${cfg.bg} ${cfg.color} border-0`}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Summary + Quick send - 1/3 */}
          <div className="space-y-3">
            {/* Stats */}
            <div className="card card-hover p-4">
              <h3 className="section-title text-sm mb-3">Tong quan</h3>
              <div className="space-y-2.5">
                {Object.entries(TYPE_CFG).map(([key, cfg]) => {
                  const count = notifs.filter(n => n.type === key).length
                  const unreadCount = notifs.filter(n => n.type === key && !n.read).length
                  const Icon = cfg.icon
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${cfg.bg}`}>
                          <Icon size={11} className={cfg.color} />
                        </div>
                        <span className="text-text-secondary text-xs">{cfg.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-text-primary font-mono text-xs font-semibold">{count}</span>
                        {unreadCount > 0 && (
                          <span className="badge bg-brand-accent text-white text-[9px]">{unreadCount}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick compose form */}
            {showCompose && (
              <div className="card border-brand-border/20 animate-slide-up">
                <h3 className="section-title text-sm mb-3">Gui nhanh</h3>
                <div className="space-y-2">
                  <input placeholder="Tieu de thong bao..." className="input-field text-xs" />
                  <textarea placeholder="Noi dung..." rows={3} className="input-field text-xs resize-none" />
                  <div className="relative">
                    <select className="input-field text-xs appearance-none pr-7">
                      <option>Tat ca hoc vien (605)</option>
                      <option>Hoc vien active</option>
                      <option>CRM contacts</option>
                    </select>
                    <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  </div>
                  <button className="btn-primary w-full justify-center text-xs py-2">
                    <Send size={12} />Gui ngay
                  </button>
                </div>
              </div>
            )}

            {/* Push channel info */}
            <div className="card card-hover p-4 bg-brand-dark/2 border-brand-border/15">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={13} className="text-brand-olive" />
                <h3 className="section-title text-sm">Kenh thong bao</h3>
              </div>
              <div className="space-y-1.5 text-xs text-text-muted">
                <div className="flex justify-between"><span>In-app</span><span className="text-success font-medium">Active</span></div>
                <div className="flex justify-between"><span>Email</span><span className="text-success font-medium">Active</span></div>
                <div className="flex justify-between"><span>Push browser</span><span className="text-text-muted italic">Chua kich hoat</span></div>
                <div className="flex justify-between"><span>Zalo OA</span><span className="text-text-muted italic">Chua ket noi</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SENT TAB */}
      {activeTab === 'send' && (
        <div className="card card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Lich su thong bao da gui</h3>
            <button className="btn-primary text-xs py-1.5"><Plus size={12} />Tao moi</button>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Tieu de</th>
                <th className="table-header">Loai</th>
                <th className="table-header">Doi tuong</th>
                <th className="table-header text-right">Da gui</th>
                <th className="table-header">Ngay gui</th>
              </tr>
            </thead>
            <tbody>
              {SEND_TEMPLATES.map(t => (
                <tr key={t.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <Megaphone size={13} className="text-text-muted" />
                      <span className="text-text-primary text-xs font-medium">{t.title}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge text-[10px] ${t.type === 'Broadcast' ? 'bg-info-light text-info border border-info/20' : 'badge-success'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="table-cell text-text-secondary text-xs">{t.audience}</td>
                  <td className="table-cell text-right font-mono font-semibold text-text-primary">{t.sent.toLocaleString()}</td>
                  <td className="table-cell text-text-muted text-xs">{t.sent_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="max-w-xl space-y-4">
          <div className="card card-hover">
            <h3 className="section-title mb-3">Cai dat thong bao he thong</h3>
            <div className="space-y-3">
              {[
                { label: 'Don hang moi',          desc: 'Khi co thanh toan thanh cong',        on: true  },
                { label: 'Hoc vien dang ky moi',  desc: 'Khi co account moi duoc tao',         on: true  },
                { label: 'Deal duoc cap nhat',     desc: 'Khi sale thay doi stage trong CRM',   on: true  },
                { label: 'Campaign email hoan tat',desc: 'Sau khi gui email campaign xong',     on: false },
                { label: 'Yeu cau hoan tien',      desc: 'Khi co refund request',               on: true  },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-surface-2 border border-border rounded-xl">
                  <div>
                    <p className="text-text-primary text-sm font-medium">{s.label}</p>
                    <p className="text-text-muted text-[10px]">{s.desc}</p>
                  </div>
                  <div className={`relative w-9 h-5 rounded-full cursor-pointer transition-colors ${s.on ? 'bg-brand-dark' : 'bg-border'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${s.on ? 'translate-x-4 left-0.5' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
