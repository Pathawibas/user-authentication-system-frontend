import React, { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/Toast'

interface ToastContextProps {
  showToast: (
    message: string,
    options?: {
      variant?: 'success' | 'danger' | 'info' | 'default'
      duration?: number
      position?: string
    },
  ) => void
  hideToast: () => void
  toast: ToastState
}

interface ToastState {
  show: boolean
  message: string
  variant: 'success' | 'danger' | 'info' | 'default'
  duration: number
  position:
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'top-right'
    | 'top-left'
    | 'top-center'
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    variant: 'default',
    duration: 2000,
    position: 'top-center',
  })

  const showToast = useCallback(
    (
      message: string,
      options?: {
        variant?: 'success' | 'danger' | 'info' | 'default'
        duration?: number
        position?: string
      },
    ) => {
      setToast({
        show: true,
        message,
        variant: options?.variant || 'default',
        duration: options?.duration || 2000,
        position: (options?.position as ToastState['position']) || 'top-center',
      })
    },
    [],
  )

  const hideToast = useCallback(() => {
    setToast((t) => ({ ...t, show: false }))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
      <Toast
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={hideToast}
        position={toast.position}
        duration={toast.duration}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
