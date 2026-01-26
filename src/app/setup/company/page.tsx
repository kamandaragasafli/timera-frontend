'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import CompanyProfileForm from '@/components/company/CompanyProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { authAPI } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';

export default function CompanySetupPage() {
  const [hasProfile, setHasProfile] = useState(false);
  const [existingProfile, setExistingProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const t = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    checkExistingProfile();
  }, [isAuthenticated, router]);

  const checkExistingProfile = async () => {
    try {
      const response = await authAPI.getCompanyProfile();
      setExistingProfile(response.data);
      setHasProfile(true);
    } catch (error) {
      setHasProfile(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    router.push('/ai-content-generator');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title={hasProfile ? t.companySetup.titleUpdate : t.companySetup.title}
      description={hasProfile 
        ? t.companySetup.descriptionUpdate
        : t.companySetup.description
      }
    >
      <div className="space-y-8">
        {!hasProfile && (
          <div className="mb-8">
            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900 dark:text-blue-100">
                  <span className="mr-2">🎯</span>
                  {t.companySetup.whyNeededTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🤖</span>
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">{t.companySetup.benefit1Title}</h4>
                      <p className="text-blue-700 dark:text-blue-300">
                        {t.companySetup.benefit1Desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🎯</span>
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">{t.companySetup.benefit2Title}</h4>
                      <p className="text-blue-700 dark:text-blue-300">
                        {t.companySetup.benefit2Desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🌍</span>
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">{t.companySetup.benefit3Title}</h4>
                      <p className="text-blue-700 dark:text-blue-300">
                        {t.companySetup.benefit3Desc}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <CompanyProfileForm 
          onComplete={handleComplete}
          existingProfile={existingProfile}
        />
      </div>
    </DashboardLayout>
  );
}




