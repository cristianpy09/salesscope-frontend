import React, { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  title?: string;
  value?: number | string;
  subtitle?: string;
  percentage?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  variant?: "glass" | "solid" | "simple";
}

export default function Card({
  title,
  value,
  subtitle,
  percentage,
  icon,
  className,
  children,
  variant = "glass",
}: CardProps) {
  return (
    <div
      className={clsx(
        "card transition-all duration-500 premium-shadow group",
        variant === "glass" && "glass-panel hover:bg-white/8",
        variant === "solid" && "bg-base-200 border border-white/5",
        variant === "simple" && "bg-transparent border border-white/10",
        className,
      )}
    >
      <div className="card-body p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            {title && (
              <h3 className="card-title text-sm font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                {title}
              </h3>
            )}
            {value !== undefined && (
              <div className="text-4xl font-extrabold tracking-tight bg-linear-to-br from-white to-white/60 bg-clip-text text-transparent">
                {value}
              </div>
            )}
          </div>
          {icon && (
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
              {icon}
            </div>
          )}
        </div>

        {(percentage || subtitle) && (
          <div className="mt-6 flex items-center gap-2 text-sm">
            {percentage && (
              <span
                className={clsx(
                  "font-bold px-2 py-0.5 rounded-lg border",
                  percentage.startsWith("-")
                    ? "bg-error/10 text-error border-error/20"
                    : "bg-primary/10 text-primary border-primary/20",
                )}
              >
                {percentage}
              </span>
            )}
            {subtitle && (
              <span className="opacity-40 group-hover:opacity-60 transition-opacity">
                {subtitle}
              </span>
            )}
          </div>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
