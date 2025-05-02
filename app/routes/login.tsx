import { useState } from 'react'
import { useNavigate } from 'react-router'
import InputField from '../components/InputField'
import { verifyPassword } from '../utils/hash'

interface User {
  id: string
  email: string
  password: string
  fullName: string
}

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u) => u.email === formData.email)

    if (!user) {
      setError('User not found.')
      return
    }

    const isPasswordValid = await verifyPassword(
      formData.password,
      user.password,
    )

    if (!isPasswordValid) {
      setError('Incorrect password.')
      return
    }

    // Generate simple token
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }))
    if (rememberMe) {
      localStorage.setItem('authToken', token)
    } else {
      sessionStorage.setItem('authToken', token)
    }

    navigate('/profile')
  }

  return (
    <div className='my-6 flex items-center justify-center'>
      <div className='relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.17)] backdrop-blur-md'>
        {/* Decorative blurred shapes for skeuomorphic depth */}
        <div className='pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-60 blur-2xl'></div>
        <div className='pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-200 via-white to-transparent opacity-40 blur-2xl'></div>
        <div className='pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 opacity-30 blur-3xl'></div>
        {/* Content */}
        <div className='relative z-10'>
          <h1 className='mb-6 text-center text-3xl font-extrabold text-slate-900 drop-shadow-sm'>
            Login
          </h1>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <InputField
              label='Email'
              name='email'
              type='email'
              placeholder='your@email.com'
              value={formData.email}
              onChange={handleChange}
              autoComplete='email'
            />
            <InputField
              label='Password'
              name='password'
              type='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              autoComplete='current-password'
            />
            <div className='mb-4 flex items-center'>
              <input
                type='checkbox'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className='h-4 w-4 rounded border-slate-300 bg-white/70 text-indigo-600 shadow-inner transition-all duration-150 focus:border-indigo-400 focus:ring-indigo-400'
              />
              <label className='ml-2 text-sm font-medium text-slate-700'>
                Remember Me
              </label>
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
            <button
              type='submit'
              className='w-full cursor-pointer rounded-xl border border-indigo-300/30 bg-indigo-500/80 px-4 py-2 font-bold text-white shadow-inner backdrop-blur transition-colors duration-150 hover:bg-indigo-600/90'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
