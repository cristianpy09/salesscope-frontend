"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ShoppingCart,
  Package,
  LineChart,
  Settings,
  ChevronRight,
  Database,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview", Icon: Home },
    {
      href: "/dashboard/registersale",
      label: "Sales Entry",
      Icon: ShoppingCart,
    },
    { href: "/dashboard/products", label: "Inventory", Icon: Package },
    {
      href: "/dashboard/analysisandpredictions",
      label: "Predictive AI",
      Icon: LineChart,
    },
    { href: "/dashboard/database", label: "Datasets", Icon: Database },
  ];

  return (
    <aside
      className={`${className} glass-panel w-72 h-[calc(100vh-2rem)] sticky top-4 mb-4 ml-4 rounded-3xl flex flex-col premium-shadow overflow-hidden border border-white/5`}
    >
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <LineChart className="text-black w-6 h-6" />
          </div>
          <span className="text-xl font-extrabold tracking-tighter bg-linear-to-br from-white to-white/60 bg-clip-text text-transparent">
            SALESCOPE
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">
          Management
        </div>

        {links.map(({ href, label, Icon }, index) => {
          const isActive = pathname === href;

          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
              }}
            >
              <Link
                href={href}
                className={`relative flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 group
                  ${isActive ? "text-primary bg-primary/5 shadow-inner" : "text-white/50 hover:text-white hover:bg-white/5"}`}
              >
                <div className="flex items-center gap-4 z-10">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-500 group-hover:scale-110 ${isActive ? "text-primary" : "opacity-50"}`}
                  />
                  <span>{label}</span>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 bg-primary/5 rounded-2xl border border-primary/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                      <ChevronRight className="w-4 h-4 text-primary z-10" />
                    </>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-2xl bg-linear-to-br from-primary/10 to-transparent border border-primary/10">
          <p className="text-xs font-bold text-primary mb-1">
            Upgrade to Enterprise
          </p>
          <p className="text-[10px] opacity-50 mb-3">
            Unlock predictive modeling and multi-user sync.
          </p>
          <button className="w-full py-2 bg-primary text-black text-[10px] font-bold rounded-lg hover:scale-105 active:scale-95 transition-all">
            Get Started
          </button>
        </div>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-4 mt-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all group"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          <span className="text-sm font-bold">Workspace Settings</span>
        </Link>
      </div>
    </aside>
  );
}
