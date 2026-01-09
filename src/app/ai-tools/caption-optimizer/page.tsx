'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { aiAPI, authAPI } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';
import { Copy, Check, Loader2, ArrowRight, Sparkles } from 'lucide-react';

export default function CaptionOptimizerPage() {
  const router = useRouter();
  const t = useTranslation();
  const [caption, setCaption] = useState('');
  const [contentType, setContentType] = useState('post');
  const [platform, setPlatform] = useState('general');
  const [tone, setTone] = useState('professional');
  const [optimizedCaption, setOptimizedCaption] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<any>(null);

  // Load company profile
  useEffect(() => {
    const loadCompanyProfile = async () => {
      try {
        const response = await authAPI.getCompanyProfile();
        setCompanyProfile(response.data);
      } catch (error) {
        console.error('Failed to load company profile:', error);
      }
    };
    loadCompanyProfile();
  }, []);

  const handleOptimize = async () => {
    if (!caption.trim()) {
      setError('Zəhmət olmasa, başlıq və ya caption daxil edin');
      return;
    }

    setIsOptimizing(true);
    setError('');
    setOptimizedCaption('');

    try {
      const response = await aiAPI.optimizeCaption({
        caption: caption,
        content_type: contentType,
        platform: platform,
        company_name: companyProfile?.company_name || '',
        industry: companyProfile?.industry || '',
        target_audience: companyProfile?.target_audience || '',
        tone: tone
      });

      if (response.data?.optimized_caption) {
        setOptimizedCaption(response.data.optimized_caption);
      } else {
        setError('Başlıq optimallaşdırıla bilmədi. Zəhmət olmasa yenidən cəhd edin.');
      }
    } catch (err: any) {
      console.error('Error optimizing caption:', err);
      setError(err.response?.data?.error || 'Başlıq optimallaşdırıla bilmədi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseOptimized = () => {
    setCaption(optimizedCaption);
    setOptimizedCaption('');
  };

  return (
    <DashboardLayout 
      title="Başlıq Optimizatoru"
      description="Daha yaxşı təşviq üçün başlıqlarınızı təkmilləşdirin"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">📝 Başlıq Optimizatoru</h1>
          <p className="text-muted-foreground">
            Daha yaxşı təşviq üçün başlıqlarınızı təkmilləşdirin
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Başlıq / Caption</CardTitle>
            <CardDescription>
              Optimallaşdırmaq istədiyiniz başlıq və ya caption-ı daxil edin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="caption">Orijinal Başlıq</Label>
              <Textarea
                id="caption"
                placeholder="Məsələn: Yeni məhsulumuzu təqdim edirik!"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                {caption.length} simvol
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="content-type">Məzmun Növü</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger id="content-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Paylaşım</SelectItem>
                    <SelectItem value="title">Başlıq</SelectItem>
                    <SelectItem value="description">Təsvir</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger id="platform">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Ümumi</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Ton</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Dostcasına</SelectItem>
                    <SelectItem value="creative">Yaradıcı</SelectItem>
                    <SelectItem value="friendly">Dostlu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {companyProfile && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">Şirkət Məlumatları:</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Şirkət:</strong> {companyProfile.company_name}</p>
                  {companyProfile.industry && (
                    <p><strong>Sənaye:</strong> {companyProfile.industry}</p>
                  )}
                  {companyProfile.preferred_tone && (
                    <p><strong>Üstünlük Verilən Ton:</strong> {companyProfile.preferred_tone}</p>
                  )}
                </div>
              </div>
            )}

            <Button
              onClick={handleOptimize}
              disabled={isOptimizing || !caption.trim()}
              className="w-full"
              size="lg"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Optimallaşdırılır...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Optimallaşdır
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Optimized Result */}
        {optimizedCaption && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Optimallaşdırılmış Başlıq</CardTitle>
                  <CardDescription>
                    {optimizedCaption.length} simvol ({optimizedCaption.length - caption.length > 0 ? '+' : ''}{optimizedCaption.length - caption.length} simvol dəyişiklik)
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Kopyalandı
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Kopyala
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUseOptimized}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    İstifadə Et
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-base whitespace-pre-wrap">{optimizedCaption}</p>
              </div>

              {/* Comparison */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Orijinal</Label>
                  <div className="p-3 bg-background border rounded-lg">
                    <p className="text-sm">{caption}</p>
                    <p className="text-xs text-muted-foreground mt-2">{caption.length} simvol</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Optimallaşdırılmış</Label>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm">{optimizedCaption}</p>
                    <p className="text-xs text-muted-foreground mt-2">{optimizedCaption.length} simvol</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Məsləhətlər</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Platforma uyğun başlıq seçin (Instagram, Facebook, LinkedIn)</li>
              <li>• Ton seçimi brendinizə uyğun olmalıdır</li>
              <li>• Qısa və cəlbedici başlıqlar daha yaxşı performans göstərir</li>
              <li>• Call-to-action əlavə etməyi unutmayın</li>
              <li>• Müxtəlif variantları sınayın və ən yaxşısını seçin</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

