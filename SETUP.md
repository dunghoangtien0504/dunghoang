# DungHoang.com - Setup Guide

## Bước 1: Cài Node.js (nếu chưa có)

Tải và cài từ: https://nodejs.org/en/download (chọn LTS version)

Sau khi cài xong, mở **Command Prompt mới** (quan trọng!) để PATH được load lại.

## Bước 2: Chạy dự án

Mở Terminal/CMD trong thư mục này và chạy:

```bash
npm install
npm run dev
```

Sau đó mở trình duyệt tại: **http://localhost:3000**

## Các trang có sẵn:

| URL | Trang |
|-----|-------|
| `/` | → Redirect đến Admin |
| `/admin` | Admin Panel Dashboard |
| `/admin/email` | Email Marketing |
| `/admin/crm/contacts` | CRM Khách hàng |
| `/admin/crm/pipeline` | Pipeline Kanban |
| `/admin/courses` | Quản lý Khoá học |
| `/admin/orders` | Quản lý Đơn hàng |
| `/admin/affiliate` | Quản lý Affiliate |
| `/(public)/landing` | Landing Page |

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (Dark theme)
- **Recharts** (Charts)
- **Lucide React** (Icons)
- **TypeScript**
