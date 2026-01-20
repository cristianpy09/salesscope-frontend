"use client";

import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ChevronDown, LogOut, Globe } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-6 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="navbar glass-panel rounded-2xl mx-auto max-w-7xl px-4 flex items-center h-16 pointer-events-auto premium-shadow"
      >
        <div className="flex-1">
          {/* Burger (hidden on large screens) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 mr-4 cursor-pointer rounded-xl block lg:hidden hover:bg-white/5 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Dropdown */}
          <div className="dropdown dropdown-end">
            <motion.label
              tabIndex={0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl
                         hover:bg-white/5 transition-all duration-300"
            >
              <Globe className="w-4 h-4 opacity-70" />
              <span className="font-semibold text-sm opacity-80">English</span>
              <ChevronDown className="w-4 h-4 opacity-40" />
            </motion.label>

            <motion.ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-2xl bg-base-200/95 backdrop-blur-xl border border-white/10 rounded-2xl w-48 mt-4 overflow-hidden"
            >
              <li className="menu-title px-4 py-2 text-xs uppercase tracking-widest opacity-40">
                Select Language
              </li>
              <li>
                <div className="flex gap-2 items-center py-3 active:bg-primary/20">
                  <span className="w-6 h-4 rounded-sm overflow-hidden border border-white/10 relative">
                    <Image
                      fill
                      className="object-cover"
                      src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
                      alt="Spain"
                    />
                  </span>
                  <span>Español</span>
                </div>
              </li>
              <li>
                <div className="flex gap-2 items-center py-3 active:bg-primary/20">
                  <span className="w-6 h-4 rounded-sm overflow-hidden border border-white/10 relative">
                    <Image
                      fill
                      className="object-cover"
                      src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
                      alt="UK"
                    />
                  </span>
                  <span>English</span>
                </div>
              </li>
            </motion.ul>
          </div>

          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <motion.label
              tabIndex={0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full
                         hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 opacity-80 group-hover:opacity-100 transition-opacity relative overflow-hidden">
                  <Image
                    fill
                    alt="avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-sm tracking-tight leading-none mb-0.5">
                  {session?.user?.name ?? "User"}
                </span>
                <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold leading-none">
                  Pro Plan
                </span>
              </div>

              <ChevronDown className="w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity" />
            </motion.label>

            <motion.ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-2xl bg-base-200/95 backdrop-blur-xl border border-white/10 rounded-2xl w-56 mt-4 overflow-hidden"
            >
              <li className="menu-title px-4 py-2 text-xs uppercase tracking-widest opacity-40">
                My Account
              </li>
              <li>
                <a className="py-3">Profile Settings</a>
              </li>
              <li>
                <a className="py-3">Organization</a>
              </li>
              <div className="h-px bg-white/5 my-1 mx-2" />
              <li>
                <button
                  className="flex gap-3 text-error hover:bg-error/10 py-3"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-bold">Log out</span>
                </button>
              </li>
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
