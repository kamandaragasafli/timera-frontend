'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { authAPI } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSelector } from '@/components/LanguageSelector';

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
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="fixed top-4 left-4 z-50">
              <span className="text-lg">☰</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {(title || description) && (
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                {title && (
                  <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                )}
                {description && (
                  <p className="text-muted-foreground mt-1">{description}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <LanguageSelector />
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}





