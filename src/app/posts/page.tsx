'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { postsAPI, authAPI, socialAccountsAPI } from '@/lib/api';
import Image from 'next/image';
import { 
  Calendar, 
  Edit, 
  Trash2, 
  Share2, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Loader2,
  Facebook,
  Instagram,
  Sparkles
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useTranslation } from '@/hooks/useTranslation';
import ShareModal from '@/components/posts/ShareModal';

// LinkedIn Icon Component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface Post {
  id: string;
  title: string;
  content: string;
  description: string;
  hashtags: string[];
  status: string;
  image_url?: string;
  image_url_absolute?: string;
  custom_image_url?: string;
  design_url_absolute?: string;
  design_thumbnail_absolute?: string;
  scheduled_time?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    scheduled: 0,
    approved: 0,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = useTranslation();

  useEffect(() => {
    loadPosts();
    loadCompanyProfile();
  }, []);

  const loadCompanyProfile = async () => {
    try {
      const response = await authAPI.getCompanyProfile();
      setCompanyProfile(response.data);
    } catch (error) {
      console.log('No company profile found');
    }
  };

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const response = await postsAPI.getPosts();
      const postsData = response.data.results || response.data;
      setPosts(postsData);
      
      // Calculate stats
      setStats({
        total: postsData.length,
        published: postsData.filter((p: Post) => p.status === 'published').length,
        scheduled: postsData.filter((p: Post) => p.status === 'scheduled').length,
        approved: postsData.filter((p: Post) => p.status === 'approved').length,
      });
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'published':
        return { 
          label: t.posts.statusPublished, 
          color: 'bg-green-500 text-white', 
          icon: <CheckCircle2 className="w-3 h-3" /> 
        };
      case 'scheduled':
        return { 
          label: t.posts.statusScheduled, 
          color: 'bg-blue-500 text-white', 
          icon: <Clock className="w-3 h-3" /> 
        };
      case 'approved':
        return { 
          label: t.posts.statusApproved, 
          color: 'bg-purple-500 text-white', 
          icon: <CheckCircle2 className="w-3 h-3" /> 
        };
      case 'pending_approval':
        return { 
          label: t.posts.statusPending, 
          color: 'bg-yellow-500 text-white', 
          icon: <Clock className="w-3 h-3" /> 
        };
      case 'failed':
        return { 
          label: t.posts.statusFailed, 
          color: 'bg-red-500 text-white', 
          icon: <XCircle className="w-3 h-3" /> 
        };
      case 'draft':
        return { 
          label: t.posts.statusDraft, 
          color: 'bg-gray-500 text-white', 
          icon: <Edit className="w-3 h-3" /> 
        };
      default:
        return { 
          label: status, 
          color: 'bg-gray-500 text-white', 
          icon: null 
        };
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const locale = t.common.loading === 'Loading...' ? 'en-US' : t.common.loading === 'Yüklənir...' ? 'az-AZ' : 'ru-RU';
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const [publishingPosts, setPublishingPosts] = useState<{[key: string]: {facebook?: boolean, instagram?: boolean, linkedin?: boolean}}>({});
  const [applyingBranding, setApplyingBranding] = useState<{[key: string]: boolean}>({});
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedPostForShare, setSelectedPostForShare] = useState<Post | null>(null);
  const [publishResult, setPublishResult] = useState<{
    platform: string;
    account: string;
    status: 'success' | 'failed';
    postId?: string;
    postLink?: string;
    error?: string;
  } | null>(null);

  const handlePublishToFacebook = async (postId: string) => {
    try {
      setPublishingPosts(prev => ({ ...prev, [postId]: { ...prev[postId], facebook: true } }));
      const response = await postsAPI.publishToFacebook(postId);
      const data = response.data;
      
      // Get account info
      const socialAccounts = await socialAccountsAPI.getAccounts();
      const facebookAccount = (socialAccounts.data.results || socialAccounts.data || []).find(
        (acc: any) => acc.platform === 'facebook' && acc.is_active
      );
      
      setPublishResult({
        platform: 'Facebook',
        account: facebookAccount?.display_name || facebookAccount?.platform_username || 'Unknown',
        status: 'success',
        postId: data.facebook_post_id,
        postLink: data.facebook_post_id ? `https://www.facebook.com/${data.facebook_post_id}` : undefined,
      });
      
      loadPosts(); // Reload posts
    } catch (error: any) {
      console.error('Failed to publish to Facebook:', error);
      
      // Get account info for error display
      try {
        const socialAccounts = await socialAccountsAPI.getAccounts();
        const facebookAccount = (socialAccounts.data.results || socialAccounts.data || []).find(
          (acc: any) => acc.platform === 'facebook' && acc.is_active
        );
        
        setPublishResult({
          platform: 'Facebook',
          account: facebookAccount?.display_name || facebookAccount?.platform_username || 'Unknown',
          status: 'failed',
          error: error.response?.data?.error || error.message,
        });
      } catch {
        setPublishResult({
          platform: 'Facebook',
          account: 'Unknown',
          status: 'failed',
          error: error.response?.data?.error || error.message,
        });
      }
    } finally {
      setPublishingPosts(prev => ({ ...prev, [postId]: { ...prev[postId], facebook: false } }));
    }
  };

  const handlePublishToInstagram = async (postId: string) => {
    try {
      setPublishingPosts(prev => ({ ...prev, [postId]: { ...prev[postId], instagram: true } }));
      const response = await postsAPI.publishToInstagram(postId);
      const data = response.data;
      
      // Get account info
      const socialAccounts = await socialAccountsAPI.getAccounts();
      const instagramAccount = (socialAccounts.data.results || socialAccounts.data || []).find(
        (acc: any) => acc.platform === 'instagram' && acc.is_active
      );
      
      // Instagram post ID format: media_id (e.g., "17968155506501729")
      // Instagram post URL format: https://www.instagram.com/p/{shortcode}/
      // But we only have media_id, so we'll show the ID
      setPublishResult({
        platform: 'Instagram',
        account: instagramAccount?.display_name || instagramAccount?.platform_username || 'Unknown',
        status: 'success',
        postId: data.instagram_post_id,
        postLink: data.instagram_post_id ? `https://www.instagram.com/p/${data.instagram_post_id}/` : undefined,
      });
      
      loadPosts(); // Reload posts
    } catch (error: any) {
      console.error('Failed to publish to Instagram:', error);
      
      // Get account info for error display
      try {
        const socialAccounts = await socialAccountsAPI.getAccounts();
        const instagramAccount = (socialAccounts.data.results || socialAccounts.data || []).find(
          (acc: any) => acc.platform === 'instagram' && acc.is_active
        );
        
        setPublishResult({
          platform: 'Instagram',
          account: instagramAccount?.display_name || instagramAccount?.platform_username || 'Unknown',
          status: 'failed',
          error: error.response?.data?.error || error.message,
        });
      } catch {
        setPublishResult({
          platform: 'Instagram',
          account: 'Unknown',
          status: 'failed',
          error: error.response?.data?.error || error.message,
        });
      }
    } finally {
      setPublishingPosts(prev => ({ ...prev, [postId]: { ...prev[postId], instagram: false } }));
    }
  };

  const handlePublishToLinkedIn = async (postId: string) => {
    try {
      setPublishingPosts(prev => ({ ...prev, [postId]: { ...prev[postId], linkedin: true } }));
      const response = await postsAPI.publishToLinkedIn(postId);
      const data = response.data;
      
      // Get account info
      const socialAccounts = await socialAccountsAPI.getAccounts();
      const linkedInAccount = (socialAccounts.data.results || socialAccounts.data || []).find(
        (acc: any) => acc.platform === 'linkedin' && acc.is_active
      );
      
      setPublishResult({
        platform: 'LinkedIn',
        account: linkedInAccount?.display_name || linkedInAccount?.platform_username || 'Unknown',
        status: 'success',
        postId: data.linkedin_post_id || data.post_id,
        postLink: data.post_url || data.post_link,
      });
      
      loadPosts(); // Reload posts
    } catch (error: any) {
      console.error('Failed to publish to LinkedIn:', error);
      
      // Get account info for error display
      try {
        const socialAccounts = await socialAccountsAPI.getAccounts();
        const linkedInAccount = (socialAccounts.data.results || socialAccounts.data || []).find(
          (acc: any) => acc.platform === 'linkedin' && acc.is_active
        );
        
        setPublishResult({
          platform: 'LinkedIn',
          account: linkedInAccount?.display_name || linkedInAccount?.platform_username || 'Unknown',
          status: 'failed',
          error: error.response?.data?.error || error.message,
        });
      } catch {
        setPublishResult({
          platform: 'LinkedIn',
          account: 'Unknown',
          status: 'failed',
          error: error.response?.data?.error || error.message,
        });
      }
    } finally {
      setPublishingPosts(prev => ({ ...prev, [postId]: { ...prev[postId], linkedin: false } }));
    }
  };

  const handleApplyBranding = async (postId: string) => {
    try {
      setApplyingBranding(prev => ({ ...prev, [postId]: true }));
      const response = await postsAPI.applyBranding(postId);
      alert(t.posts.successBrandingApplied);
      loadPosts(); // Reload posts to get updated image
    } catch (error: any) {
      console.error('Failed to apply branding:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.error || 
                          error.response?.data?.message ||
                          error.message || 
                          t.posts.errorBranding;
      alert(`❌ ${errorMessage}`);
    } finally {
      setApplyingBranding(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Check if post can have branding applied
  const canApplyBranding = (post: Post) => {
    if (!companyProfile) return false;
    if (!companyProfile.branding_enabled) return false;
    if (!companyProfile.logo_url) return false;

    // Use the same logic as the image preview: any image variant counts
    const imageUrl =
      post.custom_image_url ||
      post.design_url_absolute ||
      (post as any).design_thumbnail_absolute ||
      '';

    if (!imageUrl) return false;

    // If the image URL already looks branded, hide the button
    if (imageUrl.includes('branded_')) return false;

    return true;
  };

  // Check if post is branded (for badge)
  const isBranded = (post: Post) => {
    const imageUrl =
      post.custom_image_url ||
      post.design_url_absolute ||
      (post as any).design_thumbnail_absolute ||
      '';
    return !!imageUrl && imageUrl.includes('branded_');
  };

  const handleDelete = async (postId: string) => {
    if (!confirm(t.posts.deleteConfirm)) return;
    
    try {
      await postsAPI.deletePost(postId);
      loadPosts(); // Reload posts
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <DashboardLayout 
      title={t.posts.title}
      description={t.posts.description}
    >
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={() => router.push('/ai-content-generator')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <span className="mr-2">✨</span>
            {t.posts.createWithAI}
          </Button>
        </div>

        {/* Branding Info Banner */}
        {companyProfile && (
          <>
            {companyProfile.branding_enabled && companyProfile.logo_url ? (
              <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  {t.posts.brandingActive} - {t.posts.brandingActiveDesc}
                </AlertDescription>
              </Alert>
            ) : companyProfile.branding_enabled && !companyProfile.logo_url ? (
              <Alert variant="destructive">
                <AlertDescription>
                  {t.posts.brandingWarning}. {t.posts.brandingWarningDesc}{' '}
                  <button
                    onClick={() => router.push('/setup/company')}
                    className="underline font-semibold"
                  >
                    {t.posts.uploadLogo}
                  </button>
                  .
                </AlertDescription>
              </Alert>
            ) : null}
          </>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-purple-500">
            <div className="p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {t.posts.totalPosts}
              </div>
              <div className="text-3xl font-bold">{stats.total}</div>
            </div>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <div className="p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {t.posts.published}
              </div>
              <div className="text-3xl font-bold text-green-600">{stats.published}</div>
            </div>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500">
            <div className="p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {t.posts.scheduled}
              </div>
              <div className="text-3xl font-bold text-blue-600">{stats.scheduled}</div>
            </div>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500">
            <div className="p-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {t.posts.approved}
              </div>
              <div className="text-3xl font-bold text-purple-600">{stats.approved}</div>
            </div>
          </Card>
        </div>

        {/* Posts List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">{t.posts.loading}</span>
          </div>
        ) : posts.length === 0 ? (
          // Empty State
          <Card className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">{t.posts.noPosts}</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {t.posts.noPostsDesc}
            </p>
            <Button 
              onClick={() => router.push('/ai-content-generator')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <span className="mr-2">✨</span>
              {t.posts.startWithAI}
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const statusInfo = getStatusInfo(post.status);
              const imageUrl = post.image_url_absolute || post.custom_image_url || post.design_url_absolute || post.design_thumbnail_absolute || post.image_url;
              
              // Debug: Log image URLs
              if (imageUrl) {
                console.log(`Post "${post.title}" image URL:`, imageUrl);
              }
              
              return (
                  <Card key={post.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Image on Left */}
                      <div className="flex-shrink-0 relative w-full sm:w-48">
                        <div 
                          className="w-full sm:w-48 h-48 rounded-lg overflow-hidden bg-muted relative cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (imageUrl) {
                              console.log('🖼️ Şəkil klikləndi:', imageUrl);
                              setSelectedImage(imageUrl);
                            }
                          }}
                        >
                          {imageUrl ? (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover pointer-events-none"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  const container = target.parentElement;
                                  if (container) {
                                    const errorText = t.posts.imageNotLoading;
                                    container.innerHTML = `
                                      <div class="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2 p-4 bg-muted">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                          <circle cx="8.5" cy="8.5" r="1.5"/>
                                          <polyline points="21 15 16 10 5 21"/>
                                        </svg>
                                        <span class="text-xs text-center">${errorText}</span>
                                      </div>
                                    `;
                                  }
                                }}
                                loading="lazy"
                              />
                              {isBranded(post) && (
                                <div className="absolute top-2 right-2 z-10 pointer-events-none">
                                  <Badge className="bg-green-500 text-white text-xs">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    {t.posts.branded}
                                  </Badge>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2 bg-muted">
                              <span className="text-4xl">📝</span>
                              <span className="text-xs">{t.posts.noImage}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content on Right */}
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            <Badge className={`${statusInfo.color} flex items-center gap-1 w-fit`}>
                              {statusInfo.icon}
                              {statusInfo.label}
                            </Badge>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                            {/* Apply Branding Button */}
                            {canApplyBranding(post) && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApplyBranding(post.id)}
                                disabled={applyingBranding[post.id]}
                                className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                                title={t.posts.applyBranding}
                              >
                                {applyingBranding[post.id] ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                    {t.posts.applyingBranding}
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-4 h-4 mr-1" />
                                    {t.posts.applyBranding}
                                  </>
                                )}
                              </Button>
                            )}
                            
                            {/* Publish buttons - only for approved posts */}
                            {post.status === 'approved' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handlePublishToFacebook(post.id)}
                                  disabled={publishingPosts[post.id]?.facebook}
                                  className="bg-[#1877F2] hover:bg-[#1565C0] text-white"
                                  title={t.posts.publishToFacebook}
                                >
                                  {publishingPosts[post.id]?.facebook ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Facebook className="w-4 h-4" />
                                  )}
                                </Button>
                                
                                <Button
                                  size="sm"
                                  onClick={() => handlePublishToInstagram(post.id)}
                                  disabled={publishingPosts[post.id]?.instagram}
                                  className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white"
                                  title={t.posts.publishToInstagram}
                                >
                                  {publishingPosts[post.id]?.instagram ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Instagram className="w-4 h-4" />
                                  )}
                                </Button>
                                
                                <Button
                                  size="sm"
                                  onClick={() => handlePublishToLinkedIn(post.id)}
                                  disabled={publishingPosts[post.id]?.linkedin}
                                  className="bg-[#0077b5] hover:bg-[#006399] text-white"
                                  title={t.posts.publishToLinkedIn}
                                >
                                  {publishingPosts[post.id]?.linkedin ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <LinkedInIcon className="w-4 h-4" />
                                  )}
                                </Button>
                              </>
                            )}
                            
                            {/* Pending approval - show disabled buttons with tooltip */}
                            {post.status === 'pending_approval' && (
                              <>
                                <Button
                                  size="sm"
                                  disabled
                                  className="bg-[#1877F2]/40 text-white cursor-not-allowed"
                                  title={t.posts.publishRequiresApprovalTooltip}
                                >
                                    <Facebook className="w-4 h-4" />
                                </Button>
                                
                                <Button
                                  size="sm"
                                  disabled
                                  className="bg-gradient-to-r from-[#833AB4]/40 via-[#FD1D1D]/40 to-[#F77737]/40 text-white cursor-not-allowed"
                                  title={t.posts.publishRequiresApprovalTooltip}
                                >
                                    <Instagram className="w-4 h-4" />
                                </Button>
                                
                                <Button
                                  size="sm"
                                  disabled
                                  className="bg-[#0077b5]/40 text-white cursor-not-allowed"
                                  title={t.posts.publishRequiresApprovalTooltip}
                                >
                                    <LinkedInIcon className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            
                            {/* Share Button */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedPostForShare(post);
                                setShareModalOpen(true);
                              }}
                              title={t.share?.share || 'Share'}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => router.push(`/posts/${post.id}/edit`)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-700 hover:border-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Content */}
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {post.content}
                        </p>

                        {/* Hashtags */}
                        {post.hashtags && post.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.hashtags.slice(0, 5).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.hashtags.length > 5 && (
                              <Badge variant="secondary" className="text-xs">
                                +{post.hashtags.length - 5}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Footer - Dates */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t">
                          {post.published_at && (
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{t.posts.publishedAt}: {formatDate(post.published_at)}</span>
                            </div>
                          )}
                          
                          {post.scheduled_time && !post.published_at && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{t.posts.scheduledAt}: {formatDate(post.scheduled_time)}</span>
                            </div>
                          )}
                          
                          {!post.published_at && !post.scheduled_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{t.posts.createdAt}: {formatDate(post.created_at)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>


      {/* Share Modal */}
      {selectedPostForShare && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
            setSelectedPostForShare(null);
          }}
          post={selectedPostForShare}
        />
      )}

      {/* Image Preview Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => {
        if (!open) {
          setSelectedImage(null);
        }
      }}>
        <DialogContent className="!max-w-[75vw] !w-[75vw] !p-0 !max-h-[90vh] !h-auto !bg-white dark:!bg-gray-900 !rounded-xl overflow-hidden">
          <DialogHeader className="flex flex-row items-center justify-between p-5 pb-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-0">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Şəkil Önizləməsi
            </DialogTitle>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </DialogHeader>
          
          {/* Image Container */}
          {selectedImage && (
            <div className="flex items-center justify-center bg-white dark:bg-gray-900" style={{ minHeight: '500px', maxHeight: 'calc(90vh - 150px)' }}>
              <img
                src={selectedImage}
                alt="Post şəkli"
                className="max-w-full max-h-full h-auto object-contain"
                style={{ maxHeight: 'calc(90vh - 150px)' }}
              />
            </div>
          )}
          
          {/* Footer */}
          <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            Bağlamaq üçün ESC basın və ya xaricə klik edin
          </div>
        </DialogContent>
      </Dialog>

      {/* Publish Result Dialog */}
      <Dialog open={!!publishResult} onOpenChange={(open) => {
        if (!open) {
          setPublishResult(null);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.posts.publishResultTitle}</DialogTitle>
          </DialogHeader>
          
          {publishResult && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.posts.publishResultPlatform}:</span>
                  <span className="font-medium">{publishResult.platform}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.posts.publishResultAccount}:</span>
                  <span className="font-medium">{publishResult.account}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.posts.publishResultStatus}:</span>
                  <Badge 
                    variant={publishResult.status === 'success' ? 'default' : 'destructive'}
                    className={publishResult.status === 'success' ? 'bg-green-500' : ''}
                  >
                    {publishResult.status === 'success' ? t.posts.publishResultSuccess : t.posts.publishResultFailed}
                  </Badge>
                </div>
                
                {publishResult.status === 'success' && publishResult.postId && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t.posts.publishResultPostId}:</span>
                    <span className="font-mono text-xs">{publishResult.postId}</span>
                  </div>
                )}
                
                {publishResult.status === 'success' && publishResult.postLink && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t.posts.publishResultPostLink}:</span>
                    <a 
                      href={publishResult.postLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs truncate max-w-[200px]"
                    >
                      {t.posts.publishResultPostLink}
                    </a>
                  </div>
                )}
                
                {publishResult.status === 'failed' && publishResult.error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-200">{publishResult.error}</p>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={() => setPublishResult(null)}
                className="w-full"
              >
                {t.common.close}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </DashboardLayout>
  );
}





