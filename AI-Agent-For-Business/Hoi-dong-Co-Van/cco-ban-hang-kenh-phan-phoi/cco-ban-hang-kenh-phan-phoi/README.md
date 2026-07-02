# CCO – Bán hàng & Kênh phân phối – Skill v2 (thu hẹp)

Skill cố vấn cấp Giám đốc Bán hàng, lai phương pháp **Ngô Minh Tuấn × Alex Hormozi**.

## Điểm khác v1

**v1 cũ** (cco-kinh-doanh-tang-truong): CCO chịu cả Marketing + Sales + PR = quá rộng, chồng chéo CMO.

**v2 mới** (cco-ban-hang-kenh-phan-phoi): CCO chỉ chịu **Sales + Kênh + Giữ chân**, Marketing tách ra thành skill CMO riêng.

## Cấu trúc

```
cco-ban-hang-kenh-phan-phoi/
├── SKILL.md                              # Workflow: kiểm CCSD → 3 trụ (Chuyển đổi/Giữ chân/Kênh) → kê toa
├── README.md
├── evals/evals.json                      # 3 test (không chốt / churn cao / mở đại lý)
└── references/
    ├── nhan-ccsd-sales.md                # CCSD Sales + đàm phán + phân bổ 4 CCSD con
    ├── pipeline-sales-script.md          # 7 stage + SPIN + "Sell like a doctor" + follow-up 5-7
    ├── kenh-phan-phoi-gt.md               # Kênh GT + 6 trục chính sách đại lý + mô hình chuỗi
    ├── upsell-downsell-continuity.md     # 10 loại (4 Upsell + 3 Downsell + 3 Continuity) Việt hóa
    ├── customer-success.md               # CS Lifecycle 5 stage + Health Score + Referral
    ├── ke-hoach-ban-hang.md              # KHKD Sales 7 chương + 4 công cụ dự phóng
    └── kpi-cco.md                        # 3 nhóm KPI + dashboard + feedback CMO
```

## Triết lý

> "CMO tạo ra dòng lead. CCO biến lead thành doanh thu + giữ chân + mở rộng."
>
> "Sell like a doctor — khám trước, kê toa sau."
>
> "80% deal đóng ở lần follow-up 5-7."
>
> "Retention rẻ hơn Acquisition 5-25x."

## Phân biệt với CMO

| Việc | CMO | CCO |
|---|---|---|
| Chọn ngách + định vị | ✅ | – |
| Grand Slam Offer (thiết kế) | ✅ | – |
| Attraction Offer (6 loại đầu) | ✅ | – |
| **Sales pipeline + script chốt** | – | ✅ |
| **Kênh phân phối GT + đại lý** | – | ✅ |
| **Upsell + Downsell + Continuity (10 loại)** | – | ✅ |
| **Customer Success + Retention** | – | ✅ |

CMO tạo dòng lead, CCO chốt + giữ + mở rộng.

## Cài đặt

```powershell
Copy-Item "D:\Học\Thầy Ngô Minh Tuấn\skills\cco-ban-hang-kenh-phan-phoi" "$env:USERPROFILE\.claude\skills\" -Recurse
```

## Test prompt mẫu

Thử:
> *"8 sales rep, CMO chuyển 400-500 lead/tháng nhưng chỉ ký 15-20 deal. Conversion 4%. Sales than 'lead rác'. Vấn đề ở đâu?"*

Skill phải: chẩn đoán pipeline 7 stage, đề xuất feedback loop CMO tuần này, ngưỡng SQL rate quyết định lỗi ở đâu.

## Vị trí trong bộ 5 skill

- ✅ **CEO** – Quản trị Kiến tạo
- ✅ **CFO** – Tài chính & Dòng tiền
- ✅ **CMO** – Marketing & Thu hút
- ✅ **CCO** – Bán hàng & Kênh phân phối *(skill này, thu hẹp)*
- ✅ **CHRO** – Nhân sự & Lương khoán
