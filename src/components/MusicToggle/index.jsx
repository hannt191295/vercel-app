export default function MusicToggle({ isPlaying, onToggle, title }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={title}
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d8e0d3] bg-white/95 shadow-[0_10px_28px_rgba(44,62,46,0.24)] transition hover:scale-105 md:bottom-6 md:right-6 md:h-16 md:w-16"
      aria-label={isPlaying ? 'Tắt nhạc nền' : 'Phát nhạc nền'}
    >
      <span
        className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-[#3f5d45] text-white ${
          isPlaying ? 'animate-spin' : ''
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M15 3v9.55A4 4 0 1 0 17 16V7h3V3h-5z" />
        </svg>
        {isPlaying && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-[#3f5d45]/75">
            <span className="h-3 w-0.5 rounded bg-white" />
            <span className="ml-1.5 h-3 w-0.5 rounded bg-white" />
          </span>
        )}
      </span>
    </button>
  )
}
