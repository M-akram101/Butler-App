const SENSITIVE_KEYS = [
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'authorization',
];

// To sanitize our logs from any sensitive data
export const sanitize = (obj: Record<string, any>) => {
  const copy = { ...obj };

  for (const key of SENSITIVE_KEYS) {
    if (key in copy) {
      copy[key] = '[REDACTED]';
    }
  }

  return copy;
};
