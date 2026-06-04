import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 shadow-xl transition-all duration-300 ${
        hoverEffect ? "hover:translate-y-[-4px] hover:border-zinc-700 hover:shadow-2xl hover:shadow-indigo-500/5" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
