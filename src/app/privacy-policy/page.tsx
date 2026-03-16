export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200">
            {/* Fixed back link */}
            <a
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200 group"
            >
                <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Portfolio
            </a>

            <div className="max-w-3xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
                <p className="text-neutral-500 mb-12 text-sm">Last updated: February 4, 2026</p>

                <p className="mb-8">This Privacy Policy explains how information is collected, used, and protected when you visit krishcodes.dev (the "Website").</p>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Definitions and Key Terms</h2>
                    <ul className="list-disc list-inside space-y-2 text-neutral-400">
                        <li><span className="text-neutral-200 font-medium">Website</span> refers to krishcodes.dev</li>
                        <li><span className="text-neutral-200 font-medium">User</span> refers to anyone visiting or contacting through the Website</li>
                        <li><span className="text-neutral-200 font-medium">Personal Data</span> refers to information you voluntarily provide (name, email, message)</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Information We Collect</h2>
                    <p className="mb-3">We collect information only when you voluntarily submit it through the contact form, including:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400 mb-6">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Message content</li>
                    </ul>
                    <p className="font-medium text-neutral-200 mb-3">Automatically Collected Technical Information:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400 mb-6">
                        <li>IP address (for rate limiting and spam prevention)</li>
                        <li>Browser type and version</li>
                        <li>Device type (desktop/mobile)</li>
                        <li>Timestamp of form submission</li>
                    </ul>
                    <p className="font-medium text-neutral-200 mb-3">We do NOT collect:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400">
                        <li>Passwords or account credentials</li>
                        <li>Payment information</li>
                        <li>Social security numbers</li>
                        <li>Location data (GPS)</li>
                        <li>Browsing history or cookies</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">How We Use Your Information</h2>
                    <p className="mb-3">The information you provide is used strictly to:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400 mb-6">
                        <li>Respond to your inquiries</li>
                        <li>Communicate regarding your message</li>
                        <li>Prevent spam and abuse</li>
                    </ul>
                    <p className="font-medium text-neutral-200 mb-3">We do NOT:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400">
                        <li>Send newsletters or marketing emails</li>
                        <li>Share or sell your data</li>
                        <li>Profile users for advertising</li>
                        <li>Track your behavior across websites</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Spam Prevention &amp; Rate Limiting</h2>
                    <p className="mb-3">To protect against spam and abuse, we implement:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400 mb-4">
                        <li>Rate limiting (maximum 3 contact form submissions per minute from the same IP address)</li>
                        <li>Input validation and sanitization</li>
                        <li>Server-side security checks</li>
                    </ul>
                    <p className="text-neutral-400">Your IP address may be temporarily stored for rate limiting purposes and is automatically deleted after 24–48 hours.</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Cookies &amp; Tracking Technologies</h2>
                    <p className="mb-4">This Website does not use cookies for tracking, analytics, or advertising purposes.</p>
                    <p className="font-medium text-neutral-200 mb-3">Essential Functionality Only:</p>
                    <p className="mb-3 text-neutral-400">The Website may use browser storage solely for:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400 mb-4">
                        <li>Remembering animation state (boot sequence)</li>
                        <li>Preventing duplicate form submissions</li>
                    </ul>
                    <p className="text-neutral-400">This data is stored only in your browser and is never transmitted to our servers.</p>
                    <p className="font-medium text-neutral-200 mt-4 mb-3">We do NOT use:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400">
                        <li>Google Analytics</li>
                        <li>Facebook Pixel</li>
                        <li>Retargeting tools</li>
                        <li>Advertising trackers</li>
                        <li>Third-party cookies</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Third-Party Services</h2>
                    <p className="mb-6">This Website uses the following third-party services:</p>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-base font-medium text-neutral-200 mb-2">Hosting &amp; Infrastructure</h3>
                            <p className="text-neutral-400"><span className="text-white font-medium">Vercel</span> — Website hosting and deployment</p>
                            <ul className="list-disc list-inside space-y-1 text-neutral-500 text-sm mt-1">
                                <li>Data processed: Request metadata and server logs</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-neutral-200 mb-2">Email Delivery</h3>
                            <p className="text-neutral-400"><span className="text-white font-medium">Resend</span> — Contact form email delivery</p>
                            <ul className="list-disc list-inside space-y-1 text-neutral-500 text-sm mt-1">
                                <li>Data processed: Name, email address, message content</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Data Security</h2>
                    <p className="font-medium text-neutral-200 mb-3">Technical Protections:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400 mb-6">
                        <li>HTTPS/TLS encryption for all data transmission</li>
                        <li>Server-side input validation and sanitization</li>
                        <li>Rate limiting to prevent spam and abuse</li>
                        <li>XSS (Cross-Site Scripting) protection</li>
                        <li>CSRF (Cross-Site Request Forgery) protection</li>
                    </ul>
                    <p className="font-medium text-neutral-200 mb-3">Organizational Measures:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400 mb-6">
                        <li>Access to submitted data limited to site owner only</li>
                        <li>No sharing of data with third parties (except email service provider)</li>
                        <li>Regular security updates and dependency audits</li>
                    </ul>
                    <p className="text-neutral-500 text-sm italic">No system can be guaranteed 100% secure. While we follow industry best practices, you should not submit highly sensitive information through the contact form.</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Data Retention</h2>
                    <div className="space-y-4 text-neutral-400">
                        <div>
                            <p className="font-medium text-neutral-200 mb-1">Contact Form Submissions</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Retained for up to 12 months from submission date</li>
                                <li>You may request deletion at any time</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-medium text-neutral-200 mb-1">Technical Logs (IP addresses, timestamps)</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Retained for 24–48 hours for spam prevention</li>
                                <li>Automatically deleted after this period</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Your Rights</h2>
                    <ul className="list-disc list-inside space-y-2 text-neutral-400">
                        <li><span className="text-neutral-200 font-medium">Right to Access:</span> Request a copy of the data we hold about you</li>
                        <li><span className="text-neutral-200 font-medium">Right to Correction:</span> Request correction of inaccurate information</li>
                        <li><span className="text-neutral-200 font-medium">Right to Deletion:</span> Request deletion of your data</li>
                        <li><span className="text-neutral-200 font-medium">Right to Object:</span> Object to processing of your data</li>
                        <li><span className="text-neutral-200 font-medium">Right to Data Portability:</span> Request your data in a portable format</li>
                    </ul>
                    <p className="mt-4 text-neutral-400">To exercise these rights, use the Website&apos;s contact form. I will respond within 30 days.</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">International Data Transfers (GDPR)</h2>
                    <ul className="list-disc list-inside space-y-2 text-neutral-400">
                        <li>Your data may be transferred to and processed in the United States</li>
                        <li>Data processing is based on your consent when submitting the contact form</li>
                        <li>You have the right to lodge a complaint with your local data protection authority</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Children&apos;s Privacy</h2>
                    <p className="text-neutral-400">This Website is not intended for children under 13. We do not knowingly collect personal information from children.</p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Changes to This Policy</h2>
                    <p className="text-neutral-400">This Privacy Policy may be updated occasionally. Changes will be reflected on this page with an updated revision date.</p>
                </section>

                <section className="mb-16">
                    <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-white/10">Contact</h2>
                    <p className="text-neutral-400">For questions regarding this Privacy Policy or to exercise your data rights, use the <a href="/#contact" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">contact form</a> on the main site.</p>
                </section>

                <p className="text-neutral-600 text-sm">© 2026 Krish Sanghavi. All rights reserved.</p>
            </div>
        </div>
    );
}
