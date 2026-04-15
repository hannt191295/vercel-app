import { invite } from '../../data/invite'
import InfoTile from '../InfoTile'

export default function InfoTiles() {
  return (
    <section className="bg-[#eef4ea] px-6 py-10 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        <InfoTile title="Ngày cưới" value={invite.date} />
        <InfoTile title="Thời gian" value={invite.time} />
        <InfoTile title="Địa điểm" value={invite.venue} />
      </div>
    </section>
  )
}
