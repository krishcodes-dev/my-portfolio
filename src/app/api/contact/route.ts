import { NextResponse } from "next/server";
import { Resend } from 'resend';

// Simple in-memory rate limiting (for serverless, use Vercel KV or Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);

    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
        return true;
    }

    if (limit.count >= 3) {
        return false;
    }

    limit.count++;
    return true;
}

function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/[<>]/g, '')
        .substring(0, 5000);
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
    try {
        if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
            console.error('[CRITICAL] Resend API key or contact email not configured');
            return NextResponse.json(
                { error: "Service temporarily unavailable" },
                { status: 503 }
            );
        }

        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        if (!rateLimit(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { name, email, message, company, reason, honeypot } = body;

        if (honeypot) {
            console.log('[SECURITY] Honeypot triggered from IP:', ip);
            return NextResponse.json({ success: true }, { status: 200 });
        }

        if (!name || !email || !message || !reason) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        if (name.length > 100) {
            return NextResponse.json(
                { error: "Name is too long (max 100 characters)" },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        if (message.length > 2000) {
            return NextResponse.json(
                { error: "Message is too long (max 2000 characters)" },
                { status: 400 }
            );
        }

        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedMessage = sanitizeInput(message);
        const sanitizedCompany = company ? sanitizeInput(company) : '';
        const sanitizedReason = sanitizeInput(reason);

        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL,
            replyTo: sanitizedEmail,
            subject: `[Portfolio] ${sanitizedReason} - ${sanitizedName}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Portfolio Inquiry</h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${sanitizedName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p style="margin: 5px 0;"><strong>Company:</strong> ${sanitizedCompany || '<span style="color: #999;">Not specified</span>'}</p>
            <p style="margin: 5px 0;"><strong>Reason:</strong> <span style="background: #f0f0f0; padding: 2px 6px; border-radius: 4px;">${sanitizedReason}</span></p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #000;">
            <p style="margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("[API ERROR] Contact form submission failed:", error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
