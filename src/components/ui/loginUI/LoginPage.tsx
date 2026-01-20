"use client";

import Link from "next/link";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Handshake denied. Credentials required.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Verifying identity...");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      toast.dismiss(loadingToast);

      if (res?.error) {
        toast.error("Access denied. Invalid signature.");
        setLoading(false);
        return;
      }

      toast.success("Identity verified. Welcome back.");
      router.push("/dashboard");
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Neural link failed. Retry later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden premium-shadow"
      >
        {/* Left Section: Branding & Info */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-linear-to-br from-white/5 to-transparent border-r border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
              <Sparkles className="text-primary w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter">
              Salescope
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black leading-[1.1] tracking-tighter bg-linear-to-br from-white to-white/40 bg-clip-text text-transparent">
              Accelerate your <br /> Sales Velocity.
            </h2>
            <p className="text-lg font-medium opacity-40 max-w-sm">
              Unlock deep analytics and real-time intelligence for your
              high-performance enterprise.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold opacity-30 uppercase tracking-[0.2em]">
            <span>Latency: 24ms</span>
            <span>•</span>
            <span>Secure Shell v3</span>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="p-10 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tight mb-2">
              Initialize Session
            </h1>
            <p className="text-sm font-medium opacity-40">
              Provide your credentials to access the nexus.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
                Universal ID
              </label>
              <Input
                type="email"
                placeholder="identity@salescope.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                leftIcon={<Mail className="w-4 h-4" />}
                className="h-14 rounded-2xl"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40">
                  Encryption Key
                </label>
                <Link
                  href="#"
                  className="text-[10px] font-bold text-primary uppercase tracking-widest hover:brightness-125 transition-all"
                >
                  Reset Access
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                leftIcon={<Lock className="w-4 h-4" />}
                className="h-14 rounded-2xl"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                variant="glow"
                disabled={loading}
                className="w-full h-16 rounded-2xl text-lg font-black"
                rightIcon={!loading && <ArrowRight className="w-5 h-5 ml-1" />}
              >
                {loading ? "Authenticating..." : "Authorize Access"}
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-center text-xs font-bold opacity-40 uppercase tracking-widest mt-8"
            >
              Don’t have a terminal yet?{" "}
              <Link
                href="/register"
                className="text-primary hover:brightness-125 transition-all ml-1"
              >
                Establish Link
              </Link>
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
