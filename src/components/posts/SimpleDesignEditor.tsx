'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, X, Download } from 'lucide-react';

interface SimpleDesignEditorProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onSave: (designDataURL: string) => void;
}

export default function SimpleDesignEditor({
  isOpen,
  onClose,
  post,
  onSave,
}: SimpleDesignEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Editable design properties
  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content?.substring(0, 200) || '');
  const [backgroundColor, setBackgroundColor] = useState(post.design_specs?.primary_color || '#6366f1');
  const [titleColor, setTitleColor] = useState('#FFFFFF');
  const [contentColor, setContentColor] = useState('#FFFFFF');
  const [overlayOpacity, setOverlayOpacity] = useState(post.design_specs?.overlay_opacity || 0.3);

  // Generate design on canvas
  const generateDesign = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1080;
    canvas.height = 1080;

    try {
      // 1. Background image
      const backgroundImage = post.design_thumbnail_absolute || post.design_thumbnail;
      if (backgroundImage) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = backgroundImage;
        });

        ctx.drawImage(img, 0, 0, 1080, 1080);
      } else {
        // Fallback to solid color
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, 1080, 1080);
      }

      // 2. Overlay
      ctx.fillStyle = `rgba(0, 0, 0, ${overlayOpacity})`;
      ctx.fillRect(0, 0, 1080, 1080);

      // 3. Accent shape
      const accentColor = post.design_specs?.accent_color || '#fbbf24';
      ctx.fillStyle = accentColor;
      ctx.fillRect(50, 380, 120, 8);

      // 4. Title text
      ctx.fillStyle = titleColor;
      ctx.font = 'bold 72px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Word wrap for title
      const titleWords = title.split(' ');
      let titleLine = '';
      let titleY = 400;
      
      for (const word of titleWords) {
        const testLine = titleLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > 980 && titleLine !== '') {
          ctx.fillText(titleLine.trim(), 540, titleY);
          titleLine = word + ' ';
          titleY += 80;
        } else {
          titleLine = testLine;
        }
      }
      ctx.fillText(titleLine.trim(), 540, titleY);

      // 5. Content text
      ctx.fillStyle = contentColor;
      ctx.font = '36px Arial';
      
      // Word wrap for content
      const contentWords = content.split(' ');
      let contentLine = '';
      let contentY = titleY + 120;
      let lineCount = 0;
      const maxLines = 5;
      
      for (const word of contentWords) {
        if (lineCount >= maxLines) break;
        
        const testLine = contentLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > 980 && contentLine !== '') {
          ctx.fillText(contentLine.trim(), 540, contentY);
          contentLine = word + ' ';
          contentY += 45;
          lineCount++;
        } else {
          contentLine = testLine;
        }
      }
      
      if (lineCount < maxLines) {
        ctx.fillText(contentLine.trim(), 540, contentY);
      }

    } catch (error) {
      console.error('Failed to generate design:', error);
      // Draw fallback design
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, 1080, 1080);
      
      ctx.fillStyle = titleColor;
      ctx.font = 'bold 72px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(title, 540, 400);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate design when component opens or properties change
  useEffect(() => {
    if (isOpen) {
      generateDesign();
    }
  }, [isOpen, title, content, backgroundColor, titleColor, contentColor, overlayOpacity]);

  const handleSave = async () => {
    if (!canvasRef.current) return;

    setIsSaving(true);
    try {
      const dataURL = canvasRef.current.toDataURL('image/png', 1.0);
      await onSave(dataURL);
    } catch (error) {
      console.error('Failed to save design:', error);
      alert('❌ Dizayn saxlanıla bilmədi');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `design_${post.id}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-[99vw] h-[98vh] p-0 overflow-hidden">
        <DialogHeader className="p-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Dizaynı Redaktə Et</DialogTitle>
              <DialogDescription>
                Şəkil üzərindəki mətn və rəngləri dəyişdirin
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                disabled={isGenerating}
              >
                <Download className="w-4 h-4 mr-2" />
                Yüklə
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || isGenerating}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saxlanılır...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Saxla
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={onClose} size="sm" disabled={isSaving}>
                <X className="w-4 h-4 mr-2" />
                Bağla
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex h-[calc(98vh-70px)]">
          {/* Left Panel - Controls */}
          <div className="w-[400px] border-r p-4 overflow-y-auto flex-shrink-0">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Başlıq</Label>
                <Textarea
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="content">Məzmun</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="backgroundColor">Arxa Fon Rəngi</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="titleColor">Başlıq Rəngi</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="titleColor"
                    type="color"
                    value={titleColor}
                    onChange={(e) => setTitleColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={titleColor}
                    onChange={(e) => setTitleColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contentColor">Məzmun Rəngi</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="contentColor"
                    type="color"
                    value={contentColor}
                    onChange={(e) => setContentColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={contentColor}
                    onChange={(e) => setContentColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="overlayOpacity">Overlay Şəffaflıq: {Math.round(overlayOpacity * 100)}%</Label>
                <Input
                  id="overlayOpacity"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                  className="mt-1"
                />
              </div>

              <Button
                onClick={generateDesign}
                disabled={isGenerating}
                className="w-full"
                variant="outline"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Yenidən Yaradılır...
                  </>
                ) : (
                  '🔄 Yenilə'
                )}
              </Button>
            </div>
          </div>

          {/* Right Panel - Canvas Preview */}
          <div className="flex-1 p-6 bg-gray-100 flex flex-col items-center justify-center overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg relative" style={{ width: 'fit-content', maxWidth: '100%' }}>
              <canvas
                ref={canvasRef}
                className="block"
                style={{ 
                  width: 'auto',
                  height: 'auto',
                  maxWidth: 'calc(99vw - 450px)',
                  maxHeight: 'calc(98vh - 150px)'
                }}
              />
              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin inline text-blue-600" />
                    <div className="mt-2 text-sm text-gray-600">Dizayn yaradılır...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

