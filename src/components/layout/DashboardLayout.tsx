'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { authAPI } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [companyProfileCheck, setCompanyProfileCheck] = useState<'loading' | 'complete' | 'incomplete'>('loading');
  const t = useTranslation();

  // Check if company profile exists
  useEffect(() => {
    const checkCompanyProfile = async () => {
      // Don't check on setup page itself or settings page
      if (pathname?.includes('/setup/company') || pathname?.includes('/settings')) {
        setCompanyProfileCheck('complete');
        return;
      }

      try {
        await authAPI.getCompanyProfile();
        setCompanyProfileCheck('complete');
      } catch (error) {
        setCompanyProfileCheck('incomplete');
      }
    };

    if (isAuthenticated && !loading) {
      checkCompanyProfile();
    }
  }, [isAuthenticated, loading, pathname]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router]);

  // Redirect to company setup if profile incomplete
  useEffect(() => {
    if (!loading && isAuthenticated && companyProfileCheck === 'incomplete' && !pathname?.includes('/setup/company') && !pathname?.includes('/settings')) {
      router.push('/setup/company');
    }
  }, [loading, isAuthenticated, companyProfileCheck, pathname, router]);

  if (loading || companyProfileCheck === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || companyProfileCheck === 'incomplete') {
    return null; // Will redirect
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 bg-background border-2 border-border shadow-lg hover:bg-accent"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {(title || description) && (
          <header className="bg-card border-b border-border px-4 sm:px-6 py-4 md:py-5 pt-20 md:pt-4">
            <div className="flex flex-col gap-2">
              {title && (
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground break-words leading-tight">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-sm sm:text-base text-muted-foreground break-words">
                  {description}
                </p>
              )}
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}





