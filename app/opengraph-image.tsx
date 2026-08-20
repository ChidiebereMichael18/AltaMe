import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'Altame Logo';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#16140F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Red Accent Bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12px',
            background: '#D63A1A',
          }}
        />

        {/* Clean Large Brand Mask Emblem */}
        <svg
          width="240"
          height="184"
          viewBox="0 0 34 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 10C2 5.58172 5.58172 2 10 2H24C28.4183 2 32 5.58172 32 10V14C32 18.4183 28.4183 22 24 22H21L17 25L13 22H10C5.58172 22 2 18.4183 2 14V10Z"
            fill="#D63A1A"
          />
          <path
            d="M6 10C6 8.34315 7.34315 7 9 7H13C14.6569 7 16 8.34315 16 10V12C16 13.6569 14.6569 15 13 15H9C7.34315 15 6 13.6569 6 12V10Z"
            fill="#16140F"
          />
          <path
            d="M18 10C18 8.34315 19.3431 7 21 7H25C26.6569 7 28 8.34315 28 10V12C28 13.6569 26.6569 15 25 15H21C19.3431 15 18 13.6569 18 12V10Z"
            fill="#16140F"
          />
          <polygon points="8,11 14,9 12,13" fill="#FFFFFF" />
          <polygon points="20,9 26,11 22,13" fill="#FFFFFF" />
        </svg>

        {/* Clean Brand Title */}
        <h1
          style={{
            fontSize: '84px',
            fontWeight: '900',
            color: '#FFFFFF',
            marginTop: '28px',
            marginBottom: '0px',
            letterSpacing: '-0.03em',
            fontFamily: 'serif',
          }}
        >
          altame<span style={{ color: '#D63A1A' }}>.</span>
        </h1>
      </div>
    ),
    {
      ...size,
    }
  );
}
