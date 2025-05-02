//app/routes.ts

import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('register', 'routes/register.tsx'),
  route('login', 'routes/login.tsx'),
  route('users', 'routes/users.tsx'),
  route('profile', 'routes/profile.tsx'),
] satisfies RouteConfig
