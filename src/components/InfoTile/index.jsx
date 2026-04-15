import { designTokens } from '../../config/theme'

export default function InfoTile({ title, value }) {
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
