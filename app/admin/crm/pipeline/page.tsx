'use client'

import Link from 'next/link'
import { Plus, MoreHorizontal, DollarSign, Calendar, Grip, UserCircle } from 'lucide-react'
import { DEALS, DEAL_STAGE_CONFIG, SOURCE_CONFIG } from '@/lib/constants'
import type { DealStage } from '@/types'

const STAGES: DealStage[] = ['new', 'contacted', 'interested', 'demo', 'won']

export default function PipelinePage() {
  const byStage = (stage: DealStage) => DEALS.filter(d => d.stage === stage)
  const stageTotal = (stage: DealStage) => byStage(stage).reduce((s, d) => s + d.value, 0)
  const grandTotal = DEALS.reduce((s, d) => s + d.value, 0)

  return (
    <div className="page-wrapper h-full">
      {/* Header */}
      <div className="page-header flex-shrink-0">
        <div>
          <h1 className="page-title">Pipeline</h1>
          <p className="page-subtitle">
            {DEALS.length} deals · Tổng: {(grandTotal/1_000_000).toFixed(0)}M₫
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-2 shadow-card">
            {[
              { label: 'Tổng deals',  value: String(DEALS.length), color: 'text-text-primary' },
              { label: 'Win rate',    value: `${Math.round((byStage('won').length/DEALS.length)*100)}%`, color: 'text-success' },
              { label: 'Avg deal',    value: `${(grandTotal/DEALS.length/1_000_000).toFixed(1)}M₫`,   color: 'text-brand-accent' },
            ].map((s, i) => (
              <div key={s.label} className={`text-center px-3 ${i < 2 ? 'border-r border-border' : ''}`}>
                <p className={`font-bold font-mono text-sm ${s.color}`}>{s.value}</p>
                <p className="text-text-muted text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
          <button className="btn-primary text-xs py-2"><Plus size={13} />Thêm deal</button>
        </div>
      </div>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const cfg   = DEAL_STAGE_CONFIG[stage]
          const deals = byStage(stage)
          const total = stageTotal(stage)
          return (
            <div key={stage} className="flex-shrink-0 w-64 flex flex-col gap-3">
              {/* Column header */}
              <div className={`bg-surface border-t-2 rounded-xl p-3 shadow-card ${cfg.border}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold text-sm ${cfg.color}`}>{cfg.label}</h3>
                  <div className="flex items-center gap-1">
                    <span className="badge badge-gray text-[10px]">{deals.length}</span>
                    <button className="btn-ghost p-1 ml-1"><Plus size={11} /></button>
                  </div>
                </div>
                <p className="text-text-muted text-xs font-mono">{(total/1_000_000).toFixed(1)}M₫</p>
              </div>

              {/* Cards */}
              <div className="space-y-2 max-h-[calc(100vh-260px)] overflow-y-auto pr-0.5">
                {deals.map((deal) => {
                  const srcCfg = SOURCE_CONFIG[deal.source]
                  return (
                    <div key={deal.id} className="card card-hover group cursor-grab active:cursor-grabbing p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Grip size={10} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          {/* Cross-link → Contact */}
                          <Link
                            href={`/admin/crm/contacts?search=${encodeURIComponent(deal.contactName)}`}
                            className="text-text-primary text-xs font-medium truncate hover:text-brand-accent transition-colors flex items-center gap-1"
                          >
                            {deal.contactName}
                          </Link>
                        </div>
                        <button className="btn-ghost p-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <MoreHorizontal size={12} />
                        </button>
                      </div>

                      <p className="text-text-muted text-[10px] truncate pl-4 line-clamp-1">{deal.courseTitle.split('—')[0].trim()}</p>

                      <div className="flex items-center justify-between pl-4">
                        <span className={`badge text-[9px] ${srcCfg?.badge ?? 'badge-gray'}`}>{deal.source}</span>
                        <span className="text-brand-accent text-[10px] font-mono font-semibold flex items-center gap-0.5">
                          <DollarSign size={9} />{(deal.value/1_000_000).toFixed(1)}M
                        </span>
                      </div>

                      <div className="flex items-center gap-1 pl-4 text-[9px] text-text-muted">
                        <Calendar size={8} />
                        <span>{deal.updatedAt}</span>
                        <Link href={`/admin/crm/contacts`} className="ml-auto flex items-center gap-0.5 hover:text-brand-accent transition-colors">
                          <UserCircle size={8} />Hồ sơ
                        </Link>
                      </div>
                    </div>
                  )
                })}

                {deals.length === 0 && (
                  <div className="text-center py-6 text-text-muted text-xs border border-dashed border-border rounded-xl">
                    Chưa có deal
                  </div>
                )}

                <button className="w-full p-2 rounded-lg border border-dashed border-border hover:border-brand-border/40 hover:bg-surface-2 transition-all text-text-muted text-xs flex items-center justify-center gap-1">
                  <Plus size={11} />Thêm deal
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
