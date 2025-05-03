// app/components/Toast.tsx
import { useEffect } from 'react'
import { Check, X, Info } from 'lucide-react'

interface ToastProps {
  message: string
  show: boolean
  duration?: number
  onClose: () => void
  variant?: 'success' | 'danger' | 'info' | 'default'
  position?:
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'top-right'
    | 'top-left'
    | 'top-center'
}

const variantStyles = {
  success: 'bg-green-600',
  danger: 'bg-red-600',
  info: 'bg-blue-600',
  default: 'bg-indigo-600',
}
const variantIcons = {
  success: <Check size={22} className='text-white' />,
  danger: <X size={22} className='text-white' />,
  info: <Info size={22} className='text-white' />,
  default: <Info size={22} className='text-white' />,
}

const positionStyles = {
  'bottom-right': 'right-6 bottom-6 left-auto top-auto translate-x-0',
  'bottom-left': 'left-6 bottom-6 right-auto top-auto translate-x-0',
  'bottom-center': 'left-1/2 bottom-6 right-auto top-auto -translate-x-1/2',
  'top-right': 'right-6 top-24 left-auto bottom-auto translate-x-0',
  'top-left': 'left-6 top-24 right-auto bottom-auto translate-x-0',
  'top-center': 'left-1/2 top-24 right-auto bottom-auto -translate-x-1/2',
}

export default function Toast({
  message,
  show,
  duration = 2000,
  onClose,
  variant = 'default',
  position = 'bottom-right',
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
      className={`animate-fade-in-up pointer-events-auto fixed z-50 ${positionStyles[position]} rounded-xl px-6 py-3 text-white opacity-100 shadow-lg transition-all duration-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none ${variantStyles[variant]}`}
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
        {variant !== 'default' && variantIcons[variant]}
        <span>{message}</span>
      </div>
    </div>
  )
}
