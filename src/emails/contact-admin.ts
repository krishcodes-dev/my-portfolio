interface AdminEmailProps {
    name: string;
    email: string;
    company?: string;
    reason: string;
    message: string;
    submittedAt: string;
    submissionId: string;
}

export const adminEmail = ({ name, email, company, reason, message, submittedAt, submissionId }: AdminEmailProps) => ({
    subject: `[Portfolio] ${reason} - ${name}`,
    html: `
<div style="
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  padding: 32px;
  color: #ffffff;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
">

  <div style="
    background: rgba(15, 23, 42, 0.85);
    border-radius: 12px;
    padding: 24px;
    border: 1px solid rgba(148, 163, 184, 0.35);
  ">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#a5b4fc;">
            Portfolio · New Inquiry
          </p>
          <h2 style="margin:4px 0 0;font-size:22px;font-weight:700;color:#f9fafb;">
            New Contact Submission
          </h2>
        </td>
        <td align="right" style="font-size:12px;color:#94a3b8;">
          ${submittedAt}
        </td>
      </tr>
    </table>

    <hr style="border:0;border-top:1px solid rgba(148,163,184,0.4);margin:16px 0;" />

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:6px 0;color:#9ca3af;font-size:13px;width:120px;"><strong>Name</strong></td>
        <td style="padding:6px 0;font-size:14px;color:#f9fafb;">${name}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#9ca3af;font-size:13px;"><strong>Email</strong></td>
        <td style="padding:6px 0;font-size:14px;">
          <a href="mailto:${email}" style="color:#60a5fa;text-decoration:none;">${email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#9ca3af;font-size:13px;"><strong>Company</strong></td>
        <td style="padding:6px 0;font-size:14px;color:#f9fafb;">${company || 'Not specified'}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#9ca3af;font-size:13px;"><strong>Reason</strong></td>
        <td style="padding:6px 0;">
          <span style="
            background:rgba(96,165,250,0.18);
            border:1px solid rgba(96,165,250,0.4);
            padding:4px 10px;
            border-radius:999px;
            font-size:12px;
            color:#e0e7ff;">
          ${reason}
          </span>
        </td>
      </tr>
    </table>

    <div style="
      margin-top:18px;
      background:rgba(15,23,42,0.9);
      padding:16px;
      border-radius:10px;
      border-left:3px solid #60a5fa;
    ">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">
        Message
      </p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#e2e8f0;white-space:pre-wrap;">
${message}
      </p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">
      <tr>
        <td align="center">

          <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(reason)}&amp;body=Hi%20${encodeURIComponent(name)},%0D%0A%0D%0AThanks%20for%20reaching%20out.%20I'd%20love%20to%20discuss%20this%20further.%0D%0A%0D%0ABest,%0D%0AKrish" style="display:inline-block;margin:4px;padding:10px 14px;background:#10b981;color:#fff;border-radius:6px;text-decoration:none;font-size:13px;">
            Interested
          </a>

          <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(reason)}&amp;body=Hi%20${encodeURIComponent(name)},%0D%0A%0D%0ACould%20you%20share%20a%20few%20more%20details%20about%20this?%0D%0A%0D%0ABest,%0D%0AKrish" style="display:inline-block;margin:4px;padding:10px 14px;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none;font-size:13px;">
            Need Details
          </a>

          <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(reason)}&amp;body=Hi%20${encodeURIComponent(name)},%0D%0A%0D%0AThanks%20for%20your%20message.%20At%20the%20moment%20this%20isn't%20a%20fit,%20but%20I%20appreciate%20your%20interest.%0D%0A%0D%0ABest,%0D%0AKrish" style="display:inline-block;margin:4px;padding:10px 14px;background:#6366f1;color:#fff;border-radius:6px;text-decoration:none;font-size:13px;">
            Not a Fit
          </a>

        </td>
      </tr>
    </table>

    <div style="margin-top:18px;padding-top:12px;border-top:1px solid rgba(148,163,184,0.35);font-size:11px;color:#94a3b8;">
      Sent from <strong style="color:#60a5fa;">krishcodes.dev</strong><br />
      Reference ID: ${submissionId}
    </div>

  </div>
</div>
    `.trim()
});
