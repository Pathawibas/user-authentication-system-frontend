import { useEffect } from 'react'

interface ToastProps {
  message: string
  show: boolean
  duration?: number
  onClose: () => void
}

export default function Toast({
  message,
  show,
  duration = 2000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [show, duration, onClose])

  if (!show) return null

  return (
    <div className='animate-fade-in-up fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-indigo-600 px-6 py-3 text-white shadow-lg'>
      {message}
    </div>
  )
}
