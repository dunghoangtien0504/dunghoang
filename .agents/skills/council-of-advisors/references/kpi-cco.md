# BỘ KPI CCO & DASHBOARD

## Triết lý đo lường CCO

> *"What gets measured gets managed. What gets managed gets improved."* — Peter Drucker

CCO không thể quản lý 3 phòng nếu không có **dashboard real-time**. Mọi cuộc họp tuần phải mở từ dashboard, không từ trí nhớ.

---

## BỘ KPI 3 TẦNG (Lai NMT × Hormozi)

### Tầng 1 — KPI VĨ MÔ (Báo cáo CEO/HĐQT hàng tháng)

| KPI | Định nghĩa | Ngưỡng tốt | Tần suất đo |
|---|---|---|---|
| **Doanh thu thực tế vs CCSD** | % đạt mục tiêu CCSD | ≥ 95% | Tháng |
| **Biên gộp bộ phận** | (DT - Giá vốn) / DT | Theo ngành | Tháng |
| **CAC blended** | Tổng MKT+Sales / khách mới | ≤ ngưỡng CCSD | Tháng |
| **LTV / CAC** | LTV ÷ CAC | ≥ 3 | Tháng |
| **CAC Payback** | CAC ÷ (ARPU × biên gộp) | ≤ 30 ngày | Tháng |
| **Tăng trưởng YoY** | DT năm nay / năm trước - 1 | ≥ mục tiêu | Quý |

### Tầng 2 — KPI VẬN HÀNH (CCO theo dõi hàng tuần)

#### Phòng Truyền thông
- Brand search volume (Google Trends)
- Share of voice (% mentions so đối thủ)
- Reach hữu cơ/tuần
- Engagement rate

#### Phòng Marketing
- Lead/tuần (theo kênh: organic, paid, referral)
- Engaged lead/tuần (đã tải Lead Magnet)
- CAC theo kênh
- Conversion landing page
- Cost per Lead (CPL) theo kênh

#### Phòng Sales
- Pipeline value (tổng deal đang mở × xác suất)
- Conversion từng stage (Lead→MQL→SQL→Discovery→Proposal→Won)
- Velocity (số ngày trung bình từ Lead → Won)
- AOV (Average Order Value)
- Win rate (% deal closed won)
- Số call/sales rep/tuần

### Tầng 3 — KPI CÁ NHÂN (Mỗi nhân viên — cài vào CCSP)

Theo `khoan-toan-dien.md` của skill CEO, mỗi vị trí trong CCSP có 3-5 KPI cá nhân. Ví dụ:

#### Sales Rep
- Số call/ngày (target: 30-50)
- Số demo/tuần (target: 5-10)
- Số deal closed/tháng (target: 5-15)
- Doanh thu/tháng
- AOV trung bình

#### Marketer (Performance)
- CAC kênh phụ trách
- Lead/ngày
- Conversion landing page
- ROAS (Return on Ad Spend)

#### Content Marketer
- Bài/tuần
- Engagement rate
- Lead từ content/tháng
- Top 3 keyword rank

---

## DASHBOARD CCO — TEMPLATE 1 TRANG

```
┌─────────────────────────────────────────────────────────┐
│ DASHBOARD CCO – Tuần [N] – [Tên DN]                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📈 NGÀY HÔM NAY                                         │
│ • Doanh thu hôm nay: [số] | Tháng: [số] / Target [số]  │
│ • Leads hôm nay: [số] | Tuần: [số]                     │
│ • Deals closed hôm nay: [số]                            │
│                                                         │
│ 🎯 3 TRỤ CỘT                                            │
│ [Thu hút]      [Chuyển đổi]    [Giữ chân]              │
│ Lead/tuần      Conv: X%        Churn: X%               │
│ [🟢]            [🟡]            [🟢]                    │
│                                                         │
│ 📊 CORE FOUR (Tuần này)                                 │
│ Warm Outreach: [lead] / CAC                            │
│ Post Content: [reach] / [lead]                         │
│ Cold Outreach: [contact] / [meeting]                   │
│ Paid Ads: [spend] / [lead] / CAC                       │
│                                                         │
│ 💰 PIPELINE                                             │
│ MQL: [N] | SQL: [N] | Discovery: [N] | Proposal: [N]   │
│ Negotiation: [N] | Pipeline Value: [VND]               │
│                                                         │
│ ⚠️  ĐÈN ĐỎ TUẦN NÀY                                     │
│ • [Kênh X] CAC vượt 30% ngưỡng                          │
│ • [Khách Y] đã ở Negotiation 21 ngày                   │
│                                                         │
│ ✅ HÀNH ĐỘNG TUẦN SAU                                   │
│ 1. ...                                                  │
│ 2. ...                                                  │
└─────────────────────────────────────────────────────────┘
```

**Cập nhật**: hàng ngày (số liệu tự động qua CRM/Analytics) + tuần (commentary).

---

## NGƯỠNG ĐÈN ĐỎ — TRIGGER CCO HÀNH ĐỘNG NGAY

| Triệu chứng | Ngưỡng | Hành động |
|---|---|---|
| CAC tăng > 30% tuần này | trong 1 tuần | Pause kênh đó, review hook + audience |
| Lead/tuần giảm > 25% | 2 tuần liên tiếp | Audit Core Four + Lead Magnet |
| Conversion Discovery → Proposal | < 30% | Audit script + đào tạo lại Sales |
| Win rate | < 20% | Vấn đề ở qualify lead hoặc offer |
| Pipeline aged (deal > 60 ngày) | > 30% pipeline | Khử pipeline cũ, focus deal nóng |
| Churn tháng | > 8% (B2C) / > 3% (B2B) | Triển khai Continuity + Customer Success |
| AOV giảm | > 15% YoY | Audit Money Model, nhất là Upsell |

---

## REPORTING CADENCE (Nhịp báo cáo)

| Tần suất | Ai họp | Nội dung |
|---|---|---|
| **Hàng ngày** | TP Sales + Sales team | Stand-up 15 phút: pipeline, deal nóng |
| **Hàng tuần** | CCO + 3 TP | Review dashboard, kê toa tuần sau |
| **Hàng tháng** | CEO + CCO | Báo cáo vs CCSD, đèn đỏ, đề xuất |
| **Hàng quý** | HĐQT (nếu DN có) | Báo cáo quý, gap analysis, plan quý sau |
| **Nửa năm** | Toàn team | Off-site review chiến lược |

---

## CÔNG CỤ ĐO LƯỜNG (Tech Stack tối thiểu)

| Loại | Tools VN/quốc tế |
|---|---|
| **CRM** | HubSpot, Pipedrive, Bitrix24, Getfly, MISA CRM, Salesforce |
| **Analytics** | Google Analytics 4, Mixpanel |
| **Ads platform** | FB Ads Manager, Google Ads, TikTok Ads Manager |
| **Tracking** | Google Tag Manager, Triple Pixel |
| **Dashboard** | Google Data Studio (Looker Studio - free), Tableau |
| **Call recording** | Aircall, CallRail, Tota Voice (VN) |
| **Email/marketing automation** | ActiveCampaign, GetResponse, Mailchimp |
| **Survey/NPS** | Typeform, SurveyMonkey, Delighted |

**Quy tắc CCO**: 1 nguồn của sự thật (single source of truth) cho mỗi chỉ số. Không có 2 dashboard cho cùng 1 KPI.

---

## CÀI KPI VÀO LƯƠNG (Liên hệ CHRO)

CCO không tự thiết kế lương — phối hợp với **CHRO**. Nguyên tắc:

| Vị trí | Cấu trúc lương đề xuất |
|---|---|
| Sales Rep | 30% cứng + 70% hoa hồng (theo DT + AOV + retention 3 tháng) |
| TP Sales | 50% cứng + 50% theo team revenue + churn |
| Marketer Performance | 60% cứng + 40% theo CAC + ROAS đạt ngưỡng |
| Content Marketer | 70% cứng + 30% theo lead organic + engagement |
| TP MKT | 50% cứng + 50% theo tổng leads + CAC vs CCSD |
| TP Truyền thông | 70% cứng + 30% theo brand metrics |

**Quan trọng**: lương Sales **không khoán chỉ doanh thu** — phải gắn LTV (giữ retention 3 tháng) để tránh "gom deal rác".

---

## SAI LẦM THƯỜNG GẶP

1. **Đo quá nhiều KPI** (20+): không ai theo dõi được. Giữ tối đa 8-10 KPI vĩ mô.
2. **Đo chỉ vanity metrics**: lượt xem, follower → không gắn doanh thu.
3. **KPI không có ngưỡng**: "tăng leads" — tăng bao nhiêu là tốt?
4. **Không có dashboard real-time**: chờ kế toán đóng sổ → trễ 30 ngày.
5. **Không cài KPI vào lương**: nhân viên không có động lực thật.
6. **Đo nhưng không hành động**: dashboard đẹp mà không ai ra quyết định = lãng phí.

## Khi tư vấn

Hỏi:
1. Có dashboard tổng hợp KPI 3 phòng không?
2. Cập nhật bao lâu/lần?
3. KPI nào đang ngấp ngưỡng đèn đỏ?
4. KPI có cài vào lương không?

Nếu chưa có dashboard → **ưu tiên #1 là setup**. Có thể bắt đầu bằng Google Sheets, không cần tools đắt.
