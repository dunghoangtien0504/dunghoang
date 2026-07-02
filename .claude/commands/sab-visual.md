---
name: sab-visual
description: "Tạo visual content đẹp dạng HTML: mindmap, infographic, timeline"
---
# SAB Visual Command

Activate **Visual Builder Skill** để tạo visual content đẹp dưới dạng HTML: mind map, infographic, sơ đồ quy trình, timeline, so sánh, checklist, và data visual.

## Agent
Load `agents/02-marketing-agent.md` (chuyên gia content & trình bày thu hút)

## Skill
Load `skills/visual-builder/SKILL.md` và tất cả references + templates.

## Usage
```
/sab-visual [loại] [chủ đề]
```

**Ví dụ:**
- `/sab-visual mindmap` — Mind map tương tác với Markmap.js
- `/sab-visual infographic` — Infographic dọc đẹp cho FB/Zalo
- `/sab-visual process` — Sơ đồ quy trình từng bước
- `/sab-visual timeline` — Lộ trình / timeline theo mốc thời gian
- `/sab-visual comparison` — Bảng so sánh Before/After hoặc các gói
- `/sab-visual checklist` — Checklist visual có thể in ra
- `/sab-visual stats` — Visual số liệu & kết quả với progress bar

## Workflow
1. Hỏi: nội dung/ý tưởng muốn thể hiện, mục đích dùng, tone màu sắc
2. Nếu chưa chọn loại: gợi ý loại phù hợp nhất với nội dung
3. Đọc template tương ứng từ `skills/visual-builder/templates/`
4. Customize nội dung và màu sắc theo yêu cầu
5. Xuất file HTML hoàn chỉnh kèm hướng dẫn xem và xuất PDF

## Output
File HTML mở được ngay trên browser. Muốn PDF: Ctrl+P → Save as PDF.
