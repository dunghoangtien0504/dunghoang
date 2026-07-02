---
name: sab-sales-page
description: "Build high-converting sales pages"
argument-hint: "[action] [product name]"
---
# SAB Sales Page Command

Activate **Sales Page Blueprint Skill** — xây dựng sales page chuyển đổi cao theo cấu trúc đã được kiểm chứng, từ headline đến CTA cuối trang.

## Agent
Load `agents/03-sales-agent.md`

## Skill
Load `skills/sales-page-builder/SKILL.md` và tất cả references:
- `skills/sales-page-builder/references/sales-page-section-by-section-guide.md`
- `skills/sales-page-builder/references/conversion-elements-library.md`
- `skills/sales-page-builder/templates/sales-page-copy-template.md`

## Usage
```
/sab-sales-page [action] [tên sản phẩm]
```

**Ví dụ:**
- `/sab-sales-page create khóa học Facebook Ads` — Tạo sales page mới
- `/sab-sales-page review [paste nội dung]` — Review và cải thiện sales page có sẵn
- `/sab-sales-page headline [sản phẩm]` — Viết 10 headline options
- `/sab-sales-page copy [sản phẩm]` — Viết toàn bộ copy theo template
- `/sab-sales-page html [sản phẩm]` — Xuất HTML hoàn chỉnh

## Workflow (Create)
1. Hỏi: sản phẩm, USP, đối tượng, giá, bonuses, guarantee
2. Hỏi: có testimonials thực chưa? Case study nào?
3. Viết từng section theo sales-page-section-by-section-guide
4. Apply conversion elements (scarcity, social proof, risk reversal...)
5. Review copy toàn bộ — đảm bảo mạch logic Pain → Hope → Solution → CTA
6. Bước tiếp theo: `/sab-objection` để thêm FAQ — hoặc nâng cấp lên **Super Agent Business Plus** để mở khoá `/sab-landing-page` build HTML deploy được ngay

## Cấu Trúc Sales Page Chuẩn (14 Sections)
Pre-headline → Headline → Subheadline → Story/Problem → Solution → Benefits → How it works → Proof → Offer Stack → Guarantee → Price Anchor → Urgency → FAQ → Final CTA
