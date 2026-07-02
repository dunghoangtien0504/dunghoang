# CHRO – Nhân sự & Lương khoán – Skill v1

Skill cố vấn cấp Giám đốc Nhân sự, lai phương pháp **Ngô Minh Tuấn × Alex Hormozi**.

## Cấu trúc

```
chro-nhan-su-luong-khoan/
├── SKILL.md                          # Workflow: 5 đèn HR → kê toa → báo cáo
├── README.md                         # File này
├── evals/
│   └── evals.json                    # 3 test (turnover 31% / khoán Sales / tuyển TP MKT)
└── references/
    ├── chro-trong-he-thong.md        # Vai trò CHRO trong BSC/CCSC + cơ cấu 5 bộ phận + tầng nhân sự
    ├── ccsp-mtcv-kpi.md              # CCSP 7 bước NMT + MTCV + KPI + nội quy
    ├── luong-khoan-5pp.md            # 5 phương pháp: 3T, khoán DT, KPI, khoán LN, phúc lợi
    ├── tuyen-dung-ngu-luc.md         # Ngũ lực Phật giáo + 6 bước tuyển + onboarding 30/60/90
    ├── dao-tao-phat-trien.md         # 3 loại đào tạo + 70-20-10 + lộ trình thăng tiến + succession
    ├── van-hoa-giu-chan.md           # 4 trụ văn hóa + eNPS + stay/exit interview + sa thải nhân văn
    └── kpi-chro.md                   # 4 nhóm KPI + dashboard + HR analytics nâng cao
```

**Tổng**: ~1.700 dòng, 7 references chuyên sâu.

## Triết lý

> "Chọn đúng người = thắng 70%. Dùng đúng người = thắng 90%. Giữ đúng người = thắng 100%." — NMT
>
> "A players hire A players. B players hire C players." — Hormozi
>
> "Treo cà rốt + Xây con đường — thiếu 1 trong 2 = nhân viên trôi."
>
> "Văn hóa là hành vi lặp lại, không phải khẩu hiệu treo tường."

## Điểm độc đáo của skill CHRO

- **Tuyển dụng theo Ngũ lực Phật giáo** (Tín-Tấn-Niệm-Định-Tuệ) — chỉ có ở NMT, không có ở MBA phương Tây
- **5 phương pháp chia lương khoán** — đầy đủ công thức + ví dụ tính lương cụ thể
- **CCSP 7 bước** — quy trình NMT chuẩn cho mọi vị trí
- **Văn hóa được thiết kế bằng quy trình + rituals + reward**, không phải workshop team building

## Khi nào dùng skill này

- Turnover cao, không hiểu nguyên nhân
- Tuyển không được người
- Quỹ lương vượt CCSC
- Trưởng phòng đòi tăng lương
- Cần xây/sửa CCSP cho 1 vị trí
- Cần thiết kế quy chế lương khoán
- Phải xử lý xung đột / sa thải
- Cần xây văn hóa DN

## So sánh với 3 skill khác

| Tình huống | Skill nào? |
|---|---|
| "DN nên cơ cấu lại không?" | CEO (chiến lược) → CHRO chốt cơ cấu |
| "Quỹ lương vượt 30%?" | CFO + CHRO phối hợp |
| "Khoán doanh thu cho Sales thế nào?" | CCO ra đề bài + CHRO chốt công thức |
| "Tuyển Trưởng phòng?" | **CHRO chủ trì** |
| "Sa thải nhân viên?" | **CHRO chủ trì** |
| "Văn hóa lỏng lẻo?" | **CHRO chủ trì** + CEO sống giá trị |

## Cài đặt

```powershell
# Copy folder
Copy-Item "D:\Học\Thầy Ngô Minh Tuấn\skills\chro-nhan-su-luong-khoan" "$env:USERPROFILE\.claude\skills\" -Recurse
```

Hoặc:
```powershell
Expand-Archive "D:\Học\Thầy Ngô Minh Tuấn\skills\chro-nhan-su-luong-khoan.zip" -DestinationPath "$env:USERPROFILE\.claude\skills\"
```

## Test prompt mẫu

Thử:
> *"Cty mình SaaS 45 người, năm qua nghỉ 14 người (turnover 31%). Em đã thử tăng lương 15-20% nhưng vẫn không giữ. 2 Senior Developer giỏi vừa nghỉ. Em sốc."*

Skill phải:
1. Cảnh báo NGAY: tăng lương vá triệu chứng, không trị gốc.
2. Phân tích 3 lý do (Sếp > Việc > Tiền).
3. Đề xuất Stay Interview + Exit Interview + eNPS setup.
4. Đặc biệt audit cohort nghỉ < 90 ngày (onboarding vs tuyển sai).
5. Output bảng 5 đèn + toa 90 ngày.

## Hoàn tất bộ 4 skill

- ✅ **CEO** – Quản trị Kiến tạo
- ✅ **CFO** – Tài chính & Dòng tiền
- ✅ **CCO** – Kinh doanh & Tăng trưởng
- ✅ **CHRO** – Nhân sự & Lương khoán (skill này)

Bộ 4 skill bao trùm **4 chiếc ghế HĐQT** — cài cả 4 vào Claude Code = có 1 ban điều hành mini tư vấn 24/7.
