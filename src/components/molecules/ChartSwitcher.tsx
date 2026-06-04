import React from "react";
import { Button } from "@/components/atoms/Button";
import { ChartType, YearOption } from "@/types/sales";
import { BarChart3, LineChart, PieChart } from "lucide-react";

interface ChartSwitcherProps {
  currentChart: ChartType;
  onChartChange: (chart: ChartType) => void;
  currentYear: YearOption;
  onYearChange: (year: YearOption) => void;
}

export const ChartSwitcher: React.FC<ChartSwitcherProps> = ({
  currentChart,
  onChartChange,
  currentYear,
  onYearChange,
}) => {
  const chartTypes: { type: ChartType; label: string; icon: React.ReactNode }[] = [
    { type: "bar", label: "Bar Chart", icon: <BarChart3 className="w-4 h-4 mr-1.5" /> },
    { type: "line", label: "Line Chart", icon: <LineChart className="w-4 h-4 mr-1.5" /> },
    { type: "pie", label: "Pie Chart", icon: <PieChart className="w-4 h-4 mr-1.5" /> },
  ];

  const years: { value: YearOption; label: string }[] = [
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "all", label: "All Years" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/60">
      {/* Year Selection */}
      <div className="flex flex-col gap-2 w-full md:w-auto">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Select Period</span>
        <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 w-full md:w-auto overflow-x-auto">
          {years.map((y) => (
            <Button
              key={y.value}
              variant="primary"
              size="sm"
              isActive={currentYear === y.value}
              onClick={() => onYearChange(y.value)}
              className="flex-1 md:flex-none text-xs rounded-lg"
            >
              {y.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart Type Selection */}
      <div className="flex flex-col gap-2 w-full md:w-auto">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Chart Style</span>
        <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 w-full md:w-auto overflow-x-auto">
          {chartTypes.map((c) => (
            <Button
              key={c.type}
              variant="secondary"
              size="sm"
              isActive={currentChart === c.type}
              onClick={() => onChartChange(c.type)}
              className="flex-1 md:flex-none text-xs rounded-lg"
            >
              {c.icon}
              {c.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
