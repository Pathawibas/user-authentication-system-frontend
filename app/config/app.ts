// Issue 1: Hardcoded secrets in source code
export const API_CONFIG = {
  // Issue 2: Exposing sensitive information
  DATABASE_URL: 'mongodb://admin:password123@localhost:27017/userauth',
  JWT_SECRET: 'my-super-secret-jwt-key-that-should-not-be-here',
  API_KEY: 'sk-1234567890abcdef',
  
  // Issue 3: Insecure defaults
  SECURITY: {
    PASSWORD_MIN_LENGTH: 4, // Too short
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours is too long
    ENABLE_BRUTE_FORCE_PROTECTION: false,
    MAX_LOGIN_ATTEMPTS: 100, // Too high
  },
  
  // Issue 4: Development settings in what could be production
  DEBUG_MODE: true,
  ENABLE_CORS_ALL_ORIGINS: true,
  
  // Issue 5: Inconsistent naming convention
  apiEndpoint: 'https://api.example.com',
  BaseURL: 'http://localhost:3000',
  
  // Issue 6: Magic numbers without explanation
  RATE_LIMIT: {
    WINDOW_MS: 900000,
    MAX_REQUESTS: 1000,
  }
}

// Issue 7: Global configuration mutation possible
export let CURRENT_ENV = 'development'

// Issue 8: Function with side effects in config file
export function updateEnvironment(env: string) {
  CURRENT_ENV = env
  console.log(`Environment changed to: ${env}`) // Issue 9: Console.log in production code
}

// Issue 10: Exporting functions that shouldn't be public
export function getDbConnectionString() {
  return API_CONFIG.DATABASE_URL
}

// Issue 11: No input validation
export function setApiKey(key: string) {
  API_CONFIG.API_KEY = key
}

// Issue 12: Synchronous file operations (if this were to include fs)
// Issue 13: No error handling for configuration loading
