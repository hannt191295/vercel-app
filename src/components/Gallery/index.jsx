import { designTokens, inviteTypography } from '../../config/theme'

import img1 from './images/QLAM0676.jpg'
import img2 from './images/QLAM0560.jpg'
import img3 from './images/QLAM1135.jpg'
import img4 from './images/QLAM1147.jpg'

const galleryImages = [img1, img2, img3, img4]

export default function Gallery() {
  return (
    <section className="bg-[#eef4ea] px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p
            className="text-[10px] uppercase tracking-[0.5em]"
            style={{ color: inviteTypography.label, fontFamily: designTokens.typography.ui }}
          >
            Memories
          </p>
          <h3
            className="mt-2 text-[2rem] font-semibold md:text-[2.8rem]"
            style={{ color: inviteTypography.accent, fontFamily: designTokens.typography.script }}
          >
            Our Memories of Love
          </h3>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[18px] border border-[#d8ded4] bg-[#f8fbf6] p-1.5 shadow-[0_8px_20px_rgba(56,72,58,0.12)] md:p-2"
            >
              <img
                src={image}
                alt={`Wedding gallery ${index + 1}`}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-[14px] object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
