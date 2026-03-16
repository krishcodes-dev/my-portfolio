"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-6 lg:px-24 w-full border-t border-neutral-900 bg-black/20 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-sm text-neutral-500 font-light flex items-center gap-3"
                >
                    <span>© {currentYear} Krish Sanghavi. All rights reserved.</span>
                    <span className="text-neutral-700">|</span>
                    <Link
                        href="/privacy-policy"
                        className="hover:text-white transition-colors underline"
                    >
                        Privacy Policy
                    </Link>
                </motion.div>

                <div className="flex gap-6">
                    <a href="https://github.com/krishcodes-dev" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-white transition-colors">GitHub</a>
                    <a href="https://www.linkedin.com/in/krishsanghavi0909/" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://www.instagram.com/krishsanghavi_/" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-white transition-colors">Instagram</a>
                </div>

            </div>
        </footer>
    );
}
