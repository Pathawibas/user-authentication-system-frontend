export const validateRegisterForm = (formData: {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  bio?: string
}) => {
  const errors: Record<string, string> = {}

  if (formData.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.'
  }

  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Invalid email format.'
  }

  if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (formData.phone && !/^0\d{9}$/.test(formData.phone)) {
    errors.phone = 'Invalid phone format. Use 0XXXXXXXXX.'
  }

  if (formData.bio && formData.bio.length > 150) {
    errors.bio = 'Bio cannot exceed 150 characters.'
  }

  return errors
}
