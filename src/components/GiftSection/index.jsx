import { designTokens, inviteTypography } from '../../config/theme'
import { invite } from '../../data/invite'
import { applyFallbackQr } from '../../utils/fallback'

export default function GiftSection() {
  return (
    <section className="bg-[#eef4ea] px-5 py-9 md:px-10 md:py-12">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-[#d5e1cf] bg-[#f5faf2] px-5 py-7 text-center shadow-[0_10px_28px_rgba(74,98,77,0.1)] md:px-9">
        <p
          className="text-[11px] uppercase tracking-[0.48em]"
          style={{ color: inviteTypography.muted, fontFamily: designTokens.typography.ui }}
        >
          Gift
        </p>
        <h3
          className="mt-2 text-[1.7rem] font-semibold md:text-[2.2rem]"
          style={{ color: inviteTypography.primary, fontFamily: designTokens.typography.display }}
        >
          Mừng Cưới
        </h3>

        <div className="mx-auto mt-5 max-w-xs rounded-[18px] border border-[#dfdfdf] bg-white p-4 md:max-w-sm">
          <img
            src={invite.bank.qrImage}
            alt="QR code mừng cưới"
            loading="lazy"
            className="mx-auto aspect-square w-36 object-cover md:w-44"
            onError={applyFallbackQr}
          />
          <p
            className="mt-3 text-[1.38rem] font-semibold leading-none tracking-[0.04em] md:text-[1.5rem]"
            style={{ color: inviteTypography.primary, fontFamily: designTokens.typography.ui }}
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
            className="mt-2 text-[1.3rem] font-semibold tracking-[0.04em]"
            style={{ color: '#1f2321', fontFamily: designTokens.typography.ui }}
          >
            {invite.bank.accountNumber}
          </p>
        </div>

        <div className="mt-7">
          <p className="text-lg md:text-3xl" style={{ color: inviteTypography.accent }}>
            •
          </p>
          <p
            className="mt-3 text-[1.6rem] md:text-[2rem]"
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
  )
}
