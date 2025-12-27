'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { falAIAPI } from '@/lib/api';
import { Loader2, CheckCircle2, AlertTriangle, Image as ImageIcon, Sparkles, Link as LinkIcon, Upload } from 'lucide-react';
import Image from 'next/image';

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
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  
  // Upload method states
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  
  // URL method states
  const [productUrl, setProductUrl] = useState('');
  
  // Common states
  const [numImages, setNumImages] = useState(1);  // Default 1 post
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState('');
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
    'Addım 1: Şəkil Emalı - Arxa Fon Silinməsi...',
    'Addım 2: Məhsul Analizi - Strukturlaşdırılmış Analiz...',
    'Addım 3: Reklam Məzmunu - Hook, Body və CTA...',
    'Addım 4: AI Prompt Yaradılması...',
    'Addım 5: Nano Banana ilə Professional Şəkillər...',
    'Postlar tamamlanır...',
  ];
  
  const processingStepsUrl = [
    'Addım 1: Sayt məzmunu çəkilir...',
    'Addım 2: AI ilə məhsul məlumatları analiz edilir...',
    'Addım 3: Məhsul şəkli yüklənir...',
    'Addım 4: Arxa fon silinir...',
    'Addım 5: Nano Banana ilə Professional Şəkillər...',
    'Postlar tamamlanır...',
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setError('Məhsul rəsmi seçin');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProcessingStep((prev) => {
          if (prev < processingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 3000);

      const formData = new FormData();
      formData.append('product_image', productImage);
      if (productName) {
        formData.append('product_name', productName);
      }
      if (productDescription) {
        formData.append('product_description', productDescription);
      }
      formData.append('num_images', numImages.toString());

      const response = await falAIAPI.createProductPost(formData);
      
      clearInterval(progressInterval);
      setProcessingStep(processingSteps.length - 1);
      
      // Debug: Check image URLs
      console.log('Response data:', response.data);
      if (response.data.posts) {
        response.data.posts.forEach((post: any, idx: number) => {
          console.log(`Post ${idx + 1} image_url:`, post.image_url);
        });
      }
      
      setResult(response.data);
      setIsProcessing(false);
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.response?.data?.error || err.message || 'Xəta baş verdi');
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    
    if (!productUrl) {
      setError('Məhsul URL-ini daxil edin');
      return;
    }
    
    // Validate URL format
    if (!productUrl.startsWith('http://') && !productUrl.startsWith('https://')) {
      setError('URL http:// və ya https:// ilə başlamalıdır');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProcessingStep((prev) => {
          if (prev < processingStepsUrl.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 3500);

      const response = await falAIAPI.createProductPostFromUrl({
        product_url: productUrl,
        num_images: numImages
      });
      
      clearInterval(progressInterval);
      setProcessingStep(processingStepsUrl.length - 1);
      
      console.log('URL Response data:', response.data);
      
      setResult(response.data);
      setIsProcessing(false);
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.response?.data?.error || err.message || 'URL-dən məhsul postu yaradıla bilmədi');
    }
  };

  const handleViewPosts = () => {
    router.push('/posts');
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Məhsul Post Yaradıcı</h1>
          <p className="text-muted-foreground">
            AI ilə professional məhsul postları yaradın - Şəkil yükləyin və ya URL verin
          </p>
        </div>

        {!result && (
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upload' | 'url')} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Şəkil Yüklə
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                URL-dən
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Məhsul Məlumatları</CardTitle>
                    <CardDescription>
                      Məhsul şəklini yükləyin və istəyə görə əlavə məlumat verin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="product_image">Məhsul Rəsmi *</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input
                        id="product_image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isProcessing}
                        className="cursor-pointer"
                      />
                    </div>
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

                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="product_name">Məhsul Adı (İstəyə görə)</Label>
                  <Input
                    id="product_name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Məsələn: iPhone 15 Pro"
                    disabled={isProcessing}
                  />
                </div>

                {/* Product Description */}
                <div className="space-y-2">
                  <Label htmlFor="product_description">Məhsul Təsviri (İstəyə görə)</Label>
                  <Textarea
                    id="product_description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Məhsulun xüsusiyyətləri, faydaları və s."
                    rows={4}
                    disabled={isProcessing}
                  />
                </div>

                {/* Number of Images */}
                <div className="space-y-2">
                  <Label htmlFor="num_images">Yaradılacaq Post Sayı</Label>
                  <Input
                    id="num_images"
                    type="number"
                    min={1}
                    max={10}
                    value={numImages}
                    onChange={(e) => setNumImages(parseInt(e.target.value) || 3)}
                    disabled={isProcessing}
                  />
                  <p className="text-sm text-muted-foreground">
                    AI {numImages} dənə fərqli reklam postu yaradacaq (hələlik 3, daha sonra dəyişdirilə bilər)
                  </p>
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
                        <p className="font-medium">{processingSteps[processingStep]}</p>
                        <p className="text-sm text-muted-foreground">
                          Addım {processingStep + 1} / {processingSteps.length}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((processingStep + 1) / processingSteps.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              disabled={!productImage || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Hazırlanır...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Postları Yarad
                </>
              )}
            </Button>
          </form>
        </TabsContent>

        {/* URL Tab */}
        <TabsContent value="url">
          <form onSubmit={handleUrlSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Məhsul URL-dən</CardTitle>
                <CardDescription>
                  Məhsul səhifəsinin linkini yapışdırın - AI avtomatik analiz edəcək
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* URL Input */}
                <div className="space-y-2">
                  <Label htmlFor="product_url">Məhsul URL-i *</Label>
                  <Input
                    id="product_url"
                    type="url"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="https://example.com/product/123"
                    disabled={isProcessing}
                  />
                  <p className="text-sm text-muted-foreground">
                    Məsələn: Amazon, eBay, Etsy, və ya istənilən onlayn mağaza linki
                  </p>
                </div>

                {/* Number of Posts */}
                <div className="space-y-2">
                  <Label htmlFor="num_images_url">Yaradılacaq Post Sayı</Label>
                  <Input
                    id="num_images_url"
                    type="number"
                    min="1"
                    max="10"
                    value={numImages}
                    onChange={(e) => setNumImages(parseInt(e.target.value))}
                    disabled={isProcessing}
                  />
                  <p className="text-sm text-muted-foreground">
                    AI {numImages} dənə fərqli reklam postu yaradacaq
                  </p>
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
                        <p className="font-medium">{processingStepsUrl[processingStep]}</p>
                        <p className="text-sm text-muted-foreground">
                          Addım {processingStep + 1} / {processingStepsUrl.length}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((processingStep + 1) / processingStepsUrl.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              disabled={!productUrl || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  URL Analiz Edilir...
                </>
              ) : (
                <>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  URL-dən Postlar Yarad
                </>
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
        )}

        {result && (
          <div className="space-y-6">
            {/* Success Message */}
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <strong>{result.num_created} post</strong> uğurla yaradıldı!
                {result.source && (
                  <div className="mt-2 text-sm">
                    <p><strong>Mənbə:</strong> URL-dən</p>
                    <p className="text-xs text-muted-foreground truncate">{result.source.original_url}</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>


            {/* Created Posts - SIMPLIFIED */}
            <Card>
              <CardHeader>
                <CardTitle>Yaradılmış Postlar</CardTitle>
                <CardDescription>{result.posts.length} post uğurla yaradıldı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.posts.map((post, idx) => (
                    <Card key={post.id} className="overflow-hidden">
                      {/* Image */}
                      {post.image_url ? (
                        <div className="relative w-full h-48">
                          <img
                            src={post.image_url}
                            alt={post.hook}
                            className="w-full h-48 object-cover"
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
                            <p className="text-sm text-muted-foreground">Şəkil yaradılacaq</p>
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

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={handleViewPosts} className="flex-1" size="lg">
                Postları Görüntülə
              </Button>
              <Button
                onClick={() => {
                  setResult(null);
                  setProductImage(null);
                  setProductImagePreview(null);
                  setProductName('');
                  setProductDescription('');
                }}
                variant="outline"
                size="lg"
              >
                Yeni Post Yarad
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

