'use client';

import { signIn, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/');
      }
    };
    checkSession();
  }, [router]);

  const handleGuestSignIn = async () => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll just redirect to home
      // In a real app, you'd create a guest session
      router.push('/');
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full" 
            onClick={handleGuestSignIn}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Continue as Guest'}
          </Button>
          
          <div className="text-center text-sm text-gray-600">
            This is a demo app. Click "Continue as Guest" to explore the features.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}