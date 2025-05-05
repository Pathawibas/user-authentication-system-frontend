import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  LogOut,
  User as UserIcon,
  Check,
  RefreshCw,
  Mail,
  UserCircle,
} from 'lucide-react'
import { faker } from '@faker-js/faker'
import type { User } from '../types/User'
import Button from '../components/Button'
import ProfileInfoCard from '../components/ProfileInfoCard'
import { userInfoConfig } from '../components/userInfoConfig'
import { useToast } from '../hooks/useToast'

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState('')
  const [savingImage, setSavingImage] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    const token =
      sessionStorage.getItem('authToken') || localStorage.getItem('authToken')
    if (!token) {
      showToast('You need to login first', {
        variant: 'danger',
        position: 'top-center',
      })
      setTimeout(() => navigate('/login'), 1200)
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
  }, [navigate, showToast])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    sessionStorage.removeItem('authToken')
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

  return (
    <>
      {loading ? (
        <div className='flex h-[calc(100vh-200px)] items-center justify-center'>
          <div className='flex flex-col items-center'>
            <div className='relative h-8 w-8'>
              <div className='absolute inset-0 rounded-full border-4 border-indigo-100 opacity-80'></div>
              <div className='absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600'></div>
            </div>
            <span className='mt-3 font-medium text-indigo-700'>
              Loading profile...
            </span>
          </div>
        </div>
      ) : !user ? null : (
        <div className='my-8 flex items-center justify-center'>
          <div className='relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-white/90 to-white/80 p-8 shadow-xl backdrop-blur-md'>
            {/* Loading Overlay with Fade and Pointer Events Block */}
            {loading && (
              <div className='pointer-events-auto absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-white/80 opacity-100 backdrop-blur-sm transition-opacity duration-300'>
                <div className='relative h-10 w-10'>
                  <div className='absolute inset-0 rounded-full border-4 border-indigo-100 opacity-80'></div>
                  <div className='absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600'></div>
                </div>
              </div>
            )}
            {/* Card Content with pointer-events-none when loading */}
            <div
              className={
                loading ? 'pointer-events-none opacity-60 select-none' : ''
              }
            >
              {/* Welcome Message */}
              <h1 className='mb-6 bg-gradient-to-b from-indigo-700 to-indigo-900 bg-clip-text text-2xl font-extrabold text-transparent drop-shadow-sm'>
                {(() => {
                  // Remove common prefixes and use first real name
                  const prefixes = [
                    'mr',
                    'ms',
                    'mrs',
                    'dr',
                    'miss',
                    'sir',
                    'madam',
                    'prof',
                    'rev',
                  ]
                  const parts = user.fullName?.trim().split(/\s+/) || []
                  let firstName = parts[0] || 'User'
                  if (
                    parts.length > 1 &&
                    prefixes.includes(
                      firstName.toLowerCase().replace(/\./g, ''),
                    )
                  )
                    firstName = parts[1]
                  // Fallback if prefix only
                  if (!firstName) firstName = 'User'
                  return `Welcome back, ${firstName}!`
                })()}
              </h1>

              {/* Avatar & Change Profile Picture at the top */}
              <div className='mb-6 flex w-full flex-col items-center'>
                <div className='relative mb-4'>
                  <div className='h-28 w-28 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-1 shadow-lg'>
                    <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white'>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt='Profile'
                          className='h-full w-full object-cover'
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement?.classList.add(
                              'bg-indigo-100/80',
                              'shadow-inner',
                            )
                          }}
                        />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center bg-indigo-100/80 shadow-inner'>
                          <UserIcon
                            size={48}
                            strokeWidth={1.5}
                            className='text-indigo-500'
                          />
                        </div>
                      )}
                      {savingImage && (
                        <div className='absolute inset-0 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-sm'>
                          <div className='relative h-8 w-8'>
                            <div className='absolute inset-0 rounded-full border-4 border-indigo-100 opacity-80'></div>
                            <div className='absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600'></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <span className='mb-2 text-sm font-medium text-indigo-700'>
                  Change Profile Picture
                </span>

                <div className='flex w-full max-w-sm items-center gap-2'>
                  <div className='relative flex-1'>
                    <input
                      type='url'
                      className='w-full rounded-xl border border-indigo-100/80 bg-white/80 py-2 pr-10 pl-3 text-sm shadow-inner backdrop-blur-sm transition-all focus:border-indigo-400 focus:bg-white/90 focus:ring-2 focus:ring-indigo-200/60 focus:outline-none'
                      placeholder='Image URL (optional)'
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <div className='pointer-events-none absolute inset-x-0 top-0 h-[30%] rounded-t-xl bg-white/30'></div>
                  </div>

                  <button
                    onClick={() => setImageUrl(faker.image.avatar())}
                    className='rounded-xl border border-indigo-100/50 bg-white/80 p-2 text-indigo-500 shadow-sm backdrop-blur-sm transition-all hover:bg-indigo-50 hover:shadow focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1 focus:outline-none active:translate-y-[0.5px] active:shadow-inner'
                    type='button'
                    title='Generate random image URL'
                  >
                    <RefreshCw size={18} />
                  </button>

                  <button
                    onClick={handleImageUrlSave}
                    className='rounded-xl border border-indigo-300/30 bg-gradient-to-b from-indigo-400/90 to-indigo-500/90 p-2 text-white shadow-sm transition-all hover:translate-y-[-1px] hover:shadow focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1 focus:outline-none active:translate-y-[0.5px] active:shadow-inner disabled:pointer-events-none disabled:opacity-60'
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

              {/* Basic User Information - Full Name and Email */}
              <div className='mb-6 w-full'>
                <div className='flex flex-col gap-4'>
                  {/* Full Name */}
                  <ProfileInfoCard
                    icon={<UserCircle size={22} className='text-indigo-500' />}
                    label='Full Name'
                    value={
                      user.fullName || (
                        <span className='text-slate-400 italic'>
                          Not provided
                        </span>
                      )
                    }
                  />

                  {/* Email */}
                  <ProfileInfoCard
                    icon={<Mail size={22} className='text-indigo-500' />}
                    label='Email'
                    value={user.email}
                  />
                </div>
              </div>

              {/* User Details */}
              <div className='w-full space-y-4'>
                <div className='w-full space-y-4'>
                  {user &&
                    userInfoConfig
                      .filter(
                        (field) =>
                          !['id', 'fullName', 'email'].includes(field.key),
                      )
                      .map((field) => {
                        // Special rendering for gender, interests, and receiveNewsletter
                        if (field.key === 'gender') {
                          return (
                            <ProfileInfoCard
                              key={field.key}
                              icon={field.icon}
                              label={field.label}
                              value={
                                user.gender ? (
                                  user.gender.charAt(0).toUpperCase() +
                                  user.gender.slice(1)
                                ) : (
                                  <span className='text-slate-400 italic'>
                                    No gender specified
                                  </span>
                                )
                              }
                            />
                          )
                        }
                        if (field.key === 'interests') {
                          return (
                            <ProfileInfoCard
                              key={field.key}
                              icon={field.icon}
                              label={field.label}
                              value={
                                Array.isArray(user.interests) &&
                                user.interests.length > 0 ? (
                                  <div className='flex flex-wrap gap-2'>
                                    {user.interests.map((interest: string) => (
                                      <span
                                        key={interest}
                                        className='rounded-full border border-indigo-100/50 bg-indigo-50 px-3 py-1 text-xs text-indigo-600 shadow-sm'
                                      >
                                        {interest}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className='text-slate-400 italic'>
                                    No interests
                                  </span>
                                )
                              }
                              showCopy={false}
                            />
                          )
                        }
                        if (field.key === 'receiveNewsletter') {
                          return (
                            <ProfileInfoCard
                              key={field.key}
                              icon={field.icon}
                              label={field.label}
                              value={
                                user.receiveNewsletter ? (
                                  <span className='rounded-full border border-green-100/50 bg-green-50 px-3 py-1 text-xs text-green-600 shadow-sm'>
                                    Yes
                                  </span>
                                ) : (
                                  <span className='rounded-full border border-slate-100/50 bg-slate-50 px-3 py-1 text-xs text-slate-500 shadow-sm'>
                                    No
                                  </span>
                                )
                              }
                              showCopy={false}
                            />
                          )
                        }
                        // Handle fields with custom render returning { value, copyValue }
                        const rendered = field.render
                          ? field.render(user)
                          : undefined
                        if (
                          rendered &&
                          typeof rendered === 'object' &&
                          'value' in rendered
                        ) {
                          return (
                            <ProfileInfoCard
                              key={field.key}
                              icon={field.icon}
                              label={field.label}
                              isSpoiler={field.isSpoiler}
                              spoilerLabel={field.spoilerLabel}
                              value={rendered.value}
                              copyValue={rendered.copyValue}
                            />
                          )
                        }
                        return (
                          <ProfileInfoCard
                            key={field.key}
                            icon={field.icon}
                            label={field.label}
                            isSpoiler={field.isSpoiler}
                            spoilerLabel={field.spoilerLabel}
                            value={rendered ?? user[field.key as keyof User]}
                          />
                        )
                      })}
                </div>
              </div>

              {/* Logout Button - Skeuomorphic */}
              <Button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?'))
                    handleLogout()
                }}
                variant='danger'
                className='mt-8 w-full justify-center'
                size='lg'
                iconLeft={<LogOut size={20} />}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
