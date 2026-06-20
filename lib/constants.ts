import type {
  Course, Order, Contact, Deal, Affiliate, EmailCampaign,
  CourseCategory, ContactStage, ContactSource, DealStage, PaymentMethod
} from '@/types'

// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  name:    'DungHoang.com',
  tagline: 'Nền tảng All-In-One cho người bán khoá học',
  email:   'admin@dunghoang.com',
  domain:  'dunghoang.com',
}

// ─── Courses ──────────────────────────────────────────────────────────────────
export const COURSES: Course[] = [
  {
    id: 1, title: 'Affiliate Marketing 2026 — Từ Zero đến 100 triệu/tháng',
    slug: 'affiliate-marketing-2026', category: 'Marketing',
    price: 1990000, students: 215, rating: 4.8, lessons: 48,
    revenue: 428850000, status: 'active', createdAt: '2026-01-15',
  },
  {
    id: 2, title: 'Content System 10X — Sản xuất nội dung viral hàng ngày',
    slug: 'content-system-10x', category: 'Content',
    price: 1490000, students: 187, rating: 4.9, lessons: 36,
    revenue: 278630000, status: 'active', createdAt: '2026-02-01',
  },
  {
    id: 3, title: 'Email Marketing Pro — Tự động hoá bán hàng',
    slug: 'email-marketing-pro', category: 'Marketing',
    price: 990000, students: 124, rating: 4.7, lessons: 28,
    revenue: 122760000, status: 'active', createdAt: '2026-02-20',
  },
  {
    id: 4, title: 'VSL Script Master — Viết kịch bản video bán hàng triệu đô',
    slug: 'vsl-script-master', category: 'Copywriting',
    price: 2490000, students: 56, rating: 4.6, lessons: 42,
    revenue: 139440000, status: 'active', createdAt: '2026-03-10',
  },
  {
    id: 5, title: 'Funnel Builder Pro — Xây dựng phễu chuyển đổi cao',
    slug: 'funnel-builder-pro', category: 'Sales',
    price: 1790000, students: 23, rating: 4.5, lessons: 32,
    revenue: 41170000, status: 'draft', createdAt: '2026-04-01',
  },
]

// ─── Orders ───────────────────────────────────────────────────────────────────
export const ORDERS: Order[] = [
  { id: 'DH240101', customer: 'Nguyễn Văn An',   email: 'nva@gmail.com',  courseId: 1, courseTitle: COURSES[0].title, amount: 1990000, method: 'QR',   status: 'completed', createdAt: '2026-05-31 14:23' },
  { id: 'DH240102', customer: 'Trần Thị Bình',   email: 'ttb@gmail.com',  courseId: 2, courseTitle: COURSES[1].title, amount: 1490000, method: 'Bank', status: 'completed', createdAt: '2026-05-31 13:45' },
  { id: 'DH240103', customer: 'Lê Minh Cường',   email: 'lmc@gmail.com',  courseId: 3, courseTitle: COURSES[2].title, amount: 990000,  method: 'QR',   status: 'pending',   createdAt: '2026-05-31 12:10' },
  { id: 'DH240104', customer: 'Phạm Thu Dung',   email: 'ptd@gmail.com',  courseId: 4, courseTitle: COURSES[3].title, amount: 2490000, method: 'Bank', status: 'completed', createdAt: '2026-05-30 18:30' },
  { id: 'DH240105', customer: 'Hoàng Văn Em',    email: 'hve@gmail.com',  courseId: 1, courseTitle: COURSES[0].title, amount: 1990000, method: 'QR',   status: 'refunded',  createdAt: '2026-05-30 15:20' },
  { id: 'DH240106', customer: 'Vũ Thị Phượng',  email: 'vtp@gmail.com',  courseId: 2, courseTitle: COURSES[1].title, amount: 1490000, method: 'MoMo', status: 'completed', createdAt: '2026-05-30 11:05' },
  { id: 'DH240107', customer: 'Đặng Quốc Giang', email: 'dqg@gmail.com', courseId: 4, courseTitle: COURSES[3].title, amount: 2490000, method: 'Bank', status: 'completed', createdAt: '2026-05-29 20:15' },
  { id: 'DH240108', customer: 'Bùi Thị Hoa',    email: 'bth@gmail.com',  courseId: 3, courseTitle: COURSES[2].title, amount: 990000,  method: 'QR',   status: 'pending',   createdAt: '2026-05-29 09:30' },
]

// ─── Contacts ────────────────────────────────────────────────────────────────
export const CONTACTS: Contact[] = [
  { id: 1,  name: 'Nguyễn Văn An',    email: 'nva@gmail.com',   phone: '0901234567', source: 'Facebook', stage: 'Người mua hàng', interestedCourseId: 1, createdAt: '2026-05-01' },
  { id: 2,  name: 'Trần Thị Bình',    email: 'ttb@gmail.com',   phone: '0912345678', source: 'Organic',  stage: 'KH Tiềm năng',  interestedCourseId: 2, createdAt: '2026-05-03' },
  { id: 3,  name: 'Lê Minh Cường',    email: 'lmc@gmail.com',   phone: '0923456789', source: 'Ads',      stage: 'Khách hàng',    interestedCourseId: 3, createdAt: '2026-05-07' },
  { id: 4,  name: 'Phạm Thu Dung',    email: 'ptd@gmail.com',   phone: '0934567890', source: 'Referral', stage: 'Hội viên',      interestedCourseId: 4, createdAt: '2026-05-10' },
  { id: 5,  name: 'Hoàng Văn Em',     email: 'hve@gmail.com',   phone: '0945678901', source: 'Zalo',     stage: 'KH Tiềm năng',  createdAt: '2026-05-12' },
  { id: 6,  name: 'Vũ Thị Phượng',   email: 'vtp@gmail.com',   phone: '0956789012', source: 'Facebook', stage: 'Người mua hàng', interestedCourseId: 1, createdAt: '2026-05-14' },
  { id: 7,  name: 'Đặng Quốc Giang', email: 'dqg@gmail.com',   phone: '0967890123', source: 'Ads',      stage: 'Khách hàng',    interestedCourseId: 4, createdAt: '2026-05-16' },
  { id: 8,  name: 'Bùi Thị Hoa',     email: 'bth@gmail.com',   phone: '0978901234', source: 'Organic',  stage: 'KH Tiềm năng',  interestedCourseId: 3, createdAt: '2026-05-18' },
]

// ─── Deals ────────────────────────────────────────────────────────────────────
export const DEALS: Deal[] = [
  { id: 1,  contactId: 1, contactName: 'Nguyễn Văn An',   courseTitle: COURSES[0].title, value: 1990000, stage: 'won',       source: 'Facebook', createdAt: '2026-05-28', updatedAt: '2026-05-31' },
  { id: 2,  contactId: 2, contactName: 'Trần Thị Bình',   courseTitle: COURSES[1].title, value: 1490000, stage: 'interested',source: 'Organic',  createdAt: '2026-05-27', updatedAt: '2026-05-30' },
  { id: 3,  contactId: 3, contactName: 'Lê Minh Cường',   courseTitle: COURSES[2].title, value: 990000,  stage: 'new',       source: 'Ads',      createdAt: '2026-05-30', updatedAt: '2026-05-31' },
  { id: 4,  contactId: 4, contactName: 'Phạm Thu Dung',   courseTitle: COURSES[3].title, value: 2490000, stage: 'won',       source: 'Referral', createdAt: '2026-05-25', updatedAt: '2026-05-30' },
  { id: 5,  contactId: 5, contactName: 'Hoàng Văn Em',    courseTitle: COURSES[0].title, value: 1990000, stage: 'contacted', source: 'Zalo',     createdAt: '2026-05-29', updatedAt: '2026-05-30' },
  { id: 6,  contactId: 6, contactName: 'Vũ Thị Phượng',  courseTitle: COURSES[1].title, value: 1490000, stage: 'demo',      source: 'Facebook', createdAt: '2026-05-26', updatedAt: '2026-05-29' },
]

// ─── Affiliates ───────────────────────────────────────────────────────────────
export const AFFILIATES: Affiliate[] = [
  { id: 1, userId: 'u1', name: 'Nguyễn Minh Tuấn', email: 'nmt@gmail.com', code: 'NMT2026', commission: 30, referrals: 45, revenue: 89550000, pending: 12500000, paid: 14850000, status: 'active', joinedAt: '2026-01-10' },
  { id: 2, userId: 'u2', name: 'Trần Thu Hương',    email: 'tth@gmail.com', code: 'TTH2026', commission: 25, referrals: 32, revenue: 63680000, pending: 8500000,  paid: 7500000,  status: 'active', joinedAt: '2026-01-20' },
  { id: 3, userId: 'u3', name: 'Lê Văn Khoa',       email: 'lvk@gmail.com', code: 'LVK2026', commission: 20, referrals: 18, revenue: 35820000, pending: 3000000,  paid: 4164000,  status: 'active', joinedAt: '2026-02-05' },
  { id: 4, userId: 'u4', name: 'Phạm Thị Lan',      email: 'ptl@gmail.com', code: 'PTL2026', commission: 20, referrals: 8,  revenue: 15920000, pending: 0,         paid: 1990000,  status: 'paused', joinedAt: '2026-02-15' },
]

// ─── Email Campaigns ──────────────────────────────────────────────────────────
export const CAMPAIGNS: EmailCampaign[] = [
  { id: 1, title: 'Google tặng 4 tháng gói Pro miễn phí trị giá hơn 2 triệu', sent: 426, openRate: 26, clickRate: 0, status: 'sent', sentAt: '2026-05-24', createdAt: '2026-05-23' },
  { id: 2, title: 'Update VEO3.1 lên OMNI FLASH',                              sent: 400, openRate: 30, clickRate: 0, status: 'sent', sentAt: '2026-05-23', createdAt: '2026-05-22' },
  { id: 3, title: 'Zoom WebAllInOne - Mời Sinh Tố 100K - 22.05.2026',          sent: 357, openRate: 24, clickRate: 1, status: 'sent', sentAt: '2026-05-22', createdAt: '2026-05-21' },
  { id: 4, title: 'Zoom WebAllInOne - Mời Sinh Tố 100K - 22.05.2026',          sent: 0,   openRate: 0,  clickRate: 0, status: 'draft',                       createdAt: '2026-05-21' },
  { id: 5, title: 'Zoom KOL AI',                                                sent: 248, openRate: 43, clickRate: 6, status: 'sent', sentAt: '2026-05-15', createdAt: '2026-05-14' },
]

// ─── Lookup Maps ──────────────────────────────────────────────────────────────
export const COURSE_MAP = Object.fromEntries(COURSES.map(c => [c.id, c]))

export const ORDER_STATUS_CONFIG: Record<Order['status'], { label: string; badge: string; dot: string }> = {
  completed: { label: 'Hoàn thành', badge: 'badge-success', dot: 'bg-success' },
  pending:   { label: 'Chờ xử lý',  badge: 'badge-warning', dot: 'bg-brand-olive' },
  refunded:  { label: 'Hoàn tiền',  badge: 'badge-danger',  dot: 'bg-danger' },
  cancelled: { label: 'Đã huỷ',     badge: 'badge-gray',    dot: 'bg-text-muted' },
}

export const PAYMENT_METHOD_CONFIG: Record<PaymentMethod, { badge: string; color: string }> = {
  QR:    { badge: 'bg-success-light text-success border border-success/20',           color: '#2D7A4F' },
  Bank:  { badge: 'bg-info-light text-info border border-info/20',                    color: '#1D6FA4' },
  MoMo:  { badge: 'bg-[#FCE4EC] text-[#AD1457] border border-[#AD1457]/20',           color: '#AD1457' },
  VNPay: { badge: 'bg-[#E3F2FD] text-[#0D47A1] border border-[#0D47A1]/20',           color: '#0D47A1' },
  Cash:  { badge: 'badge-gray',                                                        color: '#7A8C7E' },
}

export const CONTACT_STAGE_CONFIG: Record<ContactStage, { badge: string; color: string }> = {
  'Tổng KH':        { badge: 'bg-info-light text-info border border-info/20',                  color: '#1D6FA4' },
  'KH Mục tiêu':   { badge: 'badge-gray',                                                      color: '#7A8C7E' },
  'KH Tiềm năng':  { badge: 'bg-brand-border/10 text-brand-border border border-brand-border/20', color: '#3D6B4A' },
  'Người mua hàng':{ badge: 'bg-brand-olive/10 text-brand-olive border border-brand-olive/20', color: '#88860B' },
  'Khách hàng':    { badge: 'badge-success',                                                    color: '#2D7A4F' },
  'Hội viên':      { badge: 'bg-brand-dark/10 text-brand-dark border border-brand-dark/20',    color: '#0D2B1A' },
  'Người ủng hộ':  { badge: 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20', color: '#C0390E' },
  'Fan hâm mộ':    { badge: 'bg-brand-dark/15 text-brand-dark border border-brand-dark/25',   color: '#0D2B1A' },
}

export const SOURCE_CONFIG: Record<ContactSource, { badge: string }> = {
  Facebook: { badge: 'bg-info-light text-info border border-info/20' },
  Organic:  { badge: 'badge-success' },
  Ads:      { badge: 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' },
  Zalo:     { badge: 'bg-brand-border/10 text-brand-border border border-brand-border/20' },
  Referral: { badge: 'bg-brand-olive/10 text-brand-olive border border-brand-olive/20' },
  Email:    { badge: 'badge-gray' },
  TikTok:   { badge: 'bg-brand-dark/10 text-brand-dark border border-brand-dark/20' },
}

export const DEAL_STAGE_CONFIG: Record<DealStage, { label: string; color: string; border: string }> = {
  new:        { label: 'Mới vào',      color: 'text-info',          border: 'border-t-info' },
  contacted:  { label: 'Đã liên hệ',  color: 'text-brand-olive',   border: 'border-t-brand-olive' },
  interested: { label: 'Quan tâm',    color: 'text-brand-border',  border: 'border-t-brand-border' },
  demo:       { label: 'Demo/Tư vấn', color: 'text-brand-dark',    border: 'border-t-brand-dark' },
  won:        { label: 'Chốt deal',   color: 'text-success',       border: 'border-t-success' },
  lost:       { label: 'Thất bại',    color: 'text-danger',        border: 'border-t-danger' },
}

// ─── KPI Totals (computed from mock data) ────────────────────────────────────
export const KPI = {
  revenue:       809173000,
  orders:        454,
  newStudents:   605,
  avgOrderValue: 1782319,
  totalCourses:  COURSES.length,
  totalContacts: 663,
  totalAffiliates: 103,
  subscribers:   480,
}
