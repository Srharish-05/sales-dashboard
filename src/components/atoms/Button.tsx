import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isActive = false,
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary: isActive
      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700"
      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700",
    secondary: isActive
      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-700"
      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700",
    outline: isActive
      ? "border-2 border-indigo-500 text-indigo-400 bg-indigo-500/10"
      : "border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    ghost: isActive
      ? "bg-zinc-800 text-white"
      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50",
    danger: isActive
      ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-700"
      : "bg-zinc-800 text-rose-400 hover:bg-rose-550 hover:bg-zinc-700 border border-zinc-700",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
