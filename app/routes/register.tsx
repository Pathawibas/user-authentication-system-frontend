import { useState } from 'react'
import InputField from '../components/InputField'
import { validateRegisterForm } from '../utils/validation'
import { hashPassword } from '../utils/hash'
import { useToast } from '../hooks/useToast'
import { useNavigate } from 'react-router'
import { faker } from '@faker-js/faker'
import { Checkbox, Radio } from '../components/CheckboxRadio'
import Button from '../components/Button'
import {
  UserPlus2,
  RefreshCw,
  Mail,
  Lock,
  Phone,
  UserCircle,
} from 'lucide-react'

export default function Register() {
  const [formData, setFormData] = useState<{
    fullName: string
    email: string
    password: string
    confirmPassword: string
    phone: string
    bio: string
    gender: string
    interests: string[]
    receiveNewsletter: boolean
    acceptTerms: boolean
  }>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bio: '',
    gender: '',
    interests: [],
    receiveNewsletter: false,
    acceptTerms: false,
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox' && name === 'interests') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => {
        const arr = Array.isArray(prev.interests) ? prev.interests : []
        if (checked) {
          return { ...prev, interests: [...arr, value] }
        } else {
          return { ...prev, interests: arr.filter((i) => i !== value) }
        }
      })
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors = validateRegisterForm(formData)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')

    if (users.some((user: any) => user.email === formData.email)) {
      setFormErrors({ email: 'Email already registered.' })
      return
    }

    const hashedPassword = await hashPassword(formData.password)

    const newUser = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      password: hashedPassword,
      phone: formData.phone,
      bio: formData.bio,
      gender: formData.gender,
      interests: formData.interests,
      receiveNewsletter: formData.receiveNewsletter,
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    showToast('Registration successful!', {
      variant: 'success',
      duration: 1500,
    })
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate(`/login?email=${encodeURIComponent(formData.email)}`)
    }, 1800)

    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      bio: '',
      gender: '',
      interests: [],
      receiveNewsletter: false,
      acceptTerms: false,
    })
    setFormErrors({})
  }

  const prefillRandomData = () => {
    // Generate a Thai phone number: 0XXXXXXXXX
    const thaiPhone =
      '0' + faker.number.int({ min: 100000000, max: 999999999 }).toString()
    const genderOptions = ['male', 'female', 'other']
    const interestsOptions = ['Coding', 'Music', 'Sports', 'Art']
    setFormData({
      fullName: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: '11112222',
      confirmPassword: '11112222',
      phone: thaiPhone,
      bio: faker.person.bio().slice(0, 150),
      gender: faker.helpers.arrayElement(genderOptions),
      interests: faker.helpers.arrayElements(interestsOptions, {
        min: 1,
        max: 3,
      }),
      receiveNewsletter: faker.datatype.boolean(),
      acceptTerms: true,
    })
  }

  return (
    <div className='my-8 flex items-center justify-center'>
      <div className='relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-white/90 to-white/80 p-8 shadow-xl backdrop-blur-md'>
        {/* Decorative Elements */}
        <div className='pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-indigo-200/30 blur-3xl'></div>
        <div className='pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl'></div>

        {/* Top Highlight - Skeuomorphic Effect */}
        <div className='absolute top-0 right-0 left-0 h-20 rounded-t-3xl bg-gradient-to-b from-white/60 to-transparent'></div>

        {/* Content */}
        <div className='relative z-10 w-full'>
          {/* Header Section */}
          <div className='mb-6 flex flex-col items-center'>
            <div className='mb-4 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-200 via-white to-indigo-100 p-4 shadow-lg backdrop-blur-sm'>
              <div className='rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 text-white shadow-inner'>
                <UserPlus2
                  size={32}
                  strokeWidth={2}
                  className='drop-shadow-sm'
                />
              </div>
            </div>
            <h1 className='bg-gradient-to-b from-indigo-700 to-indigo-900 bg-clip-text text-center text-3xl font-extrabold text-transparent drop-shadow-sm'>
              Create Account
            </h1>
            <p className='mt-2 max-w-xs text-center text-slate-600'>
              Join our community and enjoy all features
            </p>
          </div>

          {/* Prefill Button */}
          <Button
            type='button'
            variant='secondary'
            className='mb-6 w-full justify-center'
            onClick={prefillRandomData}
            disabled={loading}
            iconLeft={<RefreshCw size={18} />}
          >
            Fill with Demo Data
          </Button>

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Basic Information */}
            <InputField
              label='Full Name'
              name='fullName'
              type='text'
              placeholder='Your full name'
              value={formData.fullName}
              onChange={handleChange}
              withAsterisk
              error={formErrors.fullName}
              icon={<UserCircle size={18} className='text-indigo-500' />}
            />
            <InputField
              label='Email'
              name='email'
              type='email'
              placeholder='you@example.com'
              value={formData.email}
              onChange={handleChange}
              withAsterisk
              autoComplete='email'
              error={formErrors.email}
              icon={<Mail size={18} className='text-indigo-500' />}
            />
            <InputField
              label='Password'
              name='password'
              type='password'
              placeholder='Enter password'
              value={formData.password}
              onChange={handleChange}
              withAsterisk
              autoComplete='new-password'
              error={formErrors.password}
              icon={<Lock size={18} className='text-indigo-500' />}
            />
            <InputField
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              placeholder='Confirm your password'
              value={formData.confirmPassword}
              onChange={handleChange}
              withAsterisk
              autoComplete='new-password'
              error={formErrors.confirmPassword}
              icon={<Lock size={18} className='text-indigo-500' />}
            />
            <InputField
              label='Phone Number (Optional)'
              name='phone'
              type='text'
              placeholder='0XXXXXXXXX'
              value={formData.phone}
              onChange={handleChange}
              error={formErrors.phone}
              icon={<Phone size={18} className='text-indigo-500' />}
            />

            {/* Gender Selection */}
            <div className='mt-1'>
              <label className='mb-2 block text-sm font-medium text-slate-700 drop-shadow-sm'>
                Gender (Optional)
              </label>
              <div className='mt-2 flex flex-wrap gap-4'>
                <Radio
                  label='Male'
                  name='gender'
                  value='male'
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                <Radio
                  label='Female'
                  name='gender'
                  value='female'
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
                <Radio
                  label='Other'
                  name='gender'
                  value='other'
                  checked={formData.gender === 'other'}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Interests */}
            <div className='mt-1'>
              <label className='mb-2 block text-sm font-medium text-slate-700 drop-shadow-sm'>
                Interests (Optional)
              </label>
              <div className='mt-2 flex flex-wrap gap-4'>
                {['Coding', 'Music', 'Sports', 'Art'].map((interest) => (
                  <Checkbox
                    key={interest}
                    label={interest}
                    name='interests'
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className='mt-4 flex items-center gap-2'>
              <Checkbox
                label='Receive Newsletter (Optional)'
                name='receiveNewsletter'
                checked={formData.receiveNewsletter}
                onChange={handleChange}
                id='receiveNewsletter'
              />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <Checkbox
                label={
                  <>
                    <span>I accept the Terms and Conditions</span>{' '}
                    <span className='text-red-500'>*</span>
                  </>
                }
                name='acceptTerms'
                checked={formData.acceptTerms}
                onChange={handleChange}
                id='acceptTerms'
                error={formErrors.acceptTerms}
              />
            </div>

            {/* Loading Spinner */}
            {loading && (
              <div className='mb-2 flex items-center justify-center'>
                <div className='relative h-8 w-8'>
                  <div className='absolute inset-0 rounded-full border-4 border-indigo-100 opacity-80'></div>
                  <div className='absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600'></div>
                </div>
                <span className='ml-3 font-medium text-indigo-700'>
                  Redirecting to login...
                </span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type='submit'
              variant='primary'
              className='w-full justify-center'
              size='lg'
              disabled={loading}
              iconLeft={<UserPlus2 size={20} />}
            >
              Create Account
            </Button>

            {/* Login Link */}
            <div className='text-center'>
              <p className='text-sm text-slate-600'>
                Already have an account?{' '}
                <a
                  href='/login'
                  className='font-medium text-indigo-600 transition-colors hover:text-indigo-800'
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
