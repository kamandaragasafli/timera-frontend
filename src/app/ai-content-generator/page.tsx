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
import { useTranslation } from '@/hooks/useTranslation';

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
  const t = useTranslation();

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
      <DashboardLayout title={t.aiContentGenerator.title}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{t.aiContentGenerator.loading}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 'company-profile': return t.settings.companyProfile.title;
      case 'generate': return t.aiContentGenerator.title;
      case 'approve': return t.posts.pendingApproval;
      case 'complete': return t.common.save;
      default: return t.aiContentGenerator.title;
    }
  };

  const getStepDescription = () => {
    const postsCount = companyProfile?.posts_to_generate || 10;
    switch (currentStep) {
      case 'company-profile': return t.settings.companyProfile.description;
      case 'generate': return t.dashboard.getStartedDesc;
      case 'approve': return t.posts.pendingApprovalDesc;
      case 'complete': return t.posts.scheduledPostsDesc;
      default: return '';
    }
  };

  return (
    <DashboardLayout title={getStepTitle()} description={getStepDescription()}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 px-2 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {[
                { key: 'company-profile', label: t.settings.companyProfile.title, icon: '🏢' },
                { key: 'generate', label: t.aiContentGenerator.title, icon: '🤖' },
                { key: 'approve', label: t.posts.pendingApproval, icon: '✅' },
                { key: 'complete', label: t.common.save, icon: '🎉' }
              ].map((step, index) => {
                const isActive = currentStep === step.key;
                const isCompleted = ['company-profile', 'generate', 'approve'].indexOf(currentStep) > 
                                   ['company-profile', 'generate', 'approve'].indexOf(step.key);
                
                return (
                  <div key={step.key} className="flex items-center flex-shrink-0">
                    <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-colors text-xs sm:text-sm whitespace-nowrap ${
                      isActive ? 'bg-primary text-primary-foreground shadow-md' :
                      isCompleted ? 'bg-green-500 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      <span>{step.icon}</span>
                      <span className="font-medium">{step.label}</span>
                    </div>
                    {index < 3 && (
                      <div className={`w-4 sm:w-6 h-0.5 mx-1 sm:mx-2 flex-shrink-0 ${
                        isCompleted ? 'bg-green-500' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
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
                  <CardTitle className="text-2xl">{t.common.save}</CardTitle>
                  <CardDescription>
                    {t.posts.scheduledPostsDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {generatedPosts.filter(p => p.status === 'approved').length}
                      </div>
                      <div className="text-sm text-muted-foreground">{t.posts.approved}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {generatedPosts.filter(p => p.status === 'pending_approval').length}
                      </div>
                      <div className="text-sm text-muted-foreground">{t.posts.statusPending}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {generatedPosts.filter(p => p.status === 'cancelled').length}
                      </div>
                      <div className="text-sm text-muted-foreground">{t.posts.statusFailed}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:space-x-4">
                    <Button onClick={() => router.push('/calendar')} className="w-full sm:w-auto">
                      <span className="mr-2">📅</span>
                      {t.calendar.title}
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/posts')} className="w-full sm:w-auto">
                      <span className="mr-2">📝</span>
                      {t.posts.title}
                    </Button>
                    <Button variant="outline" onClick={handleStartOver} className="w-full sm:w-auto">
                      <span className="mr-2">🔄</span>
                      {t.aiTools.generate}
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
