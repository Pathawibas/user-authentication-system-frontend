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
    <div
      className='animate-fade-in-up pointer-events-auto fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-indigo-600 px-6 py-3 text-white opacity-100 shadow-lg transition-all duration-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none'
      style={{
        minWidth: 220,
        maxWidth: 320,
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.25)',
        fontWeight: 600,
        fontSize: '1rem',
        letterSpacing: '0.01em',
      }}
      tabIndex={0}
      aria-live='polite'
      role='status'
    >
      <div className='flex items-center gap-2'>
        <svg
          width='22'
          height='22'
          fill='none'
          viewBox='0 0 24 24'
          className='text-white'
        >
          <circle
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            d='M12 8v4'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <circle cx='12' cy='16' r='1' fill='currentColor' />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  )
}
