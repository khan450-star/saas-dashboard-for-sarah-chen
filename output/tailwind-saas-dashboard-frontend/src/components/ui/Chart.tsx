'use client'

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut, PolarArea } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
)

interface ChartProps {
  type: 'line' | 'bar' | 'doughnut' | 'polarArea' | 'area'
  height?: number
}

const generateData = (type: string) => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  
  if (type === 'doughnut' || type === 'polarArea') {
    return {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [
        {
          data: [65, 30, 5],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
          borderWidth: 0,
        },
      ],
    }
  }
  
  return {
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: labels.map(() => Math.floor(Math.random() * 1000) + 500),
        backgroundColor: type === 'area' ? 'rgba(59, 130, 246, 0.1)' : '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 2,
        fill: type === 'area',
        tension: 0.4,
      },
    ],
  }
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: '#f3f4f6',
      },
    },
  },
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
}

export default function Chart({ type, height = 250 }: ChartProps) {
  const data = generateData(type)
  
  const chartComponents = {
    line: <Line data={data} options={options} />,
    bar: <Bar data={data} options={options} />,
    area: <Line data={data} options={options} />,
    doughnut: <Doughnut data={data} options={doughnutOptions} />,
    polarArea: <PolarArea data={data} options={doughnutOptions} />,
  }

  return (
    <div style={{ height: `${height}px` }}>
      {chartComponents[type]}
    </div>
  )
}