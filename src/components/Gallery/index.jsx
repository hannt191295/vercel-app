import { designTokens, inviteTypography } from '../../config/theme'
import { useGallery } from '../../hooks/useGallery'

import img1 from './images/QLAM0552.jpg'
import img2 from './images/QLAM0560.jpg'
import img3 from './images/QLAM0667.jpg'
import img4 from './images/QLAM0676.jpg'
import img5 from './images/QLAM0683.jpg'
import img6 from './images/QLAM0691.jpg'
import img7 from './images/QLAM0697.jpg'
import img8 from './images/QLAM0806.jpg'
import img9 from './images/QLAM1039.jpg'
import img10 from './images/QLAM1096.jpg'
import img11 from './images/QLAM1135.jpg'
import img12 from './images/QLAM1147.jpg'

const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12]

export default function Gallery() {
  const { activeIndex, setActiveIndex, showPrevious, showNext } = useGallery(galleryImages.length)

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

        <div className="mt-5 overflow-hidden rounded-[24px] border border-[#d8ded4] bg-[#f8fbf6] p-2 shadow-[0_12px_28px_rgba(56,72,58,0.16)] md:p-3">
          <div className="relative overflow-hidden rounded-[18px]">
            <img
              src={galleryImages[activeIndex]}
              alt={`Wedding gallery ${activeIndex + 1}`}
              className="h-[21rem] w-full object-cover object-top sm:h-[28rem] md:h-[44rem]"
            />

            <button
              type="button"
              onClick={showPrevious}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-xl text-[#7a7d76] backdrop-blur transition hover:bg-white"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Ảnh sau"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-xl text-[#7a7d76] backdrop-blur transition hover:bg-white"
            >
              ›
            </button>
          </div>

          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  activeIndex === index
                    ? 'border-[#be8595]'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                aria-label={`Chọn ảnh ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-12 w-12 object-cover md:h-14 md:w-14"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
