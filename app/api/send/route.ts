import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { env } from '@/config/env';
import { publicSiteData } from '@/config/data';

const resend = new Resend(env.RESEND_API_KEY);

const emailTemplate = {
    subject: (name: string) => `New Message from ${name} | ${env.APP_NAME}`,
    text: (data: { name: string; email: string; message: string }) => `
        New Contact Form Submission
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
    `,
    html: (data: { name: string; email: string; message: string }) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; color: #555;">
                ${data.message.replace(/\n/g, '<br/>')}
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">Sent from your portfolio website: ${env.APP_URL}</p>
        </div>
    `,
};

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { name, email, message } = data;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data: resendData, error } = await resend.emails.send({
            from: env.CONTACT_EMAIL_FROM,
            to: [env.CONTACT_EMAIL_TO || publicSiteData.email],
            subject: emailTemplate.subject(name),
            text: emailTemplate.text(data),
            html: emailTemplate.html(data),
            replyTo: email,
        });

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true, data: resendData });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
