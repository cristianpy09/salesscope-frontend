"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnimatedPageProps = {
  children: ReactNode;
};

export default function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
