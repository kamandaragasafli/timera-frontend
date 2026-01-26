'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { authAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function BrandingPreviewPage() {
  const { user } = useAuth();
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Branding settings
  const [logoPosition, setLogoPosition] = useState<'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right'>('top-center');
  const [sloganPosition, setSloganPosition] = useState<'top-center' | 'bottom-center'>('bottom-center');
  const [logoSize, setLogoSize] = useState(13);
  const [sloganSize, setSloganSize] = useState(4);
  const [gradientEnabled, setGradientEnabled] = useState(true);
  const [gradientColor, setGradientColor] = useState('#3B82F6');
  const [gradientHeight, setGradientHeight] = useState(25);
  const [gradientPosition, setGradientPosition] = useState<'top' | 'bottom' | 'both'>('both');
  
  // Content
  const [companyName, setCompanyName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load company profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await authAPI.getCompanyProfile();
        const profile = response.data;
        
        setCompanyName(profile.company_name || '');
        setSlogan(profile.slogan || '');
        setLogoUrl(profile.logo_url || '');
        setLogoPosition(profile.logo_position || 'top-center');
        setSloganPosition(profile.slogan_position || 'bottom-center');
        setLogoSize(profile.logo_size_percent || 13);
        setSloganSize(profile.slogan_size_percent || 4);
        setGradientEnabled(profile.gradient_enabled ?? true);
        setGradientColor(profile.gradient_color || '#3B82F6');
        setGradientHeight(profile.gradient_height_percent || 25);
        setGradientPosition(profile.gradient_position || 'both');
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    
    loadProfile();
  }, []);

  // Draw preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (portrait format)
    canvas.width = 1080;
    canvas.height = 1440;

    // Draw base background (gradient or solid color)
    const drawBackground = () => {
      // Create a nice gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#667eea');
      bgGradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Use Picsum Photos for real image (Unsplash Source is deprecated)
      const baseImage = new Image();
      baseImage.crossOrigin = 'anonymous';
      // Picsum Photos - free, reliable random images
      const imageId = Math.floor(Math.random() * 1000) + 1;
      baseImage.src = `https://picsum.photos/seed/${imageId}/1080/1440`;
      
      baseImage.onload = () => {
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        drawOverlays();
      };
      
      baseImage.onerror = () => {
        // If Picsum fails, keep the gradient background
        drawOverlays();
      };
    };
    
    const drawOverlays = () => {
      // Draw gradients
      if (gradientEnabled) {
        const gradientHeightPx = canvas.height * (gradientHeight / 100);
        
        // Convert hex to RGB
        const r = parseInt(gradientColor.slice(1, 3), 16);
        const g = parseInt(gradientColor.slice(3, 5), 16);
        const b = parseInt(gradientColor.slice(5, 7), 16);
        
        // Top gradient
        if (gradientPosition === 'top' || gradientPosition === 'both') {
          const topGradient = ctx.createLinearGradient(0, 0, 0, gradientHeightPx);
          topGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.86)`);
          topGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = topGradient;
          ctx.fillRect(0, 0, canvas.width, gradientHeightPx);
        }
        
        // Bottom gradient
        if (gradientPosition === 'bottom' || gradientPosition === 'both') {
          const bottomY = canvas.height - gradientHeightPx;
          const bottomGradient = ctx.createLinearGradient(0, bottomY, 0, canvas.height);
          bottomGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
          bottomGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.86)`);
          ctx.fillStyle = bottomGradient;
          ctx.fillRect(0, bottomY, canvas.width, gradientHeightPx);
        }
      }
      
      // Draw logo
      if (logoUrl) {
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        logo.src = logoUrl;
        
        logo.onload = () => {
          const logoHeightPx = canvas.height * (logoSize / 100);
          const logoWidthPx = (logo.width / logo.height) * logoHeightPx;
          const padding = 40;
          
          let logoX, logoY;
          switch (logoPosition) {
            case 'top-left':
              logoX = padding;
              logoY = padding;
              break;
            case 'top-center':
              logoX = (canvas.width - logoWidthPx) / 2;
              logoY = padding;
              break;
            case 'top-right':
              logoX = canvas.width - logoWidthPx - padding;
              logoY = padding;
              break;
            case 'bottom-left':
              logoX = padding;
              logoY = canvas.height - logoHeightPx - padding;
              break;
            case 'bottom-center':
              logoX = (canvas.width - logoWidthPx) / 2;
              logoY = canvas.height - logoHeightPx - padding;
              break;
            case 'bottom-right':
              logoX = canvas.width - logoWidthPx - padding;
              logoY = canvas.height - logoHeightPx - padding;
              break;
            default:
              logoX = (canvas.width - logoWidthPx) / 2;
              logoY = padding;
          }
          
          ctx.drawImage(logo, logoX, logoY, logoWidthPx, logoHeightPx);
          
          // Company name removed - not shown on posts
        };
      }
      
      // Draw slogan
      if (slogan) {
        ctx.fillStyle = 'white';
        ctx.font = `${canvas.height * (sloganSize / 100)}px Arial`;
        ctx.textAlign = 'center';
        
        const gradientHeightPx = canvas.height * (gradientHeight / 100);
        
        if (sloganPosition === 'top-center') {
          ctx.fillText(slogan, canvas.width / 2, gradientHeightPx / 2);
        } else {
          ctx.fillText(slogan, canvas.width / 2, canvas.height - gradientHeightPx / 2);
        }
      }
    };
    
    // Start drawing
    drawBackground();
  }, [logoPosition, sloganPosition, logoSize, sloganSize, gradientEnabled, gradientColor, gradientHeight, gradientPosition, companyName, slogan, logoUrl]);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await authAPI.updateCompanyProfile({
        slogan: slogan || '', // Ensure slogan is saved even if empty string
        logo_position: logoPosition,
        slogan_position: sloganPosition,
        logo_size_percent: logoSize,
        slogan_size_percent: sloganSize,
        gradient_enabled: gradientEnabled,
        gradient_color: gradientColor,
        gradient_height_percent: gradientHeight,
        gradient_position: gradientPosition,
      });
      
      // Reload profile to get updated data
      const response = await authAPI.getCompanyProfile();
      const profile = response.data;
      setSlogan(profile.slogan || '');
      
      alert('✅ Parametrlər saxlanıldı!');
    } catch (error) {
      console.error('Failed to save:', error);
      alert('❌ Xəta baş verdi!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout
      title="Branding Tənzimləmələri"
      description="Logo və gradient tənzimləmələri - Real-time preview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Settings */}
        <div className="space-y-6">
          {/* Logo Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Logo Tənzimləmələri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">Logo Mövqeyi</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'top-left', label: 'Üst Sol', icon: '↖️' },
                    { value: 'top-center', label: 'Üst Orta', icon: '⬆️' },
                    { value: 'top-right', label: 'Üst Sağ', icon: '↗️' },
                    { value: 'bottom-left', label: 'Alt Sol', icon: '↙️' },
                    { value: 'bottom-center', label: 'Alt Orta', icon: '⬇️' },
                    { value: 'bottom-right', label: 'Alt Sağ', icon: '↘️' },
                  ].map((pos) => (
                    <button
                      key={pos.value}
                      onClick={() => setLogoPosition(pos.value as any)}
                      className={`p-2 border-2 rounded-lg ${
                        logoPosition === pos.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{pos.icon}</div>
                        <div className="text-xs">{pos.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Logo Ölçüsü</Label>
                  <span className="text-sm font-semibold text-primary">{logoSize}%</span>
                </div>
                <Slider
                  value={[logoSize]}
                  onValueChange={(value) => setLogoSize(value[0])}
                  min={2}
                  max={25}
                  step={1}
                />
              </div>
            </CardContent>
          </Card>

          {/* Slogan Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Slogan Tənzimləmələri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">Slogan Mövqeyi</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSloganPosition('top-center')}
                    className={`p-4 border-2 rounded-lg ${
                      sloganPosition === 'top-center'
                        ? 'border-primary bg-primary/10'
                        : 'border-border'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">⬆️</div>
                      <div className="text-sm">Üstdə Ortada</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSloganPosition('bottom-center')}
                    className={`p-4 border-2 rounded-lg ${
                      sloganPosition === 'bottom-center'
                        ? 'border-primary bg-primary/10'
                        : 'border-border'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">⬇️</div>
                      <div className="text-sm">Altda Ortada</div>
                    </div>
                  </button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Slogan Ölçüsü</Label>
                  <span className="text-sm font-semibold text-primary">{sloganSize}%</span>
                </div>
                <Slider
                  value={[sloganSize]}
                  onValueChange={(value) => setSloganSize(value[0])}
                  min={2}
                  max={8}
                  step={0.5}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <span>Kiçik (2%)</span>
                  <span>Orta (4%)</span>
                  <span>Böyük (8%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gradient Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Gradient Tənzimləmələri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Gradient Aktivdir</Label>
                <input
                  type="checkbox"
                  checked={gradientEnabled}
                  onChange={(e) => setGradientEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              
              {gradientEnabled && (
                <>
                  <div>
                    <Label>Gradient Rəngi</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="color"
                        value={gradientColor}
                        onChange={(e) => setGradientColor(e.target.value)}
                        className="w-20 h-10"
                      />
                      <Input
                        type="text"
                        value={gradientColor}
                        onChange={(e) => setGradientColor(e.target.value)}
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Gradient Hündürlüyü</Label>
                      <span className="text-sm font-semibold text-primary">{gradientHeight}%</span>
                    </div>
                    <Slider
                      value={[gradientHeight]}
                      onValueChange={(value) => setGradientHeight(value[0])}
                      min={10}
                      max={50}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <Label>Gradient Mövqeyi</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <button
                        onClick={() => setGradientPosition('top')}
                        className={`p-3 border-2 rounded-lg text-sm ${
                          gradientPosition === 'top'
                            ? 'border-primary bg-primary/10'
                            : 'border-border'
                        }`}
                      >
                        Yuxarıda
                      </button>
                      <button
                        onClick={() => setGradientPosition('bottom')}
                        className={`p-3 border-2 rounded-lg text-sm ${
                          gradientPosition === 'bottom'
                            ? 'border-primary bg-primary/10'
                            : 'border-border'
                        }`}
                      >
                        Aşağıda
                      </button>
                      <button
                        onClick={() => setGradientPosition('both')}
                        className={`p-3 border-2 rounded-lg text-sm ${
                          gradientPosition === 'both'
                            ? 'border-primary bg-primary/10'
                            : 'border-border'
                        }`}
                      >
                        Hər İkisi
                      </button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Button 
            onClick={handleSaveSettings} 
            disabled={saving}
            className="w-full"
          >
            {saving ? 'Saxlanılır...' : 'Parametrləri Saxla'}
          </Button>
        </div>

        {/* Right: Preview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Canlı Önizləmə</CardTitle>
              <CardDescription>
                Real-time preview - Dəyişikliklər dərhal görünür
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto"
                  style={{ maxHeight: '80vh' }}
                />
              </div>
              
              <div className="mt-4">
                <Input
                  placeholder="Slogan"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Sloganı dəyişdirib "Parametrləri Saxla" düyməsinə basın
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

