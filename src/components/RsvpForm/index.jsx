import { designTokens } from '../../config/theme'
import { invite } from '../../data/invite'
import { useRsvp, attendanceLabel } from '../../hooks/useRsvp'

export default function RsvpForm() {
  const { form, errors, latestRsvp, isSubmitting, onChange, submit } = useRsvp()

  return (
    <section className="bg-[#eef4ea] px-5 py-10 md:px-10 md:py-12">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-[#d5e1cf] bg-[#f5faf2] p-5 shadow-[0_10px_28px_rgba(74,98,77,0.1)] md:p-8">
        <div className="text-center">
          <p
            style={{ color: '#7f8681', fontFamily: designTokens.typography.ui }}
            className="text-[11px] uppercase tracking-[0.5em]"
          >
            RSVP
          </p>
          <h3
            style={{ color: '#1f2321', fontFamily: designTokens.typography.display }}
            className="mt-2 text-[1.85rem] font-semibold md:text-[2.4rem]"
          >
            Xác Nhận Tham Dự
          </h3>
        </div>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm" style={{ fontFamily: designTokens.typography.ui }}>
            <span className="mb-2 block font-medium text-[#262b28]">Họ và tên *</span>
            <input
              value={form.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full rounded-xl border border-[#e3e4e3] bg-white px-4 py-2.5 text-base outline-none focus:border-[#9db49e] focus:ring-2 focus:ring-[#9db49e]/25"
              placeholder="Nhập họ tên của bạn"
            />
            {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
          </label>

          <div className="text-sm" style={{ fontFamily: designTokens.typography.ui }}>
            <p className="mb-2 font-medium text-[#262b28]">Bạn sẽ tham dự? *</p>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e3e4e3] bg-white px-4 py-2.5">
                <input
                  type="radio"
                  name="attendance"
                  value="attending"
                  checked={form.attendance === 'attending'}
                  onChange={(e) => onChange('attendance', e.target.value)}
                  className="h-4 w-4 accent-[#3f5d45]"
                />
                <span>Có, tôi sẽ đến</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e3e4e3] bg-white px-4 py-2.5">
                <input
                  type="radio"
                  name="attendance"
                  value="declining"
                  checked={form.attendance === 'declining'}
                  onChange={(e) => onChange('attendance', e.target.value)}
                  className="h-4 w-4 accent-[#3f5d45]"
                />
                <span>Rất tiếc, tôi không thể tham dự</span>
              </label>
            </div>
            {errors.attendance && (
              <span className="mt-1 block text-xs text-red-600">{errors.attendance}</span>
            )}
          </div>

          {form.attendance !== 'declining' && (
            <>
              <div className="text-sm" style={{ fontFamily: designTokens.typography.ui }}>
                <p className="mb-2 font-medium text-[#262b28]">Bạn là khách của? *</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#e3e4e3] bg-white px-4 py-2.5">
                    <input
                      type="radio"
                      name="guestOf"
                      value="bride"
                      checked={form.guestOf === 'bride'}
                      onChange={(e) => onChange('guestOf', e.target.value)}
                      className="h-4 w-4 accent-[#3f5d45]"
                    />
                    <span>Cô dâu</span>
                  </label>
                  <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#e3e4e3] bg-white px-4 py-2.5">
                    <input
                      type="radio"
                      name="guestOf"
                      value="groom"
                      checked={form.guestOf === 'groom'}
                      onChange={(e) => onChange('guestOf', e.target.value)}
                      className="h-4 w-4 accent-[#3f5d45]"
                    />
                    <span>Chú rể</span>
                  </label>
                </div>
                {errors.guestOf && (
                  <span className="mt-1 block text-xs text-red-600">{errors.guestOf}</span>
                )}
              </div>

              <label className="block text-sm" style={{ fontFamily: designTokens.typography.ui }}>
                <span className="mb-2 block font-medium text-[#262b28]">Số người đi cùng (bao gồm bạn)</span>
                <select
                  value={form.guests}
                  onChange={(e) => onChange('guests', e.target.value)}
                  className="w-full rounded-xl border border-[#e3e4e3] bg-white px-4 py-2.5 text-base outline-none focus:border-[#9db49e] focus:ring-2 focus:ring-[#9db49e]/25"
                >
                  {Array.from({ length: 10 }, (_, i) => {
                    const value = String(i + 1)
                    return (
                      <option key={value} value={value}>
                        {value} người
                      </option>
                    )
                  })}
                </select>
                {errors.guests && (
                  <span className="mt-1 block text-xs text-red-600">{errors.guests}</span>
                )}
              </label>
            </>
          )}

          <label className="block text-sm" style={{ fontFamily: designTokens.typography.ui }}>
            <span className="mb-2 block font-medium text-[#262b28]">Lời nhắn</span>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => onChange('message', e.target.value)}
              className="w-full resize-y rounded-xl border border-[#e3e4e3] bg-white px-4 py-2.5 text-base outline-none focus:border-[#9db49e] focus:ring-2 focus:ring-[#9db49e]/25"
              placeholder="Gửi lời chúc đến cô dâu chú rể..."
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#3f5d45] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#334d39] disabled:opacity-60"
            style={{ fontFamily: designTokens.typography.ui }}
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi xác nhận'}
          </button>

          {latestRsvp && (
            <p
              className="rounded-xl bg-[#2f4836] px-3 py-2 text-center text-sm text-white"
              style={{ fontFamily: designTokens.typography.ui }}
            >
              Cảm ơn {latestRsvp.name}. Trạng thái của bạn: {attendanceLabel[latestRsvp.attendance]}.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
