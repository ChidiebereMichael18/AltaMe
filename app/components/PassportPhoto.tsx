'use client';

interface PassportPhotoProps {
  className?: string;
  gender?: string;
}

export function PassportPhoto({
  className = "w-[76px] h-[96px]",
  gender = "Male",
}: PassportPhotoProps) {
  const isFemale = gender?.toLowerCase() === 'female';

  return (
    <div className={`border-2 border-[#111110] bg-[#ebebeb] overflow-hidden relative shadow-[2px_2px_0px_#111110] ${className}`}>
      <svg
        viewBox="0 0 90 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
      >
        {/* Official Passport Light-Gray Backdrop */}
        <rect width="90" height="115" fill="url(#passportBgClean)" />
        <defs>
          <linearGradient id="passportBgClean" x1="45" y1="0" x2="45" y2="115" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5F5F5" />
            <stop offset="1" stopColor="#D9D9D9" />
          </linearGradient>
        </defs>

        {isFemale ? (
          /* FEMALE PASSPORT SILHOUETTE - CLEAN */
          <g fill="#808791">
            {/* Shoulder-length Hair & Torso Contour */}
            <path d="M8 115C8 92 20 80 45 80C70 80 82 92 82 115H8Z" />
            {/* Neck */}
            <path d="M38 60H52V76H38V60Z" />
            {/* Head oval */}
            <ellipse cx="45" cy="44" rx="15" ry="19" />
            {/* Female Hair Volume - Shoulder length flowing hair */}
            <path d="M26 44C26 27 33 18 45 18C57 18 64 27 64 44C65 56 66 70 60 78C56 68 57 52 57 44C57 30 52 23 45 23C38 23 33 30 33 44C33 52 34 68 30 78C24 70 25 56 26 44Z" />
          </g>
        ) : (
          /* MALE PASSPORT SILHOUETTE - CLEAN (Exact match to uploaded reference image) */
          <g fill="#808791">
            {/* Broad Shoulders & Torso Contour */}
            <path d="M6 115C6 90 18 76 45 76C72 76 84 90 84 115H6Z" />
            {/* Neck */}
            <path d="M36 58H54V74H36V58Z" />
            {/* Head & Ears */}
            <ellipse cx="45" cy="42" rx="16" ry="20" />
            {/* Left Ear */}
            <ellipse cx="28" cy="44" rx="3" ry="5.5" />
            {/* Right Ear */}
            <ellipse cx="62" cy="44" rx="3" ry="5.5" />
            {/* Male Short Textured Hair Contour */}
            <path d="M28 38C28 26 35 17 45 17C55 17 62 26 62 38C62 30 55 20 45 20C35 20 28 30 28 38Z" />
          </g>
        )}
      </svg>
    </div>
  );
}
