import { designTokens } from './config/theme'
import { invite } from './data/invite'
import { useAutoScroll } from './hooks/useAutoScroll'
import { useMusic } from './hooks/useMusic.jsx'
import CoverBanner from './components/CoverBanner'
import Invitation from './components/Invitation'
import CoupleSection from './components/CoupleSection'
import InfoTiles from './components/InfoTiles'
import Gallery from './components/Gallery'
import RsvpForm from './components/RsvpForm'
import GiftSection from './components/GiftSection'
import MusicToggle from './components/MusicToggle'

function App() {
  useAutoScroll()
  const { isPlaying, toggle, AudioElement } = useMusic(invite.music.url)

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#eef4ea] text-slate-800"
      style={{ fontFamily: designTokens.typography.body }}
    >
      <CoverBanner />
      <Invitation />
      <CoupleSection />
      <InfoTiles />
      <Gallery />
      <RsvpForm />
      <GiftSection />

      {AudioElement}
      <MusicToggle
        isPlaying={isPlaying}
        onToggle={toggle}
        title={invite.music.title}
      />
    </main>
  )
}

export default App
