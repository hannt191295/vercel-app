import { designTokens, inviteTypography } from '../../config/theme'
import { applyFallbackImage } from '../../utils/fallback'

export default function CoupleCard({ image, name, role }) {
  return (
    <article className="text-center">
      <div className="overflow-hidden rounded-[18px] border border-[#dbe6d7] bg-white p-2 shadow-[0_8px_24px_rgba(67,89,70,0.12)]">
        <img
          src={image}
          alt={`${role} ${name}`}
          className="aspect-[3/4] w-full rounded-[14px] object-cover object-top"
          onError={applyFallbackImage}
        />
      </div>
      <p
        className="mt-3 text-[1.65rem] leading-none md:text-[1.95rem]"
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
