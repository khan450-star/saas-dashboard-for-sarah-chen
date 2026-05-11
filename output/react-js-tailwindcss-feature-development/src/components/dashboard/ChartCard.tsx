'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ChartData {
  label: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar';
  data: ChartData[];
}

export default function ChartCard({ title, type, data }: ChartCardProps) {
  const maxValue = useMemo(() => Math.max(...data.map(d => d.value)), [data]);
  const minValue = useMemo(() => Math.min(...data.map(d => d.value)), [data]);
  const range = maxValue - minValue;

  const getBarHeight = (value: number) => {
    return range > 0 ? ((value - minValue) / range) * 100 : 50;
  };

  const getLinePoints = () => {
    if (data.length === 0) return '';
    const width = 100;
    const height = 100;
    const stepX = width / (data.length - 1);
    
    return data
      .map((item, index) => {
        const x = index * stepX;
        const y = height - getBarHeight(item.value);
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="h-64">
        {type === 'bar' ? (
          <div className="flex items-end justify-between h-full space-x-2">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end justify-center h-48">
                  <div
                    className="bg-primary-600 rounded-t min-h-[4px] w-full max-w-12 transition-all duration-500 ease-out"
                    style={{ height: `${getBarHeight(item.value)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center truncate w-full">
                  {item.label}
                </div>
                <div className="text-xs font-medium text-gray-900">
                  {item.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative h-full">
            <svg className="w-full h-48" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {data.length > 1 && (
                <>
                  <polyline
                    fill="none"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                    points={getLinePoints()}
                  />
                  <polygon
                    fill={`url(#gradient-${title})`}
                    points={`0,100 ${getLinePoints()} 100,100`}
                  />
                </>
              )}
            </svg>
            
            <div className="flex justify-between mt-2">
              {data.map((item, index) => (
                <div key={index} className="text-xs text-gray-500 text-center flex-1">
                  <div className="truncate">{item.label}</div>
                  <div className="font-medium text-gray-900">{item.value.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}