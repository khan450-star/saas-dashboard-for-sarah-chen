'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import ChartCard from '@/components/dashboard/ChartCard';
import MetricCard from '@/components/dashboard/MetricCard';
import DataTable from '@/components/dashboard/DataTable';
import { fetchDashboardData } from '@/lib/api';
import type { DashboardData } from '@/types/dashboard';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="card text-center">
        <div className="text-error-600 mb-4">⚠️ {error || 'No data available'}</div>
        <button 
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${data.metrics.revenue.toLocaleString()}`}
          change={data.metrics.revenueChange}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Active Users"
          value={data.metrics.users.toLocaleString()}
          change={data.metrics.usersChange}
          icon={<Users className="w-6 h-6" />}
        />
        <MetricCard
          title="Growth Rate"
          value={`${data.metrics.growth}%`}
          change={data.metrics.growthChange}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          title="Conversion"
          value={`${data.metrics.conversion}%`}
          change={data.metrics.conversionChange}
          icon={<BarChart3 className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Revenue Trend"
          type="line"
          data={data.charts.revenue}
        />
        <ChartCard
          title="User Activity"
          type="bar"
          data={data.charts.users}
        />
      </div>

      {/* Data Table */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <DataTable data={data.transactions} />
      </div>
    </div>
  );
}