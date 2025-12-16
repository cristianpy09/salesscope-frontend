import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer",
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && "cursor-not-allowed opacity-70",
        className
      )}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
}


const baseStyles =
  "select-none focus:ring-blue-400";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#5bb017] hover:bg-[#64c219]",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger:
    "bg-red-500 text-white hover:bg-red-600",
  ghost:
    "bg-transparent text-blue-600 hover:bg-blue-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

/* ───────────────── Spinner ───────────────── */

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
  );
}
