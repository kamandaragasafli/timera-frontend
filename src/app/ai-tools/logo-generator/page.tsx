'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { waskAIAPI, authAPI } from '@/lib/api';
import { Loader2, Download, Copy, CheckCircle2, Sparkles, ArrowLeft, Palette } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function LogoGeneratorPage() {
  const router = useRouter();
  const t = useTranslation();

  const LOGO_STYLES = [
    { value: 'minimalist', label: t.logoGenerator.styleMinimalist, icon: '○', description: t.logoGenerator.styleMinimalistDesc },
    { value: 'elegant', label: t.logoGenerator.styleElegant, icon: '◇', description: t.logoGenerator.styleElegantDesc },
    { value: 'modern', label: t.logoGenerator.styleModern, icon: '▢', description: t.logoGenerator.styleModernDesc },
    { value: 'professional', label: t.logoGenerator.styleProfessional, icon: '◼', description: t.logoGenerator.styleProfessionalDesc },
    { value: 'playful', label: t.logoGenerator.stylePlayful, icon: '◆', description: t.logoGenerator.stylePlayfulDesc },
  ];

  const COLOR_OPTIONS = [
    { value: '#3B82F6', label: t.logoGenerator.colorBlue, hex: '#3B82F6' },
    { value: '#8B5CF6', label: t.logoGenerator.colorPurple, hex: '#8B5CF6' },
    { value: '#EF4444', label: t.logoGenerator.colorRed, hex: '#EF4444' },
    { value: '#10B981', label: t.logoGenerator.colorGreen, hex: '#10B981' },
    { value: '#F59E0B', label: t.logoGenerator.colorOrange, hex: '#F59E0B' },
    { value: '#6366F1', label: t.logoGenerator.colorIndigo, hex: '#6366F1' },
    { value: '#000000', label: t.logoGenerator.colorBlack, hex: '#000000' },
    { value: '#FFFFFF', label: t.logoGenerator.colorWhite, hex: '#FFFFFF', border: true },
  ];

  const TAG_OPTIONS = [
    t.logoGenerator.tagTech, t.logoGenerator.tagFinance, t.logoGenerator.tagHealth, t.logoGenerator.tagEducation, t.logoGenerator.tagEcommerce,
    t.logoGenerator.tagService, t.logoGenerator.tagManufacturing, t.logoGenerator.tagRealEstate, t.logoGenerator.tagMarketing, t.logoGenerator.tagDesign,
    t.logoGenerator.tagKitchen, t.logoGenerator.tagFashion, t.logoGenerator.tagSports, t.logoGenerator.tagTravel, t.logoGenerator.tagArt
  ];
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('minimalist');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [generatedSlogan, setGeneratedSlogan] = useState<string | null>(null);
  const [isSavingToProfile, setIsSavingToProfile] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleGenerate = async () => {
    if (!productName.trim() || !productDescription.trim()) {
      alert(t.logoGenerator.errorCompanyNameRequired);
      return;
    }

    setIsGenerating(true);
    setGeneratedLogo(null);
    setGeneratedSlogan(null);
    
    try {
      const requestData = {
        productName,
        productDescription,
        style: selectedStyle,
        color: selectedColor,
        tags: selectedTags
      };

      console.log('🎯 Generating logo with options:', requestData);

      const response = await waskAIAPI.generateLogoAndSlogan(requestData);
      
      console.log('📥 Response:', response.data);
      
      if (!response.data) {
        throw new Error(t.logoGenerator.errorEmptyResponse);
      }
      
      const logoUrl = response.data.logo_url || response.data.logo || null;
      const slogan = response.data.slogan || null;
      
      if (!logoUrl) {
        throw new Error(t.logoGenerator.errorLogoCreationFailed);
      }
      
      setGeneratedLogo(logoUrl);
      if (slogan) {
        setGeneratedSlogan(slogan.trim());
      }
      
      console.log('✅', t.logoGenerator.successCreated);
      
    } catch (error: any) {
      console.error('❌ Error:', error);
      alert(`❌ ${t.logoGenerator.errorTitle}: ${error.response?.data?.error || error.message || t.logoGenerator.errorLogoCreationFailed}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToCompanyProfile = async () => {
    if (!generatedLogo) {
      alert(t.logoGenerator.errorNoLogo);
      return;
    }

    setIsSavingToProfile(true);
    try {
      console.log('📥', t.logoGenerator.saving, ':', generatedLogo);
      
      // Download logo image
      const logoResponse = await fetch(generatedLogo);
      if (!logoResponse.ok) {
        throw new Error(`${t.logoGenerator.errorLogoLoadFailed}: ${logoResponse.statusText}`);
      }
      
      const logoBlob = await logoResponse.blob();
      console.log('✅ Blob yaradıldı:', {
        size: logoBlob.size,
        type: logoBlob.type
      });
      
      // Ensure blob is image/png
      const imageBlob = logoBlob.type.startsWith('image/') 
        ? logoBlob 
        : new Blob([logoBlob], { type: 'image/png' });
      
      // Create FormData
      const formData = new FormData();
      
      // Create File object from blob
      const logoFile = new File(
        [imageBlob],
        `logo_${productName || 'company'}_${Date.now()}.png`,
        { 
          type: 'image/png',
          lastModified: Date.now()
        }
      );
      
      console.log('📦 File object yaradıldı:', {
        name: logoFile.name,
        size: logoFile.size,
        type: logoFile.type
      });
      
      formData.append('logo', logoFile);
      
      if (generatedSlogan && generatedSlogan.trim()) {
        formData.append('slogan', generatedSlogan.trim());
      }
      
      console.log('📤 FormData göndərilir...');
      console.log('   Has logo:', formData.has('logo'));
      console.log('   Has slogan:', formData.has('slogan'));

      await authAPI.updateCompanyProfile(formData);
      alert(t.logoGenerator.successSaved);
      
    } catch (error: any) {
      console.error('❌ Error:', error);
      console.error('❌ Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      const errorMessage = error.response?.data?.error ||
                          error.response?.data?.detail ||
                          (typeof error.response?.data === 'object' 
                            ? JSON.stringify(error.response?.data)
                            : error.response?.data) ||
                          error.message ||
                          t.logoGenerator.errorSaveFailed;
      
      alert(`❌ ${t.logoGenerator.errorTitle}: ${errorMessage}`);
    } finally {
      setIsSavingToProfile(false);
    }
  };

  return (
    <DashboardLayout 
      title={t.logoGenerator.title}
      description={t.logoGenerator.description}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/ai-tools">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.logoGenerator.back}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t.logoGenerator.basicInfo}</CardTitle>
                <CardDescription>
                  {t.logoGenerator.basicInfoDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">{t.logoGenerator.companyName}</Label>
                  <Input
                    id="productName"
                    placeholder={t.logoGenerator.companyNamePlaceholder}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productDescription">{t.logoGenerator.descriptionLabel}</Label>
                  <Textarea
                    id="productDescription"
                    placeholder={t.logoGenerator.descriptionPlaceholder}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t.logoGenerator.descriptionHint}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Logo Style */}
            <Card>
              <CardHeader>
                <CardTitle>{t.logoGenerator.logoStyle}</CardTitle>
                <CardDescription>
                  {t.logoGenerator.logoStyleDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {LOGO_STYLES.map((style) => (
                    <button
                      key={style.value}
                      onClick={() => setSelectedStyle(style.value)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedStyle === style.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{style.icon}</div>
                      <div className="font-semibold">{style.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {style.description}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  {t.logoGenerator.colorSelection}
                </CardTitle>
                <CardDescription>
                  {t.logoGenerator.colorSelectionDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`relative w-full aspect-square rounded-lg transition-all ${
                        selectedColor === color.value
                          ? 'ring-2 ring-primary ring-offset-2 scale-110'
                          : 'hover:scale-105'
                      } ${color.border ? 'border-2 border-gray-300' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.label}
                    >
                      {selectedColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-white drop-shadow-lg" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {t.logoGenerator.selectedColor} <span className="font-semibold" style={{ color: selectedColor }}>
                    {COLOR_OPTIONS.find(c => c.value === selectedColor)?.label}
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>{t.logoGenerator.categories}</CardTitle>
                <CardDescription>
                  {t.logoGenerator.categoriesDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {TAG_OPTIONS.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer px-3 py-1 text-sm"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && (
                        <span className="ml-1">✓</span>
                      )}
                    </Badge>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-3">
                    {selectedTags.length} {t.logoGenerator.categoriesSelected}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !productName.trim() || !productDescription.trim()}
              className="w-full h-12 text-lg"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t.logoGenerator.generatingButton}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t.logoGenerator.generateButton}
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {generatedLogo ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>{t.logoGenerator.createdLogo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center p-6 bg-white rounded-lg border-2 border-border shadow-sm min-h-[200px]">
                      <img 
                        src={generatedLogo} 
                        alt={t.logoGenerator.generatedLogoAlt}
                        className="max-w-full max-h-64 object-contain"
                        onError={(e) => {
                          console.error('❌ Logo failed to load');
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                {generatedSlogan && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.logoGenerator.createdSlogan}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg border-2 border-primary/20">
                        <p className="text-xl font-bold text-center text-foreground">
                          {generatedSlogan}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-3">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleSaveToCompanyProfile}
                    disabled={isSavingToProfile}
                  >
                    {isSavingToProfile ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.logoGenerator.saving}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {t.logoGenerator.saveToProfile}
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
                            console.error('Failed to download:', err);
                            alert(t.logoGenerator.logoDownloadFailed);
                          }
                        }
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t.logoGenerator.downloadLogo}
                    </Button>
                    {generatedSlogan && (
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(generatedSlogan);
                            alert(t.logoGenerator.sloganCopied);
                          } catch (err) {
                            console.error('Failed to copy:', err);
                            alert(t.logoGenerator.sloganCopyFailed);
                          }
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {t.logoGenerator.copySlogan}
                      </Button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">{t.logoGenerator.emptyState}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

