'use client'

import { useState } from 'react'
import {
  TrendingUp, TrendingDown, DollarSign, Users, Target, Zap,
  RefreshCw, ExternalLink, AlertCircle, CheckCircle, BarChart2,
  MousePointer, ShoppingCart, ArrowRight,
} from 'lucide-react'

// ─── Hằng số giá sản phẩm ────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 'mini',   label: 'Khóa mini',       price: 368_000,     crMin: 0.04, crMax: 0.07 },
  { id: 'khoa1',  label: 'Khóa 1 (686k)',    price: 686_868,     crMin: 0.015, crMax: 0.03 },
  { id: 'khoa2',  label: 'Khóa 2 (2.77M)',   price: 2_768_686,   crMin: 0.005, crMax: 0.015 },
  { id: '1kem1',  label: '1-kèm-1 (6.87M)', price: 6_868_686,   crMin: 0,    crMax: 0.005 },
  { id: 'clb',    label: 'CLB 299k/th',      price: 299_000,     crMin: 0.003, crMax: 0.01 },
]

function calcScenario(budget: number, cpl: number) {
  if (!budget || !cpl) return null
  const leads = Math.floor(budget / cpl)
  let revenue = 0
  const rows = PRODUCTS.map(p => {
    const avgCr  = (p.crMin + p.crMax) / 2
    const orders = Math.round(leads * avgCr)
    const rev    = orders * p.price
    revenue += rev
    return { ...p, orders, rev }
  })
  const profit = revenue - budget - 1_000_000
  return { leads, revenue, profit, rows }
}

function fmtM(n: number) { return `${(n / 1_000_000).toFixed(1)}M₫` }
function fmtK(n: number) { return `${Math.round(n / 1000)}k` }

export default function AdsDashboardPage() {
  const [budget,  setBudget]  = useState(10_000_000)
  const [cplBad,  setCplBad]  = useState(35_000)
  const [cplMid,  setCplMid]  = useState(25_000)
  const [cplGood, setCplGood] = useState(18_000)
  const [metaConnected] = useState(false)

  const bad  = calcScenario(budget, cplBad)
  const mid  = calcScenario(budget, cplMid)
  const good = calcScenario(budget, cplGood)

  const scenarios = [
    { label: 'Thận trọng', data: bad,  color: 'text-amber-600', bg: 'bg-amber-50',  border: 'border-amber-200', cpl: cplBad },
    { label: 'Cơ bản',     data: mid,  color: 'text-blue-600',  bg: 'bg-blue-50',   border: 'border-blue-200',  cpl: cplMid },
    { label: 'Tốt',        data: good, color: 'text-success',   bg: 'bg-green-50',  border: 'border-green-200', cpl: cplGood },
  ]

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Đo Lường Quảng Cáo</h1>
          <p className="page-subtitle">Mô hình tài chính + kết nối Meta Ads để đo lường tự động</p>
        </div>
        <div className="flex items-center gap-2">
          {metaConnected
            ? <span className="flex items-center gap-1.5 text-xs text-success font-medium px-3 py-1.5 bg-success/10 rounded-lg"><CheckCircle size={12} />Meta Ads đã kết nối</span>
            : <button className="btn-primary text-xs py-2 flex items-center gap-1.5"><Zap size={13} />Kết nối Meta Ads</button>
          }
          <button className="btn-ghost text-xs py-2 flex items-center gap-1.5"><RefreshCw size={12} />Làm mới</button>
        </div>
      </div>

      {/* Meta Ads connection banner */}
      {!metaConnected && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-800 mb-1">Chưa kết nối Meta Ads</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Kết nối tài khoản quảng cáo để tự động lấy CPL thực tế, số lead, chi phí — không cần nhập tay.
              Hiện tại đang dùng số thủ công để lập kế hoạch.
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-blue-700 font-medium hover:underline whitespace-nowrap">
            Kết nối ngay <ExternalLink size={11} />
          </button>
        </div>
      )}

      {/* Inputs */}
      <div className="card card-hover">
        <h3 className="section-title mb-4">Thông số đầu vào</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-text-muted mb-1.5">Ngân sách ads/tháng</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">₫</span>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="input-field pl-6 text-xs w-full"
              />
            </div>
            <p className="text-[10px] text-text-muted mt-1">~{fmtK(budget / 30)}/ngày</p>
          </div>
          <div>
            <label className="block text-xs text-amber-600 mb-1.5">CPL — Thận trọng</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">₫</span>
              <input type="number" value={cplBad} onChange={e => setCplBad(Number(e.target.value))} className="input-field pl-6 text-xs w-full border-amber-200" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-blue-600 mb-1.5">CPL — Cơ bản</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">₫</span>
              <input type="number" value={cplMid} onChange={e => setCplMid(Number(e.target.value))} className="input-field pl-6 text-xs w-full border-blue-200" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-success mb-1.5">CPL — Tốt</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">₫</span>
              <input type="number" value={cplGood} onChange={e => setCplGood(Number(e.target.value))} className="input-field pl-6 text-xs w-full border-green-200" />
            </div>
          </div>
        </div>
      </div>

      {/* 3 scenario summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map(s => (
          <div key={s.label} className={`rounded-xl border p-5 ${s.bg} ${s.border}`}>
            <p className={`text-xs font-bold uppercase tracking-wide ${s.color} mb-3`}>{s.label}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted text-xs">CPL</span>
                <span className={`font-mono font-semibold ${s.color}`}>{fmtK(s.cpl)}₫</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted text-xs">Leads</span>
                <span className="font-mono font-bold text-text-primary">{s.data?.leads?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted text-xs">Doanh thu gộp</span>
                <span className="font-mono font-bold text-text-primary">{s.data ? fmtM(s.data.revenue) : '—'}</span>
              </div>
              <div className={`border-t pt-2 flex justify-between ${s.border}`}>
                <span className="text-xs font-semibold text-text-primary">Còn lại (trước thuế)</span>
                <span className={`font-mono font-bold text-lg ${s.data && s.data.profit > 0 ? 'text-success' : 'text-red-500'}`}>
                  {s.data ? fmtM(s.data.profit) : '—'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion funnel table */}
      <div className="card card-hover overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Phễu chuyển đổi chi tiết</h3>
          <p className="text-xs text-text-muted">Ngân sách: {fmtM(budget)}/tháng</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="table-header text-left">Sản phẩm</th>
              <th className="table-header text-right">Giá</th>
              <th className="table-header text-right">CR%</th>
              <th className="table-header text-right text-amber-600">Thận trọng</th>
              <th className="table-header text-right text-blue-600">Cơ bản</th>
              <th className="table-header text-right text-success">Tốt</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p, i) => {
              const bRow = bad?.rows[i]
              const mRow = mid?.rows[i]
              const gRow = good?.rows[i]
              const avgCr = ((p.crMin + p.crMax) / 2 * 100).toFixed(1)
              return (
                <tr key={p.id} className="table-row">
                  <td className="table-cell font-medium">{p.label}</td>
                  <td className="table-cell text-right font-mono text-xs text-text-muted">{fmtK(p.price)}₫</td>
                  <td className="table-cell text-right text-xs text-text-muted">{avgCr}%</td>
                  <td className="table-cell text-right">
                    <div className="text-[11px] text-amber-700 font-mono">{bRow?.orders ?? 0} đơn</div>
                    <div className="text-[10px] text-text-muted">{bRow ? fmtM(bRow.rev) : '—'}</div>
                  </td>
                  <td className="table-cell text-right">
                    <div className="text-[11px] text-blue-700 font-mono">{mRow?.orders ?? 0} đơn</div>
                    <div className="text-[10px] text-text-muted">{mRow ? fmtM(mRow.rev) : '—'}</div>
                  </td>
                  <td className="table-cell text-right">
                    <div className="text-[11px] text-success font-mono">{gRow?.orders ?? 0} đơn</div>
                    <div className="text-[10px] text-text-muted">{gRow ? fmtM(gRow.rev) : '—'}</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border bg-surface-2">
              <td className="table-cell font-bold" colSpan={2}>Tổng doanh thu</td>
              <td className="table-cell"></td>
              <td className="table-cell text-right font-mono font-bold text-amber-700">{bad ? fmtM(bad.revenue) : '—'}</td>
              <td className="table-cell text-right font-mono font-bold text-blue-700">{mid ? fmtM(mid.revenue) : '—'}</td>
              <td className="table-cell text-right font-mono font-bold text-success">{good ? fmtM(good.revenue) : '—'}</td>
            </tr>
            <tr className="bg-surface-2">
              <td className="table-cell text-text-muted text-xs" colSpan={2}>Trừ ads</td>
              <td className="table-cell"></td>
              <td className="table-cell text-right font-mono text-xs text-red-500">−{fmtM(budget)}</td>
              <td className="table-cell text-right font-mono text-xs text-red-500">−{fmtM(budget)}</td>
              <td className="table-cell text-right font-mono text-xs text-red-500">−{fmtM(budget)}</td>
            </tr>
            <tr className="bg-surface-2">
              <td className="table-cell text-text-muted text-xs" colSpan={2}>Trừ chi phí cố định (~1–2.5tr)</td>
              <td className="table-cell"></td>
              <td className="table-cell text-right font-mono text-xs text-red-500">−1M₫</td>
              <td className="table-cell text-right font-mono text-xs text-red-500">−1.5M₫</td>
              <td className="table-cell text-right font-mono text-xs text-red-500">−2.5M₫</td>
            </tr>
            <tr className="bg-brand-dark/5 font-bold">
              <td className="table-cell text-brand-dark" colSpan={2}>Còn lại (trước thuế & hoa hồng)</td>
              <td className="table-cell"></td>
              <td className="table-cell text-right font-mono text-amber-700 text-base">{bad ? fmtM(bad.profit) : '—'}</td>
              <td className="table-cell text-right font-mono text-blue-700 text-base">{mid ? fmtM(mid.profit) : '—'}</td>
              <td className="table-cell text-right font-mono text-success text-base">{good ? fmtM(good.profit) : '—'}</td>
            </tr>
          </tfoot>
        </table>
        <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
          * Nhớ trừ tiếp: khi vượt 500tr/năm trừ ~7% thuế. Đơn từ affiliate trừ thêm 10% hoa hồng. Số thực tế sẽ thấp hơn ~10–20%. Bảng này để hình dung — phải chạy thật 1 tháng mới có số chính xác.
        </p>
      </div>

      {/* Key insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: ShoppingCart,
            color: 'text-brand-accent',
            bg: 'bg-brand-accent/10',
            title: 'Khóa mini gỡ tiền ads',
            body: `Ở mức thận trọng: ${bad?.rows[0].orders ?? 0} đơn × 368k = ${bad ? fmtM(bad.rows[0].rev) : '—'} — đã gỡ hơn nửa chi phí quảng cáo.`,
          },
          {
            icon: Target,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            title: 'CAC (chi phí mỗi khách chính)',
            body: `Cơ bản: ${fmtM(budget)} ÷ ${mid?.rows[1].orders ?? 0} đơn Khóa 1 ≈ ${mid && mid.rows[1].orders ? fmtM(budget / mid.rows[1].orders) : '—'}/khách — rẻ so với giá khóa 686k.`,
          },
          {
            icon: TrendingUp,
            color: 'text-success',
            bg: 'bg-success-light',
            title: 'Ngay cả thận trọng vẫn dương',
            body: `${bad ? fmtM(bad.profit) : '—'} còn lại ở mức xấu nhất. Đây là sàn — không phải mơ.`,
          },
        ].map(c => {
          const Icon = c.icon
          return (
            <div key={c.title} className="card card-hover flex gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${c.bg}`}>
                <Icon size={16} className={c.color} />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary mb-1">{c.title}</p>
                <p className="text-[11px] text-text-muted leading-relaxed">{c.body}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Meta Ads real data — placeholder */}
      <div className="card border-dashed border-2 border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-title">Số liệu thực từ Meta Ads</h3>
          <span className="text-[10px] bg-surface-2 border border-border text-text-muted px-2 py-1 rounded-full">Chờ kết nối</span>
        </div>
        <div className="grid grid-cols-5 gap-3 opacity-40 pointer-events-none">
          {[
            { label: 'Chi tiêu thực tế', value: '—', icon: DollarSign },
            { label: 'Impressions',      value: '—', icon: BarChart2 },
            { label: 'Clicks',           value: '—', icon: MousePointer },
            { label: 'Leads thực',       value: '—', icon: Users },
            { label: 'CPL thực',         value: '—', icon: Target },
          ].map(m => {
            const Icon = m.icon
            return (
              <div key={m.label} className="bg-surface-2 rounded-xl p-3 text-center">
                <Icon size={16} className="text-text-muted mx-auto mb-1.5" />
                <p className="font-mono font-bold text-text-primary text-lg">{m.value}</p>
                <p className="text-[10px] text-text-muted mt-0.5">{m.label}</p>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-text-muted mt-3 text-center">
          Kết nối Meta Ads để tự động kéo số liệu thực về đây — so sánh với dự báo ngay trên trang này.
        </p>
      </div>
    </div>
  )
}
