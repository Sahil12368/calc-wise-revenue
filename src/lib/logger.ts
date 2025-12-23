/**
 * Environment-aware logger that only logs in development mode.
 * Prevents exposing internal error details in production.
 */

const isDev = import.meta.env.MODE === 'development';

export const logger = {
  error: (message: string, error?: unknown) => {
    if (isDev) {
      console.error(message, error);
    }
    // In production, errors are silently ignored
    // Add error tracking service here if needed (e.g., Sentry)
  },
  warn: (message: string, data?: unknown) => {
    if (isDev) {
      console.warn(message, data);
    }
  },
  log: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(message, data);
    }
  },
  info: (message: string, data?: unknown) => {
    if (isDev) {
      console.info(message, data);
    }
  },
};
