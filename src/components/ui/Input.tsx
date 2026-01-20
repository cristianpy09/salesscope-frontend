import React, { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className,
  containerClassName,
  ...props
}: InputProps) {
  return (
    <div className={clsx("form-control w-full space-y-2", containerClassName)}>
      {label && (
        <label className="label py-0">
          <span className="label-text font-bold uppercase tracking-widest text-[10px] opacity-40">
            {label}
          </span>
        </label>
      )}
      <div className="relative group">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
            {leftIcon}
          </div>
        )}
        <input
          className={clsx(
            "input w-full bg-white/5 border-white/10 rounded-xl transition-all duration-300",
            "focus:border-primary/50 focus:bg-white/8 focus:ring-4 focus:ring-primary/10 outline-none",
            leftIcon && "pl-12",
            rightIcon && "pr-12",
            error && "border-error focus:border-error focus:ring-error/10",
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <label className="label py-0">
          <span className="label-text-alt text-error font-semibold">
            {error}
          </span>
        </label>
      )}
    </div>
  );
}
