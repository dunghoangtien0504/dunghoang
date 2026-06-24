-- ═══════════════════════════════════════════════════════════════════════════
-- CẬP NHẬT content_html CHO SKILL 17–24 (Khóa 1: khoa-1)
-- Chạy trong Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── SKILL 17 — Kịch Bản Gọi Chốt Đơn ───────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 17</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Viết chữ bán hàng</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Kịch Bản Gọi Chốt Đơn</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Script gọi điện tư vấn và chốt: từ mở đầu, hỏi nhu cầu, tới báo giá tự tin.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Kịch bản gọi điện + cách xử lý từ chối.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Viết script và kịch bản xử lý từ chối. <strong>Bạn cần làm:</strong> Phần nói là bạn — AI không gọi thay được.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Gọi điện mà không có script = lúng túng khi khách hỏi khó. AI giúp bạn chuẩn bị trước: câu mở đầu, câu hỏi nhu cầu, cách báo giá, cách xử lý khi khách nói "để tôi suy nghĩ".</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Để AI viết script gọi điện</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">[Dán BRAND_DNA]
Sản phẩm: [tên + giá]
Avatar khách: [tóm tắt]

Viết kịch bản gọi điện tư vấn gồm:
1. Câu mở đầu (tự nhiên, không salespy)
2. 3-5 câu hỏi khám phá nhu cầu
3. Cách trình bày giải pháp (ngắn gọn, tập trung kết quả)
4. Cách báo giá tự tin
5. Xử lý 5 lý do từ chối phổ biến:
   - "Để tôi suy nghĩ"
   - "Đắt quá"
   - "Chưa cần bây giờ"
   - "Tôi cần hỏi ý kiến..."
   - "Gửi tài liệu cho tôi xem"

Viết đúng giọng BRAND_DNA, không salespy.</pre>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Đọc to và chỉnh lại</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Đọc to script — chỗ nào nghe gượng, chỉnh lại. Ghi âm mình đọc, nghe lại. Câu nào tự nhiên giữ, câu nào giả tạo bỏ. Script tốt khi bạn nói ra mà không ai đoán bạn đang đọc.</p>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Thử gọi 1-2 cuộc thật</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Gọi cho khách thật hoặc roleplay với bạn bè. Sau mỗi cuộc: ghi lại câu nào hiệu quả, câu nào không. Chỉnh script dần. Script không bao giờ hoàn hảo ngay lần đầu.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Có script hoàn chỉnh + xử lý 5 lý do từ chối. Đã đọc to và chỉnh lại cho tự nhiên.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Script nghe salespy, gượng. Chưa có phần xử lý từ chối. Chưa đọc to thử.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 17%';


-- ─── SKILL 18 — Hệ Thống Content Đa Kênh ────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 18</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Sản xuất nội dung</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Hệ Thống Content Đa Kênh</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Sản xuất bài dài, bài viral, kịch bản, và nhân 1 nội dung thành nhiều dạng.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Lịch content + bài viết sẵn cho Facebook/TikTok/YouTube.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Viết theo giọng bạn (cần BRAND_DNA), nhân 1 bài thành nhiều dạng. <strong>Bạn cần làm:</strong> Duyệt rồi đăng.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Đừng viết mỗi bài từ đầu. Viết 1 bài gốc dài → AI nhân thành: bài Facebook ngắn, caption Instagram, script TikTok, thread, email. 1 ý tưởng = 5-7 bài trên nhiều kênh.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Viết bài gốc (pillar content)</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">[Dán BRAND_DNA]
Chủ đề: [điền chủ đề bạn muốn viết]
Avatar khách: [tóm tắt]

Viết 1 bài dài 800-1200 chữ về chủ đề này. Giọng đúng BRAND_DNA. Chia thành các phần rõ ràng. Kết bài có CTA nhẹ nhàng.</pre>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Nhân thành nhiều dạng</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Từ bài gốc trên, tạo ra:
1. Bài Facebook ngắn (200-300 chữ) — hook mạnh, kết bài có CTA
2. Caption Instagram (150 chữ) + 5 hashtag
3. Script TikTok/Reels (60 giây) — hook 3 giây đầu
4. Email newsletter (300 chữ)
5. Thread Twitter/X (5 tweet)

Giữ đúng giọng BRAND_DNA cho tất cả.</pre>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Lên lịch content tuần</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Mỗi tuần viết 1 bài gốc → nhân thành 5-7 bài → đăng mỗi ngày 1 bài trên kênh khác nhau. Lên lịch trong Notion/Google Calendar. Đều hơn quan trọng hơn nhiều.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Có 1 bài gốc + ít nhất 3 bài nhân. Có lịch content tuần này.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Mỗi bài viết từ đầu — chưa tận dụng nhân bài. Chưa có lịch đăng.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 18%';


-- ─── SKILL 19 — Marketing Việt Nam ───────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 19</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Sản xuất nội dung</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Marketing Việt Nam</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Bộ khung marketing cho người Việt: bài social, ad, video, email, ra mắt sản phẩm.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Các framework điền vào là có nội dung đúng nền tảng VN.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Gợi ý framework theo thị trường VN. <strong>Bạn cần làm:</strong> Áp dụng cho ngành cụ thể của mình.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Marketing VN khác Tây: Zalo quan trọng hơn email, Facebook vẫn mạnh nhất, video ngắn đang lên, khách VN thích tâm sự hơn bán thẳng. AI cần context VN mới gợi ý đúng.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chọn kênh phù hợp cho ngành bạn</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi bán [sản phẩm/dịch vụ] cho [đối tượng] tại Việt Nam.
Ngân sách marketing/tháng: [điền hoặc "rất ít"]

Gợi ý:
1. 2-3 kênh marketing phù hợp nhất cho ngành này tại VN (Facebook, TikTok, Zalo, YouTube, Instagram?)
2. Với mỗi kênh: đăng bao nhiêu bài/tuần, loại nội dung nào hiệu quả
3. Chiến lược marketing 30 ngày đầu tiên: tuần 1 làm gì, tuần 2 làm gì...
4. Những sai lầm hay gặp nhất khi marketing ngành này</pre>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Tạo framework nội dung cho mỗi kênh</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Với mỗi kênh đã chọn, bảo AI tạo 5 template bài viết mẫu. Ví dụ: bài dạy, bài kể chuyện, bài social proof, bài bán thẳng, bài viral. Lưu template để dùng lại.</p>
      </div>
    </div>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Lên kế hoạch 30 ngày</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Dùng chiến lược AI gợi ý ở Bước 1, chia thành lịch cụ thể mỗi ngày. Bắt đầu nhỏ: 1 kênh, 1 bài/ngày. Sau 2 tuần đều thì mở rộng.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Có chiến lược 30 ngày + template nội dung cho kênh chính. Đã bắt đầu thực hiện.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Chưa chọn kênh cụ thể. Kế hoạch quá tham — 5 kênh cùng lúc. Chưa bắt đầu.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 19%';


-- ─── SKILL 20 — Carousel Instagram ───────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 20</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Sản xuất nội dung</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Carousel Instagram</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Lên bài nhiều slide dạy hoặc kể chuyện, kèm caption và hashtag.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Nội dung từng slide + caption sẵn để thiết kế và đăng.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Viết nội dung từng slide. <strong>Bạn cần làm:</strong> Thiết kế trên Canva và đăng.</p>
  </div>

  <div style="padding: 28px;">

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Để AI viết carousel</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">[Dán BRAND_DNA]
Chủ đề carousel: [điền]
Dạng: [dạy kiến thức / kể chuyện / so sánh / bước-bước]

Viết carousel Instagram gồm:
- Slide 1: Cover — câu hook khiến người muốn vuốt tiếp
- Slide 2-8: Nội dung chính (mỗi slide 1 ý, câu ngắn, dễ đọc)
- Slide cuối: CTA
- Caption: 150 chữ + 5-10 hashtag phù hợp

Mỗi slide chỉ 20-40 chữ. Câu ngắn. Dễ đọc trên điện thoại.</pre>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Thiết kế trên Canva</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Mở Canva → chọn template Instagram Carousel → dán nội dung từng slide. Giữ font, màu nhất quán. Slide 1 phải nổi bật nhất — quyết định người ta có vuốt tiếp không.</p>
      </div>
    </div>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Đăng và theo dõi</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Đăng kèm caption. Sau 24h check: bao nhiêu người lưu (save), bao nhiêu share. Save + Share quan trọng hơn Like cho carousel.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Có ít nhất 1 carousel hoàn chỉnh đã đăng. Slide 1 có hook mạnh.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Mỗi slide quá nhiều chữ. Chưa thiết kế, chỉ có text. Slide 1 không có hook.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 20%';


-- ─── SKILL 21 — Tiêu Đề Thu Hút ─────────────────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 21</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Sản xuất nội dung</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Tiêu Đề Thu Hút</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Tạo 10 tiêu đề mỗi lần theo nhiều kiểu: câu hỏi, số liệu, tò mò, list, story.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Danh sách tiêu đề để chọn cái hay nhất cho mỗi bài.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Ra 10 tiêu đề/lần theo nhiều kiểu. <strong>Bạn cần làm:</strong> Chọn cái hiệu quả nhất.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">80% người chỉ đọc tiêu đề. Tiêu đề quyết định bài có ai đọc không. Đừng nghĩ 1 tiêu đề rồi dùng — tạo 10 cái, chọn 1. AI làm việc này trong 30 giây.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Tạo 10 tiêu đề</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Chủ đề: [điền]
Đối tượng: [avatar]
Nền tảng: [Facebook/Instagram/YouTube/Email]

Viết 10 tiêu đề theo các kiểu:
1-2: Câu hỏi (khiến người đọc tự hỏi)
3-4: Số liệu / con số cụ thể
5-6: Tò mò / bất ngờ
7-8: List (X cách / X sai lầm / X bí quyết)
9-10: Story / tình huống thật

Mỗi tiêu đề dưới 15 chữ. Tiếng Việt tự nhiên.</pre>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Chọn và test</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Chọn 2-3 tiêu đề hay nhất. Tiêu chí:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Đọc xong có muốn đọc tiếp không?<br>
          • Có quá clickbait không? (hứa nhiều nhưng bài không deliver)<br>
          • Khách mục tiêu đọc có thấy liên quan đến mình không?
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 10px 0 0;">Mẹo: gửi 2-3 tiêu đề cho bạn bè hỏi "cái nào bạn muốn click nhất?"</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Tạo được 10 tiêu đề, chọn 1 cái hay. Biết dùng prompt này mỗi khi viết bài mới.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Vẫn nghĩ 1 tiêu đề rồi dùng luôn. Tiêu đề quá chung chung hoặc clickbait.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 21%';


-- ─── SKILL 22 — Chatbot Messenger & Instagram ────────────────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 22</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Tự động hóa</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Chatbot Messenger &amp; Instagram</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Cấu hình trợ lý AI trả lời khách tự động trên Messenger/Instagram của Page bạn.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Bản đặc tả copy-paste vào Meta Business Suite để bot trả khách.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Trả tự động phần lớn câu hỏi. <strong>Bạn cần làm:</strong> Cần có Page Facebook. Câu khó bot chuyển cho bạn.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Khách nhắn tin thường hỏi lặp lại: giá bao nhiêu, ship bao lâu, có bảo hành không. Bot trả lời ngay 24/7, bạn chỉ xử lý câu hỏi khó. Tiết kiệm hàng giờ/ngày.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Liệt kê câu hỏi khách hay hỏi</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Mở inbox Messenger/Instagram, đọc 20-30 tin nhắn gần nhất. Ghi ra 10 câu hỏi lặp lại nhiều nhất. Đây là những câu bot sẽ trả.</p>
      </div>
    </div>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Viết bản đặc tả bot</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase;">PROMPT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">[Dán BRAND_DNA]
Sản phẩm: [tên + giá]
10 câu hỏi khách hay hỏi: [liệt kê]

Viết bản đặc tả chatbot cho Meta Business Suite gồm:
1. Lời chào khi khách nhắn lần đầu
2. Câu trả lời cho mỗi câu hỏi (ngắn gọn, đúng giọng)
3. Khi nào chuyển cho người thật
4. Tin nhắn tự động ngoài giờ làm việc

Giọng tự nhiên, thân thiện, như người thật đang trả lời.</pre>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Cài đặt trong Meta Business Suite</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Vào Meta Business Suite → Inbox → Tự động hóa. Copy-paste câu trả lời từ bản đặc tả. Test bằng cách nhắn thử từ tài khoản khác. Chỉnh nếu bot trả lời chưa tự nhiên.</p>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Bot đang chạy, trả đúng 10 câu hỏi thường gặp. Có rule chuyển cho người thật khi cần.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Chưa cài thật. Bot trả lời nghe như robot. Không có rule chuyển cho người.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 22%';


-- ─── SKILL 23 — Nghiên Cứu Tài Liệu Bằng AI (NotebookLM) ──────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 23</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Tự động hóa</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Nghiên Cứu Tài Liệu Bằng AI</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Đưa tài liệu vào AI để tóm tắt, hỏi đáp, tạo podcast/quiz/mindmap từ tài liệu.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Bản tóm tắt, podcast, quiz... tạo từ tài liệu của bạn.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>AI làm được:</strong> Tóm tắt, hỏi đáp, tạo nội dung từ tài liệu. <strong>Bạn cần làm:</strong> Upload tài liệu và chọn output phù hợp.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">NotebookLM của Google là công cụ miễn phí tuyệt vời để nghiên cứu. Upload sách, PDF, bài viết vào → AI đọc và trả lời câu hỏi dựa trên tài liệu thật, không bịa.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Các Bước Thực Hiện</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Vào NotebookLM</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Truy cập <strong>notebooklm.google.com</strong> (miễn phí, cần tài khoản Google).</p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Tạo Notebook mới → Upload tài liệu (PDF, Google Docs, text, website URL). Có thể upload nhiều tài liệu vào cùng 1 notebook.</p>
      </div>
    </div>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Hỏi đáp và tạo nội dung</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • <strong>Tóm tắt:</strong> "Tóm tắt tài liệu này trong 5 gạch đầu dòng"<br>
          • <strong>Hỏi đáp:</strong> "Theo tài liệu, cách tốt nhất để X là gì?"<br>
          • <strong>Podcast:</strong> Click "Generate Audio Overview" → được podcast 2 người thảo luận<br>
          • <strong>FAQ:</strong> "Tạo 10 câu hỏi thường gặp từ tài liệu"<br>
          • <strong>Mindmap:</strong> "Tạo dàn ý dạng cây cho nội dung tài liệu"
        </div>
      </div>
    </div>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Ứng dụng vào kinh doanh</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Upload sách ngành → tạo content từ kiến thức sách<br>
          • Upload FAQ khách → train bot trả lời chính xác hơn<br>
          • Upload SOP → tạo quiz kiểm tra cho nhân viên/học viên<br>
          • Upload nhiều nguồn → để AI tổng hợp cross-reference
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
      <div style="background: #EAF5EF; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase;">✅ Được duyệt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Đã tạo 1 notebook với tài liệu thật. Đã dùng để tạo ít nhất 1 output hữu ích.</div>
      </div>
      <div style="background: #FEF2F2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">Chỉ đọc hướng dẫn, chưa vào NotebookLM thử. Chưa upload tài liệu thật.</div>
      </div>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 24%';
-- NOTE: Trong DB, NotebookLM = "Skill 24" (Khóa 1 không có Skill 23)


-- ─── SKILL 25 (DB) — Trợ Lý AI Tiểu Hà Mã (Telegram) ──────────────────
UPDATE lessons
SET content_html = '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">SKILL 24</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Nhóm: Tự động hóa</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Trợ Lý AI Tiểu Hà Mã (Telegram)</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Trợ lý AI trên Telegram trả lời thắc mắc khi bạn học và làm, theo SOP của khóa.</p>
  </div>

  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output bạn cầm được sau skill này</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Một nơi hỏi 24/7 khi bị kẹt, không phải chờ.</p>
  </div>

  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>Khóa 1:</strong> Hỏi-đáp khi học. <strong>Khóa 2:</strong> Dũng cài Tiểu Hà Mã riêng, kèm sát theo business của bạn.</p>
  </div>

  <div style="padding: 28px;">

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Tư Duy AI-First</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.6;">Lúc 11 giờ đêm bạn đang làm skill mà bị kẹt — không biết hỏi ai. Tiểu Hà Mã là trợ lý AI được train theo nội dung khóa học, trả lời đúng context của bạn, bất cứ lúc nào.</p>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; margin: 0 0 16px;">▤ Cách Sử Dụng</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Vào nhóm Telegram</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Click link nhóm Telegram đã nhận trong email chào mừng. Tiểu Hà Mã đang ở trong nhóm, sẵn sàng trả lời.</p>
      </div>
    </div>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Hỏi đúng cách</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Để nhận câu trả lời tốt nhất:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Nói rõ bạn đang làm skill mấy<br>
          • Nói bạn đang kẹt ở bước nào<br>
          • Paste đoạn bạn đã làm (nếu có) để Tiểu Hà Mã xem<br>
          • Hỏi cụ thể: "Phần này tôi viết đúng chưa?" tốt hơn "Giúp tôi với"
        </div>
      </div>
    </div>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Tận dụng tối đa</span>
      </div>
      <div style="padding: 16px 20px;">
        <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #333; line-height: 1.8;">
          <strong>Review output:</strong> Paste output bạn làm được → Tiểu Hà Mã check và gợi ý chỉnh<br>
          <strong>Debug prompt:</strong> Prompt AI không ra kết quả tốt? → Paste vào hỏi cách sửa<br>
          <strong>Chiến lược:</strong> Không biết nên làm skill nào tiếp? → Hỏi Tiểu Hà Mã gợi ý
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 6px;">💡 Khóa 2 — Tiểu Hà Mã Riêng</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Ở Khóa 2, Dũng cài Tiểu Hà Mã riêng cho bạn — được train theo business cụ thể của bạn: sản phẩm, avatar, BRAND_DNA. Trả lời không chỉ theo SOP chung mà theo context riêng của bạn. + 1 buổi 1-kèm-1 với Dũng.</p>
    </div>

  </div>
</div>'
WHERE course_id = 'khoa-1' AND title LIKE 'Skill 25%';
-- NOTE: Trong DB, Tiểu Hà Mã = "Skill 25"
