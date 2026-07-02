'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard, BookOpen, GraduationCap, HelpCircle, FileText, MessageSquare, CheckCircle2,
  ShoppingCart, Users, Tag, Package, Share2, Megaphone, Star, Bell, Mail,
  Target, BarChart3, TrendingUp, UserCheck, UserCircle, Eye,
  LogOut, ChevronDown, ChevronRight, Zap, Activity, Settings, Trophy,
} from 'lucide-react'
import { clsx } from 'clsx'

interface NavItem {
  href: string
  icon: LucideIcon
  label: string
  exact?: boolean
  hasChildren?: boolean
}
interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: 'TỔNG QUAN',
    items: [
      { href: '/admin',            icon: LayoutDashboard, label: 'Admin Panel',         exact: true },
      { href: '/admin/dashboard',  icon: Activity,        label: 'Dashboard của tôi' },
      { href: '/admin/agents',     icon: Target,          label: 'Điều hành AI (E2E)' },
      { href: '/admin/sales-plan', icon: TrendingUp,      label: 'Kế hoạch bán hàng' },
      { href: '/admin/sale-team',  icon: Users,           label: 'Tổng quan đội Sale' },
    ],
  },
  {
    label: 'NỘI DUNG',
    items: [
      { href: '/admin/courses',      icon: BookOpen,       label: 'Quản lý Khoá học' },
      { href: '/admin/portal',       icon: CheckCircle2,   label: 'Duyệt bài học viên' },
      { href: '/admin/certificates', icon: GraduationCap,  label: 'Cấp khoá học' },
      { href: '/admin/quizzes',      icon: HelpCircle,     label: 'Quản lý Quiz' },
      { href: '/admin/blog',         icon: FileText,       label: 'Quản lý Blog' },
      { href: '/admin/faq',          icon: MessageSquare,  label: 'Câu hỏi học viên' },
    ],
  },
  {
    label: 'BÁN HÀNG',
    items: [
      { href: '/admin/orders',    icon: ShoppingCart, label: 'Quản lý Đơn hàng' },
      { href: '/admin/users',     icon: Users,        label: 'Quản lý Users' },
      { href: '/admin/coupons',   icon: Tag,          label: 'Mã giảm giá' },
      { href: '/admin/packages',  icon: Package,      label: 'Quản lý Gói' },
      { href: '/admin/affiliate', icon: Share2,       label: 'Quản lý Affiliate' },
    ],
  },
  {
    label: 'MARKETING',
    items: [
      { href: '/admin/traffic',       icon: TrendingUp, label: 'Lưu lượng truy cập' },
      { href: '/admin/ads',           icon: Megaphone, label: 'Quảng cáo đầu trang' },
      { href: '/admin/featured',      icon: Star,      label: 'Khoá học nổi bật' },
      { href: '/admin/notifications', icon: Bell,      label: 'Thông báo' },
      { href: '/admin/email',         icon: Mail,      label: 'Email Marketing' },
      { href: '/admin/pixel',         icon: Target,    label: 'Pixel & CAPI', hasChildren: true },
    ],
  },
  {
    label: 'CRM & CHĂM SÓC',
    items: [
      { href: '/admin/crm/overview',   icon: BarChart3,  label: 'CRM Doanh số' },
      { href: '/admin/crm/contacts',   icon: UserCircle, label: 'Khách hàng' },
      { href: '/admin/crm/pipeline',   icon: TrendingUp, label: 'Pipeline' },
      { href: '/admin/crm/performance',icon: Activity,   label: 'Hiệu suất Sale' },
      { href: '/admin/crm/sources',    icon: Zap,        label: 'Nguồn khách' },
      { href: '/admin/crm/interested', icon: Eye,        label: 'Khách quan tâm' },
      { href: '/admin/crm/review',     icon: UserCheck,  label: 'Kiểm duyệt' },
      { href: '/admin/crm/assign',     icon: Users,      label: 'Phân công' },
    ],
  },
  {
    label: 'KẾT NỐI',
    items: [
      { href: '/admin/zalo', icon: MessageSquare, label: 'Zalo OA' },
    ],
  },
  {
    label: 'HỆ THỐNG',
    items: [
      { href: '/admin/settings', icon: Settings, label: 'Cài đặt' },
    ],
  },
]

export default function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href) && href !== '/admin'
  }

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 h-screen bg-sidebar-bg border-r border-sidebar-border flex flex-col z-50 transition-all duration-300 shadow-sidebar",
        collapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"
      )}
      style={{ width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)' }}
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center flex-shrink-0 shadow-btn">
          <span className="text-white font-bold text-sm font-mono">DH</span>
        </div>
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="text-text-on-dark font-bold text-sm truncate">Dung Hoang</p>
              <p className="text-text-on-dark-2 text-[10px] truncate">Academy</p>
            </div>
            <button className="ml-auto text-text-on-dark-2 hover:text-text-on-dark transition-colors">
              <ChevronRight size={14} />
            </button>
          </>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-text-on-dark-2/60 text-[9px] font-bold uppercase tracking-[0.12em] px-3 mb-1.5">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href, item.exact)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={clsx(
                        'sidebar-item',
                        active && 'sidebar-item-active',
                        collapsed && 'justify-center px-2',
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        size={15}
                        className={clsx(
                          'flex-shrink-0 transition-colors',
                          active ? 'text-brand-accent' : 'text-text-on-dark-2',
                        )}
                      />
                      {!collapsed && (
                        <span className="truncate flex-1 text-[13px]">{item.label}</span>
                      )}
                      {!collapsed && item.hasChildren && (
                        <ChevronDown size={11} className="text-text-on-dark-2/50 flex-shrink-0" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── User Profile ── */}
      <div className="border-t border-white/10 p-3 space-y-2">
        {/* Level bar */}
        {!collapsed && (
          <div className="px-2 pb-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-text-on-dark-2 text-[10px]">Level 3</span>
              <span className="badge bg-brand-accent/80 text-white text-[9px] px-1.5 py-0.5">Admin</span>
            </div>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[65%] rounded-full bg-brand-accent/70" />
            </div>
          </div>
        )}

        {/* Links */}
        {!collapsed && (
          <div className="flex items-center gap-2 px-2 text-text-on-dark-2/60 text-[10px]">
            <button className="hover:text-text-on-dark transition-colors">Bảo mật</button>
            <span>·</span>
            <button className="hover:text-text-on-dark transition-colors">Điều khoản</button>
          </div>
        )}

        {/* Avatar row */}
        <div className={clsx(
          'flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-sidebar-hover cursor-pointer transition-colors',
          collapsed && 'justify-center',
        )}>
          <div className="w-7 h-7 rounded-full bg-brand-accent flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">DH</span>
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="text-text-on-dark text-xs font-medium truncate">Dung Hoang</p>
                <p className="text-text-on-dark-2 text-[10px] truncate">admin@dunghoang.com</p>
              </div>
              <button className="text-text-on-dark-2 hover:text-brand-accent transition-colors ml-auto">
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
