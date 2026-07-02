---
name: AI Agent For Business
slug: ai-agent-for-business
schema: agentcompanies/v1
version: 1.0.0
license: Proprietary
authors:
  - name: Dũng Hoàng (Kent)
goals:
  - Xây dựng hệ thống vận hành tự động cho doanh nghiệp Solopreneur/SME
  - Tự động hóa sản xuất nội dung, bán hàng, và chăm sóc khách hàng khép kín
  - Kiểm soát chi phí, ngân sách và rủi ro bằng Hội đồng Cố vấn AI
---

# 🏢 AI Agent For Business (AAFB) — Sơ đồ Tổ chức Doanh nghiệp AI

Chào mừng đến với hệ thống điều hành doanh nghiệp tự động **AI Agent For Business (AAFB)** được cấu hình trên nền tảng Paperclip. Hệ thống này bao gồm các lớp Cố vấn, lớp Điều hành, lớp Thực thi chuyên môn (ASSP) và lớp Kiểm soát Số liệu.

## 📊 Sơ đồ Báo cáo (Org Chart)

```mermaid
graph TD
    BOSS["👤 BOSS (Human)"] --> CEO["🎯 CEO Orchestrator"]
    BOSS --> CHAIRMAN["👑 Chủ Tịch Hội đồng"]
    
    CHAIRMAN --> COUNCIL["👥 Hội đồng Cố vấn"]
    COUNCIL --> |"Chấm điểm & Duyệt"| CEO
    
    CEO --> MKT_ADV["🎯 Cố vấn Marketing"]
    CEO --> SALES_ADV["💰 Cố vấn Sales"]
    CEO --> OPS_ADV["⚙️ Cố vấn Vận hành"]
    CEO --> HR_ADV["👥 Cố vấn Nhân sự"]
    CEO --> FIN_ADV["📊 Cố vấn Tài chính"]
    
    CEO --> EXEC["⚡ Chuỗi Agent Thực thi ASSP"]
    EXEC --> AVATAR["01. Avatar Builder"]
    EXEC --> VOICE["02. Brand Voice Builder"]
    EXEC --> HERO["03. Hero Mechanism Builder"]
    EXEC --> MONEY["04. Money Model Architect"]
    EXEC --> OFFER["05. Offer Architect"]
    EXEC --> HVCO["06. HVCO Creator"]
    EXEC --> FUNNEL["07. Funnel Strategist"]
    EXEC --> ADCOPY["08. Ad Copy Machine"]
    EXEC --> LANDING["08B. Landing Page Builder"]
    EXEC --> VSL["09. VSL Scriptwriter"]
    EXEC --> EMAIL["10. Email Closer"]
    EXEC --> FOLLOWUP["11. Follow-up Engine"]
    EXEC --> CALL["12. Sales Call Script"]
    
    CEO --> DATA_ANALYTICS["📈 Bộ phận Kiểm soát Số liệu"]
    DATA_ANALYTICS --> DATA["Agent Data"]
    DATA_ANALYTICS --> ANALYTICS["Agent Analytics"]
    
    style BOSS fill:#FFD700,stroke:#333,stroke-width:2px,color:#000
    style CEO fill:#1a73e8,stroke:#333,stroke-width:2px,color:#fff
    style CHAIRMAN fill:#9c27b0,stroke:#333,stroke-width:2px,color:#fff
    style COUNCIL fill:#e1bee7,stroke:#333,color:#000
    style EXEC fill:#2e7d32,stroke:#333,stroke-width:2px,color:#fff
    style DATA_ANALYTICS fill:#e65100,stroke:#333,stroke-width:2px,color:#fff
```

## ⚙️ Hướng dẫn Vận hành Chung
1. **CEO Orchestrator** nhận nhiệm vụ trực tiếp từ Boss, xây dựng bản kế hoạch ban đầu, phân loại phạm vi (Micro/Mini/Full) và trình lên **Hội đồng Cố vấn**.
2. **Hội đồng Cố vấn** dưới sự chủ trì của **Chủ Tịch** sẽ tiến hành đánh giá kế hoạch theo các tiêu chí chuyên môn và chấm điểm (Rubric 100 điểm). Kế hoạch chỉ được triển khai khi đạt điểm số tối thiểu **80/100**.
3. Sau khi được duyệt, CEO kích hoạt các **Agent ASSP** tương ứng với kịch bản vận hành để sản xuất ra các tài nguyên kinh doanh.
4. Khi chiến dịch hoàn thành, **Agent Data** thu thập số liệu thực tế, chuyển giao cho **Agent Analytics** phân tích hiệu suất và trả kết quả tối ưu hóa (Scale/Rescue/Hold) về cho CEO ghi nhận vào bộ nhớ Project Journal.
