'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { falAIAPI, api, API_BASE_URL } from '@/lib/api';
import { Loader2, CheckCircle2, AlertTriangle, Image as ImageIcon, Sparkles, Link as LinkIcon, Upload } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

interface ProductPost {
  id: string;
  hook: string;
  body: string;
  cta: string;
  full_caption: string;
  hashtags: string[];
  complete_content: string;
  image_url?: string | null;
  image_generation_prompt: string;
  status: string;
  design_context: string;
}

interface ProductAnalysis {
  product_name_type: string;
  product_type: string;
  color_palette: {
    primary_colors: string[];
    secondary_colors: string[];
    color_description: string;
  };
  material_texture: {
    materials: string[];
    texture: string;
    finish: string;
  };
  intended_use: string;
  target_industry: string;
  visual_analysis: {
    shape: string;
    size: string;
    design_style: string;
    special_details: string;
  };
  features: string[];
  benefits: string[];
  target_audience: string;
  selling_points: string[];
  lifestyle_context: string;
}

export default function ProductPostPage() {
  const router = useRouter();
  const t = useTranslation();
  
  // Form states
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [adStyle, setAdStyle] = useState('');
  const [aspectRatio, setAspectRatio] = useState('');
  
  // Common states
  const [numImages, setNumImages] = useState(1);  // Default 1 post
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Debug: Log selectedImage state changes
  useEffect(() => {
    console.log('🔍 selectedImage state changed:', selectedImage);
    if (selectedImage) {
      console.log('✅ Modal açılmalıdır!');
    } else {
      console.log('❌ Modal bağlıdır');
    }
  }, [selectedImage]);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    workflow_summary: {
      step_1: string;
      step_2: string;
      step_3: string;
      step_4: string;
      step_5: string;
    };
    posts: ProductPost[];
    product_analysis: ProductAnalysis;
    images: {
      original_image_url: string;
      background_removed_image_url: string;
    };
    num_created: number;
    source?: {
      method: string;
      original_url: string;
      final_url: string;
      extracted_data: any;
    };
  } | null>(null);

  const processingSteps = [
    t.productPost.processingStep1,
    t.productPost.processingStep2,
    t.productPost.processingStep3,
    t.productPost.processingStep4,
    t.productPost.processingStep5,
    t.productPost.processingComplete,
  ];
  
  const processingStepsUrl = [
    t.productPost.processingStepUrl1,
    t.productPost.processingStepUrl2,
    t.productPost.processingStepUrl3,
    t.productPost.processingStepUrl4,
    t.productPost.processingStepUrl5,
    t.productPost.processingComplete,
  ];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    
      if (!productImage) {
        setError(t.productPost.errorFileRequired);
        return;
      }

      if (!adStyle || !aspectRatio) {
        setError(t.productPost.errorSelectAdStyle);
        return;
      }

    setIsProcessing(true);

    try {
      let finalImageUrl: string;
      
      // Şəkil file formasındadırsa, backend-ə yüklə və URL al
      if (productImage) {
        console.log('📤 Şəkil yüklənir backend-ə...', {
          fileName: productImage.name,
          fileSize: productImage.size,
          fileType: productImage.type,
        });
        
        // Backend-ə şəkili yüklə - API instance istifadə et
        const formData = new FormData();
        formData.append('image', productImage);
        
        try {
          // FormData göndərərkən Content-Type header-ini silmək lazımdır
          // Browser avtomatik olaraq boundary ilə təyin edəcək
          console.log('🔄 Backend-ə request göndərilir...');
          const uploadResponse = await api.post('/ai/upload-product-image/', formData);
          
          console.log('📥 Backend cavabı:', uploadResponse.data);

          if (uploadResponse.data && uploadResponse.data.image_url) {
            finalImageUrl = uploadResponse.data.image_url;
            console.log('✅ Şəkil yükləndi, URL:', finalImageUrl);
            
            // URL-in düzgün olduğunu yoxla
            if (!finalImageUrl.startsWith('http://') && !finalImageUrl.startsWith('https://')) {
              console.warn('⚠️ URL relative görünür, absolute URL-ə çevrilir...');
              // API_BASE_URL-dən /api hissəsini çıxarırıq çünki image URL-i artıq /media/ ilə başlayır
              const baseUrl = API_BASE_URL.replace('/api', '');
              finalImageUrl = `${baseUrl}${finalImageUrl}`;
              console.log('✅ Absolute URL:', finalImageUrl);
            }
          } else {
            console.error('❌ Backend cavabında image_url yoxdur:', uploadResponse.data);
            throw new Error('Backend-dən düzgün cavab alınmadı');
          }
        } catch (uploadError: any) {
          console.error('❌ Şəkil yükləmə xətası:', {
            message: uploadError.message,
            response: uploadError.response?.data,
            status: uploadError.response?.status,
            statusText: uploadError.response?.statusText,
          });
          
          let errorMessage = t.productPost.errorImageUpload;
          
          if (uploadError.response?.data?.error) {
            errorMessage = uploadError.response.data.error;
          } else if (uploadError.response?.status === 401) {
            errorMessage = t.productPost.errorLoginRequired;
          } else if (uploadError.response?.status === 400) {
            errorMessage = uploadError.response.data?.error || t.productPost.errorInvalidFile;
          } else if (uploadError.response?.status === 500) {
            errorMessage = t.productPost.errorServerError;
          } else if (uploadError.message) {
            errorMessage = uploadError.message;
          }
          
          throw new Error(errorMessage);
        }
      } else {
        throw new Error(t.productPost.errorFileRequired);
      }

      // finalImageUrl-in düzgün olduğunu yoxla - MƏCBURİ
      if (!finalImageUrl) {
        throw new Error(t.productPost.errorUrlRequired);
      }
      
      // URL-in absolute olduğunu təmin et
      if (!finalImageUrl.startsWith('http://') && !finalImageUrl.startsWith('https://')) {
        console.warn('⚠️ URL relative görünür, absolute URL-ə çevrilir...');
        // API_BASE_URL-dən /api hissəsini çıxarırıq çünki image URL-i artıq /media/ ilə başlayır
        const baseUrl = API_BASE_URL.replace('/api', '');
        finalImageUrl = `${baseUrl}${finalImageUrl}`;
        console.log('✅ Absolute URL:', finalImageUrl);
      }
      
      // URL-in düzgün formatda olduğunu yoxla
      try {
        new URL(finalImageUrl);
      } catch (urlError) {
        throw new Error(t.productPost.errorInvalidUrl.replace('{url}', finalImageUrl));
      }
      
      // Şəkil URL-ini base64-ə çevir
      console.log('🔄 Şəkil URL-i base64-ə çevrilir...', finalImageUrl);
      let imageBase64: string;
      
      try {
        // URL-dən şəkili yüklə
        const imageResponse = await fetch(finalImageUrl, {
          mode: 'cors',
          credentials: 'omit',
        });
        
        if (!imageResponse.ok) {
          throw new Error(t.productPost.errorImageLoad.replace('{status}', imageResponse.status.toString()).replace('{statusText}', imageResponse.statusText));
        }
        
        // Blob-a çevir
        const blob = await imageResponse.blob();
        
        // Base64-ə çevir
        const reader = new FileReader();
        imageBase64 = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => {
            const base64String = reader.result as string;
            // data:image/jpeg;base64, prefix-ini çıxar
            const base64Data = base64String.split(',')[1] || base64String;
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        
        console.log('✅ Şəkil base64-ə çevrildi, uzunluq:', imageBase64.length);
      } catch (imageError: any) {
        console.error('❌ Şəkil base64-ə çevrilmə xətası:', imageError);
        throw new Error(`Şəkil base64-ə çevrilə bilmədi: ${imageError.message}`);
      }
      
      // Webhook URL - production və development üçün fərqli
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 
        (process.env.NODE_ENV === 'production' 
          ? 'https://astork1.app.n8n.cloud/webhook-test/image-to-image'
          : 'https://astork1.app.n8n.cloud/webhook/image-to-image');
      
      console.log('🔄 Webhook-una göndərilir:', {
        url: webhookUrl,
        data: {
          'Product Image Base64': `data:image/jpeg;base64,${imageBase64.substring(0, 50)}... (${imageBase64.length} chars)`,
          'Product Name (Optional)': productName || '',
          'Ad Style': adStyle,
          'Aspect Ratio': aspectRatio,
        },
      });
      
      let response;
      try {
        // Timeout ilə fetch - 5 dəqiqə (300 saniyə) - workflow uzun müddət ala bilər
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 dəqiqə
        
        console.log('⏳ Webhook-una request göndərilir (timeout: 5 dəqiqə)...');
        
        response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'Product Image Base64': `data:image/jpeg;base64,${imageBase64}`,
            'Product Name (Optional)': productName || '',
            'Ad Style': adStyle,
            'Aspect Ratio': aspectRatio,
          }),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        console.log('✅ Webhook response alındı');
      } catch (fetchError: any) {
        console.error('❌ Webhook fetch xətası:', fetchError);
        
          // AbortError - timeout
          if (fetchError.name === 'AbortError') {
            throw new Error(t.productPost.errorWorkflowTimeout);
          }

          // Network error, CORS error, və s.
          if (fetchError.message?.includes('Failed to fetch') ||
            fetchError.name === 'TypeError' ||
            fetchError.message?.includes('NetworkError') ||
            fetchError.message?.includes('Network request failed')) {
            throw new Error(t.productPost.errorWebhookConnection);
          }
        
        throw new Error(`Webhook xətası: ${fetchError.message || 'Naməlum xəta'}`);
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        let errorMessage = `Workflow xətası: ${response.status} ${response.statusText}`;
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorJson.message || errorMessage;
        } catch {
          if (errorText) {
            errorMessage = errorText.substring(0, 200);
          }
        }
        
        throw new Error(errorMessage);
      }

      let data;
      try {
        const responseText = await response.text();
        if (responseText) {
          data = JSON.parse(responseText);
        } else {
          data = { success: true, message: 'Workflow işlədi' };
        }
      } catch (parseError) {
        console.warn('⚠️ Response JSON parse edilə bilmədi, default cavab istifadə edilir');
        data = { success: true, message: 'Workflow işlədi' };
      }
      
      console.log('✅ Webhook Response alındı:', data);
      console.log('📊 Response struktur (keys):', Object.keys(data));
      console.log('📋 Tam Response JSON:', JSON.stringify(data, null, 2));
      console.log('🔍 Response type:', typeof data);
      console.log('🔍 Response is array:', Array.isArray(data));
      
      // Gələn şəkil URL-ini çıxar
      // Response strukturuna görə müxtəlif yerlərdə ola bilər
      let generatedImageUrl: string | null = null;
      
      if (data) {
        // Birbaşa image_url
        if (data.image_url) {
          generatedImageUrl = data.image_url;
          console.log('✅ Şəkil URL tapıldı (data.image_url):', generatedImageUrl);
        }
        // images array-də
        else if (data.images && Array.isArray(data.images) && data.images.length > 0) {
          generatedImageUrl = data.images[0].url || data.images[0];
          console.log('✅ Şəkil URL tapıldı (data.images[0]):', generatedImageUrl);
        }
        // json içində
        else if (data.json && data.json.image_url) {
          generatedImageUrl = data.json.image_url;
          console.log('✅ Şəkil URL tapıldı (data.json.image_url):', generatedImageUrl);
        }
        // FAL response strukturuna görə
        else if (data.response_url) {
          // response_url varsa, onu istifadə et (async response)
          console.log('⚠️ Async response URL alındı:', data.response_url);
        }
        // data.data içində
        else if (data.data && data.data.image_url) {
          generatedImageUrl = data.data.image_url;
          console.log('✅ Şəkil URL tapıldı (data.data.image_url):', generatedImageUrl);
        }
        // Digər mümkün strukturlar
        else {
          console.warn('⚠️ Şəkil URL-i tapılmadı. Response struktur:', Object.keys(data));
          console.log('📋 Tam response object:', data);
          console.log('📋 Response stringify:', JSON.stringify(data, null, 2));
          
          // Deep search - bütün nested objectlərdə axtar
          const deepSearch = (obj: any, path = ''): string | null => {
            if (!obj || typeof obj !== 'object') return null;
            
            for (const key in obj) {
              const currentPath = path ? `${path}.${key}` : key;
              const value = obj[key];
              
              if (key === 'image_url' || key === 'url') {
                if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
                  console.log(`✅ Şəkil URL tapıldı (deep search: ${currentPath}):`, value);
                  return value;
                }
              }
              
              if (key === 'images' && Array.isArray(value) && value.length > 0) {
                const firstImage = value[0];
                if (firstImage && typeof firstImage === 'object') {
                  const url = firstImage.url || firstImage.image_url;
                  if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
                    console.log(`✅ Şəkil URL tapıldı (deep search: ${currentPath}[0]):`, url);
                    return url;
                  }
                }
              }
              
              if (typeof value === 'object' && value !== null) {
                const found = deepSearch(value, currentPath);
                if (found) return found;
              }
            }
            
            return null;
          };
          
          const foundUrl = deepSearch(data);
          if (foundUrl) {
            generatedImageUrl = foundUrl;
          }
        }
      }
      
      // Əgər şəkil URL-i tapılmadısa, orijinal şəkil göstər (fallback)
      // Amma əsas məqsəd yaradılmış şəkil göstərməkdir
      if (!generatedImageUrl) {
        console.warn('⚠️ Yaradılmış şəkil URL-i tapılmadı, orijinal şəkil göstəriləcək');
        console.warn('📋 Response data:', JSON.stringify(data, null, 2));
        // Fallback: orijinal şəkil
        generatedImageUrl = finalImageUrl;
      }
      
      console.log('🖼️ Yaradılmış şəkil URL:', generatedImageUrl);
      
      // Gələn cavabı işlə
      setResult({
        success: true,
        message: t.productPost.successAdImageCreated,
        workflow_summary: {
          step_1: t.productPost.workflowStep1,
          step_2: t.productPost.workflowStep2,
          step_3: t.productPost.workflowStep3,
          step_4: t.productPost.workflowStep4,
          step_5: t.productPost.workflowStep5,
        },
        posts: [],
        product_analysis: {} as ProductAnalysis,
        images: {
          original_image_url: finalImageUrl,
          background_removed_image_url: generatedImageUrl || finalImageUrl,
        },
        num_created: 1,
        source: {
          method: 'n8n_webhook',
          original_url: finalImageUrl,
          final_url: generatedImageUrl || finalImageUrl,
          extracted_data: data, // Tam response-u burada saxlayırıq ki, UI-da görə bilsin
        },
      });
      
      // Debug: Response-u localStorage-a yaz (browser console-dan baxmaq üçün)
      try {
        localStorage.setItem('last_n8n_response', JSON.stringify(data, null, 2));
        console.log('💾 Response localStorage-a yazıldı. Console-da görmək üçün: localStorage.getItem("last_n8n_response")');
      } catch (e) {
        console.warn('⚠️ localStorage-a yazıla bilmədi:', e);
      }
    } catch (err: any) {
      console.error('Workflow xətası:', err);
      setError(err.message || 'Workflow zamanı xəta baş verdi');
    } finally {
      setIsProcessing(false);
    }
  };


  const handleViewPosts = () => {
    router.push('/posts');
  };

  const handleAnalyzeAndCreatePost = async () => {
    if (!result?.images?.background_removed_image_url) {
      setError(t.productPost.errorImageUrlNotFound);
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      console.log('🔄 Şəkil analiz edilir və post yaradılır...', {
        image_url: result.images.background_removed_image_url,
        product_name: productName,
      });

      const response = await api.post('/ai/analyze-image-and-create-post/', {
        image_url: result.images.background_removed_image_url,
        product_name: productName || '',
      });

      console.log('✅ Post yaradıldı:', response.data);

      if (response.data.success && response.data.post) {
        // Post-u result.posts array-inə əlavə et
        const newPost: ProductPost = {
          id: response.data.post.id,
          hook: response.data.post.title || '',
          body: response.data.post.description || '',
          cta: '',
          full_caption: response.data.post.content || '',
          hashtags: response.data.post.hashtags || [],
          complete_content: response.data.post.content || '',
          image_url: response.data.post.image_url,
          image_generation_prompt: '',
          status: response.data.post.status || 'pending_approval',
          design_context: '',
        };

        // Update result with new post
        setResult(prev => {
          if (!prev) return null;
          return {
            ...prev,
            posts: [...(prev.posts || []), newPost],
            num_created: (prev.num_created || 0) + 1,
          };
        });

        // Show success message
        alert(t.productPost.successPostCreated);
      } else {
        throw new Error(t.productPost.errorPostCreationFailed);
      }
    } catch (err: any) {
      console.error('❌ Post yaradılma xətası:', err);
      setError(err.response?.data?.error || err.message || t.productPost.errorPostCreationFailed);
    } finally {
      setIsAnalyzing(false);
    }
  };


  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t.productPost.title}</h1>
          <p className="text-muted-foreground">
            {t.productPost.description}
          </p>
        </div>

        {!result && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.productPost.cardTitle}</CardTitle>
                <CardDescription>
                  {t.productPost.cardDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Image */}
                <div className="space-y-2">
                  <Label htmlFor="product_image">
                    {t.productPost.productImage} <span className="text-red-500">*</span>
                  </Label>
                  <div className="space-y-3">
                    <Input
                      id="product_image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isProcessing}
                      className="cursor-pointer"
                    />
                    {productImagePreview && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                        <Image
                          src={productImagePreview}
                          alt="Product preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Name (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="product_name">{t.productPost.productNameOptional}</Label>
                  <Input
                    id="product_name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder={t.productPost.productNamePlaceholder}
                    disabled={isProcessing}
                  />
                </div>

                {/* Ad Style */}
                <div className="space-y-2">
                  <Label htmlFor="ad_style">
                    {t.productPost.adStyle} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={adStyle}
                    onValueChange={setAdStyle}
                    disabled={isProcessing}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.productPost.adStylePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">{t.productPost.modern}</SelectItem>
                      <SelectItem value="professional">{t.productPost.professional}</SelectItem>
                      <SelectItem value="playful">{t.productPost.playful}</SelectItem>
                      <SelectItem value="elegant">{t.productPost.elegant}</SelectItem>
                      <SelectItem value="minimalist">{t.productPost.minimalist}</SelectItem>
                      <SelectItem value="luxury">{t.productPost.luxury}</SelectItem>
                      <SelectItem value="casual">{t.productPost.casual}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-2">
                  <Label htmlFor="aspect_ratio">
                    {t.productPost.aspectRatio} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={aspectRatio}
                    onValueChange={setAspectRatio}
                    disabled={isProcessing}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.productPost.aspectRatioPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">{t.productPost.square}</SelectItem>
                      <SelectItem value="9:16">{t.productPost.story}</SelectItem>
                      <SelectItem value="16:9">{t.productPost.landscape}</SelectItem>
                      <SelectItem value="4:5">{t.productPost.portrait}</SelectItem>
                      <SelectItem value="1.91:1">{t.productPost.facebookPost}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isProcessing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <div>
                        <p className="font-medium">{t.productPost.generating}</p>
                        <p className="text-sm text-muted-foreground">
                          {t.productPost.pleaseWait}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              disabled={!productImage || !adStyle || !aspectRatio || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.productPost.processing}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t.productPost.submit}
                </>
              )}
            </Button>
          </form>
        )}

        {result && (
          <div className="space-y-6">
            {/* Created Posts - Yaradılmış şəkil də burada göstərilir */}
            {((result.posts && result.posts.length > 0) || result.images?.background_removed_image_url) && (
              <Card>
                <CardHeader>
                  <CardTitle>{t.productPost.createdPosts}</CardTitle>
                  <CardDescription>
                    {result.posts && result.posts.length > 0 
                      ? `${result.posts.length} ${t.productPost.createdPostsDesc}`
                      : t.productPost.createdAdImage}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Yaradılmış Reklam Şəkli */}
                    {result.images?.background_removed_image_url && (
                      <Card className="overflow-hidden">
                        <div 
                          className="relative w-full h-48 rounded-t-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('🖼️ Şəkil klikləndi:', result.images.background_removed_image_url);
                            setSelectedImage(result.images.background_removed_image_url!);
                          }}
                        >
                          <img
                            src={result.images.background_removed_image_url}
                            alt="Yaradılmış reklam şəkli"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error('Image load error:', result.images.background_removed_image_url);
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{t.productPost.createdAdImage}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {t.productPost.createdAdImageDesc}
                          </p>
                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('🔵 Test düyməsi klikləndi');
                                setSelectedImage(result.images.background_removed_image_url!);
                              }}
                              variant="secondary"
                              size="sm"
                              className="w-full"
                            >
                              <ImageIcon className="mr-2 h-4 w-4" />
                              {t.productPost.openImage}
                            </Button>
                            <Button
                              onClick={handleAnalyzeAndCreatePost}
                              disabled={isAnalyzing}
                              className="w-full"
                              size="sm"
                            >
                              {isAnalyzing ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  {t.productPost.analyzing}
                                </>
                              ) : (
                                <>
                                  <Sparkles className="mr-2 h-4 w-4" />
                                  {t.productPost.approveAndCreate}
                                </>
                              )}
                            </Button>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = result.images.background_removed_image_url!;
                                  link.download = `reklam-sekli-${Date.now()}.jpg`;
                                  link.click();
                                }}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                {t.productPost.download}
                              </Button>
                              <Button
                                onClick={() => {
                                  window.open(result.images.background_removed_image_url!, '_blank');
                                }}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <ImageIcon className="mr-2 h-4 w-4" />
                                {t.productPost.open}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Digər Postlar */}
                    {result.posts && result.posts.map((post, idx) => (
                      <Card 
                        key={post.id} 
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        {/* Image */}
                        {post.image_url ? (
                          <div 
                            className="relative w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('🖼️ Post şəkli klikləndi:', post.image_url);
                              setSelectedImage(post.image_url!);
                            }}
                          >
                            <img
                              src={post.image_url}
                              alt={post.hook}
                              className="w-full h-48 object-cover pointer-events-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('🖼️ Post şəkli klikləndi (img):', post.image_url);
                                setSelectedImage(post.image_url!);
                              }}
                              onError={(e) => {
                                console.error('Image load error:', post.image_url);
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="relative w-full h-48 bg-muted flex items-center justify-center">
                            <div className="text-center p-4">
                              <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">{t.productPost.imageWillBeCreated}</p>
                            </div>
                          </div>
                        )}
                        
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2">{post.hook}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                            {post.body}
                          </p>
                          <p className="text-sm font-medium text-primary mb-3">{post.cta}</p>
                          
                          {/* Hashtags */}
                          {post.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {post.hashtags.slice(0, 5).map((tag, tagIdx) => (
                                <span
                                  key={tagIdx}
                                  className="text-xs bg-secondary px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.hashtags.length > 5 && (
                                <span className="text-xs text-muted-foreground">
                                  +{post.hashtags.length - 5}
                                </span>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={handleViewPosts} className="flex-1" size="lg">
                {t.productPost.viewPosts}
              </Button>
              <Button
                onClick={() => {
                  setResult(null);
                  setProductImage(null);
                  setProductImagePreview(null);
                  setProductName('');
                  setAdStyle('');
                  setAspectRatio('');
                }}
                variant="outline"
                size="lg"
              >
                {t.productPost.createNewPost}
              </Button>
            </div>
          </div>
        )}

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => {
          if (!open) {
            setSelectedImage(null);
          }
        }}>
          <DialogContent className="!max-w-[75vw] !w-[75vw] !p-0 !max-h-[90vh] !h-auto !bg-white dark:!bg-gray-900 !rounded-xl overflow-hidden">
            <DialogHeader className="flex flex-row items-center justify-between p-5 pb-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-0">
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                {t.productPost.imagePreview}
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
              {t.productPost.closeModalHint}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

