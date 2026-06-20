import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand: 5 quy tắc cứng ──────────────────────────────────
        'brand-dark':    '#0D2B1A',   // Header · Footer · Nút tròn
        'brand-bg':      '#F6F0E4',   // Nền toàn trang (duy nhất)
        'brand-accent':  '#C0390E',   // CHỈ 1 ĐIỂM — CTA / tiêu đề
        'brand-olive':   '#88860B',   // Badge · Icon · Đường kẻ (<5%)
        'brand-border':  '#3D6B4A',   // Đường viền card · Chữ nhãn phụ

        // ── Surface system (trên nền cream) ────────────────────────
        background:      '#F6F0E4',   // = brand-bg
        surface:         '#FFFFFF',   // Card / panel chính
        'surface-2':     '#FAF7F2',   // Card phụ / hover light
        'surface-3':     '#EDE8DC',   // Hover, selected row
        border:          '#DDD8CB',   // Border mặc định (warm gray)
        'border-strong': '#3D6B4A',   // Border nổi bật = brand-border

        // ── Sidebar (luôn dark) ─────────────────────────────────────
        'sidebar-bg':    '#0D2B1A',   // = brand-dark
        'sidebar-hover': '#1A3D28',
        'sidebar-active':'#1E4A30',
        'sidebar-border':'#1E4A30',

        // ── Typography ─────────────────────────────────────────────
        'text-primary':  '#0D2B1A',   // = brand-dark, đọc trên cream
        'text-secondary':'#3D6B4A',   // = brand-border
        'text-muted':    '#7A8C7E',   // Xanh-xám mờ
        'text-on-dark':  '#F6F0E4',   // Chữ trên nền dark (sidebar/header)
        'text-on-dark-2':'#A8C4B0',   // Chữ mờ trên nền dark

        // ── Semantic ───────────────────────────────────────────────
        primary:         '#C0390E',   // = brand-accent (CTA)
        'primary-dark':  '#A0300B',
        'primary-light': '#E85A2A',
        success:         '#2D7A4F',
        'success-light': '#EAF5EF',
        danger:          '#DC2626',
        'danger-light':  '#FEF2F2',
        warning:         '#88860B',   // = brand-olive
        'warning-light': '#FAFADB',
        info:            '#1D6FA4',
        'info-light':    '#EFF6FF',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      boxShadow: {
        card:       '0 1px 3px rgba(13,43,26,0.08), 0 1px 2px rgba(13,43,26,0.05)',
        'card-md':  '0 4px 12px rgba(13,43,26,0.10)',
        'card-lg':  '0 8px 24px rgba(13,43,26,0.12)',
        'sidebar':  '2px 0 12px rgba(0,0,0,0.15)',
        'btn':      '0 1px 3px rgba(192,57,14,0.25)',
        'btn-hover':'0 4px 12px rgba(192,57,14,0.30)',
        'inner':    'inset 0 1px 3px rgba(0,0,0,0.06)',
      },

      animation: {
        'fade-in':   'fadeIn 0.2s ease-in-out',
        'slide-in':  'slideIn 0.2s ease-out',
        'slide-up':  'slideUp 0.25s ease-out',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideIn: { '0%': { transform: 'translateX(-8px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(8px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}
export default config
