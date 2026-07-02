'use client'

import { useState } from 'react'
import { 
  TrendingUp, DollarSign, Award, ShieldAlert, AwardIcon, ChevronRight, 
  HelpCircle, Calendar, Users, Percent, Calculator, CheckCircle2, ShoppingBag
} from 'lucide-react'

// Value Ladder interface
interface LadderStep {
  name: string
  price: string
  commission: string
  role: string
  desc: string
}

const LADDER_STEPS: LadderStep[] = [
  {
    name: "0. Thử thách 7 ngày Free",
    price: "0đ",
    commission: "0%",
    role: "Thu thập Leads (Zalo/Email)",
    desc: "Chiến dịch mồi để thu thập thông tin liên hệ của khách hàng tiềm năng mà không tốn chi phí rào cản ban đầu."
  },
  {
    name: "1. Bản Lite (5 Skill content)",
    price: "490.000đ",
    commission: "20% (~98k)",
    role: "Tripwire - Hòa vốn chi phí Ads",
    desc: "Sản phẩm giá thấp để chuyển đổi người lạ thành người mua hàng lần đầu, tạo dựng lòng tin tối thiểu."
  },
  {
    name: "2. KHÓA 1: Bộ 25 Skill Khởi Động",
    price: "990.000đ",
    commission: "20% (~198k)",
    role: "Core Offer - Đánh trực diện giá rẻ",
    desc: "Bản phổ thông bàn giao 25 skill tự học để học viên tự dựng hệ thống, đè bẹp các đối thủ prompt rẻ tiền."
  },
  {
    name: "3. KHÓA 2: Solopreneur + Tiểu Hà Mã",
    price: "4.970.000đ",
    commission: "10% (~497k)",
    role: "Profit Activator - Xương sống lợi nhuận",
    desc: "Bàn giao kèm bot Telegram chạy trên GoClaw trực chiến 24/7. Đây là nguồn doanh thu lớn nhất của phễu."
  },
  {
    name: "4. Coaching 1-kèm-1",
    price: "9.700.000đ - 12.000.000đ",
    commission: "10%",
    role: "High-Ticket - Dành cho doanh nghiệp bận",
    desc: "Boss trực tiếp đồng hành cài đặt, Soi Hệ Thống và tinh chỉnh từng điểm chạm cho khách hàng."
  },
  {
    name: "5. Câu lạc bộ Solopreneur",
    price: "299.000đ/tháng",
    commission: "20% tháng đầu",
    role: "Continuity - Tạo dòng tiền lặp lại",
    desc: "Học viên duy trì phí thành viên hàng tháng để nhận các skill mới cập nhật và tham gia các buổi họp chuyên sâu."
  }
]

export default function SalesPlanPage() {
  const [activeStep, setActiveStep] = useState<number>(3)
  
  // Hormozi Calculator states
  const [dreamOutcome, setDreamOutcome] = useState<number>(9)
  const [likelihood, setLikelihood] = useState<number>(8)
  const [timeDelay, setTimeDelay] = useState<number>(2)
  const [effort, setEffort] = useState<number>(3)

  // Hormozi Value Score calculation
  const valueScore = ((dreamOutcome * likelihood) / (timeDelay + effort)).toFixed(1)

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <TrendingUp className="text-brand-accent w-6 h-6" />
            Kế Hoạch Bán Hàng (Value Ladder)
          </h1>
          <p className="text-sm text-text-secondary">
            Chiến lược đóng gói sản phẩm, phễu tự động và tiếp thị liên kết cho dự án Hệ Điều Hành Solopreneur
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Value Ladder Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card p-5 bg-surface border-border">
            <h3 className="text-md font-bold text-brand-dark mb-3 flex items-center gap-2">
              <ShoppingBag className="text-brand-accent w-4 h-4" />
              Bậc thang Giá trị (Value Ladder)
            </h3>
            <div className="space-y-2">
              {LADDER_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 border rounded-xl cursor-pointer transition-all ${
                    activeStep === idx 
                      ? 'border-brand-accent bg-brand-accent/5' 
                      : 'border-border hover:bg-black/5 bg-surface'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs text-brand-dark">{step.name}</span>
                    <span className="text-xs font-bold text-brand-accent">{step.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Value Ladder Details */}
          <div className="card p-5 bg-surface border-border space-y-3 min-h-[220px]">
            <div className="flex justify-between items-center border-b pb-2">
              <h4 className="font-bold text-sm text-brand-dark">Chi tiết sản phẩm</h4>
              <span className="text-xs bg-brand-olive/10 text-brand-olive border border-brand-olive/20 px-2 py-0.5 rounded-full font-medium">
                Hoa hồng: {LADDER_STEPS[activeStep].commission}
              </span>
            </div>
            <div>
              <div className="text-xs text-brand-accent font-semibold">{LADDER_STEPS[activeStep].role}</div>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                {LADDER_STEPS[activeStep].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Hormozi's Value Equation Simulator */}
        <div className="lg:col-span-7 card p-6 bg-surface border-border flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-brand-dark mb-4 pb-2 border-b flex items-center gap-2">
              <Calculator className="text-brand-accent w-5 h-5" />
              Bộ tính giá trị chào hàng (Hormozi Value Equation)
            </h3>
            <p className="text-xs text-text-secondary mb-6 leading-relaxed">
              Trị giá sản phẩm tỷ lệ thuận với Kết quả mơ ước & Độ tin cậy; tỷ lệ nghịch với Thời gian trễ & Công sức cản trở.
            </p>

            {/* Formula display */}
            <div className="bg-black/5 p-4 rounded-xl text-center mb-6 border border-border">
              <div className="text-xs text-text-secondary font-mono">CÔNG THỨC: (Dream Outcome × Likelihood) / (Time Delay + Effort)</div>
              <div className="text-2xl font-bold text-brand-accent mt-2 font-mono">Value Score: {valueScore}</div>
              <div className="text-[10px] text-text-secondary mt-1">Chỉ số càng cao, khách hàng càng không thể từ chối (Godfather Offer)</div>
            </div>

            {/* Inputs sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Dream Outcome (Mơ ước của khách):</span>
                  <span className="text-brand-accent font-bold">{dreamOutcome}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={dreamOutcome} 
                  onChange={(e) => setDreamOutcome(parseInt(e.target.value))} 
                  className="w-full accent-brand-accent h-1.5 bg-black/10 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Perceived Likelihood (Độ tin cậy thành công):</span>
                  <span className="text-brand-accent font-bold">{likelihood}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={likelihood} 
                  onChange={(e) => setLikelihood(parseInt(e.target.value))} 
                  className="w-full accent-brand-accent h-1.5 bg-black/10 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Time Delay (Thời gian chờ để thấy kết quả):</span>
                  <span className="text-brand-accent font-bold">{timeDelay}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={timeDelay} 
                  onChange={(e) => setTimeDelay(parseInt(e.target.value))} 
                  className="w-full accent-brand-accent h-1.5 bg-black/10 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Effort & Sacrifice (Công sức & Rào cản):</span>
                  <span className="text-brand-accent font-bold">{effort}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={effort} 
                  onChange={(e) => setEffort(parseInt(e.target.value))} 
                  className="w-full accent-brand-accent h-1.5 bg-black/10 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Funnel Flow & Go-to-market plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-5 bg-surface border-border space-y-4">
          <h3 className="text-md font-bold text-brand-dark flex items-center gap-2">
            <CheckCircle2 className="text-brand-accent w-4 h-4" />
            Lợi thế cạnh tranh của Offer
          </h3>
          <ul className="text-xs text-text-secondary space-y-3">
            <li className="flex gap-2">
              <span className="text-brand-accent font-bold">✔</span>
              <span><strong>Cam kết bảo hành vượt trội:</strong> Bảo hành 14 ngày hoàn tiền (đối thủ chỉ bảo hành 3 ngày). Triệt tiêu 100% rủi ro tài chính của học viên.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-accent font-bold">✔</span>
              <span><strong>Bằng chứng sống mạnh nhất:</strong> Trang landing page và các email tự động họ nhận được chính là minh chứng sống cho thấy hệ thống hoạt động thực tế.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-accent font-bold">✔</span>
              <span><strong>Đại sứ thương hiệu Affiliate:</strong> Hệ thống affiliate 10-20% được tích hợp sẵn giúp tận dụng chính lượng học viên Promoters đi chia sẻ và bán hàng giúp Boss.</span>
            </li>
          </ul>
        </div>

        <div className="card p-5 bg-surface border-border space-y-4">
          <h3 className="text-md font-bold text-brand-dark flex items-center gap-2">
            <Calendar className="text-brand-accent w-4 h-4" />
            Lộ trình Triển Khai 6 Tuần
          </h3>
          <div className="space-y-3 font-mono text-[11px] text-text-secondary">
            <div className="flex justify-between border-b pb-1">
              <span>Tuần 1: Chốt ICP, định vị 2 khóa học.</span>
              <span className="text-brand-accent font-bold">DONE</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Tuần 2: Thiết kế Godfather Offer & Bậc thang.</span>
              <span className="text-brand-accent font-bold">DONE</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Tuần 3: Dựng phễu Landing Page & SePay hooks.</span>
              <span className="text-amber-600">IN PROGRESS</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Tuần 4: Nuôi dưỡng email sequence.</span>
              <span className="text-text-secondary">PENDING</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Tuần 5: Bật ads nhỏ (200k/ngày) + Bật affiliate.</span>
              <span className="text-text-secondary">PENDING</span>
            </div>
            <div className="flex justify-between pb-1">
              <span>Tuần 6: Đọc số liệu Admin Dashboard & Tối ưu.</span>
              <span className="text-text-secondary">PENDING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
