---
name: sab-email
description: "Viết email marketing — welcome sequence, broadcast, launch, upsell, reengagement"
argument-hint: "[loại email] [chủ đề]"
---
# SAB Email Command

Activate **Email Marketing Skill** — viết email và chuỗi email chuyển đổi cao.

## Agent
Use `agents/03-sales-agent.md` as the base persona (conversion & nurture focused).

## Skill
Load `skills/email-marketing/SKILL.md` and all references.

## Usage
```
/sab-email [type] [topic]
```

**Examples:**
- `/sab-email sequence welcome` — Tạo chuỗi welcome email 7 email
- `/sab-email broadcast sale` — Viết broadcast email quảng bá sale
- `/sab-email sequence launch` — Chuỗi launch sản phẩm mới
- `/sab-email upsell` — Email upsell cho khách đã mua
- `/sab-email reengagement` — Chuỗi re-engagement subscriber lạnh

## Workflow
1. Clarify: loại email, sản phẩm, đối tượng, nền tảng (GetResponse/MailerLite)
2. Map: phác thảo plan toàn bộ chuỗi (subject + goal từng email)
3. Confirm: user approve plan trước khi viết
4. Write: viết từng email theo format chuẩn trong SKILL.md
5. Tips: thêm hướng dẫn setup trên GetResponse hoặc MailerLite nếu cần
