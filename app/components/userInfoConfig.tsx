import {
  User as UserIcon,
  Mail,
  Phone,
  FileText,
  KeyRound,
  AlertTriangle,
} from 'lucide-react'

export const userInfoConfig = [
  {
    key: 'fullName',
    label: 'Full Name:',
    icon: <UserIcon size={20} className='text-indigo-400' />,
  },
  {
    key: 'email',
    label: 'Email:',
    icon: <Mail size={20} className='text-indigo-400' />,
  },
  {
    key: 'password',
    label: 'Hashed Password:',
    icon: <KeyRound size={20} className='text-indigo-400' />,
    isSpoiler: true,
    spoilerLabel: 'Reveal hashed password',
    render: (user: any) => (
      <div className='flex flex-col gap-1'>
        <span className='text-xs break-all text-gray-500 select-all'>
          {user.password}
        </span>
        <span className='mt-1 flex items-center gap-1 text-xs text-yellow-600'>
          <AlertTriangle size={14} className='text-yellow-500' />
          For demo only. Never show hashed passwords in real apps.
        </span>
      </div>
    ),
  },
  {
    key: 'phone',
    label: 'Phone:',
    icon: <Phone size={20} className='text-indigo-400' />,
    render: (user: any) =>
      user.phone || <span className='text-gray-400 italic'>No phone</span>,
  },
  {
    key: 'bio',
    label: 'Bio:',
    icon: <FileText size={20} className='mt-1 text-indigo-400' />,
    render: (user: any) =>
      user.bio || <span className='text-gray-400 italic'>No bio provided</span>,
  },
  {
    key: 'gender',
    label: 'Gender:',
    icon: <UserIcon size={20} className='text-indigo-400' />,
  },
  {
    key: 'interests',
    label: 'Interests:',
    icon: <FileText size={20} className='text-indigo-400' />,
  },
  {
    key: 'receiveNewsletter',
    label: 'Receive Newsletter:',
    icon: <Mail size={20} className='text-indigo-400' />,
  },
]
