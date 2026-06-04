"use client";

import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { ChartSwitcher } from "@/components/molecules/ChartSwitcher";
import { FilterBar } from "@/components/molecules/FilterBar";
import { MetricsOverview } from "@/components/organisms/MetricsOverview";
import { DashboardChartSection } from "@/components/organisms/DashboardChartSection";
import { mockSalesData } from "@/data/mockSalesData";
import { ChartType, YearOption } from "@/types/sales";
import { Sparkles, Calendar } from "lucide-react";

export default function Home() {
  const [currentChart, setCurrentChart] = useState<ChartType>("bar");
  const [selectedYear, setSelectedYear] = useState<YearOption>("2024");
  const [threshold, setThreshold] = useState<number>(0);

  // Compute maximum monthly sales value in our dataset to define range slider limits
  const maxSalesValue = useMemo(() => {
    let max = 0;
    mockSalesData.forEach((d) => {
      max = Math.max(max, d["2022"], d["2023"], d["2024"]);
    });
    return max;
  }, []);

  // Header quick details
  const headerControls = (
    <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3.5 py-1.5 rounded-xl border border-indigo-500/20 text-xs font-semibold">
      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      <span>Live Analytics</span>
    </div>
  );

  return (
    <DashboardLayout headerControls={headerControls}>
      {/* Overview Cards */}
      <MetricsOverview
        data={mockSalesData}
        selectedYear={selectedYear}
        threshold={threshold}
      />

      {/* Main Controls - Chart Switcher & Year Switcher */}
      <ChartSwitcher
        currentChart={currentChart}
        onChartChange={setCurrentChart}
        currentYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Sales threshold controller - 1 col width on lg screens */}
        <div className="lg:col-span-1">
          <FilterBar
            threshold={threshold}
            onThresholdChange={setThreshold}
            maxSalesValue={maxSalesValue}
          />
        </div>

        {/* Charts component - 2 cols width on lg screens */}
        <div className="lg:col-span-2">
          <DashboardChartSection
            data={mockSalesData}
            currentChart={currentChart}
            selectedYear={selectedYear}
            threshold={threshold}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
