'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { postsAPI, authAPI, api, API_BASE_URL } from '@/lib/api';
import ImglyDesignEditor from './ImglyDesignEditor';
import FabricDesignEditor from './FabricDesignEditor';
import { Palette, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface PostApprovalGridProps {
  posts: any[];
  onPostsUpdated: (updatedPosts: any[]) => void;
  onComplete: () => void;
}

export default function PostApprovalGrid({ posts, onPostsUpdated, onComplete }: PostApprovalGridProps) {
  const router = useRouter();
  const t = useTranslation();
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [designEditorPost, setDesignEditorPost] = useState<any>(null);
  const [isDesignEditorOpen, setIsDesignEditorOpen] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [applyingBranding, setApplyingBranding] = useState<{[key: string]: boolean}>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load company profile to check branding settings
  useEffect(() => {
    const loadCompanyProfile = async () => {
      try {
        const response = await authAPI.getCompanyProfile();
        console.log('📋 Company profile loaded:', {
          branding_enabled: response.data.branding_enabled,
          hasLogo: !!(response.data.logo_url || response.data.logo || response.data.logo_file),
          logoUrl: response.data.logo_url || response.data.logo || response.data.logo_file,
          allFields: Object.keys(response.data)
        });
        setCompanyProfile(response.data);
      } catch (error) {
        console.error('❌ No company profile found:', error);
      }
    };
    loadCompanyProfile();
  }, []);

  // Auto-refresh posts to check for image updates
  useEffect(() => {
    // Check if any posts are missing images
    const hasMissingImages = posts.some(post => 
      !post.custom_image_url && !post.design_thumbnail_absolute && !post.design_thumbnail
    );

    if (!hasMissingImages) {
      return; // No need to poll if all posts have images
    }

    console.log('🔄 Starting auto-refresh for pending images...');
    
    const refreshInterval = setInterval(async () => {
      try {
        setIsRefreshing(true);
        const response = await postsAPI.getPendingPosts();
        const updatedPosts = response.data.results || response.data;
        
        // Check if any posts got updated with images
        const hasUpdates = updatedPosts.some((updatedPost: any) => {
          const oldPost = posts.find(p => p.id === updatedPost.id);
          if (!oldPost) return false;
          
          const hadImage = !!(oldPost.custom_image_url || oldPost.design_thumbnail_absolute || oldPost.design_thumbnail);
          const hasImage = !!(updatedPost.custom_image_url || updatedPost.design_thumbnail_absolute || updatedPost.design_thumbnail);
          
          return !hadImage && hasImage; // Image was added
        });
        
        if (hasUpdates) {
          console.log('✨ Images updated! Refreshing posts...');
          onPostsUpdated(updatedPosts);
        }
        
        setIsRefreshing(false);
      } catch (error) {
        console.error('Auto-refresh error:', error);
        setIsRefreshing(false);
      }
    }, 5000); // Check every 5 seconds

    return () => {
      clearInterval(refreshInterval);
      console.log('🛑 Stopped auto-refresh');
    };
  }, [posts, onPostsUpdated]);

  // Posts yüklənəndə və ya yenilənəndə, hər bir post üçün avtomatik branding tətbiq et
  useEffect(() => {
    if (!companyProfile || !posts.length) return;
    
    // Şərtləri yoxla
    if (!companyProfile.logo_url && !companyProfile.logo && !companyProfile.logo_file) {
      return; // Logo yoxdur
    }
    
    if (companyProfile.branding_enabled === false) {
      return; // Branding deaktivdir
    }
    
    // Hər bir post üçün branding yoxla və tətbiq et
    posts.forEach((post) => {
      // Şəkil var mı?
      const hasImage = !!(post.custom_image_url || post.design_url_absolute || post.design_thumbnail_absolute || post.design_thumbnail);
      if (!hasImage) return;
      
      // Artıq branded olub olmadığını yoxla
      const imageUrl = post.custom_image_url || post.design_url_absolute || post.design_thumbnail_absolute || post.design_thumbnail || '';
      if (imageUrl.includes('branded_')) return; // Artıq branded-dir
      
      // Avtomatik branding tətbiq et (səssiz şəkildə, alert göstərmədən)
      applyAutoBranding(post.id, post).catch(err => {
        console.log('⚠️ Post üçün avtomatik branding tətbiq edilə bilmədi:', post.id, err);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.length, companyProfile?.branding_enabled, companyProfile?.logo_url]); // Yalnız vacib dəyişikliklərdə işlə

  const handlePostSelect = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map(post => post.id));
    }
  };

  const handleBulkApprove = async () => {
    if (selectedPosts.length === 0) {
      alert(t.posts.pleaseSelectAtLeastOne);
      return;
    }

    if (!confirm(`${selectedPosts.length} ${t.posts.confirmApprove}`)) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await postsAPI.approvePosts(selectedPosts);
      
      // Təsdiqlənən postları siyahıdan çıxart
      const remainingPosts = posts.filter(post => 
        !selectedPosts.includes(post.id)
      );
      
      // Yalnız pending_approval statusunda olan postları saxla
      const pendingPosts = remainingPosts.filter(post => post.status === 'pending_approval');
      
      onPostsUpdated(pendingPosts);
      setSelectedPosts([]);
      console.log('✅ Posts approved successfully:', selectedPosts.length);
      
      // Əgər bütün postlar təsdiqləndisə, posts səhifəsinə yönləndir
      if (pendingPosts.length === 0) {
        setTimeout(() => {
          window.location.href = '/posts';
        }, 1000);
      }
    } catch (err: any) {
      console.error('❌ Error approving posts:', err);
      setError(err.response?.data?.error || t.posts.postsApproved);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkReject = async () => {
    if (selectedPosts.length === 0) {
      alert(t.posts.pleaseSelectAtLeastOneReject);
      return;
    }

    if (!confirm(`${selectedPosts.length} ${t.posts.confirmReject}`)) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await postsAPI.rejectPosts(selectedPosts);
      
      // Rədd edilən postları siyahıdan çıxart
      const remainingPosts = posts.filter(post => 
        !selectedPosts.includes(post.id)
      );
      
      // Yalnız pending_approval statusunda olan postları saxla
      const pendingPosts = remainingPosts.filter(post => post.status === 'pending_approval');
      
      onPostsUpdated(pendingPosts);
      setSelectedPosts([]);
      console.log('✅ Posts rejected successfully:', selectedPosts.length);
      
      // Əgər bütün postlar rədd edildisə, posts səhifəsinə yönləndir
      if (pendingPosts.length === 0) {
        setTimeout(() => {
          window.location.href = '/posts';
        }, 1000);
      }
    } catch (err: any) {
      console.error('❌ Error rejecting posts:', err);
      setError(err.response?.data?.error || t.posts.postsRejected);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = (post: any) => {
    setEditingPost({ ...post });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingPost) return;

    setIsLoading(true);
    try {
      const response = await postsAPI.updatePost(editingPost.id, {
        title: editingPost.title,
        content: editingPost.content,
        description: editingPost.description,
        hashtags: editingPost.hashtags
      });

      // Update posts list
      const updatedPosts = posts.map(post => 
        post.id === editingPost.id ? response.data : post
      );
      onPostsUpdated(updatedPosts);
      setIsEditModalOpen(false);
    } catch (err: any) {
      setError(t.posts.postUpdateFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (postId: string, file: File) => {
    console.log('📤 Image upload başladı:', { postId, fileName: file.name, fileSize: file.size, fileType: file.type });
    setUploadingImage(postId);
    setError(''); // Clear previous errors
    
    try {
      // File size validation (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        const errorMsg = `Şəkil çox böyükdür (${(file.size / 1024 / 1024).toFixed(2)}MB). Maksimum ölçü: 10MB.`;
        console.error('❌ File too large:', file.size);
        setError(errorMsg);
        setUploadingImage(null);
        return;
      }
      
      console.log('🔄 API-yə request göndərilir...');
      const response = await postsAPI.uploadCustomImage(postId, file);
      console.log('✅ API cavabı:', response.data);
      
      // Update posts list
      let updatedPost = response.data.post;
      if (!updatedPost) {
        console.error('❌ Response-da post yoxdur:', response.data);
        setError('Şəkil yükləndi, amma post məlumatları yenilənmədi.');
        setUploadingImage(null);
        return;
      }
      
      console.log('📝 Post yenilənir:', updatedPost.id);
      const updatedPosts = posts.map(post => 
        post.id === postId ? updatedPost : post
      );
      onPostsUpdated(updatedPosts);
      
      // Avtomatik branding tətbiq et
      console.log('🎨 Avtomatik branding tətbiq olunur...');
      await applyAutoBranding(postId, updatedPost);
      console.log('✅ Şəkil uğurla yükləndi və branding tətbiq edildi!');
    } catch (err: any) {
      console.error('❌ Image upload xətası:', err);
      console.error('❌ Error response:', err.response?.data);
      console.error('❌ Error status:', err.response?.status);
      
      let errorMessage = t.posts.imageUploadFailed;
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.status === 400) {
        errorMessage = 'Yanlış sorğu. Şəkil faylını yoxlayın.';
      } else if (err.response?.status === 401) {
        errorMessage = 'Giriş tələb olunur. Zəhmət olmasa, yenidən giriş edin.';
      } else if (err.response?.status === 404) {
        errorMessage = 'Post tapılmadı. Zəhmət olmasa, səhifəni yeniləyin.';
      } else if (err.response?.status === 413) {
        errorMessage = 'Şəkil çox böyükdür. Maksimum ölçü: 10MB.';
      } else if (err.response?.status === 500) {
        errorMessage = 'Server xətası. Zəhmət olmasa, bir az sonra yenidən cəhd edin.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      alert(`❌ ${errorMessage}`);
    } finally {
      setUploadingImage(null);
    }
  };

  const handleOpenDesignEditor = (post: any) => {
    console.log('🖌️ Opening design editor for post:', post.id);
    // Navigate to new design editor page
    router.push(`/design-editor/${post.id}`);
  };

  // Avtomatik branding funksiyası - şəkil yüklənəndə çağırılır
  const applyAutoBranding = async (postId: string, post?: any) => {
    try {
      // Şərtləri yoxla
      if (!companyProfile) {
        console.log('⚠️ Company profile yoxdur, branding tətbiq edilmədi');
        return;
      }
      
      if (!companyProfile.logo_url && !companyProfile.logo && !companyProfile.logo_file) {
        console.log('⚠️ Logo yoxdur, branding tətbiq edilmədi');
        return;
      }
      
      if (companyProfile.branding_enabled === false) {
        console.log('⚠️ Branding deaktivdir, tətbiq edilmədi');
        return;
      }
      
      // Post məlumatını al
      const currentPost = post || posts.find(p => p.id === postId);
      if (!currentPost) {
        console.log('⚠️ Post tapılmadı');
        return;
      }
      
      // Şəkil var mı yoxla
      const hasImage = !!(currentPost.custom_image_url || currentPost.design_url_absolute || currentPost.design_thumbnail_absolute || currentPost.design_thumbnail);
      if (!hasImage) {
        console.log('⚠️ Postda şəkil yoxdur');
        return;
      }
      
      // Artıq branded olub olmadığını yoxla
      const imageUrl = currentPost.custom_image_url || currentPost.design_url_absolute || currentPost.design_thumbnail_absolute || currentPost.design_thumbnail || '';
      if (imageUrl.includes('branded_')) {
        console.log('✅ Şəkil artıq branded-dir');
        return;
      }
      
      // Token yoxla
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.log('⚠️ Token yoxdur, branding tətbiq edilmədi');
        return;
      }
      
      console.log('🎨 Avtomatik branding tətbiq olunur...', postId);
      
      // ✅ FIX: fetch istifadə et
      // API_BASE_URL artıq /api ilə bitir, yəni tam URL: {API_BASE_URL}/posts/{id}/apply-branding/
      const url = `${API_BASE_URL}/posts/${postId}/apply-branding/`;
      console.log('🔗 Auto-branding URL:', url);
      console.log('🔗 API_BASE_URL:', API_BASE_URL);
      console.log('🔗 Post ID:', postId);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);
      
      if (!response.ok) {
        // 404 xətası zamanı Django HTML error page qaytarır, JSON deyil
        let errorMessage = `HTTP ${response.status}`;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.detail || errorMessage;
          } else {
            // HTML error page - text olaraq oxu
            const errorText = await response.text();
            if (response.status === 404) {
              errorMessage = `404 Not Found: Endpoint tapılmadı. Backend-də '/api/posts/{id}/apply-branding/' endpoint-i URL routing-də qeydiyyata alınmalıdır.`;
            } else {
              errorMessage = `HTTP ${response.status}: ${errorText.substring(0, 200)}`;
            }
          }
        } catch (e) {
          // Parse edə bilmədi, sadəcə status code istifadə et
          if (response.status === 404) {
            errorMessage = '404 Not Found: Endpoint tapılmadı';
          }
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('✅ Avtomatik branding uğurla tətbiq edildi!');
      
      // Post-u yenilə
      const brandedPost = data.post || data;
      const updatedPosts = posts.map(p => 
        p.id === postId ? brandedPost : p
      );
      onPostsUpdated(updatedPosts);
      
    } catch (error: any) {
      // Avtomatik branding xətasını səssiz şəkildə logla, istifadəçiyə göstərmə
      // 404 xətası olsa, backend-də endpoint qeydiyyata alınmayıb
      if (error.message?.includes('404') || error.message?.includes('HTTP 404')) {
        console.warn('⚠️ Branding endpoint tapılmadı (404). Backend-də `/api/posts/{id}/apply-branding/` endpoint-i URL routing-də qeydiyyata alınmalıdır.');
      } else {
        console.error('⚠️ Avtomatik branding tətbiq edilə bilmədi:', error);
      }
      // Xəta olsa belə, şəkil yüklənmə prosesi davam etsin
    }
  };

  const handleApplyBranding = async (postId: string) => {
    try {
      setApplyingBranding(prev => ({ ...prev, [postId]: true }));
      
      // Check prerequisites before calling API
      if (!companyProfile) {
        alert(`❌ ${t.posts.companyProfileNotFound}`);
        return;
      }
      
      if (!companyProfile.logo_url && !companyProfile.logo && !companyProfile.logo_file) {
        alert(`❌ ${t.posts.companyLogoNotFound}`);
        return;
      }
      
      if (companyProfile.branding_enabled === false) {
        alert(`❌ ${t.posts.brandingDisabled}`);
        return;
      }
      
      const post = posts.find(p => p.id === postId);
      if (!post) {
        alert(`❌ ${t.posts.postNotFound}`);
        return;
      }
      
      const hasImage = !!(post.custom_image_url || post.design_url_absolute || post.design_thumbnail_absolute || post.design_thumbnail);
      if (!hasImage) {
        alert(`❌ ${t.posts.noImageInPost}`);
        return;
      }
      
      // Call API
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert(`❌ ${t.posts.loginRequired}`);
        setApplyingBranding(prev => ({ ...prev, [postId]: false }));
        return;
      }
      
      // ✅ FIX: fetch istifadə et
      // API_BASE_URL artıq /api ilə bitir, yəni tam URL: {API_BASE_URL}/posts/{id}/apply-branding/
      const url = `${API_BASE_URL}/posts/${postId}/apply-branding/`;
      
      console.log('🎨 Applying branding to post:', postId);
      console.log('🌐 Full URL:', url);
      console.log('🔗 API_BASE_URL:', API_BASE_URL);
      console.log('🔑 Token exists:', !!token);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);
      
      if (!response.ok) {
        // 404 xətası zamanı Django HTML error page qaytarır, JSON deyil
        let errorMessage = `HTTP ${response.status}`;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.detail || errorMessage;
          } else {
            // HTML error page - text olaraq oxu
            const errorText = await response.text();
            if (response.status === 404) {
              errorMessage = `404 Not Found: Endpoint tapılmadı. Backend-də '/api/posts/{id}/apply-branding/' endpoint-i URL routing-də qeydiyyata alınmalıdır.`;
            } else {
              errorMessage = `HTTP ${response.status}: ${errorText.substring(0, 200)}`;
            }
          }
        } catch (e) {
          // Parse edə bilmədi, sadəcə status code istifadə et
          if (response.status === 404) {
            errorMessage = '404 Not Found: Endpoint tapılmadı';
          }
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('✅ Branding response:', data);
      
      // Success message
      alert(`✅ ${t.posts.brandingApplied}`);
      
      // Update posts list with branded image
      // Backend response format: { post: {...}, message: "..." } və ya { ...post data }
      const updatedPost = data.post || data;
      const updatedPosts = posts.map(post => 
        post.id === postId ? updatedPost : post
      );
      onPostsUpdated(updatedPosts);
    } catch (error: any) {
      console.error('❌ Failed to apply branding:', error);
      
      // Handle specific error messages from API
      let errorMessage = 'Brending tətbiq edilə bilmədi';
      
      if (error.message) {
        if (error.message.includes('404') || error.message.includes('HTTP 404')) {
          errorMessage = '⚠️ Backend endpoint tapılmadı (404).\n\nURL pattern backend-də mövcuddur, amma endpoint işləmir.\n\nYoxlayın:\n1. Backend server restart olunub? (python manage.py runserver)\n2. `ApplyBrandingView` class-ı `posts/views.py`-də mövcuddur?\n3. URL pattern sırası düzgündür? (`<uuid:post_id>/apply-branding/` digər UUID pattern-lərindən ƏVVƏL olmalıdır)\n4. Main `urls.py`-də `posts.urls` include olunub? (`path(\'api/posts/\', include(\'posts.urls\'))`)\n\nBackend developer ilə əlaqə saxlayın.';
        } else if (error.message.includes('401') || error.message.includes('HTTP 401')) {
          errorMessage = 'Giriş tələb olunur. Zəhmət olmasa, yenidən giriş edin.';
        } else if (error.message.includes('403') || error.message.includes('HTTP 403')) {
          errorMessage = 'Bu əməliyyat üçün icazəniz yoxdur.';
        } else if (error.message.includes('500') || error.message.includes('HTTP 500')) {
          errorMessage = 'Server xətası. Zəhmət olmasa, bir az sonra yenidən cəhd edin.';
        } else if (error.message.includes('400') || error.message.includes('HTTP 400')) {
          errorMessage = 'Yanlış sorğu. Zəhmət olmasa, məlumatları yoxlayın.';
        } else {
          errorMessage = error.message;
        }
      } else if (error.response?.status === 404) {
        // 404 xətası - endpoint tapılmadı
        const apiError = error.response.data;
        const requestedUrl = error.config?.url || error.response?.config?.url;
        
        // Check if it's Django 404 page (HTML response)
        if (typeof apiError === 'string' && (apiError.includes('Page not found') || apiError.includes('didn\'t match any'))) {
          errorMessage = '⚠️ Backend endpoint tapılmadı (404).\n\nBackend-də `/api/posts/{id}/apply-branding/` endpoint-i URL routing-də qeydiyyata alınmalıdır.\n\nYoxlayın:\n1. `posts/urls.py` faylında pattern var?\n2. Pattern sırası düzgündür? (digər <uuid:...> pattern-lərindən ƏVVƏL olmalıdır)\n3. Backend server restart olunub?\n\nNümunə:\n```python\npath(\'<uuid:post_id>/apply-branding/\', views.ApplyBrandingView.as_view(), name=\'apply_branding\'),\n```';
        } else {
          errorMessage = `Post tapılmadı (ID: ${postId}). Zəhmət olmasa, post ID-ni yoxlayın.`;
        }
        
        console.error('🔍 404 Error - Requested URL:', requestedUrl);
        console.error('🔍 404 Error - Post ID:', postId);
      } else if (error.response?.status === 500) {
        errorMessage = 'Server xətası. Zəhmət olmasa, bir az sonra yenidən cəhd edin.';
      } else if (error.message && !error.message.includes('<')) {
        // Only use error.message if it doesn't contain HTML
        errorMessage = error.message;
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setApplyingBranding(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Check if post can have branding applied (manual button - only show if auto-branding is disabled)
  const canApplyBranding = (post: any) => {
    // Avtomatik branding aktivdirsə, düyməni göstərmə
    if (companyProfile?.branding_enabled === true) {
      // Avtomatik branding aktivdir, düyməni göstərmə
      return false;
    }
    
    // Check if post has image first (most basic requirement)
    const imageUrl = post.custom_image_url || post.design_url_absolute || post.design_thumbnail_absolute || post.design_thumbnail || '';
    if (!imageUrl) {
      return false;
    }
    
    // Check if already branded
    if (imageUrl.includes('branded_')) {
      return false;
    }
    
    // If no company profile loaded yet, don't show button (will show once loaded)
    if (!companyProfile) {
      return false;
    }
    
    // Check branding enabled (default to true if not set, since it's the default)
    const brandingEnabled = companyProfile.branding_enabled !== false;
    if (!brandingEnabled) {
      return false;
    }
    
    // Check for logo (try multiple possible field names)
    const hasLogo = !!(companyProfile.logo_url || companyProfile.logo || companyProfile.logo_file);
    if (!hasLogo) {
      return false;
    }
    
    return true;
  };

  // Check if post is branded
  const isBranded = (post: any) => {
    const imageUrl = post.custom_image_url || post.design_url_absolute || post.design_thumbnail_absolute || post.design_thumbnail || '';
    return imageUrl.includes('branded_');
  };

  const handleSaveDesign = async (designDataURL: string, sceneData?: any) => {
    if (!designEditorPost) return;

    try {
      console.log('🎬 handleSaveDesign called');
      console.log('📦 Received sceneData:', sceneData ? 'YES' : 'NO');
      console.log('📊 sceneData type:', typeof sceneData);
      console.log('📊 sceneData length:', sceneData?.length || 'N/A');
      console.log('📊 sceneData preview (first 100 chars):', sceneData?.substring ? sceneData.substring(0, 100) : 'N/A');
      
      // Convert data URL to Blob
      const response = await fetch(designDataURL);
      const blob = await response.blob();
      
      // Create FormData and upload
      const file = new File([blob], `design_${designEditorPost.id}.jpg`, { type: 'image/jpeg' });
      console.log('📤 Uploading image...');
      const uploadResponse = await postsAPI.uploadCustomImage(designEditorPost.id, file);
      console.log('✅ Image uploaded:', uploadResponse.data);
      console.log('🖼️ Image URL in response:', uploadResponse.data.post?.custom_image_url);
      
      // If scene data is provided, save it to the post
      let finalPost = uploadResponse.data.post;
      if (sceneData) {
        console.log('💾 Now saving scene data separately...');
        console.log('🔍 POST data to send:', { imgly_scene: sceneData });
        const updateResponse = await postsAPI.updatePost(designEditorPost.id, { imgly_scene: sceneData });
        console.log('✅ Scene update response:', updateResponse);
        console.log('✅ Scene update response.data:', updateResponse.data);
        console.log('🔍 Response has imgly_scene?', !!updateResponse.data?.imgly_scene);
        console.log('🔍 Response has id?', !!updateResponse.data?.id, 'ID:', updateResponse.data?.id);
        
        // Merge the scene data into the uploaded post (preserving all fields including id)
        finalPost = {
          ...finalPost,
          imgly_scene: updateResponse.data.imgly_scene,
          id: designEditorPost.id // Ensure ID is always preserved
        };
      } else {
        console.log('⚠️ No scene data to save');
      }
      
      // Update posts list with the final post (including scene data)
      const updatedPosts = posts.map(post => 
        post.id === designEditorPost.id ? finalPost : post
      );
      console.log('📝 Final updated post:', finalPost);
      console.log('🔍 Final post has id?', !!finalPost.id, 'ID:', finalPost.id);
      console.log('🔍 Final post has imgly_scene?', !!finalPost.imgly_scene);
      onPostsUpdated(updatedPosts);
      
      // Avtomatik branding tətbiq et
      await applyAutoBranding(designEditorPost.id, finalPost);
      
      setIsDesignEditorOpen(false);
      alert('✅ Dizayn uğurla saxlanıldı!');
      
    } catch (error) {
      console.error('Failed to save design:', error);
      alert('❌ Dizayn saxlanıla bilmədi');
    }
  };


  return (
    <div className="space-y-6 px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6">
      <div className="text-center space-y-2 px-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{t.posts.reviewGeneratedPosts}</h1>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground px-2">
          {t.posts.reviewGeneratedPostsDesc}
        </p>
        {posts.some(post => !post.custom_image_url && !post.design_thumbnail_absolute && !post.design_thumbnail) && (
          <div className="flex items-center justify-center space-x-2 text-xs text-blue-600 dark:text-blue-400 mt-2">
            <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{t.posts.imagesGenerating}</span>
          </div>
        )}
      </div>

      {error && (
        <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Bulk Actions */}
      <Card className="mx-2 sm:mx-0">
        <CardHeader className="px-3 sm:px-6">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <span className="flex items-center text-base sm:text-lg">
              <span className="mr-2">⚡</span>
              <span className="break-words">{t.posts.bulkOperations}</span>
            </span>
            <Badge variant="secondary" className="flex-shrink-0 text-xs sm:text-sm mt-2 sm:mt-0">
              {selectedPosts.length} {t.posts.selectedOf} {posts.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={handleSelectAll}
                size="sm"
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                {selectedPosts.length === posts.length ? t.posts.deselectAll : t.posts.selectAll}
              </Button>
              <span className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                {selectedPosts.length} {t.posts.postsSelected}
              </span>
            </div>
            
            <div className="flex items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button
                onClick={handleBulkApprove}
                disabled={selectedPosts.length === 0 || isLoading}
                size="sm"
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <span className="mr-1">✅</span>
                <span className="hidden sm:inline">{t.posts.approveSelected}</span>
                <span className="sm:hidden">{t.posts.approve}</span>
              </Button>
              <Button
                variant="destructive"
                onClick={handleBulkReject}
                disabled={selectedPosts.length === 0 || isLoading}
                size="sm"
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <span className="mr-1">❌</span>
                <span className="hidden sm:inline">{t.posts.rejectSelected}</span>
                <span className="sm:hidden">{t.posts.reject}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
        {posts.map((post, index) => (
          <Card 
            key={post.id} 
            className={`transition-all hover:shadow-lg cursor-pointer ${
              selectedPosts.includes(post.id) ? 'ring-2 ring-primary' : ''
            }`}
            onClick={(e) => {
              // Checkbox və button-lara kliklədikdə işləməsin
              const target = e.target as HTMLElement;
              if (target.closest('input[type="checkbox"]') || 
                  target.closest('button') || 
                  target.closest('a') ||
                  target.tagName === 'BUTTON' ||
                  target.tagName === 'INPUT' ||
                  target.tagName === 'A') {
                return;
              }
              handlePostSelect(post.id);
            }}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handlePostSelect(post.id)}
                    className="w-4 h-4 mt-1 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg break-words">{post.title}</CardTitle>
                    <CardDescription className="break-words">
                      {t.posts.postNumber} #{index + 1} • {post.character_count || 0} {t.posts.characters}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-500 text-white flex-shrink-0">
                  {t.posts.waiting}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Post Content */}
              <div className="space-y-2">
                <div className="p-3 bg-muted rounded-lg text-sm">
                  <pre className="whitespace-pre-wrap font-sans">
                    {post.content.length > 200 
                      ? `${post.content.substring(0, 200)}...` 
                      : post.content
                    }
                  </pre>
                </div>
                {post.description && (
                  <p className="text-xs text-muted-foreground italic">
                    {post.description}
                  </p>
                )}
              </div>

              {/* Hashtags */}
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.hashtags.map((hashtag: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Image Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t.posts.postImage}</Label>
                {post.custom_image_url || post.design_thumbnail_absolute || post.design_thumbnail ? (
                  <div className="relative">
                    <img
                      src={post.custom_image_url || post.design_thumbnail_absolute || post.design_thumbnail}
                      alt={t.posts.postImage}
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    {isBranded(post) && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-500 text-white text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {t.posts.branded}
                        </Badge>
                      </div>
                    )}
                    {(post.design_thumbnail_absolute || post.design_thumbnail) && !post.custom_image_url && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {t.posts.placeholder}
                        </Badge>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg border overflow-hidden">
                    {/* Skeleton Loading Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-3 p-4">
                        <div className="animate-pulse">
                          <div className="text-4xl mb-3">🎨</div>
                          <div className="space-y-2">
                            <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
                            <div className="h-2 w-48 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                          <div className="animate-spin w-3 h-3 border-2 border-primary border-t-transparent rounded-full"></div>
                          <span>{t.posts.imageGenerating}</span>
                        </div>
                      </div>
                    </div>
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer"></div>
                  </div>
                )}
                
                {/* Image Upload Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(post.id, file);
                    }}
                    className="hidden"
                    id={`image-upload-${post.id}`}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById(`image-upload-${post.id}`)?.click()}
                    disabled={uploadingImage === post.id}
                    className="flex-1 sm:flex-none"
                  >
                    {uploadingImage === post.id ? (
                      <>
                        <span className="mr-2">⏳</span>
                        <span className="hidden sm:inline">{t.posts.imageUploading}</span>
                        <span className="sm:hidden">{t.posts.upload}</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">📁</span>
                        <span className="hidden sm:inline">{t.posts.uploadImage}</span>
                        <span className="sm:hidden">{t.posts.upload}</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t">
                {/* Redaktə Düymələri */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPost(post)}
                    className="flex-1 sm:flex-none"
                  >
                    <span className="mr-1">✏️</span>
                    <span className="hidden sm:inline">{t.posts.editPost}</span>
                    <span className="sm:hidden">{t.posts.edit}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDesignEditor(post)}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 flex-1 sm:flex-none"
                  >
                    <Palette className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">{t.posts.designEditor}</span>
                    <span className="sm:hidden">{t.posts.design}</span>
                  </Button>
                </div>
                
                {/* Təsdiq/Rədd Düymələri */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedPosts([post.id]);
                      handleBulkReject();
                    }}
                    className="flex-1"
                  >
                    <span className="mr-1">❌</span>
                    <span>{t.posts.reject}</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedPosts([post.id]);
                      handleBulkApprove();
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <span className="mr-1">✅</span>
                    <span>{t.posts.approve}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Complete Button */}
      <div className="text-center pt-6">
        <Button
          onClick={onComplete}
          variant="outline"
          size="lg"
        >
          <span className="mr-2">📅</span>
          {t.posts.goToCalendar}
        </Button>
      </div>

      {/* Edit Post Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.posts.editPostTitle}</DialogTitle>
            <DialogDescription>
              {t.posts.editPostDesc}
            </DialogDescription>
          </DialogHeader>

          {editingPost && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Paylaşım Başlığı</Label>
                <Input
                  id="edit-title"
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-content">{t.posts.postContent}</Label>
                <Textarea
                  id="edit-content"
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="min-h-[150px]"
                />
                <div className="text-xs text-muted-foreground text-right">
                  {editingPost.content?.length || 0} simvol
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">{t.posts.description}</Label>
                <Textarea
                  id="edit-description"
                  value={editingPost.description || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                  className="min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-hashtags">{t.posts.hashtags}</Label>
                <Input
                  id="edit-hashtags"
                  value={Array.isArray(editingPost.hashtags) ? editingPost.hashtags.join(', ') : ''}
                  onChange={(e) => {
                    const hashtags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                    setEditingPost({ ...editingPost, hashtags });
                  }}
                  placeholder="#heşteq1, #heşteq2, #heşteq3"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Ləğv Et
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                >
                  {isLoading ? t.posts.saving : t.posts.saveChanges}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Design Editor - Using Fabric.js (Free & Open Source) */}
      {designEditorPost && (
        <FabricDesignEditor
          isOpen={isDesignEditorOpen}
          onClose={() => {
            console.log('Closing design editor...');
            setIsDesignEditorOpen(false);
            setDesignEditorPost(null);
          }}
          post={designEditorPost}
          onSave={async (designDataURL) => {
            try {
              // Convert data URL to Blob
              const response = await fetch(designDataURL);
              const blob = await response.blob();
              
              // Create FormData and upload
              const file = new File([blob], `design_${designEditorPost.id}.jpg`, { type: 'image/jpeg' });
              const uploadResponse = await postsAPI.uploadCustomImage(designEditorPost.id, file);
              
              // Update posts list
              const updatedPosts = posts.map(post => 
                post.id === designEditorPost.id ? uploadResponse.data.post : post
              );
              onPostsUpdated(updatedPosts);
              
              // Apply auto branding
              await applyAutoBranding(designEditorPost.id, uploadResponse.data.post);
              
              setIsDesignEditorOpen(false);
              alert(`✅ ${t.posts.designSaved}`);
            } catch (error) {
              console.error('Failed to save design:', error);
              alert(`❌ ${t.posts.designSaveFailed}`);
            }
          }}
        />
      )}
      
      {/* Old img.ly Design Editor (commented out for reference) */}
      {/* {designEditorPost && (
        <ImglyDesignEditor
          isOpen={false}
          onClose={() => setIsDesignEditorOpen(false)}
          post={designEditorPost}
          onSave={handleSaveDesign}
        />
      )} */}
    </div>
  );
}
