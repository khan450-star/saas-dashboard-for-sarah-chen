export interface DashboardMetrics {
  revenue: number;
  revenueChange: number;
  users: number;
  usersChange: number;
  growth: number;
  growthChange: number;
  conversion: number;
  conversionChange: number;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  charts: {
    revenue: ChartData[];
    users: ChartData[];
  };
  transactions: Transaction[];
}