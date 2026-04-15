const embeddedFallbackImage = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#edf3e8"/>
        <stop offset="100%" stop-color="#dfeadb"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#bg)"/>
    <circle cx="320" cy="260" r="120" fill="#c4d8c0" opacity="0.45"/>
    <circle cx="900" cy="560" r="150" fill="#c4d8c0" opacity="0.35"/>
    <text x="50%" y="50%" text-anchor="middle" fill="#3f5c47" font-size="48" font-family="Arial, sans-serif">
      Wedding Photo
    </text>
    <text x="50%" y="57%" text-anchor="middle" fill="#5a7a62" font-size="28" font-family="Arial, sans-serif">
      Image unavailable
    </text>
  </svg>`,
)}`

const embeddedFallbackQr = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#eef5e9"/>
    <rect x="90" y="90" width="420" height="420" rx="20" fill="#dce8d5" />
    <path d="M150 150h90v90h-90zM360 150h90v90h-90zM150 360h90v90h-90z" fill="#3c5a43"/>
    <path d="M285 285h45v45h-45zM345 285h45v45h-45zM285 345h45v45h-45zM405 345h45v45h-45z" fill="#48684f"/>
    <text x="50%" y="540" text-anchor="middle" fill="#3b5842" font-size="28" font-family="Arial, sans-serif">
      QR unavailable
    </text>
  </svg>`,
)}`

export function applyFallbackImage(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = embeddedFallbackImage
}

export function applyFallbackQr(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = embeddedFallbackQr
}
