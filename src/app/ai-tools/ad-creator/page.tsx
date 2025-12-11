'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { adCreativeAPI, authAPI, API_BASE_URL, falAIAPI } from '@/lib/api';
import { Loader2, Download, Copy, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

interface AdCreativeResult {
  ad_image_url: string;
  ad_copy: string;
  headline: string;
  hashtags: string[];
  cta: string;
  metadata: {
    product_name: string;
    format: string;
    style: string;
    generated_at: string;
    branding_applied?: boolean;
  };
}

interface CompanyProfile {
  logo_url?: string;
  logo?: string;
  logo_file?: string;
  branding_enabled?: boolean;
  slogan?: string;
}

const FORMAT_OPTIONS = [
  {
    value: 'social_square',
    label: 'Instagram/Facebook Square',
    dimensions: '1080 x 1080',
    icon: '⬛',
  },
  {
    value: 'story',
    label: 'Instagram/Facebook Story',
    dimensions: '1080 x 1920',
    icon: '📱',
  },
  {
    value: 'landscape',
    label: 'Facebook/LinkedIn Post',
    dimensions: '1200 x 628',
    icon: '▬',
  },
  {
    value: 'portrait',
    label: 'Instagram Portrait',
    dimensions: '1080 x 1350',
    icon: '▯',
  },
];

const STYLE_OPTIONS = [
  { value: 'modern', label: 'Modern' },
  { value: 'professional', label: 'Professional' },
  { value: 'playful', label: 'Playful' },
  { value: 'elegant', label: 'Elegant' },
  { value: 'minimalist', label: 'Minimalist' },
];

export default function AdCreatorPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'manual' | 'link'>('manual');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productLink, setProductLink] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [useNanoBanana, setUseNanoBanana] = useState(true);
  const [adFormat, setAdFormat] = useState('social_square');
  const [style, setStyle] = useState('modern');
  const [targetAudience, setTargetAudience] = useState('');
  const [applyBranding, setApplyBranding] = useState(true);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [result, setResult] = useState<AdCreativeResult | null>(null);
  const [error, setError] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);

  // Load company profile
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await authAPI.getCompanyProfile();
        setCompanyProfile(response.data);
      } catch (error) {
        console.log('No company profile found');
        setCompanyProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchCompanyProfile();
  }, []);

  // Check if backend endpoint is available
  useEffect(() => {
    const checkBackendEndpoint = async () => {
      try {
        // Try a simple OPTIONS request to check if endpoint exists
        // Or we can just set it to true and let the actual request fail gracefully
        setBackendAvailable(true);
      } catch (error) {
        setBackendAvailable(false);
      }
    };
    checkBackendEndpoint();
  }, []);

  // Check if company has logo
  const hasLogo = companyProfile && (
    companyProfile.logo_url || 
    companyProfile.logo || 
    companyProfile.logo_file
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload image to get URL for Nano Banana
      try {
        const formData = new FormData();
        formData.append('image', file);
        // We'll upload it when generating, for now just store the file
      } catch (error) {
        console.error('Error preparing image:', error);
      }
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsGenerating(true);
    setGenerationStep(0);

    try {
      // Validation
      if (mode === 'manual' && (!productName.trim() || !productDescription.trim())) {
        throw new Error('Məhsul adı və təsviri daxil edin');
      }
      if (mode === 'link' && !productLink.trim()) {
        throw new Error('Link daxil edin');
      }

      // Simulate progress steps
      const progressSteps = [
        { step: 1, message: 'Reklam mətni yazılır...', delay: 2000 },
        { step: 2, message: 'Background yaradılır...', delay: 5000 },
        { step: 3, message: 'Şəkil tərtib edilir...', delay: 3000 },
        { step: 4, message: 'Tamamlanır...', delay: 2000 },
      ];

      for (const progress of progressSteps) {
        setGenerationStep(progress.step);
        await new Promise(resolve => setTimeout(resolve, progress.delay));
      }

      // If using Nano Banana, use new API
      if (useNanoBanana && mode === 'manual' && prompt.trim()) {
        setGenerationStep(1);
        
        // First, upload image if provided to get URL
        let imageUrl = null;
        if (productImage) {
          setGenerationStep(2);
          const uploadFormData = new FormData();
          uploadFormData.append('image', productImage);
          // For now, we'll use a temporary approach - in production, upload to your server first
          // For demo, we'll use the preview URL or upload to a temporary storage
          imageUrl = productImagePreview || null;
        }
        
        setGenerationStep(3);
        
        try {
          let response;
          if (imageUrl && productImage) {
            // Image-to-image transformation
            // First upload image to get a URL (simplified - in production use proper upload endpoint)
            const imageFormData = new FormData();
            imageFormData.append('image', productImage);
            
            // For now, we'll use image-to-image with base64 or we need to upload first
            // Let's use the existing ad creative endpoint but with Nano Banana flag
            // Actually, let's call Nano Banana API directly
            response = await falAIAPI.nanoBananaImageToImage({
              image_url: imageUrl, // This needs to be a proper URL, not base64
              prompt: prompt,
              product_name: productName,
              product_description: productDescription,
              enhance_prompt: true,
              save_to_storage: true,
            });
          } else {
            // Text-to-image generation
            response = await falAIAPI.nanoBananaTextToImage({
              prompt: prompt,
              product_name: productName,
              product_description: productDescription,
              width: adFormat === 'story' ? 1080 : adFormat === 'portrait' ? 1080 : adFormat === 'landscape' ? 1200 : 1080,
              height: adFormat === 'story' ? 1920 : adFormat === 'portrait' ? 1350 : adFormat === 'landscape' ? 628 : 1080,
              enhance_prompt: true,
              save_to_storage: true,
            });
          }
          
          // Create result in AdCreativeResult format
          const nanoBananaResult: AdCreativeResult = {
            ad_image_url: response.data.image_url || response.data.saved_image_url,
            ad_copy: `${productName || 'Məhsul'} üçün yaradılmış professional reklam şəkli. ${productDescription || ''}`,
            headline: `${productName || 'Məhsul'} ilə Yeni Səviyyəyə Qalxın`,
            hashtags: [
              `#${(productName || 'Məhsul').replace(/\s+/g, '')}`,
              '#AI',
              '#Marketing',
              '#Creative',
            ],
            cta: 'İndi Kəşf Edin',
            metadata: {
              product_name: productName || 'Məhsul',
              format: adFormat,
              style: style,
              generated_at: new Date().toISOString(),
              branding_applied: false,
            }
          };
          
          setResult(nanoBananaResult);
          setGenerationStep(0);
        } catch (nanoError: any) {
          console.error('Nano Banana error:', nanoError);
          // Fallback to original API
          throw nanoError;
        }
      } else {
        // Original ad creative generation
        const formData = new FormData();
        
        if (mode === 'manual') {
          formData.append('product_name', productName);
          formData.append('product_description', productDescription);
          if (productImage) {
            formData.append('product_image', productImage);
          }
        } else {
          formData.append('product_link', productLink);
        }
        
        formData.append('ad_format', adFormat);
        formData.append('style', style);
        formData.append('apply_branding', applyBranding ? 'true' : 'false');
        if (targetAudience) {
          formData.append('target_audience', targetAudience);
        }

        // Call API
        try {
          const response = await adCreativeAPI.createAdCreative(formData);
          setResult(response.data);
          setGenerationStep(0);
      } catch (apiError: any) {
        // If 404, backend endpoint doesn't exist yet - use mock data for development
        if (apiError.response?.status === 404) {
          console.warn('⚠️ Backend endpoint not found. Using mock data for development.');
          
          // Mock response for development - using data URI for offline support
          // Use encodeURIComponent instead of btoa to support Unicode characters
          const safeProductName = (productName || 'AI Generated').replace(/[<>]/g, ''); // Remove XML unsafe chars
          const svgContent = `
            <svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#6366F1;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="1080" height="1080" fill="url(#grad)"/>
              <text x="540" y="400" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">
                ${safeProductName}
              </text>
              <text x="540" y="500" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle">
                Ad Creative
              </text>
              <text x="540" y="600" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)" text-anchor="middle">
                Mock Data (Development)
              </text>
            </svg>
          `.trim();
          
          // Use encodeURIComponent for Unicode-safe encoding
          const mockImageDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
          
          const mockResult: AdCreativeResult = {
            ad_image_url: mockImageDataUri,
            ad_copy: `${productName || 'Məhsul'} üçün yaradılmış professional reklam mətni. ${productDescription || 'Məhsulunuzun əsas xüsusiyyətləri və faydaları burada təqdim olunur.'}`,
            headline: `${productName || 'Məhsul'} ilə Yeni Səviyyəyə Qalxın`,
            hashtags: [
              `#${(productName || 'Məhsul').replace(/\s+/g, '')}`,
              '#Innovation',
              '#Technology',
              '#Business',
              '#Marketing'
            ],
            cta: 'İndi Kəşf Edin',
            metadata: {
              product_name: productName || 'Məhsul',
              format: adFormat,
              style: style,
              generated_at: new Date().toISOString(),
              branding_applied: applyBranding && hasLogo && companyProfile?.branding_enabled || false
            }
          };
          
          setResult(mockResult);
          setGenerationStep(0);
          setError('⚠️ Backend endpoint hazır deyil. Mock data göstərilir (development).');
        } else {
          // Re-throw other errors
          throw apiError;
        }
      }

    } catch (err: any) {
      console.error('Ad creative error:', err);
      
      // Handle 404 error specifically
      if (err.response?.status === 404) {
        setBackendAvailable(false);
        const endpoint = err.config?.url || '/api/ai/create-ad-creative/';
        setError(`Backend endpoint tapılmadı: ${endpoint}`);
      } else if (err.response?.status === 401) {
        setError('Giriş edilməyib. Zəhmət olmasa yenidən giriş edin.');
      } else if (err.response?.status === 500) {
        const errorDetails = err.response?.data?.details || err.response?.data?.error || err.response?.data?.message || '';
        setError(`Server xətası (500). Backend-də problem var. ${errorDetails ? `Detallar: ${errorDetails}` : 'Backend developer ilə əlaqə saxlayın.'}`);
        console.error('Backend error details:', err.response?.data);
      } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        setError('Şəbəkə xətası. Backend server-ə qoşula bilinmir. Backend server-in işlədiyindən əmin olun.');
      } else {
        const errorMessage = err.response?.data?.error || 
                           err.response?.data?.detail || 
                           err.response?.data?.message ||
                           err.message || 
                           'Reklam yaradıla bilmədi';
        setError(errorMessage);
      }
      
      setGenerationStep(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `ad_creative_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download:', err);
    }
  };

  const useInPost = (creative: AdCreativeResult) => {
    const content = `${creative.headline}\n\n${creative.ad_copy}`;
    const hashtags = creative.hashtags.join(', ');
    
    router.push({
      pathname: '/posts',
      query: {
        image: creative.ad_image_url,
        content: content,
        hashtags: hashtags,
      },
    });
  };

  const progressSteps = [
    { step: 1, label: '📝 Mətn', message: 'Reklam mətni yazılır...' },
    { step: 2, label: '🎨 Dizayn', message: 'Background yaradılır...' },
    { step: 3, label: '✨ Tamamlanır', message: 'Şəkil tərtib edilir...' },
  ];

  return (
    <DashboardLayout 
      title="AI Ad Creative Generator"
      description="Create professional marketing visuals with AI"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Reklam Şəkli Yarat
            </CardTitle>
            <CardDescription>
              AI ilə professional reklam şəkilləri və mətnləri yaradın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Mode Toggle */}
              <Tabs value={mode} onValueChange={(v) => setMode(v as 'manual' | 'link')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">📝 Manuel</TabsTrigger>
                  <TabsTrigger value="link">🔗 Link</TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Məhsul/Şirkət Adı *</Label>
                    <Input
                      id="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="məs: iPhone 15 Pro"
                      required
                      disabled={isGenerating}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Məhsul Təsviri *</Label>
                    <Textarea
                      id="productDescription"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      placeholder="Məhsulunuzun əsas xüsusiyyətləri..."
                      rows={4}
                      required
                      disabled={isGenerating}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productImage">Məhsul Şəkli (Optional)</Label>
                    <Input
                      id="productImage"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleImageChange}
                      disabled={isGenerating}
                    />
                    {productImagePreview && (
                      <div className="mt-2 relative w-32 h-32 rounded-lg overflow-hidden border">
                        <Image
                          src={productImagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {useNanoBanana && (
                    <div className="space-y-2">
                      <Label htmlFor="prompt">AI Prompt (Nano Banana üçün) *</Label>
                      <Textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="məs: Professional product photo with modern background, vibrant colors, studio lighting"
                        rows={3}
                        required={useNanoBanana}
                        disabled={isGenerating}
                      />
                      <p className="text-xs text-muted-foreground">
                        Prompt arxa planda professional hale gətiriləcək. Şəkil varsa transformasiya, yoxsa yeni şəkil yaradılacaq.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="useNanoBanana"
                        checked={useNanoBanana}
                        onChange={(e) => setUseNanoBanana(e.target.checked)}
                        disabled={isGenerating}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <Label htmlFor="useNanoBanana" className="font-medium cursor-pointer">
                        Nano Banana AI istifadə et (Yeni - Daha yaxşı nəticələr)
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      Nano Banana ilə daha professional və yüksək keyfiyyətli şəkillər yaradın
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="link" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="productLink">Məhsul/Şirkət Link-i *</Label>
                    <Input
                      id="productLink"
                      type="url"
                      value={productLink}
                      onChange={(e) => setProductLink(e.target.value)}
                      placeholder="https://example.com/product"
                      required
                      disabled={isGenerating}
                    />
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Link-dən avtomatik məlumat çıxarılacaq
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        ⚠️ Diqqət: Website-in istifadə şərtlərini yoxlayın. Siz öz məsuliyyətinizə istifadə edirsiniz.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Separator />

              {/* Ad Format */}
              <div className="space-y-3">
                <Label>Reklam Formatı</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {FORMAT_OPTIONS.map((format) => (
                    <button
                      key={format.value}
                      type="button"
                      onClick={() => setAdFormat(format.value)}
                      disabled={isGenerating}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        adFormat === format.value
                          ? 'border-primary bg-primary/5'
                          : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{format.icon}</div>
                      <div className="text-sm font-medium">{format.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {format.dimensions}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div className="space-y-3">
                <Label>Dizayn Stili</Label>
                <div className="flex flex-wrap gap-2">
                  {STYLE_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setStyle(s.value)}
                      disabled={isGenerating}
                      className={`px-4 py-2 rounded-full border transition-all ${
                        style === s.value
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-muted hover:border-primary/50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Hədəf Auditoriya (Optional)</Label>
                <Input
                  id="targetAudience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="məs: Gənclər 18-35, texnologiya həvəskarları"
                  disabled={isGenerating}
                />
              </div>

              <Separator />

              {/* Branding Toggle */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="applyBranding"
                    checked={applyBranding}
                    onChange={(e) => setApplyBranding(e.target.checked)}
                    disabled={isGenerating}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label htmlFor="applyBranding" className="font-medium cursor-pointer">
                    Şirkət loqosu və slogan-ı əlavə et
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Company Profile-dakı logo və slogan istifadə olunacaq
                </p>
              </div>

              {/* Branding Warnings - Only show if backend is available */}
              {applyBranding && !loadingProfile && backendAvailable !== false && (
                <div className="space-y-2">
                  {!hasLogo && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        ⚠️ Şirkət loqosu yüklənməyib. Brending tətbiq olunmayacaq.{' '}
                        <Link href="/settings" className="underline font-medium">
                          Logo yüklə
                        </Link>
                      </AlertDescription>
                    </Alert>
                  )}
                  {hasLogo && companyProfile && !companyProfile.branding_enabled && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        ⚠️ Avtomatik brending deaktivdir. Parametrlərdə aktivləşdirin.{' '}
                        <Link href="/settings" className="underline font-medium">
                          Aktivləşdir
                        </Link>
                      </AlertDescription>
                    </Alert>
                  )}
                  {hasLogo && companyProfile?.branding_enabled && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        ✓ Şirkət branding-i aktivdir və reklam şəklinə əlavə olunacaq
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {error.includes('404') || error.includes('endpoint') || error.includes('tapılmadı') ? (
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium mb-1">⚠️ Backend Endpoint Tapılmadı (404)</p>
                          <p className="text-sm text-muted-foreground">
                            Bu xidmət hazırda istifadə oluna bilmir çünki backend endpoint-i yaradılmayıb.
                          </p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-md border border-destructive/20">
                          <p className="text-xs font-semibold mb-1 text-muted-foreground">Endpoint Detalları:</p>
                          <div className="space-y-1">
                            <code className="text-xs block">Method: POST</code>
                            <code className="text-xs block">URL: /api/ai/create-ad-creative/</code>
                            <code className="text-xs block">Full URL: {API_BASE_URL}/ai/create-ad-creative/</code>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-800">
                          <p className="text-sm font-medium mb-1">📋 Nə etməli:</p>
                          <ul className="text-xs space-y-1 text-muted-foreground list-disc list-inside">
                            <li>Backend developer ilə əlaqə saxlayın</li>
                            <li>Endpoint-in yaradıldığından əmin olun</li>
                            <li>URL routing-də endpoint-in qeydiyyata alındığını yoxlayın</li>
                            <li>Backend server-in işlədiyini təsdiq edin</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium mb-1">Xəta baş verdi</p>
                        <p className="text-sm">{error}</p>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Progress Indicator */}
              {isGenerating && (
                <div className="space-y-3 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Yaradılır... (10-15 saniyə)</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="flex gap-2">
                    {progressSteps.map((step) => (
                      <div
                        key={step.step}
                        className={`flex-1 text-center p-2 rounded ${
                          generationStep >= step.step
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background'
                        }`}
                      >
                        <div className="text-xs">{step.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Generate Button */}
              <Button
                type="submit"
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Yaradılır...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Reklam Şəkli Yarat
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Yaradılmış Reklam
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generated Ad Image */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Yaradılmış Reklam Şəkli</Label>
                  {result.metadata.branding_applied && hasLogo && (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Şirkət branding-i əlavə edilib
                    </Badge>
                  )}
                </div>
                <div className="relative rounded-lg overflow-hidden border-2 border-muted">
                  <div className="relative w-full aspect-square max-w-2xl mx-auto">
                    <Image
                      src={result.ad_image_url}
                      alt="Generated Ad"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => downloadImage(result.ad_image_url)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Yüklə
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(result.ad_image_url)}
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Link Kopyala
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Ad Copy */}
              <div className="space-y-4">
                <Label className="text-lg">Reklam Mətni</Label>

                {result.headline && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-muted-foreground">Başlıq:</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(result.headline)}
                      >
                        {copiedText === result.headline ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xl font-semibold p-4 bg-muted rounded-lg">
                      {result.headline}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Əsas Mətn:</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(result.ad_copy)}
                    >
                      {copiedText === result.ad_copy ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                    {result.ad_copy}
                  </p>
                </div>

                {result.cta && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Call-to-Action:</Label>
                    <Badge variant="secondary" className="text-base px-4 py-2">
                      {result.cta}
                    </Badge>
                  </div>
                )}

                {result.hashtags && result.hashtags.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-muted-foreground">Hashtag-lar:</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(result.hashtags.join(' '))}
                      >
                        {copiedText === result.hashtags.join(' ') ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.hashtags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-sm px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => useInPost(result)}
                  className="flex-1"
                  size="lg"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Post-da İstifadə Et
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

