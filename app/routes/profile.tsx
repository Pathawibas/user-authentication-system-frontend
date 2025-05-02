import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { LogOut, User as UserIcon, Check, RefreshCw } from 'lucide-react'
import { faker } from '@faker-js/faker'
import type { User } from '../types/User'
import UserInfoSection from '../components/UserInfoSection'

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState(user?.profileImageUrl || '')
  const [savingImage, setSavingImage] = useState(false)
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
      setImageUrl(currentUser.profileImageUrl || '')
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

  const handleImageUrlSave = () => {
    if (!user) return
    setSavingImage(true)
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map((u: User) =>
      u.email === user.email ? { ...u, profileImageUrl: imageUrl } : u,
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    setUser({ ...user, profileImageUrl: imageUrl })
    setTimeout(() => setSavingImage(false), 800)
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
          {/* Welcome Message */}
          <h1 className='mb-6 text-2xl font-extrabold text-indigo-700 drop-shadow-sm'>
            Welcome back, {user.fullName?.split(' ')[0] || 'User'}!
          </h1>
          {/* Avatar & Change Profile Picture at the top */}
          <div className='mb-6 flex w-full flex-col items-center'>
            <div className='relative mb-2'>
              <div className='flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-200 via-white to-indigo-100 shadow-inner'>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt='Profile'
                    className='h-28 w-28 rounded-full border border-indigo-200 object-cover'
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                ) : (
                  <UserIcon
                    size={56}
                    strokeWidth={1.5}
                    className='text-indigo-400'
                  />
                )}
                {savingImage && (
                  <div className='absolute inset-0 flex items-center justify-center rounded-full bg-white/60'>
                    <span className='h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-500'></span>
                  </div>
                )}
              </div>
            </div>
            <span className='mb-2 text-sm font-semibold text-indigo-700'>
              Change Profile Picture
            </span>
            <div className='flex w-full max-w-xs items-center gap-2'>
              <input
                type='url'
                className='flex-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm shadow-sm focus:ring-2 focus:ring-indigo-200 focus:outline-none'
                placeholder='Image URL (optional)'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ minWidth: 0 }}
              />
              <button
                onClick={() => setImageUrl(faker.image.avatar())}
                className='rounded-lg p-2 text-indigo-500 hover:bg-indigo-100 active:scale-95'
                type='button'
                title='Generate random image URL'
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={handleImageUrlSave}
                className='rounded-lg bg-indigo-500 p-2 text-white hover:bg-indigo-600 active:scale-95 disabled:opacity-60'
                disabled={
                  savingImage || imageUrl === (user.profileImageUrl || '')
                }
                type='button'
                title='Save image URL'
              >
                <Check size={18} />
              </button>
            </div>
          </div>
          <div className='w-full space-y-4'>
            <UserInfoSection user={user} />
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
