-- ═══════════════════════════════════════════════════════════════════════════
-- CẬP NHẬT content_html CHO WELCOME + SKILL 01–05 (Khóa 1: khoa-1)
-- Chạy trong Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── WELCOME — Chào Mừng ──────────────────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #88860B; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">CHÀO MỪNG</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Tư Duy AI-First Trước Khi Bắt Đầu</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Bức tranh toàn cảnh 24 skill và cách chúng kết nối thành một hệ thống bán hàng tự chạy.</p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Core mindset -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">💡 Tư Duy Cốt Lõi</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Bạn là người ra lệnh và kiểm duyệt. AI là nhân viên thực thi.<br>Đừng cố "học" AI — hãy cố "giao việc" cho AI.</p>
    </div>

    <!-- Road map -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">🗺️ Lộ Trình Học</p>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 14px 16px;">
        <p style="font-size: 11px; font-weight: 700; color: #C0390E; margin: 0 0 6px;">NHÓM 1 — NỀN TẢNG</p>
        <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.6;">Skill 01-04: Avatar, Brand DNA, Offer, Vận hành</p>
      </div>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 14px 16px;">
        <p style="font-size: 11px; font-weight: 700; color: #C0390E; margin: 0 0 6px;">NHÓM 2 — CHIẾN LƯỢC</p>
        <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.6;">Skill 05-07: Cơ chế khác biệt, Mô hình doanh thu, Offer</p>
      </div>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 14px 16px;">
        <p style="font-size: 11px; font-weight: 700; color: #C0390E; margin: 0 0 6px;">NHÓM 3 — PHỄU & TRANG BÁN</p>
        <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.6;">Skill 08-12: Mồi, Phễu, Landing Page, UI/UX, SEO</p>
      </div>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 14px 16px;">
        <p style="font-size: 11px; font-weight: 700; color: #C0390E; margin: 0 0 6px;">NHÓM 4 — VIẾT CHỮ BÁN HÀNG</p>
        <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.6;">Skill 13-17: Ads, Video, Email, Vớt khách, Gọi chốt</p>
      </div>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 14px 16px;">
        <p style="font-size: 11px; font-weight: 700; color: #C0390E; margin: 0 0 6px;">NHÓM 5 — SẢN XUẤT NỘI DUNG</p>
        <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.6;">Skill 18-21: Content đa kênh, Marketing VN, Carousel, Headline</p>
      </div>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 14px 16px;">
        <p style="font-size: 11px; font-weight: 700; color: #C0390E; margin: 0 0 6px;">NHÓM 6 — TỰ ĐỘNG HÓA</p>
        <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.6;">Skill 22-24: Chatbot, NotebookLM, Tiểu Hà Mã</p>
      </div>
    </div>

    <!-- Advice -->
    <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; border-radius: 0 12px 12px 0; padding: 16px 20px; margin-bottom: 20px;">
      <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 8px;">Gợi ý từ Dũng</p>
      <p style="font-size: 14px; color: #333; margin: 0; line-height: 1.7;">Học 1 skill → làm thử ngay → thấy kết quả → học skill tiếp.<br>Không nên xem hết một lúc. Mục tiêu không phải "xem xong" mà là "làm được".</p>
    </div>

    <div style="background: #FFF8E6; border-left: 4px solid #E8A020; border-radius: 0 12px 12px 0; padding: 16px 20px;">
      <p style="font-size: 12px; font-weight: 700; color: #7A5500; margin: 0 0 8px;">Thứ tự học hợp lý</p>
      <p style="font-size: 14px; color: #333; margin: 0; line-height: 1.7;">Nền Tảng (01-04) → Chiến Lược (05-07) → Phễu & Trang Bán (08-12) → Viết Chữ (13-17) → Sản Xuất Nội Dung (18-21) → Tự Động Hóa (22-24)</p>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Chào mừng%';


-- ─── SKILL 01 — Chân Dung Khách Hàng ─────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 01</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Nền Tảng</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Chân Dung Khách Hàng</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Phân tích để biết khách của bạn là ai, đang đau điều gì, muốn gì, hay nói câu gì — để mọi bài viết và quảng cáo sau đều chuẩn ngay từ đầu.</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Một bản mô tả khách hàng chi tiết — tên avatar, nghề nghiệp, nỗi đau cụ thể, kết quả lý tưởng, câu khách hay nói. Dùng cho mọi skill viết chữ về sau.</p>
  </div>

  <!-- Auto transparency -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Hỏi bạn vài câu rồi tổng hợp thành bản mô tả. <strong>Bạn cần làm:</strong> Biết khách thật của mình — AI không thể thay bạn quan sát thực tế.</p>
  </div>

  <!-- SOP Content -->
  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Đừng tự ngồi nghĩ "khách hàng của mình là ai" — đó là cách chậm và hay bị sai. Hãy dump hết những gì bạn biết về khách thật vào AI rồi để AI tổng hợp. Bạn chỉ cần đọc lại và chỉnh những chỗ AI hiểu chưa đúng.</p>
    </div>

    <div style="margin-bottom: 28px;">
      <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🎯 Mục tiêu cuối bài</p>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">✓</span><span style="font-size: 14px; color: #333;">Tên avatar + nghề + độ tuổi + thu nhập ước tính</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">✓</span><span style="font-size: 14px; color: #333;">Ít nhất 3 nỗi đau cụ thể (không phải "muốn kiếm thêm tiền")</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">✓</span><span style="font-size: 14px; color: #333;">1 kết quả lý tưởng khách thật sự muốn đạt</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">✓</span><span style="font-size: 14px; color: #333;">2-3 câu họ hay nói khi mô tả vấn đề của mình</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">✓</span><span style="font-size: 14px; color: #333;">File avatar đã lưu để dùng cho các skill tiếp theo</span></div>
        </div>
      </div>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Viết ra những gì bạn đã biết về khách thật</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Dành 5-10 phút viết thô — không cần đúng format, cứ gõ ra:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Khách của mình thường làm nghề gì?<br>
          • Họ hay nhắn hỏi mình điều gì nhất?<br>
          • Câu phàn nàn mình nghe nhiều nhất là gì?<br>
          • Họ đã thử làm gì trước khi tìm đến mình?<br>
          • Kết quả họ muốn sau khi mua là gì cụ thể?
        </div>
        <p style="font-size: 13px; color: #888; margin: 10px 0 0; font-style: italic;">Nếu chưa có khách thật: viết dựa trên người bạn hình dung sẽ bán cho — ghi rõ đây là giả định.</p>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Paste vào AI để tổng hợp</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Mở Claude hoặc ChatGPT. Copy prompt sau, điền thông tin thật vào chỗ <strong>[...]</strong>:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi đang kinh doanh [mô tả ngắn về sản phẩm/dịch vụ].
Khách hàng của tôi thường là người [mô tả thô về khách].

Những điều tôi biết về họ:
- [Điều 1]
- [Điều 2]
- [Câu họ hay nói]
- [Điều họ đã thử nhưng thất bại]

Hãy tổng hợp thành bản Chân Dung Khách Hàng gồm:
1. Tên avatar + nghề + tuổi + thu nhập ước tính
2. Một ngày bình thường của họ
3. 3-5 nỗi đau cụ thể (viết đúng kiểu họ sẽ nói)
4. Kết quả lý tưởng họ muốn đạt (cụ thể, đo được)
5. Lý do họ chưa giải quyết được dù đã biết
6. 3 câu họ hay nói khi mô tả vấn đề

Viết bằng tiếng Việt, câu ngắn, dễ hiểu.</pre>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chỉnh những chỗ AI hiểu chưa đúng</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">AI sẽ không đúng 100%. Đọc kết quả và tự hỏi:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Nỗi đau này đúng không? Mình hay nghe khách nói chỗ khác hơn?<br>
          • Câu "hay nói" — có nghe tự nhiên không hay vẫn nghe như marketing?<br>
          • Kết quả lý tưởng — đây có thật sự là thứ họ muốn không?
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Chỗ nào sai, bảo AI: <em style="color: #3D6B4A;">"Phần [tên phần] chưa đúng. Khách thật của tôi thường nói [câu thật]. Sửa lại."</em></p>
      </div>
    </div>

    <!-- Step 4 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 4</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Bổ sung câu nói thật của khách</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Đây là phần quan trọng nhất. Nghĩ lại 3 tháng gần đây — khách đã nhắn gì?</p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Copy <strong>nguyên câu — không chỉnh, không sửa</strong> — vào phần "câu khách hay nói".</p>
        <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 16px;">
          <p style="font-size: 12px; font-weight: 600; color: #2D7A4F; margin: 0 0 6px;">Ví dụ câu thật:</p>
          <div style="font-size: 13px; color: #444; line-height: 1.8; font-style: italic;">
            "Mình cũng biết cần làm rồi nhưng cứ không biết bắt đầu từ đâu"<br>
            "Thuê người thì tốn, mà tự làm thì không có thời gian"<br>
            "Mình đã mua mấy khóa học rồi nhưng xem xong vẫn không biết làm"
          </div>
        </div>
      </div>
    </div>

    <!-- Step 5 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 5</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Lưu vào file</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Lưu bản avatar vào file: <strong style="color: #0D2B1A;">avatar-khach-hang.txt</strong></p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 8px 0 0;">File này sẽ dùng trong Skill 02, 05, 07, 08... Giữ nó, đừng để mất.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Đọc avatar xong, hình dung ngay ra 1 người thật cụ thể.<br><br>
          Nỗi đau khớp với câu khách hay nhắn cho bạn.<br><br>
          Có ít nhất 1 câu dùng đúng ngôn ngữ của khách.
        </div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Avatar mô tả kiểu "người muốn kinh doanh tốt hơn" — quá chung.<br><br>
          Không có câu nói thật của khách.<br><br>
          Nỗi đau nghe như "muốn tăng doanh thu" — ngôn ngữ người bán.
        </div>
      </div>
    </div>

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">💡 Mẹo — Khi chưa có khách thật</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Tìm 3-5 người trong mạng lưới trông giống khách mục tiêu. Nhắn hỏi 3 câu: "Bạn đang gặp khó khăn gì nhất?" / "Đã thử làm gì chưa?" / "Kết quả lý tưởng là gì?" — Copy nguyên câu trả lời vào avatar.</p>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 01%';


-- ─── SKILL 02 — Giọng Văn Thương Hiệu (BRAND_DNA) ───────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 02</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Nền Tảng</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Giọng Văn Thương Hiệu (BRAND_DNA)</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Dạy AI học đúng giọng viết của bạn, để bài AI viết ra nghe như chính bạn.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">File BRAND_DNA dán vào AI một lần, dùng mãi cho mọi skill viết chữ.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Phân tích giọng từ bài viết cũ và tổng hợp. <strong>Bạn cần làm:</strong> Đọc lại và chỉnh cho đúng giọng mình.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Bạn không tự "đặt ra" giọng văn. Bạn phát hiện nó từ những gì bạn đã viết. Lấy 5-10 bài đã đăng thật — paste vào AI và để AI phân tích. Bạn chỉ cần xác nhận "đúng" hoặc "không phải mình".</p>
    </div>

    <div style="margin-bottom: 28px;">
      <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🎯 Mục tiêu cuối bài</p>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">File BRAND_DNA hoàn chỉnh (khoảng 200-400 chữ)</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Đã test: AI viết bài theo BRAND_DNA nghe giống giọng bạn</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Đã lưu file để dùng cho mọi skill viết chữ phía sau</span></div>
        </div>
      </div>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Thu thập bài viết cũ</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Tìm 5-10 bài bạn đã viết thật và cảm thấy "giống mình nhất":</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Bài đăng Facebook / Caption Instagram<br>
          • Tin nhắn dài gửi cho khách<br>
          • Email bạn viết cho ai đó<br>
          • Đoạn mô tả sản phẩm bạn tự viết
        </div>
        <p style="font-size: 13px; color: #888; margin: 10px 0 0; font-style: italic;">Nếu chưa có bài viết nào: nhảy thẳng Bước 2B bên dưới.</p>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2A</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Để AI phân tích giọng (nếu có bài cũ)</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Dưới đây là bài viết thật tôi đã đăng. Phân tích giọng văn:
1. Cách mở đầu bài
2. Độ dài câu
3. Từ ngữ đặc trưng + từ KHÔNG bao giờ dùng
4. Cách kết bài
5. Tông điệu tổng thể
6. Cách xưng hô

Tổng hợp thành đoạn BRAND_DNA dạng:
"Khi viết, tôi sẽ... / Tôi luôn... / Tôi không bao giờ..."

[PASTE BÀI VIẾT VÀO ĐÂY]</pre>
        </div>
      </div>
    </div>

    <!-- Step 2B -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2B</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Nếu chưa có bài viết — trả lời 7 câu hỏi</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8; margin-bottom: 12px;">
          1. Khi viết về sản phẩm, bạn hay mở đầu bằng gì?<br>
          2. Bạn hay xưng là gì — mình/tôi/em?<br>
          3. Câu kiểu nào nghe "không phải mình" nhất?<br>
          4. Bạn hay dùng emoji không? Hay dùng cái gì?<br>
          5. Bạn muốn người đọc cảm thấy gì?<br>
          6. Bạn giống bạn thân chia sẻ hay thầy đang dạy?<br>
          7. Có câu nào TUYỆT ĐỐI không muốn AI viết?
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Paste 7 câu trả lời vào AI cùng lệnh: <em>"Dựa vào 7 câu trả lời này, viết BRAND_DNA khoảng 200-300 chữ mô tả giọng văn của tôi."</em></p>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chỉnh BRAND_DNA cho đúng</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Kiểm tra từng dòng: đúng giọng mình không? Có dòng nào quá "cứng" hoặc "formal" không?</p>
        <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 16px;">
          <p style="font-size: 12px; font-weight: 600; color: #2D7A4F; margin: 0 0 6px;">Ví dụ BRAND_DNA tốt:</p>
          <div style="font-size: 13px; color: #444; line-height: 1.8; font-style: italic;">
            "Khi viết, tôi dùng giọng tâm sự — như đang ngồi nói chuyện với người bạn hiểu chuyện. Câu ngắn. Ít chữ thừa. Xưng mình/bạn. Tôi không dùng: em-dash, từ copywriter, tối ưu hóa, nội dung chất lượng cao..."
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 4</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Test BRAND_DNA</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Paste BRAND_DNA vào chat AI mới, sau đó yêu cầu:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT TEST</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Dựa trên BRAND_DNA trên, viết bài Facebook khoảng 100-150 chữ giới thiệu [sản phẩm của bạn]. Viết đúng giọng đã mô tả.</pre>
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Đọc kết quả: nếu không biết AI viết, bạn có nghĩ đây là bài do mình viết không? Chưa ổn thì chỉnh rồi test lại.</p>
      </div>
    </div>

    <!-- Step 5 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 5</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Lưu file</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Lưu BRAND_DNA vào file: <strong style="color: #0D2B1A;">brand-dna.txt</strong></p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 8px 0 0;">Mỗi lần dùng AI viết bài: paste BRAND_DNA vào trước, rồi mới yêu cầu.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          AI viết bài theo BRAND_DNA, người đọc không đoán ra AI viết.<br><br>
          Có phần "KHÔNG bao giờ dùng" — phần này quan trọng không kém.<br><br>
          File đã lưu và biết paste vào đâu.
        </div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          BRAND_DNA chỉ ghi "viết ngắn gọn, chân thực" — quá chung.<br><br>
          Chưa test: không biết AI có viết đúng giọng không.<br><br>
          Không có phần từ ngữ cấm.
        </div>
      </div>
    </div>

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Mẹo — Cách biết BRAND_DNA đủ mạnh</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Cho người quen đọc bài AI viết mà không nói AI viết. Nếu họ nói "nghe giống bạn đấy" — đủ rồi. Nếu "hơi lạ, không phải kiểu bạn" — chỉnh lại phần câu mở đầu và cách xưng hô.</p>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 02%';


-- ─── SKILL 03 — Tư Duy Offer Kiểu Hormozi ────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 03</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Nền Tảng</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Tư Duy Offer Kiểu Hormozi</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Khung tư duy đóng gói và định giá sao cho giá trị cảm nhận cao hơn giá tiền.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Cách nghĩ về offer + bảng tự chấm offer của bạn đang mạnh hay yếu.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Đóng vai "khách hàng ảo" test offer. <strong>Bạn cần làm:</strong> Áp dụng tư duy vào sản phẩm thật của mình.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">AI không biết sản phẩm của bạn đáng giá bao nhiêu. Nhưng AI có thể giúp bạn nhìn offer từ góc độ khách hàng — chỉ cho bạn thấy chỗ khách đang nghĩ "chưa đủ lý do để mua".</p>
    </div>

    <div style="margin-bottom: 28px;">
      <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 12px;">🎯 Mục tiêu cuối bài</p>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Hiểu 4 yếu tố Value Equation của Hormozi</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Bảng tự chấm điểm offer hiện tại (0-10 từng yếu tố)</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Ít nhất 1 cách tăng giá trị cảm nhận mà không tăng giá</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Viết lại tên/mô tả offer theo framework</span></div>
        </div>
      </div>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Hiểu 4 yếu tố Value Equation</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Công thức: <strong>Giá trị = (Kết quả × Xác suất) / (Thời gian × Công sức)</strong></p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 14px;">
            <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 4px;">① Kết quả lý tưởng</p>
            <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.5;">Khách muốn đạt gì? Càng cụ thể, giá trị càng cao.</p>
          </div>
          <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 14px;">
            <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 4px;">② Xác suất thành công</p>
            <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.5;">Khách có tin sẽ làm được? Cần proof, bảo hành.</p>
          </div>
          <div style="background: #FFF8E6; border-radius: 8px; padding: 12px 14px;">
            <p style="font-size: 12px; font-weight: 700; color: #7A5500; margin: 0 0 4px;">③ Thời gian chờ</p>
            <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.5;">Kết quả đến nhanh hay chậm? Càng nhanh càng tốt.</p>
          </div>
          <div style="background: #FFF8E6; border-radius: 8px; padding: 12px 14px;">
            <p style="font-size: 12px; font-weight: 700; color: #7A5500; margin: 0 0 4px;">④ Công sức & rủi ro</p>
            <p style="font-size: 13px; color: #555; margin: 0; line-height: 1.5;">Khách bỏ bao nhiêu công? Bao nhiêu rủi ro?</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chấm điểm offer hiện tại</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Viết tên offer ra. Chấm điểm từ 0-10 cho mỗi yếu tố. <strong>Điểm thấp nhất = chỗ cần cải thiện trước.</strong></p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 2;">
          ① Kết quả lý tưởng: ___/10 (0 = mơ hồ / 10 = cụ thể và hấp dẫn)<br>
          ② Xác suất thành công: ___/10 (0 = hoài nghi / 10 = nhiều proof)<br>
          ③ Thời gian chờ: ___/10 (0 = rất lâu / 10 = rất nhanh)<br>
          ④ Công sức & rủi ro: ___/10 (0 = nhiều công / 10 = ít công, không rủi ro)
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Hỏi AI: "Khách đang nghĩ gì?"</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi đang bán: [mô tả offer — sản phẩm, giá, những gì khách nhận được]

Hãy đóng vai khách hàng đang cân nhắc mua. Cho tôi biết:
1. Điều gì trong offer khiến bạn quan tâm nhất?
2. Điều gì khiến bạn chần chừ?
3. Bạn đang nghi ngờ điều gì?
4. Muốn thêm gì vào offer để quyết định dễ hơn?
5. Mức giá nghe thế nào?

Trả lời thẳng thắn, như khách thật.</pre>
        </div>
      </div>
    </div>

    <!-- Step 4 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 4</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Tìm cách tăng giá trị không tăng giá</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          <strong>Kết quả thấp:</strong> Viết lại cụ thể hơn — "có 5 đơn đầu tiên trong 30 ngày"<br>
          <strong>Xác suất thấp:</strong> Thêm case study, bảo hành 14 ngày hoàn tiền<br>
          <strong>Thời gian thấp:</strong> Rõ timeline — "Tuần 1 làm gì, Tuần 2 làm gì"<br>
          <strong>Công sức thấp:</strong> Thêm template, checklist, SOP giảm công sức
        </div>
      </div>
    </div>

    <!-- Step 5 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 5</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Viết lại tên và mô tả offer</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Offer hiện tại: [tên + mô tả]
Khách hàng: [mô tả ngắn]
Kết quả cụ thể: [điền]
Thời gian: [điền]
Proof/bảo hành: [điền]
AI/công cụ làm thay: [điền]

Viết lại tên offer và 2-3 câu mô tả ngắn. Tập trung kết quả cụ thể và giảm rủi ro. Tránh từ chung chung.</pre>
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Người đọc lần đầu hiểu ngay: nhận gì, trong bao lâu, rủi ro ra sao.<br><br>
          Không còn từ chung chung. Nói được con số hoặc kết quả cụ thể.<br><br>
          Bảng chấm điểm đã điền đầy đủ 4 yếu tố.
        </div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Vẫn mô tả tính năng "24 video, 10 bài tập" thay vì kết quả.<br><br>
          Không có bảo hành — rủi ro 100% về phía khách.<br><br>
          Chưa test với "khách ảo" qua AI.
        </div>
      </div>
    </div>

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Mẹo — Test offer với người thật</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Gửi mô tả mới cho 1-2 người giống khách mục tiêu. Hỏi: "Đọc xong hiểu mình đang bán gì không? Còn thiếu thông tin gì?" — Phản hồi của người thật quan trọng hơn AI.</p>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 03%';


-- ─── SKILL 04 — Tư Duy Vận Hành Một Mình ─────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 04</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Nền Tảng</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Tư Duy Vận Hành Một Mình</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Bộ khung làm việc cho người kinh doanh một mình: từ định hướng tới việc hằng ngày.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Template lên kế hoạch tuần + review tuần. Biết ngay tuần này việc quan trọng nhất là gì.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Giúp phân loại ưu tiên và review cuối tuần. <strong>Bạn cần làm:</strong> Điền template thật và làm đều mỗi tuần.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Người kinh doanh một mình hay sa vào 2 bẫy: làm ngẫu hứng (việc gì nổi lên làm việc đó) hoặc plan quá phức tạp. AI giúp bạn lên kế hoạch nhanh mỗi đầu tuần (5-10 phút) và review cuối tuần (5 phút).</p>
    </div>

    <div style="margin-bottom: 28px;">
      <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 12px;">🎯 Mục tiêu cuối bài</p>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Template Weekly Planning đã lưu</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Template Weekly Review đã lưu</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Đã chạy thử 1 vòng: điền kế hoạch tuần hiện tại</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Biết "việc quan trọng nhất tuần này" là gì</span></div>
        </div>
      </div>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Hiểu khung ưu tiên việc</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div style="background: #C0390E; border-radius: 8px; padding: 12px 14px;">
            <p style="font-size: 12px; font-weight: 700; color: white; margin: 0 0 4px;">Quan trọng + Khẩn cấp</p>
            <p style="font-size: 12px; color: #fecaca; margin: 0;">→ Làm ngay hôm nay</p>
          </div>
          <div style="background: #1D9E75; border-radius: 8px; padding: 12px 14px;">
            <p style="font-size: 12px; font-weight: 700; color: white; margin: 0 0 4px;">Quan trọng + Không khẩn</p>
            <p style="font-size: 12px; color: #d1fae5; margin: 0;">→ Lên lịch cụ thể ⭐</p>
          </div>
          <div style="background: #E8A020; border-radius: 8px; padding: 12px 14px;">
            <p style="font-size: 12px; font-weight: 700; color: white; margin: 0 0 4px;">Khẩn cấp + Không quan trọng</p>
            <p style="font-size: 12px; color: #fef3c7; margin: 0;">→ Làm nhanh / delegate</p>
          </div>
          <div style="background: #888; border-radius: 8px; padding: 12px 14px;">
            <p style="font-size: 12px; font-weight: 700; color: white; margin: 0 0 4px;">Không quan trọng + Không khẩn</p>
            <p style="font-size: 12px; color: #e5e5e5; margin: 0;">→ Bỏ hoặc cuối tuần</p>
          </div>
        </div>
        <p style="font-size: 13px; color: #888; margin: 10px 0 0; font-style: italic;">Người kinh doanh hay sa vào ô 1 và 3 mà quên ô 2 — ô quan trọng nhất cho phát triển.</p>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Tạo Template Weekly Planning</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Copy template sau vào Notion/Google Docs:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          <strong>🎯 MỤC TIÊU TUẦN NÀY</strong> (1-3 kết quả cụ thể)<br>
          <strong>⭐ VIỆC QUAN TRỌNG NHẤT</strong> (chỉ chọn 1)<br>
          <strong>📋 DANH SÁCH VIỆC THEO NGÀY</strong> (T2 → T6)<br>
          <strong>⚡ VIỆC KHẨN CẤP</strong> (phải xử lý trong 24-48h)<br>
          <strong>🚫 VIỆC SẼ KHÔNG LÀM</strong> (để không phân tâm)
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Tạo Template Weekly Review</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          <strong>✅ ĐÃ HOÀN THÀNH</strong><br>
          <strong>❌ CHƯA HOÀN THÀNH — Lý do?</strong><br>
          <strong>💡 HỌC ĐƯỢC GÌ TUẦN NÀY?</strong><br>
          <strong>🔋 NĂNG LƯỢNG</strong> (1-10)<br>
          <strong>📌 CHUYỂN SANG TUẦN SAU</strong>
        </div>
      </div>
    </div>

    <!-- Step 4 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 4</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chạy thử ngay bây giờ</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Đừng để đến tuần sau. Mở template và điền ngay cho tuần hiện tại. Nếu bí, dùng AI:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi đang kinh doanh [mô tả ngắn].
Tuần tới đang nghĩ đến: [liệt kê việc trong đầu].

Giúp tôi:
1. Phân loại: đâu quan trọng, đâu khẩn, đâu bỏ được?
2. Xác định 1 việc quan trọng nhất nên ưu tiên.
3. Chia việc vào các ngày không bị dồn.</pre>
        </div>
      </div>
    </div>

    <!-- Step 5 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 5</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Đặt lịch 2 lần mỗi tuần</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #333; line-height: 1.8;">
          <strong>Đầu tuần</strong> (T2 sáng hoặc CN tối): 10-15 phút điền Weekly Planning<br>
          <strong>Cuối tuần</strong> (T6 tối hoặc CN): 10 phút điền Weekly Review
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 10px 0 0;"><strong>Đặt lịch nhắc nhở trên điện thoại ngay bây giờ.</strong> Không đặt lịch = không làm được lâu dài.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Weekly Planning đã điền đủ cho tuần này.<br><br>
          Đã đặt lịch nhắc nhở trên điện thoại.<br><br>
          Biết trả lời: "Tuần này, nếu chỉ làm 1 việc, việc đó là gì?"
        </div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Chỉ đọc qua template nhưng chưa điền thật.<br><br>
          Chưa đặt lịch nhắc — tuần sau sẽ quên.<br><br>
          Danh sách việc hơn 10 việc — chưa biết ưu tiên.
        </div>
      </div>
    </div>

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Mẹo — AI như người hỏi thăm cuối tuần</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Mỗi Thứ 6, paste Weekly Planning vào AI và hỏi: "Hãy hỏi tôi 3 câu để review tuần này và chuẩn bị tuần sau." AI sẽ hỏi đúng những câu bạn hay né tránh.</p>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 04%';


-- ─── SKILL 05 — Cơ Chế Khác Biệt ────────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 05</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Chiến Lược</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Cơ Chế Khác Biệt</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Đặt tên và hệ thống hóa cách bạn làm ra kết quả, để khách khó so giá với người khác.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Tên cơ chế riêng + sơ đồ giải thích, dùng trong trang bán và quảng cáo.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Gợi ý nhiều phương án tên và sơ đồ. <strong>Bạn cần làm:</strong> Chọn cái phù hợp nhất với cách bạn thật sự làm việc.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Cơ chế khác biệt không phải bạn "bịa ra" — nó là cách bạn đang làm, chỉ chưa được đặt tên. AI giúp bạn đặt tên cho nó sao cho khách nhớ được và khó so sánh với đối thủ.</p>
    </div>

    <div style="margin-bottom: 28px;">
      <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 12px;">🎯 Mục tiêu cuối bài</p>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Mô tả quy trình bạn đang dùng để tạo kết quả</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Tên cơ chế dễ nhớ, nghe chuyên nghiệp</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Sơ đồ hoặc mô tả 3-5 bước giải thích cơ chế</span></div>
          <div style="display: flex; align-items: flex-start; gap: 10px;"><span style="color: #1D9E75; font-weight: 700;">✓</span><span style="font-size: 14px; color: #333;">Đoạn văn ngắn để dùng trong trang bán hàng</span></div>
        </div>
      </div>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Viết ra quy trình bạn đang làm</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Trả lời 4 câu hỏi — viết thô, không cần đẹp:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Bạn làm gì cho khách từ A tới Z? (liệt kê các bước thật)<br>
          • Bước nào khách hay bất ngờ "à, cái này hay"?<br>
          • Có bước nào bạn làm khác mọi người không?<br>
          • Kết quả cuối cùng khách cầm được là gì?
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Để AI đặt tên cơ chế</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi có quy trình giúp khách đạt [kết quả]. Các bước:
[Liệt kê các bước bạn viết ở Bước 1]

Hãy:
1. Gợi ý 5 cái tên cho quy trình này (dễ nhớ, nghe chuyên nghiệp, tiếng Việt hoặc pha Anh-Việt)
2. Với mỗi tên, viết 1 câu giải thích ngắn gọn
3. Vẽ sơ đồ đơn giản 3-5 bước cho quy trình</pre>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chọn tên và hoàn thiện sơ đồ</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Chọn 1 tên bạn thấy nghe đúng nhất. Tiêu chí:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Nói tên này ra, khách có tò mò muốn biết thêm không?<br>
          • Đối thủ có dùng tên giống không? (nếu có, chọn cái khác)<br>
          • Bạn có thoải mái giải thích tên này cho khách không?
        </div>
      </div>
    </div>

    <!-- Step 4 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 4</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Viết đoạn giới thiệu cơ chế cho trang bán</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Cơ chế của tôi tên là: [tên đã chọn]
Các bước: [liệt kê 3-5 bước]
Kết quả khách đạt được: [điền]

Viết 1 đoạn 80-120 chữ giới thiệu cơ chế này cho trang bán hàng. Giọng tự tin nhưng không khoe. Tập trung vào khách được gì, không phải bạn giỏi gì.</pre>
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Lưu tên cơ chế + sơ đồ + đoạn giới thiệu. Dùng cho Skill 07, 10, 13, 14.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Nói tên cơ chế cho người lạ — họ muốn biết thêm.<br><br>
          Sơ đồ 3-5 bước rõ ràng, dễ hiểu.<br><br>
          Đoạn giới thiệu không có từ chung chung.
        </div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Tên nghe quá generic — ai cũng có thể dùng.<br><br>
          Không có sơ đồ giải thích.<br><br>
          Chưa lưu để dùng trong các skill tiếp theo.
        </div>
      </div>
    </div>

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Mẹo — Cơ chế không cần phức tạp</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Nhiều cơ chế mạnh nhất chỉ có 3 bước. "Phương pháp 3A" nghe hay hơn "Quy trình 12 bước". Đơn giản = dễ nhớ = dễ bán.</p>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 05%';
