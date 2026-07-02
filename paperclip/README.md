# 🔌 Hướng dẫn Tích hợp Hệ thống AAFB vào Paperclip

Tài liệu này hướng dẫn cách kết nối toàn bộ hệ thống **AI Agent For Business (AAFB)** vào nền tảng điều hành đa agent **Paperclip** để vận hành doanh nghiệp tự động dưới dạng "Zero-Human Company".

---

## 1. Tại sao cần tích hợp Paperclip?
Hiện tại, hệ thống AAFB đang chạy dưới dạng các **Skill Workspace** trên môi trường terminal. Việc tích hợp vào Paperclip mang lại các lợi thế vượt trội:
* **Dashboard Trực quan:** Quản lý toàn bộ sơ đồ tổ chức (Org Chart), danh sách Agent và nhiệm vụ tại một màn hình duy nhất.
* **Kiểm soát Ngân sách (Cost Control):** Đặt hạn mức chi phí và tokens cho từng Agent. Khi Agent chạm trần ngân sách, hệ thống sẽ tự động tạm dừng để tránh phát sinh chi phí ngoài ý muốn.
* **Heartbeat tự động:** Các Agent sẽ tự động thức dậy theo chu kỳ cron, tự check tasks, tự báo cáo và tự bàn giao công việc cho nhau mà không cần con người bấm lệnh.
* **Lưu trữ Persistent Session:** Thread thảo luận, các quyết định của Hội đồng Cố vấn và Project Journal được lưu trữ bền vững, không bị mất khi khởi động lại.

---

## 2. Các bước triển khai tích hợp

### Bước 1: Khởi tạo Paperclip trên máy local
Đảm bảo bạn đã cài đặt Node.js 20+ và pnpm 9.15+. Chạy lệnh sau trong terminal để khởi động trình hướng dẫn onboard tự động:

```bash
npx paperclipai onboard --yes
```

*Lưu ý:* Nếu bạn sử dụng private registry và gặp lỗi E404, hãy chạy lệnh sau để ép buộc kéo từ public registry:
```bash
npx --registry https://registry.npmjs.org paperclipai onboard --yes
```

Sau khi chạy xong, Paperclip sẽ khởi tạo một database PostgreSQL cục bộ và chạy Web UI tại địa chỉ: `http://localhost:3100`.

### Bước 2: Import cấu hình công ty AAFB vào Paperclip
Sử dụng công cụ CLI của Paperclip để nạp cấu hình sơ đồ tổ chức và định nghĩa Agent từ thư mục này vào hệ thống:

```bash
npx paperclipai company import --from ./paperclip --dry-run
```
Lệnh `--dry-run` giúp bạn kiểm tra trước sơ đồ xem có lỗi cú pháp nào không. Nếu mọi thứ hiển thị màu xanh lá cây ổn thỏa, hãy chạy lệnh chính thức để nạp:

```bash
npx paperclipai company import --from ./paperclip
```

### Bước 3: Cấu hình API Keys và Runtimes cho các Agent
1. Truy cập vào Web UI của Paperclip (`http://localhost:3100`).
2. Vào mục **Settings** -> **Secrets**.
3. Điền API Keys của các nhà cung cấp (OpenAI, Anthropic, Gemini) tương ứng với từng Agent trong Org Chart.
4. Đặt ngân sách tháng (Budget Limit) cho từng Agent chuyên môn.

---

## 3. Quy trình Vận hành trong Paperclip
1. **Boss giao nhiệm vụ:** Tạo một Ticket mới trên dashboard Paperclip (ví dụ: *"Tạo chiến dịch ra mắt khóa học Solopreneur tháng 7"*).
2. **CEO nhận việc:** CEO Orchestrator tự động nhận Ticket, đọc lịch sử các dự án cũ trong Project Journal, lên kế hoạch chi tiết và tự động tag **Hội đồng Cố vấn**.
3. **Hội đồng phê duyệt:** Hội đồng Cố vấn tự động nhận thông báo, chấm điểm kế hoạch và trả về điểm số. Nếu điểm số ≥ 80, Ticket tự động chuyển sang trạng thái "Approved".
4. **Các ASSP thực thi:** Các Agent sản xuất nội dung lần lượt nhận việc, làm việc trong Git workspace riêng biệt và cập nhật tiến độ lên Ticket.
5. **Đóng dự án:** Agent Data & Analytics gom số liệu, phân tích hiệu suất chiến dịch và gửi báo cáo nghiệm thu cho Boss. CEO lưu các bài học rút ra vào Project Journal.
