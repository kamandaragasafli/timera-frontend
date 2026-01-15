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
import { useTranslation } from '@/hooks/useTranslation';

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
  const t = useTranslation();
  const mode = 'image'; // Only image-to-video mode
  const [prompt, setPrompt] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(5);
  const [fps, setFps] = useState(24);
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
        throw new Error(t.videoGenerator.errorPromptRequired);
      }

      if (mode === 'image' && !productImage) {
        throw new Error(t.videoGenerator.errorImageRequired);
      }

      // Progress steps
      const progressSteps = [
        { step: 1, message: t.videoGenerator.progressStep1, delay: 2000 },
        { step: 2, message: t.videoGenerator.progressStep2, delay: 10000 },
        { step: 3, message: t.videoGenerator.progressStep3, delay: 5000 },
      ];

      for (const progress of progressSteps) {
        setGenerationStep(progress.step);
        await new Promise(resolve => setTimeout(resolve, progress.delay));
      }

      // Image-to-video only
      setGenerationStep(2);
      
      try {
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
        throw new Error(t.videoGenerator.errorImageToVideo.replace('{error}', imgError.response?.data?.error || imgError.message));
      }

      setGenerationStep(0);
    } catch (err: any) {
      console.error('Video generation error:', err);
      
      if (err.response?.status === 401) {
        setError(t.videoGenerator.errorLoginRequired);
      } else if (err.response?.status === 500) {
        const errorDetails = err.response?.data?.details || err.response?.data?.error || '';
        setError(`${t.videoGenerator.errorServerError} ${errorDetails ? `Details: ${errorDetails}` : ''}`);
      } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        setError(t.videoGenerator.errorNetworkError);
      } else {
        const errorMessage = err.response?.data?.error || 
                           err.response?.data?.detail || 
                           err.response?.data?.message ||
                           err.message || 
                           t.videoGenerator.errorVideoGenerationFailed;
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
    { step: 1, label: t.videoGenerator.progressStep1, message: t.videoGenerator.progressStep1 },
    { step: 2, label: t.videoGenerator.progressStep2, message: t.videoGenerator.progressStep2 },
    { step: 3, label: t.videoGenerator.progressStep3, message: t.videoGenerator.progressStep3 },
  ];

  return (
    <DashboardLayout 
      title={t.videoGenerator.title}
      description={t.videoGenerator.description}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              {t.videoGenerator.cardTitle}
            </CardTitle>
            <CardDescription>
              {t.videoGenerator.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">

              {/* Prompt */}
              <div className="space-y-2">
                <Label htmlFor="prompt">{t.videoGenerator.promptLabel}</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t.videoGenerator.promptPlaceholder}
                  rows={4}
                  required
                  disabled={isGenerating}
                />
                <p className="text-xs text-muted-foreground">
                  {t.videoGenerator.promptDescription}
                </p>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="productImage">{t.videoGenerator.imageUploadLabel}</Label>
                <Input
                  id="productImage"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  disabled={isGenerating}
                  required
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

              <Separator />

              {/* Video Settings */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">{t.videoGenerator.parametersLabel}</Label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">{t.videoGenerator.durationLabel}</Label>
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
                    <Label htmlFor="fps">{t.videoGenerator.fpsLabel}</Label>
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

              </div>

              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium mb-1">{t.videoGenerator.errorTitle}</p>
                    <p className="text-sm">{error}</p>
                  </AlertDescription>
                </Alert>
              )}

              {/* Progress Indicator */}
              {isGenerating && (
                <div className="space-y-3 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t.videoGenerator.progressMessage}</span>
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
                    {t.videoGenerator.generatingButton}
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    {t.videoGenerator.generateButton}
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
                {t.videoGenerator.resultTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generated Video */}
              <div className="space-y-3">
                <Label>{t.videoGenerator.resultVideoLabel}</Label>
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
                    {t.videoGenerator.downloadButton}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(result.video_url)}
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {t.videoGenerator.copyLinkButton}
                  </Button>
                </div>
              </div>

              {result.enhanced_prompt && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-muted-foreground">{t.videoGenerator.professionalPromptLabel}</Label>
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
                <Label className="text-sm text-muted-foreground">{t.videoGenerator.videoInfoLabel}</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">{t.videoGenerator.statusLabel}</span>{' '}
                    <Badge variant="outline">{result.status}</Badge>
                  </div>
                  <div>
                    <span className="font-medium">{t.videoGenerator.jobIdLabel}</span>{' '}
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

