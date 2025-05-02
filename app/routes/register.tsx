import { useState } from 'react'
import InputField from '../components/InputField'
import { validateRegisterForm } from '../utils/validation'
import { hashPassword } from '../utils/hash'
import Toast from '../components/Toast'
import { useNavigate } from 'react-router'
import { faker } from '@faker-js/faker'
import { Checkbox, Radio } from '../components/CheckboxRadio'

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
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [showToast, setShowToast] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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

    setShowToast(true)
    setLoading(true)
    setTimeout(() => {
      setShowToast(false)
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
    })
  }

  return (
    <div className='flex items-center justify-center'>
      <Toast
        message='✅ Registration successful! Please log in.'
        show={showToast}
        onClose={() => setShowToast(false)}
        duration={1500}
      />
      <div className='relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md'>
        {/* Decorative blurred shapes for skeuomorphic depth */}
        <div className='pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-60 blur-2xl'></div>
        <div className='pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-200 via-white to-transparent opacity-40 blur-2xl'></div>
        <div className='pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 opacity-30 blur-3xl'></div>
        {/* Content */}
        <div className='relative z-10 w-full'>
          <h1 className='mb-6 text-center text-3xl font-extrabold text-slate-900 drop-shadow-sm'>
            Register
          </h1>
          <button
            type='button'
            className='mb-4 w-full rounded-xl border border-indigo-300/30 bg-indigo-100 px-4 py-2 font-semibold text-indigo-700 shadow-inner backdrop-blur transition-colors duration-150 hover:bg-indigo-200/90'
            onClick={prefillRandomData}
            disabled={loading}
          >
            Prefill Random Data
          </button>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <InputField
              label='Full Name'
              name='fullName'
              type='text'
              placeholder='Your full name'
              value={formData.fullName}
              onChange={handleChange}
              withAsterisk
            />
            {formErrors.fullName && (
              <p className='text-sm text-red-500'>{formErrors.fullName}</p>
            )}
            <InputField
              label='Email'
              name='email'
              type='email'
              placeholder='you@example.com'
              value={formData.email}
              onChange={handleChange}
              withAsterisk
              autoComplete='email'
            />
            {formErrors.email && (
              <p className='text-sm text-red-500'>{formErrors.email}</p>
            )}
            <InputField
              label='Password'
              name='password'
              type='password'
              placeholder='Enter password'
              value={formData.password}
              onChange={handleChange}
              withAsterisk
              autoComplete='new-password'
            />
            {formErrors.password && (
              <p className='text-sm text-red-500'>{formErrors.password}</p>
            )}
            <InputField
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              placeholder='Confirm your password'
              value={formData.confirmPassword}
              onChange={handleChange}
              withAsterisk
              autoComplete='new-password'
            />
            {formErrors.confirmPassword && (
              <p className='text-sm text-red-500'>
                {formErrors.confirmPassword}
              </p>
            )}
            <InputField
              label='Phone Number (Optional)'
              name='phone'
              type='text'
              placeholder='0XXXXXXXXX'
              value={formData.phone}
              onChange={handleChange}
            />
            {formErrors.phone && (
              <p className='text-sm text-red-500'>{formErrors.phone}</p>
            )}
            <div>
              <label className='mb-1 block text-sm font-semibold text-slate-700 drop-shadow-sm'>
                Gender (Optional)
              </label>
              <div className='mt-1 flex gap-4'>
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
            <div>
              <label className='mb-1 block text-sm font-semibold text-slate-700 drop-shadow-sm'>
                Interests (Optional)
              </label>
              <div className='mt-1 flex gap-4'>
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
            <div className='flex items-center gap-2'>
              <Checkbox
                label='Receive Newsletter (Optional)'
                name='receiveNewsletter'
                checked={formData.receiveNewsletter}
                onChange={handleChange}
                id='receiveNewsletter'
              />
            </div>
            {/* Loading spinner above the Register button */}
            {loading && (
              <div className='mb-2 flex items-center justify-center'>
                <span className='mr-2 h-6 w-6 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600'></span>
                <span className='font-semibold text-indigo-600'>
                  Redirecting to login...
                </span>
              </div>
            )}
            <button
              type='submit'
              className='w-full cursor-pointer rounded-xl border border-indigo-300/30 bg-indigo-500/80 px-4 py-2 font-bold text-white shadow-inner backdrop-blur transition-colors duration-150 hover:bg-indigo-600/90'
              disabled={loading}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
