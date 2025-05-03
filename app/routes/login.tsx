import { useState, useEffect } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router'
import InputField from '../components/InputField'
import { verifyPassword } from '../utils/hash'
import { Checkbox } from '../components/CheckboxRadio'
import Button from '../components/Button'
import { Fingerprint, LogIn, Mail, Lock } from 'lucide-react'
import { useToast } from '../hooks/useToast'

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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const emailParam = params.get('email')
    if (emailParam) {
      setFormData((prev) => ({ ...prev, email: emailParam }))
    }
    // eslint-disable-next-line
  }, [location.search])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u) => u.email === formData.email)

    if (!user) {
      setError('User not found.')
      setLoading(false)
      return
    }

    const isPasswordValid = await verifyPassword(
      formData.password,
      user.password,
    )

    if (!isPasswordValid) {
      setError('Incorrect password.')
      setLoading(false)
      return
    }

    // Generate simple token
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }))
    if (rememberMe) {
      localStorage.setItem('authToken', token)
    } else {
      sessionStorage.setItem('authToken', token)
    }

    setTimeout(() => {
      setLoading(false)
      navigate('/profile')
    }, 1200)
  }

  return (
    <div className='my-8 flex items-center justify-center'>
      {/* Modern Skeuomorphic Card */}
      <div className='relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 via-white/80 to-indigo-50/70 p-10 shadow-xl backdrop-blur-md transition-all'>
        {/* Decorative Elements */}
        <div className='pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl'></div>
        <div className='pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-indigo-300/30 blur-3xl'></div>
        <div className='pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 opacity-30 blur-3xl'></div>

        {/* Top Highlight - Skeuomorphic Effect */}
        <div className='absolute top-0 right-0 left-0 h-20 rounded-t-3xl bg-gradient-to-b from-white/60 to-transparent'></div>

        {/* Content */}
        <div className='relative z-10'>
          {/* Icon Header */}
          <div className='mb-6 flex flex-col items-center'>
            <div className='mb-4 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-200 via-white to-indigo-100 p-4 shadow-lg backdrop-blur-sm'>
              <div className='rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 text-white shadow-inner'>
                <Fingerprint
                  size={32}
                  strokeWidth={2}
                  className='drop-shadow-sm'
                />
              </div>
            </div>
            <h1 className='bg-gradient-to-b from-indigo-700 to-indigo-900 bg-clip-text text-center text-3xl font-extrabold text-transparent drop-shadow-sm'>
              Welcome Back
            </h1>
            <p className='mt-2 text-center text-slate-600'>
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <InputField
              label='Email'
              name='email'
              type='email'
              placeholder='your@email.com'
              value={formData.email}
              onChange={handleChange}
              autoComplete='email'
              icon={<Mail size={18} className='text-indigo-500' />}
            />
            <InputField
              label='Password'
              name='password'
              type='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              autoComplete='current-password'
              icon={<Lock size={18} className='text-indigo-500' />}
            />

            {/* Custom toggle for Remember Me - Skeuomorphic */}
            <div className='mb-4 flex items-center gap-2'>
              <Checkbox
                label='Remember Me'
                name='rememberMe'
                checked={rememberMe}
                onChange={() => setRememberMe((v) => !v)}
                id='rememberMe'
              />
            </div>

            {error && (
              <div className='rounded-xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-600 shadow-inner backdrop-blur-sm'>
                <p className='flex items-center'>
                  <span className='mr-2 flex-shrink-0 rounded-full bg-red-100 p-1'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <circle cx='12' cy='12' r='10'></circle>
                      <line x1='12' y1='8' x2='12' y2='12'></line>
                      <line x1='12' y1='16' x2='12.01' y2='16'></line>
                    </svg>
                  </span>
                  {error}
                </p>
              </div>
            )}

            {/* Loading spinner - Skeuomorphic Style */}
            {loading && (
              <div className='mb-2 flex items-center justify-center'>
                <div className='relative h-8 w-8'>
                  <div className='absolute inset-0 rounded-full border-4 border-indigo-100 opacity-80'></div>
                  <div className='absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600'></div>
                </div>
                <span className='ml-3 font-medium text-indigo-700'>
                  Logging in...
                </span>
              </div>
            )}

            {/* Login Button - Skeuomorphic */}
            <Button
              type='submit'
              variant='primary'
              className='w-full'
              disabled={loading}
            >
              Login
            </Button>

            {/* Additional Links - Skeuomorphic */}
            <div className='text-center'>
              <button
                type='button'
                onClick={() =>
                  toast.showToast('Password reset is not implemented yet.', {
                    variant: 'info',
                  })
                }
                className='text-sm text-indigo-600 underline transition-colors hover:text-indigo-800'
              >
                Forgot password?
              </button>
              <div className='mt-2 flex items-center justify-center gap-2'>
                <span className='text-sm text-slate-600'>
                  Don't have an account?
                </span>
                <NavLink
                  to='/register'
                  className='text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800'
                >
                  Register
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
