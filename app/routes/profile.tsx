import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

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

  if (!user) return null

  return (
    <div className='flex items-center justify-center'>
      <div className='relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.17)] backdrop-blur-md'>
        {/* Decorative blurred shapes for skeuomorphic depth */}
        <div className='pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-60 blur-2xl'></div>
        <div className='pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-200 via-white to-transparent opacity-40 blur-2xl'></div>
        <div className='pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 opacity-30 blur-3xl'></div>
        {/* Content */}
        <div className='relative z-10 flex flex-col items-center'>
          <div className='relative mb-6 flex items-center justify-center'>
            <div className='absolute -top-2 -left-2 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-100 via-white to-transparent opacity-50 blur-2xl'></div>
            <img
              src={`https://placehold.co/200x200?text=${user.fullName.charAt(0).toUpperCase()}`}
              alt='Profile'
              className='h-36 w-36 rounded-full border-4 border-white bg-gradient-to-br from-gray-200 to-gray-100 object-cover shadow-[0_4px_24px_rgba(0,0,0,0.10)]'
            />
            <div className='absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-inner'>
              <span className='block h-3.5 w-3.5 rounded-full bg-green-400 shadow'></span>
            </div>
          </div>
          <h1 className='mb-1 text-center text-4xl font-extrabold text-indigo-600 drop-shadow-sm'>
            {user.fullName}
          </h1>
          <p className='mb-4 rounded-xl bg-white/60 px-4 py-1 text-center text-lg font-medium text-gray-500 shadow-inner'>
            {user.email}
          </p>
        </div>
        <div className='relative z-10 mt-8 space-y-5'>
          <div className='flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/90 px-6 py-4 shadow-inner'>
            <span className='min-w-[120px] font-semibold text-indigo-700'>
              Hash password:
            </span>
            <span className='break-all text-gray-500 select-all'>
              {user.password}
            </span>
          </div>
          <div className='flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/90 px-6 py-4 shadow-inner'>
            <span className='min-w-[120px] font-semibold text-indigo-700'>
              Phone Number:
            </span>
            <span className='text-gray-500'>{user.phone}</span>
          </div>
          <div className='flex items-start gap-4 rounded-2xl border border-gray-200 bg-white/90 px-6 py-4 shadow-inner'>
            <span className='min-w-[120px] font-semibold text-indigo-700'>
              Bio:
            </span>
            <span className='text-gray-500'>{user.bio}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className='relative z-10 mt-8 w-full cursor-pointer rounded-2xl border border-red-300/30 bg-gradient-to-tr from-red-400/80 to-red-500/90 px-6 py-3 font-bold text-white shadow-inner backdrop-blur transition-colors duration-150 select-none hover:from-red-500 hover:to-red-600 active:scale-95'
        >
          Logout
        </button>
      </div>
    </div>
  )
}
