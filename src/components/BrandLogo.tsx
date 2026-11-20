export function BrandLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="prismBg" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#070916" />
          <stop offset="100%" stopColor="#12142B" />
        </linearGradient>
        {/* Vivid Adobe-style saturated pigments */}
        <linearGradient id="prismLeft" x1="8" y1="6" x2="18" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB800" />
          <stop offset="100%" stopColor="#FF3D00" />
        </linearGradient>
        <linearGradient id="prismRight" x1="18" y1="6" x2="29" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C2FF" />
          <stop offset="100%" stopColor="#0055FF" />
        </linearGradient>
        <linearGradient id="prismBase" x1="7" y1="24" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF2E93" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Deep obsidian-indigo rounded square like Creative Cloud icons */}
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="9"
        fill="url(#prismBg)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
      />

      {/* Left vivid orange-amber facet */}
      <path d="M18 6L7 26.5L18 21.8V6Z" fill="url(#prismLeft)" />

      {/* Right vivid electric cyan-blue facet */}
      <path d="M18 6L29 26.5L18 21.8V6Z" fill="url(#prismRight)" />

      {/* Bottom vivid magenta-violet facet */}
      <path d="M7 26.5L18 21.8L29 26.5L18 30L7 26.5Z" fill="url(#prismBase)" />

      {/* Crisp bright crystal edges */}
      <path
        d="M18 6V21.8M18 21.8L7 26.5M18 21.8L29 26.5"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="0.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
