import { NextResponse } from "next/server";
import { Resend } from 'resend';

// Simple in-memory rate limiting (NOTE: ineffective on Vercel serverless — each cold
// start gets its own Map. For production, replace with Upstash Redis + @upstash/ratelimit.)
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

// Properly encodes all HTML special characters to prevent injection in email templates.
function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/`/g, '&#x60;')
        .substring(0, 5000);
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

// Must match the options in Contact.tsx reasonOptions
const VALID_REASONS = [
    "Job Opportunity",
    "Project Collaboration",
    "Freelance Work",
    "General Question",
    "Just Saying Hi",
];

export async function POST(request: Request) {
    try {
        if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
            console.error('[CRITICAL] Resend API key or contact email not configured');
            return NextResponse.json(
                { error: "Service temporarily unavailable" },
                { status: 503 }
            );
        }

        const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
            || request.headers.get('x-real-ip')
            || 'unknown';

        if (!rateLimit(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { name, email, message, company, reason, honeypot } = body;

        // Type-check all fields before processing to prevent runtime errors
        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            typeof message !== 'string' ||
            typeof reason !== 'string'
        ) {
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }
        if (company !== undefined && typeof company !== 'string') {
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }

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

        // Server-side allowlist — rejects any reason not in the dropdown
        if (!VALID_REASONS.includes(reason)) {
            return NextResponse.json(
                { error: "Invalid reason selected" },
                { status: 400 }
            );
        }

        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedMessage = sanitizeInput(message);
        const sanitizedCompany = company ? sanitizeInput(company) : '';
        const sanitizedReason = sanitizeInput(reason);

        const resend = new Resend(process.env.RESEND_API_KEY);

        const submittedAt = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });

        const submissionId = `INQ-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

        const { adminEmail } = await import('@/emails/contact-admin');
        const { confirmationEmail } = await import('@/emails/contact-confirmation');

        const adminEmailData = adminEmail({
            name: sanitizedName,
            email: sanitizedEmail,
            company: sanitizedCompany,
            reason: sanitizedReason,
            message: sanitizedMessage,
            submittedAt,
            submissionId
        });

        const confirmationEmailData = confirmationEmail({
            name: sanitizedName,
            email: sanitizedEmail
        });

        await Promise.all([
            resend.emails.send({
                from: 'Krish Sanghavi <contact@krishcodes.dev>',
                to: process.env.CONTACT_EMAIL!,
                replyTo: sanitizedEmail,
                subject: adminEmailData.subject,
                html: adminEmailData.html,
            }),
            resend.emails.send({
                from: 'Krish Sanghavi <contact@krishcodes.dev>',
                to: sanitizedEmail,
                subject: confirmationEmailData.subject,
                html: confirmationEmailData.html,
            })
        ]);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("[API ERROR] Contact form submission failed:", error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
