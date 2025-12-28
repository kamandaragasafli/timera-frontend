'use client';

import { useState } from 'react';
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
import { Palette, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

interface PostApprovalGridProps {
  posts: any[];
  onPostsUpdated: (updatedPosts: any[]) => void;
  onComplete: () => void;
}

export default function PostApprovalGrid({ posts, onPostsUpdated, onComplete }: PostApprovalGridProps) {
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
      alert('Zəhmət olmasa, təsdiqləmək üçün ən azı bir paylaşım seçin.');
      return;
    }

    if (!confirm(`${selectedPosts.length} paylaşım təsdiqlənsin?`)) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await postsAPI.approvePosts(selectedPosts);
      const updatedPosts = response.data.updated_posts || response.data.posts || [];
      onPostsUpdated(updatedPosts);
      setSelectedPosts([]);
      console.log('✅ Posts approved successfully:', updatedPosts.length);
    } catch (err: any) {
      console.error('❌ Error approving posts:', err);
      setError(err.response?.data?.error || 'Paylaşımlar təsdiqlənə bilmədi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkReject = async () => {
    if (selectedPosts.length === 0) {
      alert('Zəhmət olmasa, rədd etmək üçün ən azı bir paylaşım seçin.');
      return;
    }

    if (!confirm(`${selectedPosts.length} paylaşım rədd edilsin?`)) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await postsAPI.rejectPosts(selectedPosts);
      const updatedPosts = response.data.updated_posts || response.data.posts || [];
      onPostsUpdated(updatedPosts);
      setSelectedPosts([]);
      console.log('✅ Posts rejected successfully:', updatedPosts.length);
    } catch (err: any) {
      console.error('❌ Error rejecting posts:', err);
      setError(err.response?.data?.error || 'Paylaşımlar rədd edilə bilmədi. Zəhmət olmasa yenidən cəhd edin.');
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
      setError('Paylaşım yenilənə bilmədi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (postId: string, file: File) => {
    setUploadingImage(postId);
    try {
      const response = await postsAPI.uploadCustomImage(postId, file);
      
      // Update posts list
      let updatedPost = response.data.post;
      const updatedPosts = posts.map(post => 
        post.id === postId ? updatedPost : post
      );
      onPostsUpdated(updatedPosts);
      
      // Avtomatik branding tətbiq et
      await applyAutoBranding(postId, updatedPost);
    } catch (err: any) {
      setError('Şəkil yüklənə bilmədi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setUploadingImage(null);
    }
  };

  const handleOpenDesignEditor = (post: any) => {
    console.log('🖌️ Opening design editor for post:', post.id);
    console.log('📦 Post data:', post);
    console.log('🔍 Has imgly_scene?', !!post.imgly_scene, 'Type:', typeof post.imgly_scene);
    if (post.imgly_scene) {
      console.log('📊 imgly_scene length:', post.imgly_scene.length || 'N/A');
    }
    setDesignEditorPost(post);
    setIsDesignEditorOpen(true);
    console.log('✅ Design editor state updated');
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
        alert('❌ Şirkət profili tapılmadı. Zəhmət olmasa, əvvəlcə şirkət məlumatlarını doldurun.');
        return;
      }
      
      if (!companyProfile.logo_url && !companyProfile.logo && !companyProfile.logo_file) {
        alert('❌ Şirkət loqosu tapılmadı. Əvvəlcə logo yükləyin.');
        return;
      }
      
      if (companyProfile.branding_enabled === false) {
        alert('❌ Brending deaktivdir. Parametrlərdə aktivləşdirin.');
        return;
      }
      
      const post = posts.find(p => p.id === postId);
      if (!post) {
        alert('❌ Post tapılmadı.');
        return;
      }
      
      const hasImage = !!(post.custom_image_url || post.design_url_absolute || post.design_thumbnail_absolute || post.design_thumbnail);
      if (!hasImage) {
        alert('❌ Bu postda şəkil yoxdur.');
        return;
      }
      
      // Call API
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('❌ Giriş tələb olunur. Zəhmət olmasa, yenidən giriş edin.');
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
      alert('✅ Brending uğurla tətbiq edildi! ✨');
      
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

  // Check if post can have branding applied
  const canApplyBranding = (post: any) => {
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
    <div className="space-y-6 px-4 sm:px-0">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Yaradılmış Paylaşımları Nəzərdən Keçirin</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          AI yaratdığı məzmunu nəzərdən keçirin, redaktə edin və təsdiqləyin
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="flex items-center">
              <span className="mr-2">⚡</span>
              Toplu Əməliyyatlar
            </span>
            <Badge variant="secondary" className="flex-shrink-0">
              {posts.length}-dən {selectedPosts.length} seçildi
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={handleSelectAll}
                size="sm"
                className="w-full sm:w-auto"
              >
                {selectedPosts.length === posts.length ? 'Hamısının Seçimini Ləğv Et' : 'Hamısını Seç'}
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedPosts.length} paylaşım seçildi
              </span>
            </div>
            
            <div className="flex items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button
                onClick={handleBulkApprove}
                disabled={selectedPosts.length === 0 || isLoading}
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <span className="mr-1">✅</span>
                <span className="hidden sm:inline">Seçilənləri Təsdiqlə</span>
                <span className="sm:hidden">Təsdiqlə</span>
              </Button>
              <Button
                variant="destructive"
                onClick={handleBulkReject}
                disabled={selectedPosts.length === 0 || isLoading}
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <span className="mr-1">❌</span>
                <span className="hidden sm:inline">Seçilənləri Rədd Et</span>
                <span className="sm:hidden">Rədd Et</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <Card 
            key={post.id} 
            className={`transition-all hover:shadow-lg ${
              selectedPosts.includes(post.id) ? 'ring-2 ring-primary' : ''
            }`}
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
                      Paylaşım #{index + 1} • {post.character_count || 0} simvol
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-500 text-white flex-shrink-0">
                  Gözləyir
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
                <Label className="text-sm font-medium">Paylaşım Şəkli</Label>
                {post.custom_image_url || post.design_thumbnail_absolute || post.design_thumbnail ? (
                  <div className="relative">
                    <img
                      src={post.custom_image_url || post.design_thumbnail_absolute || post.design_thumbnail}
                      alt="Paylaşım şəkli"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    {isBranded(post) && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-500 text-white text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Brendləşdirilib
                        </Badge>
                      </div>
                    )}
                    {(post.design_thumbnail_absolute || post.design_thumbnail) && !post.custom_image_url && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          Yer Tutucu
                        </Badge>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🖼️</div>
                    <p className="text-sm text-muted-foreground">Şəkil yüklənməyib</p>
                    <p className="text-xs text-muted-foreground mt-1">Paylaşımınızı daha cəlbedici etmək üçün şəkil yükləyin</p>
                  </div>
                )}
                
                {/* Image Upload and Branding Buttons */}
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
                        <span className="hidden sm:inline">Şəkil Yüklənir...</span>
                        <span className="sm:hidden">Yüklənir...</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">📁</span>
                        <span className="hidden sm:inline">Şəkil Yüklə</span>
                        <span className="sm:hidden">Yüklə</span>
                      </>
                    )}
                  </Button>
                  
                  {/* Apply Branding Button */}
                  {canApplyBranding(post) && !isBranded(post) && (
                    <Button
                      size="sm"
                      onClick={() => handleApplyBranding(post.id)}
                      disabled={applyingBranding[post.id]}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 flex-1 sm:flex-none"
                      title="Loqo və slogan əlavə et"
                    >
                      {applyingBranding[post.id] ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          <span className="hidden sm:inline">Tətbiq olunur...</span>
                          <span className="sm:hidden">Yüklənir...</span>
                        </>
                      ) : (
                        <>
                          <span className="mr-1">🎨</span>
                          <span className="hidden sm:inline">Brending Tətbiq Et</span>
                          <span className="sm:hidden">Brending</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPost(post)}
                    className="flex-1 sm:flex-none"
                  >
                    <span className="mr-1">✏️</span>
                    <span className="hidden sm:inline">Redaktə Et</span>
                    <span className="sm:hidden">Redaktə</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDesignEditor(post)}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 flex-1 sm:flex-none"
                  >
                    <Palette className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Dizayn Redaktoru</span>
                    <span className="sm:hidden">Dizayn</span>
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedPosts([post.id]);
                      handleBulkReject();
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <span className="mr-1">❌</span>
                    <span className="hidden sm:inline">Rədd Et</span>
                    <span className="sm:hidden">Rədd</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedPosts([post.id]);
                      handleBulkApprove();
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <span className="mr-1">✅</span>
                    <span className="hidden sm:inline">Təsdiqlə</span>
                    <span className="sm:hidden">OK</span>
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
          Təqvimə Get
        </Button>
      </div>

      {/* Edit Post Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Paylaşımı Redaktə Et</DialogTitle>
            <DialogDescription>
              AI yaratdığı məzmunu ehtiyaclarınıza uyğun şəkildə dəyişdirin
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
                <Label htmlFor="edit-content">Paylaşım Məzmunu</Label>
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
                <Label htmlFor="edit-description">Təsvir</Label>
                <Textarea
                  id="edit-description"
                  value={editingPost.description || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                  className="min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-hashtags">Heşteqlər</Label>
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
                  {isLoading ? 'Yadda saxlanılır...' : 'Dəyişiklikləri Yadda Saxla'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* img.ly Design Editor */}
      {designEditorPost && (
        <ImglyDesignEditor
          isOpen={isDesignEditorOpen}
          onClose={() => setIsDesignEditorOpen(false)}
          post={designEditorPost}
          onSave={handleSaveDesign}
        />
      )}
    </div>
  );
}
