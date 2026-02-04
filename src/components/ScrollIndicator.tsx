"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-[1px] h-8 bg-gradient-to-b from-gray-500 to-transparent"
            />
        </motion.div>
    );
}
