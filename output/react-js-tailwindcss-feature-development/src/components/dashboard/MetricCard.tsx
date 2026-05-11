import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
}

export default function MetricCard({ title, value, change, icon }: MetricCardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="text-primary-600">{icon}</div>
        <div className={cn(
          'flex items-center text-sm font-medium',
          isPositive ? 'text-success-600' : isNeutral ? 'text-gray-500' : 'text-error-600'
        )}>
          {!isNeutral && (
            isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )
          )}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}