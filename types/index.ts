// ─── Shared TypeScript Interfaces ────────────────────────────────────────────

// ── User & Auth ──────────────────────────────────────────────────────────────
export type UserRole = 'admin' | 'sale' | 'student'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  avatarUrl?: string
  createdAt: string
}

// ── Course ────────────────────────────────────────────────────────────────────
export type CourseStatus = 'active' | 'draft' | 'archived'
export type CourseCategory = 'Marketing' | 'Content' | 'Copywriting' | 'Sales' | 'Tech' | 'Business'

export interface Course {
  id: number
  title: string
  slug: string
  category: CourseCategory
  price: number
  originalPrice?: number
  students: number
  rating: number
  lessons: number
  revenue: number
  status: CourseStatus
  thumbnailUrl?: string
  createdAt: string
}

// ── Order ─────────────────────────────────────────────────────────────────────
export type OrderStatus = 'completed' | 'pending' | 'refunded' | 'cancelled'
export type PaymentMethod = 'QR' | 'Bank' | 'MoMo' | 'VNPay' | 'Cash'

export interface Order {
  id: string
  customer: string
  email: string
  phone?: string
  courseId: number
  courseTitle: string
  amount: number
  method: PaymentMethod
  status: OrderStatus
  saleId?: string
  note?: string
  createdAt: string
}

// ── CRM Contact ───────────────────────────────────────────────────────────────
export type ContactStage =
  | 'Tổng KH'
  | 'KH Mục tiêu'
  | 'KH Tiềm năng'
  | 'Người mua hàng'
  | 'Khách hàng'
  | 'Hội viên'
  | 'Người ủng hộ'
  | 'Fan hâm mộ'

export type ContactSource = 'Facebook' | 'Organic' | 'Ads' | 'Zalo' | 'Referral' | 'Email' | 'TikTok'

export interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  facebookUrl?: string
  source?: ContactSource
  stage: ContactStage
  interestedCourseId?: number
  assignedSaleId?: string
  note?: string
  leadScore?: number
  lastContact?: string
  createdAt: string
}

// ── Pipeline Deal ─────────────────────────────────────────────────────────────
export type DealStage = 'new' | 'contacted' | 'interested' | 'demo' | 'won' | 'lost'

export interface Deal {
  id: number
  contactId: number
  contactName: string
  courseTitle: string
  value: number
  stage: DealStage
  source: ContactSource
  assignedSaleId?: string
  note?: string
  createdAt: string
  updatedAt: string
}

// ── Affiliate ─────────────────────────────────────────────────────────────────
export type AffiliateStatus = 'active' | 'paused' | 'banned'

export interface Affiliate {
  id: number
  userId: string
  name: string
  email: string
  code: string
  commission: number
  referrals: number
  revenue: number
  pending: number
  paid: number
  status: AffiliateStatus
  joinedAt: string
}

// ── Email Campaign ────────────────────────────────────────────────────────────
export type CampaignStatus = 'sent' | 'draft' | 'scheduled' | 'failed'

export interface EmailCampaign {
  id: number
  title: string
  subject?: string
  sent: number
  openRate: number
  clickRate: number
  status: CampaignStatus
  scheduledAt?: string
  sentAt?: string
  createdAt: string
}

export interface Subscriber {
  id: number
  email: string
  name?: string
  status: 'active' | 'unsubscribed' | 'bounced'
  tags: string[]
  subscribedAt: string
}

// ── Stats / KPI ───────────────────────────────────────────────────────────────
export interface DashboardKPI {
  revenue: number
  orders: number
  newStudents: number
  avgOrderValue: number
  revenueChange: number
  ordersChange: number
  studentsChange: number
}

export interface ChartDataPoint {
  date: string
  revenue: number
  orders: number
}

// ── UI Helpers ────────────────────────────────────────────────────────────────
export type SortDirection = 'asc' | 'desc'
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  align?: 'left' | 'right' | 'center'
  render?: (value: unknown, row: T) => React.ReactNode
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export interface FilterState {
  search: string
  status?: string
  dateFrom?: string
  dateTo?: string
  [key: string]: string | undefined
}
