'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';

export default function AIToolsPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoDialogOpen, setLogoDialogOpen] = useState(false);
  // Logo & Slogan Generator states
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [generatedSlogan, setGeneratedSlogan] = useState<string | null>(null);
  const [isSavingToProfile, setIsSavingToProfile] = useState(false);
  const t = useTranslation();

  // Mock AI tools
  const aiTools = [
    {
      id: 1,
      name: t.aiTools.contentGenerator,
      description: t.aiTools.contentGeneratorDesc,
      icon: '✨',
      color: 'bg-purple-500',
      category: 'Content Creation'
    },
    {
      id: 2,
      name: t.aiTools.hashtagGenerator,
      description: t.aiTools.hashtagGeneratorDesc,
      icon: '#️⃣',
      color: 'bg-blue-500',
      category: 'Optimization'
    },
    {
      id: 3,
      name: t.aiTools.captionOptimizer,
      description: t.aiTools.captionOptimizerDesc,
      icon: '📝',
      color: 'bg-green-500',
      category: 'Optimization'
    },
    {
      id: 4,
      name: t.aiTools.imageGenerator,
      description: t.aiTools.imageGeneratorDesc,
      icon: '🎨',
      color: 'bg-pink-500',
      category: 'Visual Content',
      comingSoon: true
    },
    {
      id: 5,
      name: t.aiTools.trendAnalyzer,
      description: t.aiTools.trendAnalyzerDesc,
      icon: '📈',
      color: 'bg-orange-500',
      category: 'Analytics'
    },
    {
      id: 6,
      name: t.aiTools.competitorAnalysis,
      description: t.aiTools.competitorAnalysisDesc,
      icon: '🔍',
      color: 'bg-indigo-500',
      category: 'Analytics'
    },
    {
      id: 7,
      name: t.aiTools.logoSloganGenerator,
      description: t.aiTools.logoSloganGeneratorDesc,
      icon: '🎯',
      color: 'bg-teal-500',
      category: 'Branding'
    },
    {
      id: 8,
      name: t.aiTools.adCreativeGenerator,
      description: t.aiTools.adCreativeGeneratorDesc,
      icon: '🎨',
      color: 'bg-violet-500',
      category: 'Visual Content'
    },
    {
      id: 9,
      name: t.aiTools.videoGenerator,
      description: t.aiTools.videoGeneratorDesc,
      icon: '🎬',
      color: 'bg-red-500',
      category: 'Visual Content'
    },
    {
      id: 10,
      name: 'Məhsul Post Yaradıcı',
      description: 'Məhsul rəsmini yükləyin, AI arxa fonu siləcək, analiz edəcək və reklam postları hazırlayacaq',
      icon: '🛍️',
      color: 'bg-amber-500',
      category: 'Visual Content'
    }
  ];

  const brandVoices = [
    { id: 1, name: 'Professional', description: 'Formal and business-focused' },
    { id: 2, name: 'Casual', description: 'Friendly and conversational' },
    { id: 3, name: 'Creative', description: 'Artistic and innovative' },
    { id: 4, name: 'Technical', description: 'Detailed and informative' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`🚀 Excited to share some insights about ${prompt}! 

Our latest research shows that businesses leveraging AI-powered social media management see 40% better engagement rates. Here's what we've learned:

✨ Consistency is key - regular posting builds audience trust
📊 Data-driven decisions lead to better content performance  
🎯 Personalized content resonates more with your audience

What's your experience with social media automation? Share your thoughts below! 

#SocialMediaMarketing #AI #DigitalMarketing #ContentStrategy`);
      setIsGenerating(false);
    }, 2000);
  };


  const handleGenerateLogo = async () => {
    if (!productName.trim() || !productDescription.trim()) {
      alert(`${t.aiTools.productName} və ${t.aiTools.productDescription} daxil edin`);
      return;
    }

    setIsGeneratingLogo(true);
    setGeneratedLogo(null);
    setGeneratedSlogan(null);
    
    try {
      // Import Wask.co API
      const { waskAIAPI } = await import('@/lib/api');
      
      const requestData = {
        productName,
        productDescription
      };

      console.log('🎯 Generating logo and slogan with data:', {
        productName: requestData.productName,
        productDescription: requestData.productDescription
      });

      // Call API through backend proxy
      const response = await waskAIAPI.generateLogoAndSlogan(requestData);
      
      console.log('📥 Full API response:', response);
      console.log('📥 Response data:', response.data);
      
      // Handle response - backend format: { logo_url, slogan, metadata: { product_name } }
      if (!response.data) {
        throw new Error('Boş response alındı. Backend server ilə əlaqə saxlayın.');
      }
      
      const logoUrl = response.data.logo_url || response.data.logo || null;
      const slogan = response.data.slogan || response.data.slogan_text || null;
      const metadataProductName = response.data.metadata?.product_name || null;
      
      console.log('🔍 Parsed values:', {
        logoUrl: logoUrl ? `✅ Var (${logoUrl.substring(0, 50)}...)` : '❌ Yox',
        slogan: slogan ? `✅ Var: "${slogan}"` : '❌ Yox',
        productName: metadataProductName || productName
      });
      
      // Validate and set logo
      if (!logoUrl) {
        console.error('❌ Logo URL yoxdur! Response:', response.data);
        throw new Error('Logo yaradıla bilmədi. Zəhmət olmasa yenidən cəhd edin.');
      }
      
      // Set generated logo
      setGeneratedLogo(logoUrl);
      
      // Set slogan if available
      if (slogan && slogan.trim() !== '') {
        setGeneratedSlogan(slogan.trim());
        console.log(`✅ Slogan yaradıldı: "${slogan.trim()}"`);
      } else {
        console.warn('⚠️ Slogan yoxdur və ya boşdur. Response:', response.data);
        setGeneratedSlogan(null); // Clear if empty
      }
      
      // Update product name if returned in metadata
      if (metadataProductName && metadataProductName.trim()) {
        setProductName(metadataProductName.trim());
        console.log(`✅ Şirkət adı: "${metadataProductName.trim()}"`);
      }
      
      console.log('✅ Logo uğurla yaradıldı!');
      
    } catch (error: any) {
      console.error('❌ Error generating logo:', error);
      
      // Handle specific error cases
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.error || 
                           error.response?.data?.detail || 
                           error.response?.data?.message ||
                           'Yanlış məlumat göndərildi';
        alert(`❌ Xəta: ${errorMessage}`);
      } else if (error.response?.status === 401) {
        alert('❌ Giriş tələb olunur. Zəhmət olmasa yenidən giriş edin.');
      } else if (error.response?.status === 404) {
        alert('⚠️ Backend endpoint tapılmadı. Backend developer ilə əlaqə saxlayın.');
      } else if (error.response?.status >= 500) {
        alert('❌ Server xətası. Zəhmət olmasa bir az sonra yenidən cəhd edin.');
      } else if (!error.response) {
        // Network error or no response
        alert('❌ Şəbəkə xətası. Backend server-ə qoşula bilinmir.');
      } else {
        const errorMessage = error.response?.data?.error || 
                           error.response?.data?.detail || 
                           error.response?.data?.message ||
                           error.message ||
                           'Logo və slogan yaratmaq mümkün olmadı';
        alert(`❌ ${errorMessage}`);
      }
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  const handleOpenLogoDialog = (toolId: number) => {
    if (toolId === 7) {
      // Navigate to Logo Generator page
      router.push('/ai-tools/logo-generator');
    } else if (toolId === 8) {
      // Navigate to Ad Creative Generator
      router.push('/ai-tools/ad-creator');
    } else if (toolId === 9) {
      // Navigate to Video Generator
      router.push('/ai-tools/video-generator');
    } else if (toolId === 10) {
      // Navigate to Product Post Creator
      router.push('/ai-tools/product-post');
    }
  };

  const handleCloseLogoDialog = () => {
    setLogoDialogOpen(false);
    setProductName('');
    setProductDescription('');
    setGeneratedLogo(null);
    setGeneratedSlogan(null);
  };

  const handleSaveToCompanyProfile = async () => {
    if (!generatedLogo) {
      alert('⚠️ Logo yoxdur. Əvvəlcə logo yaradın.');
      return;
    }

    setIsSavingToProfile(true);
    try {
      // Import authAPI
      const { authAPI } = await import('@/lib/api');

      // Download logo image
      const logoResponse = await fetch(generatedLogo);
      const logoBlob = await logoResponse.blob();
      
      // Create FormData for company profile update
      const formData = new FormData();
      
      // Create File object from blob
      const logoFile = new File(
        [logoBlob],
        `logo_${productName || 'company'}_${Date.now()}.png`,
        { type: 'image/png' }
      );
      formData.append('logo', logoFile);
      
      // Add slogan if available
      if (generatedSlogan && generatedSlogan.trim()) {
        formData.append('slogan', generatedSlogan.trim());
      }

      console.log('💾 Şirkət profilinə əlavə edilir...');
      console.log('📦 FormData contents:', {
        hasLogo: formData.has('logo'),
        hasSlogan: formData.has('slogan'),
        slogan: generatedSlogan
      });
      
      // Update company profile
      const response = await authAPI.updateCompanyProfile(formData);
      
      console.log('✅ Şirkət profili yeniləndi:', response.data);
      alert('✅ Logo və slogan şirkət profilinə uğurla əlavə edildi!');
      
      // Optionally close dialog
      // handleCloseLogoDialog();
      
    } catch (error: any) {
      console.error('❌ Şirkət profilinə əlavə edilərkən xəta:', error);
      console.error('📋 Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      let errorMessage = 'Şirkət profilinə əlavə edilə bilmədi';
      
      if (error.response?.status === 400) {
        const errorData = error.response?.data;
        if (typeof errorData === 'object') {
          // Django validation errors are usually in this format
          const firstError = Object.values(errorData)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
          } else if (typeof firstError === 'string') {
            errorMessage = firstError;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else {
            errorMessage = JSON.stringify(errorData);
          }
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
      } else {
        errorMessage = error.response?.data?.error ||
                      error.response?.data?.detail ||
                      error.response?.data?.message ||
                      error.message ||
                      errorMessage;
      }
      
      alert(`❌ Xəta: ${errorMessage}`);
    } finally {
      setIsSavingToProfile(false);
    }
  };

  return (
    <DashboardLayout 
      title={t.aiTools.title}
      description={t.aiTools.description}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Generator */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2">✨</span>
                {t.aiTools.contentGenerator}
              </CardTitle>
              <CardDescription>
                {t.aiTools.contentGeneratorDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">{t.aiTools.promptPlaceholder}</Label>
                <Input
                  id="prompt"
                  placeholder={t.aiTools.promptPlaceholder}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button 
                  onClick={handleGenerate} 
                  disabled={!prompt.trim() || isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <span className="mr-2">⏳</span>
                      {t.aiTools.generating}
                    </>
                  ) : (
                    <>
                      <span className="mr-2">✨</span>
                      {t.aiTools.generate}
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <span className="mr-2">⚙️</span>
                  Settings
                </Button>
              </div>

              {generatedContent && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Generated Content</Label>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <span className="mr-1">📋</span>
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <span className="mr-1">✏️</span>
                          Edit
                        </Button>
                        <Button size="sm">
                          <span className="mr-1">📝</span>
                          Use as Post
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* AI Tools Grid */}
          <div>
            <h2 className="text-xl font-semibold mb-4">All AI Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${tool.color} flex items-center justify-center text-white text-lg`}>
                          {tool.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{tool.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {tool.description}
                          </CardDescription>
                        </div>
                      </div>
                      {tool.comingSoon && (
                        <Badge variant="secondary" className="text-xs">
                          Soon
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      size="sm"
                      disabled={tool.comingSoon}
                      variant={tool.comingSoon ? "secondary" : "default"}
                      onClick={() => handleOpenLogoDialog(tool.id)}
                    >
                      {tool.comingSoon ? t.aiTools.comingSoon : t.common.start}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Brand Voice Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Voice</CardTitle>
              <CardDescription>
                Choose your AI writing style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {brandVoices.map((voice) => (
                  <div key={voice.id} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={`voice-${voice.id}`}
                      name="brandVoice"
                      defaultChecked={voice.id === 1}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={`voice-${voice.id}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {voice.name}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {voice.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <span className="mr-2">➕</span>
                Create Custom Voice
              </Button>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle>AI Usage This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Content Generated</span>
                <span className="font-medium">47 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hashtags Created</span>
                <span className="font-medium">156 tags</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Images Optimized</span>
                <span className="font-medium">23 images</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Credits Used</span>
                <span className="font-medium">1,247 / 5,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 AI Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Be Specific</h4>
                  <p className="text-muted-foreground">
                    The more specific your prompt, the better the AI output.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Include Context</h4>
                  <p className="text-muted-foreground">
                    Mention your industry, target audience, and goals.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Iterate</h4>
                  <p className="text-muted-foreground">
                    Generate multiple versions and pick the best one.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logo & Slogan Generator Dialog */}
      <Dialog open={logoDialogOpen} onOpenChange={setLogoDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              {t.aiTools.logoSloganGenerator}
            </DialogTitle>
            <DialogDescription>
              {t.aiTools.logoSloganGeneratorDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">{t.aiTools.productName} *</Label>
              <Input
                id="productName"
                placeholder={t.aiTools.productName}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDescription">{t.aiTools.productDescription} *</Label>
              <Textarea
                id="productDescription"
                placeholder={t.aiTools.productDescription}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                {t.aiTools.productDescription}
              </p>
            </div>
          </div>

          {generatedLogo && (
            <div className="space-y-4 mt-4 p-4 bg-muted rounded-lg">
              <div className="space-y-2">
                <Label>Yaradılmış Logo</Label>
                <div className="flex items-center justify-center p-6 bg-white dark:bg-white-900 rounded-lg border-2 border-border shadow-sm min-h-[200px]">
                  <img 
                    src={generatedLogo} 
                    alt="Generated Logo"
                    className="max-w-full max-h-64 object-contain"
                    onError={(e) => {
                      console.error('❌ Logo image failed to load:', generatedLogo);
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const container = target.parentElement;
                      if (container) {
                        container.innerHTML = `
                          <div class="w-full h-full flex flex-col items-center justify-center text-red-500 gap-2 p-4">
                            <span class="text-2xl">⚠️</span>
                            <span class="text-sm text-center">Logo yüklənə bilmədi</span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
              
              {generatedSlogan && generatedSlogan.trim() && (
                <div className="space-y-2">
                  <Label>Yaradılmış Slogan</Label>
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg border-2 border-primary/20">
                    <p className="text-xl font-bold text-center text-foreground">{generatedSlogan}</p>
                  </div>
                </div>
              )}
              
              {!generatedSlogan && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ Slogan yaradılmadı. Logo yaradıldı amma slogan üçün yenidən cəhd edin.
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleSaveToCompanyProfile}
                  disabled={isSavingToProfile || !generatedLogo}
                >
                  {isSavingToProfile ? (
                    <>
                      <span className="mr-2">⏳</span>
                      {t.aiTools.saving}
                    </>
                  ) : (
                    <>
                      <span className="mr-2">✅</span>
                      {t.aiTools.saveToProfile}
                    </>
                  )}
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={async () => {
                      if (generatedLogo) {
                        try {
                          const response = await fetch(generatedLogo);
                          const blob = await response.blob();
                          const url = window.URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = `logo_${productName || 'generated'}_${Date.now()}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(url);
                        } catch (err) {
                          console.error('Failed to download logo:', err);
                          alert('Logo yüklənə bilmədi');
                        }
                      }
                    }}
                  >
                    <span className="mr-2">💾</span>
                    Download Logo
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={async () => {
                      if (generatedSlogan) {
                        try {
                          await navigator.clipboard.writeText(generatedSlogan);
                          alert('✅ Slogan kopyalandı!');
                        } catch (err) {
                          console.error('Failed to copy slogan:', err);
                          alert('Slogan kopyalanmadı');
                        }
                      }
                    }}
                  >
                    <span className="mr-2">📋</span>
                    Copy Slogan
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseLogoDialog}>
              Cancel
            </Button>
            <Button 
              onClick={handleGenerateLogo}
              disabled={
                isGeneratingLogo || 
                !productName.trim() || 
                !productDescription.trim()
              }
            >
              {isGeneratingLogo ? (
                <>
                  <span className="mr-2">⏳</span>
                  Logo və Slogan Yaradılır...
                </>
              ) : (
                <>
                  <span className="mr-2">🎯</span>
                  Logo və Slogan Yarat
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}








