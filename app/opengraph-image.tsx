import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '24 AI Agent for Business — DungHoang.com'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0D2B1A 0%, #1a4a2e 50%, #0D2B1A 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern dots */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: 'radial-gradient(circle, #F6F0E4 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            display: 'flex',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: '#C0390E',
            display: 'flex',
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: '#F6F0E4',
            marginBottom: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <span
            style={{
              fontSize: '36px',
              fontWeight: 900,
              color: '#0D2B1A',
              letterSpacing: '-1px',
            }}
          >
            DH
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: '#F6F0E4',
              lineHeight: 1.1,
              letterSpacing: '-2px',
            }}
          >
            24 AI Agent
          </span>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#88860B',
              lineHeight: 1.1,
            }}
          >
            for Business
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '22px',
            color: '#C8D5C9',
            marginTop: '24px',
            maxWidth: '700px',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Mỗi skill thay 1 nhân sự. Cả bộ thay cả đội.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '40px',
          }}
        >
          {[
            { num: '24', label: 'AI Agent' },
            { num: '600+', label: 'Học viên' },
            { num: '14 ngày', label: 'Bảo hành' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#F6F0E4' }}>
                {s.num}
              </span>
              <span style={{ fontSize: '14px', color: '#7A8C7E' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '16px', color: '#7A8C7E' }}>dunghoang.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
