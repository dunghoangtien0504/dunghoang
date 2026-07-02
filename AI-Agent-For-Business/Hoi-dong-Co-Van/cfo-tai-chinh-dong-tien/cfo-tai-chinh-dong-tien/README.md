# CFO – Tài chính & Dòng tiền – Skill v1

Skill cố vấn cấp Giám đốc Tài chính, lai phương pháp **Ngô Minh Tuấn × Alex Hormozi**.

## Cấu trúc

```
cfo-tai-chinh-dong-tien/
├── SKILL.md                          # Workflow: chẩn đoán 6 đèn → kê toa → thực thi → báo cáo
├── README.md                         # File này
├── evals/
│   └── evals.json                    # 3 test prompts (có lãi mà cạn tiền / mở chi nhánh / gọi vốn Series A)
└── references/
    ├── chan-doan-tai-chinh.md        # 6 đèn sức khỏe tài chính
    ├── ccsc-tai-chinh.md             # CCSC chi tiết (sâu hơn skill CEO)
    ├── dong-tien-luan-chuyen.md      # Tiền-Hàng-Tiền + CCC + War Room
    ├── suat-dau-tu.md                # Đầu tư: 5 bước + Payback/NPV/IRR
    ├── unit-economics.md             # CAC/LTV/Payback/MRR + 4 đòn bẩy tối ưu
    ├── dinh-gia-san-pham.md          # 5 phương pháp + 3-tier pricing + Van Westendorp
    ├── goi-von.md                    # Định giá DN + 5 vòng + hồ sơ 10 tài liệu + term sheet
    └── kiem-soat-chi-phi.md          # Zero-based budget + audit + war room cắt chi phí
```

**Tổng**: ~1.500 dòng, 8 references chuyên sâu.

## Triết lý

> "Revenue is vanity. Profit is sanity. Cash flow is reality."
>
> "Không có chi phí cố định — chỉ có chi phí chưa được khoán."
>
> "Gọi vốn để TĂNG TỐC mô hình đã work, không phải KÉO DÀI mô hình chưa work."

## Khi nào dùng skill này

CFO khác CEO ở chỗ đi **sâu vào số**:
- Có lãi nhưng cạn tiền — phân tích dòng tiền
- Đánh giá đầu tư / mở rộng (NPV, IRR, Payback)
- Tối ưu Unit Economics (CAC/LTV/Payback)
- Định giá lại sản phẩm
- Chuẩn bị hồ sơ gọi vốn
- Kiểm soát chi phí khi runway ngắn

## So sánh với skill CEO

| Tình huống | Skill nào? |
|---|---|
| "Nên scale không?" | CEO (chiến lược) |
| "Scale như thế nào về tài chính?" | CFO |
| "Mô hình kinh doanh có work không?" | CEO |
| "Unit Economics có khỏe không?" | CFO |
| "Có nên gọi vốn không?" | CEO (chiến lược) |
| "Định giá DN bao nhiêu và pitch ra sao?" | CFO |

Khi đủ kỹ năng, **2 skill phối hợp**: CEO ra hướng → CFO chốt số.

## Cài đặt

```powershell
# Cách 1: Copy folder
Copy-Item "D:\Học\Thầy Ngô Minh Tuấn\skills\cfo-tai-chinh-dong-tien" "$env:USERPROFILE\.claude\skills\" -Recurse

# Cách 2: Giải nén file .skill (nếu đã đóng gói)
Expand-Archive "D:\Học\Thầy Ngô Minh Tuấn\skills\cfo-tai-chinh-dong-tien.zip" -DestinationPath "$env:USERPROFILE\.claude\skills\"
```

## Test sau khi cài

Thử prompt:
> *"Cty mình bán thiết bị y tế, doanh thu 35 tỷ/năm, lãi 8%. Nhưng tài khoản chỉ còn 600tr. Sao lãi mà cạn tiền?"*

Skill phải hỏi về DSO/DIO/DPO + CAPEX + nợ gốc, sau đó chấm 6 đèn và output bảng toa 90 ngày.

## Skill kế tiếp trong bộ

- ✅ **CEO** – Quản trị Kiến tạo
- ✅ **CFO** – Tài chính & Dòng tiền (skill này)
- ⏳ **CCO** – Sales + Marketing + Truyền thông (kế tiếp)
- ⏳ **CHRO** – Nhân sự & Lương khoán
- ⏳ **Trưởng phòng KD** – Thực thi đội nhóm
