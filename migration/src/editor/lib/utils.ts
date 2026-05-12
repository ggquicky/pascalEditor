import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const env = import.meta.env as Record<string, string | boolean | undefined>
const vercelEnv = (env.VITE_VERCEL_ENV as string | undefined) ?? env.NEXT_PUBLIC_VERCEL_ENV
const appUrl = (env.VITE_APP_URL as string | undefined) ?? (env.NEXT_PUBLIC_APP_URL as string | undefined)

export const isDevelopment =
  import.meta.env.DEV || vercelEnv === 'development'

export const isProduction =
  import.meta.env.PROD || vercelEnv === 'production'

export const isPreview = vercelEnv === 'preview'

/**
 * Base URL for the application
 * Uses NEXT_PUBLIC_* variables which are available at build time
 */
export const BASE_URL = (() => {
  // Development: localhost
  if (isDevelopment) {
    return appUrl || `http://localhost:${env.VITE_PORT ?? env.PORT ?? 3000}`
  }

  // Preview deployments: use Vercel branch URL
  if (isPreview && env.VITE_VERCEL_URL) {
    return `https://${env.VITE_VERCEL_URL}`
  }
  if (isPreview && env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // Production: use custom domain or Vercel production URL
  if (isProduction) {
    return (
      appUrl ||
      (env.VITE_VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${env.VITE_VERCEL_PROJECT_PRODUCTION_URL}`
        : env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
          ? `https://${env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
        : 'https://editor.pascal.app')
    )
  }

  // Fallback (should never reach here in normal operation)
  return appUrl || 'http://localhost:3000'
})()
