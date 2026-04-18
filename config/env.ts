export const env = {
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Portfolio',
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;
