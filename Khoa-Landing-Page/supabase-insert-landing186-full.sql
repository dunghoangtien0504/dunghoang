-- ============================================================
-- Khóa landing_186 — chạy 1 lần trong Supabase SQL Editor
-- Thứ tự: 1) course_products  2) lessons
-- ============================================================

-- 1. Thêm khóa vào course_products (parent table)
INSERT INTO course_products (id, name, price, description, is_active, commission_pct)
VALUES (
  'landing_186',
  'Tạo Landing Page Chuyển Đổi Cao',
  1868000,
  'Dùng Vibe Coding + 8 skill file để tự thiết kế landing page: chân dung khách, giọng văn, offer Hormozi, cơ chế khác biệt, phễu, build HTML, UI/UX, deploy Vercel, SePay, Meta Pixel.',
  true,
  20
)
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  price       = EXCLUDED.price,
  description = EXCLUDED.description,
  is_active   = EXCLUDED.is_active;

-- 2. Xóa lessons cũ nếu chạy lại
DELETE FROM lessons WHERE course_id = 'landing_186';

-- 3. Insert 10 lessons
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Tổng Quan + Cài Công Cụ Vibe Coding',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 1</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Khóa Landing Page Chuyển Đổi Cao</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Tổng Quan + Cài Công Cụ Vibe Coding</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Bài đầu tiên không có skill nào, chỉ cài công cụ. Khi xong bài này, máy của bạn đã sẵn sàng để chạy 9 skill phía sau.</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối Bài 1</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0; line-height: 1.7;">Đã cài 1 trong 3 công cụ (Cursor, Antigravity, Claude Code). Đã tạo thư mục <strong>landing-page-cua-toi</strong> trên máy. Đã test chat thử với AI trong công cụ và nhận được phản hồi.</p>
  </div>

  <!-- Transparency -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>Không cần biết code.</strong> Vibe Coding là cách dùng AI thông qua chat trong công cụ lập trình. Bạn không gõ code, chỉ ra lệnh bằng tiếng Việt. AI làm phần còn lại.</p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- What is Vibe Coding -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">💡 Vibe Coding Là Gì?</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0 0 10px; line-height: 1.7;">Cách làm việc với AI khi bạn không biết code: mở 1 công cụ lập trình (Cursor, Antigravity, hoặc Claude Code), tải file skill về thư mục, rồi chat với AI như nói chuyện thường: "Đọc file skill 1 rồi giúp tôi làm avatar khách hàng cho sản phẩm bán nến thơm".</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">AI sẽ đọc skill, hiểu cách làm, rồi đặt câu hỏi cho bạn từng bước. Bạn trả lời. AI viết ra output. Bạn copy ra Google Doc.</p>
    </div>

    <!-- Why 3 tools -->
    <div style="margin-bottom: 28px;">
      <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🎯 Bạn Chỉ Cần Chọn 1 Trong 3</p>
      <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px;">
        <p style="font-size: 14px; color: #333; line-height: 1.7; margin: 0;">Cả 3 công cụ này đều làm được 9 skill trong khóa. Khác biệt chỉ là cách hiển thị và giá. Cài 1 cái và dùng cái đó cho cả khóa. Không cần cài hết.</p>
      </div>
    </div>

    <!-- Tool 1: Cursor -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">▤ 3 Công Cụ Đề Xuất</p>

    <div style="margin-bottom: 16px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="background: #1D9E75; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">DỄ NHẤT</span>
          <span style="color: #F6F0E4; font-weight: 700; font-size: 15px;">Cursor</span>
        </div>
        <span style="color: #88860B; font-size: 11px; font-weight: 600;">Free tier hoặc 20$/tháng</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 13px; color: #444; line-height: 1.7; margin: 0 0 10px;"><strong>Hợp với ai:</strong> Người mới hoàn toàn, chưa từng dùng IDE. Giao diện giống VS Code, có khung chat AI bên phải.</p>
        <p style="font-size: 13px; color: #444; line-height: 1.7; margin: 0 0 10px;"><strong>Tải về:</strong> Vào <strong style="color: #0D2B1A;">cursor.com</strong>, bấm Download for Windows/Mac, chạy file cài đặt.</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 12px 14px; font-size: 12.5px; color: #555; line-height: 1.7;">
          <strong>Free tier:</strong> 50 chat AI premium/tháng. Đủ cho cả khóa nếu chat gọn. <strong>Pro 20$:</strong> không giới hạn.
        </div>
      </div>
    </div>

    <!-- Tool 2: Antigravity -->
    <div style="margin-bottom: 16px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="background: #E8A020; color: #0D2B1A; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">MỚI</span>
          <span style="color: #F6F0E4; font-weight: 700; font-size: 15px;">Antigravity</span>
        </div>
        <span style="color: #88860B; font-size: 11px; font-weight: 600;">Free trong giai đoạn beta</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 13px; color: #444; line-height: 1.7; margin: 0 0 10px;"><strong>Hợp với ai:</strong> Người thích giao diện hiện đại, muốn dùng AI Gemini. Hoạt động như Cursor nhưng dùng AI của Google.</p>
        <p style="font-size: 13px; color: #444; line-height: 1.7; margin: 0 0 10px;"><strong>Tải về:</strong> Tìm trên Google "<strong style="color: #0D2B1A;">Antigravity by Google</strong>", vào trang chính thức của Google để tải. Có cả Windows và Mac.</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 12px 14px; font-size: 12.5px; color: #555; line-height: 1.7;">
          <strong>Lưu ý:</strong> Đang beta nên đôi khi cập nhật giao diện. Nếu thấy lạ so với video hướng dẫn, là do mới update.
        </div>
      </div>
    </div>

    <!-- Tool 3: Claude Code -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">MẠNH NHẤT</span>
          <span style="color: #F6F0E4; font-weight: 700; font-size: 15px;">Claude Code</span>
        </div>
        <span style="color: #88860B; font-size: 11px; font-weight: 600;">17$/tháng (Pro)</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 13px; color: #444; line-height: 1.7; margin: 0 0 10px;"><strong>Hợp với ai:</strong> Người đã quen dùng terminal (cửa sổ đen gõ lệnh). Hoặc dùng song song với Cursor/Antigravity để chuyên invoke skill phức tạp.</p>
        <p style="font-size: 13px; color: #444; line-height: 1.7; margin: 0 0 10px;"><strong>Tải về:</strong> Vào <strong style="color: #0D2B1A;">claude.com/claude-code</strong>. Có hai cách: cài app desktop, hoặc cài CLI bằng lệnh <code style="background:#F6F0E4;padding:1px 6px;border-radius:4px;font-size:12px;">npm install -g @anthropic-ai/claude-code</code>.</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 12px 14px; font-size: 12.5px; color: #555; line-height: 1.7;">
          <strong>Mạnh nhất khi:</strong> Skill được package dưới dạng .skill và auto-invoke. Hợp người dùng nâng cao.
        </div>
      </div>
    </div>

    <!-- Recommendation -->
    <div style="background: #EAF5EF; border: 2px solid #1D9E75; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">🎯 Gợi Ý Của Dũng</p>
      <p style="font-size: 14px; color: #1a1a1a; line-height: 1.7; margin: 0;">Nếu lần đầu tiếp cận, cài <strong>Cursor</strong>. Giao diện rõ ràng, free tier đủ chạy cả khóa, có nhiều video Việt Nam hướng dẫn nếu lỡ kẹt. Quen rồi muốn nâng cấp thì chuyển sang Antigravity hoặc Claude Code sau.</p>
    </div>

    <!-- Setup workflow -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">▤ Các Bước Setup Lần Đầu</p>

    <!-- Step 1 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 1</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Tải và cài 1 công cụ</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Chọn 1 công cụ ở trên. Vào link, tải file cài đặt, chạy như cài phần mềm bình thường (Next, Next, Install).</p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Sau khi cài xong, mở công cụ. Lần đầu mở sẽ yêu cầu đăng nhập (Google, Email, hoặc tài khoản tương ứng). Đăng nhập xong là chạy được.</p>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 2</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Tạo thư mục làm việc</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Trên máy, tạo 1 thư mục mới ở chỗ dễ tìm (Desktop hoặc Documents). Đặt tên: <strong style="color: #0D2B1A;">landing-page-cua-toi</strong>.</p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Trong công cụ vừa cài, bấm <strong>File → Open Folder</strong> rồi chọn thư mục vừa tạo. Công cụ sẽ load thư mục đó vào bên trái màn hình.</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #555; line-height: 1.7;">
          <strong>Vì sao cần thư mục riêng:</strong> Mỗi bài học bạn sẽ tải 1 file skill về đây. AI trong công cụ đọc các file trong thư mục này để biết phải làm gì.
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="background: #0D2B1A; padding: 12px 20px; display: flex; align-items: center; gap: 10px;">
        <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">Bước 3</span>
        <span style="color: #F6F0E4; font-weight: 600; font-size: 14px;">Test chat thử với AI</span>
      </div>
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Mở khung chat AI trong công cụ (thường ở bên phải, hoặc nhấn <strong>Ctrl+L</strong> trên Windows / <strong>Cmd+L</strong> trên Mac). Gõ thử câu sau:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CHAT THỬ</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''''Courier New'''', monospace;">Chào, tôi đang học khóa Landing Page của Dũng Hoàng.
Bạn giới thiệu ngắn cho tôi biết AI giúp tôi làm landing page như thế nào không?</pre>
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Nếu AI trả lời, là setup thành công. Nếu báo lỗi (chưa đăng nhập / hết lượt / chưa cấu hình), làm theo hướng dẫn trên màn hình. Kẹt thì nhắn Dũng.</p>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- How skills work -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📋 Cách Dùng Skill Từ Bài 2 Trở Đi</p>

    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      <p style="font-size: 14px; color: #333; line-height: 1.8; margin: 0 0 14px;">Mỗi bài học từ Bài 2 sẽ có 4 phần:</p>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; align-items: flex-start; gap: 12px;"><span style="background: #88860B; color: #0D2B1A; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px; flex-shrink: 0;">1</span><span style="font-size: 13.5px; color: #444; line-height: 1.6;"><strong>Link tải file skill</strong>: bấm tải về máy, kéo vào thư mục <strong>landing-page-cua-toi</strong></span></div>
        <div style="display: flex; align-items: flex-start; gap: 12px;"><span style="background: #88860B; color: #0D2B1A; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px; flex-shrink: 0;">2</span><span style="font-size: 13.5px; color: #444; line-height: 1.6;"><strong>Câu chat mở đầu</strong>: copy paste vào khung chat AI, vd "Đọc file skill-01.md và áp dụng cho sản phẩm [của tôi]"</span></div>
        <div style="display: flex; align-items: flex-start; gap: 12px;"><span style="background: #88860B; color: #0D2B1A; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px; flex-shrink: 0;">3</span><span style="font-size: 13.5px; color: #444; line-height: 1.6;"><strong>Trả lời AI từng câu hỏi</strong>: AI sẽ hỏi từng bước, bạn trả lời bằng tiếng Việt như chat Zalo</span></div>
        <div style="display: flex; align-items: flex-start; gap: 12px;"><span style="background: #88860B; color: #0D2B1A; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px; flex-shrink: 0;">4</span><span style="font-size: 13.5px; color: #444; line-height: 1.6;"><strong>Lưu output</strong>: AI viết ra kết quả, bạn copy ra Google Doc, lưu lại với tên file bài đó yêu cầu</span></div>
      </div>
    </div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Xong Bài 1 khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Đã cài 1 công cụ, mở được.<br><br>
          Đã có thư mục <strong>landing-page-cua-toi</strong> trên máy.<br><br>
          Chat thử với AI và nhận được phản hồi.
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa xong khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Mới đọc, chưa cài công cụ nào.<br><br>
          Cài rồi nhưng chưa mở được hoặc chưa đăng nhập.<br><br>
          Chưa tạo thư mục làm việc.
        </div>
      </div>
    </div>

    <!-- Final tip -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">💡 Lần Đầu Cài Thấy Khó Là Bình Thường</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Ai cũng vậy. Cài xong rồi thì mở khóa 9 skill phía sau. Không cài thì khóa không dùng được. Nếu kẹt ở bước nào, chụp ảnh màn hình gửi vào <a href="https://web.telegram.org/a/#-5493805985" target="_blank" style="color: #F6F0E4; text-decoration: underline; font-weight: bold;">Group Telegram (có Tiểu Hà Mã hỗ trợ 24/7)</a>, mình hướng dẫn lại trong 5 phút.</p>
    </div>

    <!-- Next step -->
    <div style="background: #88860B; border-radius: 12px; padding: 14px 18px;">
      <p style="color: #0D2B1A; font-size: 13px; margin: 0; line-height: 1.6;"><strong>Xong Bài 1?</strong> Tick "Tự đánh dấu xong" rồi mở <strong>Bài 2 — Skill #01 Chân Dung Khách Hàng</strong>. Bài 2 sẽ có link tải file skill đầu tiên.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  1,
  true,
  true
);
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Skill #01 — Chân Dung Khách Hàng',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 2</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Skill #01 • Avatar Builder</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Chân Dung Khách Hàng</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Trước khi viết một chữ nào lên landing page, phải biết viết cho ai. Skill này hỏi bạn 5 câu rồi viết ra bản chân dung khách dùng cho 7 bài còn lại.</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối bài</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">File <strong>avatar-khach-hang.md</strong> trong thư mục làm việc. Chứa tên khách, nghề, nỗi đau, kết quả lý tưởng, câu họ hay nói.</p>
  </div>

  <!-- Time + difficulty -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>⏱ Thời gian:</strong> 30 phút • <strong>🎚 Độ khó:</strong> Dễ • <strong>🔧 Cần:</strong> Công cụ Vibe Coding đã cài ở Bài 1</p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Download skill -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📦 Bước 1 — Tải File Skill</p>

    <div style="background: white; border: 2px solid #1D9E75; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #1D9E75; border-radius: 10px; padding: 10px 14px; flex-shrink: 0;"><span style="color: white; font-size: 18px;">📄</span></div>
        <div>
          <p style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0;">agent-avatar-builder.zip</p>
          <p style="font-size: 12px; color: #666; margin: 2px 0 0;">File zip, 16KB — giải nén để thấy các file skill bên trong</p>
        </div>
      </div>
      <a href="https://dunghoang.com/skills/agent-avatar-builder.zip" download style="display: inline-block; background: #0D2B1A; color: #F6F0E4; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">⬇ Tải Skill #01 Về Máy</a>
      <p style="font-size: 12px; color: #888; margin: 12px 0 0; line-height: 1.6;">Tải về → giải nén → kéo <strong>toàn bộ folder agent-avatar-builder</strong> vào thư mục <strong>landing-page-cua-toi</strong> bạn tạo ở Bài 1.</p>
    </div>

    <!-- Step 2: Open in tool -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">▤ Bước 2 — Mở Thư Mục Trong Công Cụ</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Mở công cụ Vibe Coding bạn cài ở Bài 1 (Cursor / Antigravity / Claude Code). Bấm <strong>File → Open Folder</strong> và chọn thư mục <strong>landing-page-cua-toi</strong>.</p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0;">Bên trái màn hình sẽ thấy folder <strong>agent-avatar-builder</strong> và các file bên trong. Tức là công cụ đã thấy skill. Sẵn sàng để chat với AI.</p>
      </div>
    </div>

    <!-- Step 3: Chat command -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💬 Bước 3 — Copy Câu Chat Này Vào Khung AI</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Mở khung chat AI (thường ở bên phải, hoặc <strong>Ctrl+L</strong> trên Windows / <strong>Cmd+L</strong> trên Mac). Copy nguyên đoạn dưới đây, điền thông tin của bạn vào chỗ <strong>[...]</strong>, rồi paste vào chat:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CÂU CHAT MỞ ĐẦU — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''''Courier New'''', monospace;">Đọc các file trong folder agent-avatar-builder.

Sau đó áp dụng skill cho tôi. Thông tin của tôi:

Tôi đang kinh doanh: [mô tả ngắn sản phẩm/dịch vụ]
Khách hàng tôi nhắm tới: [nghề, độ tuổi, tình trạng]

Hãy hỏi tôi từng câu một như skill yêu cầu.
Khi xong, lưu kết quả vào file avatar-khach-hang.md trong thư mục này.</pre>
        </div>
        <p style="font-size: 13px; color: #888; margin: 12px 0 0; font-style: italic;">Nhấn Enter. AI sẽ đọc file, hiểu cách làm, rồi hỏi bạn câu đầu tiên.</p>
      </div>
    </div>

    <!-- Step 4: Answer -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💭 Bước 4 — Trả Lời AI Từng Câu Hỏi</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">AI sẽ hỏi 5 câu chính (theo skill):</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.9;">
          1. Khách của bạn thường làm nghề gì?<br>
          2. Họ hay nhắn hỏi bạn điều gì nhất?<br>
          3. Câu phàn nàn bạn nghe nhiều nhất?<br>
          4. Họ đã thử làm gì trước khi tìm đến bạn?<br>
          5. Kết quả họ muốn sau khi mua là gì?
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 14px 0 0;">Trả lời từng câu bằng tiếng Việt như đang chat Zalo với bạn thân. Không cần dài, không cần đẹp. <strong>Thật quan trọng hơn hay.</strong></p>
        <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 16px; margin-top: 12px;">
          <p style="font-size: 12px; font-weight: 600; color: #2D7A4F; margin: 0 0 6px;">Mẹo trả lời câu 2-3</p>
          <p style="font-size: 13px; color: #444; margin: 0; line-height: 1.7;">Mở Zalo/Facebook Messenger, lướt lại tin nhắn khách trong 1-2 tháng gần đây. Copy nguyên câu họ nhắn (không sửa) vào câu trả lời. Đó là vàng.</p>
        </div>
      </div>
    </div>

    <!-- Step 5: Output -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💾 Bước 5 — Kiểm Tra Output</p>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Sau khi trả lời hết, AI sẽ tạo file <strong>avatar-khach-hang.md</strong> trong thư mục. Bên trái màn hình sẽ thấy file mới hiện ra.</p>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Bấm vào file đó để đọc. Tự hỏi:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Đọc xong, có hình dung ra 1 người cụ thể không?<br>
          • Nỗi đau ghi có giống câu khách hay nhắn không?<br>
          • Câu "khách hay nói" có nghe tự nhiên không?
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Chỗ nào sai, quay lại chat: <em style="color: #3D6B4A;">"Phần [tên phần] chưa đúng. Khách của tôi thường nói [câu thật]. Sửa lại."</em> AI sẽ cập nhật file.</p>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Xong Bài 2 khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          File <strong>avatar-khach-hang.md</strong> đã có trong thư mục.<br><br>
          Đọc avatar xong, hình dung ngay ra 1 người thật cụ thể.<br><br>
          Có ít nhất 1 câu trích nguyên văn từ khách thật.
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Avatar mô tả kiểu "người muốn kinh doanh tốt hơn".<br><br>
          Không có câu nói thật của khách, chỉ có câu AI tự nghĩ.<br><br>
          Chưa lưu file, mới chỉ có trong chat.
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">📝 Nộp Bài</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Copy nội dung file <strong>avatar-khach-hang.md</strong> sang Google Doc, share link "Anyone with link can view", paste link vào ô "Nộp bài" bên dưới. Dũng đọc và phản hồi trong ngày.</p>
    </div>

    <!-- Next step -->
    <div style="background: #88860B; border-radius: 12px; padding: 14px 18px;">
      <p style="color: #0D2B1A; font-size: 13px; margin: 0; line-height: 1.6;"><strong>Xong Bài 2?</strong> Mở <strong>Bài 3 — Skill #02 Giọng Văn Thương Hiệu (BRAND_DNA)</strong>. AI sẽ học cách bạn viết để chữ trong landing page nghe đúng giọng bạn.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  2,
  false,
  true
);
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Skill #02 — Giọng Văn Thương Hiệu (BRAND_DNA)',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 3</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Skill #02 • Brand Voice</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Giọng Văn Thương Hiệu (BRAND_DNA)</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Mọi chữ AI viết ra phía sau, kể cả landing page, sẽ nghe đúng giọng bạn nói chuyện hằng ngày. Không còn cảm giác "AI viết hộ".</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối bài</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">File <strong>brand-dna.md</strong> trong thư mục làm việc. Đoạn 200-400 chữ mô tả cách bạn viết. Dán vào đầu mọi chat AI sau này là AI tự giữ giọng.</p>
  </div>

  <!-- Time + difficulty -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>⏱ Thời gian:</strong> 45 phút • <strong>🎚 Độ khó:</strong> Vừa • <strong>🔧 Cần:</strong> 5-10 bài viết cũ bạn đã đăng (Facebook, Zalo, email)</p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Download skill -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📦 Bước 1 — Tải File Skill</p>

    <div style="background: white; border: 2px solid #1D9E75; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #1D9E75; border-radius: 10px; padding: 10px 14px; flex-shrink: 0;"><span style="color: white; font-size: 18px;">📄</span></div>
        <div>
          <p style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0;">agent-brand-voice.zip</p>
          <p style="font-size: 12px; color: #666; margin: 2px 0 0;">File zip, 8KB — giải nén, kéo folder vào thư mục làm việc</p>
        </div>
      </div>
      <a href="https://dunghoang.com/skills/agent-brand-voice.zip" download style="display: inline-block; background: #0D2B1A; color: #F6F0E4; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">⬇ Tải Skill #02 Về Máy</a>
      <p style="font-size: 12px; color: #888; margin: 12px 0 0; line-height: 1.6;">Tải về → giải nén → kéo <strong>folder agent-brand-voice</strong> vào thư mục <strong>landing-page-cua-toi</strong>. Bên cạnh folder <strong>agent-avatar-builder</strong> và file <strong>avatar-khach-hang.md</strong> đã có từ Bài 2.</p>
    </div>

    <!-- Step 2: Prep -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📋 Bước 2 — Chuẩn Bị Bài Viết Cũ</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Tìm 5-10 bài bạn đã viết thật mà cảm thấy "cái này nghe giống mình nhất". Có thể là:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Bài đăng Facebook<br>
          • Caption Instagram<br>
          • Tin nhắn dài bạn gửi cho khách qua Zalo<br>
          • Email bạn viết cho ai đó<br>
          • Đoạn mô tả sản phẩm bạn tự viết
        </div>
        <p style="font-size: 13px; color: #888; margin: 12px 0 0; font-style: italic;">Chưa có bài viết nào? Bỏ qua bước này, chat AI sẽ hỏi 7 câu để tự build BRAND_DNA.</p>
      </div>
    </div>

    <!-- Step 3: Chat command -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💬 Bước 3 — Copy Câu Chat Này</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Mở chat AI, paste đoạn này:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CÂU CHAT MỞ ĐẦU — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''''Courier New'''', monospace;">Đọc các file trong folder agent-brand-voice.

Tôi sẽ paste 5-10 bài viết cũ của tôi.
Hãy phân tích giọng văn và viết ra file brand-dna.md theo đúng skill yêu cầu.

Đây là các bài viết cũ:

[PASTE BÀI VIẾT 1]

---

[PASTE BÀI VIẾT 2]

---

[PASTE BÀI VIẾT 3]

(... paste hết tất cả bài, mỗi bài cách nhau bằng ---)</pre>
        </div>
        <p style="font-size: 13px; color: #888; margin: 12px 0 0; font-style: italic;">Không có bài cũ? Thay phần PASTE bằng câu: "Tôi chưa có bài viết cũ. Hãy hỏi tôi 7 câu để tự build BRAND_DNA theo phương án 2B trong skill."</p>
      </div>
    </div>

    <!-- Step 4: Review -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🔍 Bước 4 — Đọc BRAND_DNA AI Viết, Chỉnh Cho Đúng</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">AI sẽ tạo file <strong>brand-dna.md</strong>. Mở đọc và tự hỏi:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Dòng này có phản ánh đúng cách mình viết không?<br>
          • Có dòng nào nghe "cứng" hoặc trang trọng quá không?<br>
          • Có dòng nào AI tự thêm vào mà thực ra mình không vậy không?<br>
          • Có phần "KHÔNG bao giờ dùng" chưa? Phần này quan trọng không kém phần "hay dùng".
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 14px 0 0;">Chỗ nào sai, bảo AI: <em style="color: #3D6B4A;">"Xóa dòng [...]. Thêm vào: tôi không bao giờ dùng từ [...] vì nghe giả tạo."</em></p>
      </div>
    </div>

    <!-- Step 5: Test -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🧪 Bước 5 — Test BRAND_DNA</p>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Mở chat MỚI (Ctrl+N hoặc tạo session mới). Paste lệnh test:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 14px 16px;">
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''''Courier New'''', monospace;">Đọc file brand-dna.md.

Sau đó viết một bài đăng Facebook khoảng 100-150 chữ
giới thiệu [sản phẩm của bạn]. Viết đúng giọng đã mô tả
trong brand-dna.md.</pre>
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 10px;">Đọc bài AI viết và tự hỏi: <strong>Nếu không biết AI viết, mình có nghĩ đây là bài mình tự viết không?</strong></p>
        <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 16px;">
          <p style="font-size: 12px; font-weight: 600; color: #2D7A4F; margin: 0 0 6px;">Cách test mạnh hơn</p>
          <p style="font-size: 13px; color: #444; margin: 0; line-height: 1.7;">Gửi bài AI test cho 1 người quen (không nói AI viết). Nếu họ nói "ừ, nghe giống bạn", là BRAND_DNA đã đủ tốt. Nếu họ thấy lạ, quay lại Bước 4 chỉnh.</p>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Xong Bài 3 khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          File <strong>brand-dna.md</strong> đã có, khoảng 150-400 chữ.<br><br>
          Đã test ít nhất 1 lần, bài AI viết nghe giống bạn.<br><br>
          BRAND_DNA có cả phần "hay dùng" và "không bao giờ dùng".
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          BRAND_DNA chỉ ghi "viết ngắn gọn, chân thực" — quá chung.<br><br>
          Chưa test, không biết AI có viết đúng giọng không.<br><br>
          Không có phần từ ngữ cấm / điều không bao giờ viết.
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">📝 Nộp Bài</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Copy nội dung <strong>brand-dna.md</strong> + bài AI test viết ra. Paste vào Google Doc, share link, nộp vào ô bên dưới. Dũng đọc và góp ý chỗ giọng chưa đúng.</p>
    </div>

    <!-- Next step -->
    <div style="background: #88860B; border-radius: 12px; padding: 14px 18px;">
      <p style="color: #0D2B1A; font-size: 13px; margin: 0; line-height: 1.6;"><strong>Xong Bài 3?</strong> Mở <strong>Bài 4 — Skill #03 Tư Duy Offer Kiểu Hormozi</strong>. Bài 4 dạy cách đóng gói sản phẩm sao cho khách thấy giá trị cao hơn giá tiền.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  3,
  false,
  true
);
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Skill #03 — Tư Duy Offer Kiểu Hormozi',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 4</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Skill #03 • Hormozi System</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Tư Duy Offer Kiểu Hormozi</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Cùng một sản phẩm, cách đóng gói quyết định khách thấy "rẻ" hay "đắt". Bài này dạy bạn tính điểm offer theo Value Equation của Hormozi — điểm nào thấp, biết sửa chỗ nào.</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối bài</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">File <strong>offer-scorecard.md</strong> trong thư mục làm việc. Điểm offer theo 4 trục Hormozi + danh sách chỉnh sửa ưu tiên cao.</p>
  </div>

  <!-- Time + difficulty -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>⏱ Thời gian:</strong> 45 phút • <strong>🎚 Độ khó:</strong> Vừa • <strong>🔧 Cần:</strong> File <strong>avatar-khach-hang.md</strong> từ Bài 2</p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Context block -->
    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; font-weight: 700; color: #0D2B1A; margin: 0 0 10px;">Tại sao cần Hormozi trước khi viết landing page?</p>
      <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Alex Hormozi (tác giả $100M Offers) có 1 công thức tính giá trị offer:</p>
      <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.9; font-style: italic; text-align: center;">
        <strong>Giá trị = (Kết quả mơ ước × Xác suất đạt được) ÷ (Thời gian chờ × Công sức bỏ ra)</strong>
      </div>
      <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Landing page cao điểm không phải nhờ chữ đẹp. Nhờ offer có điểm cao ở 4 trục này. Nếu offer yếu, viết copy hay đến đâu cũng không cứu được.</p>
    </div>

    <!-- Download skill -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📦 Bước 1 — Tải File Skill</p>

    <div style="background: white; border: 2px solid #1D9E75; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #1D9E75; border-radius: 10px; padding: 10px 14px; flex-shrink: 0;"><span style="color: white; font-size: 18px;">⚙️</span></div>
        <div>
          <p style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0;">hormozi-system.skill</p>
          <p style="font-size: 12px; color: #666; margin: 2px 0 0;">File skill, 27KB — AI đọc và chạy quy trình đánh giá offer</p>
        </div>
      </div>
      <a href="https://dunghoang.com/skills/hormozi-system.skill" download style="display: inline-block; background: #0D2B1A; color: #F6F0E4; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">⬇ Tải Skill #03 Về Máy</a>
      <p style="font-size: 12px; color: #888; margin: 12px 0 0; line-height: 1.6;">Kéo file vào thư mục <strong>landing-page-cua-toi</strong>. Bên cạnh <strong>avatar-khach-hang.md</strong> và <strong>brand-dna.md</strong> đã có.</p>
    </div>

    <!-- Step 2: Chat command -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💬 Bước 2 — Copy Câu Chat Này</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Mở chat AI trong công cụ Vibe Coding, paste đoạn này:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CÂU CHAT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Đọc file hormozi-system.skill và avatar-khach-hang.md
trong thư mục này.

Dùng Hormozi Value Equation trong skill để đánh giá offer
của tôi. Thông tin sản phẩm của tôi:

Tên sản phẩm: [tên sản phẩm/dịch vụ của bạn]
Giá bán: [giá]
Khách hàng nhận được: [mô tả ngắn gọn]
Thời gian để thấy kết quả: [bao lâu]

Hãy:
1. Chấm điểm offer theo 4 trục Hormozi (1-10 mỗi trục)
2. Chỉ ra 2-3 điểm yếu nhất cần cải thiện
3. Gợi ý cụ thể cách nâng điểm từng trục
4. Lưu kết quả vào file offer-scorecard.md</pre>
        </div>
        <p style="font-size: 13px; color: #888; margin: 12px 0 0; font-style: italic;">AI sẽ hỏi thêm nếu cần rõ hơn. Trả lời thật, không cần đẹp.</p>
      </div>
    </div>

    <!-- Step 3: Read scorecard -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📊 Bước 3 — Đọc Scorecard, Quyết Định Chỉnh</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">AI tạo xong file <strong>offer-scorecard.md</strong>. Mở ra, nhìn vào 4 trục điểm:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.9;">
          <strong>Trục 1 — Dream Outcome:</strong> Khách có thực sự muốn kết quả này không? Có đủ cụ thể không?<br>
          <strong>Trục 2 — Perceived Likelihood:</strong> Khách có tin bạn làm được không? Có bằng chứng chưa?<br>
          <strong>Trục 3 — Time to Result:</strong> Kết quả bao lâu có? Có cách rút ngắn không?<br>
          <strong>Trục 4 — Effort &amp; Sacrifice:</strong> Khách phải làm gì? Có thể bớt phần nào không?
        </div>
        <div style="background: #FFF8E6; border-radius: 8px; padding: 12px 16px; margin-top: 12px;">
          <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0 0 6px;">Trục nào dưới 6 điểm?</p>
          <p style="font-size: 13px; color: #444; margin: 0; line-height: 1.7;">Đó là chỗ landing page sẽ bị "thủng". Dù viết copy hay đến đâu, khách đọc xong vẫn không tin. Phải vá điểm yếu đó trước khi sang Bài 5.</p>
        </div>
      </div>
    </div>

    <!-- Step 4: Improve -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🔧 Bước 4 — Nâng Điểm Trục Yếu Nhất</p>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Chọn trục thấp điểm nhất. Dùng câu chat này:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 14px 16px;">
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Trục [tên trục] đang điểm [X/10].

Gợi ý 3 cách cụ thể để nâng trục này.
Mỗi cách phải là hành động thực tế tôi có thể làm
trong tuần này, không phải lý thuyết chung chung.

Cập nhật offer-scorecard.md sau khi tôi chọn.</pre>
        </div>
        <p style="font-size: 13px; color: #888; margin: 12px 0 0; font-style: italic;">Chỉ cần chọn 1 trục thấp nhất mà làm. Nâng 1 trục từ 4 lên 7 tốt hơn nâng 4 trục mỗi cái 0.5 điểm.</p>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Xong Bài 4 khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          File <strong>offer-scorecard.md</strong> đã có, có điểm đủ 4 trục.<br><br>
          Biết rõ trục nào yếu nhất của offer mình.<br><br>
          Đã có ít nhất 1 hành động cụ thể để cải thiện trục đó.
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Điểm 4 trục đều 7-8 — yêu cầu AI khắt khe hơn, nó đang chiều bạn.<br><br>
          Biết offer yếu nhưng chưa biết sửa ở đâu.<br><br>
          Chưa lưu file, mới có trong chat.
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">📝 Nộp Bài</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Copy nội dung <strong>offer-scorecard.md</strong> vào Google Doc, share link, nộp bên dưới. Dũng sẽ xem trục nào đang kéo điểm offer của bạn xuống.</p>
    </div>

    <!-- Next step -->
    <div style="background: #88860B; border-radius: 12px; padding: 14px 18px;">
      <p style="color: #0D2B1A; font-size: 13px; margin: 0; line-height: 1.6;"><strong>Xong Bài 4?</strong> Mở <strong>Bài 5 — Skill #05 Cơ Chế Khác Biệt</strong>. Bài 5 tạo ra "thứ chỉ bạn có" — lý do khách không thể so sánh bạn với đối thủ.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  4,
  false,
  true
);
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Skill #05 — Cơ Chế Khác Biệt',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 5</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Skill #05 • Hero Mechanism</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Cơ Chế Khác Biệt</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Khách hay nói "để tôi hỏi chỗ khác thêm" vì họ chưa thấy lý do phải chọn bạn. Bài này tạo ra "cơ chế" — cái cách bạn giải quyết vấn đề mà đối thủ không có hoặc không làm vậy.</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối bài</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">File <strong>hero-mechanism.md</strong> trong thư mục làm việc. Mô tả cơ chế khác biệt, lý do nó hiệu quả, và câu headline dùng được trực tiếp trên landing page.</p>
  </div>

  <!-- Time + difficulty -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>⏱ Thời gian:</strong> 45 phút • <strong>🎚 Độ khó:</strong> Vừa • <strong>🔧 Cần:</strong> <strong>avatar-khach-hang.md</strong> + <strong>offer-scorecard.md</strong></p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Context block -->
    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; font-weight: 700; color: #0D2B1A; margin: 0 0 10px;">Cơ chế khác biệt là gì?</p>
      <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Không phải "chúng tôi chất lượng cao" hay "nhiều năm kinh nghiệm" — đó là câu ai cũng nói. Cơ chế khác biệt là <strong>cái cách cụ thể</strong> bạn tạo ra kết quả cho khách, mà chỗ khác không làm vậy.</p>
      <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.9;">
        Ví dụ thay vì "tôi dạy bán hàng" → <em>"Tôi dùng 3 câu hỏi chẩn đoán nỗi đau để khách tự thuyết phục mình mua, không cần push."</em><br>
        Ví dụ thay vì "thiết kế web đẹp" → <em>"Tôi xây landing page từ dữ liệu câu khách hay nhắn — chứ không phải từ cảm tính thiết kế."</em>
      </div>
      <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Khi khách đọc cơ chế của bạn mà nghĩ "ồ cách này mình chưa thấy ai làm" — đó là cơ chế đủ mạnh để đưa lên landing page.</p>
    </div>

    <!-- Download skill -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📦 Bước 1 — Tải File Skill</p>

    <div style="background: white; border: 2px solid #1D9E75; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #1D9E75; border-radius: 10px; padding: 10px 14px; flex-shrink: 0;"><span style="color: white; font-size: 18px;">📦</span></div>
        <div>
          <p style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0;">agent-hero-mechanism.zip</p>
          <p style="font-size: 12px; color: #666; margin: 2px 0 0;">File zip, 9KB — giải nén để thấy các file skill bên trong</p>
        </div>
      </div>
      <a href="https://dunghoang.com/skills/agent-hero-mechanism.zip" download style="display: inline-block; background: #0D2B1A; color: #F6F0E4; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">⬇ Tải Skill #05 Về Máy</a>
      <p style="font-size: 12px; color: #888; margin: 12px 0 0; line-height: 1.6;">Tải về → giải nén → kéo <strong>toàn bộ folder</strong> vào thư mục <strong>landing-page-cua-toi</strong>. Công cụ AI cần thấy tất cả file bên trong zip.</p>
    </div>

    <!-- Step 2: Chat command -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💬 Bước 2 — Copy Câu Chat Này</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CÂU CHAT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Đọc các file trong folder agent-hero-mechanism,
đọc avatar-khach-hang.md và offer-scorecard.md.

Áp dụng skill Hero Mechanism để tìm cơ chế khác biệt
cho sản phẩm của tôi.

Tôi [mô tả ngắn bạn làm gì cho khách].
Cách tôi làm khác các chỗ khác là: [mô tả thật,
dù chưa hay, dù chưa biết diễn đạt].

Hãy:
1. Phân tích và đặt tên cho cơ chế của tôi
2. Viết mô tả 2-3 câu giải thích cơ chế hoạt động
3. Tạo 3 phiên bản headline dùng cơ chế này
4. Lưu vào file hero-mechanism.md</pre>
        </div>
        <p style="font-size: 13px; color: #888; margin: 12px 0 0; font-style: italic;">Không cần biết "cơ chế của mình là gì". Cứ tả thật cách bạn làm — AI sẽ tìm ra cơ chế và đặt tên cho nó.</p>
      </div>
    </div>

    <!-- Step 3: Pick headline -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🎯 Bước 3 — Chọn Headline Dùng Cho Landing Page</p>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">AI viết ra 3 phiên bản headline. Đọc từng cái và tự hỏi:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Cái nào nghe thật với cách bạn làm việc?<br>
          • Cái nào khiến khách hàng của bạn tò mò muốn đọc tiếp?<br>
          • Cái nào bạn dám nói to trước mặt khách mà không thấy ngại?
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Chọn 1 cái, bảo AI cập nhật vào <strong>hero-mechanism.md</strong>. Headline này sẽ là H1 của landing page ở Bài 8.</p>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Xong Bài 5 khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          File <strong>hero-mechanism.md</strong> đã có tên cơ chế + mô tả.<br><br>
          Đọc headline, người ngoài hiểu bạn làm gì khác chỗ khác.<br><br>
          Đã chọn được 1 headline dùng cho landing page.
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Cơ chế nghe kiểu "chất lượng tốt, tư vấn tận tình" — quá chung.<br><br>
          Headline dài hơn 15 chữ hoặc có từ "chuyên nghiệp".<br><br>
          Không phân biệt được với headline của đối thủ.
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">📝 Nộp Bài</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Copy nội dung <strong>hero-mechanism.md</strong> vào Google Doc, share link, nộp bên dưới. Dũng xem cơ chế có đủ sắc nét để đứng một mình trên landing page không.</p>
    </div>

    <!-- Next step -->
    <div style="background: #88860B; border-radius: 12px; padding: 14px 18px;">
      <p style="color: #0D2B1A; font-size: 13px; margin: 0; line-height: 1.6;"><strong>Xong Bài 5?</strong> Mở <strong>Bài 6 — Skill #07 Thiết Kế Offer Hoàn Chỉnh</strong>. Bài 6 lắp cơ chế vào offer — thêm bonus, bảo hành, điều kiện mua để khách không còn lý do trì hoãn.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  5,
  false,
  true
);
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Skill #07 — Thiết Kế Offer Hoàn Chỉnh',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 6</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Skill #07 • Offer Architect</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Thiết Kế Offer Hoàn Chỉnh</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Offer không chỉ là sản phẩm + giá. Offer là tất cả những gì khách nhận được, thứ giảm rủi ro cho họ, và điều kiện khiến họ quyết định ngay hôm nay thay vì "để suy nghĩ thêm".</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối bài</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">File <strong>offer-final.md</strong> trong thư mục làm việc. Offer đầy đủ: core product, bonus, guarantee, urgency/scarcity, và câu CTA chính.</p>
  </div>

  <!-- Time + difficulty -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>⏱ Thời gian:</strong> 60 phút • <strong>🎚 Độ khó:</strong> Trung bình cao • <strong>🔧 Cần:</strong> <strong>offer-scorecard.md</strong> + <strong>hero-mechanism.md</strong></p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Context block -->
    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; font-weight: 700; color: #0D2B1A; margin: 0 0 10px;">5 lớp của một offer hoàn chỉnh</p>
      <div style="font-size: 13px; color: #555; line-height: 1.9;">
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px;">
          <strong>1. Core Product</strong> — thứ chính khách mua (+ cơ chế khác biệt từ Bài 5)<br>
          <strong>2. Bonus Stack</strong> — thứ tặng kèm, giá trị cao nhưng cost thấp cho bạn<br>
          <strong>3. Guarantee</strong> — bảo hành/cam kết giảm rủi ro cho khách<br>
          <strong>4. Urgency / Scarcity</strong> — lý do mua ngay (có thật, không bịa)<br>
          <strong>5. CTA</strong> — câu hành động cụ thể, rõ bước tiếp theo là gì
        </div>
      </div>
      <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Offer architect sẽ hỏi bạn từng lớp. Cứ trả lời thật — AI sẽ giúp diễn đạt lại thành ngôn ngữ bán hàng.</p>
    </div>

    <!-- Download skill -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📦 Bước 1 — Tải File Skill</p>

    <div style="background: white; border: 2px solid #1D9E75; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #1D9E75; border-radius: 10px; padding: 10px 14px; flex-shrink: 0;"><span style="color: white; font-size: 18px;">📦</span></div>
        <div>
          <p style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0;">agent-offer-architect.zip</p>
          <p style="font-size: 12px; color: #666; margin: 2px 0 0;">File zip, 19KB — giải nén, kéo folder vào thư mục làm việc</p>
        </div>
      </div>
      <a href="https://dunghoang.com/skills/agent-offer-architect.zip" download style="display: inline-block; background: #0D2B1A; color: #F6F0E4; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">⬇ Tải Skill #07 Về Máy</a>
      <p style="font-size: 12px; color: #888; margin: 12px 0 0; line-height: 1.6;">Giải nén → kéo <strong>toàn bộ folder agent-offer-architect</strong> vào thư mục <strong>landing-page-cua-toi</strong>.</p>
    </div>

    <!-- Step 2: Chat command -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💬 Bước 2 — Copy Câu Chat Này</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CÂU CHAT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Đọc các file trong folder agent-offer-architect,
đọc avatar-khach-hang.md, offer-scorecard.md
và hero-mechanism.md.

Áp dụng Offer Architect để thiết kế offer hoàn chỉnh
cho sản phẩm của tôi.

Hãy hỏi tôi từng lớp offer: core product, bonus,
guarantee, urgency, CTA.
Tôi sẽ trả lời từng cái.
Sau khi tôi trả lời hết, lưu offer hoàn chỉnh
vào file offer-final.md.</pre>
        </div>
        <p style="font-size: 13px; color: #888; margin: 12px 0 0; font-style: italic;">AI sẽ hỏi từng lớp. Trả lời thật dù chưa hay — AI lo phần diễn đạt.</p>
      </div>
    </div>

    <!-- Step 3: Guarantee note -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🛡 Bước 3 — Điều Quan Trọng Nhất: Guarantee</p>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Guarantee là phần nhiều người bỏ qua nhất vì sợ. Nhưng đây chính là thứ tháo gỡ rào cản mua lớn nhất — "Tôi mua rồi mà không được thì sao?"</p>
        <div style="background: #EAF5EF; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          <strong>3 loại guarantee phổ biến:</strong><br>
          • <strong>Hoàn tiền không hỏi lý do</strong> trong X ngày — mạnh nhất, khách tin nhất<br>
          • <strong>Làm lại miễn phí</strong> nếu không hài lòng — phù hợp dịch vụ<br>
          • <strong>Cam kết kết quả</strong> — "Nếu [điều kiện] mà không có [kết quả], tôi [đền gì]"
        </div>
        <p style="font-size: 13px; color: #888; margin: 12px 0 0; font-style: italic;">Không cần cam kết những gì không thực tế. Cam kết những gì bạn tự tin có thể làm được — và viết nó ra rõ ràng.</p>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Xong Bài 6 khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          File <strong>offer-final.md</strong> có đủ 5 lớp.<br><br>
          Có ít nhất 1 bonus cụ thể (không phải "tư vấn thêm").<br><br>
          Có guarantee bằng chữ, khách đọc hiểu ngay được mình bảo vệ gì.
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Không có bonus — chỉ là sản phẩm chính + giá.<br><br>
          Urgency kiểu "ưu đãi có hạn" không có ngày cụ thể.<br><br>
          CTA là "liên hệ ngay" — chưa rõ bước tiếp theo là gì.
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">📝 Nộp Bài</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Copy <strong>offer-final.md</strong> vào Google Doc, share link, nộp bên dưới. Dũng xem offer có đủ 5 lớp và guarantee có đủ mạnh để tháo gỡ rào cản không.</p>
    </div>

    <!-- Next step -->
    <div style="background: #88860B; border-radius: 12px; padding: 14px 18px;">
      <p style="color: #0D2B1A; font-size: 13px; margin: 0; line-height: 1.6;"><strong>Xong Bài 6?</strong> Mở <strong>Bài 7 — Skill #09 Phễu Bán Hàng</strong>. Bài 7 thiết kế hành trình từ lúc khách thấy quảng cáo đến lúc bấm mua — landing page nằm ở đâu trong phễu đó.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  6,
  false,
  true
);
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Skill #09 — Phễu Bán Hàng',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 7</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Skill #09 • Funnel Strategist</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Phễu Bán Hàng</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Landing page không đứng một mình. Nó là 1 điểm trong hành trình khách đi từ "chưa biết bạn là ai" đến "bấm thanh toán". Bài này vẽ ra toàn bộ hành trình đó.</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối bài</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">File <strong>funnel-plan.md</strong> trong thư mục làm việc. Sơ đồ phễu đơn giản: traffic source → landing page → follow-up → mua. Biết landing page cần làm 1 việc gì.</p>
  </div>

  <!-- Time + difficulty -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>⏱ Thời gian:</strong> 45 phút • <strong>🎚 Độ khó:</strong> Vừa • <strong>🔧 Cần:</strong> <strong>offer-final.md</strong> từ Bài 6</p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Context block -->
    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; font-weight: 700; color: #0D2B1A; margin: 0 0 10px;">Landing page cần làm đúng 1 việc</p>
      <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Sai lầm phổ biến nhất: nhét tất cả vào 1 trang — giới thiệu công ty, tất cả sản phẩm, form liên hệ, blog... Kết quả là khách không biết làm gì tiếp theo.</p>
      <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.9;">
        Landing page trong khóa này chỉ cần làm <strong>1 trong 3 việc</strong>:<br>
        • <strong>Thu lead</strong> — khách để lại SĐT/email để nhận thứ gì đó miễn phí<br>
        • <strong>Bán thẳng</strong> — khách đọc xong bấm mua / chuyển khoản ngay<br>
        • <strong>Đặt lịch tư vấn</strong> — khách điền form để được gọi điện
      </div>
      <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Funnel Strategist giúp bạn quyết định landing page của mình nên làm cái nào — dựa trên giá sản phẩm, mức độ quen của khách, và nguồn traffic bạn đang có.</p>
    </div>

    <!-- Download skill -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📦 Bước 1 — Tải File Skill</p>

    <div style="background: white; border: 2px solid #1D9E75; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #1D9E75; border-radius: 10px; padding: 10px 14px; flex-shrink: 0;"><span style="color: white; font-size: 18px;">📦</span></div>
        <div>
          <p style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0;">agent-funnel-strategist.zip</p>
          <p style="font-size: 12px; color: #666; margin: 2px 0 0;">File zip, 11KB — giải nén, kéo folder vào thư mục làm việc</p>
        </div>
      </div>
      <a href="https://dunghoang.com/skills/agent-funnel-strategist.zip" download style="display: inline-block; background: #0D2B1A; color: #F6F0E4; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">⬇ Tải Skill #09 Về Máy</a>
      <p style="font-size: 12px; color: #888; margin: 12px 0 0; line-height: 1.6;">Giải nén → kéo <strong>folder agent-funnel-strategist</strong> vào thư mục <strong>landing-page-cua-toi</strong>.</p>
    </div>

    <!-- Step 2: Chat command -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💬 Bước 2 — Copy Câu Chat Này</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CÂU CHAT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Đọc các file trong folder agent-funnel-strategist,
đọc avatar-khach-hang.md và offer-final.md.

Áp dụng Funnel Strategist để thiết kế phễu bán hàng
phù hợp với sản phẩm và tình trạng của tôi:

Nguồn traffic hiện tại của tôi: [Facebook/Zalo/TikTok/
giới thiệu/SEO — bạn đang dùng gì]
Giá sản phẩm: [giá]
Khách có biết tôi trước khi vào landing page không:
[có/chưa — khách từ quảng cáo lạnh hay đã follow bạn]

Hãy:
1. Đề xuất loại landing page phù hợp (thu lead / bán thẳng / đặt lịch)
2. Vẽ phễu đơn giản từ traffic đến mua
3. Chỉ rõ landing page trong phễu này cần làm đúng 1 việc gì
4. Lưu vào file funnel-plan.md</pre>
        </div>
      </div>
    </div>

    <!-- Step 3: Key decision -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🎯 Bước 3 — Quyết Định 1 Mục Tiêu Cho Landing Page</p>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Sau khi AI đề xuất, bạn phải tự quyết định và ghi vào <strong>funnel-plan.md</strong>:</p>
        <div style="background: #EAF5EF; border-radius: 8px; padding: 14px 16px; font-size: 14px; color: #2D7A4F; line-height: 1.8; font-weight: 600;">
          "Landing page của tôi có 1 mục tiêu: [khách làm gì — điền form / bấm mua / đặt lịch]"
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Câu này quan trọng vì ở Bài 8, khi build landing page, mọi section đều phục vụ cho mục tiêu đó. Không có mục tiêu rõ thì sẽ viết lan man.</p>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Xong Bài 7 khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          File <strong>funnel-plan.md</strong> có sơ đồ phễu từ traffic đến mua.<br><br>
          Đã ghi rõ 1 mục tiêu của landing page.<br><br>
          Biết khách từ đâu đến trước khi vào landing page.
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Chưa quyết định được landing page làm gì — thu lead hay bán thẳng.<br><br>
          Funnel có quá nhiều bước, không biết bắt đầu từ đâu.<br><br>
          Chưa lưu file.
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">📝 Nộp Bài</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Copy <strong>funnel-plan.md</strong> vào Google Doc, share link, nộp bên dưới. Quan trọng nhất: ghi rõ 1 câu mục tiêu landing page của bạn.</p>
    </div>

    <!-- Next step -->
    <div style="background: #88860B; border-radius: 12px; padding: 14px 18px;">
      <p style="color: #0D2B1A; font-size: 13px; margin: 0; line-height: 1.6;"><strong>Xong Bài 7?</strong> Mở <strong>Bài 8 — Skill #10 Xây Landing Page</strong>. Bài 8 là bài quan trọng nhất — AI lấy tất cả file bạn đã tạo từ Bài 2-7 và build landing page thật bằng code.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  7,
  false,
  true
);
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Skill #10 — Xây Landing Page Thật',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 8</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Skill #10 • Landing Page Builder</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Xây Landing Page Thật</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Đây là bài quan trọng nhất của khóa. AI lấy tất cả file bạn đã tạo từ Bài 2 đến Bài 7 — avatar, giọng văn, offer, cơ chế, phễu — và build thành trang HTML thật, mở được trên trình duyệt.</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối bài</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">File <strong>landing-page.html</strong> trong thư mục làm việc. Mở bằng Chrome/Firefox là thấy landing page thật của bạn — có thể chia sẻ, chụp màn hình, hoặc deploy lên web.</p>
  </div>

  <!-- Time + difficulty -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>⏱ Thời gian:</strong> 90 phút • <strong>🎚 Độ khó:</strong> Cao • <strong>🔧 Cần:</strong> Tất cả file từ Bài 2–7 đã hoàn chỉnh</p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Checklist trước khi bắt đầu -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">✅ Trước Khi Bắt Đầu — Kiểm Tra 6 File Này Đã Có Chưa</p>

    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
      <div style="font-size: 13px; color: #333; line-height: 2;">
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #F0EDE4;">
          <span style="color: #1D9E75; font-size: 16px;">▣</span>
          <span><strong>avatar-khach-hang.md</strong> — chân dung khách (Bài 2)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #F0EDE4;">
          <span style="color: #1D9E75; font-size: 16px;">▣</span>
          <span><strong>brand-dna.md</strong> — giọng văn thương hiệu (Bài 3)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #F0EDE4;">
          <span style="color: #1D9E75; font-size: 16px;">▣</span>
          <span><strong>offer-scorecard.md</strong> — điểm offer Hormozi (Bài 4)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #F0EDE4;">
          <span style="color: #1D9E75; font-size: 16px;">▣</span>
          <span><strong>hero-mechanism.md</strong> — cơ chế khác biệt + headline (Bài 5)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #F0EDE4;">
          <span style="color: #1D9E75; font-size: 16px;">▣</span>
          <span><strong>offer-final.md</strong> — offer 5 lớp hoàn chỉnh (Bài 6)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 0;">
          <span style="color: #1D9E75; font-size: 16px;">▣</span>
          <span><strong>funnel-plan.md</strong> — phễu + mục tiêu LP (Bài 7)</span>
        </div>
      </div>
      <div style="background: #FFF8E6; border-radius: 8px; padding: 12px 14px; margin-top: 14px;">
        <p style="font-size: 13px; color: #7A5500; margin: 0; line-height: 1.6;">Chưa có file nào? Quay lại bài tương ứng làm trước. AI build landing page dựa vào dữ liệu thật trong 6 file này — thiếu file là AI tự bịa, kết quả sẽ không dùng được.</p>
      </div>
    </div>

    <!-- Download skill -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📦 Bước 1 — Tải File Skill</p>

    <div style="background: white; border: 2px solid #1D9E75; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #1D9E75; border-radius: 10px; padding: 10px 14px; flex-shrink: 0;"><span style="color: white; font-size: 18px;">⚙️</span></div>
        <div>
          <p style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0;">agent-08b-landingpage.skill</p>
          <p style="font-size: 12px; color: #666; margin: 2px 0 0;">File skill, 26KB — kéo trực tiếp vào thư mục làm việc (không cần giải nén)</p>
        </div>
      </div>
      <a href="https://dunghoang.com/skills/agent-08b-landingpage.skill" download style="display: inline-block; background: #0D2B1A; color: #F6F0E4; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">⬇ Tải Skill #10 Về Máy</a>
      <p style="font-size: 12px; color: #888; margin: 12px 0 0; line-height: 1.6;">Kéo file <strong>agent-08b-landingpage.skill</strong> thẳng vào thư mục <strong>landing-page-cua-toi</strong>. Không cần giải nén.</p>
    </div>

    <!-- Step 2: Chat command -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💬 Bước 2 — Copy Câu Chat Này</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CÂU CHAT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Đọc file agent-08b-landingpage.skill.
Đọc tất cả các file: avatar-khach-hang.md,
brand-dna.md, offer-scorecard.md,
hero-mechanism.md, offer-final.md, funnel-plan.md.

Dùng Landing Page Builder skill để build
landing page hoàn chỉnh cho tôi.

Mục tiêu landing page (từ funnel-plan.md):
[dán lại mục tiêu bạn đã ghi ở Bài 7]

Build toàn bộ trang thành 1 file HTML duy nhất,
responsive, không cần framework bên ngoài.
Lưu vào file landing-page.html.</pre>
        </div>
        <p style="font-size: 13px; color: #888; margin: 12px 0 0; font-style: italic;">AI sẽ hỏi thêm nếu thiếu thông tin. Có thể mất 5-10 phút để AI build xong toàn bộ trang.</p>
      </div>
    </div>

    <!-- Step 3: Review -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🖥 Bước 3 — Mở File HTML, Đọc Như Khách</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">AI tạo xong <strong>landing-page.html</strong>. Mở file bằng Chrome (double-click hoặc kéo vào trình duyệt). Đọc từ trên xuống dưới và tự hỏi:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • Dòng đầu tiên có khiến bạn muốn đọc tiếp không?<br>
          • Có chỗ nào nghe không giống cách bạn nói không?<br>
          • CTA có rõ ràng, khách biết bấm vào đâu không?<br>
          • Trên điện thoại (thu nhỏ trình duyệt) có đọc được không?
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Chỗ nào chưa ổn, quay lại chat: <em style="color: #3D6B4A;">"Section [tên section] cần sửa: [nói thật điều bạn muốn khác]."</em> AI cập nhật file luôn.</p>
      </div>
    </div>

    <!-- Step 4: Mobile check -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📱 Bước 4 — Test Trên Điện Thoại</p>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Hơn 70% khách xem landing page trên điện thoại. Test nhanh:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          Trên Chrome máy tính → nhấn <strong>F12</strong> → bấm icon điện thoại (Toggle device toolbar) → chọn iPhone hoặc Samsung Galaxy → tải lại trang.<br><br>
          Kiểm tra: chữ có đủ to không? Nút CTA có dễ bấm không? Có text nào bị tràn ra ngoài không?
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Nếu có lỗi mobile: chat AI <em style="color: #3D6B4A;">"Sửa responsive cho [phần bị lỗi] trên màn hình 390px."</em></p>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Xong Bài 8 khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          File <strong>landing-page.html</strong> mở được trên Chrome.<br><br>
          Đọc từ đầu đến cuối mạch lạc, có headline, offer, CTA.<br><br>
          Test mobile không bị vỡ layout.
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          File HTML lỗi, mở ra trắng hoặc bị vỡ layout.<br><br>
          Nội dung còn placeholder như [tên sản phẩm] chưa điền.<br><br>
          Không có CTA rõ ràng — khách không biết làm gì tiếp.
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">📝 Nộp Bài</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Chụp màn hình landing page (desktop + mobile) → upload lên Google Drive, share link, nộp bên dưới. Hoặc gửi thẳng file HTML. Dũng xem cấu trúc và copy.</p>
    </div>

    <!-- Next step -->
    <div style="background: #88860B; border-radius: 12px; padding: 14px 18px;">
      <p style="color: #0D2B1A; font-size: 13px; margin: 0; line-height: 1.6;"><strong>Xong Bài 8?</strong> Mở <strong>Bài 9 — Skill #11 UI/UX Nâng Cấp</strong>. Bài 9 đưa landing page từ "dùng được" lên "trông chuyên nghiệp" — màu sắc, khoảng cách, visual hierarchy đúng chuẩn.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  8,
  false,
  true
);
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Skill #11 — Nâng Cấp Giao Diện (UI/UX)',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 9</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Skill #11 • UI/UX Pro Max</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Nâng Cấp Giao Diện</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Landing page từ Bài 8 đã có đủ nội dung. Bài 9 làm nó trông đáng tin — màu sắc nhất quán, khoảng cách hợp lý, visual hierarchy dẫn mắt khách đến đúng chỗ cần bấm.</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối bài</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">File <strong>landing-page-v2.html</strong> trong thư mục làm việc. Giao diện được nâng cấp: màu có hệ thống, typography rõ ràng, CTA nổi bật, mobile chuẩn.</p>
  </div>

  <!-- Time + difficulty -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>⏱ Thời gian:</strong> 60 phút • <strong>🎚 Độ khó:</strong> Vừa • <strong>🔧 Cần:</strong> File <strong>landing-page.html</strong> từ Bài 8</p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Context block -->
    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; font-weight: 700; color: #0D2B1A; margin: 0 0 10px;">UI/UX ảnh hưởng đến tỷ lệ chuyển đổi như thế nào?</p>
      <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Khách không đọc landing page như đọc sách — họ <strong>quét</strong>. Trong 5 giây đầu, mắt họ quyết định "trang này trông đáng tin không". Nếu layout lộn xộn, chữ quá nhỏ, màu sắc chói — họ thoát trước khi đọc headline.</p>
      <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.9;">
        <strong>4 thứ UI/UX Pro Max sẽ kiểm tra:</strong><br>
        • <strong>Color system</strong> — 1 màu chính, 1 màu nhấn, 1 màu nền. Không dùng 7 màu.<br>
        • <strong>Typography</strong> — heading đủ to, body đủ đọc, line-height đủ thoáng<br>
        • <strong>Spacing</strong> — khoảng cách giữa sections đều nhau, không bị chật<br>
        • <strong>CTA prominence</strong> — nút bấm nổi bật nhất trang, nhìn vào là thấy ngay
      </div>
    </div>

    <!-- Download skill -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📦 Bước 1 — Tải File Skill</p>

    <div style="background: white; border: 2px solid #1D9E75; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="background: #1D9E75; border-radius: 10px; padding: 10px 14px; flex-shrink: 0;"><span style="color: white; font-size: 18px;">📦</span></div>
        <div>
          <p style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0;">agent-ui-ux-pro-max.zip</p>
          <p style="font-size: 12px; color: #666; margin: 2px 0 0;">File zip, 2.5MB — có chứa asset, ảnh mẫu, component library</p>
        </div>
      </div>
      <a href="https://dunghoang.com/skills/agent-ui-ux-pro-max.zip" download style="display: inline-block; background: #0D2B1A; color: #F6F0E4; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">⬇ Tải Skill #11 Về Máy</a>
      <p style="font-size: 12px; color: #888; margin: 12px 0 0; line-height: 1.6;">File này nặng hơn các skill trước vì có asset đi kèm. Giải nén → kéo <strong>toàn bộ folder agent-ui-ux-pro-max</strong> vào thư mục <strong>landing-page-cua-toi</strong>.</p>
    </div>

    <!-- Step 2: Chat command -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💬 Bước 2 — Copy Câu Chat Này</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CÂU CHAT — Copy &amp; Paste</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Đọc các file trong folder agent-ui-ux-pro-max.
Đọc file landing-page.html và brand-dna.md.

Áp dụng UI/UX Pro Max để nâng cấp giao diện
của landing-page.html.

Tông màu thương hiệu của tôi (nếu có):
[màu chính bạn hay dùng — hoặc ghi "chưa có, AI chọn giúp"]

Cảm giác thương hiệu muốn tạo:
[ví dụ: chuyên nghiệp/ấm áp/năng động/tối giản]

Hãy:
1. Đề xuất color system (primary, accent, background)
2. Kiểm tra và sửa typography, spacing
3. Làm nổi bật CTA button
4. Đảm bảo responsive chuẩn trên mobile 390px
5. Lưu bản nâng cấp vào file landing-page-v2.html</pre>
        </div>
      </div>
    </div>

    <!-- Step 3: Compare -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🔍 Bước 3 — So Sánh V1 Và V2</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Mở cả 2 file trong trình duyệt, đặt cạnh nhau. Tự hỏi:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          • V2 có trông "chuyên nghiệp hơn" không hay chỉ khác màu?<br>
          • Mắt bạn nhìn vào V2 trước tiên thấy gì — đúng là CTA không?<br>
          • Có thứ gì trong V2 bạn không thích, muốn giữ lại từ V1?
        </div>
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 12px 0 0;">Không hài lòng phần nào, chat lại: <em style="color: #3D6B4A;">"Giữ màu nền từ V1. Chỉ đổi màu CTA button thành [màu]."</em> — chỉnh từng thứ nhỏ, không làm lại toàn bộ.</p>
      </div>
    </div>

    <!-- Step 4: Final check -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📸 Bước 4 — Chụp Màn Hình Bản Cuối</p>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">Khi đã hài lòng với <strong>landing-page-v2.html</strong>:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.8;">
          1. Chụp màn hình toàn trang (dùng screenshot tool hoặc F12 → More tools → Capture full size screenshot)<br>
          2. Test trên mobile: F12 → icon điện thoại → chụp màn hình<br>
          3. Gửi 2 ảnh này khi nộp bài
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Xong Bài 9 khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          File <strong>landing-page-v2.html</strong> đã có, mở được.<br><br>
          Nhìn vào 5 giây, biết ngay nên bấm vào đâu.<br><br>
          Mobile không bị vỡ, chữ đọc được không cần zoom.
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa đạt khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          V2 trông y hệt V1 — AI chỉ đổi màu chữ.<br><br>
          CTA button không nổi bật hơn phần còn lại của trang.<br><br>
          Mobile bị tràn ngang hoặc chữ quá nhỏ.
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div style="background: #0D2B1A; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
      <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">📝 Nộp Bài</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Gửi ảnh chụp màn hình <strong>landing-page-v2.html</strong> (desktop + mobile) vào ô bên dưới. Dũng xem visual hierarchy và điểm UX trước khi cho bạn deploy lên web ở Bài 10.</p>
    </div>

    <!-- Next step -->
    <div style="background: #88860B; border-radius: 12px; padding: 14px 18px;">
      <p style="color: #0D2B1A; font-size: 13px; margin: 0; line-height: 1.6;"><strong>Xong Bài 9?</strong> Mở <strong>Bài 10 — Deploy + Thanh Toán + Tracking</strong>. Bài cuối: đưa landing page lên internet, gắn SePay nhận tiền tự động, cài Meta Pixel đo hiệu quả quảng cáo.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  9,
  false,
  true
);
INSERT INTO lessons (id, course_id, title, description, content_html, video_url, duration, sort_order, is_free, is_published)
VALUES (
  gen_random_uuid(),
  'landing_186',
  'Deploy + SePay + Meta Pixel Tracking',
  '',
  '<div style="font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="background: #C0390E; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em;">BÀI 10</span>
      <span style="color: #88860B; font-size: 12px; font-weight: 600;">Bài Cuối • Deploy + Thanh Toán + Tracking</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">Đưa Landing Page Lên Internet, Nhận Tiền, Đo Hiệu Quả</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">Landing page đẹp mà nằm trong máy tính thì không kiếm được tiền. Bài này: đẩy code lên GitHub → deploy Vercel (miễn phí, tự động) → gắn tên miền riêng → SePay nhận tiền → Meta Pixel đo từng khách.</p>
  </div>

  <!-- Output box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Output cuối bài</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0;">Landing page có URL thật (Vercel hoặc tên miền riêng) + QR SePay hoạt động + Meta Pixel đang ghi lượt vào trang.</p>
  </div>

  <!-- Time + difficulty -->
  <div style="background: #FFF8E6; border-left: 4px solid #E8A020; padding: 12px 24px; margin: 0;">
    <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0;"><strong>⏱ Thời gian:</strong> 90 phút • <strong>🎚 Độ khó:</strong> Cao • <strong>🔧 Cần:</strong> <strong>landing-page-v2.html</strong> từ Bài 9 + tài khoản ngân hàng</p>
  </div>

  <!-- Content -->
  <div style="padding: 28px;">

    <!-- Part A: Deploy -->
    <p style="font-size: 13px; font-weight: 800; color: #0D2B1A; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.03em;">PHẦN A — DEPLOY LÊN INTERNET</p>
    <div style="width: 40px; height: 3px; background: #C0390E; border-radius: 2px; margin-bottom: 20px;"></div>

    <!-- Flow overview -->
    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 18px 20px; margin-bottom: 20px;">
      <p style="font-size: 13px; font-weight: 700; color: #0D2B1A; margin: 0 0 12px;">Luồng deploy: GitHub → Vercel → Tên miền riêng</p>
      <div style="display: flex; align-items: center; gap: 0; flex-wrap: wrap;">
        <div style="background: #F6F0E4; border-radius: 8px; padding: 10px 14px; text-align: center; min-width: 80px;">
          <div style="font-size: 20px; margin-bottom: 4px;">💻</div>
          <div style="font-size: 11px; font-weight: 700; color: #0D2B1A;">Máy bạn</div>
          <div style="font-size: 10px; color: #888;">HTML file</div>
        </div>
        <div style="font-size: 18px; color: #C0390E; font-weight: 700; padding: 0 8px;">→</div>
        <div style="background: #1a1a2e; border-radius: 8px; padding: 10px 14px; text-align: center; min-width: 80px;">
          <div style="font-size: 20px; margin-bottom: 4px;">🐙</div>
          <div style="font-size: 11px; font-weight: 700; color: #e8f0ec;">GitHub</div>
          <div style="font-size: 10px; color: #88c0a0;">lưu code</div>
        </div>
        <div style="font-size: 18px; color: #C0390E; font-weight: 700; padding: 0 8px;">→</div>
        <div style="background: #0D2B1A; border-radius: 8px; padding: 10px 14px; text-align: center; min-width: 80px;">
          <div style="font-size: 20px; margin-bottom: 4px;">▲</div>
          <div style="font-size: 11px; font-weight: 700; color: #F6F0E4;">Vercel</div>
          <div style="font-size: 10px; color: #88860B;">tự deploy</div>
        </div>
        <div style="font-size: 18px; color: #C0390E; font-weight: 700; padding: 0 8px;">→</div>
        <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 8px; padding: 10px 14px; text-align: center; min-width: 80px;">
          <div style="font-size: 20px; margin-bottom: 4px;">🌐</div>
          <div style="font-size: 11px; font-weight: 700; color: #0D2B1A;">URL thật</div>
          <div style="font-size: 10px; color: #888;">online 24/7</div>
        </div>
      </div>
      <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 14px; margin-top: 14px;">
        <p style="font-size: 13px; color: #2D7A4F; margin: 0; line-height: 1.6;"><strong>Tại sao Vercel?</strong> Miễn phí cho cá nhân, tự động cập nhật mỗi lần bạn push code, URL mặc định dạng <em>ten-repo.vercel.app</em> — đủ dùng ngay. Muốn URL đẹp hơn thì mua tên miền và kết nối sau.</p>
      </div>
    </div>

    <!-- Step A1: GitHub -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🐙 Bước A1 — Đưa File Lên GitHub</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Đổi tên file <strong>landing-page-v2.html</strong> thành <strong>index.html</strong> — Vercel cần file này để biết trang chủ là đâu. Sau đó chat AI:</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CHAT VỚI AI — Tạo repo GitHub</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi muốn đưa file index.html lên GitHub để deploy Vercel.
Tôi đang dùng [Windows/Mac].
Tôi [đã/chưa] cài Git trên máy.

Hướng dẫn tôi từng bước:
1. Tạo tài khoản GitHub (nếu chưa có)
2. Tạo repo mới tên [tên-san-pham]-lp (ví dụ: khoa-lp)
3. Upload file index.html lên repo đó</pre>
        </div>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #555; line-height: 1.7;">
          <strong>Cách nhanh nhất nếu chưa dùng Git bao giờ:</strong> Vào <em>github.com → New repo → Add file → Upload files</em> → kéo file <strong>index.html</strong> vào. Không cần cài Git, không cần terminal.
        </div>
      </div>
    </div>

    <!-- Step A2: Vercel -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">▲ Bước A2 — Kết Nối Vercel, Deploy Tự Động</p>

    <div style="margin-bottom: 20px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <div style="font-size: 13px; color: #333; line-height: 2;">
          <div style="display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="background: #C0390E; color: white; font-size: 10px; font-weight: 700; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">1</span>
            <span>Vào <strong>vercel.com</strong> → <strong>Sign Up</strong> → chọn <strong>Continue with GitHub</strong> (đăng nhập bằng tài khoản GitHub vừa tạo)</span>
          </div>
          <div style="display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="background: #C0390E; color: white; font-size: 10px; font-weight: 700; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">2</span>
            <span>Bấm <strong>Add New → Project</strong> → chọn repo vừa tạo → bấm <strong>Import</strong></span>
          </div>
          <div style="display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="background: #C0390E; color: white; font-size: 10px; font-weight: 700; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">3</span>
            <span>Giữ nguyên mọi setting → bấm <strong>Deploy</strong>. Vercel tự build trong ~30 giây.</span>
          </div>
          <div style="display: flex; gap: 10px; padding: 5px 0; align-items: flex-start;">
            <span style="background: #1D9E75; color: white; font-size: 10px; font-weight: 700; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">✓</span>
            <span>Xong. Vercel cho bạn URL dạng <strong>ten-repo.vercel.app</strong> — mở được ngay, chia sẻ được ngay.</span>
          </div>
        </div>
        <div style="background: #EAF5EF; border-radius: 8px; padding: 12px 14px; margin-top: 14px;">
          <p style="font-size: 12px; font-weight: 600; color: #2D7A4F; margin: 0 0 4px;">Lần sau cập nhật landing page:</p>
          <p style="font-size: 13px; color: #444; margin: 0; line-height: 1.6;">Upload file index.html mới lên GitHub → Vercel tự deploy lại trong 30 giây. Không cần làm gì thêm.</p>
        </div>
      </div>
    </div>

    <!-- Step A3: Custom domain -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🌐 Bước A3 — Tên Miền Riêng (Tùy Chọn)</p>

    <div style="margin-bottom: 24px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Nếu muốn URL đẹp như <strong>sanpham.vn</strong> thay vì <em>ten-repo.vercel.app</em>, cần mua tên miền (~200.000–500.000đ/năm) và kết nối DNS.</p>

        <p style="font-size: 12px; font-weight: 700; color: #3D6B4A; margin: 0 0 8px;">Mua tên miền — 3 nhà cung cấp phổ biến tại Việt Nam:</p>
        <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.9; margin-bottom: 14px;">
          <strong>Inet.vn</strong> — .vn và .com, giá tốt, hỗ trợ tiếng Việt, thanh toán VNPay/MoMo<br>
          <strong>Tenten.vn</strong> — nhiều đuôi (.com, .vn, .net, .io), quản lý DNS dễ<br>
          <strong>P.A Vietnam (pavietnam.vn)</strong> — lâu đời, ổn định, phù hợp doanh nghiệp
        </div>

        <p style="font-size: 12px; font-weight: 700; color: #3D6B4A; margin: 0 0 8px;">Kết nối tên miền vào Vercel — 4 bước:</p>
        <div style="font-size: 13px; color: #333; line-height: 1.9;">
          <div style="display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="background: #0D2B1A; color: #88860B; font-size: 10px; font-weight: 700; border-radius: 4px; padding: 2px 6px; flex-shrink: 0; margin-top: 3px;">1</span>
            <span>Trong Vercel: vào project → tab <strong>Settings → Domains</strong> → nhập tên miền vừa mua → bấm <strong>Add</strong></span>
          </div>
          <div style="display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="background: #0D2B1A; color: #88860B; font-size: 10px; font-weight: 700; border-radius: 4px; padding: 2px 6px; flex-shrink: 0; margin-top: 3px;">2</span>
            <span>Vercel hiện ra 2 giá trị cần thêm vào DNS: <strong>A record</strong> (trỏ về IP Vercel) và <strong>CNAME</strong> (cho www)</span>
          </div>
          <div style="display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="background: #0D2B1A; color: #88860B; font-size: 10px; font-weight: 700; border-radius: 4px; padding: 2px 6px; flex-shrink: 0; margin-top: 3px;">3</span>
            <span>Vào trang quản lý DNS của nhà cung cấp (Inet/Tenten/PA) → tìm mục <strong>Quản lý DNS / DNS Management</strong> → thêm đúng 2 record Vercel vừa cho</span>
          </div>
          <div style="display: flex; gap: 10px; padding: 4px 0; align-items: flex-start;">
            <span style="background: #1D9E75; color: white; font-size: 10px; font-weight: 700; border-radius: 4px; padding: 2px 6px; flex-shrink: 0; margin-top: 3px;">✓</span>
            <span>Chờ 5–30 phút để DNS lan truyền. Vercel tự cấp SSL (HTTPS) miễn phí. URL tên miền riêng hoạt động.</span>
          </div>
        </div>

        <div style="background: #1a1a2e; border-radius: 10px; padding: 14px 16px; margin-top: 14px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CHAT VỚI AI — Nếu bị kẹt bước DNS</p>
          <pre style="color: #e8f0ec; font-size: 12.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Tôi mua tên miền tại [Inet/Tenten/PA Vietnam].
Vercel yêu cầu tôi thêm DNS record này:
[paste thông tin A record và CNAME từ Vercel vào đây]

Hướng dẫn tôi vào đúng chỗ trong trang quản lý
của [nhà cung cấp] để thêm 2 record này.</pre>
        </div>
      </div>
    </div>

    <!-- Part B: SePay -->
    <p style="font-size: 13px; font-weight: 800; color: #0D2B1A; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.03em;">PHẦN B — GẮN SEPAY NHẬN THANH TOÁN</p>
    <div style="width: 40px; height: 3px; background: #C0390E; border-radius: 2px; margin-bottom: 20px;"></div>

    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 18px 20px; margin-bottom: 20px;">
      <p style="font-size: 13px; font-weight: 700; color: #0D2B1A; margin: 0 0 10px;">SePay hoạt động như thế nào?</p>
      <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 10px;">SePay kết nối với tài khoản ngân hàng của bạn. Khi khách chuyển khoản đúng nội dung, SePay nhận diện tự động và ghi nhận đơn hàng — không cần bạn ngồi kiểm tra sao kê.</p>
      <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.9;">
        <strong>3 thứ cần có trước:</strong><br>
        1. Tài khoản SePay — đăng ký tại <strong>sepay.vn</strong> (miễn phí)<br>
        2. Tài khoản ngân hàng hỗ trợ: Vietcombank, MB Bank, Techcombank, ACB, ...<br>
        3. Kết nối ngân hàng vào SePay trong dashboard
      </div>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">💳 Tạo QR Thanh Toán Và Gắn Vào Landing Page</p>

    <div style="margin-bottom: 24px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px; margin-bottom: 14px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CHAT VỚI AI — Gắn SePay QR vào index.html</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Đọc file index.html.

Thêm section thanh toán SePay vào trang.
Thông tin tài khoản:
- Tên tài khoản: [tên tài khoản ngân hàng]
- Số tài khoản: [số tài khoản]
- Ngân hàng: [tên ngân hàng — ví dụ: MB Bank]
- Số tiền: [giá sản phẩm — ví dụ: 1868000]
- Nội dung chuyển khoản: DP [HO TEN] [SDT]

Hãy:
1. Nhúng QR VietQR tự động sinh theo số tiền
2. Thêm hướng dẫn thanh toán 3 bước rõ ràng
3. Thêm form khách điền: họ tên + SĐT + email
   — gửi sau khi chuyển khoản xong
4. Cập nhật vào index.html</pre>
        </div>
        <div style="background: #FFF8E6; border-radius: 8px; padding: 12px 14px;">
          <p style="font-size: 12px; font-weight: 600; color: #7A5500; margin: 0 0 4px;">Nội dung chuyển khoản — quan trọng</p>
          <p style="font-size: 13px; color: #444; margin: 0; line-height: 1.6;">Format: <strong>DP NGUYEN VAN A 0901234567</strong>. SePay đọc nội dung này để auto-match đơn. Ghi rõ cho khách ngay trên trang — sai nội dung là không tự động nhận diện được.</p>
        </div>
      </div>
    </div>

    <!-- Part C: Meta Pixel -->
    <p style="font-size: 13px; font-weight: 800; color: #0D2B1A; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.03em;">PHẦN C — CÀI META PIXEL ĐO HIỆU QUẢ</p>
    <div style="width: 40px; height: 3px; background: #C0390E; border-radius: 2px; margin-bottom: 20px;"></div>

    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 18px 20px; margin-bottom: 20px;">
      <p style="font-size: 13px; font-weight: 700; color: #0D2B1A; margin: 0 0 10px;">Meta Pixel làm được gì?</p>
      <div style="background: #F6F0E4; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #555; line-height: 1.9;">
        • Đếm số người vào landing page từng ngày<br>
        • Biết traffic từ quảng cáo nào (Facebook/Instagram)<br>
        • Ghi nhận khi khách submit form (Lead event)<br>
        • Tạo Custom Audience retarget khách đã vào nhưng chưa mua<br>
        • Tối ưu quảng cáo — Facebook tự tìm người giống khách đã chuyển đổi
      </div>
    </div>

    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📊 Gắn Pixel ID Vào index.html</p>

    <div style="margin-bottom: 24px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <p style="font-size: 14px; color: #444; line-height: 1.7; margin: 0 0 12px;">Lấy Pixel ID: vào <strong>business.facebook.com → Events Manager → Data Sources → Pixel</strong>. Copy dãy số 15–16 chữ số. Chưa có thì tạo mới tại đó.</p>
        <div style="background: #1a1a2e; border-radius: 10px; padding: 16px 18px; margin-bottom: 14px;">
          <p style="color: #88c0a0; font-size: 11px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">CHAT VỚI AI — Gắn Meta Pixel</p>
          <pre style="color: #e8f0ec; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: ''Courier New'', monospace;">Đọc file index.html.

Gắn Meta Pixel với các event sau:
- Pixel ID: [pixel ID của bạn]
- PageView: tự động khi trang load
- Lead: khi khách submit form thông tin
- InitiateCheckout: khi khách bấm nút thanh toán

Cập nhật index.html.</pre>
        </div>
        <p style="font-size: 13px; color: #888; margin: 0; line-height: 1.6;">Sau khi cập nhật: push file index.html lên GitHub → Vercel tự deploy lại. Pixel bắt đầu hoạt động ngay trên URL Vercel.</p>
      </div>
    </div>

    <!-- Verify -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🧪 Kiểm Tra Trước Khi Chạy Quảng Cáo</p>

    <div style="margin-bottom: 28px; border: 1px solid #DDD8CB; border-radius: 12px; overflow: hidden; background: white;">
      <div style="padding: 16px 20px;">
        <div style="font-size: 13px; color: #333; line-height: 2;">
          <div style="display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">1.</span>
            <span>Mở URL Vercel trên trình duyệt — trang hiện bình thường, không báo lỗi</span>
          </div>
          <div style="display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">2.</span>
            <span>Cài extension <strong>Meta Pixel Helper</strong> trên Chrome → vào landing page → icon xanh = Pixel đang chạy đúng</span>
          </div>
          <div style="display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">3.</span>
            <span>Test thanh toán: chuyển khoản thử <strong>1.000đ</strong> đúng nội dung → SePay dashboard có ghi nhận không?</span>
          </div>
          <div style="display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px solid #F0EDE4; align-items: flex-start;">
            <span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">4.</span>
            <span>Mở trên điện thoại thật → QR quét được bằng camera không?</span>
          </div>
          <div style="display: flex; gap: 10px; padding: 4px 0; align-items: flex-start;">
            <span style="color: #1D9E75; font-weight: 700; flex-shrink: 0;">5.</span>
            <span>Chia sẻ link cho 1 người quen → họ điền form → bạn nhận được thông tin không?</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div style="border-top: 1px solid #DDD8CB; margin-bottom: 24px;"></div>

    <!-- Pass / Fail -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
      <div style="background: #EAF5EF; border: 1px solid #c4e4d2; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">✅ Hoàn Thành Khóa Học Khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          URL Vercel (hoặc tên miền riêng) mở được.<br><br>
          Test chuyển khoản SePay nhận diện đúng.<br><br>
          Meta Pixel Helper hiện xanh trên trang.<br><br>
          1 người thật đã vào trang và điền form.
        </div>
      </div>
      <div style="background: #FEF2F2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px;">
        <p style="font-size: 12px; font-weight: 700; color: #C0390E; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">❌ Chưa xong khi</p>
        <div style="font-size: 13px; color: #333; line-height: 1.8;">
          Vercel deploy lỗi — chưa push file lên GitHub.<br><br>
          QR có nhưng chưa test chuyển khoản thật tay.<br><br>
          Pixel gắn nhưng Pixel Helper báo đỏ.<br><br>
          Chưa ai ngoài bạn vào trang thật.
        </div>
      </div>
    </div>

    <!-- Completion -->
    <div style="background: linear-gradient(135deg, #0D2B1A 0%, #1D4A30 100%); border-radius: 16px; padding: 24px; margin-bottom: 20px; text-align: center;">
      <p style="color: #88860B; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 10px;">🎉 Hoàn Thành Khóa Học</p>
      <p style="color: #F6F0E4; font-size: 20px; font-weight: 800; margin: 0 0 10px; line-height: 1.3;">Bạn đã có landing page chuyển đổi cao, sẵn sàng chạy</p>
      <p style="color: #C8D5C9; font-size: 13px; margin: 0 0 18px; line-height: 1.7;">Từ không có gì đến: chân dung khách → giọng văn → Hormozi → cơ chế khác biệt → offer 5 lớp → phễu → landing page → giao diện → GitHub → Vercel → SePay → Meta Pixel.</p>
      <div style="background: rgba(255,255,255,0.08); border-radius: 10px; padding: 14px 18px; text-align: left;">
        <p style="color: #88860B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">📝 Nộp Bài Tốt Nghiệp</p>
        <p style="color: #C8D5C9; font-size: 13px; margin: 0; line-height: 1.7;">Gửi <strong>URL Vercel</strong> + ảnh chụp SePay dashboard có giao dịch test + ảnh Meta Pixel Helper màu xanh. Dũng xem qua và phản hồi điểm cần chỉnh trước khi bạn chạy quảng cáo thật.</p>
      </div>
    </div>

    <!-- Next -->
    <div style="background: #88860B; border-radius: 12px; padding: 16px 20px;">
      <p style="color: #0D2B1A; font-size: 14px; font-weight: 700; margin: 0 0 6px;">Bước Tiếp Theo Sau Khóa Này</p>
      <p style="color: #3D2800; font-size: 13px; margin: 0; line-height: 1.7;">Tỷ lệ chuyển đổi thật đến từ test và tối ưu liên tục — đổi headline, đổi offer, đổi CTA. Mỗi lần chỉnh: push lên GitHub → Vercel tự cập nhật. Tham gia group học viên để chia sẻ số liệu và học từ kết quả thật của nhau.</p>
    </div>

  </div>
</div>
',
  '',
  0,
  10,
  false,
  true
);
-- 4. Verify
SELECT title, sort_order, is_free, is_published,
       LENGTH(content_html) AS html_bytes
FROM   lessons
WHERE  course_id = 'landing_186'
ORDER  BY sort_order;