"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-base-200 text-base-content"
    >
      <div className="max-w-screen-xl mx-auto px-8 py-8 grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <Image
            src="/img/Logo.png"
            alt="SaleScope Logo"
            width={160}
            height={50}
            priority
          />

          <p className="text-sm opacity-80 leading-relaxed">
            <span className="font-semibold">SaleScope</span> helps businesses
            manage products, track sales, and turn data into actionable insights
            through analytics and predictive intelligence.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-3 text-sm tracking-wide">
            Navigation
          </h3>
          <ul className="space-y-1 text-sm opacity-85">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/registersale"
                className="hover:text-primary transition-colors"
              >
                Register Sale
              </Link>
            </li>
            <li>
              <Link
                href="/analysisandpredictions"
                className="hover:text-primary transition-colors"
              >
                Analysis & Predictions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm tracking-wide">Legal</h3>
          <ul className="space-y-1 text-sm opacity-80">
            <li>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-300/30 py-2 text-center text-[11px] opacity-65">
        © {new Date().getFullYear()} SaleScope
      </div>
    </motion.footer>
  );
}
