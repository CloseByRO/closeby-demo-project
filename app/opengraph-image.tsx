import { ImageResponse } from 'next/og'
import clientConfig from '@/config/client'

export const runtime = 'edge'
export const alt = clientConfig.seo.metaTitle
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const { shortName, address, aggregateRating, content } = clientConfig

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#faf8f4',
          padding: '64px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top: location badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#e4eee8',
            color: '#4d7a5e',
            padding: '8px 20px',
            borderRadius: '999px',
            fontSize: '16px',
            fontFamily: 'system-ui, sans-serif',
            width: 'fit-content',
          }}
        >
          📍 {address.sector} · {address.city} · Disponibil online
        </div>

        {/* Middle: main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '20px', color: '#6b7868', fontFamily: 'system-ui, sans-serif' }}>
            {shortName}
          </div>
          <div style={{ fontSize: '72px', color: '#1a2018', lineHeight: 1.1, fontWeight: 500 }}>
            {content.heroTitle}
            {'\n'}
            <span style={{ color: '#4d7a5e', fontStyle: 'italic' }}>
              {content.heroTitleAccent}
            </span>
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#6b7868',
              fontFamily: 'system-ui, sans-serif',
              maxWidth: '700px',
              lineHeight: 1.5,
            }}
          >
            {content.heroSubtitle}
          </div>
        </div>

        {/* Bottom: trust signals */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '18px',
                fontFamily: 'system-ui, sans-serif',
                color: '#3d4a3a',
              }}
            >
              <span style={{ color: '#c4865a' }}>★★★★★</span>
              <strong>{aggregateRating.ratingValue}</strong>
              <span style={{ color: '#6b7868' }}>· {aggregateRating.reviewCount} recenzii Google</span>
            </div>
          </div>
          <div
            style={{
              background: '#4d7a5e',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '999px',
              fontSize: '18px',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 500,
            }}
          >
            Prima ședință gratuită →
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
