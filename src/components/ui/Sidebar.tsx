"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  QueueListIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", Icon: HomeIcon },
    {
      href: "/dashboard/registersale",
      label: "Register sale",
      Icon: ClipboardDocumentListIcon,
    },
    { href: "/dashboard/products", label: "Products", Icon: QueueListIcon },
    {
      href: "/dashboard/analysisandpredictions",
      label: "Analysis and Predictions",
      Icon: PresentationChartBarIcon,
    },
  ];

  return (
    <aside className={`${className} bg-base-200 w-64 min-h-screen shadow-md`}>
      <div className="h-20 flex items-center justify-center">
        <img src="/img/Logo.png" alt="logo" className="w-65" />
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {links.map(({ href, label, Icon }, index) => {
          const isActive = pathname === href;

          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 120,
              }}
            >
              <Link
                href={href}
                className="relative flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-md overflow-hidden hover:bg-base-100 hover:text-white transition-colors duration-200"
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-highlight"
                      className="absolute inset-0 bg-base-100 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    />
                  )}
                </AnimatePresence>

                <Icon
                  className={`w-5 h-5 z-10 ${
                    isActive ? "text-white" : "text-gray-700"
                  }`}
                />

                <span className="z-10">{label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
}
