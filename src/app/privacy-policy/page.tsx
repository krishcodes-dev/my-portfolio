'use client';

export default function PrivacyPolicy() {
    return (
        <>
            <style jsx global>{`
        * {
          cursor: auto !important;
        }
        ::selection {
          background-color: #3b82f6;
          color: white;
        }
        ::-moz-selection {
          background-color: #3b82f6;
          color: white;
        }
      `}</style>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '40px 20px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                lineHeight: '1.6',
                color: '#000',
                backgroundColor: '#fff'
            }}>
                <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Privacy Policy</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>Last updated: February 4, 2026</p>

                <p>This Privacy Policy explains how information is collected, used, and protected when you visit krishsanghavi.dev (the "Website").</p>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Definitions and Key Terms</h2>
                <ul>
                    <li><strong>Website</strong> refers to krishsanghavi.dev</li>
                    <li><strong>User</strong> refers to anyone visiting or contacting through the Website</li>
                    <li><strong>Personal Data</strong> refers to information you voluntarily provide (name, email, message)</li>
                </ul>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Information We Collect</h2>
                <p>We collect information only when you voluntarily submit it through the contact form, including:</p>
                <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Message content</li>
                </ul>

                <p><strong>Automatically Collected Technical Information:</strong></p>
                <ul>
                    <li>IP address (for rate limiting and spam prevention)</li>
                    <li>Browser type and version</li>
                    <li>Device type (desktop/mobile)</li>
                    <li>Timestamp of form submission</li>
                </ul>

                <p><strong>We do NOT collect:</strong></p>
                <ul>
                    <li>Passwords or account credentials</li>
                    <li>Payment information</li>
                    <li>Social security numbers</li>
                    <li>Location data (GPS)</li>
                    <li>Browsing history or cookies</li>
                </ul>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>How We Use Your Information</h2>
                <p>The information you provide is used strictly to:</p>
                <ul>
                    <li>Respond to your inquiries</li>
                    <li>Communicate regarding your message</li>
                    <li>Prevent spam and abuse</li>
                </ul>

                <p><strong>We do NOT:</strong></p>
                <ul>
                    <li>Send newsletters or marketing emails</li>
                    <li>Share or sell your data</li>
                    <li>Profile users for advertising</li>
                    <li>Track your behavior across websites</li>
                </ul>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Spam Prevention & Rate Limiting</h2>
                <p>To protect against spam and abuse, we implement:</p>
                <ul>
                    <li>Rate limiting (maximum 3 contact form submissions per minute from the same IP address)</li>
                    <li>Input validation and sanitization</li>
                    <li>Server-side security checks</li>
                </ul>
                <p>Your IP address may be temporarily stored for rate limiting purposes and is automatically deleted after 24-48 hours.</p>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Cookies & Tracking Technologies</h2>
                <p>This Website does not use cookies for tracking, analytics, or advertising purposes.</p>

                <p><strong>Essential Functionality Only:</strong></p>
                <p>The Website may use browser storage solely for:</p>
                <ul>
                    <li>Remembering form submission status (to show success/error messages)</li>
                    <li>Preventing duplicate form submissions</li>
                </ul>
                <p>This data is stored only in your browser and is never transmitted to our servers.</p>

                <p><strong>We do NOT use:</strong></p>
                <ul>
                    <li>Google Analytics</li>
                    <li>Facebook Pixel</li>
                    <li>Retargeting tools</li>
                    <li>Advertising trackers</li>
                    <li>Third-party cookies</li>
                </ul>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Third-Party Services</h2>
                <p>This Website uses the following third-party services:</p>

                <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Hosting & Infrastructure</h3>
                <p><strong>Vercel</strong> (https://vercel.com) - Website hosting and deployment</p>
                <ul>
                    <li>Data processed: Request metadata and server logs</li>
                    <li>Privacy Policy: https://vercel.com/legal/privacy-policy</li>
                </ul>

                <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Email Delivery</h3>
                <p><strong>Resend</strong> (https://resend.com) - Contact form email delivery</p>
                <ul>
                    <li>Data processed: Name, email address, message content</li>
                    <li>Privacy Policy: https://resend.com/legal/privacy-policy</li>
                </ul>

                <p>These services process data only as required to provide functionality and are bound by their respective privacy policies.</p>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Data Security</h2>
                <p>We implement the following security measures:</p>

                <p><strong>Technical Protections:</strong></p>
                <ul>
                    <li>HTTPS/TLS encryption for all data transmission</li>
                    <li>Server-side input validation and sanitization</li>
                    <li>Rate limiting to prevent spam and abuse</li>
                    <li>XSS (Cross-Site Scripting) protection</li>
                    <li>CSRF (Cross-Site Request Forgery) protection</li>
                </ul>

                <p><strong>Organizational Measures:</strong></p>
                <ul>
                    <li>Access to submitted data limited to site owner only</li>
                    <li>No sharing of data with third parties (except email service provider)</li>
                    <li>Regular security updates and dependency audits</li>
                </ul>

                <p><strong>Important:</strong> No system can be guaranteed 100% secure. While we follow industry best practices, you should not submit highly sensitive information (e.g., passwords, financial data) through the contact form.</p>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Data Retention</h2>
                <p><strong>Contact Form Submissions:</strong></p>
                <ul>
                    <li>Retained for up to 12 months from submission date</li>
                    <li>Retained longer only if ongoing correspondence is active</li>
                    <li>You may request deletion at any time</li>
                </ul>

                <p><strong>Technical Logs (IP addresses, timestamps):</strong></p>
                <ul>
                    <li>Retained for 24-48 hours for spam prevention</li>
                    <li>Automatically deleted after this period</li>
                </ul>

                <p><strong>Email Records:</strong></p>
                <ul>
                    <li>Emails sent via contact form are retained in email inbox according to standard email retention</li>
                    <li>Subject to deletion upon request</li>
                </ul>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Your Rights</h2>
                <p>You have the following rights regarding your personal data:</p>
                <ul>
                    <li><strong>Right to Access:</strong> Request a copy of the data we hold about you</li>
                    <li><strong>Right to Correction:</strong> Request correction of inaccurate information</li>
                    <li><strong>Right to Deletion:</strong> Request deletion of your data</li>
                    <li><strong>Right to Object:</strong> Object to processing of your data</li>
                    <li><strong>Right to Data Portability:</strong> Request your data in a portable format</li>
                </ul>

                <p><strong>To exercise these rights:</strong> Contact me with your request. I will respond within 30 days.</p>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>International Data Transfers (GDPR)</h2>
                <p>If you are located in the European Economic Area (EEA), please note:</p>
                <ul>
                    <li>Your data may be transferred to and processed in the United States</li>
                    <li>Data processing is based on your consent when submitting the contact form</li>
                    <li>You have the right to lodge a complaint with your local data protection authority</li>
                </ul>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Children's Privacy</h2>
                <p>This Website is not intended for children under 13. We do not knowingly collect personal information from children.</p>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Changes to This Privacy Policy</h2>
                <p>This Privacy Policy may be updated occasionally. Changes will be reflected on this page with an updated revision date.</p>

                <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>Contact</h2>
                <p>For questions regarding this Privacy Policy or to exercise your data rights, you may use the Website's contact form.</p>

                <p style={{ marginTop: '40px', color: '#666' }}>© 2026 Krish Sanghavi. All rights reserved.</p>
            </div>
        </>
    );
}
