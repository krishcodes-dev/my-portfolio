"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent, useRef, useEffect } from "react";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [selectedReason, setSelectedReason] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const validateForm = (formData: FormData) => {
        const newErrors: { [key: string]: string } = {};
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const reason = formData.get("reason") as string;
        const message = formData.get("message") as string;
        const company = formData.get("company") as string;

        if (!name || name.trim().length < 2) newErrors.name = "Name is required (min 2 chars)";
        if (name && name.length > 100) newErrors.name = "Name too long (max 100 chars)";

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Valid email required";
        if (email && email.length > 254) newErrors.email = "Email too long";

        if (!reason) newErrors.reason = "Please select a reason";

        if (!message || message.trim().length < 10) newErrors.message = "Message too short (min 10 chars)";
        if (message && message.length > 2000) newErrors.message = "Message too long (max 2000 chars)";

        if (company && company.length > 100) newErrors.company = "Company name too long (max 100 chars)";

        return newErrors;
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus("submitting");
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            setStatus("success");
            setSelectedReason("");
            e.currentTarget.reset();
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("Contact form error:", error);
            setStatus("error");
            // Show error for 8 seconds to ensure user sees it
            setTimeout(() => setStatus("idle"), 8000);
        }
    }

    // Subtle/Mature Error Tooltip
    const ErrorTooltip = ({ message }: { message: string }) => (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 -top-6 z-10"
        >
            <div className="text-red-400 text-xs font-medium tracking-wide flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-red-400" />
                {message}
            </div>
        </motion.div>
    );

    const inputClasses = (hasError: boolean) => `
        w-full bg-transparent border-b py-3 text-lg focus:outline-none transition-all duration-300 placeholder:text-neutral-700 font-light
        ${hasError ? 'border-red-500/50 text-red-100' : 'border-neutral-800 focus:border-white text-white'}
    `;

    const labelClasses = "text-xs font-medium text-neutral-500 uppercase tracking-widest mb-2 block";

    // Dropdown options
    const reasonOptions = [
        { value: "Job Opportunity", label: "Job / Internship Opportunity" },
        { value: "Project Collaboration", label: "Project Collaboration" },
        { value: "Freelance Work", label: "Freelance / Contract Work" },
        { value: "General Question", label: "General Question" },
        { value: "Just Saying Hi", label: "Just Saying Hi 👋🏻" },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section id="contact" className="relative z-20 py-16 md:py-32 px-6 lg:px-24 w-full flex justify-center">
            <div className="w-full max-w-2xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight"
                >
                    Let&apos;s Talk
                </motion.h2>

                <motion.form
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-10 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12"
                >
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Name Field */}
                        <div className="relative group">
                            <label htmlFor="name" className={labelClasses}>Your Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Krish Sanghavi"
                                maxLength={100}
                                className={inputClasses(!!errors.name)}
                                onChange={() => errors.name && setErrors(prev => ({ ...prev, name: '' }))}
                            />
                            <AnimatePresence>
                                {errors.name && <ErrorTooltip message={errors.name} />}
                            </AnimatePresence>
                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                            <label htmlFor="email" className={labelClasses}>Your Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="[EMAIL_ADDRESS]"
                                maxLength={254}
                                className={inputClasses(!!errors.email)}
                                onChange={() => errors.email && setErrors(prev => ({ ...prev, email: '' }))}
                            />
                            <AnimatePresence>
                                {errors.email && <ErrorTooltip message={errors.email} />}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Company Field (Optional) */}
                        <div className="relative group">
                            <label htmlFor="company" className={labelClasses}>I work/study at <span className="text-neutral-700 normal-case tracking-normal ml-1">(Optional)</span></label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                placeholder="Google / Startup Name / University"
                                maxLength={100}
                                className={inputClasses(!!errors.company)}
                            />
                        </div>

                        {/* Reason Dropdown - Custom */}
                        <div className="relative group" ref={dropdownRef}>
                            <label htmlFor="reason" className={labelClasses}>Reason for reaching out</label>
                            <input type="hidden" name="reason" value={selectedReason} />

                            {/* Dropdown Trigger */}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDropdownOpen(!isDropdownOpen);
                                    if (errors.reason) setErrors(prev => ({ ...prev, reason: '' }));
                                }}
                                className={`${inputClasses(!!errors.reason)} w-full text-left flex items-center justify-between cursor-pointer`}
                            >
                                <span className={selectedReason ? "text-white" : "text-neutral-700"}>
                                    {selectedReason ? reasonOptions.find(o => o.value === selectedReason)?.label : "Select an option"}
                                </span>
                                <motion.svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    className="text-neutral-500"
                                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </motion.svg>
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 right-0 top-full mt-2 bg-neutral-900/95 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden z-50 shadow-xl"
                                    >
                                        {reasonOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedReason(option.value);
                                                    setIsDropdownOpen(false);
                                                    if (errors.reason) setErrors(prev => ({ ...prev, reason: '' }));
                                                }}
                                                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 first:pt-4 last:pb-4"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {errors.reason && <ErrorTooltip message={errors.reason} />}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Honeypot Field (Hidden from Users, Visible to Bots) */}
                    <input
                        type="text"
                        name="honeypot"
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                        aria-hidden="true"
                    />

                    {/* Message Field */}
                    <div className="relative group">
                        <label htmlFor="message" className={labelClasses}>Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            maxLength={2000}
                            placeholder="I have an awesome idea on my mind..."
                            className={`${inputClasses(!!errors.message)} min-h-[100px] resize-none`}
                            onChange={() => errors.message && setErrors(prev => ({ ...prev, message: '' }))}
                        />
                        <AnimatePresence>
                            {errors.message && <ErrorTooltip message={errors.message} />}
                        </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8 flex justify-center">
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {status === "submitting" ? (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    <span>Sending...</span>
                                </>
                            ) : status === "success" ? (
                                <span className="text-green-400">✓ Message Sent Successfully</span>
                            ) : status === "error" ? (
                                <span className="text-red-400">✗ Error Sending. Try Again.</span>
                            ) : (
                                <>
                                    <span>Start a Conversation</span>
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}
