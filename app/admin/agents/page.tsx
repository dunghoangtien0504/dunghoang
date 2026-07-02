'use client'

import { useState } from 'react'
import { 
  Cpu, Target, Shield, Zap, HelpCircle, Mail, DollarSign, Users, 
  Play, ChevronRight, Copy, Check, CheckCircle2, ChevronDown, Activity, 
  Terminal, FolderTree, BookOpen, MessageSquare
} from 'lucide-react'

// Stepper data
interface StepDetail {
  title: string
  desc: string
  icon: React.ReactNode
  callout: string
}

const STEP_DETAILS: Record<number, StepDetail> = {
  1: {
    title: "Bước 1: Boss giao mục tiêu",
    desc: "Người dùng (Boss) chỉ cần tạo 1 ticket mới trên Paperclip. Ví dụ: 'Ra mắt khóa học Landing Page Wepower V4 trong tháng 7/2026, mục tiêu doanh thu 200tr'. Không cần thao tác phức tạp.",
    icon: <Users className="w-8 h-8 text-[#C0390E]" />,
    callout: "Hệ thống Ticket của Paperclip lưu trữ và bảo toàn mục tiêu gốc xuyên suốt toàn bộ vòng đời chiến dịch."
  },
  2: {
    title: "Bước 2: CEO Orchestrator lập kế hoạch",
    desc: "CEO tự động nhận ticket, truy cập Project Journal (Bộ nhớ CEO) để tìm bài học cũ. Sau đó tự động phân loại scope (Micro/Mini/Full) và lập bản kế hoạch chi tiết.",
    icon: <Cpu className="w-8 h-8 text-blue-600" />,
    callout: "CEO phân loại scope dựa trên đặc tả scope-classifier.md để tối ưu hóa nguồn lực cố vấn cần triệu tập."
  },
  3: {
    title: "Bước 3: Hội đồng Cố vấn phản biện",
    desc: "CEO trình kế hoạch lên Hội đồng Cố vấn. Các cố vấn tự động chấm điểm theo rubric 100 điểm. Kế hoạch bắt buộc phải đạt >= 80 điểm mới được chạy.",
    icon: <Shield className="w-8 h-8 text-amber-600" />,
    callout: "Mọi cuộc họp của Hội đồng đều tự động ghi lại file audit-log.yml để Boss có thể kiểm duyệt chi tiết."
  },
  4: {
    title: "Bước 4: Chuỗi Agent ASSP thực thi",
    desc: "Sau khi kế hoạch đạt điểm PASS, CEO điều phối các Agent sản xuất tài nguyên theo đúng sơ đồ phễu: chân dung khách hàng, giọng văn, viết landing page, email, VSL...",
    icon: <Zap className="w-8 h-8 text-green-600" />,
    callout: "Đầu ra của Agent trước là đầu vào của Agent sau, đảm bảo tính nhất quán của toàn bộ tài nguyên."
  },
  5: {
    title: "Bước 5: Giao sản phẩm & Chăm sóc",
    desc: "Khi phát sinh đơn hàng, Agent Fulfillment tự động giao bài học, gửi Welcome Email chuẩn giọng viết của Boss và chạy vòng lặp Onboarding 7 ngày để hỗ trợ học viên.",
    icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
    callout: "Quy trình chăm sóc sau bán hàng giúp giảm tối đa tỷ lệ hoàn tiền (Refund Rate) và giữ chân khách học."
  },
  6: {
    title: "Bước 6: Đo lường & Phân tích số liệu",
    desc: "Agent Data thu gom số liệu thô (doanh thu, chi phí, click) từ hệ thống. Agent Analytics phân tích hiệu suất và đề xuất phương án (Scale/Rescue/Hold) lên CEO.",
    icon: <Activity className="w-8 h-8 text-teal-600" />,
    callout: "Giúp doanh nghiệp đưa ra các quyết định dựa trên con số thực tế thay vì suy đoán cảm tính."
  },
  7: {
    title: "Bước 7: CEO học hỏi & Lưu trữ",
    desc: "CEO nhận đề xuất của Analytics, đưa ra quyết định hành động và tự rút ra 3 bài học kinh nghiệm sâu sắc để ghi nhận vào Project Journal (Memory).",
    icon: <Cpu className="w-8 h-8 text-rose-600" />,
    callout: "Cơ chế tự học (Self-learning) giúp hệ thống tự tối ưu hóa và ngày càng thông minh hơn qua các dự án."
  }
}

// Agent definitions
interface AgentInfo {
  role: string
  desc: string
  input: string
  output: string
  color: string
}

const AGENTS_LIST: Record<string, AgentInfo[]> = {
  management: [
    {
      role: 'CEO Orchestrator',
      desc: 'Tổng điều hành. Lập kế hoạch chiến dịch, phân loại scope, điều phối chuỗi thực thi và tự rút bài học.',
      input: 'Mục tiêu của Boss + Project Journal',
      output: 'implementation-plan.md',
      color: 'border-blue-500 text-blue-700 bg-blue-50/50'
    }
  ],
  governance: [
    {
      role: 'Chairman (Chủ tịch)',
      desc: 'Chủ trì cuộc họp, hòa giải các cố vấn, kiểm duyệt rủi ro và ký phán quyết cuối cùng.',
      input: 'Kế hoạch + Đánh giá của các ghế',
      output: 'audit-log.yml (PASS / RETRY)',
      color: 'border-amber-500 text-amber-700 bg-amber-50/50'
    },
    {
      role: 'Các Cố vấn C-Suite (CCO, CFO, COO, CHRO)',
      desc: 'Chấm điểm các mặt trận (Marketing, Sales, Tài chính, Vận hành, Nhân sự) theo rubric chuyên ngành.',
      input: 'Kế hoạch + Tài liệu tham khảo ghế',
      output: 'Điểm số chi tiết / 100đ',
      color: 'border-amber-500 text-amber-700 bg-amber-50/50'
    }
  ],
  execution: [
    {
      role: '00. Ideation & Niche Finder',
      desc: 'Validate ý tưởng khởi nghiệp, khảo sát thị trường real-time và gợi ý mô hình kinh doanh tiềm năng.',
      input: 'Ý tưởng thô + Nguồn lực',
      output: 'niche-validation.md',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    },
    {
      role: '01. Avatar & Market Research',
      desc: 'Nghiên cứu chân dung khách hàng mơ ước (ICP), phân tích đối thủ cạnh tranh và tìm khoảng trống thị trường.',
      input: 'Mô tả sản phẩm / khóa học',
      output: 'avatar.md / competitor-analysis.md',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    },
    {
      role: '02. Brand Voice Profile',
      desc: 'Định hình tông giọng viết mộc mạc cá nhân của Boss để đồng nhất văn phong viết quảng cáo.',
      input: 'Các bài viết mẫu của Boss',
      output: 'voice-profile.yml',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    },
    {
      role: '03. Hero Mechanism Builder',
      desc: 'Thiết kế cơ chế độc quyền khác biệt giúp định vị sản phẩm không thể so sánh giá.',
      input: 'avatar.md + thế mạnh sản phẩm',
      output: 'hero-mechanism.md',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    },
    {
      role: '04. Money Model Architect',
      desc: 'Thiết lập mô hình dòng tiền và bậc thang giá trị (Value Ladder) tối ưu hóa giá trị vòng đời khách hàng.',
      input: 'hero-mechanism.md + định hướng tài chính',
      output: 'money-model.md',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    },
    {
      role: '05. Offer Architect & Copy',
      desc: 'Thiết kế lời chào hàng Godfather Offer và viết sales copy thuyết phục theo phương trình trị giá trị Hormozi.',
      input: 'avatar.md + money-model.md',
      output: 'offer.md / sales-copy.md',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    },
    {
      role: '06. HVCO & Lead Magnet',
      desc: 'Thiết kế mồi thu hút giá trị cao (High Value Content Offer) để thu thập dữ liệu khách hàng tiềm năng.',
      input: 'avatar.md + offer.md',
      output: 'lead-magnet-brief.md',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    },
    {
      role: '07. Funnel & Email Strategist',
      desc: 'Dựng sơ đồ phễu bán hàng tự động và soạn kịch bản chuỗi email nuôi dưỡng/vớt khách hàng nguội.',
      input: 'offer.md + lead-magnet-brief.md',
      output: 'funnel-blueprint.md / email-sequences.md',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    },
    {
      role: '08. Landing Page Builder',
      desc: 'Tự động dựng landing page bán hàng chuyển đổi cao theo hệ thống Wepower V4 (dạng HTML có Sticky CTA).',
      input: 'funnel-blueprint.md + sales-copy.md',
      output: 'index.html (landing page)',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    },
    {
      role: '09. After-Sales Lifecycle',
      desc: 'Fulfillment tự động kích hoạt bàn giao khóa học, onboarding 7 ngày và khảo sát NPS kích hoạt referral affiliate.',
      input: 'Đơn hàng thành công (PayOS/SePay webhook)',
      output: 'delivery-log.yml / raving-fan-referral.yml',
      color: 'border-green-500 text-green-700 bg-green-50/50'
    }
  ]
}

const ROUTING_FLOWS: Record<string, string[]> = {
  launch: [
    '00. Ideation & Niche Finder',
    '01. Avatar & Market Research',
    '02. Brand Voice Profile',
    '03. Hero Mechanism Builder',
    '04. Money Model Architect',
    '05. Offer Architect & Copy',
    '06. HVCO & Lead Magnet',
    '07. Funnel & Email Strategist',
    '08. Landing Page Builder',
    '09. After-Sales Lifecycle'
  ],
  ads: [
    '01. Avatar & Market Research',
    '02. Brand Voice Profile',
    '05. Offer Architect & Copy',
    '08. Landing Page Builder'
  ],
  funnel: [
    '04. Money Model Architect',
    '05. Offer Architect & Copy',
    '07. Funnel & Email Strategist',
    '08. Landing Page Builder'
  ]
}

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState<'howitworks' | 'agents' | 'routing' | 'faq' | 'paperclip'>('howitworks')
  const [activeStep, setActiveStep] = useState<number>(1)
  const [activeSim, setActiveSim] = useState<'launch' | 'ads' | 'funnel'>('launch')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 1500)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <Cpu className="text-brand-accent w-6 h-6" />
            Điều Hành AI (E2E)
          </h1>
          <p className="text-sm text-text-secondary">
            Cẩm nang chi tiết và trung tâm điều hành hệ thống AI Agent For Business của Dũng Hoàng
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-success inline-block animate-pulse" />
          <span className="text-xs font-semibold text-success">Sẵn sàng vận hành</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('howitworks')}
          className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'howitworks' 
              ? 'border-brand-accent text-brand-accent' 
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Mô hình hoạt động
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'agents' 
              ? 'border-brand-accent text-brand-accent' 
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Danh sách Agent
        </button>
        <button
          onClick={() => setActiveTab('routing')}
          className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'routing' 
              ? 'border-brand-accent text-brand-accent' 
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Trình mô phỏng phễu
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'faq' 
              ? 'border-brand-accent text-brand-accent' 
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Hỏi đáp dễ hiểu
        </button>
        <button
          onClick={() => setActiveTab('paperclip')}
          className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'paperclip' 
              ? 'border-brand-accent text-brand-accent' 
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Tích hợp Paperclip
        </button>
      </div>

      {/* ================= TAB 1: HOW IT WORKS ================= */}
      {activeTab === 'howitworks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stepper timeline */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-lg font-bold text-brand-dark">Vòng lặp 7 bước khép kín</h3>
            <p className="text-xs text-text-secondary">Click từng bước để trực quan hóa cách hệ thống làm việc.</p>
            
            <div className="space-y-2">
              {Object.entries(STEP_DETAILS).map(([step, details]) => {
                const sNum = parseInt(step)
                return (
                  <div
                    key={sNum}
                    onClick={() => setActiveStep(sNum)}
                    className={`flex gap-4 p-3 border rounded-xl cursor-pointer transition-all ${
                      activeStep === sNum 
                        ? 'border-brand-accent bg-brand-accent/5' 
                        : 'border-border hover:bg-black/5 bg-surface'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      activeStep === sNum 
                        ? 'bg-brand-accent text-white' 
                        : 'bg-black/5 text-text-secondary'
                    }`}>
                      {sNum}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-brand-dark">{details.title}</h4>
                      <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{details.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Details visual box */}
          <div className="lg:col-span-7 card flex flex-col justify-between min-h-[380px] p-6 bg-surface border-border">
            <div>
              <h3 className="text-lg font-bold text-brand-dark mb-4 pb-2 border-b border-border">
                Chi tiết: {STEP_DETAILS[activeStep].title}
              </h3>
              
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
                  {STEP_DETAILS[activeStep].icon}
                </div>
                <p className="text-sm text-brand-dark max-w-md leading-relaxed">
                  {STEP_DETAILS[activeStep].desc}
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-brand-accent/5 border border-brand-accent/10 p-3 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
              <div className="text-xs text-brand-dark leading-relaxed">
                <strong>Ghi chú vận hành:</strong> {STEP_DETAILS[activeStep].callout}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: AGENTS LIST ================= */}
      {activeTab === 'agents' && (
        <div className="space-y-8">
          {/* Management */}
          <div className="space-y-4">
            <h3 className="text-md font-bold text-brand-dark flex items-center gap-2 border-b pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Lớp Điều hành (Management Tier)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {AGENTS_LIST.management.map((agent, i) => (
                <div key={i} className={`border rounded-xl p-4 bg-surface ${agent.color}`}>
                  <h4 className="font-bold text-sm flex items-center gap-2">{agent.role}</h4>
                  <p className="text-xs text-text-secondary mt-1 min-h-[48px]">{agent.desc}</p>
                  <div className="mt-3 p-2 bg-black/5 rounded-lg text-[10px] space-y-1 font-mono">
                    <div><span className="font-bold text-blue-600">IN:</span> {agent.input}</div>
                    <div><span className="font-bold text-green-600">OUT:</span> {agent.output}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance */}
          <div className="space-y-4">
            <h3 className="text-md font-bold text-brand-dark flex items-center gap-2 border-b pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Lớp Kiểm soát & Cố vấn (Governance - Council)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AGENTS_LIST.governance.map((agent, i) => (
                <div key={i} className={`border rounded-xl p-4 bg-surface ${agent.color}`}>
                  <h4 className="font-bold text-sm flex items-center gap-2">{agent.role}</h4>
                  <p className="text-xs text-text-secondary mt-1 min-h-[36px]">{agent.desc}</p>
                  <div className="mt-3 p-2 bg-black/5 rounded-lg text-[10px] space-y-1 font-mono">
                    <div><span className="font-bold text-blue-600">IN:</span> {agent.input}</div>
                    <div><span className="font-bold text-green-600">OUT:</span> {agent.output}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution */}
          <div className="space-y-4">
            <h3 className="text-md font-bold text-brand-dark flex items-center gap-2 border-b pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              Lớp Thực thi (Execution Tier - ASSP)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {AGENTS_LIST.execution.map((agent, i) => (
                <div key={i} className={`border rounded-xl p-4 bg-surface ${agent.color}`}>
                  <h4 className="font-bold text-sm flex items-center gap-2">{agent.role}</h4>
                  <p className="text-xs text-text-secondary mt-1 min-h-[48px]">{agent.desc}</p>
                  <div className="mt-3 p-2 bg-black/5 rounded-lg text-[10px] space-y-1 font-mono">
                    <div><span className="font-bold text-blue-600">IN:</span> {agent.input}</div>
                    <div><span className="font-bold text-green-600">OUT:</span> {agent.output}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ROUTING SIMULATION ================= */}
      {activeTab === 'routing' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSim('launch')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                activeSim === 'launch'
                  ? 'bg-brand-accent text-white border-brand-accent'
                  : 'bg-surface border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              🚀 Ra mắt sản phẩm / Khóa học mới
            </button>
            <button
              onClick={() => setActiveSim('ads')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                activeSim === 'ads'
                  ? 'bg-brand-accent text-white border-brand-accent'
                  : 'bg-surface border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              📢 Viết quảng cáo cho offer có sẵn
            </button>
            <button
              onClick={() => setActiveSim('funnel')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                activeSim === 'funnel'
                  ? 'bg-brand-accent text-white border-brand-accent'
                  : 'bg-surface border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              🕸️ Dựng phễu bán hàng hoàn chỉnh
            </button>
          </div>

          <div className="card p-6 bg-surface border-border">
            <h4 className="font-bold text-sm text-brand-dark mb-4">
              Sơ đồ tuần tự các Agent được kích hoạt:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-black/5 rounded-xl border border-border">
              {ROUTING_FLOWS[activeSim].map((node, index) => (
                <div 
                  key={index}
                  className="bg-surface border border-border rounded-xl p-3 text-center relative shadow-card hover:border-brand-accent transition-all"
                >
                  <span className="absolute top-2 left-2 bg-brand-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {index + 1}
                  </span>
                  <div className="font-semibold text-xs text-brand-dark pt-2">{node}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 bg-brand-olive/5 border border-brand-olive/10 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-brand-olive flex-shrink-0 mt-0.5" />
            <div className="text-xs text-brand-dark leading-relaxed">
              <strong>Nguyên tắc kết nối:</strong> Toàn bộ các file tài nguyên được lưu trực tiếp vào thư mục của dự án. Agent tiếp theo sẽ đọc file cấu hình của Agent trước làm dữ liệu đầu vào. Boss hoàn toàn có thể vào chỉnh sửa các file này để tinh chỉnh theo ý muốn.
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: FAQ ================= */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-dark">Giải đáp thắc mắc bằng văn nói dễ hiểu</h3>
          <p className="text-sm text-text-secondary">Những câu hỏi thường gặp về cách vận hành hệ sinh thái công ty AI của anh.</p>
          
          <div className="space-y-2">
            {[
              {
                q: "Tại sao chúng ta không dùng một con chatbot duy nhất mà phải chia ra nhiều Agent?",
                a: "Một con bot duy nhất khi làm nhiều việc sẽ bị quá tải ngữ cảnh (context window) dẫn đến hay bị quên mục tiêu hoặc trả lời sai lệch (hallucination). Chia nhỏ ra các Agent chuyên môn giống như mô hình công ty con người: mỗi bot chỉ làm một việc cực tốt (ví dụ: một bot chuyên nghiên cứu khách hàng, một bot chuyên thiết kế offer, một bot chuyên viết email). Sự phân vai này giúp đảm bảo độ sâu và chất lượng của từng tài nguyên được tạo ra."
              },
              {
                q: "Hội đồng Cố vấn có nhiệm vụ gì, có trực tiếp code hay chạy ads không?",
                a: "Hội đồng Cố vấn không tự code hay chạy ads. Vai trò của Hội đồng là Governance (Giám sát rủi ro). Khi CEO lập kế hoạch chi phí ads 50tr, Cố vấn CFO (Tài chính) sẽ nhảy vào kiểm tra xem LTV/CAC có đạt không, Cố vấn COO (Vận hành) kiểm tra xem quy trình giao hàng LMS có bị kẹt không. Điều này tương tự như một Ban quản trị doanh nghiệp: kiểm duyệt kế hoạch để tránh những sai lầm đốt tiền vô lý của AI trước khi cho chạy thực tế."
              },
              {
                q: "Paperclip có vai trò gì trong hệ thống này?",
                a: "Nếu các Agent và các skill là 'S Standard Operating Procedures (SOP)' thì Paperclip là 'Văn phòng làm việc' của chúng. Paperclip cung cấp: giao diện Web trực quan, hệ thống phân định Sơ đồ tổ chức (Org Chart), hệ thống Đặt hạn mức tokens/chi phí để bot không chạy quá ngân sách và cơ chế Heartbeat (đánh thức theo cron) để bot tự động thức dậy kiểm tra nhiệm vụ mỗi sáng."
              },
              {
                q: "Cơ chế tự học (Project Journal) hoạt động thế nào?",
                a: "Mỗi khi chiến dịch kết thúc, Agent Data gom số liệu thực tế gửi sang Agent Analytics phân tích. Nếu chiến dịch bán hàng đạt doanh số, CEO sẽ tự động đúc kết những bài học thành công và lưu lại vào file Project Journal. Khi Boss giao chiến dịch tiếp theo, CEO sẽ tự động đọc lại Project Journal để điều chỉnh chiến lược, giúp hệ thống thông minh hơn theo thời gian chạy dự án."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-border rounded-xl overflow-hidden bg-surface">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 font-semibold text-sm text-brand-dark flex justify-between items-center hover:bg-black/5"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'transform rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 border-t border-border text-xs text-text-secondary leading-relaxed bg-black/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 5: PAPERCLIP INTEGRATION ================= */}
      {activeTab === 'paperclip' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 card space-y-6 bg-surface border-border">
            <h3 className="text-lg font-bold text-brand-dark">Hướng dẫn cài đặt & tích hợp Paperclip</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider mb-2">
                  Bước 1: Cài đặt và onboard Paperclip cục bộ (local)
                </h4>
                <div className="bg-black/90 text-green-400 p-4 rounded-xl font-mono text-xs flex justify-between items-center relative border border-border">
                  <span>npx paperclipai onboard --yes</span>
                  <button
                    onClick={() => handleCopy('npx paperclipai onboard --yes')}
                    className="p-1 hover:bg-white/10 rounded transition-colors text-white"
                  >
                    {copiedText === 'npx paperclipai onboard --yes' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-brand-dark uppercase tracking-wider mb-2">
                  Bước 2: Nạp cấu hình doanh nghiệp AAFB vào Dashboard
                </h4>
                <div className="bg-black/90 text-green-400 p-4 rounded-xl font-mono text-xs flex justify-between items-center relative border border-border">
                  <span>npx paperclipai company import --from ./paperclip</span>
                  <button
                    onClick={() => handleCopy('npx paperclipai company import --from ./paperclip')}
                    className="p-1 hover:bg-white/10 rounded transition-colors text-white"
                  >
                    {copiedText === 'npx paperclipai company import --from ./paperclip' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 card space-y-4 bg-surface border-border">
            <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider">Cấu trúc Folder nạp</h3>
            <p className="text-xs text-text-secondary">Bộ cấu hình đã được đóng gói sẵn sàng trong thư mục:</p>
            <div className="font-mono text-xs text-brand-accent space-y-1">
              <div>📁 paperclip/</div>
              <div>├── 📄 COMPANY.md (Sơ đồ Org Chart)</div>
              <div>└── 📁 agents/</div>
              <div className="pl-4">├── 📁 ceo-orchestrator/</div>
              <div className="pl-4">├── 📁 council-of-advisors/</div>
              <div className="pl-4">├── 📁 chairman/</div>
              <div className="pl-4">├── 📁 data-analytics/</div>
              <div className="pl-4">├── 📁 agent-fulfillment/</div>
              <div className="pl-4">└── 📁 agent-raving-fan/</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
