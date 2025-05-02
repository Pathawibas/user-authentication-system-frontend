export const validateRegisterForm = (formData: {
  fullName: string
  email: string
  password: string
  confirmPassword: string
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

  return errors
}
