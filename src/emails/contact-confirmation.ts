interface ConfirmationEmailProps {
  name: string;
  email: string;
}

export const confirmationEmail = ({ name, email }: ConfirmationEmailProps) => ({
  subject: `Thanks for reaching out, ${name}!`,
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
    backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 28px;
    border: 1px solid rgba(148, 163, 184, 0.35);
  ">

    <p style="
      margin: 0 0 8px 0;
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #a5b4fc;
    ">
      Contact confirmation
    </p>

    <h2 style="
      margin: 12px 0 12px 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #ffffff 0%, #60a5fa 40%, #22d3ee 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    ">
      Thank you, ${name}
    </h2>

    <p style="
      line-height: 1.7;
      color: #e2e8f0;
      font-size: 15px;
      margin: 12px 0 18px 0;
    ">
      Your message has been received successfully. I appreciate you taking the time to get in touch.
    </p>

    <div style="
      background: linear-gradient(135deg, rgba(96, 165, 250, 0.16), rgba(129, 140, 248, 0.18));
      border: 1px solid rgba(96, 165, 250, 0.4);
      padding: 18px 20px;
      border-radius: 10px;
      margin: 24px 0;
      backdrop-filter: blur(10px);
    ">
      <p style="
        margin: 0;
        font-size: 14px;
        color: #e0e7ff;
        line-height: 1.7;
      ">
        <strong style="
          color: #bfdbfe;
          font-size: 14px;
          display: block;
          margin-bottom: 6px;
        ">What happens next</strong>
        I review all messages personally and typically respond within
        <strong style="color: #ffffff;">24–48 hours</strong>. If your inquiry is time‑sensitive, I will do my best to get back to you as soon as possible.
      </p>
    </div>

    <p style="
      line-height: 1.7;
      color: #e2e8f0;
      font-size: 15px;
      margin: 18px 0;
    ">
      In the meantime, you can learn more about my work and recent projects here:
    </p>

    <ul style="
      list-style: none;
      padding: 0;
      margin: 0 0 24px 0;
    ">
      <li style="margin-bottom: 8px;">
        <a href="https://krishcodes.dev" style="
          color: #60a5fa;
          text-decoration: none;
          border-bottom: 1px solid rgba(96, 165, 250, 0.35);
        ">
          Portfolio — krishcodes.dev
        </a>
      </li>
      <li>
        <a href="https://github.com/krishcodes-dev" style="
          color: #60a5fa;
          text-decoration: none;
          border-bottom: 1px solid rgba(96, 165, 250, 0.35);
        ">
          GitHub — @krishcodes-dev
        </a>
      </li>
    </ul>

    <div style="
      margin-top: 24px;
      padding-top: 18px;
      border-top: 1px solid rgba(148, 163, 184, 0.35);
    ">
      <p style="
        margin: 0 0 4px 0;
        font-size: 15px;
        color: #f9fafb;
        font-weight: 500;
      ">
        Best regards,
      </p>
      <p style="
        margin: 0 0 12px 0;
        font-size: 15px;
        color: #e5e7eb;
      ">
        Krish Sanghavi
      </p>

      <p style="
        font-size: 11px;
        color: #94a3b8;
        margin: 0;
        font-style: italic;
      ">
        This is an automated confirmation sent from the contact form on krishcodes.dev. No further action is required from your side.
      </p>
    </div>

  </div>

  <div style="
    text-align: center;
    margin-top: 16px;
    padding-top: 10px;
  ">
    <p style="
      font-size: 11px;
      color: #64748b;
      margin: 0;
    ">
      © 2026 <span style="color: #60a5fa;">krishcodes.dev</span>
    </p>
  </div>
</div>
    `.trim()
});
