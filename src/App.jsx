import { useEffect, useRef, useState } from 'react'

const RSVP_STORAGE_KEY = 'wedding-rsvp-list'

const invite = {
  bride: 'Thị Hân',
  groom: 'Văn Hào',
  groomFamilyTitle: 'Nhà trai',
  groomParents: ['Ông Lê Văn A', 'Bà Lê Thị B'],
  brideFamilyTitle: 'Nhà gái',
  brideParents: ['Ông Phạm Văn C', 'Bà Phạm Thị D'],
  date: '22/08/2025',
  dateFull: 'Thứ Sáu, ngày 22 tháng 08 năm 2025',
  dateCompact: '22 . 08 . 2025',
  lunarDate: '(Tức ngày 28 tháng 06 năm Ất Tỵ)',
  rsvpDeadline: '15/08/2025',
  time: '17:00',
  venue: 'Gia đình Nhà Trai',
  ceremonyVenueLabel: 'Tại gia đình Nhà Trai',
  address: '123 Đường Trần Phú, Quận Ba Đình, Hà Nội',
  dressCode: 'Garden Chic - Pastel tones',
  hashtag: '#MaiQuanForever',
  message:
    'Chúng mình rất hạnh phúc khi được chia sẻ khoảnh khắc trọng đại này cùng gia đình và những người bạn thân yêu.',
  heroImage:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80',
  coupleImage:
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
  groomProfile: {
    name: 'Văn Hào',
    role: 'Chú rể',
    image:
      'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1000&q=80',
  },
  brideProfile: {
    name: 'Thị Hân',
    role: 'Cô dâu',
    image:
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1000&q=80',
  },
  gallery: [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1000&q=80',
  ],
  bank: {
    accountName: 'NGUYEN MINH QUAN',
    accountNumber: '0123 456 789',
    bankName: 'Vietcombank - CN TP.HCM',
    transferNote: 'Mung cuoi Mai Quan',
    qrImage:
      'https://api.qrserver.com/v1/create-qr-code/?size=520x520&data=VCB%20-%200123456789%20-%20NGUYEN%20MINH%20QUAN%20-%20Mung%20cuoi%20Mai%20Quan',
  },
  music: {
    title: 'Wedding Background Music',
    url: '/audio/dream-wedding.mp3',
  },
}

const palette = {
  shell: 'linear-gradient(170deg, #eef4eb, #f8fbf5)',
  card: '#fcfffa',
  stroke: '#bfd0b8',
  title: '#2f4836',
  text: '#4e6254',
  accent: '#7f9f81',
  soft: 'rgba(127, 159, 129, 0.18)',
}

const designTokens = {
  typography: {
    display: '"Cormorant Garamond", serif',
    script: '"Great Vibes", cursive',
    body: '"Cormorant Garamond", serif',
    ui: '"Inter", "Be Vietnam Pro", system-ui, sans-serif',
  },
}

const inviteTypography = {
  primary: '#2b3830',
  muted: '#7f9083',
  accent: '#86a58a',
  label: '#7b9a7e',
}

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

const defaultRsvpForm = {
  name: '',
  attendance: '',
  guestOf: '',
  guests: '1',
  message: '',
}

const attendanceLabel = {
  attending: 'Sẽ tham dự',
  declining: 'Rất tiếc không tham dự',
}

function loadSavedRsvps() {
  if (typeof window === 'undefined') return []

  try {
    const rawValue = window.localStorage.getItem(RSVP_STORAGE_KEY)
    if (!rawValue) return []
    const parsed = JSON.parse(rawValue)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function applyFallbackImage(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = embeddedFallbackImage
}

function applyFallbackQr(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = embeddedFallbackQr
}

function App() {
  const audioRef = useRef(null)
  const [rsvpForm, setRsvpForm] = useState(defaultRsvpForm)
  const [rsvpErrors, setRsvpErrors] = useState({})
  const [rsvpList, setRsvpList] = useState(() => loadSavedRsvps())
  const [latestRsvp, setLatestRsvp] = useState(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvpList))
  }, [rsvpList])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.65

    const syncMusicState = () => setIsMusicPlaying(!audio.paused)
    audio.addEventListener('play', syncMusicState)
    audio.addEventListener('pause', syncMusicState)

    const onFirstInteraction = async () => {
      try {
        await audio.play()
      } catch {
        // Browser may still block playback until another interaction.
      }
    }

    const addInteractionListeners = () => {
      window.addEventListener('pointerdown', onFirstInteraction, { once: true })
      window.addEventListener('keydown', onFirstInteraction, { once: true })
      window.addEventListener('touchstart', onFirstInteraction, { once: true })
    }

    const removeInteractionListeners = () => {
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
    }

    const tryAutoPlay = async () => {
      try {
        await audio.play()
      } catch {
        addInteractionListeners()
      }
    }

    tryAutoPlay()

    return () => {
      audio.removeEventListener('play', syncMusicState)
      audio.removeEventListener('pause', syncMusicState)
      removeInteractionListeners()
    }
  }, [])

  useEffect(() => {
    let frameId = 0
    let lastTime = performance.now()
    let isRunning = true

    const stopAutoScroll = () => {
      isRunning = false
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('wheel', stopAutoScroll)
      window.removeEventListener('touchmove', stopAutoScroll)
      window.removeEventListener('keydown', stopAutoScroll)
    }

    const step = (now) => {
      if (!isRunning) return

      const documentHeight = document.documentElement.scrollHeight
      const viewportBottom = window.scrollY + window.innerHeight

      if (viewportBottom >= documentHeight - 2) {
        stopAutoScroll()
        return
      }

      const delta = now - lastTime
      lastTime = now
      const pixels = Math.max(0.35, (delta / 16) * 0.55)
      window.scrollBy(0, pixels)
      frameId = window.requestAnimationFrame(step)
    }

    window.addEventListener('wheel', stopAutoScroll, { passive: true })
    window.addEventListener('touchmove', stopAutoScroll, { passive: true })
    window.addEventListener('keydown', stopAutoScroll)
    frameId = window.requestAnimationFrame(step)

    return () => {
      stopAutoScroll()
    }
  }, [])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMusicPlaying) {
      audio.pause()
      setIsMusicPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsMusicPlaying(true)
    } catch {
      setIsMusicPlaying(false)
    }
  }

  const onRsvpChange = (field, value) => {
    setRsvpForm((prev) => {
      if (field !== 'attendance') return { ...prev, [field]: value }
      if (value === 'declining') {
        return { ...prev, attendance: value, guestOf: '', guests: '0' }
      }
      return {
        ...prev,
        attendance: value,
        guests: prev.guests === '0' ? '1' : prev.guests,
      }
    })
  }

  const submitRsvp = (event) => {
    event.preventDefault()

    const nextErrors = {}
    const normalizedName = rsvpForm.name.trim()
    const guestsNumber = Number.parseInt(rsvpForm.guests, 10)

    if (!normalizedName) nextErrors.name = 'Vui lòng nhập họ tên.'
    if (!rsvpForm.attendance) nextErrors.attendance = 'Vui lòng chọn trạng thái tham dự.'

    if (rsvpForm.attendance !== 'declining') {
      if (!rsvpForm.guestOf) nextErrors.guestOf = 'Vui lòng chọn bạn là khách của ai.'
      if (Number.isNaN(guestsNumber) || guestsNumber < 1 || guestsNumber > 10) {
        nextErrors.guests = 'Số lượng khách từ 1 đến 10.'
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setRsvpErrors(nextErrors)
      return
    }

    const payload = {
      id: crypto.randomUUID(),
      name: normalizedName,
      attendance: rsvpForm.attendance,
      guestOf: rsvpForm.attendance === 'declining' ? '' : rsvpForm.guestOf,
      guests: rsvpForm.attendance === 'declining' ? 0 : guestsNumber,
      message: rsvpForm.message.trim(),
      submittedAt: new Date().toISOString(),
    }

    setRsvpList((prev) => [payload, ...prev].slice(0, 100))
    setLatestRsvp(payload)
    setRsvpErrors({})
    setRsvpForm(defaultRsvpForm)
  }

  return (
    <main
      className="min-h-screen bg-[#eef4ea] text-slate-800"
      style={{ fontFamily: designTokens.typography.body }}
    >
      <section className="relative h-screen min-h-[520px] w-full overflow-hidden md:min-h-[620px]">
        <img
          src={invite.heroImage}
          alt="Wedding cover"
          className="h-full w-full object-cover"
          onError={applyFallbackImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
          <div>
            <p
              className="text-xs uppercase tracking-[0.48em] md:text-sm"
              style={{ fontFamily: designTokens.typography.ui }}
            >
              Save The Date
            </p>
            <h1 className="mt-5 text-5xl md:text-8xl" style={{ fontFamily: designTokens.typography.script }}>
              {invite.groom} & {invite.bride}
            </h1>
            <p
              className="mt-5 text-sm uppercase tracking-[0.24em] md:text-base"
              style={{ fontFamily: designTokens.typography.ui }}
            >
              Wedding Invitation
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4ea] px-5 py-11 md:px-10 md:py-14">
        <div className="mx-auto max-w-[56rem] rounded-[28px] border border-[#d5e1cf] bg-[#f5faf2] px-5 py-9 text-center shadow-[0_10px_28px_rgba(74,98,77,0.1)] md:px-11 md:py-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <div>
              <p style={{ color: inviteTypography.label }} className="text-xs font-medium uppercase tracking-[0.28em]">
                {invite.groomFamilyTitle}
              </p>
              <p
                style={{ fontFamily: designTokens.typography.body, color: inviteTypography.primary }}
                className="mt-3 text-[1.72rem] leading-[1.35] font-medium md:text-[1.9rem]"
              >
                {invite.groomParents[0]}
                <br />
                {invite.groomParents[1]}
              </p>
            </div>
            <div>
              <p style={{ color: inviteTypography.label }} className="text-xs font-medium uppercase tracking-[0.28em]">
                {invite.brideFamilyTitle}
              </p>
              <p
                style={{ fontFamily: designTokens.typography.body, color: inviteTypography.primary }}
                className="mt-3 text-[1.72rem] leading-[1.35] font-medium md:text-[1.9rem]"
              >
                {invite.brideParents[0]}
                <br />
                {invite.brideParents[1]}
              </p>
            </div>
          </div>

          <h2
            style={{ fontFamily: designTokens.typography.display, color: inviteTypography.primary }}
            className="mt-9 text-[2.3rem] font-semibold uppercase leading-[1.1] tracking-[0.01em] md:text-[2.9rem]"
          >
            Trân trọng kính mời
          </h2>
          <p
            style={{ fontFamily: designTokens.typography.body, color: inviteTypography.primary }}
            className="mt-3 text-[1.72rem] font-semibold md:text-[1.95rem]"
          >
            Bạn cùng gia đình
          </p>
          <p
            style={{ fontFamily: designTokens.typography.body, color: inviteTypography.muted }}
            className="mt-2 text-[1.32rem] italic md:text-[1.5rem]"
          >
            (Tới dự Lễ Thành Hôn của hai con chúng tôi)
          </p>

          <p
            style={{ fontFamily: designTokens.typography.display, color: inviteTypography.accent }}
            className="mt-7 text-[2.7rem] font-semibold leading-[1.1] tracking-[0.01em] md:text-[3.35rem]"
          >
            {invite.groom} ❤ {invite.bride}
          </p>

          <p
            style={{ fontFamily: designTokens.typography.body, color: inviteTypography.primary }}
            className="mt-6 text-[1.52rem] md:text-[1.8rem]"
          >
            Tổ chức vào lúc {invite.time}
          </p>
          <p
            style={{ fontFamily: designTokens.typography.body, color: inviteTypography.primary }}
            className="mt-2 text-[1.66rem] font-semibold md:text-[1.95rem]"
          >
            {invite.dateFull}
          </p>
          <p
            style={{ fontFamily: designTokens.typography.body, color: inviteTypography.muted }}
            className="mt-2 text-[1.2rem] italic md:text-[1.32rem]"
          >
            {invite.lunarDate}
          </p>

          <p
            style={{ fontFamily: designTokens.typography.body, color: inviteTypography.primary }}
            className="mx-auto mt-7 max-w-3xl text-[1.48rem] leading-[1.45] md:text-[1.75rem]"
          >
            {invite.ceremonyVenueLabel}: {invite.address}
          </p>

          <p
            style={{ fontFamily: designTokens.typography.body, color: inviteTypography.label }}
            className="mx-auto mt-6 max-w-2xl text-[1.28rem] italic leading-[1.5] md:text-[1.45rem]"
          >
            Sự hiện diện của Quý khách là niềm vinh hạnh của gia đình chúng tôi!
          </p>
        </div>
      </section>

      <section className="bg-[#eef4ea] px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[56rem] rounded-[28px] border border-[#d4e0cf] bg-[#f5faf2] p-6 shadow-[0_10px_28px_rgba(74,98,77,0.1)] md:p-10">
          <div className="text-center">
            <p
              className="text-[10px] uppercase tracking-[0.5em]"
              style={{ color: inviteTypography.label, fontFamily: designTokens.typography.ui }}
            >
              The Couple
            </p>
            <h3
              className="mt-3 text-[2rem] font-semibold md:text-[2.5rem]"
              style={{ color: inviteTypography.primary, fontFamily: designTokens.typography.display }}
            >
              Cô Dâu & Chú Rể
            </h3>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <CoupleCard
              image={invite.groomProfile.image}
              name={invite.groomProfile.name}
              role={invite.groomProfile.role}
            />
            <CoupleCard
              image={invite.brideProfile.image}
              name={invite.brideProfile.name}
              role={invite.brideProfile.role}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#eef4ea] px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <InfoTile title="Ngày cưới" value={invite.date} />
          <InfoTile title="Thời gian" value={invite.time} />
          <InfoTile title="Địa điểm" value={invite.venue} />
        </div>
      </section>

      <section className="bg-[#eef4ea] px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p
              className="text-[10px] uppercase tracking-[0.5em]"
              style={{ color: inviteTypography.label, fontFamily: designTokens.typography.ui }}
            >
              Gallery
            </p>
            <h3
              className="mt-3 text-[2rem] font-semibold md:text-[2.5rem]"
              style={{ color: inviteTypography.primary, fontFamily: designTokens.typography.display }}
            >
              Khoảnh Khắc
            </h3>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {invite.gallery.map((image, index) => (
              <div
                key={image}
                className="overflow-hidden rounded-[24px] border border-white shadow-[0_12px_28px_rgba(56,72,58,0.16)]"
              >
                <img
                  src={image}
                  alt={`Wedding gallery ${index + 1}`}
                  className="h-72 w-full object-cover md:h-80"
                  onError={applyFallbackImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef4ea] px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-[#d5e1cf] bg-[#f5faf2] p-6 shadow-[0_10px_28px_rgba(74,98,77,0.1)] md:p-10">
          <div className="text-center">
            <p
              style={{ color: '#7f8681', fontFamily: designTokens.typography.ui }}
              className="text-[11px] uppercase tracking-[0.5em]"
            >
              RSVP
            </p>
            <h3
              style={{ color: '#1f2321', fontFamily: designTokens.typography.display }}
              className="mt-2 text-[2.2rem] font-semibold md:text-[2.9rem]"
            >
              Xác Nhận Tham Dự
            </h3>
            <p className="mt-2 text-sm text-[#7d8280]" style={{ fontFamily: designTokens.typography.ui }}>
              Xin vui lòng xác nhận trước ngày {invite.rsvpDeadline}
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={submitRsvp}>
            <label className="block text-sm" style={{ fontFamily: designTokens.typography.ui }}>
              <span className="mb-2 block font-medium text-[#262b28]">Họ và tên *</span>
              <input
                value={rsvpForm.name}
                onChange={(event) => onRsvpChange('name', event.target.value)}
                className="w-full rounded-xl border border-[#e3e4e3] bg-white px-4 py-3 text-base outline-none focus:border-[#9db49e] focus:ring-2 focus:ring-[#9db49e]/25"
                placeholder="Nhập họ tên của bạn"
              />
              {rsvpErrors.name && <span className="mt-1 block text-xs text-red-600">{rsvpErrors.name}</span>}
            </label>

            <div className="text-sm" style={{ fontFamily: designTokens.typography.ui }}>
              <p className="mb-2 font-medium text-[#262b28]">Bạn sẽ tham dự? *</p>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e3e4e3] bg-white px-4 py-3">
                  <input
                    type="radio"
                    name="attendance"
                    value="attending"
                    checked={rsvpForm.attendance === 'attending'}
                    onChange={(event) => onRsvpChange('attendance', event.target.value)}
                    className="h-4 w-4 accent-[#3f5d45]"
                  />
                  <span>Có, tôi sẽ đến</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e3e4e3] bg-white px-4 py-3">
                  <input
                    type="radio"
                    name="attendance"
                    value="declining"
                    checked={rsvpForm.attendance === 'declining'}
                    onChange={(event) => onRsvpChange('attendance', event.target.value)}
                    className="h-4 w-4 accent-[#3f5d45]"
                  />
                  <span>Rất tiếc, tôi không thể tham dự</span>
                </label>
              </div>
              {rsvpErrors.attendance && (
                <span className="mt-1 block text-xs text-red-600">{rsvpErrors.attendance}</span>
              )}
            </div>

            {rsvpForm.attendance !== 'declining' && (
              <>
                <div className="text-sm" style={{ fontFamily: designTokens.typography.ui }}>
                  <p className="mb-2 font-medium text-[#262b28]">Bạn là khách của? *</p>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#e3e4e3] bg-white px-4 py-3">
                      <input
                        type="radio"
                        name="guestOf"
                        value="bride"
                        checked={rsvpForm.guestOf === 'bride'}
                        onChange={(event) => onRsvpChange('guestOf', event.target.value)}
                        className="h-4 w-4 accent-[#3f5d45]"
                      />
                      <span>Cô dâu</span>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#e3e4e3] bg-white px-4 py-3">
                      <input
                        type="radio"
                        name="guestOf"
                        value="groom"
                        checked={rsvpForm.guestOf === 'groom'}
                        onChange={(event) => onRsvpChange('guestOf', event.target.value)}
                        className="h-4 w-4 accent-[#3f5d45]"
                      />
                      <span>Chú rể</span>
                    </label>
                  </div>
                  {rsvpErrors.guestOf && (
                    <span className="mt-1 block text-xs text-red-600">{rsvpErrors.guestOf}</span>
                  )}
                </div>

                <label className="block text-sm" style={{ fontFamily: designTokens.typography.ui }}>
                  <span className="mb-2 block font-medium text-[#262b28]">Số người đi cùng (bao gồm bạn)</span>
                  <select
                    value={rsvpForm.guests}
                    onChange={(event) => onRsvpChange('guests', event.target.value)}
                    className="w-full rounded-xl border border-[#e3e4e3] bg-white px-4 py-3 text-base outline-none focus:border-[#9db49e] focus:ring-2 focus:ring-[#9db49e]/25"
                  >
                    {Array.from({ length: 10 }, (_, index) => {
                      const value = String(index + 1)
                      return (
                        <option key={value} value={value}>
                          {value} người
                        </option>
                      )
                    })}
                  </select>
                  {rsvpErrors.guests && (
                    <span className="mt-1 block text-xs text-red-600">{rsvpErrors.guests}</span>
                  )}
                </label>
              </>
            )}

            <label className="block text-sm" style={{ fontFamily: designTokens.typography.ui }}>
              <span className="mb-2 block font-medium text-[#262b28]">Lời nhắn</span>
              <textarea
                rows={4}
                value={rsvpForm.message}
                onChange={(event) => onRsvpChange('message', event.target.value)}
                className="w-full resize-y rounded-xl border border-[#e3e4e3] bg-white px-4 py-3 text-base outline-none focus:border-[#9db49e] focus:ring-2 focus:ring-[#9db49e]/25"
                placeholder="Gửi lời chúc đến cô dâu chú rể..."
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-[#3f5d45] px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-[#334d39]"
              style={{ fontFamily: designTokens.typography.ui }}
            >
              Gửi xác nhận
            </button>

            {latestRsvp && (
              <p
                className="rounded-xl bg-[#2f4836] px-3 py-2 text-center text-sm text-white"
                style={{ fontFamily: designTokens.typography.ui }}
              >
                Cảm ơn {latestRsvp.name}. Trạng thái của bạn: {attendanceLabel[latestRsvp.attendance]}.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="bg-[#eef4ea] px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#d5e1cf] bg-[#f5faf2] px-6 py-10 text-center shadow-[0_10px_28px_rgba(74,98,77,0.1)] md:px-12">
          <p
            className="text-[11px] uppercase tracking-[0.48em]"
            style={{ color: inviteTypography.muted, fontFamily: designTokens.typography.ui }}
          >
            Gift
          </p>
          <h3
            className="mt-2 text-[2.4rem] font-semibold md:text-[3rem]"
            style={{ color: inviteTypography.primary, fontFamily: designTokens.typography.display }}
          >
            Mừng Cưới
          </h3>

          <div className="mx-auto mt-8 max-w-md rounded-[20px] border border-[#dfdfdf] bg-white p-6">
            <img
              src={invite.bank.qrImage}
              alt="QR code mừng cưới"
              className="mx-auto aspect-square w-52 object-cover md:w-56"
              onError={applyFallbackQr}
            />
            <p
              className="mt-4 text-[2rem] leading-none"
              style={{ color: inviteTypography.primary, fontFamily: designTokens.typography.display }}
            >
              {invite.bank.accountName}
            </p>
            <p
              className="mt-2 text-xs uppercase tracking-[0.3em]"
              style={{ color: inviteTypography.muted, fontFamily: designTokens.typography.ui }}
            >
              {invite.bank.bankName}
            </p>
            <p
              className="mt-3 text-[1.9rem] font-semibold tracking-[0.06em]"
              style={{ color: '#1f2321', fontFamily: designTokens.typography.ui }}
            >
              {invite.bank.accountNumber}
            </p>
          </div>

          <div className="mt-12">
            <p className="text-2xl md:text-5xl" style={{ color: inviteTypography.accent }}>
              •
            </p>
            <p
              className="mt-5 text-[2.2rem] md:text-[2.8rem]"
              style={{ color: inviteTypography.primary, fontFamily: designTokens.typography.display }}
            >
              {invite.groom} & {invite.bride}
            </p>
            <p
              className="mt-2 text-xs uppercase tracking-[0.5em]"
              style={{ color: inviteTypography.muted, fontFamily: designTokens.typography.ui }}
            >
              {invite.dateCompact}
            </p>
          </div>
        </div>
      </section>

      <audio ref={audioRef} src={invite.music.url} loop preload="none" />

      <button
        type="button"
        onClick={toggleMusic}
        title={invite.music.title}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d8e0d3] bg-white shadow-[0_10px_28px_rgba(44,62,46,0.24)] transition hover:scale-105"
        aria-label={isMusicPlaying ? 'Tắt nhạc nền' : 'Phát nhạc nền'}
      >
        <span
          className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-[#3f5d45] text-white ${
            isMusicPlaying ? 'animate-spin' : ''
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M15 3v9.55A4 4 0 1 0 17 16V7h3V3h-5z" />
          </svg>
          {isMusicPlaying ? (
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-[#3f5d45]/75">
              <span className="h-3 w-0.5 rounded bg-white" />
              <span className="ml-1.5 h-3 w-0.5 rounded bg-white" />
            </span>
          ) : null}
        </span>
      </button>
    </main>
  )
}

function InfoTile({ title, value }) {
  return (
    <div className="rounded-2xl border border-current/15 bg-white/85 p-5 text-center shadow-[0_8px_25px_rgba(65,83,67,0.09)]">
      <p className="text-[11px] uppercase tracking-[0.24em]" style={{ fontFamily: designTokens.typography.ui }}>
        {title}
      </p>
      <p
        style={{ fontFamily: designTokens.typography.display }}
        className="mt-2 text-2xl font-semibold"
      >
        {value}
      </p>
    </div>
  )
}

function CoupleCard({ image, name, role }) {
  return (
    <article className="text-center">
      <div className="overflow-hidden rounded-[18px] border border-[#dbe6d7] bg-white p-2 shadow-[0_8px_24px_rgba(67,89,70,0.12)]">
        <img
          src={image}
          alt={`${role} ${name}`}
          className="aspect-[3/4] w-full rounded-[14px] object-cover"
          onError={applyFallbackImage}
        />
      </div>
      <p
        className="mt-4 text-[2rem] leading-none md:text-[2.2rem]"
        style={{ color: inviteTypography.primary, fontFamily: designTokens.typography.display }}
      >
        {name}
      </p>
      <p
        className="mt-2 text-[11px] uppercase tracking-[0.35em]"
        style={{ color: inviteTypography.muted, fontFamily: designTokens.typography.ui }}
      >
        {role}
      </p>
    </article>
  )
}

export default App
