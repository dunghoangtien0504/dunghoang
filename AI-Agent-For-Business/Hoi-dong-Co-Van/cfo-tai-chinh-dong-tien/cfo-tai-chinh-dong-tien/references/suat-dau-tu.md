# SUẤT ĐẦU TƯ & HIỆU QUẢ ĐẦU TƯ (NMT × Hormozi)

## Khi nào dùng

CFO bị hỏi 1 trong 5 câu sau:
1. *"Mình có nên đầu tư X tỷ vào dự án Y không?"*
2. *"Mở chi nhánh có lời không?"*
3. *"Mua máy móc / phần mềm này có đáng không?"*
4. *"M&A công ty X có nên?"*
5. *"Suất đầu tư của ngành mình bao nhiêu thì khỏe?"*

## Hai khái niệm cốt lõi

### Suất đầu tư (Investment Intensity)

```
Suất đầu tư = Tổng vốn đầu tư ban đầu ÷ Doanh thu kỳ vọng/năm
```

Đo *"đầu 1 đồng DT cần bao nhiêu đồng vốn"*.

### Hiệu quả đầu tư (Return on Investment)

```
ROI hàng năm = LN ròng/năm ÷ Vốn đầu tư ban đầu
```

Đo *"1 đồng vốn sinh bao nhiêu đồng lãi/năm"*.

## Benchmark suất đầu tư theo ngành (tham khảo NMT)

| Ngành | Suất đầu tư điển hình | ROI điển hình | Thời gian hoàn vốn |
|---|---|---|---|
| Sản xuất công nghiệp | 0.8-1.5 | 15-25% | 4-7 năm |
| Bán lẻ chuỗi | 0.5-1.0 | 20-35% | 3-5 năm |
| F&B (nhà hàng) | 0.3-0.7 | 25-50% | 2-4 năm |
| Dịch vụ B2C | 0.2-0.5 | 30-60% | 2-3 năm |
| SaaS / Tech | 0.1-0.3 | 50-200% | 1-2 năm (nếu PMF) |
| Bất động sản cho thuê | 5-15 | 5-10% | 10-20 năm |
| Xây dựng | 0.3-0.8 | 10-20% (biến động cao) | 3-5 năm |

**Nguyên tắc Hormozi**: nếu suất đầu tư > 1.5 và DN không có vốn dư → đừng làm. Tìm mô hình suất đầu tư < 0.5.

---

## QUY TRÌNH ĐÁNH GIÁ ĐẦU TƯ 5 BƯỚC (NMT)

### Bước 1 — Xác định Tổng vốn đầu tư

Liệt kê **mọi khoản chi** trước khi mở rộng:

| Nhóm | Ví dụ |
|---|---|
| Tài sản cố định | Mặt bằng, máy móc, nội thất, phần mềm |
| Tài sản vô hình | Thương hiệu, giấy phép, đào tạo |
| Vốn lưu động ban đầu | Tồn kho khởi đầu, đặt cọc |
| Chi phí chuẩn bị | Tuyển dụng, marketing ra mắt |
| Dự phòng | 10-20% tổng vốn |
| **TỔNG** | |

**Sai lầm**: bỏ quên vốn lưu động → 70% startup vỡ vì thiếu vốn lưu động, không phải vì thiếu vốn đầu tư.

### Bước 2 — Dự phóng Doanh thu & Lợi nhuận 5 năm

3 kịch bản:
- **Tệ** (xác suất 30%)
- **Cơ sở** (xác suất 50%)
- **Tốt** (xác suất 20%)

| Năm | Tệ | Cơ sở | Tốt |
|---|---|---|---|
| 1 | DT, LN | DT, LN | DT, LN |
| 2 | ... | ... | ... |
| 3 | ... | ... | ... |
| 4 | ... | ... | ... |
| 5 | ... | ... | ... |

**Dùng kịch bản Cơ sở** để quyết định. Kịch bản Tệ để kiểm tra DN có sống được không.

### Bước 3 — Tính 3 chỉ số quyết định

#### a) Payback Period (Thời gian hoàn vốn)

```
Payback = Số năm để LN tích lũy = Vốn đầu tư
```

| Payback | Đánh giá |
|---|---|
| < 2 năm | 🟢 Rất tốt |
| 2-4 năm | 🟢 Khỏe |
| 4-7 năm | 🟡 Bình thường (chấp nhận nếu có lợi thế cạnh tranh dài hạn) |
| > 7 năm | 🔴 Tránh trừ khi BĐS hoặc hạ tầng |

#### b) NPV (Net Present Value — Giá trị hiện tại ròng)

```
NPV = Σ (Dòng tiền năm n / (1+r)^n) - Vốn đầu tư
```

Với `r` = chi phí vốn (thường 15-25% ở VN tùy ngành).

- NPV > 0 → đầu tư có lợi
- NPV < 0 → đừng đầu tư

#### c) IRR (Internal Rate of Return — Tỷ suất hoàn vốn nội bộ)

IRR là r làm NPV = 0. So với:
- Chi phí vốn của bạn (lãi vay, kỳ vọng cổ đông)
- Cơ hội đầu tư khác

| IRR | Đánh giá |
|---|---|
| > 30% | 🟢 Rất hấp dẫn |
| 20-30% | 🟢 Tốt cho hầu hết DN VN |
| 15-20% | 🟡 Vừa đủ vượt chi phí vốn |
| < 15% | 🔴 Không đủ bù rủi ro |

### Bước 4 — Phân tích nhạy cảm (Sensitivity Analysis)

Hỏi: "Cái gì có thể làm dự án này hỏng?"

Thử 3 biến nhạy cảm nhất:
- DT giảm 20% → NPV còn dương không?
- Chi phí tăng 20% → còn lãi không?
- Hoàn vốn chậm 1 năm → còn ổn không?

Nếu **bất kỳ kịch bản nào** đẩy NPV âm và xác suất xảy ra >30% → **không đầu tư**.

### Bước 5 — Quyết định Go/No-Go

| Checklist | Yes/No |
|---|---|
| Payback ≤ ngưỡng ngành? | |
| NPV > 0 ở kịch bản Cơ sở? | |
| IRR > Chi phí vốn + 5% (margin of safety)? | |
| Sensitivity: chịu được sốc 20% các biến chính? | |
| DN hiện tại đủ tiền/credit để đầu tư mà không hi sinh vận hành cốt lõi? | |
| Có người (nhân sự) đủ năng lực để vận hành mở rộng? | |

**Cần 6/6 Yes** mới Go. 5/6 → suy nghĩ kỹ. 4/6 trở xuống → No-Go.

---

## VÍ DỤ THỰC: Mở chi nhánh quán cà phê mới

**Bối cảnh**: 3 quán đang hoạt động, doanh thu 150 tr/quán/tháng, biên LN ròng 8%.

### Bước 1: Vốn đầu tư mở quán 4
- Cọc mặt bằng 6 tháng: 90tr
- Decor: 250tr
- Máy móc: 180tr
- Nguyên liệu khởi đầu: 50tr
- Marketing ra mắt: 30tr
- Dự phòng 20%: 120tr
- **Tổng: 720tr**

### Bước 2: Dự phóng
| Năm | DT (kịch bản cơ sở) | LN ròng |
|---|---|---|
| 1 | 1.5 tỷ (ramp-up) | 60tr (4%) |
| 2 | 1.8 tỷ | 144tr (8%) |
| 3 | 1.8 tỷ | 144tr (8%) |
| 4 | 1.8 tỷ | 144tr (8%) |
| 5 | 1.8 tỷ | 144tr (8%) |

### Bước 3: Tính
- Payback: 720tr / 130tr trung bình = **5.5 năm** ← 🔴 dài cho F&B (chuẩn 2-4 năm)
- NPV (r=20%): khoảng -120tr ← 🔴 âm
- IRR: ~12% ← 🔴 dưới ngưỡng

### Bước 4: Sensitivity
- Nếu DT năm 1 chỉ đạt 1 tỷ (sốc 33%) → mất luôn 2 năm runway

### Bước 5: Quyết định
**No-Go**. Lý do: payback quá dài, NPV âm. Nguyên nhân gốc: biên LN 8% quá thấp cho ngành F&B.

**Gợi ý CFO**: ưu tiên **tăng biên gộp ở 3 quán hiện tại** lên 15% trước khi mở quán 4. Mỗi % biên cải thiện = giảm payback 6 tháng.

---

## Liên hệ Hormozi

Hormozi không dùng NPV/IRR (hơi học thuật) — ông dùng **CAC Payback ≤ 30 ngày** như "Suất đầu tư rút gọn":

> Nếu CAC payback ≤ 30 ngày → mỗi khách mới = đầu tư hoàn vốn 1 tháng → bạn có thể "đầu tư" vô hạn vào tăng trưởng.

Với DN nhỏ, dùng CAC payback **đơn giản hơn** NPV/IRR. Với dự án lớn (>500tr), bắt buộc dùng NPV/IRR.

---

## Liên hệ NMT — Cài vào CCSC

Mọi quyết định đầu tư phải:
1. **Không phá CCSC**: vốn đầu tư không được lấy từ vốn lưu động vận hành.
2. **Cập nhật CCSC sau đầu tư**: khấu hao mới, doanh thu mới, chi phí mới → CCSC v2.

---

## Sai lầm thường gặp

1. **Dự phóng quá lạc quan**: dùng kịch bản Tốt làm cơ sở → 90% startup vỡ vì đây.
2. **Bỏ quên vốn lưu động**: đủ tiền mở nhưng không đủ tiền vận hành 6 tháng → chết.
3. **Không có Sensitivity**: 1 biến lệch là vỡ kế hoạch.
4. **So sánh sai chi phí vốn**: dùng lãi vay 8% làm chiết khấu trong khi cổ đông kỳ vọng 25% → đánh giá sai.
5. **"Cảm tính tốt"**: "Linh tính tôi bảo nó sẽ work" — không phải đầu tư, là đánh bạc.

## Khi tư vấn

Hỏi:
1. Bạn đầu tư bao nhiêu? Lấy tiền từ đâu? (Quan trọng — quyết định chi phí vốn)
2. Dự phóng DT năm 1 dựa trên gì? (Phải có cơ sở, không phải "ước")
3. Nếu DT giảm 30%, bạn còn sống được không?
4. Bạn đã từng làm mô hình này chưa? (Lần đầu = rủi ro cao, payback yêu cầu ngắn hơn)
