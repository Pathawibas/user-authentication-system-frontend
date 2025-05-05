import React, { useState, memo } from 'react'
import { Copy, Check } from 'lucide-react'

interface ProfileInfoCardProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  copyValue?: string
  children?: React.ReactNode
  className?: string
  isSpoiler?: boolean
  spoilerLabel?: string
  showCopy?: boolean // Add this prop
}

export default memo(function ProfileInfoCard({
  icon,
  label,
  value,
  copyValue,
  children,
  className = '',
  isSpoiler = false,
  spoilerLabel = 'Reveal',
  showCopy = true, // Default to true
}: ProfileInfoCardProps) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  // Helper to extract text from ReactNode
  function extractText(node: React.ReactNode): string {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return node.toString()
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (React.isValidElement(node))
      return extractText(
        (node.props as { children?: React.ReactNode }).children,
      )
    return ''
  }

  // Copy handler
  const handleCopy = async () => {
    const copyText = copyValue || extractText(value)
    if (copyText) {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }
  }

  return (
    <div
      className={`relative flex flex-col items-start gap-2 overflow-hidden rounded-xl border border-white/70 bg-gradient-to-b from-white/95 to-white/85 px-5 py-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow md:flex-row md:items-center md:gap-3 ${className} `}
    >
      <div className='pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-white/30'></div>
      <div className='relative h-10 w-10 flex-shrink-0 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-0.5 shadow-sm'>
        <div className='flex h-full w-full items-center justify-center rounded-full bg-indigo-100/80 shadow-inner'>
          {icon}
        </div>
      </div>
      <span className='relative min-w-[120px] bg-gradient-to-b from-indigo-700 to-indigo-900 bg-clip-text font-semibold text-transparent md:min-w-[120px]'>
        {label}
      </span>

      {/* Value with spoiler option */}
      {isSpoiler ? (
        <span className='relative flex flex-1 items-center gap-2 break-all text-slate-700'>
          {revealed ? (
            <>
              {value}
              {showCopy && (
                <button
                  type='button'
                  aria-label='Copy value'
                  className='ml-2 flex items-center rounded-lg border border-slate-200/70 bg-gradient-to-b from-slate-200/95 to-slate-300/90 p-1.5 text-slate-700 shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow active:translate-y-[0.5px] active:shadow-inner'
                  onClick={handleCopy}
                  disabled={copied}
                >
                  <span className='relative flex items-center justify-center transition-all duration-200'>
                    {copied ? (
                      <Check
                        size={16}
                        className='scale-110 text-green-500 transition-all duration-200'
                      />
                    ) : (
                      <Copy size={16} className='transition-all duration-200' />
                    )}
                  </span>
                </button>
              )}
            </>
          ) : (
            <button
              type='button'
              className='rounded-lg border border-slate-200/70 bg-gradient-to-b from-slate-200/95 to-slate-300/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow active:translate-y-[0.5px] active:shadow-inner'
              onClick={() => setRevealed(true)}
            >
              <span className='relative'>{spoilerLabel}</span>
            </button>
          )}
        </span>
      ) : (
        <span className='relative flex flex-1 items-center gap-2 break-all text-slate-700'>
          {value}
          {showCopy && (
            <button
              type='button'
              aria-label='Copy value'
              className='ml-2 flex items-center rounded-lg border border-slate-200/70 bg-gradient-to-b from-slate-200/95 to-slate-300/90 p-1.5 text-slate-700 shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow active:translate-y-[0.5px] active:shadow-inner'
              onClick={handleCopy}
              disabled={copied}
            >
              <span className='relative flex items-center justify-center transition-all duration-200'>
                {copied ? (
                  <Check
                    size={16}
                    className='scale-110 text-green-500 transition-all duration-200'
                  />
                ) : (
                  <Copy size={16} className='transition-all duration-200' />
                )}
              </span>
            </button>
          )}
        </span>
      )}
      {children}
    </div>
  )
})
