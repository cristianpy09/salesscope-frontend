"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "../Button";
import Input from "../Input";
import toast from "react-hot-toast";
import { User, Mail, Lock, Plus, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });
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
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.full_name || !form.email || !form.password) {
      toast.error("Initialization failed. Parameters missing.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Indexing new identity...");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            role_name: "customer",
          }),
        },
      );

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (!res.ok) {
        toast.error(data.message || "Protocol rejection.");
        setLoading(false);
        return;
      }

      toast.success("Identity indexed. Access granted.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Network synchronization failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden premium-shadow"
      >
        {/* Left Section: Form */}
        <div className="p-10 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 order-2 lg:order-1">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tight mb-2">
              Establish Identity
            </h1>
            <p className="text-sm font-medium opacity-40">
              Join the next generation of sales intelligence.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
                Full Legal Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
                disabled={loading}
                leftIcon={<User className="w-4 h-4" />}
                className="h-14 rounded-2xl"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
                Universal ID
              </label>
              <Input
                type="email"
                placeholder="identity@salescope.net"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={loading}
                leftIcon={<Mail className="w-4 h-4" />}
                className="h-14 rounded-2xl"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
                Secure Encryption
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                rightIcon={!loading && <Plus className="w-5 h-5 ml-1" />}
              >
                {loading ? "Indexing..." : "Initialize Profile"}
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-center text-xs font-bold opacity-40 uppercase tracking-widest mt-8"
            >
              Already have a terminal?{" "}
              <Link
                href="/login"
                className="text-primary hover:brightness-125 transition-all ml-1"
              >
                Secure Login
              </Link>
            </motion.p>
          </form>
        </div>

        {/* Right Section: Branding & Info */}
        <div className="flex flex-col justify-between p-12 bg-linear-to-br from-white/5 to-transparent order-1 lg:order-2">
          <div className="flex items-center gap-3 justify-end lg:justify-start">
            <span className="text-xl font-black tracking-tighter">
              Salescope
            </span>
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center border border-accent/20">
              <ShieldCheck className="text-accent w-5 h-5" />
            </div>
          </div>

          <div className="space-y-6 text-right lg:text-left">
            <h2 className="text-5xl font-black leading-[1.1] tracking-tighter bg-linear-to-br from-white to-white/40 bg-clip-text text-transparent">
              Expand your <br /> Sales Galaxy.
            </h2>
            <p className="text-lg font-medium opacity-40 max-w-sm ml-auto lg:ml-0">
              A highly optimized environment built for scale, precision, and
              velocity.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs font-bold opacity-30 uppercase tracking-[0.2em]">
            <span>Distributed Vault</span>
            <span>•</span>
            <span>AES-256 Protocol</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
