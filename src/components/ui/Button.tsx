import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "error"
  | "outline"
  | "glow";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const variantMap: Record<ButtonVariant, string> = {
    primary: "btn-primary shadow-lg shadow-primary/20",
    secondary: "btn-secondary shadow-lg shadow-secondary/20",
    accent: "btn-accent shadow-lg shadow-accent/20",
    ghost: "btn-ghost hover:bg-white/5",
    error: "btn-error shadow-lg shadow-error/20",
    outline: "btn-outline border-white/20 hover:bg-white/5",
    glow: "bg-primary text-primary-content hover:scale-105 glow-primary border-none",
  };

  const sizeMap: Record<ButtonSize, string> = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        "btn normal-case font-bold transition-all duration-300 active:scale-95",
        variantMap[variant],
        sizeMap[size],
        isLoading && "btn-disabled opacity-50",
        className,
      )}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <>
          {leftIcon && (
            <span className="inline-flex transition-transform group-hover:-translate-x-1">
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className="inline-flex transition-transform group-hover:translate-x-1">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
