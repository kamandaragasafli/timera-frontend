'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { usePostGeneration } from '@/contexts/PostGenerationContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [hasCompanyProfile, setHasCompanyProfile] = useState(false);
  const router = useRouter();
  const { hasActiveGeneration, generatedPosts } = usePostGeneration();
  const t = useTranslation();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await authAPI.getStats();
      setStats(response.data);
      setHasCompanyProfile(response.data.has_company_profile);
      
      // Redirect to company setup if no profile exists
      if (!response.data.has_company_profile && response.data.total_posts === 0) {
        // Only redirect if this is a completely new user
        setTimeout(() => {
          router.push('/setup/company');
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to load stats');
    }
  };

  return (
    <DashboardLayout 
      title={t.dashboard.welcomeBack.replace('{name}', user?.first_name || '')}
      description={t.dashboard.description}
    >
        <div className="space-y-6">
          {/* Pending Posts Notification */}
          {hasActiveGeneration && (
            <Card className="border-yellow-500/20 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">⏳</span>
                  {t.dashboard.postsWaiting}
                </CardTitle>
                <CardDescription>
                  {t.dashboard.postsWaitingDesc.replace('{count}', generatedPosts.filter(p => p.status === 'pending_approval').length.toString())}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/ai-content-generator">
                  <Button size="lg" className="w-full md:w-auto" variant="outline">
                    <span className="mr-2">✅</span>
                    {t.dashboard.reviewApprove}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* AI Content Generator CTA */}
          {!hasCompanyProfile && !hasActiveGeneration && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">🚀</span>
                  {t.dashboard.getStarted}
                </CardTitle>
                <CardDescription>
                  {t.dashboard.getStartedDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/ai-content-generator">
                  <Button size="lg" className="w-full md:w-auto">
                    <span className="mr-2">✨</span>
                    {t.dashboard.startGenerator}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>{t.dashboard.postsCreated}</CardTitle>
              <CardDescription>{t.dashboard.postsCreatedDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.total_posts || 0}</div>
              <p className="text-sm text-muted-foreground">
                {stats?.ai_generated_posts || 0} {t.dashboard.aiGenerated}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.dashboard.pendingApproval}</CardTitle>
              <CardDescription>{t.dashboard.pendingApprovalDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats?.pending_approval || 0}</div>
              <p className="text-sm text-muted-foreground">
                {stats?.approved_posts || 0} {t.dashboard.approved}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.dashboard.scheduledPosts}</CardTitle>
              <CardDescription>{t.dashboard.scheduledPostsDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.scheduled_posts || 0}</div>
              <p className="text-sm text-muted-foreground">
                {stats?.published_posts || 0} {t.dashboard.published}
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>{t.dashboard.quickActions}</CardTitle>
              <CardDescription>{t.dashboard.quickActionsDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Link href="/ai-content-generator">
                  <Button className="h-20 flex flex-col items-center justify-center w-full">
                    <span className="text-lg mb-1">🚀</span>
                    {t.sidebar.aiContentGenerator}
                  </Button>
                </Link>
                <Link href="/posts">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                    <span className="text-lg mb-1">📝</span>
                    {t.dashboard.createNewPost}
                  </Button>
                </Link>
                <Link href="/social-accounts">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                    <span className="text-lg mb-1">🔗</span>
                    {t.dashboard.connectSocial}
                  </Button>
                </Link>
                <Link href="/calendar">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                    <span className="text-lg mb-1">📅</span>
                    {t.dashboard.viewCalendar}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>{t.dashboard.accountInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t.dashboard.email}</p>
                  <p className="text-lg">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t.dashboard.company}</p>
                  <p className="text-lg">{user?.company_name || t.dashboard.notSpecified}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t.dashboard.plan}</p>
                  <p className="text-lg capitalize">{user?.subscription_plan}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t.dashboard.emailVerified}</p>
                  <p className="text-lg">{user?.is_email_verified ? t.dashboard.verified : t.dashboard.notVerified}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
    </DashboardLayout>
  );
}
