'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { postsAPI } from '@/lib/api';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FabricDesignEditor from '@/components/posts/FabricDesignEditor';

export default function DesignEditorPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true);
        // Load post data
        const response = await postsAPI.getPost(postId);
        setPost(response.data);
        setError(null);
      } catch (err: any) {
        console.error('Failed to load post:', err);
        setError(err.response?.data?.message || 'Post yüklənə bilmədi');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      loadPost();
    }
  }, [postId]);

  const handleSave = async (designDataURL: string) => {
    try {
      // Convert data URL to Blob
      const response = await fetch(designDataURL);
      const blob = await response.blob();
      
      // Create FormData and upload
      const file = new File([blob], `design_${postId}.jpg`, { type: 'image/jpeg' });
      const uploadResponse = await postsAPI.uploadCustomImage(postId, file);
      
      // Update post state
      setPost(uploadResponse.data.post);
      
      alert('✅ Dizayn uğurla saxlanıldı!');
      
      // Redirect back to posts page
      router.push('/ai-content-generator');
    } catch (error) {
      console.error('Failed to save design:', error);
      alert('❌ Dizayn saxlanıla bilmədi');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">Post yüklənir...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Xəta</h1>
          <p className="text-gray-600 mb-6">{error || 'Post tapılmadı'}</p>
          <Button onClick={() => router.push('/ai-content-generator')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri qayıt
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Coming Soon Banner - Timera V2 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-b-2 border-dashed">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <div className="text-2xl">🎨</div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Coming Soon - Timera V2
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Enhanced design editor is coming in Timera V2
              </p>
            </div>
            <div className="text-2xl">✨</div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/ai-content-generator')}
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri qayıt
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dizayn Redaktoru</h1>
              <p className="text-sm text-gray-600">Post ID: {postId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="h-[calc(100vh-73px)]">
        <FabricDesignEditor
          isOpen={true}
          onClose={() => router.push('/ai-content-generator')}
          post={post}
          onSave={handleSave}
          fullPage={true}
        />
      </div>
    </div>
  );
}

