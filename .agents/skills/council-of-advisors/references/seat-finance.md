# 📊 Cố vấn Tài chính — Tài liệu chuyên môn

> Ghế Tài chính chịu trách nhiệm đánh giá tính khả thi về mặt tài chính: unit economics, điểm hòa vốn, dòng tiền, và tính hợp lý của budget. Tổng điểm tối đa: **20 điểm**.

---

## 1. Frameworks cốt lõi

### 1.1 David Skok — SaaS/Digital Business Metrics

**LTV/CAC Ratio — Chỉ số sống còn của digital business:**
- **CAC (Customer Acquisition Cost):** Tổng chi phí marketing + sales ÷ số khách hàng mới. Bao gồm: ad spend, salaries marketing team, tools, agency fees.
- **LTV (Lifetime Value):** Tổng doanh thu trung bình 1 khách hàng mang lại trong suốt vòng đời. Công thức đơn giản: ARPU × Average Lifespan (tháng). Ví dụ: khách trả 500K/tháng × 12 tháng = LTV 6 triệu.
- **Tỷ lệ LTV/CAC:**
  - < 1:1 → THUA LỖ — chi nhiều hơn thu, business đang chảy máu
  - 1:1 → HÒA VỐN — chỉ vừa đủ cover chi phí acquire, chưa tính overhead
  - 3:1 → HEALTHY — benchmark lý tưởng cho hầu hết digital business
  - > 5:1 → CÓ THỂ under-investing — có thể chi thêm marketing để grow nhanh hơn

Kiểm tra plan: đã tính CAC và LTV chưa? Tỷ lệ có ≥ 3:1 không?

**Payback Period — Thời gian hoàn vốn CAC:**
- Bao lâu để thu hồi chi phí acquire 1 khách hàng?
- Lý tưởng: < 12 tháng cho subscription business, < 1 tháng cho one-time purchase
- Payback period dài → cần nhiều vốn lưu động → cash flow pressure lớn

**Cohort Analysis — Phân tích nhóm khách hàng:**
- Nhóm khách hàng tháng 1 vs tháng 2 vs tháng 3: retention rate, spending pattern, churn rate khác nhau thế nào?
- Kiểm tra plan: có cơ chế track cohort không? Hay chỉ nhìn aggregate numbers?

**MRR/ARR — Doanh thu định kỳ:**
- **MRR (Monthly Recurring Revenue):** Doanh thu định kỳ hàng tháng — "nền" doanh thu ổn định
- **ARR (Annual Recurring Revenue):** MRR × 12 — dùng để valuation
- Kiểm tra plan: có revenue stream nào recurring không? Hay toàn one-time sales?

**Churn Rate — Tỷ lệ mất khách:**
- % khách hàng ngừng trả tiền mỗi tháng
- Acceptable: < 5%/tháng (tức retain được > 95%)
- Dangerous: > 10%/tháng → "xô thủng" — đổ khách vào mà chảy ra hết
- Kiểm tra plan: có chiến lược retention không? Hay chỉ focus acquire khách mới?

### 1.2 Aswath Damodaran — Valuation Basics

**DCF — Discounted Cash Flow (Dòng tiền chiết khấu):**
Giá trị business = tổng giá trị hiện tại của tất cả dòng tiền tương lai. Áp dụng vào plan:
- Dòng tiền dự kiến trong 12-36 tháng tới là bao nhiêu?
- Discount rate (tỷ lệ chiết khấu): 15-25% cho startup, 10-15% cho business ổn định
- Nếu plan tạo ra dòng tiền lớn + bền vững → giá trị business tăng đáng kể

**Revenue Multiples — So sánh với industry:**
- Edtech/Course: 2-5x annual revenue
- SaaS: 5-15x ARR
- Agency/Service: 1-3x annual revenue
- Ecommerce: 1-3x annual revenue
Kiểm tra: plan có tạo ra revenue structure cho phép valuation cao không?

**Growth Rate vs Profit Margin Tradeoff:**
- Giai đoạn tăng trưởng: chấp nhận margin thấp để grow nhanh (invest into marketing, team, product)
- Giai đoạn trưởng thành: tối ưu margin, giảm unnecessary spending
- Kiểm tra plan: đang ở giai đoạn nào? Growth hay profitability? Chiến lược có phù hợp giai đoạn?

### 1.3 Verne Harnish — Scaling Up (Cash Flow Focus)

**Power of One — 7 đòn bẩy cải thiện dòng tiền:**
Chỉ cần cải thiện MỖI yếu tố 1% → tác động tổng hợp rất lớn:
1. **Price:** Tăng giá 1% → impact trực tiếp lên margin
2. **Volume:** Tăng số lượng bán 1%
3. **COGS:** Giảm giá vốn 1%
4. **Operating Expenses:** Giảm chi phí vận hành 1%
5. **Accounts Receivable:** Thu tiền nhanh hơn 1 ngày
6. **Inventory/WIP:** Giảm hàng tồn/work-in-progress 1%
7. **Accounts Payable:** Kéo dài thời gian trả supplier 1 ngày

Kiểm tra plan: đã optimize 7 đòn bẩy này chưa? Đặc biệt là Price (nhiều business sợ tăng giá).

**Cash Conversion Cycle (CCC) — Chu kỳ chuyển đổi tiền:**
- Thời gian từ lúc BỎ TIỀN RA (chi phí) đến lúc THU TIỀN VỀ (doanh thu)
- CCC ngắn → ít cần vốn lưu động → business healthy
- CCC âm → thu tiền trước chi tiền → ideal (vd: bán khóa online, thu tiền ngay, chi phí chỉ là hosting)
- Kiểm tra plan: CCC là bao lâu? Có cách rút ngắn không?

**4 Decisions — 4 quyết định chiến lược:**
1. **People:** Đúng người ở đúng vị trí?
2. **Strategy:** Chiến lược có differentiated?
3. **Execution:** Thực thi có disciplined?
4. **Cash:** Dòng tiền có đủ fuel growth?

### 1.4 Thầy Ngô Minh Tuấn — BSC / Kiểm soát Tài chính

**BSC — Balanced Scorecard (Thẻ điểm cân bằng):**
4 viễn cảnh phải cân bằng — không được chỉ focus tài chính:

1. **Tài chính (Financial):** Doanh thu, lợi nhuận, ROI, cash flow
2. **Khách hàng (Customer):** Satisfaction, retention, NPS, market share
3. **Quy trình nội bộ (Internal Process):** Efficiency, quality, cycle time
4. **Học hỏi & Phát triển (Learning & Growth):** Employee satisfaction, training hours, innovation

Kiểm tra plan: có balance 4 viễn cảnh không? Hay chỉ focus revenue mà quên customer satisfaction + team development?

**Hạn mức quỹ lương:**
- Benchmark: quỹ lương KHÔNG VƯỢT 30% doanh thu
- Nếu > 30% → business đang "nuôi người" nhiều hơn "sinh lời"
- Nếu < 15% → có thể underpaying → retention risk
- Kiểm tra plan: chi phí nhân sự chiếm bao nhiêu % doanh thu dự kiến?

**Hạn mức chi phí vận hành:**
- Tổng chi phí vận hành (không tính COGS) nên < 30-40% doanh thu
- Marketing: 15-25% doanh thu (giai đoạn growth), 5-10% (giai đoạn ổn định)
- Admin/overhead: < 10% doanh thu
- Kiểm tra plan: cơ cấu chi phí có hợp lý so với benchmark?

**Điểm hòa vốn (Break-even):**
- Break-even Revenue = Tổng chi phí cố định ÷ (1 - Tỷ lệ chi phí biến đổi)
- Tính theo tháng: cần bao nhiêu doanh thu/tháng để cover toàn bộ chi phí?
- Kiểm tra plan: break-even point ở tháng thứ mấy? Có realistic không?

**Tỷ suất lợi nhuận/doanh thu:**
- Digital business (khóa học, SaaS, membership): benchmark 20-40% net profit margin
- Agency/Service: 15-25%
- Ecommerce (physical products): 10-20%
- Kiểm tra plan: profit margin dự kiến có đạt benchmark ngành?

**Luân chuyển tiền-hàng-tiền:**
- Vòng quay vốn: Tiền → Đầu tư (ads, sản phẩm) → Bán hàng → Thu tiền → Tiền
- Vòng quay càng nhanh → vốn càng hiệu quả
- Kiểm tra plan: vốn bỏ ra bao lâu thì quay về? Có bị "chôn vốn" ở đâu không?

---

## 2. Checklist đánh giá — 20 điểm

### Unit Economics (5 điểm)
| Điểm | Tiêu chí |
|------|----------|
| 5 | CAC, LTV, LTV/CAC đã tính đầy đủ. Tỷ lệ ≥ 3:1. Payback period hợp lý. Có data hoặc benchmark hỗ trợ. |
| 4 | Đã tính nhưng dựa trên giả định hợp lý. LTV/CAC 2:1 - 3:1. Chưa có data thực. |
| 3 | Có nhận thức về unit economics nhưng chưa tính cụ thể. Ước lượng sơ bộ. |
| 2 | Chỉ biết giá bán và chi phí ads. Chưa tính LTV, CAC dạng đầy đủ. |
| 1 | Không tính unit economics. "Bán được thì biết." |

### Break-even (5 điểm)
| Điểm | Tiêu chí |
|------|----------|
| 5 | Break-even point rõ ràng (tháng thứ mấy, cần bao nhiêu doanh thu/tháng). Realistic. Có sensitivity analysis (best/base/worst). |
| 4 | Đã tính break-even nhưng chỉ base case. Không có sensitivity analysis. |
| 3 | Ước lượng break-even nhưng chưa tính chi tiết. "Khoảng 3-6 tháng." |
| 2 | Chưa tính break-even. Chỉ nói "sẽ có lãi." |
| 1 | Không đề cập break-even. Hoặc break-even phi thực tế (vd: "lãi ngay tháng 1" với sản phẩm mới). |

### Cash Flow (5 điểm)
| Điểm | Tiêu chí |
|------|----------|
| 5 | Cash flow projection 3-6 tháng. Biết rõ: tiền đang có, tiền sẽ chi, tiền sẽ thu, cash runway. Có contingency fund. |
| 4 | Có cash flow overview nhưng chưa chi tiết tháng/tuần. Biết runway nhưng tight. |
| 3 | Biết tổng budget nhưng chưa project cash flow theo thời gian. |
| 2 | Budget mơ hồ. Không rõ cash runway. "Đủ tiền" nhưng không nói cụ thể. |
| 1 | Không đề cập cash flow. Hoặc rõ ràng không đủ tiền cho plan. |

### Budget Feasibility (5 điểm)
| Điểm | Tiêu chí |
|------|----------|
| 5 | Budget breakdown chi tiết: marketing, team, tools, ops. Có contingency 10-20%. Tổng budget phù hợp với scope plan. |
| 4 | Budget hợp lý nhưng tight. Contingency < 10%. Hoặc 1-2 hạng mục chưa rõ. |
| 3 | Có budget tổng nhưng chưa breakdown chi tiết. Không rõ phân bổ từng hạng mục. |
| 2 | Budget quá thấp so với scope. Hoặc quá cao mà không justify. |
| 1 | Không có budget. "Sẽ chi khi cần." |

---

## 3. Red Flags — Dấu hiệu nguy hiểm

- ❌ LTV/CAC < 1:1 → ĐANG MẤT TIỀN mỗi khách → Unit Economics tối đa 1đ, cảnh báo khẩn cấp
- ❌ Không có recurring revenue → phụ thuộc hoàn toàn vào new sales → ghi cảnh báo sustainability
- ❌ Cash runway < 3 tháng + plan cần 6 tháng → sẽ hết tiền trước khi thấy kết quả → Cash Flow tối đa 2đ
- ❌ Quỹ lương > 40% doanh thu → structure sai → ghi cảnh báo restructure
- ❌ Không có contingency budget → 1 rủi ro nhỏ = plan chết → Budget Feasibility trừ 2đ
- ❌ Revenue projection kiểu "hockey stick" không có evidence → Break-even tối đa 2đ
- ❌ Lẫn lộn revenue vs profit → chưa hiểu tài chính cơ bản → cần CEO bổ sung kiến thức
- ❌ Churn rate > 10%/tháng mà không có retention strategy → "xô thủng" → ghi cảnh báo
