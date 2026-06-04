import React, { useMemo } from "react";
import { MetricCard } from "@/components/molecules/MetricCard";
import { MonthlySales, YearOption } from "@/types/sales";
import { DollarSign, TrendingUp, TrendingDown, Layers } from "lucide-react";

interface MetricsOverviewProps {
  data: MonthlySales[];
  selectedYear: YearOption;
  threshold: number;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  data,
  selectedYear,
  threshold,
}) => {
  const metrics = useMemo(() => {
    // 1. Filter raw data based on threshold
    const filtered = data.filter((d) => {
      if (selectedYear === "all") {
        return d["2022"] >= threshold || d["2023"] >= threshold || d["2024"] >= threshold;
      }
      return d[selectedYear] >= threshold;
    });

    if (filtered.length === 0) {
      return {
        totalSales: 0,
        avgSales: 0,
        peakMonth: "N/A",
        peakValue: 0,
        lowMonth: "N/A",
        lowValue: 0,
        activeMonthsCount: 0,
      };
    }

    let total = 0;
    let peakValue = -Infinity;
    let peakMonth = "";
    let lowValue = Infinity;
    let lowMonth = "";

    filtered.forEach((d) => {
      let monthVal = 0;
      if (selectedYear === "all") {
        monthVal = d["2022"] + d["2023"] + d["2024"];
      } else {
        monthVal = d[selectedYear];
      }

      total += monthVal;

      if (monthVal > peakValue) {
        peakValue = monthVal;
        peakMonth = d.month;
      }

      if (monthVal < lowValue) {
        lowValue = monthVal;
        lowMonth = d.month;
      }
    });

    const avg = total / filtered.length;

    return {
      totalSales: total,
      avgSales: avg,
      peakMonth,
      peakValue,
      lowMonth,
      lowValue,
      activeMonthsCount: filtered.length,
    };
  }, [data, selectedYear, threshold]);

  const yearLabel = selectedYear === "all" ? "2022-2024" : selectedYear;

  // Trend computations
  const averageTrend = {
    value: `${metrics.activeMonthsCount}/12 months`,
    isPositive: metrics.activeMonthsCount >= 6,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <MetricCard
        title={`Total Sales (${yearLabel})`}
        value={`$${metrics.totalSales.toLocaleString()}`}
        subtitle="Cumulative sales in active periods"
        icon={<DollarSign className="w-5 h-5" />}
        highlight
      />
      <MetricCard
        title="Average Monthly Sales"
        value={`$${Math.round(metrics.avgSales).toLocaleString()}`}
        subtitle="Average for matching months"
        icon={<Layers className="w-5 h-5" />}
        trend={averageTrend}
      />
      <MetricCard
        title="Peak Month"
        value={metrics.peakMonth}
        subtitle={metrics.peakValue > 0 ? `Max: $${metrics.peakValue.toLocaleString()}` : "No sales record"}
        icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
        trend={metrics.peakValue > 0 ? { value: "Highest", isPositive: true } : undefined}
      />
      <MetricCard
        title="Lowest Month"
        value={metrics.lowMonth}
        subtitle={metrics.lowValue < Infinity && metrics.lowValue > 0 ? `Min: $${metrics.lowValue.toLocaleString()}` : "No sales record"}
        icon={<TrendingDown className="w-5 h-5 text-rose-400" />}
        trend={metrics.lowValue < Infinity && metrics.lowValue > 0 ? { value: "Lowest", isPositive: false } : undefined}
      />
    </div>
  );
};
