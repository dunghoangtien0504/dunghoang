# CEO Quản Trị Kiến Tạo – Skill v1

Skill cố vấn cấp CEO kết hợp **Ngô Minh Tuấn × Alex Hormozi**.

## Cấu trúc

```
ceo-quan-tri-kien-tao/
├── SKILL.md                          # Workflow chính: chẩn đoán → kê toa → thực thi → tổng kết
├── README.md                         # File này
├── evals/
│   └── evals.json                    # 3 test prompts mẫu
└── references/
    ├── 4-giai-doan-dn.md             # Chẩn đoán giai đoạn DN (NMT)
    ├── ccsc-builder.md               # Xây bộ điều khiển trung tâm (NMT)
    ├── bsc-4-mat-tran.md             # BSC Việt hóa (NMT)
    ├── grand-slam-offer.md           # Value Equation + Offer Stack (Hormozi)
    ├── money-model.md                # 16 loại offer + CAC/LTV (Hormozi)
    ├── core-four-leads.md            # 4 cách quảng cáo + Lead Magnet (Hormozi)
    └── khoan-toan-dien.md            # CCSC/CCSD/CCSP + khoán CCVE (NMT)
```

## Cách cài đặt

### Cách 1: Dùng tại chỗ trong Claude Code
1. Copy folder này vào `~/.claude/skills/` (hoặc `C:\Users\<bạn>\.claude\skills\` trên Windows).
2. Khởi động lại Claude Code.
3. Trigger bằng cách hỏi tình huống CEO (xem phần "Khi nào kích hoạt" trong SKILL.md).

### Cách 2: Test thủ công
Mở 1 conversation mới, dán nội dung SKILL.md vào đầu, rồi đặt câu hỏi như test prompts trong `evals/evals.json`.

## Triết lý

> "Quản trị bằng số, không quản trị bằng cảm tính.
>  Chuẩn hóa trước tối ưu, tối ưu trước tự động.
>  Khoán đến đâu, trao quyền đến đó.
>  Tâm trước Pháp."

## Khi nào dùng skill này

Người dùng đang đứng ở vai CEO/Founder và cần:
- Chẩn đoán giai đoạn DN (Sống sót / Chuẩn hóa / Tối ưu / Tự động)
- Xây bộ điều khiển trung tâm CCSC
- Thiết kế Grand Slam Offer
- Kiến trúc Money Model 4 loại offer
- Khoán xuống Giám đốc Bộ phận / Trưởng phòng
- Chuẩn bị scaling, gọi vốn, hoặc tái cấu trúc

## Skill kế tiếp trong bộ

CEO là skill đầu tiên trong bộ 5 skill cho 5 vị trí lãnh đạo:
- ✅ **CEO** – Quản trị tổng thể, ra quyết định cấp DN
- ⏳ **CFO** – Quản trị tài chính, dòng tiền, gọi vốn
- ⏳ **CCO** – Vận hành Sales + Marketing + Truyền thông
- ⏳ **CHRO** – Nhân sự, lương khoán, văn hóa
- ⏳ **Trưởng phòng KD** – Thực thi cấp đội nhóm

Mỗi skill kế tiếp sẽ:
- Tái sử dụng các reference dùng chung (BSC, khoán, Money Model concept)
- Có references chuyên biệt cho vị trí đó (ví dụ CHRO: lương 3T, quy chế sa thải)
- Liên kết ngược về skill CEO khi cần ra quyết định vượt cấp

## Test trước khi dùng production

3 test prompts trong `evals/evals.json` đại diện 3 tình huống thường gặp:
1. **CEO tắc nghẽn tăng trưởng** – cảnh báo nhảy cóc giai đoạn
2. **Offer thiếu sức cạnh tranh** – áp dụng Value Equation
3. **Scaling + khoán xuống** – CCSC + khoán toàn diện

Mỗi prompt nên cho ra output theo template `📋 TOA QUẢN TRỊ` trong SKILL.md.
