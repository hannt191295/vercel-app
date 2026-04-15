import { useEffect, useState } from 'react'
import { RSVP_STORAGE_KEY } from '../data/invite'

const defaultForm = {
  name: '',
  attendance: '',
  guestOf: '',
  guests: '1',
  message: '',
}

export const attendanceLabel = {
  attending: 'Sẽ tham dự',
  declining: 'Rất tiếc không tham dự',
}

function loadSavedRsvps() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(RSVP_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useRsvp() {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const [list, setList] = useState(() => loadSavedRsvps())
  const [latestRsvp, setLatestRsvp] = useState(null)

  useEffect(() => {
    window.localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(list))
  }, [list])

  const onChange = (field, value) => {
    setForm((prev) => {
      if (field !== 'attendance') return { ...prev, [field]: value }
      if (value === 'declining') {
        return { ...prev, attendance: value, guestOf: '', guests: '0' }
      }
      return {
        ...prev,
        attendance: value,
        guests: prev.guests === '0' ? '1' : prev.guests,
      }
    })
  }

  const submit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    const normalizedName = form.name.trim()
    const guestsNumber = Number.parseInt(form.guests, 10)

    if (!normalizedName) nextErrors.name = 'Vui lòng nhập họ tên.'
    if (!form.attendance) nextErrors.attendance = 'Vui lòng chọn trạng thái tham dự.'

    if (form.attendance !== 'declining') {
      if (!form.guestOf) nextErrors.guestOf = 'Vui lòng chọn bạn là khách của ai.'
      if (Number.isNaN(guestsNumber) || guestsNumber < 1 || guestsNumber > 10) {
        nextErrors.guests = 'Số lượng khách từ 1 đến 10.'
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const payload = {
      id: crypto.randomUUID(),
      name: normalizedName,
      attendance: form.attendance,
      guestOf: form.attendance === 'declining' ? '' : form.guestOf,
      guests: form.attendance === 'declining' ? 0 : guestsNumber,
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
    }

    setList((prev) => [payload, ...prev].slice(0, 100))
    setLatestRsvp(payload)
    setErrors({})
    setForm(defaultForm)
  }

  return { form, errors, latestRsvp, onChange, submit }
}
