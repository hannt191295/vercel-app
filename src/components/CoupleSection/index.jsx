import { designTokens, inviteTypography } from '../../config/theme'
import { invite } from '../../data/invite'
import CoupleCard from '../CoupleCard'
import groomImage from './images/re.jpg'
import brideImage from './images/dau.jpg'

export default function CoupleSection() {
  return (
    <section className="bg-[#eef4ea] px-5 py-10 md:px-10 md:py-12">
      <div className="mx-auto max-w-[56rem] rounded-[28px] border border-[#d4e0cf] bg-[#f5faf2] p-5 shadow-[0_10px_28px_rgba(74,98,77,0.1)] md:p-8">
        <div className="text-center">
          <p
            className="text-[10px] uppercase tracking-[0.5em]"
            style={{ color: inviteTypography.label, fontFamily: designTokens.typography.ui }}
          >
            The Couple
          </p>
          <h3
            className="mt-2 text-[1.7rem] font-semibold md:text-[2.15rem]"
            style={{ color: inviteTypography.primary, fontFamily: designTokens.typography.display }}
          >
            Cô Dâu & Chú Rể
          </h3>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <CoupleCard
            image={brideImage}
            name={invite.brideProfile.name}
            role={invite.brideProfile.role}
          />
          <CoupleCard
            image={groomImage}
            name={invite.groomProfile.name}
            role={invite.groomProfile.role}
          />
        </div>
      </div>
    </section>
  )
}
