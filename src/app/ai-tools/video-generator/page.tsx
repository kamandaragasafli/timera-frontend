'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { falAIAPI, authAPI } from '@/lib/api';
import { Loader2, Download, Copy, CheckCircle2, Video, AlertTriangle, Upload } from 'lucide-react';
import Image from 'next/image';

interface VideoResult {
  video_url: string;
  enhanced_prompt?: string;
  status: string;
  job_id: string;
  saved_video_url?: string;
}

interface CompanyProfile {
  logo_url?: string;
  logo?: string;
  logo_file?: string;
  branding_enabled?: boolean;
  slogan?: string;
}

export default function VideoGeneratorPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [prompt, setPrompt] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(5);
  const [fps, setFps] = useState(24);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(576);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [result, setResult] = useState<VideoResult | null>(null);
  const [error, setError] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

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

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsGenerating(true);
    setGenerationStep(0);

    try {
      // Validation
      if (!prompt.trim()) {
        throw new Error('Prompt daxil edin');
      }

      if (mode === 'image' && !productImage) {
        throw new Error('Video üçün şəkil yükləyin');
      }

      // Progress steps
      const progressSteps = [
        { step: 1, message: 'Prompt professional hale gətirilir...', delay: 2000 },
        { step: 2, message: 'Video yaradılır...', delay: 10000 },
        { step: 3, message: 'Tamamlanır...', delay: 5000 },
      ];

      for (const progress of progressSteps) {
        setGenerationStep(progress.step);
        await new Promise(resolve => setTimeout(resolve, progress.delay));
      }

      if (mode === 'image' && productImage) {
        // Image-to-video using existing endpoint
        setGenerationStep(2);
        
        // First, we need to upload the image to get a URL
        // For now, we'll use a simplified approach - in production, upload to your server first
        const imageFormData = new FormData();
        imageFormData.append('image', productImage);
        
        // Note: In production, you should upload the image first to get a URL
        // For now, we'll use the image-to-video endpoint which might accept base64 or file upload
        // Let's use the existing image-to-video endpoint
        try {
          // We need to upload image first to get URL
          // For demo, let's assume we have an upload endpoint or use a temporary solution
          const response = await falAIAPI.imageToVideo({
            image_url: productImagePreview || '', // This should be a proper URL
            prompt: prompt,
            duration: duration,
            fps: fps,
            save_to_storage: true,
          });
          
          setResult({
            video_url: response.data.video_url,
            status: response.data.status,
            job_id: response.data.job_id,
            saved_video_url: response.data.saved_video_url,
          });
        } catch (imgError: any) {
          throw new Error(`Image-to-video xətası: ${imgError.response?.data?.error || imgError.message}`);
        }
      } else {
        // Text-to-video
        setGenerationStep(2);
        
        const response = await falAIAPI.klingVideoTextToVideo({
          prompt: prompt,
          duration: duration,
          fps: fps,
          width: width,
          height: height,
          enhance_prompt: true,
          save_to_storage: true,
        });
        
        setResult({
          video_url: response.data.video_url,
          enhanced_prompt: response.data.enhanced_prompt,
          status: response.data.status,
          job_id: response.data.job_id,
          saved_video_url: response.data.saved_video_url,
        });
      }

      setGenerationStep(0);
    } catch (err: any) {
      console.error('Video generation error:', err);
      
      if (err.response?.status === 401) {
        setError('Giriş edilməyib. Zəhmət olmasa yenidən giriş edin.');
      } else if (err.response?.status === 500) {
        const errorDetails = err.response?.data?.details || err.response?.data?.error || '';
        setError(`Server xətası (500). ${errorDetails ? `Detallar: ${errorDetails}` : 'Backend developer ilə əlaqə saxlayın.'}`);
      } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        setError('Şəbəkə xətası. Backend server-ə qoşula bilinmir.');
      } else {
        const errorMessage = err.response?.data?.error || 
                           err.response?.data?.detail || 
                           err.response?.data?.message ||
                           err.message || 
                           'Video yaradıla bilmədi';
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

  const downloadVideo = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `video_${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download:', err);
    }
  };

  const progressSteps = [
    { step: 1, label: '📝 Prompt', message: 'Prompt professional hale gətirilir...' },
    { step: 2, label: '🎬 Video', message: 'Video yaradılır...' },
    { step: 3, label: '✨ Tamamlanır', message: 'Tamamlanır...' },
  ];

  return (
    <DashboardLayout 
      title="AI Video Generator"
      description="Create professional videos with AI using Kling Video"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Video Yaradın
            </CardTitle>
            <CardDescription>
              Kling Video AI ilə professional videolar yaradın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Mode Toggle */}
              <div className="space-y-3">
                <Label>Video Yaradılma Metodu</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode('text')}
                    disabled={isGenerating}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      mode === 'text'
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">📝</div>
                    <div className="text-sm font-medium">Metindən Video</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Prompt yazın, video yaradılsın
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('image')}
                    disabled={isGenerating}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      mode === 'image'
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">🖼️</div>
                    <div className="text-sm font-medium">Şəkildən Video</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Şəkil yükləyin, hərəkətli video olsun
                    </div>
                  </button>
                </div>
              </div>

              <Separator />

              {/* Prompt */}
              <div className="space-y-2">
                <Label htmlFor="prompt">AI Prompt *</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="məs: A beautiful sunset over mountains with birds flying, cinematic camera movement, slow motion"
                  rows={4}
                  required
                  disabled={isGenerating}
                />
                <p className="text-xs text-muted-foreground">
                  Prompt arxa planda professional video terminologiyası ilə zənginləşdiriləcək
                </p>
              </div>

              {/* Image Upload (for image-to-video mode) */}
              {mode === 'image' && (
                <div className="space-y-2">
                  <Label htmlFor="productImage">Şəkil Yükləyin *</Label>
                  <Input
                    id="productImage"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageChange}
                    disabled={isGenerating}
                    required={mode === 'image'}
                  />
                  {productImagePreview && (
                    <div className="mt-2 relative w-64 h-64 rounded-lg overflow-hidden border">
                      <Image
                        src={productImagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              <Separator />

              {/* Video Settings */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Video Parametrləri</Label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Müddət (saniyə)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="10"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 5)}
                      disabled={isGenerating}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fps">FPS (Frame per Second)</Label>
                    <Input
                      id="fps"
                      type="number"
                      min="24"
                      max="60"
                      value={fps}
                      onChange={(e) => setFps(parseInt(e.target.value) || 24)}
                      disabled={isGenerating}
                    />
                  </div>
                </div>

                {mode === 'text' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">En (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        min="512"
                        max="1920"
                        step="64"
                        value={width}
                        onChange={(e) => setWidth(parseInt(e.target.value) || 1024)}
                        disabled={isGenerating}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height">Hündürlük (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        min="512"
                        max="1920"
                        step="64"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value) || 576)}
                        disabled={isGenerating}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium mb-1">Xəta baş verdi</p>
                    <p className="text-sm">{error}</p>
                  </AlertDescription>
                </Alert>
              )}

              {/* Progress Indicator */}
              {isGenerating && (
                <div className="space-y-3 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Video yaradılır... (30-60 saniyə)</span>
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
                    Video Yaradılır...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Video Yaradın
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
                Yaradılmış Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generated Video */}
              <div className="space-y-3">
                <Label>Yaradılmış Video</Label>
                <div className="relative rounded-lg overflow-hidden border-2 border-muted bg-black">
                  <video
                    src={result.video_url}
                    controls
                    className="w-full h-auto max-h-[600px]"
                    autoPlay
                    loop
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => downloadVideo(result.video_url)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Yüklə
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(result.video_url)}
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Link Kopyala
                  </Button>
                </div>
              </div>

              {result.enhanced_prompt && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-muted-foreground">Professional Prompt:</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(result.enhanced_prompt || '')}
                      >
                        {copiedText === result.enhanced_prompt ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="p-4 bg-muted rounded-lg text-sm">
                      {result.enhanced_prompt}
                    </p>
                  </div>
                </>
              )}

              <Separator />

              {/* Metadata */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Video Məlumatları:</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Status:</span>{' '}
                    <Badge variant="outline">{result.status}</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Job ID:</span>{' '}
                    <code className="text-xs">{result.job_id}</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

