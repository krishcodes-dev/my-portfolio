import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limiting (for serverless, use Vercel KV or Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);

    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
        return true;
    }

    if (limit.count >= 3) { // Max 3 requests per minute
        return false;
    }

    limit.count++;
    return true;
}

function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .substring(0, 5000); // Hard limit
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
    try {
        // 1. Environment variable check (fail fast)
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_EMAIL) {
            console.error('[CRITICAL] SMTP environment variables not configured');
            return NextResponse.json(
                { error: "Service temporarily unavailable" },
                { status: 503 }
            );
        }

        // 2. Rate limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        if (!rateLimit(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { name, email, message, company, reason, honeypot } = body;

        // 3. Honeypot check (silent drop for bots)
        if (honeypot) {
            console.log('[SECURITY] Honeypot triggered from IP:', ip);
            // Return success to bot but don't send email
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // 4. Required field validation
        if (!name || !email || !message || !reason) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // 5. Length validation
        if (name.length > 100) {
            return NextResponse.json(
                { error: "Name is too long (max 100 characters)" },
                { status: 400 }
            );
        }

        if (message.length > 2000) {
            return NextResponse.json(
                { error: "Message is too long (max 2000 characters)" },
                { status: 400 }
            );
        }

        if (company && company.length > 100) {
            return NextResponse.json(
                { error: "Company name is too long (max 100 characters)" },
                { status: 400 }
            );
        }

        // 6. Email validation
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // 7. Sanitize inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedMessage = sanitizeInput(message);
        const sanitizedCompany = company ? sanitizeInput(company) : '';
        const sanitizedReason = sanitizeInput(reason);

        // 8. Configure Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 9. Send Mail
        await transporter.sendMail({
            from: `"${sanitizedName}" <${process.env.SMTP_USER}>`,
            replyTo: sanitizedEmail,
            to: process.env.CONTACT_EMAIL,
            subject: `[Portfolio] ${sanitizedReason} - ${sanitizedName}`,
            text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nCompany: ${sanitizedCompany || 'N/A'}\nReason: ${sanitizedReason}\n\nMessage:\n${sanitizedMessage}`,
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
        // 10. Error logging without stack trace exposure
        console.error("[API ERROR] Contact form submission failed:", error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
