'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import CompanyProfileForm from '@/components/company/CompanyProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { authAPI } from '@/lib/api';

export default function CompanySetupPage() {
  const [hasProfile, setHasProfile] = useState(false);
  const [existingProfile, setExistingProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

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
          <p className="mt-4 text-muted-foreground">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title={hasProfile ? 'Şirkət Profilini Yenilə' : 'Quraşdırmanı Tamamlayın'}
      description={hasProfile 
        ? 'Daha yaxşı AI məzmunu üçün şirkət məlumatlarınızı yeniləyin'
        : 'Əla məzmun yaratmaq üçün bizə şirkətiniz haqqında məlumat verin'
      }
    >
      <div className="space-y-8">
        {!hasProfile && (
          <div className="mb-8">
            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900 dark:text-blue-100">
                  <span className="mr-2">🎯</span>
                  Bu Məlumat Niyə Lazımdır
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🤖</span>
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Daha Yaxşı AI Məzmunu</h4>
                      <p className="text-blue-700 dark:text-blue-300">
                        AI biznesinizə və auditoriyanıza uyğun məzmun yaradacaq
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🎯</span>
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Hədəfli Mesajlar</h4>
                      <p className="text-blue-700 dark:text-blue-300">
                        Paylaşımlar xüsusi sənayenizə və məqsədlərinizə uyğunlaşdırılacaq
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🌍</span>
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Azərbaycan Dilində Məzmun</h4>
                      <p className="text-blue-700 dark:text-blue-300">
                        Bütün məzmun mükəmməl Azərbaycan dilində yaradılacaq
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




