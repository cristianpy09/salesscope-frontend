"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";

import { BarChart3, ShieldCheck, Brain, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold leading-tight">
              Take control of your sales.
              <span className="block text-primary">
                Make better decisions.
              </span>
            </h1>
            <p className="mt-6 text-lg text-base-content/70">
              SalesScope is an intelligent dashboard to analyze sales,
              products, and trends in real time.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/login">
                <Button size="lg" className="rounded-2xl">
                  Get started
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="primary" size="lg" className="rounded-2xl">
                  View demo
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img
              src="/dashboard-preview.png"
              alt="Dashboard preview"
              className="relative rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-base-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold">
              Meet your intelligent assistant
            </h2>
            <p className="mt-4 text-base-content/70">
              Our AI assistant analyzes your sales and gives you clear
              recommendations to increase revenue, optimize inventory,
              and anticipate trends.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>✔ Personalized tips based on your metrics</li>
              <li>✔ Alerts for sales drops or spikes</li>
              <li>✔ Simple explanations, no technical jargon</li>
            </ul>
            <Button size="lg" className="mt-8 rounded-2xl">
              Talk to the assistant
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img
              src="/ai-assistant/idle.png"
              alt="AI Assistant"
              className="relative w-80 drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

   
      <section className="py-24 bg-base-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">
            Everything you need in one place
          </h2>
          <p className="mt-4 text-center text-base-content/70">
            Designed for teams that need clarity and speed.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Real-time analytics",
                desc: "Visualize key metrics and sales instantly.",
              },
              {
                icon: Brain,
                title: "AI-powered predictions",
                desc: "Anticipate trends and make smarter decisions.",
              },
              {
                icon: Zap,
                title: "Fast & modern",
                desc: "Optimized interface with smooth animations.",
              },
              {
                icon: ShieldCheck,
                title: "Secure",
                desc: "Built-in authentication and role management.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card></Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            Start scaling your business today
          </motion.h2>
          <p className="mt-4 text-base-content/70">
            Centralize your data and get actionable insights from day one.
          </p>
          <Link href="/register">
            <Button size="lg" className="mt-8 rounded-2xl">
              Create free account
            </Button>
          </Link>
        </div>
      </section>

    
      <footer className="py-10 bg-base-200 text-center text-sm text-base-content/60">
        © {new Date().getFullYear()} SalesScope. All rights reserved.
      </footer>
    </div>
  );
}
