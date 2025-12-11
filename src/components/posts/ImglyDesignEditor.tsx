'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, Save, X } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

interface ImglyDesignEditorProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onSave: (designDataURL: string, sceneData?: any) => void;
}

export default function ImglyDesignEditor({
  isOpen,
  onClose,
  post,
  onSave,
}: ImglyDesignEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cesdk, setCesdk] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  console.log('🎨 ImglyDesignEditor rendered:', { isOpen, postId: post?.id });

  useEffect(() => {
    console.log('🔄 useEffect triggered:', { isOpen, hasContainer: !!containerRef.current });
    
    if (!isOpen) {
      console.log('⏭️ Dialog not open, skipping');
      return;
    }

    let mounted = true;
    let editor: any = null;

    const initializeEditor = async () => {
      // Wait for container to be ready (Dialog animation might delay it)
      let retries = 0;
      while (!containerRef.current && retries < 10) {
        console.log(`⏳ Waiting for container... (attempt ${retries + 1})`);
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
      }

      if (!containerRef.current) {
        console.error('❌ Container never became available');
        setIsLoading(false);
        alert('❌ Failed to initialize editor container');
        return;
      }

      console.log('✅ Container is ready!');
      try {
        setIsLoading(true);

        // Get license key from environment variable or use empty string to disable
        const licenseKey = process.env.NEXT_PUBLIC_IMGLY_LICENSE_KEY || '';

        if (!licenseKey) {
          console.warn('⚠️ IMG.LY license key not found. Editor will be disabled.');
          setIsLoading(false);
          alert('⚠️ Dizayn redaktoru hazırda aktiv deyil.\n\nIMG.LY lisenziya açarı təyin edilməyib. Zəhmət olmasa, administratora xəbər verin.');
          return;
        }

        console.log('🔑 License key: Found');
        console.log('🚀 Initializing img.ly CreativeEditor SDK...');

        // Dynamically import CreativeEditorSDK (browser-only)
        const CreativeEditorSDK = (await import('@cesdk/cesdk-js')).default;
        
        console.log('✅ SDK module loaded');

        // Initialize CreativeEditor SDK - let it auto-detect the correct baseURL
        const config = {
          license: licenseKey,
          userId: 'timera-user',
          callbacks: {
            onUpload: 'local'
          }
        };

        console.log('📦 Config:', { ...config, license: '***' }); // Don't log full license key

        // Wrap in try-catch to prevent SDK's error dialog
        try {
          editor = await CreativeEditorSDK.create(containerRef.current!, config);
        } catch (sdkError: any) {
          // Catch SDK initialization errors before they show their dialog
          console.error('❌ SDK initialization failed:', sdkError);
          if (sdkError.message?.includes('license') || sdkError.message?.includes('License')) {
            throw new Error('LISENZIYA_XETASI');
          }
          throw sdkError;
        }
        
        console.log('✅ Editor created successfully');
        
        // Add default asset sources BEFORE creating scene (must await!)
        await editor.addDefaultAssetSources();
        await editor.addDemoAssetSources({ sceneMode: 'Design' });
        console.log('✅ Asset sources loaded');

        if (!mounted) {
          editor.dispose();
          return;
        }

        console.log('🎨 Creating scene...');
        console.log('📋 Checking for saved scene...', { hasScene: !!post.imgly_scene });

        // Check if there's a saved scene to restore
        if (post.imgly_scene) {
          console.log('📂 Loading saved scene for re-editing...');
          try {
            // The scene is stored as a string (compressed format from img.ly)
            const sceneString = typeof post.imgly_scene === 'string' 
              ? post.imgly_scene 
              : JSON.stringify(post.imgly_scene);
            console.log('📄 Scene string length:', sceneString.length);
            await editor.engine.scene.loadFromString(sceneString);
            console.log('✅ Saved scene loaded successfully! All elements restored.');
          } catch (sceneError) {
            console.error('❌ Failed to load saved scene:', sceneError);
            console.log('⚠️ Creating new scene instead...');
            await editor.createDesignScene();
          }
        } else {
          console.log('ℹ️ No saved scene found, creating new scene...');
          // Create a blank design to start with
          await editor.createDesignScene();
          console.log('✅ New scene created');

          // Load the post's image as background
          try {
            const engine = editor.engine;
            const scene = engine.scene.get();
            
            // Get image URL from post
            let imageUrl = null;
            
            if (post.custom_image) {
              imageUrl = post.custom_image;
            } else if (post.design_url) {
              imageUrl = post.design_url;
            }
            
            // Make sure it's a full URL
            if (imageUrl && !imageUrl.startsWith('http')) {
              // Remove /api suffix from API_BASE_URL for image URLs
              const baseUrl = API_BASE_URL.replace(/\/api$/, '');
              imageUrl = `${baseUrl}${imageUrl}`;
            }
            
            // If it's an external URL (like Ideogram), proxy it through our backend to bypass CORS
            if (imageUrl && (imageUrl.includes('ideogram.ai') || imageUrl.includes('external'))) {
              // Remove /api suffix from API_BASE_URL for proxy URLs
              const baseUrl = API_BASE_URL.replace(/\/api$/, '');
              imageUrl = `${baseUrl}/api/posts/proxy-image/?url=${encodeURIComponent(imageUrl)}`;
              console.log('📸 Using proxied image URL');
            }
            
            console.log('📸 Loading image:', imageUrl);
            
            if (imageUrl) {
              // Get the page
              const pages = engine.block.findByType('page');
              if (pages.length > 0) {
                const page = pages[0];
                
                // Create an image fill
                const imageFill = engine.block.createFill('image');
                engine.block.setString(imageFill, 'fill/image/imageFileURI', imageUrl);
                
                // Apply fill to page
                engine.block.setFill(page, imageFill);
                
                console.log('✅ Image loaded as background');
              }
            } else {
              console.log('⚠️ No image URL found for post');
            }
          } catch (imgError) {
            console.error('⚠️ Failed to load image, continuing with blank canvas:', imgError);
          }
        }

        setCesdk(editor);
        setIsLoading(false);
        
        console.log('🎉 Editor ready!');

      } catch (error: any) {
        console.error('❌ Failed to initialize img.ly editor:', error);
        console.error('Error details:', error.message, error.stack);
        setIsLoading(false);
        
        // Close dialog to prevent SDK's error dialog from showing
        if (error.message === 'LISENZIYA_XETASI') {
          alert('❌ IMG.LY lisenziya açarı etibarsızdır və ya müddəti bitib.\n\nZəhmət olmasa, administratora xəbər verin.');
          onClose();
        } else if (error.message?.includes('license') || error.message?.includes('License')) {
          alert('❌ Lisenziya xətası. Lisenziya açarı etibarsızdır və ya müddəti bitib.');
          onClose();
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
          alert('❌ Şəbəkə xətası. İnternet bağlantınızı yoxlayın.');
        } else {
          alert(`❌ Redaktor yüklənə bilmədi: ${error.message || 'Naməlum xəta'}\n\nBrauzer konsolunu (F12) yoxlayın.`);
        }
      }
    };

    initializeEditor();

    return () => {
      mounted = false;
      if (editor) {
        editor.dispose();
      }
    };
  }, [isOpen, post]);

  const handleSave = async () => {
    if (!cesdk) return;

    setIsSaving(true);
    try {
      console.log('💾 Starting export...');
      
      // Export the scene state (for re-editing later)
      // NOTE: saveToString() returns a compressed/encoded string, NOT pure JSON
      const sceneString = await cesdk.engine.scene.saveToString();
      console.log('📋 Scene saved for re-editing');
      console.log('📊 Scene data size:', sceneString.length, 'characters');
      
      // Export as JPEG (smaller than PNG)
      const blob = await cesdk.engine.block.export(
        cesdk.engine.scene.get()!,
        'image/jpeg',
        { 
          jpegQuality: 0.85,  // Reduced quality for smaller file size
          targetWidth: 1080,   // Limit resolution
          targetHeight: 1080,
        }
      );

      console.log('📦 Exported blob size:', (blob.size / 1024 / 1024).toFixed(2), 'MB');

      // Convert blob to data URL
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataURL = reader.result as string;
        console.log('📤 Uploading image and scene...');
        // Save the scene string directly (it's already in the correct format)
        await onSave(dataURL, sceneString);
        setIsSaving(false);
      };
      reader.readAsDataURL(blob);

    } catch (error) {
      console.error('Failed to save design:', error);
      alert('❌ Dizayn saxlanıla bilmədi');
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!max-w-none !w-[95vw] !h-[95vh] p-0 overflow-hidden">
        <DialogHeader className="p-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Dizaynı Redaktə Et - img.ly Editor</DialogTitle>
              <DialogDescription>
                Professional design editor with full features
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={isSaving || isLoading}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saxlanılır...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Saxla
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={onClose} size="sm" disabled={isSaving}>
                <X className="w-4 h-4 mr-2" />
                Bağla
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div 
          ref={containerRef} 
          className="w-full h-[calc(95vh-70px)] bg-gray-100"
          style={{ position: 'relative' }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-lg font-medium">img.ly Editor yüklənir...</p>
                <p className="text-sm text-gray-500 mt-2">Professional design tools</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

