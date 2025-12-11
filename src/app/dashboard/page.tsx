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

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [hasCompanyProfile, setHasCompanyProfile] = useState(false);
  const router = useRouter();
  const { hasActiveGeneration, generatedPosts } = usePostGeneration();

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
      title={`Welcome back, ${user?.first_name}!`}
      description="Manage your social media presence with AI-powered tools"
    >
        <div className="space-y-6">
          {/* Pending Posts Notification */}
          {hasActiveGeneration && (
            <Card className="border-yellow-500/20 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">⏳</span>
                  Posts Waiting for Approval
                </CardTitle>
                <CardDescription>
                  You have {generatedPosts.filter(p => p.status === 'pending_approval').length} AI-generated posts waiting for your review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/ai-content-generator">
                  <Button size="lg" className="w-full md:w-auto" variant="outline">
                    <span className="mr-2">✅</span>
                    Review & Approve Posts
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
                  Get Started with AI Content Generation
                </CardTitle>
                <CardDescription>
                  Set up your company profile to generate 10 engaging posts in Azerbaijani language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/ai-content-generator">
                  <Button size="lg" className="w-full md:w-auto">
                    <span className="mr-2">✨</span>
                    Start AI Content Generator
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Posts Created</CardTitle>
              <CardDescription>Total posts in your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.total_posts || 0}</div>
              <p className="text-sm text-muted-foreground">
                {stats?.ai_generated_posts || 0} AI generated
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
              <CardDescription>Posts waiting for review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats?.pending_approval || 0}</div>
              <p className="text-sm text-muted-foreground">
                {stats?.approved_posts || 0} approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>Posts ready to publish</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.scheduled_posts || 0}</div>
              <p className="text-sm text-muted-foreground">
                {stats?.published_posts || 0} published
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with these common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Link href="/ai-content-generator">
                  <Button className="h-20 flex flex-col items-center justify-center w-full">
                    <span className="text-lg mb-1">🚀</span>
                    AI Content Generator
                  </Button>
                </Link>
                <Link href="/posts">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                    <span className="text-lg mb-1">📝</span>
                    Create New Post
                  </Button>
                </Link>
                <Link href="/social-accounts">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                    <span className="text-lg mb-1">🔗</span>
                    Connect Social Account
                  </Button>
                </Link>
                <Link href="/calendar">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center w-full">
                    <span className="text-lg mb-1">📅</span>
                    View Calendar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p className="text-lg">{user?.company_name || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <p className="text-lg capitalize">{user?.subscription_plan}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Verified</p>
                  <p className="text-lg">{user?.is_email_verified ? '✅ Verified' : '❌ Not verified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
    </DashboardLayout>
  );
}
