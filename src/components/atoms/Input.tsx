import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-zinc-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-250 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 text-sm ${
            icon ? "pl-10" : ""
          } ${error ? "border-rose-500 focus:ring-rose-500/50" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-rose-500 mt-1">{error}</span>}
    </div>
  );
};
