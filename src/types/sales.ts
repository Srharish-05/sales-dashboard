export interface MonthlySales {
  month: string;
  "2022": number;
  "2023": number;
  "2024": number;
}

export type YearOption = '2022' | '2023' | '2024' | 'all';

export type ChartType = 'bar' | 'line' | 'pie';

export interface DashboardMetrics {
  totalSales: number;
  avgSales: number;
  peakMonth: string;
  peakValue: number;
  lowMonth: string;
  lowValue: number;
}
