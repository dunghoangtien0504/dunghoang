-- ═══════════════════════════════════════════════════════════════════════════
-- CẬP NHẬT content_html CHO SKILL 06–12 (Khóa 1: khoa-1)
-- Chạy trong Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── SKILL 06 — Mô Hình Doanh Thu ────────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 06</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Chiến Lược</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Mô Hình Doanh Thu</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Vẽ bậc thang sản phẩm từ rẻ tới đắt để khách mua nhiều lần, tăng dần.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Bản đồ các sản phẩm và mức giá, biết bán gì trước, bán gì sau.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Gợi ý mô hình bậc thang phù hợp. <strong>Bạn cần làm:</strong> Quyết giá và sản phẩm thật của mình.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Đừng chỉ có 1 sản phẩm rồi hỏi "sao không ai mua". Xây bậc thang: miễn phí → rẻ → chính → premium. Mỗi bậc là thử thách nhỏ hơn cho khách trước khi cam kết lớn.</p>
    </div>

    <div style="margin-bottom: 28px;">
      <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 12px;">🎯 Mục tiêu cuối bài</p>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Hiểu mô hình bậc thang sản phẩm</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Vẽ được bậc thang cho sản phẩm của mình (ít nhất 3 bậc)</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Biết bán gì trước để kéo khách vào hệ thống</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Biết giá tương đối cho mỗi bậc</span></div>
        </div>
      </div>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Hiểu mô hình bậc thang</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="display: grid; grid-template-columns: 1fr; gap: 8px;">
          <div style="background: #d1fae5; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">🎁</span>
            <div><p style="font-size: 12px; font-weight: 700; color: #065f46; margin: 0;">Bậc 0 — Miễn phí</p><p style="font-size: 12px; color: #555; margin: 2px 0 0;">Quà tặng kéo khách lạ (ebook, checklist, thử thách)</p></div>
          </div>
          <div style="background: #dbeafe; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">💡</span>
            <div><p style="font-size: 12px; font-weight: 700; color: #1e40af; margin: 0;">Bậc 1 — Giá rẻ (100k-500k)</p><p style="font-size: 12px; color: #555; margin: 2px 0 0;">Sản phẩm dễ quyết định, thử xem có hợp không</p></div>
          </div>
          <div style="background: #fef3c7; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">⭐</span>
            <div><p style="font-size: 12px; font-weight: 700; color: #92400e; margin: 0;">Bậc 2 — Sản phẩm chính (500k-2tr)</p><p style="font-size: 12px; color: #555; margin: 2px 0 0;">Sản phẩm cốt lõi, giải quyết vấn đề chính</p></div>
          </div>
          <div style="background: #fce7f3; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">👑</span>
            <div><p style="font-size: 12px; font-weight: 700; color: #9d174d; margin: 0;">Bậc 3 — Premium (3tr+)</p><p style="font-size: 12px; color: #555; margin: 2px 0 0;">Kèm sát, 1-1, VIP — cho ai muốn kết quả nhanh nhất</p></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Vẽ bậc thang cho sản phẩm của bạn</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi đang bán [mô tả sản phẩm/dịch vụ chính].
Giá hiện tại: [giá]
Khách hàng: [mô tả ngắn]

Hãy giúp tôi thiết kế mô hình bậc thang gồm:
1. Miễn phí — quà tặng gì để kéo khách?
2. Giá rẻ (100k-500k) — sản phẩm gì dễ quyết định?
3. Sản phẩm chính — đã có rồi
4. Premium — phiên bản nâng cấp nào?

Với mỗi bậc, gợi ý: tên, giá, nội dung, lý do khách muốn lên bậc tiếp.</pre>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chọn và điều chỉnh</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Đọc gợi ý AI. Kiểm tra:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Sản phẩm miễn phí: bạn có thể làm được không? Có quá tốn công?<br>
          • Sản phẩm giá rẻ: khách có sẵn sàng trả tiền cho thứ này?<br>
          • Premium: bạn có khả năng deliver ở mức này?<br>
          • Từ bậc này sang bậc kia: logic không? Khách muốn lên không?
        </div>
      </div>
    </div>

    <!-- Step 4 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 4</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Lưu bản đồ sản phẩm</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Vẽ hoặc ghi bản đồ sản phẩm cuối cùng. Mỗi bậc ghi: <strong>tên — giá — nội dung — cách khách lên bậc tiếp.</strong></p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 8px 0 0;">Bản đồ này dùng cho Skill 07, 08, 09, 10.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Có ít nhất 3 bậc sản phẩm (miễn phí → chính → premium).<br><br>
          Mỗi bậc có giá và nội dung rõ ràng.<br><br>
          Logic lên bậc hợp lý — khách muốn chứ không bị ép.
        </div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Chỉ có 1 sản phẩm, không có bậc thang.<br><br>
          Các bậc không liên kết — mua bậc 1 xong không biết bậc 2 là gì.<br><br>
          Giá các bậc không hợp lý (nhảy từ free lên 5tr).
        </div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 06%';


-- ─── SKILL 07 — Thiết Kế Offer ───────────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 07</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Chiến Lược</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Thiết Kế Offer</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Build lời đề nghị khó từ chối: quà tặng, bảo hành, đảo ngược rủi ro.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Một offer hoàn chỉnh sẵn để đưa lên trang bán.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Dựng khung offer hoàn chỉnh. <strong>Bạn cần làm:</strong> Điền số liệu thật và cam kết thật của mình.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Offer tốt không phải "bán rẻ hơn". Offer tốt là khách nhìn vào thấy: mình sẽ nhận được nhiều hơn số tiền bỏ ra, rủi ro thấp, kết quả nhanh. AI giúp bạn đóng gói tất cả thành 1 lời đề nghị rõ ràng.</p>
    </div>

    <div style="margin-bottom: 28px;">
      <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 12px;">🎯 Mục tiêu cuối bài</p>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Offer hoàn chỉnh: sản phẩm chính + bonus + bảo hành</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Tên offer hấp dẫn + 1 đoạn mô tả ngắn gọn</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Giá và cách đảo ngược rủi ro cho khách</span></div>
        </div>
      </div>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Liệt kê tất cả những gì khách nhận được</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Viết ra mọi thứ — dù nhỏ nhất — mà khách sẽ nhận khi mua:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Sản phẩm/dịch vụ chính là gì?<br>
          • Bonus đi kèm (template, video, file, group hỗ trợ...)?<br>
          • Hỗ trợ sau mua (bao lâu, qua kênh nào)?<br>
          • Bảo hành / cam kết hoàn tiền?<br>
          • Giá hiện tại?
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Để AI đóng gói thành offer</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi bán: [sản phẩm/dịch vụ]
Giá: [giá]
Khách nhận được: [liệt kê tất cả]
Bảo hành: [nếu có]
Avatar khách: [tóm tắt từ Skill 01]
Cơ chế khác biệt: [tên từ Skill 05]

Hãy đóng gói thành 1 offer hoàn chỉnh gồm:
1. Tên offer hấp dẫn (3-5 phương án)
2. Headline mô tả ngắn (1 câu)
3. Danh sách giá trị: sản phẩm chính + bonus, mỗi cái ghi giá trị ước tính
4. Cách đảo ngược rủi ro (bảo hành, cam kết)
5. 1 đoạn mô tả offer 100-150 chữ cho trang bán</pre>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Kiểm tra và chỉnh offer</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Đọc offer AI tạo. Kiểm tra:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Cam kết nào bạn thật sự giữ được? Bỏ cái nào không giữ được.<br>
          • Bonus nào bạn thật sự có? Đừng hứa cái chưa làm.<br>
          • Giá trị ước tính có hợp lý không? Đừng phóng đại.<br>
          • Đọc lại đoạn mô tả: khách đọc xong có hiểu ngay mình nhận gì?
        </div>
      </div>
    </div>

    <!-- Step 4 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 4</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Lưu offer hoàn chỉnh</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Lưu vào file: <strong style="color: #0D2B1A;">offer-hoan-chinh.txt</strong> — gồm tên, giá, danh sách giá trị, bảo hành, đoạn mô tả.</p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 8px 0 0;">File này dùng trực tiếp khi làm Landing Page (Skill 10) và viết ads (Skill 13).</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Offer có sản phẩm chính + ít nhất 1 bonus + bảo hành.<br><br>
          Mô tả ngắn: khách đọc xong hiểu ngay nhận gì.<br><br>
          Mọi cam kết đều giữ được.
        </div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Hứa quá nhiều, không chắc giữ hết.<br><br>
          Không có bảo hành — rủi ro 100% phía khách.<br><br>
          Giá trị ước tính phóng đại quá mức.
        </div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 07%';


-- ─── SKILL 08 — Mồi Miễn Phí Kéo Khách ──────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 08</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Phễu &amp; Trang bán</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Mồi Miễn Phí Kéo Khách</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Nghĩ ra quà tặng miễn phí (ebook, checklist, thử thách) để khách lạ để lại liên hệ.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Ý tưởng mồi + dàn ý nội dung mồi để bạn làm.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Ra ý tưởng và dàn ý nội dung mồi. <strong>Bạn cần làm:</strong> Hoàn thiện nội dung mồi thật sự.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Mồi tốt giải quyết 1 vấn đề nhỏ nhưng cụ thể. Không cần dài — cần hữu ích ngay. Khách dùng mồi xong phải nghĩ: "Cái miễn phí đã hay vậy, cái trả tiền chắc hay hơn nữa."</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chọn dạng mồi</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="background: #F6F0E4; border-radius: 8px; padding: 10px 14px;"><p style="font-size: 12px; font-weight: 700; color: #333; margin: 0;">📋 Checklist</p><p style="font-size: 12px; color: #666; margin: 4px 0 0;">Nhanh, dễ làm. VD: "10 sai lầm khi..."</p></div>
          <div style="background: #F6F0E4; border-radius: 8px; padding: 10px 14px;"><p style="font-size: 12px; font-weight: 700; color: #333; margin: 0;">📖 Mini ebook</p><p style="font-size: 12px; color: #666; margin: 4px 0 0;">5-10 trang. VD: "Hướng dẫn X cho người mới"</p></div>
          <div style="background: #F6F0E4; border-radius: 8px; padding: 10px 14px;"><p style="font-size: 12px; font-weight: 700; color: #333; margin: 0;">🎯 Template</p><p style="font-size: 12px; color: #666; margin: 4px 0 0;">File sẵn để điền. VD: "Template kế hoạch..."</p></div>
          <div style="background: #F6F0E4; border-radius: 8px; padding: 10px 14px;"><p style="font-size: 12px; font-weight: 700; color: #333; margin: 0;">⚡ Thử thách</p><p style="font-size: 12px; color: #666; margin: 4px 0 0;">3-7 ngày. VD: "Challenge 7 ngày X"</p></div>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Để AI gợi ý ý tưởng</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi bán [sản phẩm/dịch vụ], giá [giá].
Avatar khách: [tóm tắt Skill 01]
Nỗi đau lớn nhất của khách: [điền]

Gợi ý 5 ý tưởng quà tặng miễn phí (lead magnet) mà:
- Giải quyết 1 vấn đề nhỏ nhưng cụ thể
- Khách dùng xong muốn biết thêm (dẫn tới sản phẩm trả tiền)
- Không quá tốn công để tạo (dùng AI hỗ trợ)

Với mỗi ý tưởng, gợi ý: tên, dạng (checklist/ebook/template), dàn ý 5-7 mục.</pre>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chọn 1 ý tưởng và làm dàn ý chi tiết</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Chọn ý tưởng dễ làm nhất + liên quan nhất tới sản phẩm trả tiền. Bảo AI: <em style="color: #3D6B4A;">"Viết dàn ý chi tiết cho ý tưởng [X], mỗi phần khoảng 3-5 gạch đầu dòng."</em></p>
      </div>
    </div>

    <!-- Step 4 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 4</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Hoàn thiện nội dung mồi</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Dùng AI viết nội dung chi tiết. Paste BRAND_DNA (Skill 02) trước để giữ giọng. Đọc lại, chỉnh, và format thành file hoàn chỉnh.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Có 1 ý tưởng mồi + dàn ý nội dung đầy đủ. Mồi liên quan trực tiếp tới sản phẩm trả tiền.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Mồi quá rộng, không liên quan tới sản phẩm. Chưa có dàn ý cụ thể.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 08%';


-- ─── SKILL 09 — Vẽ Phễu Bán Hàng ────────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 09</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Phễu &amp; Trang bán</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Vẽ Phễu Bán Hàng</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Vẽ đường đi của khách từ lúc thấy bạn tới lúc mua, từng bước nối nhau.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Sơ đồ phễu để biết cần làm trang nào, email nào, theo thứ tự nào.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Vẽ bản đồ phễu phù hợp. <strong>Bạn cần làm:</strong> Dùng nó làm kim chỉ nam khi dựng hệ thống.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Phễu đơn giản thường hiệu quả hơn phễu phức tạp. Không cần 10 bước — cần 3-5 bước rõ ràng: thu hút → nuôi dưỡng → chốt. Quan trọng là mỗi bước nối sang bước tiếp tự nhiên.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Hiểu phễu cơ bản</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          <strong>Khách lạ</strong> → thấy bài viết/quảng cáo<br>
          → Click vào <strong>mồi miễn phí</strong> (Skill 08)<br>
          → Để lại email/Zalo → nhận <strong>chuỗi email nuôi</strong> (Skill 15)<br>
          → Vào xem <strong>trang bán hàng</strong> (Skill 10)<br>
          → <strong>Mua hàng</strong><br>
          → Chưa mua? → nhận <strong>tin nhắn vớt</strong> (Skill 16)
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Để AI vẽ phễu cho bạn</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Sản phẩm: [tên + giá]
Mồi miễn phí: [ý tưởng từ Skill 08]
Avatar khách: [tóm tắt Skill 01]
Kênh chính: [Facebook/Instagram/TikTok/Zalo...]

Vẽ phễu bán hàng gồm:
1. Sơ đồ từng bước (khách lạ → mua hàng)
2. Mỗi bước ghi rõ: cần làm gì, dùng công cụ nào
3. Nhánh "chưa mua": xử lý thế nào?
4. Gợi ý: nên dựng bước nào trước?</pre>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Lưu sơ đồ phễu</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Vẽ/lưu sơ đồ phễu. Đánh dấu: bước nào đã có, bước nào cần làm. Đây là kim chỉ nam cho tất cả các skill tiếp theo.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Sơ đồ rõ ràng: từ khách lạ → mua hàng. Biết bước nào cần dựng trước.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Phễu quá phức tạp (hơn 7 bước). Không có nhánh "chưa mua".</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 09%';


-- ─── SKILL 10 — Dựng Landing Page ────────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 10</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Phễu &amp; Trang bán</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Dựng Landing Page</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Tạo trang bán hàng hoàn chỉnh theo cấu trúc chuyển đổi cao, không cần code.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Một trang bán hàng thật chạy được, dùng được ngay.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Viết toàn bộ chữ + cấu trúc trang. <strong>Bạn cần làm:</strong> Lắp vào công cụ và đăng lên.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Landing page không cần đẹp — cần rõ ràng. Khách đọc xong phải trả lời được 3 câu: "Đây là gì?", "Mình được gì?", "Bước tiếp theo là gì?". AI viết chữ, bạn lắp vào công cụ.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chuẩn bị nguyên liệu</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Mở lại các file từ skill trước:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • <strong>Avatar khách hàng</strong> (Skill 01)<br>
          • <strong>BRAND_DNA</strong> (Skill 02)<br>
          • <strong>Cơ chế khác biệt</strong> (Skill 05)<br>
          • <strong>Offer hoàn chỉnh</strong> (Skill 07)
        </div>
        <p style="font-size: 13px; color: #888; margin: 10px 0 0; font-style: italic;">Nếu chưa làm skill nào, quay lại làm trước. Landing page dùng tất cả các file này.</p>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Để AI viết cấu trúc trang</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">[Dán BRAND_DNA ở đây]

Avatar khách: [dán file avatar]
Offer: [dán file offer]
Cơ chế: [dán tên + sơ đồ cơ chế]

Viết landing page gồm các section:
1. Hero: Headline + sub-headline + CTA
2. Vấn đề khách đang gặp (3-5 nỗi đau)
3. Giải pháp: cơ chế khác biệt
4. Những gì khách nhận được (offer stack)
5. Social proof (nếu có)
6. Bảo hành / đảo ngược rủi ro
7. FAQ (5-7 câu hỏi thường gặp)
8. CTA cuối cùng

Viết bằng tiếng Việt, đúng giọng BRAND_DNA.</pre>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Lắp vào công cụ</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Dùng công cụ quen: Carrd, WordPress, Webflow, hoặc nhờ AI tạo file HTML. Lắp từng section vào. Chỉnh màu, font, hình ảnh cho phù hợp.</p>
      </div>
    </div>

    <!-- Step 4 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 4</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Test trên điện thoại</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">90% khách VN xem bằng điện thoại. Mở trang trên điện thoại kiểm tra: chữ đọc được không, CTA bấm được không, tải nhanh không. Gửi cho 1-2 người quen đọc thử.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Trang chạy được, mở trên điện thoại đọc tốt. Khách đọc xong hiểu: nhận gì, giá bao nhiêu, mua ở đâu.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Chưa có trang thật — chỉ có chữ trong file. Chưa test trên điện thoại. Thiếu CTA rõ ràng.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 10%';


-- ─── SKILL 11 — Làm Đẹp Giao Diện ───────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 11</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Phễu &amp; Trang bán</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Làm Đẹp Giao Diện</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Chỉnh trang cho đẹp, dễ đọc, nhanh, chuẩn điện thoại.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Hướng dẫn màu, font, bố cục để trang nhìn chuyên nghiệp.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Gợi ý bộ màu, font, bố cục cụ thể. <strong>Bạn cần làm:</strong> Áp dụng vào trang của mình.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Đẹp không phải "nhiều hiệu ứng". Đẹp = dễ đọc + tải nhanh + nhìn thoải mái trên điện thoại. Đừng nghĩ về thiết kế — nghĩ về trải nghiệm đọc của khách.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chọn bộ màu</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Sản phẩm của tôi: [mô tả ngắn]
Tông điệu thương hiệu: [từ BRAND_DNA]
Đối tượng: [từ avatar]

Gợi ý bộ màu gồm:
1. Màu chính (CTA, nút bấm)
2. Màu nền
3. Màu chữ
4. Màu nhấn (accent)

Cho mã hex cụ thể. Giải thích tại sao chọn bộ này.</pre>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Nguyên tắc bố cục mobile-first</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Chiều rộng chữ: tối đa 600-700px (đừng rộng quá)<br>
          • Cỡ chữ: body 16px trở lên (nhỏ hơn khó đọc trên điện thoại)<br>
          • Khoảng cách dòng: 1.6-1.8 (thoáng mắt)<br>
          • Mỗi section có padding đều 2 bên<br>
          • Hình ảnh: nén xuống dưới 200KB, dùng WebP nếu được<br>
          • CTA: nổi bật, đủ lớn để ngón tay bấm dễ
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Áp dụng và kiểm tra</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Áp dụng bộ màu + nguyên tắc bố cục vào trang. Kiểm tra:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Mở trên điện thoại: đọc thoải mái không?<br>
          • Chữ trên nền: contrast đủ không? (dùng webaim.org/resources/contrastchecker)<br>
          • Tải trang: dưới 3 giây không?<br>
          • Nút CTA: nhìn thấy ngay, bấm dễ không?
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Trang đọc thoải mái trên điện thoại. Có bộ màu nhất quán. CTA nổi bật.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Chưa test trên điện thoại. Chữ quá nhỏ hoặc contrast kém. Tải chậm hơn 3 giây.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 11%';


-- ─── SKILL 12 — Viết Bài SEO ─────────────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 12</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Phễu &amp; Trang bán</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Viết Bài SEO</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Viết bài chuẩn Google để khách tự tìm tới mà không tốn tiền quảng cáo.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Bài viết SEO sẵn dạng HTML để đăng lên website.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Viết bài hoàn chỉnh chuẩn SEO. <strong>Bạn cần làm:</strong> Đăng lên website và theo dõi thứ hạng.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">SEO là kênh "làm 1 lần, thu mãi". Một bài SEO tốt kéo khách lạ tới bạn tự động, ngày qua ngày, không tốn thêm tiền. AI viết bài tốt nhưng cần bạn chọn đúng từ khóa.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Tìm từ khóa</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi bán [sản phẩm/dịch vụ] cho [đối tượng].

Gợi ý 10 từ khóa SEO mà khách hàng tiềm năng hay tìm trên Google. Ưu tiên:
- Từ khóa dạng câu hỏi (khách hay hỏi gì?)
- Từ khóa dạng "cách làm" (khách muốn biết cách gì?)
- Từ khóa ít cạnh tranh (tránh từ quá chung)

Với mỗi từ khóa, gợi ý tiêu đề bài viết.</pre>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Để AI viết bài</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">[Dán BRAND_DNA]

Viết bài SEO cho từ khóa: [từ khóa đã chọn]
Tiêu đề: [tiêu đề đã chọn]
Đối tượng: [avatar]

Yêu cầu:
- 1500-2500 chữ
- Dùng H2, H3 rõ ràng
- Từ khóa xuất hiện tự nhiên (không nhồi)
- Mở đầu hấp dẫn, trả lời ngay câu hỏi của khách
- Kết bài có CTA dẫn về sản phẩm
- Output dạng HTML sạch</pre>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Đăng và theo dõi</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Đăng bài lên website. Sau đó:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Submit URL lên Google Search Console<br>
          • Sau 1-2 tuần: check thứ hạng trên Google<br>
          • Nếu trang 2-3: chỉnh tiêu đề, thêm nội dung, thêm link nội bộ<br>
          • Mỗi tháng viết thêm 2-4 bài → dần dần có traffic miễn phí
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Có ít nhất 1 bài SEO đã đăng thật trên website. Bài có cấu trúc H2/H3 rõ ràng, có CTA.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Chỉ viết xong nhưng chưa đăng. Bài nhồi từ khóa đọc không tự nhiên. Thiếu CTA cuối bài.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 12%';
