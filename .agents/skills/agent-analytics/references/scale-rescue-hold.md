# 🎯 Framework Scale / Rescue / Hold

> Framework này giúp Agent Analytics đề xuất phương án hành động phù hợp với từng trạng thái kinh doanh.
> Mỗi phương án có: điều kiện áp dụng, hành động cụ thể, KPI theo dõi, timeline, rủi ro, và nguồn lực cần.
> **Quy tắc:** Luôn đọc file này TRƯỚC khi đề xuất. Không tự nghĩ ra actions.

---

## 🚀 SCALE — Tăng tốc & Mở rộng

### Khi nào áp dụng
- Trạng thái 🟢 **Vượt target bền vững** → Scale mạnh
- Trạng thái 🟡 **Đúng target** → Scale thận trọng (test nhỏ trước)
- **KHÔNG BAO GIỜ** áp dụng khi 🔴 Khủng hoảng hoặc ⚠️ Có warning signs chưa giải quyết

### Điều kiện tiên quyết để Scale
- [ ] Profit margin > 20% (hoặc > benchmark ngành)
- [ ] CAC ổn định hoặc giảm trong 2+ kỳ liên tiếp
- [ ] LTV/CAC > 3
- [ ] Conversion rate ổn định hoặc tăng
- [ ] Team có capacity xử lý thêm volume
- [ ] Cash flow đủ cho ít nhất 2 tháng nếu scale thất bại

> **Nếu chưa đủ tất cả điều kiện:** Đề xuất Scale thận trọng (tăng 20% thay vì 50%) hoặc Hold + prepare.

### Hành động cụ thể

1. **Tăng budget quảng cáo có hệ thống**
   - Tăng 20-30% / tuần cho kênh đang hiệu quả nhất
   - Không tăng đột ngột 100% — algorithm cần thời gian học
   - Monitor CAC hàng ngày trong 7 ngày đầu sau khi tăng
   - Nếu CAC tăng > 15% → dừng tăng, quay về budget cũ

2. **Mở rộng audience**
   - Test 2-3 audience mới mỗi tuần (Lookalike, Interest-based, Broad)
   - Giữ budget test riêng (10-15% tổng budget) — không dùng budget core
   - Audience nào có CAC < benchmark sau 100+ impressions → scale

3. **Đa dạng hóa kênh**
   - Nếu đang chỉ chạy Facebook → test Google Ads, TikTok, YouTube
   - Mỗi kênh mới: test 2-4 tuần với budget nhỏ trước
   - Mục tiêu: không phụ thuộc > 70% vào 1 kênh duy nhất

4. **Tối ưu funnel cho volume lớn**
   - Kiểm tra landing page có handle được traffic x2-x3 không
   - Chuẩn bị email automation cho volume leads tăng
   - Set up retargeting cho leads không convert ngay

5. **Mở rộng product line**
   - Thêm upsell / cross-sell cho khách hàng hiện tại
   - Test offer mới cho segment chưa khai thác
   - Tăng LTV bằng continuity offer (subscription, membership)

6. **Scale team song song**
   - Tuyển/đào tạo trước khi đơn hàng overwhelm
   - Outsource những việc có thể (fulfillment, support)
   - Document SOP cho mọi quy trình core

7. **Đặt circuit breaker**
   - Set tripwire: nếu CAC > X hoặc margin < Y% → tự động dừng scale
   - Review weekly trong 4 tuần đầu scale
   - Sẵn sàng quay về budget cũ bất cứ lúc nào

### KPI cần theo dõi khi Scale
| KPI | Tần suất | Red flag |
|-----|----------|----------|
| CAC | Hàng ngày | Tăng > 15% so với baseline |
| ROAS | Hàng ngày | Giảm > 20% |
| Profit margin | Hàng tuần | Giảm > 5 percentage points |
| Conversion rate | Hàng tuần | Giảm > 1 percentage point |
| LTV/CAC | Hàng tháng | Giảm xuống < 3 |
| Cash flow | Hàng tuần | Âm 2 tuần liên tiếp |

### Timeline thực hiện
- **Tuần 1-2:** Tăng budget 20% kênh chính, bắt đầu test audience mới
- **Tuần 3-4:** Đánh giá kết quả, nếu ổn → tăng thêm 20%, test kênh phụ
- **Tháng 2:** Mở rộng product line, tuyển thêm team
- **Tháng 3:** Full scale mode — tất cả kênh chạy, team đầy đủ

### Rủi ro của Scale
- **CAC inflation:** Scale quá nhanh khiến CAC tăng vọt, ăn mòn profit
- **Quality giảm:** Volume tăng nhưng chất lượng sản phẩm/dịch vụ giảm → churn tăng
- **Cash flow crunch:** Chi trước thu sau — cần vốn lưu động đủ lớn
- **Team burnout:** Scale revenue mà không scale team → kiệt sức
- **Platform dependency:** Scale trên 1 platform → rủi ro nếu bị ban/thay đổi thuật toán

### Nguồn lực cần
- **Tiền:** Budget ads tăng 50-100%, buffer cash 2 tháng operating cost
- **Người:** Có thể cần 1-2 người thêm (ads, CS, fulfillment)
- **Thời gian:** CEO dành 5-10 giờ/tuần monitor scale metrics
- **Công nghệ:** Automation tools, CRM đủ capacity, analytics dashboard

---

## 🛟 RESCUE — Cứu hộ & Phục hồi

### Khi nào áp dụng
- Trạng thái 🔴 **Khủng hoảng** → Rescue khẩn cấp
- Trạng thái ⚠️ **Vượt có warning** → Rescue nhẹ (preventive)
- Trạng thái 🟠 **Dưới target** đã 3+ kỳ liên tiếp không cải thiện → Rescue

### Phân loại mức độ Rescue

**Rescue cấp 1 — Preventive (Phòng ngừa):**
- Áp dụng khi: ⚠️ Warning signs hoặc 🟠 Dưới target lâu
- Mức độ: Điều chỉnh, tối ưu — không cần thay đổi lớn
- Tâm thế: "Sửa trước khi hỏng"

**Rescue cấp 2 — Corrective (Sửa chữa):**
- Áp dụng khi: 🔴 Khủng hoảng nhưng còn runway > 2 tháng
- Mức độ: Thay đổi đáng kể strategy/execution
- Tâm thế: "Đang hỏng, cần sửa nhanh"

**Rescue cấp 3 — Emergency (Khẩn cấp):**
- Áp dụng khi: 🔴 Khủng hoảng + runway < 2 tháng
- Mức độ: Cắt giảm mạnh, pivot nếu cần
- Tâm thế: "Tồn tại trước, phát triển sau"

### Hành động cụ thể

1. **Audit toàn bộ chi phí — cắt ngay cái không cần thiết**
   - List tất cả khoản chi → phân loại: Essential / Nice-to-have / Cut
   - Cắt ngay khoản "Cut" — không chờ đợi
   - Khoản "Nice-to-have" → giữ 1 tháng, nếu không improve metrics → cắt
   - Mục tiêu: giảm burn rate 20-40% trong 2 tuần

2. **Pause ads không hiệu quả**
   - Tắt ngay ads có CAC > 2x target
   - Giảm budget ads có CAC > 1.5x target
   - Giữ nguyên ads có CAC < target
   - Reallocate budget từ kênh kém → kênh tốt

3. **Sửa funnel — tập trung vào conversion**
   - Phân tích drop-off: khách rời ở bước nào nhiều nhất?
   - Sửa bước có drop-off cao nhất TRƯỚC
   - Test headline/offer/CTA mới — cải thiện 1% conversion có thể thay đổi cục diện
   - Đơn giản hóa: bớt bước, bớt form field, bớt friction

4. **Activate khách hàng hiện tại**
   - Email sequence cho khách cũ chưa mua lại
   - Offer đặc biệt cho khách trung thành
   - Upsell / cross-sell cho khách đang hài lòng
   - Hỏi referral — khách hàng hài lòng là kênh marketing rẻ nhất

5. **Điều chỉnh offer/pricing**
   - Offer hiện tại có còn hấp dẫn? So sánh với đối thủ
   - Test giá mới (tăng hoặc giảm — cả hai đều có thể cải thiện)
   - Thêm bonus/guarantee để giảm rủi ro cho khách
   - Bundle sản phẩm để tăng perceived value

6. **Thu thập feedback khách hàng**
   - Hỏi 10-20 khách hàng gần nhất: tại sao mua? Gần bỏ lúc nào?
   - Hỏi 5-10 leads không convert: tại sao không mua?
   - Data định tính này giúp hiểu root cause mà số liệu không nói được

7. **Set weekly war room**
   - Họp 30 phút mỗi tuần review rescue metrics
   - Mỗi tuần 1 action item rõ ràng
   - Nếu 4 tuần không cải thiện → xét pivot

### KPI cần theo dõi khi Rescue
| KPI | Tần suất | Mục tiêu |
|-----|----------|----------|
| Burn rate | Hàng tuần | Giảm 20-40% |
| CAC | Hàng ngày | Quay về baseline |
| Conversion rate | Hàng tuần | Tăng ít nhất 0.5pp |
| Revenue | Hàng tuần | Ngừng giảm → stabilize |
| Runway | Hàng tuần | Duy trì > 3 tháng |
| Churn rate | Hàng tuần | Giảm hoặc ổn định |

### Timeline thực hiện
- **Ngày 1-3:** Audit chi phí, pause ads kém, list quick wins
- **Tuần 1:** Cắt chi phí không cần, reallocate budget ads, bắt đầu sửa funnel
- **Tuần 2:** Test offer/pricing mới, activate khách cũ, thu thập feedback
- **Tuần 3-4:** Đánh giá: bleeding có dừng không? Metrics có stabilize không?
- **Tháng 2:** Nếu stable → chuyển sang Hold. Nếu vẫn giảm → xét pivot/exit.

### Rủi ro của Rescue
- **Cắt quá mạnh:** Cắt cả kênh đang work → mất momentum
- **Panic decision:** Quyết định vội vàng dựa trên 1 tuần data xấu
- **Ignore root cause:** Chỉ cắt chi phí mà không sửa nguyên nhân gốc
- **Overreact:** Vấn đề chỉ là seasonal dip nhưng phản ứng như khủng hoảng

### Nguồn lực cần
- **Tiền:** Buffer cash ít nhất 2-3 tháng operating cost
- **Thời gian CEO:** 10-15 giờ/tuần — Rescue đòi hỏi CEO hands-on
- **Data:** Cần Agent Data cung cấp data chi tiết hơn bình thường
- **Tâm lý:** CEO cần tỉnh táo, không hoảng — quyết định dựa trên data

---

## ⏸️ HOLD — Giữ nguyên & Quan sát

### Khi nào áp dụng
- Trạng thái 🟡 **Đúng target** → Hold + explore nhỏ
- Trạng thái 🟠 **Dưới target** nhưng mới 1 kỳ → Hold + monitor
- Sau khi **Rescue thành công** → Hold để stabilize trước khi Scale
- Khi **data chưa đủ** để quyết định Scale hay Rescue → Hold + thu thập thêm

### Triết lý Hold
Hold KHÔNG có nghĩa là "không làm gì". Hold nghĩa là:
- Giữ nguyên strategy đang chạy
- Không tăng/giảm budget đáng kể
- Tập trung optimize cái hiện có thay vì mở rộng cái mới
- Thu thập thêm data để ra quyết định tốt hơn

### Hành động cụ thể

1. **Duy trì hoạt động hiện tại**
   - Giữ nguyên budget ads ± 10%
   - Giữ nguyên team size
   - Giữ nguyên product line
   - Không launch sản phẩm/campaign lớn mới

2. **Optimize cái đang có**
   - A/B test ads creative (copy, hình, video) — cải thiện dần
   - Optimize landing page: load speed, copy, CTA
   - Cải thiện email sequence: open rate, click rate
   - Tối ưu quy trình fulfillment: giảm thời gian, giảm chi phí

3. **Thu thập data để ra quyết định**
   - Chạy thêm 2-4 tuần để có đủ data so sánh
   - Test nhỏ (5-10% budget) ý tưởng mới trước khi commit
   - Survey khách hàng để hiểu sâu hơn
   - Benchmark với competitors — mình đang ở đâu?

4. **Build systems & processes**
   - Document SOP cho mọi quy trình
   - Setup automation (email, reporting, fulfillment)
   - Train team — nâng skill để sẵn sàng khi Scale
   - Build content asset (blog, video, social) — long-term investment

5. **Chuẩn bị cho bước tiếp theo**
   - Nếu data tốt lên → chuẩn bị Scale plan
   - Nếu data xấu đi → chuẩn bị Rescue plan
   - Có sẵn cả 2 kịch bản — không bị surprise

6. **Set review checkpoint**
   - Sau 2 tuần: mini review — đang đi đúng hướng?
   - Sau 4 tuần: full review — chuyển sang Scale, tiếp Hold, hay Rescue?
   - Tripwire metrics: nếu X xảy ra → tự động chuyển sang Y

7. **Strengthen fundamentals**
   - Xây dựng brand awareness (content marketing, PR)
   - Phát triển community / email list
   - Cải thiện product quality dựa trên feedback
   - Xây dựng strategic partnerships

### KPI cần theo dõi khi Hold
| KPI | Tần suất | Mong đợi |
|-----|----------|----------|
| Revenue | Hàng tuần | Ổn định ± 10% |
| CAC | Hàng tuần | Ổn định hoặc giảm nhẹ |
| Conversion rate | Hàng tuần | Ổn định hoặc tăng nhẹ |
| Profit margin | Hàng tháng | Ổn định hoặc tăng |
| NPS / Customer satisfaction | Hàng tháng | Tăng |
| Content metrics | Hàng tháng | Tăng (SEO, social engagement) |

### Timeline thực hiện
- **Tuần 1-2:** Duy trì hiện tại, bắt đầu optimize, thu thập data
- **Tuần 3-4:** Full review — data nói gì? Scale hay Rescue?
- **Nếu tiếp tục Hold:** Repeat cycle, review mỗi 2 tuần
- **Hold tối đa 8 tuần** — sau đó PHẢI quyết định Scale hoặc Rescue

### Rủi ro của Hold
- **Quá lâu:** Hold quá lâu mà không quyết → mất cơ hội Scale, hoặc chậm Rescue
- **Complacency:** "Đang ổn" → lười optimize → dần dần tụt
- **Competitor gap:** Đối thủ đang Scale trong khi mình Hold → mất thị phần
- **Team boredom:** Team không có challenge mới → mất motivation

### Nguồn lực cần
- **Tiền:** Duy trì budget hiện tại, không cần thêm
- **Thời gian CEO:** 3-5 giờ/tuần — monitor + optimize
- **Data:** Agent Data cung cấp báo cáo đều đặn để so sánh
- **Kiên nhẫn:** Không phải lúc nào cũng cần hành động lớn

---

## 📐 Bảng tổng hợp 3 phương án

| Tiêu chí | 🚀 Scale | 🛟 Rescue | ⏸️ Hold |
|----------|----------|----------|---------|
| **Khi nào** | 🟢🟡 | 🔴⚠️🟠(lâu) | 🟡🟠(mới)⬅️Rescue |
| **Tâm thế** | Tấn công | Phòng thủ | Quan sát |
| **Budget** | Tăng 50-100% | Giảm 20-40% | Giữ nguyên |
| **Focus** | Mở rộng | Sửa chữa | Tối ưu |
| **Timeline** | 1-3 tháng | 2-4 tuần | 2-8 tuần |
| **Rủi ro chính** | Overextend | Cắt quá mạnh | Chậm chân |
| **CEO time** | 5-10h/tuần | 10-15h/tuần | 3-5h/tuần |

---

## 🔄 Chuyển đổi giữa các phương án

```
🟢 Vượt bền → SCALE
   ↓ (nếu CAC tăng, margin giảm)
⚠️ Vượt có warning → HOLD (optimize) hoặc RESCUE nhẹ
   ↓ (nếu tiếp tục xấu)
🔴 Khủng hoảng → RESCUE mạnh
   ↓ (nếu stabilize)
🟠 Dưới target → HOLD (monitor)
   ↓ (nếu cải thiện)
🟡 Đúng target → HOLD (explore) hoặc SCALE thận trọng
   ↓ (nếu vượt bền)
🟢 Vượt bền → SCALE (vòng lại)
```

> **Nguyên tắc:** Không nhảy từ 🔴 → Scale. Phải qua Hold trung gian để stabilize trước.
> **Nguyên tắc:** Khi chuyển phương án → báo CEO rõ ràng lý do chuyển.
