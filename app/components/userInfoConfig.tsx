import {
  Mail,
  Phone,
  UserCircle,
  FileText,
  Calendar,
  ToggleLeft,
  Tag,
} from 'lucide-react'
import type { User } from '../types/User'

type UserInfoField = {
  key: keyof User | string
  label: string
  icon: React.ReactNode
  render?: (
    user: User,
  ) => React.ReactNode | { value: React.ReactNode; copyValue: string }
  isSpoiler?: boolean
  spoilerLabel?: string
  showCopy?: boolean
}

// Enhanced icons with consistent styling and sizing
export const userInfoConfig: UserInfoField[] = [
  {
    key: 'id',
    label: 'User ID',
    icon: <Calendar size={20} className='text-indigo-600' />,
    showCopy: true,
  },
  {
    key: 'fullName',
    label: 'Full Name',
    icon: <UserCircle size={20} className='text-indigo-600' />,
    showCopy: true,
  },
  {
    key: 'email',
    label: 'Email',
    icon: <Mail size={20} className='text-indigo-600' />,
    showCopy: true,
  },
  {
    key: 'phone',
    label: 'Phone',
    icon: <Phone size={20} className='text-indigo-600' />,
    render: (user: User) =>
      user.phone || (
        <span className='text-slate-400 italic'>No phone specified</span>
      ),
    showCopy: true,
  },
  {
    key: 'bio',
    label: 'Bio',
    icon: <FileText size={20} className='text-indigo-600' />,
    render: (user: User) =>
      user.bio || (
        <span className='text-slate-400 italic'>No bio provided</span>
      ),
    showCopy: true,
  },
  {
    key: 'gender',
    label: 'Gender',
    icon: <UserCircle size={20} className='text-indigo-600' />,
    showCopy: true,
  },
  {
    key: 'interests',
    label: 'Interests',
    icon: <Tag size={20} className='text-indigo-600' />,
    showCopy: false,
  },
  {
    key: 'receiveNewsletter',
    label: 'Newsletter',
    icon: <ToggleLeft size={20} className='text-indigo-600' />,
    showCopy: false,
  },
  {
    key: 'password',
    label: 'Password',
    icon: <FileText size={20} className='text-indigo-600' />,
    isSpoiler: true,
    spoilerLabel: 'Show password hash',
    render: (user: User) => ({
      value: (
        <code className='rounded bg-slate-100 p-1 font-mono text-xs'>
          {user.password?.substring(0, 25)}...
        </code>
      ),
      showCopy: true,
      copyValue: user.password || '',
    }),
  },
  {
    key: 'createdAt',
    label: 'Created At',
    icon: <Calendar size={20} className='text-indigo-600' />,
    render: (user: User) =>
      user.createdAt ? (
        new Date(user.createdAt).toLocaleString()
      ) : (
        <span className='text-slate-400 italic'>Unknown</span>
      ),
    showCopy: false,
  },
]
