import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import { ToastProvider } from './hooks/useToast'

import type { Route } from './+types/root'
import './app.css'

import RootLayout from './components/RootLayout'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        {/* Open Graph Meta Tags */}
        <meta property='og:title' content='User Authentication System' />
        <meta
          property='og:description'
          content='A modern, skeuomorphic user authentication system built with React, Vite, and Tailwind CSS.'
        />
        <meta property='og:image' content='/og.png' />
        <meta
          property='og:url'
          content='https://user-authentication-system-frontend-alpha.vercel.app/'
        />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='User Authentication System' />
        {/* Twitter Card Meta Tags */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='User Authentication System' />
        <meta
          name='twitter:description'
          content='A modern, skeuomorphic user authentication system built with React, Vite, and Tailwind CSS.'
        />
        <meta name='twitter:image' content='/og.png' />
      </head>
      <body className='bg-gray-50 font-sans text-gray-900'>
        <ToastProvider>
          <RootLayout>{children}</RootLayout>
        </ToastProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='container mx-auto p-4 pt-16'>
      <h1 className='text-xl font-bold text-red-600'>{message}</h1>
      <p className='text-gray-700'>{details}</p>
      {stack && (
        <pre className='mt-4 w-full overflow-x-auto bg-gray-100 p-4 text-sm'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
