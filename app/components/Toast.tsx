// app/components/Toast.tsx
import { useEffect } from 'react'
import { Check, X, Info, AlertTriangle, AlertCircle } from 'lucide-react'
import { tv } from 'tailwind-variants'

interface ToastProps {
  message: string
  show: boolean
  duration?: number
  onClose: () => void
  variant?: 'success' | 'danger' | 'info' | 'warning' | 'default'
  position?:
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'top-right'
    | 'top-left'
    | 'top-center'
}

const toastContainer = tv({
  base: [
    'relative overflow-hidden rounded-xl border bg-gradient-to-b backdrop-blur-sm',
  ],
  variants: {
    variant: {
      success: 'from-green-500 to-green-600 border-green-400/30',
      danger: 'from-red-500 to-red-600 border-red-400/30',
      info: 'from-blue-500 to-blue-600 border-blue-400/30',
      warning: 'from-amber-500 to-amber-600 border-amber-400/30',
      default: 'from-indigo-500 to-indigo-600 border-indigo-400/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const toastIconBg = tv({
  base: 'mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-b',
  variants: {
    variant: {
      success: 'from-green-400 to-green-500',
      danger: 'from-red-400 to-red-500',
      info: 'from-blue-400 to-blue-500',
      warning: 'from-amber-400 to-amber-500',
      default: 'from-indigo-400 to-indigo-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const variantIcons = {
  success: <Check size={18} className='text-white' />,
  danger: <AlertTriangle size={18} className='text-white' />,
  info: <Info size={18} className='text-white' />,
  warning: <AlertCircle size={18} className='text-white' />,
  default: <Info size={18} className='text-white' />,
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
      className={`fixed z-50 ${positionStyles[position]} transition-all duration-300 ${
        show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
      role='status'
      aria-live='polite'
    >
      {/* Glass Container */}
      <div
        className={toastContainer({ variant })}
        style={{
          minWidth: '240px',
          maxWidth: '280px',
          boxShadow:
            '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 -1px 0 0 rgba(0, 0, 0, 0.1) inset',
          transform: 'perspective(1000px) rotateX(0deg)',
        }}
      >
        {/* Shine overlay - creates the glossy effect */}
        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div
            className='absolute -inset-x-2 -top-2 h-1/2 rounded-full bg-gradient-to-b from-white/40 to-transparent blur-sm'
            style={{ transform: 'translateY(-20%) scale(1.4)' }}
          ></div>
        </div>

        {/* Content container with background noise texture */}
        <div className='relative'>
          {/* Icon and message container */}
          <div className='flex items-center p-3'>
            <div className={toastIconBg({ variant })}>
              <div className='rounded-full p-1'>{variantIcons[variant]}</div>
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium text-white drop-shadow-sm'>
                {message}
              </p>
            </div>
            <button
              type='button'
              className='ml-3 flex-shrink-0 rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/30 focus:outline-none'
              onClick={onClose}
            >
              <span className='sr-only'>Close</span>
              <X size={16} aria-hidden='true' />
            </button>
          </div>

          {/* Progress bar */}
          <div className='relative h-1 w-full overflow-hidden bg-black/20'>
            <div
              className='absolute top-0 left-0 h-full bg-white/40'
              style={{
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`,
                boxShadow: '0 0 8px rgba(255,255,255,0.3)',
              }}
            ></div>
          </div>
        </div>

        {/* Add subtle noise texture overlay */}
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay'
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}
