'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import CompanyProfileForm from '@/components/company/CompanyProfileForm';
import PostGenerationWizard from '@/components/posts/PostGenerationWizard';
import PostApprovalGrid from '@/components/posts/PostApprovalGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { authAPI, postsAPI } from '@/lib/api';
import { usePostGeneration } from '@/contexts/PostGenerationContext';

type Step = 'company-profile' | 'generate' | 'approve' | 'complete';

export default function AIContentGeneratorPage() {
  const [currentStep, setCurrentStep] = useState<Step>('company-profile');
  const [companyProfile, setCompanyProfile] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { 
    generatedPosts, 
    setGeneratedPosts, 
    hasActiveGeneration,
    clearGeneration 
  } = usePostGeneration();

  useEffect(() => {
    const initializeData = async () => {
      console.log('🚀 Starting initialization...');
      setIsLoading(true);
      
      // First check for pending posts
      console.log('⏳ Step 1: Checking for pending posts...');
      const hasPendingPosts = await checkActiveGeneration();
      console.log('📌 Has pending posts?', hasPendingPosts);
      
      // Then check company profile and determine step
      console.log('⏳ Step 2: Checking company profile...');
      await checkCompanyProfile(hasPendingPosts);
      
      console.log('✅ Initialization complete');
      setIsLoading(false);
    };
    initializeData();
  }, []);

  const checkCompanyProfile = async (hasPendingPosts: boolean) => {
    try {
      const response = await authAPI.getCompanyProfile();
      console.log('✅ Company profile loaded:', response.data.company_name);
      setCompanyProfile(response.data);
      
      // Determine the correct step based on pending posts
      if (hasPendingPosts) {
        console.log('➡️ Setting step to APPROVE (has pending posts)');
        setCurrentStep('approve');
      } else {
        console.log('➡️ Setting step to GENERATE (no pending posts)');
        setCurrentStep('generate');
      }
    } catch {
      // No company profile exists, start with profile creation
      console.log('➡️ Setting step to COMPANY-PROFILE (no profile found)');
      setCurrentStep('company-profile');
    }
  };

  const checkActiveGeneration = async (): Promise<boolean> => {
    // Check if there are pending posts from the backend
    try {
      console.log('🔍 Checking for pending posts...');
      const response = await postsAPI.getPendingPosts();
      console.log('📊 Pending posts response:', response.data);
      
      // Handle paginated response
      const posts = response.data.results || response.data;
      console.log('📝 Number of pending posts:', posts.length);
      console.log('📋 Posts data:', posts);
      
      if (posts.length > 0) {
        setGeneratedPosts(posts);
        console.log('✅ Set generated posts to context:', posts.length, 'posts');
        return true; // Has pending posts
      }
      console.log('⚠️ No pending posts found');
      return false; // No pending posts
    } catch (error) {
      console.error('❌ Failed to load pending posts:', error);
      return false;
    }
  };

  const handleProfileComplete = async () => {
    // Refresh company profile
    try {
      const response = await authAPI.getCompanyProfile();
      setCompanyProfile(response.data);
      setCurrentStep('generate');
    } catch {
      console.error('Failed to load company profile');
    }
  };

  const handleGenerationComplete = (posts: Record<string, unknown>[]) => {
    setGeneratedPosts(posts);
    setCurrentStep('approve');
  };

  const handlePostsUpdated = (updatedPosts: Record<string, unknown>[]) => {
    setGeneratedPosts(updatedPosts);
  };

  const handleApprovalComplete = () => {
    setCurrentStep('complete');
  };

  const handleStartOver = () => {
    clearGeneration();
    setCurrentStep('generate');
  };

  if (isLoading) {
    return (
      <DashboardLayout title="AI Məzmun Yaradıcı">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Yüklənir...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 'company-profile': return 'Şirkət Profili Quraşdırması';
      case 'generate': return 'AI Məzmun Yarat';
      case 'approve': return 'Nəzərdən Keçir və Təsdiqlə';
      case 'complete': return 'Yaradılma Tamamlandı';
      default: return 'AI Məzmun Yaradıcı';
    }
  };

  const getStepDescription = () => {
    const postsCount = companyProfile?.posts_to_generate || 10;
    switch (currentStep) {
      case 'company-profile': return 'Daha yaxşı AI məzmunu üçün şirkət məlumatlarınızı təyin edin';
      case 'generate': return `AI ilə ${postsCount} cəlbedici paylaşım yaradın`;
      case 'approve': return 'Yaradılmış məzmununuzu nəzərdən keçirin və təsdiqləyin';
      case 'complete': return 'Məzmununuz planlaşdırmağa hazırdır';
      default: return '';
    }
  };

  return (
    <DashboardLayout title={getStepTitle()} description={getStepDescription()}>
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[
              { key: 'company-profile', label: 'Şirkət Məlumatı', icon: '🏢' },
              { key: 'generate', label: 'Yaradılma', icon: '🤖' },
              { key: 'approve', label: 'Nəzərdən Keçirmə', icon: '✅' },
              { key: 'complete', label: 'Tamamlandı', icon: '🎉' }
            ].map((step, index) => {
              const isActive = currentStep === step.key;
              const isCompleted = ['company-profile', 'generate', 'approve'].indexOf(currentStep) > 
                                 ['company-profile', 'generate', 'approve'].indexOf(step.key);
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    isActive ? 'bg-primary text-primary-foreground' :
                    isCompleted ? 'bg-green-500 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <span>{step.icon}</span>
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-muted'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[600px]">
          {currentStep === 'company-profile' && (
            <CompanyProfileForm 
              onComplete={handleProfileComplete}
              existingProfile={companyProfile}
            />
          )}

          {currentStep === 'generate' && companyProfile && (
            <PostGenerationWizard
              onComplete={handleGenerationComplete}
              companyProfile={companyProfile}
            />
          )}

          {currentStep === 'approve' && generatedPosts.length > 0 && (
            <PostApprovalGrid
              posts={generatedPosts}
              onPostsUpdated={handlePostsUpdated}
              onComplete={handleApprovalComplete}
            />
          )}

          {currentStep === 'complete' && (
            <div className="text-center space-y-6">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="text-6xl mb-4">🎉</div>
                  <CardTitle className="text-2xl">Məzmun Yaradılması Tamamlandı!</CardTitle>
                  <CardDescription>
                    AI yaratdığı paylaşımlarınız planlaşdırmağa hazırdır
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {generatedPosts.filter(p => p.status === 'approved').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Təsdiqləndi</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {generatedPosts.filter(p => p.status === 'pending_approval').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Gözləyir</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {generatedPosts.filter(p => p.status === 'cancelled').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Rədd Edildi</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <Button onClick={() => router.push('/calendar')}>
                      <span className="mr-2">📅</span>
                      Paylaşımları Planlaşdır
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/posts')}>
                      <span className="mr-2">📝</span>
                      Bütün Paylaşımlar
                    </Button>
                    <Button variant="outline" onClick={handleStartOver}>
                      <span className="mr-2">🔄</span>
                      Daha Çox Yarat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
