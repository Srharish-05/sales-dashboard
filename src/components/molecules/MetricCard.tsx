import React from "react";
import { Card } from "@/components/atoms/Card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlight?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  highlight = false,
}) => {
  return (
    <Card hoverEffect className={`relative overflow-hidden ${
      highlight ? "border-indigo-500/30 bg-gradient-to-br from-zinc-900 to-indigo-950/20" : ""
    }`}>
      {highlight && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
      )}
      
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {title}
          </span>
          <span className="text-2xl font-bold tracking-tight text-white mt-1">
            {value}
          </span>
        </div>
        
        {icon && (
          <div className={`p-2.5 rounded-xl ${
            highlight ? "bg-indigo-500/10 text-indigo-400" : "bg-zinc-800/80 text-zinc-400"
          }`}>
            {icon}
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-2 mt-4 text-xs">
          {trend && (
            <span className={`font-semibold px-2 py-0.5 rounded-md ${
              trend.isPositive 
                ? "text-emerald-400 bg-emerald-500/10" 
                : "text-rose-450 text-rose-400 bg-rose-500/10"
            }`}>
              {trend.value}
            </span>
          )}
          {subtitle && (
            <span className="text-zinc-500 truncate">{subtitle}</span>
          )}
        </div>
      )}
    </Card>
  );
};
