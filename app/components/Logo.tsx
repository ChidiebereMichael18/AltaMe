'use client';

export function Logo({ className = "h-7" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Sleek Mask Icon with AM Monogram */}
      <svg
        width="34"
        height="26"
        viewBox="0 0 34 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Mask Base Outline - Geometric AM shape */}
        <path
          d="M2 10C2 5.58172 5.58172 2 10 2H24C28.4183 2 32 5.58172 32 10V14C32 18.4183 28.4183 22 24 22H21L17 25L13 22H10C5.58172 22 2 18.4183 2 14V10Z"
          fill="#D63A1A"
        />
        {/* Sleek Eye Cutouts forming AM arches */}
        <path
          d="M6 10C6 8.34315 7.34315 7 9 7H13C14.6569 7 16 8.34315 16 10V12C16 13.6569 14.6569 15 13 15H9C7.34315 15 6 13.6569 6 12V10Z"
          fill="#16140F"
        />
        <path
          d="M18 10C18 8.34315 19.3431 7 21 7H25C26.6569 7 28 8.34315 28 10V12C28 13.6569 26.6569 15 25 15H21C19.3431 15 18 13.6569 18 12V10Z"
          fill="#16140F"
        />
        {/* Inner Eye Slits */}
        <polygon points="8,11 14,9 12,13" fill="#FFFFFF" />
        <polygon points="20,9 26,11 22,13" fill="#FFFFFF" />
      </svg>

      {/* Brand Text */}
      <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
        altame<span className="text-[#d63a1a]">.</span>
      </span>
    </div>
  );
}
