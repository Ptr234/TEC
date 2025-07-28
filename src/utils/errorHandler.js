// OneStopCenter Uganda - Error Handling Utilities
// Centralized error handling for better debugging and user experience

export class AppError extends Error {
  constructor(message, code = 'GENERIC_ERROR', context = {}) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.context = context
    this.timestamp = new Date().toISOString()
  }
}

export const errorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  STORAGE_ERROR: 'STORAGE_ERROR',
  DOWNLOAD_ERROR: 'DOWNLOAD_ERROR',
  ZOOM_ERROR: 'ZOOM_ERROR',
  THEME_ERROR: 'THEME_ERROR',
  NOTIFICATION_ERROR: 'NOTIFICATION_ERROR'
}

export const handleError = (error, context = {}) => {
  const errorInfo = {
    message: error.message || 'An unexpected error occurred',
    code: error.code || errorCodes.GENERIC_ERROR,
    context: { ...error.context, ...context },
    timestamp: new Date().toISOString(),
    stack: error.stack
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Application Error:', errorInfo)
  }

  // In production, you might want to send to error reporting service
  // Example: sendToErrorReporting(errorInfo)

  return errorInfo
}

export const safeAsync = async (asyncFn, fallback = null, errorContext = {}) => {
  try {
    return await asyncFn()
  } catch (error) {
    handleError(error, errorContext)
    return fallback
  }
}

export const safeLocalStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      handleError(new AppError(`Failed to get ${key} from localStorage`, errorCodes.STORAGE_ERROR, { key }))
      return defaultValue
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      handleError(new AppError(`Failed to set ${key} in localStorage`, errorCodes.STORAGE_ERROR, { key, value }))
      return false
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      handleError(new AppError(`Failed to remove ${key} from localStorage`, errorCodes.STORAGE_ERROR, { key }))
      return false
    }
  }
}

export const safeUrlOpen = (url, target = '_blank', features = 'noopener,noreferrer') => {
  try {
    if (typeof window !== 'undefined' && window.open) {
      window.open(url, target, features)
      return true
    }
    throw new AppError('Window.open not available', errorCodes.NETWORK_ERROR)
  } catch (error) {
    handleError(error, { url, target, features })
    return false
  }
}