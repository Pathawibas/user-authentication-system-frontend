import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  LogOut,
  Copy,
  Mail,
  Phone,
  User,
  KeyRound,
  FileText,
  Check, // <-- add Check icon
} from 'lucide-react'

interface User {
  id: string
  fullName: string
  email: string
  phone: string
  password: string
  bio: string
  profilePicture: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [copiedEmail, setCopiedEmail] = useState(false) // <-- add state
  const [copiedPassword, setCopiedPassword] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token =
      sessionStorage.getItem('authToken') || localStorage.getItem('authToken')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      const decoded = JSON.parse(atob(token))
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const currentUser = users.find((u: User) => u.email === decoded.email)
      if (!currentUser) throw new Error('User not found')
      setUser(currentUser)
      setLoading(false)
    } catch {
      sessionStorage.removeItem('authToken')
      localStorage.removeItem('authToken')
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='flex flex-col items-center'>
          <span className='mb-2 h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600'></span>
          <span className='font-semibold text-indigo-600'>
            Loading profile...
          </span>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className='flex items-center justify-center'>
      <div className='relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur-md'>
        {/* Decorative blurred shapes for skeuomorphic depth */}
        <div className='pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-60 blur-2xl'></div>
        <div className='pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-200 via-white to-transparent opacity-40 blur-2xl'></div>
        <div className='pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 opacity-30 blur-3xl'></div>
        {/* Profile Card Content */}
        <div className='relative z-10 flex flex-col items-center'>
          <div className='mb-4 flex flex-col items-center'>
            <div className='mb-2 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-200 via-white to-indigo-100 shadow-inner'>
              <User size={48} strokeWidth={1.5} className='text-indigo-500' />
            </div>
            <h1 className='text-2xl font-extrabold text-indigo-700 drop-shadow-sm'>
              {user.fullName}
            </h1>
            <div className='mt-1 flex items-center gap-2 rounded-lg bg-white/70 px-3 py-1 text-slate-700 shadow-inner'>
              <Mail size={16} className='text-indigo-400' />
              <span className='text-sm'>{user.email}</span>
              <button
                className='ml-1 text-xs text-indigo-500 hover:underline active:scale-95'
                onClick={async () => {
                  await navigator.clipboard.writeText(user.email)
                  setCopiedEmail(true)
                  setTimeout(() => setCopiedEmail(false), 1000)
                }}
                title={copiedEmail ? 'Copied!' : 'Copy email'}
              >
                {copiedEmail ? (
                  <Check size={14} className='text-green-500' />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>
          <div className='w-full space-y-4'>
            <div className='flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 shadow-inner'>
              <KeyRound size={20} className='text-indigo-400' />
              <span className='min-w-[120px] font-semibold text-indigo-700'>
                Hashed Password:
              </span>
              <span className='text-xs break-all text-gray-500 select-all'>
                {user.password}
              </span>
              <button
                className='ml-2 text-xs text-indigo-500 hover:underline active:scale-95'
                onClick={async () => {
                  await navigator.clipboard.writeText(user.password)
                  setCopiedPassword(true)
                  setTimeout(() => setCopiedPassword(false), 1000)
                }}
                title={copiedPassword ? 'Copied!' : 'Copy hashed password'}
              >
                {copiedPassword ? (
                  <Check size={14} className='text-green-500' />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
            <div className='flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 shadow-inner'>
              <Phone size={20} className='text-indigo-400' />
              <span className='min-w-[120px] font-semibold text-indigo-700'>
                Phone:
              </span>
              <span className='text-gray-500'>
                {user.phone || (
                  <span className='text-gray-400 italic'>No phone</span>
                )}
              </span>
              {user.phone && (
                <button
                  className='ml-2 text-xs text-indigo-500 hover:underline active:scale-95'
                  onClick={async () => {
                    await navigator.clipboard.writeText(user.phone)
                    setCopiedPhone(true)
                    setTimeout(() => setCopiedPhone(false), 1000)
                  }}
                  title={copiedPhone ? 'Copied!' : 'Copy phone number'}
                >
                  {copiedPhone ? (
                    <Check size={14} className='text-green-500' />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              )}
            </div>
            <div className='flex items-start gap-3 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 shadow-inner'>
              <FileText size={20} className='mt-1 text-indigo-400' />
              <span className='min-w-[120px] font-semibold text-indigo-700'>
                Bio:
              </span>
              <span className='text-gray-500'>
                {user.bio || (
                  <span className='text-gray-400 italic'>No bio provided</span>
                )}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to logout?'))
                handleLogout()
            }}
            className='mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-300/30 bg-gradient-to-tr from-red-400/80 to-red-500/90 px-6 py-3 font-bold text-white shadow-inner backdrop-blur transition-colors duration-150 select-none hover:from-red-500 hover:to-red-600 active:scale-95'
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  )
}
