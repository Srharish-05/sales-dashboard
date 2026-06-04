"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "@/components/atoms/Card";
import { ChartType, MonthlySales, YearOption } from "@/types/sales";

interface DashboardChartSectionProps {
  data: MonthlySales[];
  currentChart: ChartType;
  selectedYear: YearOption;
  threshold: number;
}

const COLORS = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b", "#8b5cf6", "#ec4899", "#3b82f6", "#14b8a6", "#a855f7", "#06b6d4", "#eab308", "#64748b"];
const YEAR_COLORS = {
  "2022": "#f43f5e", // Rose
  "2023": "#10b981", // Emerald
  "2024": "#6366f1", // Indigo
};

export const DashboardChartSection: React.FC<DashboardChartSectionProps> = ({
  data,
  currentChart,
  selectedYear,
  threshold,
}) => {
  // Pre-filter data for display:
  // If month does not meet threshold, we can filter it or highlight it.
  // The requirement says: "Add a custom filter input to let users set a sales threshold"
  // Let's filter the data so only months meeting the threshold are shown!
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (selectedYear === "all") {
        // If "all" is selected, include if any year's sale meets threshold
        return item["2022"] >= threshold || item["2023"] >= threshold || item["2024"] >= threshold;
      }
      return item[selectedYear] >= threshold;
    });
  }, [data, selectedYear, threshold]);

  // Formatted data for Pie Chart (aggregated metrics)
  const pieData = useMemo(() => {
    if (selectedYear === "all") {
      // Show total sales per year
      const totals = { "2022": 0, "2023": 0, "2024": 0 };
      filteredData.forEach((d) => {
        totals["2022"] += d["2022"];
        totals["2023"] += d["2023"];
        totals["2024"] += d["2024"];
      });
      return [
        { name: "2022 Sales", value: totals["2022"], color: YEAR_COLORS["2022"] },
        { name: "2023 Sales", value: totals["2023"], color: YEAR_COLORS["2023"] },
        { name: "2024 Sales", value: totals["2024"], color: YEAR_COLORS["2024"] },
      ];
    } else {
      // Show sales per month for the selected year
      return filteredData.map((d, index) => ({
        name: d.month,
        value: d[selectedYear],
        color: COLORS[index % COLORS.length],
      }));
    }
  }, [filteredData, selectedYear]);

  // Custom premium tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/95 border border-zinc-800 rounded-xl p-4 shadow-2xl backdrop-blur-md">
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">{label || "Overview"}</p>
          <div className="flex flex-col gap-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.payload.color }} />
                  <span className="text-sm text-zinc-300 font-medium">{entry.name}</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">
                  ${entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (filteredData.length === 0) {
      return (
        <div className="h-full flex flex-col justify-center items-center text-zinc-500 gap-2">
          <span className="text-lg font-medium">No Data Available</span>
          <span className="text-sm text-zinc-650">Try lowering the threshold filter to reveal monthly sales.</span>
        </div>
      );
    }

    switch (currentChart) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              {selectedYear === "all" ? (
                <>
                  <Line
                    type="monotone"
                    dataKey="2022"
                    name="2022"
                    stroke={YEAR_COLORS["2022"]}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 1 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="2023"
                    name="2023"
                    stroke={YEAR_COLORS["2023"]}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 1 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="2024"
                    name="2024"
                    stroke={YEAR_COLORS["2024"]}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 1 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </>
              ) : (
                <Line
                  type="monotone"
                  dataKey={selectedYear}
                  name={`${selectedYear} Sales`}
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 1 }}
                  activeDot={{ r: 7, strokeWidth: 0 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={selectedYear === "all" ? 60 : 70}
                outerRadius={selectedYear === "all" ? 95 : 105}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        );

      case "bar":
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              {selectedYear === "all" ? (
                <>
                  <Bar dataKey="2022" name="2022" fill={YEAR_COLORS["2022"]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="2023" name="2023" fill={YEAR_COLORS["2023"]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="2024" name="2024" fill={YEAR_COLORS["2024"]} radius={[4, 4, 0, 0]} />
                </>
              ) : (
                <Bar
                  dataKey={selectedYear}
                  name={`${selectedYear} Sales`}
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Card className="flex flex-col h-[450px] w-full bg-zinc-900/60 border border-zinc-800/80 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">
            {selectedYear === "all"
              ? "Sales Performance Across Years"
              : `Sales Performance: ${selectedYear}`}
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Interactive visual representation of monthly performance
          </p>
        </div>
        {threshold > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Threshold: &ge; ${threshold.toLocaleString()}
          </span>
        )}
      </div>

      <div className="flex-1 w-full min-h-0">
        {renderChart()}
      </div>
    </Card>
  );
};
