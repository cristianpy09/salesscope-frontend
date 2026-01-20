"use client";

import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  Globe,
  Search,
  User,
  Settings,
  Building,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Refs for clicking outside
  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel rounded-2xl mx-auto max-w-7xl px-4 flex items-center h-16 pointer-events-auto premium-shadow relative"
      >
        {/* Left Side: Brand/Logo (Mobile toggle only if on small screen) */}
        <div className="flex flex-1 items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 cursor-pointer rounded-xl block lg:hidden hover:bg-white/5 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>

          <Link href="/" className="hidden lg:flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/30 transition-all">
              <span className="text-primary font-black text-xs">S</span>
            </div>
          </Link>
        </div>

        {/* Center: Integrated Spotlight Search */}
        <div className="hidden md:flex flex-2 justify-center">
          <div
            className={`relative flex items-center transition-all duration-300 ${
              isSearchFocused ? "w-80" : "w-64"
            }`}
          >
            <div
              className={`absolute inset-0 bg-primary/5 rounded-full blur-xl transition-opacity duration-300 ${isSearchFocused ? "opacity-100" : "opacity-0"}`}
            />
            <Search
              className={`absolute left-3 w-4 h-4 transition-colors duration-300 ${isSearchFocused ? "text-primary" : "opacity-30"}`}
            />
            <input
              type="text"
              placeholder="Command + K to search"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full h-10 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 text-xs font-bold transition-all placeholder:opacity-20 focus:outline-none focus:border-primary/30 focus:bg-white/10"
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex flex-1 items-center justify-end gap-3">
          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              <Globe className="w-4 h-4 opacity-70" />
              <span className="hidden sm:inline font-bold text-[11px] uppercase tracking-widest opacity-80">
                EN
              </span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? "rotate-180" : "opacity-40"}`}
              />
            </motion.button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-4 w-48 glass-panel border border-white/10 rounded-2xl shadow-2xl p-2 z-60 overflow-hidden"
                >
                  <p className="px-3 py-2 text-[10px] font-black uppercase tracking-widest opacity-30">
                    Select Language
                  </p>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-5 h-5 rounded-sm overflow-hidden border border-white/10 relative">
                      <Image
                        fill
                        src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
                        alt="ES"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-bold group-hover:text-primary transition-colors">
                      Español
                    </span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-5 h-5 rounded-sm overflow-hidden border border-white/10 relative">
                      <Image
                        fill
                        src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
                        alt="EN"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-bold text-primary">
                      English
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-4 bg-white/10 mx-1 hidden sm:block" />

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-white/5 transition-all group"
            >
              <div className="avatar">
                <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                  <Image
                    fill
                    alt="avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-black text-[11px] tracking-tight leading-none mb-0.5">
                  {session?.user?.name ?? "User"}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-bold leading-none">
                  Pro Plan
                </span>
              </div>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : "opacity-40"}`}
              />
            </motion.button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-4 w-60 glass-panel border border-white/10 rounded-2xl shadow-2xl p-2 z-60 overflow-hidden"
                >
                  <div className="px-3 py-2 mb-2">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">
                      Session Profile
                    </p>
                  </div>

                  <div className="space-y-1">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 opacity-40 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold">
                          Profile Settings
                        </span>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4 opacity-40 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold">
                          Security Nodes
                        </span>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-3">
                        <Building className="w-4 h-4 opacity-40 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold">Organization</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-md font-bold">
                        HQ
                      </span>
                    </button>
                  </div>

                  <div className="h-px bg-white/5 my-2 mx-1" />

                  <button
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors group"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="w-4 h-4 text-red-500/50 group-hover:text-red-500 transition-colors" />
                    <span className="text-xs font-bold text-red-500/70 group-hover:text-red-500 transition-colors">
                      Terminate Session
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/60 z-[-1] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-72 h-full bg-base-200 border-r border-white/5 p-6 space-y-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                  <span className="text-primary font-black">S</span>
                </div>
                <span className="text-lg font-black tracking-tighter uppercase">
                  Salescope
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-30 px-2">
                  Navigation
                </p>
                <div className="space-y-1 text-sm font-bold opacity-60">
                  {/* We can map sidebar links here or keep it simple */}
                  <Link
                    href="/dashboard"
                    className="block p-3 rounded-xl hover:bg-white/5"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/products"
                    className="block p-3 rounded-xl hover:bg-white/5"
                  >
                    Inventory
                  </Link>
                  <Link
                    href="/dashboard/registersale"
                    className="block p-3 rounded-xl hover:bg-white/5"
                  >
                    Transactions
                  </Link>
                  <Link
                    href="/dashboard/analysisandpredictions"
                    className="block p-3 rounded-xl hover:bg-white/5"
                  >
                    Analysis
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
