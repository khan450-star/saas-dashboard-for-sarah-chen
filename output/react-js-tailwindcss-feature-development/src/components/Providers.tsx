'use client';

import { useEffect } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog analytics if needed
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      try {
        const posthog = require('posthog-js');
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
          loaded: (posthog: any) => {
            if (process.env.NODE_ENV === 'development') {
              posthog.debug();
            }
          },
        });
      } catch (error) {
        console.warn('PostHog initialization failed:', error);
      }
    }
  }, []);

  return <>{children}</>;
}