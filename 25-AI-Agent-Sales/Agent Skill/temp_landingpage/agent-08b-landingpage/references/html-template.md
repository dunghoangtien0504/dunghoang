# HTML Template — Skeleton + Design System

Đọc ở BƯỚC 4 khi xuất HTML. File này có: skeleton 15 section, Design System, quy tắc UX behavioral, và checklist kỹ thuật.

---

## Design System (mặc định Wepower — dark theme)

```css
:root {
  --bg:    #08080F;   /* nền chính — gần đen */
  --bg2:   #11111C;   /* nền section xen kẽ */
  --gold:  #D4A843;   /* màu nhấn chính — prestige */
  --green: #4CAF82;   /* trust · success · CTA phụ */
  --red:   #E05C5C;   /* urgency · scarcity · CTA chính */
  --text:  #EDEDF0;   /* body text */
  --muted: #9A9AA8;   /* text phụ */
}
```

**Font:**
- Display/Heading: `Be Vietnam Pro` hoặc `Sora` — weight 800/700/600.
- Body: `Be Vietnam Pro` 400/500.
- Điểm nhấn cảm xúc (quote, em): `Playfair Display italic`.
- Load qua Google Fonts.

**CTA:** 16-18px · weight 700 · ≥48×48px · màu TƯƠNG PHẢN nền (gold hoặc red trên nền đen).

**Nếu người dùng có brand color riêng** → thay `--gold`/`--green`/`--red` bằng bộ màu của họ, giữ nguyên nguyên tắc: 1 màu CTA tương phản mạnh nhất, nền tối để text nổi.

> Lưu ý chống "AI-generated look": Wepower mặc định là near-black + 1 accent — đây là 1 trong 3 default mà AI hay rơi vào. Nếu người dùng KHÔNG yêu cầu cụ thể dark theme, cân nhắc đề xuất bộ màu gắn với ngành/thương hiệu của họ để trang có bản sắc riêng thay vì trông như mọi landing page khác.

---

## Behavioral UX (Section 7 Wepower)

### F/Z Pattern
- **Z-Pattern (hero):** [BADGE] ← [HEADLINE] ↘ [SUB] ↙ [CTA]. Mắt quét hình chữ Z.
- **F-Pattern (nhiều text):** 2 dòng đầu đọc đầy đủ, sau đó chỉ quét cột trái → đặt thông tin quan trọng nhất bên trái.

### Scroll Depth → CTA placement
```
0%   Hero CTA   → hot buyer quyết ngay (L1)
30%  Pain CTA   → emotional buyer (L2)
55%  Value CTA  → logical buyer (L3)
75%  Price CTA  → ready buyer (L4)
95%  Final CTA  → last chance (L5)
∞    Sticky Bar → any time buyer
```

### Thumb Zone (mobile)
```
[Top 1/3]  ← khó với ngón cái — TRÁNH đặt CTA
[Mid 1/3]  ← THUMB ZONE — ĐẶT CTA Ở ĐÂY
[Bot 1/3]  ← cũng khó — tránh CTA (trừ sticky bar)
```

---

## Skeleton 15 Section (thứ tự cố định)

```html
<!-- [0] ANNOUNCEMENT BAR — B.12 Scarcity -->
<div class="announce-bar">
  🔥 [Scarcity thật: còn N suất / deadline đếm ngược tới phút]
</div>

<!-- [1] HERO — B.1 Headline + B.2 Sub + CTA L1 (Z-pattern) -->
<section class="hero">
  <span class="badge">[Eyebrow/badge ngắn]</span>
  <h1>[Headline SCPU]</h1>
  <p class="sub">[Sub headline EAS 14-25 từ]</p>
  <a class="cta cta-primary" href="#dangky">Xem Chi Tiết Chương Trình →</a>
  <!-- DISC: D (số liệu, ngắn, CTA mạnh) -->
</section>

<!-- [2] TRUST BAR — B.4 Authority đặt sớm -->
<section class="trust-bar">
  [Logo media / con số khách / năm kinh nghiệm — social proof số lượng]
</section>

<!-- [3] PAIN — B.3 Pain 3 lớp + CTA L2 -->
<section class="pain">
  <h2>[Câu nhận diện pain]</h2>
  <!-- Lớp 1 Symptom: triệu chứng hàng ngày -->
  <!-- Lớp 2 Consequence: hậu quả 3-6-12 tháng -->
  <!-- Lớp 3 Identity: đã thành kiểu người gì -->
  <!-- NLP: Pacing&Leading + Negative Future Pacing + Sensory -->
  <a class="cta cta-secondary" href="#dangky">Tôi Muốn Thay Đổi — Bắt Đầu Ngay →</a>
</section>

<!-- [4] SOLUTION BRIDGE + VSL — B.5 Story 7 thành phần A→G -->
<section class="bridge">
  <!-- Chỗ nhúng video VSL (nếu có) -->
  <!-- Story A→G: Mong muốn→Hiện tại→Khó khăn→Mentor→Hành động→Kết quả(≥3 số)→Vươn cao -->
  <!-- NLP: Embedded Command + Open Loop -->
  <!-- DISC: I (cảm xúc, nhân vật thật) -->
</section>

<!-- [5] HOW IT WORKS — B.8 Clarity 5 phần -->
<section class="how">
  <h2>Cách hoạt động</h2>
  <!-- X là gì / cho ai / làm được gì / không phải gì / có gì bên trong -->
  <!-- DISC: S (step-by-step rõ ràng) -->
</section>

<!-- [6] FEATURES / INSIDE — B.6 FAB + 4 lớp benefit -->
<section class="features">
  <!-- Mỗi feature: Feature → Advantage → Benefit -->
  <!-- 4 lớp: Functional → Emotional → Social → Identity -->
</section>

<!-- [7] EMOTION — B.7 4 hormone + 5 kỹ thuật -->
<section class="emotion">
  <!-- Vivid imagery + Sensory + Future pacing + Emotional contrast -->
  <!-- Dopamine/Oxytocin/Serotonin/Endorphin -->
</section>

<!-- [8] AUTHORITY STACK — B.4 Authority sâu -->
<section class="authority">
  <!-- 7 nguồn + 5 dòng vàng (dòng 5 = why-matters) -->
  <!-- DISC: C (credentials verify được) -->
</section>

<!-- [9] VALUE STACK + PRICING — B.9 + B.13 + CTA L3/L4 -->
<section class="pricing" id="dangky">
  <!-- NLP: Open Loop trước reveal giá -->
  <!-- Value Stack: items + bonus + tổng giá trị + đầu tư (3-10%) -->
  <!-- 3-Tier Decoy: Gói 2 ★ target -->
  <!-- Số lẻ: 48.868.000đ -->
  <!-- Payment: QR/CK/VNPay/MoMo + security badge + Zalo -->
  <a class="cta cta-primary" href="#checkout">Đăng Ký Ngay — Còn [N] Suất →</a>
  <!-- DISC: C (số liệu) + D (CTA mạnh) -->
</section>

<!-- [10] GUARANTEE — B.10 Risk Reversal 4 cấp -->
<section class="guarantee">
  <!-- Guarantee đặt tên + điều kiện rõ ràng -->
  <!-- DISC: S (đảm bảo nổi bật) -->
</section>

<!-- [11] IS FOR / NOT FOR — B.8 Clarity "not for whom" -->
<section class="isfor">
  <div class="for">DÀNH CHO: [3-5 chân dung]</div>
  <div class="notfor">KHÔNG DÀNH CHO: [dám đóng cửa]</div>
</section>

<!-- [12] FAQ — B.10 7 Objection + A.R.E.B -->
<section class="faq">
  <!-- 7 objection, mỗi cái A.R.E.B 80-150 từ, accordion -->
  <!-- DISC: S (FAQ đầy đủ) -->
</section>

<!-- [13] TESTIMONIAL + CTA L5 — B.15 + B.16 -->
<section class="testimonial-cta">
  <!-- Testimonial SÁT CTA: 3 loại (kết quả nhanh / transformation / vượt nghi ngờ) -->
  <!-- ★★★★★ + quote + ảnh + tên + chức danh + kết quả đo -->
  <!-- NLP: Social Currency -->
  <a class="cta cta-primary" href="#checkout">Quyết Định Hôm Nay — Thay Đổi Cả Năm →</a>
  <!-- DISC: I (social proof) -->
</section>

<!-- [14] FOOTER -->
<footer>
  [Payment logos · VAT/MST · điều khoản · Zalo float]
</footer>

<!-- STICKY CTA BAR — luôn hiển thị -->
<div class="sticky-cta">
  <span>Còn [N] suất</span>
  <a class="cta cta-primary" href="#dangky">Giữ Chỗ Cho Tôi →</a>
</div>

<!-- ZALO FLOAT — góc phải dưới -->
<a class="zalo-float" href="https://zalo.me/[số]">Zalo</a>
```

---

## Quy tắc kỹ thuật khi viết code

- **1 file HTML duy nhất** — CSS trong `<style>`, JS trong `<script>` cùng file. Dễ deploy.
- **Mobile-first:** viết CSS mobile trước, `@media (min-width)` cho desktop.
- **Fade-up animation:** dùng IntersectionObserver, mỗi section fade + slide-up khi vào viewport. Wrap trong `@media (prefers-reduced-motion: no-preference)`.
- **Sticky bar:** `position: fixed; bottom: 0` — hiện sau khi cuộn qua hero (JS toggle).
- **Countdown thật:** nếu có deadline → JS đếm ngược tới ngày/giờ thật. KHÔNG fake reset.
- **Accordion FAQ:** thuần CSS `<details>/<summary>` hoặc JS nhẹ.
- **Không localStorage/sessionStorage** nếu chạy trong môi trường artifact.
- **Smooth scroll:** anchor link `#dangky` cuộn mượt tới pricing.
- **Accessibility:** contrast ≥4.5:1, focus ring rõ, alt cho ảnh, nút ≥48×48px.

---

## Checklist kỹ thuật trước khi bàn giao

```
□ 15 section đủ và đúng thứ tự
□ CTA xuất hiện ≥5 lần, text leo thang L1→L5
□ Sticky CTA + Zalo float hoạt động
□ Mobile-first, CTA trong thumb zone, ≥48px
□ Emotion Curve leo thang (không phẳng)
□ Trigger đủ 4 nhóm DISC
□ Placeholder rõ ràng cho phần thiếu dữ liệu thật
□ Countdown (nếu có) là deadline thật
□ Không bịa số liệu / testimonial
□ Brand color đúng (mặc định Wepower hoặc của user)
```
