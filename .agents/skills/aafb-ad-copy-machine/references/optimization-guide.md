# Optimization Guide — Đọc Số & Tối Ưu

## CÁCH ĐỌC SỐ LIỆU ĐÚNG

### Quy tắc đọc theo thứ tự:
```
CPM → CTR → CPC → Cost per Result
  ↓       ↓      ↓         ↓
Audience Content Content  Landing Page
problem  problem  weak     problem
```

**Đọc từ trái sang phải — vấn đề ở đâu thì fix ở đó.**

---

## CHẨN ĐOÁN VẤN ĐỀ THEO SỐ LIỆU

### CPM CAO (> 60k VND)
**Nguyên nhân:**
- Audience quá nhỏ/hẹp → cạnh tranh cao
- Thời điểm mùa vụ (Black Friday, Tết, mùa tựu trường)
- Tài khoản ads đang bị hạn chế chất lượng
- Content bị Facebook đánh giá thấp (low quality score)

**Giải pháp:**
- Mở rộng audience — bỏ bớt interest targeting
- Thử Advantage+ Audience
- Đổi sang chạy giờ thấp điểm (10pm–6am thường rẻ hơn)
- Cải thiện chất lượng content — tránh từ ngữ spam

---

### CTR THẤP (< 1.5%)
**Nguyên nhân:**
- Hook không đủ mạnh — content không relevant với audience
- Visual/thumbnail không thu hút
- Copy dài, khó đọc trên mobile

**Giải pháp:**
- Viết lại hook — thử 3 angle hoàn toàn khác nhau
- Đổi ảnh/video — thử ảnh người thật vs mockup vs text-only
- Rút ngắn 3 dòng đầu — phải đọc được trước "Xem thêm"
- Test video vs image — video thường có CTR cao hơn

---

### CTR TỐT NHƯNG KHÔNG CONVERT
**Nguyên nhân:** Vấn đề ở LANDING PAGE, không phải ads
- Trang load chậm (> 3 giây trên mobile)
- Headline trang không match với ad copy
- CTA không rõ ràng
- Thiếu trust signals (social proof, guarantee)

**Giải pháp:**
- Test tốc độ trang: pagespeed.web.dev
- Đảm bảo landing page "nói cùng ngôn ngữ" với ad
- Thêm testimonial, số liệu, bằng chứng xã hội
- Đơn giản hóa form (nếu có)

---

### COST PER MESSAGE CAO (> 40k VND)
**Nguyên nhân:**
- Ad copy không tạo đủ urgency để nhắn tin ngay
- Audience không phải người ra quyết định
- Tin nhắn chào tự động không engaging

**Giải pháp:**
- Thêm urgency: "Chỉ còn X slot tư vấn tuần này"
- Thêm incentive: "Nhắn tin ngay nhận tài liệu miễn phí"
- Test audience khác nhau (age range, gender)
- Cải thiện automated welcome message

---

## QUYẾT ĐỊNH TẮT HAY GIỮ

### Sau 3 ngày chạy, đánh giá từng ad:

```
ĐIỀU KIỆN TẮT AD:
✗ CTR < 1% VÀ không có bất kỳ kết quả nào
✗ CPM > 80k VÀ CTR < 1.5%
✗ Đã tiêu > 3× target CPA mà chưa có 1 kết quả

ĐIỀU KIỆN GIỮ (ĐANG TỐT):
✓ CTR > 2% và đang có kết quả
✓ Cost per result trong ngưỡng chấp nhận được
✓ Đang trong learning phase (chưa đủ 3 ngày)

ĐIỀU KIỆN THEO DÕI THÊM:
~ CTR 1.5–2% nhưng chưa có kết quả (có thể cần thêm thời gian)
~ Mới chạy ngày 1-2 (chưa đánh giá vội)
```

### Thời điểm tốt nhất để đánh giá:
- **Mỗi ngày:** 9–10 giờ tối (sau khi có đủ data trong ngày)
- **Đánh giá tổng:** Sáng ngày thứ 4 (sau 3 ngày đầy đủ)
- **Không:** Đánh giá buổi sáng ngày đầu tiên — dữ liệu chưa đủ

---

## TỐI ƯU CPM

**CPM phụ thuộc vào:**
1. **Chất lượng content** — Content tốt → Facebook phân phối rẻ hơn
2. **Audience size** — Càng rộng → CPM càng rẻ (đến ngưỡng nhất định)
3. **Thời điểm** — Tháng 11-12 đắt nhất, tháng 1-2 sau Tết rẻ hơn
4. **Tài khoản ads** — Tài khoản lâu năm, uy tín → CPM thấp hơn

**Cách giảm CPM:**
- Mở rộng audience (bỏ bớt targeting chi tiết)
- Cải thiện Relevance Score của content
- Chạy thêm engagement campaign trước để warm up content
- Test chạy đêm (10pm–6am) — ít cạnh tranh hơn

---

## TỐI ƯU THEO TỪNG MỤC TIÊU

### Traffic Campaign:
**Metric chính:** Cost per Landing Page View (không phải Link Click)
**Tối ưu:** Nếu CTR tốt nhưng LPV thấp → trang load chậm

### Messages Campaign:
**Metric chính:** Cost per Conversation Started
**Tối ưu:** Tắt ads không ra message sau 2 ngày; giữ ads ra > 1 message/50k chi phí

### Engagement Campaign:
**Metric chính:** Cost per Comment (không phải tổng engagement)
**Tối ưu:** Post có comment tự nhiên nhiều thì boost thêm — đừng boost post ế
