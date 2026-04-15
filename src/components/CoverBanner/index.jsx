import { designTokens } from '../../config/theme'
import { invite } from '../../data/invite'
import coverImage from './images/bia.jpg'

export default function CoverBanner() {
  return (
    <section className="relative h-screen min-h-[430px] w-full overflow-hidden md:min-h-[560px]">
      <img
        src={coverImage}
        alt="Wedding cover"
        className="h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70" />
      <div className="absolute inset-0 flex items-end justify-center px-6 pb-16 text-center text-white md:pb-20">
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.4em] md:text-sm"
            style={{ fontFamily: designTokens.typography.ui }}
          >
            Save The Date
          </p>
          <h1
            className="mt-4 text-[2.8rem] leading-[1.04] sm:text-5xl md:mt-5 md:text-6xl lg:text-7xl"
            style={{ fontFamily: designTokens.typography.script }}
          >
            <span className="block lg:hidden">
              <span className="block whitespace-nowrap">{invite.groom}</span>
              <span className="block leading-[0.9]">&</span>
              <span className="block whitespace-nowrap">{invite.bride}</span>
            </span>
            <span className="hidden lg:block">
              {invite.groom} & {invite.bride}
            </span>
          </h1>
          <p
            className="mt-4 text-[11px] uppercase tracking-[0.22em] md:mt-5 md:text-base"
            style={{ fontFamily: designTokens.typography.ui }}
          >
            Wedding Invitation
          </p>
        </div>
      </div>
    </section>
  )
}
