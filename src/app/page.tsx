"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";
import {
  TrendingUp,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const features = [
    {
      title: "Real-time Analytics",
      desc: "Instant insights into your sales performance with zero delay.",
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      size: "col-span-1 md:col-span-2",
    },
    {
      title: "AI Predictions",
      desc: "Forecast trends with enterprise-grade machine learning.",
      icon: <Sparkles className="w-6 h-6 text-accent" />,
      size: "col-span-1",
    },
    {
      title: "Smart Inventory",
      desc: "Automated stock alerts and lifecycle tracking.",
      icon: <Layers className="w-6 h-6 text-secondary" />,
      size: "col-span-1",
    },
    {
      title: "Bulletproof Security",
      desc: "End-to-end encryption for your sensitive financial data.",
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      size: "col-span-1 md:col-span-2",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content selection:bg-primary selection:text-black">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden text-center">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700" />
          </div>

          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                Powered by Salescope AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
            >
              Visualize your <br />
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Sales Galaxy.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg md:text-xl opacity-50 mb-12 font-medium"
            >
              The enterprise-grade dashboard that transforms your fragmented
              sales data into luminous, actionable clarity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/login">
                <Button
                  variant="glow"
                  size="lg"
                  className="px-8 h-16 text-lg rounded-2xl"
                  rightIcon={<ArrowRight />}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 h-16 text-lg rounded-2xl border-white/10 hover:border-white/20"
                >
                  View Demo
                </Button>
              </Link>
            </motion.div>

            {/* Dashboard Mockup Preview */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-24 relative group"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-primary/50 to-secondary/50 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-base-200 border border-white/10 rounded-3xl overflow-hidden glass-panel aspect-video md:aspect-video lg:aspect-21/9">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <BarChart3 className="w-64 h-64" />
                </div>
                {/* Internal Mockup Decor */}
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-32 bg-base-100 relative">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
                Atomic Features.
              </h2>
              <p className="text-lg opacity-40">
                Everything you need to dominate your market landscape.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`glass-panel rounded-3xl p-8 border border-white/5 group hover:border-primary/20 transition-all duration-500 ${f.size}`}
                >
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{f.title}</h3>
                  <p className="opacity-40 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">
              Ready to <br />
              <span className="text-primary">Evolve?</span>
            </h2>
            <Link href="/login">
              <Button
                variant="glow"
                size="lg"
                className="px-12 h-20 text-xl font-black rounded-4xl"
              >
                Join Salescope Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-base-100/50 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-black text-xs">
              S
            </div>
            <span className="font-extrabold tracking-tighter">SALESCOPE</span>
          </div>
          <div className="flex gap-8 text-sm font-bold opacity-40">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Contact
            </a>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-30 font-bold">
            © 2026 Salescope. Built for the future.
          </p>
        </div>
      </footer>
    </div>
  );
}
