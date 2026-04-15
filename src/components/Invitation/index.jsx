import { invitationTypography, inviteTypography } from '../../config/theme'
import { invite } from '../../data/invite'

export default function Invitation() {
  return (
    <section className="bg-[#eef4ea] px-5 py-9 md:px-10 md:py-12">
      <div className="mx-auto max-w-[56rem] rounded-[28px] border border-[#d5e1cf] bg-[#f5faf2] px-4 py-6 text-center shadow-[0_10px_28px_rgba(74,98,77,0.1)] md:px-10 md:py-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <p style={{ color: inviteTypography.label }} className="text-xs font-medium uppercase tracking-[0.2em]">
              {invite.groomFamilyTitle}
            </p>
            <p
              style={{ fontFamily: invitationTypography.hard, color: inviteTypography.primary }}
              className="mt-2 text-[1.2rem] leading-[1.4] font-medium md:text-[1.6rem]"
            >
              {invite.groomParents[0]}
              <br />
              {invite.groomParents[1]}
            </p>
          </div>
          <div>
            <p style={{ color: inviteTypography.label }} className="text-xs font-medium uppercase tracking-[0.2em]">
              {invite.brideFamilyTitle}
            </p>
            <p
              style={{ fontFamily: invitationTypography.hard, color: inviteTypography.primary }}
              className="mt-2 text-[1.2rem] leading-[1.4] font-medium md:text-[1.6rem]"
            >
              {invite.brideParents[0]}
              <br />
              {invite.brideParents[1]}
            </p>
          </div>
        </div>

        <h2
          style={{ fontFamily: invitationTypography.hard, color: inviteTypography.primary }}
          className="mt-7 text-[1.55rem] font-semibold uppercase leading-[1.12] tracking-[0.02em] md:text-[2.2rem]"
        >
          Trân trọng kính mời
        </h2>
        <p
          style={{ fontFamily: invitationTypography.hard, color: inviteTypography.primary }}
          className="mt-2 text-[1.25rem] font-semibold md:text-[1.6rem]"
        >
          Bạn cùng gia đình
        </p>
        <p
          style={{ fontFamily: invitationTypography.hard, color: inviteTypography.muted }}
          className="mt-2 text-[0.95rem] italic md:text-[1.2rem]"
        >
          (Tới dự Lễ Thành Hôn của hai con chúng tôi)
        </p>

        <p
          style={{ fontFamily: invitationTypography.soft, color: inviteTypography.accent }}
          className="mt-5 text-[2.25rem] leading-[1.02] tracking-[0.01em] md:text-[3rem]"
        >
          <span className="block lg:hidden">
            <span className="block whitespace-nowrap">{invite.groom}</span>
            <span className="block leading-[0.9]">&amp;</span>
            <span className="block whitespace-nowrap">{invite.bride}</span>
          </span>
          <span className="hidden lg:block">
            {invite.groom} &amp; {invite.bride}
          </span>
        </p>

        <p
          style={{ fontFamily: invitationTypography.hard, color: inviteTypography.primary }}
          className="mt-4 text-[1.1rem] md:text-[1.4rem]"
        >
          Tổ chức vào lúc {invite.time}
        </p>
        <p
          style={{ fontFamily: invitationTypography.hard, color: inviteTypography.primary }}
          className="mt-2 text-[1.2rem] font-semibold md:text-[1.56rem]"
        >
          {invite.dateFull}
        </p>
        <p
          style={{ fontFamily: invitationTypography.hard, color: inviteTypography.muted }}
          className="mt-2 text-[0.9rem] italic md:text-[1.1rem]"
        >
          {invite.lunarDate}
        </p>

        <p
          style={{ fontFamily: invitationTypography.hard, color: inviteTypography.primary }}
          className="mx-auto mt-5 max-w-3xl text-[1.05rem] leading-[1.45] md:text-[1.38rem]"
        >
          {invite.ceremonyVenueLabel}: {invite.address}
        </p>

        <p
          style={{ fontFamily: invitationTypography.soft, color: inviteTypography.label }}
          className="mx-auto mt-4 max-w-2xl text-[1.2rem] italic leading-[1.4] md:text-[1.45rem]"
        >
          Sự hiện diện của Quý khách là niềm vinh hạnh của gia đình chúng tôi!
        </p>
      </div>
    </section>
  )
}
