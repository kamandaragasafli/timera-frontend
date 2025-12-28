'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { postsAPI } from '@/lib/api';

interface PostGenerationWizardProps {
  onComplete: (posts: any[]) => void;
  companyProfile: any;
}

export default function PostGenerationWizard({ onComplete, companyProfile }: PostGenerationWizardProps) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');

    try {
      const response = await postsAPI.generatePosts({
        generate_images: false,
        custom_prompt: customPrompt
      });

      onComplete(response.data.posts);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Paylaşımlar yaradarkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setIsGenerating(false);
    }
  };

  const postsCount = companyProfile.posts_to_generate || 10;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">AI Məzmun Yarat</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Company Info Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <span className="mr-2">🏢</span>
                Şirkət Məlumatı
              </CardTitle>
              <CardDescription>
                AI bu məlumatları istifadə edərək uyğun məzmun yaradacaq
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/setup/company')}
            >
              ✏️ Redaktə Et
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">Şirkət</Badge>
                <span className="font-medium">{companyProfile.company_name}</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">Sənaye</Badge>
                <span>{companyProfile.industry}</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">Ölçü</Badge>
                <span>{companyProfile.company_size}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Ton</Badge>
                <span>{companyProfile.preferred_tone}</span>
              </div>
            </div>
            <div>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-muted-foreground">Biznes:</span>
                  <p className="text-xs">{companyProfile.business_description?.substring(0, 100)}...</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Auditoriya:</span>
                  <p className="text-xs">{companyProfile.target_audience?.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">⚙️</span>
            Yaradılma Seçimləri
          </CardTitle>
          <CardDescription>
            AI məzmununuzu necə yaradacağını fərdiləşdirin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="space-y-2">
            <Label htmlFor="custom_prompt">Əlavə Təlimatlar (İstəyə Bağlı)</Label>
            <Textarea
              id="custom_prompt"
              placeholder="Məzmun yaradılması üçün xüsusi təlimatlar əlavə edin..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground">
              Məsələn: "Yeni məhsul xüsusiyyətlərinə fokuslan", "Müştəri rəylərini daxil et", "Dayanıqlılığı vurğula"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Generation Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">🤖</span>
            Nə Yaradılacaq
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Məzmun Xüsusiyyətləri:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center"><span className="mr-2">✅</span> {postsCount} unikal paylaşım</li>
                <li className="flex items-center"><span className="mr-2">✅</span> Azərbaycan dili</li>
                <li className="flex items-center"><span className="mr-2">✅</span> Cəlbedici başlıqlar</li>
                <li className="flex items-center"><span className="mr-2">✅</span> Uyğun heşteqlər</li>
                <li className="flex items-center"><span className="mr-2">✅</span> Paylaşım təsvirləri</li>
                <li className="flex items-center"><span className="mr-2">✅</span> Müxtəlif məzmun növləri</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Paylaşım Növləri:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">📢 Elanlar</Badge>
                <Badge variant="secondary">📚 Təhsil</Badge>
                <Badge variant="secondary">🎯 Promosyon</Badge>
                <Badge variant="secondary">💬 Müzakirə</Badge>
                <Badge variant="secondary">🏢 Şirkət Mədəniyyəti</Badge>
                <Badge variant="secondary">💡 Məsləhət və Fikirlər</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="text-center">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          size="lg"
          className="px-12 py-3"
        >
          {isGenerating ? (
            <>
              <span className="mr-2">⏳</span>
              Paylaşımlar Yaradılır...
            </>
          ) : (
            <>
              <span className="mr-2">🚀</span>
              {postsCount} AI Paylaşım Yarat
            </>
          )}
        </Button>
        
        {isGenerating && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span>AI ilə əla məzmun yaradılır...</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Bu 30-60 saniyə çəkə bilər. Zəhmət olmasa bu səhifəni bağlamayın.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
