# BỘ KPI CCO & DASHBOARD

## Triết lý đo lường

CCO chịu **3 nhóm chỉ số**:
1. **Sales metrics** (Chuyển đổi) — chốt được không?
2. **Retention metrics** (Giữ chân) — có LTV không?
3. **Channel metrics** (Kênh) — có scale được không?

Không đo Sales = không biết Sales rep giỏi hay dở.
Không đo Retention = mất LTV mà không biết.
Không đo Channel = không biết đại lý nào nuôi DN.

---

## BỘ KPI 3 NHÓM

### Nhóm 1 — SALES METRICS (Chuyển đổi)

| KPI | Định nghĩa | Ngưỡng tốt | Tần suất |
|---|---|---|---|
| **Win rate** | % SQL → Closed Won | > 25% (B2B) / > 30% (B2C) | Tuần |
| **Sales velocity** | Ngày trung bình Lead → Won | < 30 (B2C) / < 60 (B2B) | Tháng |
| **Pipeline value** | Tổng deal đang mở × weighted prob | > 3x DT tháng | Tuần |
| **Number of deals closed** | Số deal/tháng/rep | Theo target | Tháng |
| **AOV** | Doanh thu / khách | ≥ ngưỡng CCSD | Tháng |
| **Deal size (median)** | Median deal | Tăng dần | Tháng |
| **Conversion mỗi stage** | Lead→MQL→SQL→Discovery→Proposal→Won | Xem `pipeline-sales-script.md` | Tuần |

### Nhóm 2 — RETENTION METRICS (Giữ chân + LTV)

| KPI | Định nghĩa | Ngưỡng tốt | Tần suất |
|---|---|---|---|
| **Gross Churn** | % khách rời/tháng | < 3% (SaaS B2B), 5% (B2C), 8% (Consumer) | Tháng |
| **NRR (Net Revenue Retention)** | (MRR đầu + expansion - churn - downgrade)/MRR đầu | > 100%, xuất sắc 110-120% | Tháng |
| **LTV** | ARPU × biên gộp × tenure | ≥ 3x CAC | Tháng |
| **CAC Payback** | CAC ÷ (ARPU × biên gộp) | ≤ 30 ngày (Hormozi) | Tháng |
| **Renewal Rate** | % khách renew đúng hạn | > 80% | Tháng |
| **Expansion Revenue %** | Expansion / tổng MRR | > 10% | Tháng |
| **NPS** | Net Promoter Score | > +30 | Quý |
| **Health Score TB** | Điểm sức khỏe TB khách | > 70 | Tháng |
| **Time to First Value** | Onboarding → first win | < 7 ngày | Tháng |

### Nhóm 3 — CHANNEL METRICS (Kênh phân phối)

| KPI | Định nghĩa | Ngưỡng tốt | Tần suất |
|---|---|---|---|
| **Số đại lý active** | Đại lý có mua trong 30 ngày | > 70% tổng đại lý | Tháng |
| **DT/đại lý TB** | | Tăng dần | Tháng |
| **Số SKU active/đại lý** | SP bán đều | > 70% danh mục | Tháng |
| **DIO đại lý** | Ngày tồn kho đại lý | < 30 | Tháng |
| **Công nợ quá hạn** | % công nợ > 30 ngày | < 5% | Tuần |
| **Điểm bán mới/quý** | Mở thêm | Theo target | Quý |
| **Trưng bày POSM tuân thủ** | Audit thị trường | > 80% | Quý |
| **DT theo kênh** | % mỗi kênh (D2C/GT/MT/Chuỗi) | Theo CCSD | Tháng |

---

## DASHBOARD CCO — TEMPLATE

```
┌─────────────────────────────────────────────────────────┐
│ DASHBOARD CCO – Tuần [N] – [Tên DN]                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📈 THÁNG NÀY                                            │
│ • DT thực tế: [số] / Target [số] ([%])                 │
│ • Khách mới: [số] / Renewals: [số]                     │
│ • AOV: [số] / Target [số]                               │
│                                                         │
│ 🎯 3 TRỤ CỘT                                            │
│ [Chuyển đổi]  [Giữ chân]    [Kênh]                     │
│ Win [%]        Churn [%]     Active dealer [số]        │
│ [🟢]           [🟡]          [🟢]                       │
│                                                         │
│ 💰 SALES PIPELINE                                       │
│ MQL: [N] → SQL: [N] → Disc: [N] → Prop: [N] → Neg: [N] │
│ Pipeline value: [VND]                                  │
│                                                         │
│ 💎 RETENTION                                            │
│ NRR: [%] | LTV: [số] | CAC Payback: [ngày]            │
│ Health Score TB: [số] | NPS: [±X]                      │
│ Khách at-risk (health < 40): [số]                      │
│                                                         │
│ 🌐 KÊNH (nếu có GT)                                     │
│ Đại lý active: [%] | DT top 10 đại lý: [số]            │
│ Công nợ quá hạn: [%]                                    │
│                                                         │
│ ⚠️  ĐÈN ĐỎ                                              │
│ • [Deal X] Negotiation 21 ngày                          │
│ • [Khách Y] health score tụt dốc                        │
│ • [Đại lý Z] không active 45 ngày                       │
│                                                         │
│ 🤝 FEEDBACK CHO CMO                                     │
│ SQL rate tuần: [%]                                     │
│ Lead quality: [1 dòng]                                 │
│                                                         │
│ ✅ HÀNH ĐỘNG TUẦN SAU                                   │
│ 1. ...                                                  │
│ 2. ...                                                  │
└─────────────────────────────────────────────────────────┘
```

---

## NGƯỠNG ĐÈN ĐỎ — TRIGGER CCO HÀNH ĐỘNG

| Triệu chứng | Ngưỡng | Hành động |
|---|---|---|
| Win rate < 20% | 1 tháng | Audit script + đào tạo lại Sales |
| Pipeline aged > 30% (deal > 60 ngày) | 1 tuần | Khử pipeline cũ |
| Sales velocity tăng 50% | 1 tháng | Có bottleneck ở stage nào? |
| Churn > 5% (SaaS B2B) | 1 tháng | Emergency CS campaign |
| NRR < 95% | 1 tháng | Không expansion đủ bù churn |
| AOV giảm > 15% YoY | 1 tháng | Audit Money Model (Upsell yếu?) |
| Đại lý active rate < 60% | 1 tháng | Chương trình kích hoạt lại |
| Công nợ quá hạn > 8% | 1 tuần | Thu công nợ + audit chính sách |
| SQL rate từ CMO < 25% | 2 tuần | Meeting CMO về lead quality |

---

## REPORTING CADENCE

| Tần suất | Ai họp | Nội dung |
|---|---|---|
| **Hàng ngày** | Stand-up Sales team | Deal nóng, pipeline update |
| **Hàng tuần** | CCO + 3 TP (Sales/CS/GT) | Review dashboard, kê toa tuần |
| **Hàng tuần** | CCO + CMO | Feedback loop lead quality |
| **Hàng tháng** | CEO + CCO | Báo cáo vs CCSD |
| **Hàng quý** | HĐQT | Retention + kênh + kế hoạch quý sau |

---

## CÀI KPI VÀO LƯƠNG (Phối hợp với CHRO)

| Vị trí | Cấu trúc lương đề xuất |
|---|---|
| Sales Rep | 30% cứng + 70% khoán DT + retention 3 tháng |
| TP Sales | 50% cứng + 50% team revenue + team win rate |
| CSM | 60% cứng + 40% NRR + expansion |
| Head of CS | 50% cứng + 50% NRR + churn team |
| Sales Rep GT | 40% cứng + 60% đại lý active + DT đại lý |
| CCO | 40% cứng + 60% khoán LN bộ phận (theo CCSC) |

**Chi tiết** ở skill CHRO — nhưng CCO phải chốt khung trước, CHRO chỉ hoàn thiện.

---

## SAI LẦM THƯỜNG GẶP

1. **Đo quá nhiều KPI** (20+): không action được.
2. **Chỉ đo Sales, quên Retention**: mất LTV.
3. **Trung bình che giấu**: 1 rep giỏi + 5 rep dở = trung bình OK.
4. **Không có Health Score**: churn khi đã muộn.
5. **Đo mà không action**: dashboard đẹp, không ra quyết định.
6. **Không có feedback CMO**: chiến tranh nội bộ.
7. **KPI không link lương**: nhân viên không có động lực thật.

## Khi tư vấn

Hỏi:
1. Có dashboard tổng 3 nhóm KPI chưa?
2. NRR và Churn tính đến tháng gần nhất?
3. Có feedback loop CMO ↔ CCO hàng tuần?
4. KPI có cài vào lương chưa?

Nếu chưa có Health Score + feedback loop → **ưu tiên #1**. Không đo = quản mù.
