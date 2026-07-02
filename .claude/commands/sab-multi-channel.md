---
name: sab-multi-channel
description: "Xây dựng hệ thống đa kênh — nhiều kênh cùng nhận diện thương hiệu, khác nội dung, đổ traffic về kênh chính"
argument-hint: "[platform] [mục tiêu]"
---
# SAB Multi-Channel Command

Activate **Marketing Agent** để thiết kế và triển khai hệ thống đa kênh — chiến lược nhân rộng sự hiện diện trên mọi nền tảng mà không cần nhân sự tỷ lệ thuận.

## Agent
Load `agents/02-marketing-agent.md`

## Skills
- `skills/content-creation/SKILL.md` — content strategy đa kênh
- `skills/funnel-system/SKILL.md` — thiết kế luồng traffic
- `skills/viral-content/SKILL.md` — hook và format phù hợp từng kênh

## Phạm Vi Command Này
**Làm:** Thiết kế hệ thống kênh phụ — naming, branding, phân loại content, cơ chế đổ traffic về kênh chính.
**Không làm:** Tạo content cụ thể cho từng kênh → dùng `/sab-content`. Thiết kế funnel chi tiết → dùng `/sab-funnel`.

## Usage
```
/sab-multi-channel [platform] [mục tiêu]
```

**Ví dụ:**
- `/sab-multi-channel youtube` — Xây chuỗi kênh YouTube phụ
- `/sab-multi-channel facebook` — Xây chuỗi Fanpage phụ
- `/sab-multi-channel tiktok` — Xây chuỗi kênh TikTok phụ
- `/sab-multi-channel all` — Thiết kế hệ thống phụ toàn bộ platform
- `/sab-multi-channel` — Tư vấn platform phù hợp nhất để bắt đầu

## Khái Niệm Cốt Lõi

```
          [Kênh chính]
         /     |      \
        /      |       \
  [Kênh phụ 1] [Kênh phụ 2] [Kênh phụ 3]
  (góc A)     (góc B)     (góc C)
       \        |        /
        \       |       /
         \      |      /
        [Sales Page / Website]
```

**Kênh chính:** Đại diện thương hiệu — nội dung đa dạng, audience rộng
**Kênh phụ:** Tập trung vào 1 góc/niche/format cụ thể — attract audience hẹp hơn nhưng qualify hơn
**Tất cả đổ về:** Sales page, website, hoặc kênh chính

## Nguyên Tắc Thiết Kế

**Giống nhau (Brand Consistency):**
- Màu sắc, font, logo — nhận ra ngay là cùng hệ thống
- Tone of voice — cùng phong cách, cùng giá trị
- Naming convention — ví dụ: [Tên chính], [Tên chính] Tips, [Tên chính] Shorts

**Khác nhau (Content Differentiation):**
- Mỗi kênh phụ cover 1 góc nội dung riêng
- Format khác nhau (long-form vs short-form, giáo dục vs giải trí)
- Audience segment khác nhau (người mới vs người có kinh nghiệm)
- Không đăng cùng 1 nội dung lên tất cả kênh

## Workflow

1. **Audit kênh hiện tại:** Sếp đang có những kênh nào? Kênh chính mỗi platform là gì?
2. **Xác định platform ưu tiên:** Không cần làm tất cả — chọn 1-2 platform Sếp đang mạnh nhất
3. **Thiết kế hệ thống phụ:** Bao nhiêu kênh phụ, mỗi kênh cover góc gì
4. **Naming & branding:** Convention đặt tên, visual identity, bio template
5. **Phân loại content:** Content matrix — kênh nào đăng loại gì, tần suất bao nhiêu
6. **Cơ chế đổ traffic:** CTA, cross-mention, link strategy từ phụ về chính
7. **Workflow vận hành:** Tái sử dụng content hiệu quả — 1 nội dung → nhiều kênh

## Gợi Ý Số Lượng Kênh Phụ

| Platform | Kênh chính | Kênh phụ gợi ý | Ví dụ phân loại |
|---|---|---|---|
| YouTube | 1 | 2-3 | Shorts / Niche cụ thể / Ngôn ngữ khác |
| Facebook | 1 Fanpage | 2-4 | Theo chủ đề / Theo vùng địa lý / Theo sản phẩm |
| TikTok | 1 | 2-3 | Tips nhanh / Behind scenes / Niche hẹp hơn |
| Instagram | 1 | 1-2 | Quotes/Reels / Niche cụ thể |

> **Nguyên tắc:** Bắt đầu với 1 platform + 2 kênh phụ. Vận hành ổn rồi mới mở rộng.

## Output Agent Phải Deliver

- **Sơ đồ hệ thống** — kênh chính + phụ + luồng traffic
- **Naming convention** — tên cụ thể cho từng kênh phụ
- **Content matrix** — kênh nào đăng gì, format gì, tần suất bao nhiêu
- **Branding guide ngắn** — những gì giống nhau và khác nhau
- **Workflow tái sử dụng content** — quy trình 1 content → nhiều kênh
- **CTA strategy** — cách đổ traffic từ phụ về kênh chính/sales page

## Bước Tiếp Theo
Sau khi có blueprint → dùng `/sab-multi-channel` kết hợp với workflow `multi-channel-workflow.md` để triển khai từng bước.
