"use client";

import Link from "next/link";
import {
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/30 transition-all">
                <Sparkles className="text-primary w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tighter">
                Salescope
              </span>
            </Link>
            <p className="text-sm font-medium opacity-40 max-w-sm leading-relaxed">
              The next-generation sales intelligence platform.
              Precision-engineered for high-performance teams who demand
              absolute clarity in their commercial ecosystems.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all opacity-40 hover:opacity-100"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
              Nexus Nodes
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Neural Dashboard", href: "/dashboard" },
                { label: "Asset Ledger", href: "/dashboard/products" },
                { label: "Transaction Core", href: "/dashboard/registersale" },
                {
                  label: "Predictive Engines",
                  href: "/dashboard/analysisandpredictions",
                },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold opacity-40 hover:opacity-100 hover:text-primary transition-all flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
              Legal Protocol
            </h4>
            <ul className="space-y-4">
              {[
                "Master Service Agreement",
                "Privacy Sovereignty",
                "Compliance Ledger",
                "System Status",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm font-bold opacity-40 hover:opacity-100 transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
            © {currentYear} Salescope Intelligence Systems. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Systems Operational
            </span>
            <span>Build v3.4.2-Premium</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
