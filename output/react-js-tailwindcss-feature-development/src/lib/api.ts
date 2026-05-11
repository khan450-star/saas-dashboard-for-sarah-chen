import { sleep } from './utils';
import type { DashboardData } from '@/types/dashboard';

// Simulate API delay
const API_DELAY = 1000;

// Mock data generation
const generateMockData = (): DashboardData => {
  const currentDate = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return {
    metrics: {
      revenue: 125000,
      revenueChange: 12.5,
      users: 8420,
      usersChange: 8.2,
      growth: 15.3,
      growthChange: 2.1,
      conversion: 3.2,
      conversionChange: -0.5
    },
    charts: {
      revenue: months.map(month => ({
        label: month,
        value: Math.floor(Math.random() * 50000) + 20000
      })),
      users: months.map(month => ({
        label: month,
        value: Math.floor(Math.random() * 2000) + 1000
      }))
    },
    transactions: Array.from({ length: 10 }, (_, i) => ({
      id: `TXN${String(i + 1).padStart(3, '0')}`,
      customer: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson'][Math.floor(Math.random() * 5)],
      amount: Math.floor(Math.random() * 5000) + 100,
      status: ['completed', 'pending', 'failed'][Math.floor(Math.random() * 3)] as 'completed' | 'pending' | 'failed',
      date: new Date(currentDate.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }))
  };
};

export async function fetchDashboardData(): Promise<DashboardData> {
  await sleep(API_DELAY);
  
  // Simulate occasional API errors
  if (Math.random() < 0.1) {
    throw new Error('API temporarily unavailable');
  }
  
  return generateMockData();
}

export async function updateUserSettings(settings: any): Promise<{ success: boolean }> {
  await sleep(API_DELAY);
  
  // Validate settings (basic example)
  if (!settings.profile?.name || !settings.profile?.email) {
    throw new Error('Name and email are required');
  }
  
  // Simulate API call
  return { success: true };
}

export async function submitForm(data: Record<string, any>): Promise<{ success: boolean; id: string }> {
  await sleep(API_DELAY);
  
  // Basic validation
  const requiredFields = ['name', 'email'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  // Simulate email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Invalid email address');
  }
  
  return {
    success: true,
    id: `FORM_${Date.now()}`
  };
}