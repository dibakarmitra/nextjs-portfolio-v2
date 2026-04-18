export const env = {
    APP_NAME: process.env.APP_NAME || 'Portfolio',
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',
    CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
    CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO || '',
} as const;
