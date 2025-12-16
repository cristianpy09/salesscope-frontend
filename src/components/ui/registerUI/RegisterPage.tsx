"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "../Button";
import toast from "react-hot-toast"; 

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.full_name || !form.email || !form.password) {
      toast.error("Please fill in all fields.", {icon:"❗"}); 
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: form.full_name,
            email: form.email,
            password: form.password,
            role_name: "customer",
          }),
        }
      );

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (!res.ok) {
        toast.error(data.message || "Error registering user", {icon:"⚠️"}); 
        return;
      }

    toast.success("Product created succesfully", { icon: "✅" });
      router.push("/login"); 
    } catch (error) {
      console.error(error);
      toast.error("Backend connection error",{icon:"🚨"}); 
    }
  };

  return (
    <div className="flex justify-center p-10">
      <div className="grid grid-cols-2 w-280 rounded-xl bg-base-200">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/img/register.png"
              alt="Login illustration"
              width={500}
              height={700}
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>

        <div className=" flex items-center justify-center rounded-md ">
          <motion.form
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-md mx-auto mt-5 p-2 flex justify-center flex-col"
            onSubmit={handleSubmit}
          >
            <motion.div variants={item}>
              <Image
                src="/img/Logo.png"
                width={300}
                height={200}
                alt="SaleScope Logo"
                className=" flex items-center mx-auto"
              />
            </motion.div>
            <motion.h2
              variants={item}
              className="text-2xl font-bold mb-4 text-center"
            >
              Register in SalesScope
            </motion.h2>

            <div className="mb-4 space-y-5">
              <label id="name">Full Name</label>
              <input
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
                type="text"
                placeholder="Full name"
                className="w-full p-3 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#4880FF]"
              />
              <label id="email"> Email</label>
              <input
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="text"
                placeholder="example@example.com"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:secundary"
              />

              <label id="password">Password</label>
              <input
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
                placeholder="********"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:secundary"
              />

              <Button className=" w-full  p-3 rounded-xl   font-bold mt-4 ">
                Register
              </Button>

              <motion.p variants={item} className="text-center mt-5">
                Do you already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </motion.p>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
