'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { aiAPI, authAPI } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';
import { Copy, Check, Loader2 } from 'lucide-react';

export default function HashtagGeneratorPage() {
  const router = useRouter();
  const t = useTranslation();
  const [content, setContent] = useState('');
  const [numHashtags, setNumHashtags] = useState(15);
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
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

  const handleGenerate = async () => {
    if (!content.trim() && !companyProfile?.company_name) {
      setError(t.hashtagGenerator.errorContentRequired);
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedHashtags([]);

    try {
      const response = await aiAPI.generateHashtags({
        company_name: companyProfile?.company_name || '',
        industry: companyProfile?.industry || '',
        business_description: companyProfile?.business_description || '',
        content: content,
        target_audience: companyProfile?.target_audience || '',
        brand_keywords: companyProfile?.brand_analysis?.brand_keywords || [],
        num_hashtags: numHashtags
      });

      if (response.data?.hashtags) {
        setGeneratedHashtags(response.data.hashtags);
      } else {
        setError(t.hashtagGenerator.errorGenerationFailed);
      }
    } catch (err: any) {
      console.error('Error generating hashtags:', err);
      setError(err.response?.data?.error || t.hashtagGenerator.errorGenerationFailed);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (hashtag: string, index: number) => {
    navigator.clipboard.writeText(hashtag);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const allHashtags = generatedHashtags.join(' ');
    navigator.clipboard.writeText(allHashtags);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <DashboardLayout 
      title={t.hashtagGenerator.title}
      description={t.hashtagGenerator.description}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{t.hashtagGenerator.headerTitle}</h1>
          <p className="text-muted-foreground">
            {t.hashtagGenerator.headerDescription}
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
            <CardTitle>{t.hashtagGenerator.contentSectionTitle}</CardTitle>
            <CardDescription>
              {t.hashtagGenerator.contentSectionDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">{t.hashtagGenerator.contentLabel}</Label>
              <Textarea
                id="content"
                placeholder={t.hashtagGenerator.contentPlaceholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {companyProfile && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">{t.hashtagGenerator.companyInfo}</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>{t.hashtagGenerator.companyName}</strong> {companyProfile.company_name}</p>
                  {companyProfile.industry && (
                    <p><strong>{t.hashtagGenerator.industry}</strong> {companyProfile.industry}</p>
                  )}
                  {companyProfile.business_description && (
                    <p><strong>{t.hashtagGenerator.business}</strong> {companyProfile.business_description.substring(0, 100)}...</p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="num-hashtags">{t.hashtagGenerator.hashtagCount}: {numHashtags}</Label>
                <span className="text-sm text-muted-foreground">{numHashtags} {t.hashtagGenerator.hashtagCountLabel}</span>
              </div>
              <Slider
                id="num-hashtags"
                min={5}
                max={30}
                step={1}
                value={[numHashtags]}
                onValueChange={(value) => setNumHashtags(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5</span>
                <span>30</span>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || (!content.trim() && !companyProfile?.company_name)}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.hashtagGenerator.generatingButton}
                </>
              ) : (
                <>
                  <span className="mr-2">✨</span>
                  {t.hashtagGenerator.generateButton}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Hashtags */}
        {generatedHashtags.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.hashtagGenerator.generatedHashtags}</CardTitle>
                  <CardDescription>
                    {generatedHashtags.length} {t.hashtagGenerator.generatedHashtagsDesc}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAll}
                >
                  {copiedIndex === -1 ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {t.hashtagGenerator.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      {t.hashtagGenerator.copyAll}
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {generatedHashtags.map((hashtag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleCopy(hashtag, index)}
                  >
                    {hashtag}
                    {copiedIndex === index ? (
                      <Check className="w-3 h-3 ml-2" />
                    ) : (
                      <Copy className="w-3 h-3 ml-2 opacity-50" />
                    )}
                  </Badge>
                ))}
              </div>

              {/* Copy All Text */}
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">{t.hashtagGenerator.allHashtags}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyAll}
                  >
                    {copiedIndex === -1 ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        {t.hashtagGenerator.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        {t.hashtagGenerator.copy}
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm font-mono break-words">
                  {generatedHashtags.join(' ')}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>{t.hashtagGenerator.tipsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t.hashtagGenerator.tip1}</li>
              <li>{t.hashtagGenerator.tip2}</li>
              <li>{t.hashtagGenerator.tip3}</li>
              <li>{t.hashtagGenerator.tip4}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

