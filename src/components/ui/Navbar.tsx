"use client";

import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="navbar bg-base-200 text-base-content shadow-sm h-16 px-4 flex items-center sticky top-0 z-50"
    >
      {/* Burger */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 mr-7 cursor-pointer rounded-md block lg:hidden"
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
      </motion.div>

      <div className="mr-200 w-100" />

      {/* Language */}
      <div className="dropdown dropdown-end mr-4">
        <motion.label
          tabIndex={0}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg
                     hover:bg-base-100 hover:text-white transition-colors duration-200"
        >
          <img
            className="w-11 rounded-md"
            alt="UK flag"
            src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
          />
          <span className="font-medium select-none">English</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.label>

        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-40 mt-3 cursor-pointer"
        >
          <li>
            <a>
              <img
                className="inline w-5 rounded-md mr-2"
                alt="Spanish flag"
                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
              />
              Spanish
            </a>
          </li>
          <li>
            <a>
              <img
                className="inline w-5 rounded-md mr-2"
                alt="English flag"
                src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
              />
              English
            </a>
          </li>
        </motion.ul>
      </div>

      {/* User */}
      <div className="dropdown dropdown-end ml-4">
        <motion.label
          tabIndex={0}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 cursor-pointer px-2 py-1 rounded-lg
                     hover:bg-base-100 hover:text-white transition-colors duration-200"
        >
          <div className="avatar">
            <div className="w-11 rounded-full">
              <img
                alt="avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-[15px]">
              {session?.user?.name ?? "User"}
            </span>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.label>

        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 mt-3 cursor-pointer"
        >
          <li>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              log out
            </button>
          </li>
        </motion.ul>
      </div>
    </motion.div>
  );
}
