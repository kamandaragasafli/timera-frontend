'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, Save, X, Type, Image as ImageIcon, Square, Circle, Download, Trash2, ZoomIn, ZoomOut, RotateCw, Copy } from 'lucide-react';
import { 
  Canvas,
  IText,
  Rect,
  Circle as FabricCircle,
  FabricImage,
  FabricObject,
  FabricText,
} from 'fabric';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FabricDesignEditorProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onSave: (designDataURL: string) => void;
  fullPage?: boolean; // If true, render as full page instead of modal
}

export default function FabricDesignEditor({
  isOpen,
  onClose,
  post,
  onSave,
  fullPage = false,
}: FabricDesignEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
  
  // Text properties
  const [textContent, setTextContent] = useState('');
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  
  // Shape properties
  const [fillColor, setFillColor] = useState('#3B82F6');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  
  // Image filters
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  useEffect(() => {
    // If dialog is closed (and not fullPage), dispose canvas
    if (!isOpen && !fullPage) {
      if (fabricCanvasRef.current) {
        try {
          const objects = fabricCanvasRef.current.getObjects();
          objects.forEach(obj => {
            try {
              fabricCanvasRef.current?.remove(obj);
            } catch (e) {
              // Ignore
            }
          });
          fabricCanvasRef.current.clear();
          fabricCanvasRef.current.dispose();
        } catch (error) {
          console.warn('Error disposing canvas when dialog closed:', error);
        } finally {
          fabricCanvasRef.current = null;
        }
      }
      return;
    }

    // For fullPage mode, always initialize if post exists
    if (!post) {
      return;
    }

    const initCanvas = async () => {
      console.log('🎨 initCanvas called');
      console.log('🔍 canvasRef.current:', canvasRef.current);
      console.log('🔍 isOpen:', isOpen);
      console.log('🔍 fullPage:', fullPage);
      console.log('🔍 post:', post);

      // Wait for canvas element to be available
      let retries = 0;
      while (!canvasRef.current && retries < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
      }

      if (!canvasRef.current) {
        console.error('❌ Canvas element not found after retries');
        console.error('🔍 DOM state:', {
          hasCanvasRef: !!canvasRef,
          documentReady: document.readyState,
        });
        // Don't show alert in fullPage mode, just log
        if (!fullPage) {
          alert('❌ Canvas element tapılmadı! DOM hazır deyil.');
        }
        return;
      }

      console.log('✅ Canvas element found!');
      console.log('🔍 canvasRef.current dimensions:', canvasRef.current?.width, 'x', canvasRef.current?.height);

      try {
        console.log('🧹 Disposing existing canvas if any...');
        if (fabricCanvasRef.current) {
          try {
            fabricCanvasRef.current.dispose();
          } catch (error) {
            console.warn('⚠️ Error disposing canvas:', error);
          }
          fabricCanvasRef.current = null;
        }

        console.log('🎨 Creating Fabric.js canvas...');
        const canvas = new Canvas(canvasRef.current, {
          width: 1080,
          height: 1080,
          backgroundColor: '#ffffff',
        });
        
        console.log('✅ Canvas created successfully');
        fabricCanvasRef.current = canvas;
        
        // Force initial render
        canvas.renderAll();
        console.log('🖼️ Canvas rendered');
        
        // Ensure canvas is visible
        if (canvasRef.current) {
          canvasRef.current.style.display = 'block';
          canvasRef.current.style.visibility = 'visible';
          console.log('👁️ Canvas visibility set to visible');
        }

        // Load post image if exists
        console.log('🔍 Post object:', post);
        console.log('🔍 Post image URLs:', {
          custom_image_url: post?.custom_image_url,
          design_url_absolute: post?.design_url_absolute,
          design_thumbnail_absolute: post?.design_thumbnail_absolute,
          design_thumbnail: post?.design_thumbnail,
          image_url: post?.image_url,
          image: post?.image,
        });
        
        // Try all possible image URL fields
        const imageUrl = post?.custom_image_url 
          || post?.design_url_absolute 
          || post?.design_thumbnail_absolute 
          || post?.design_thumbnail
          || post?.image_url
          || post?.image;
        
        if (imageUrl) {
          console.log('📥 Loading image from URL:', imageUrl);
          
          // Add timeout for image loading
          const imageLoadTimeout = setTimeout(() => {
            console.warn('⚠️ Image loading timeout');
            alert('⚠️ Şəkil yüklənməsi çox uzun çəkdi. Zəhmət olmasa yenidən cəhd edin.');
          }, 10000);
          
          FabricImage.fromURL(imageUrl, {
            crossOrigin: 'anonymous'
          }).then((img) => {
            clearTimeout(imageLoadTimeout);
            console.log('✅ Image loaded successfully!');
            console.log('📐 Image dimensions:', img.width, 'x', img.height);
            
            // Scale image to fit canvas while maintaining aspect ratio
            const canvasWidth = 1080;
            const canvasHeight = 1080;
            
            // Calculate scale to fit canvas
            const scaleX = canvasWidth / img.width!;
            const scaleY = canvasHeight / img.height!;
            const scale = Math.min(scaleX, scaleY);
            
            console.log('📏 Scale factor:', scale);
            console.log('📐 Original image size:', img.width, 'x', img.height);
            
            // Set scale
            img.set({
              scaleX: scale,
              scaleY: scale,
            });
            
            // Calculate centered position
            const scaledWidth = img.width! * scale;
            const scaledHeight = img.height! * scale;
            const left = (canvasWidth - scaledWidth) / 2;
            const top = (canvasHeight - scaledHeight) / 2;
            
            console.log('📏 Scaled size:', scaledWidth, 'x', scaledHeight);
            console.log('📍 Calculated position:', { left, top });
            
            img.set({
              left: left,
              top: top,
              selectable: true,
              lockMovementX: false,
              lockMovementY: false,
            });
            
            console.log('📍 Image position:', { left: img.left, top: img.top });
            
            canvas.add(img);
            // Bring image to front so it's visible
            canvas.bringObjectToFront(img);
            
            // Force render multiple times to ensure visibility
            canvas.renderAll();
            setTimeout(() => {
              canvas.renderAll();
              console.log('🔄 Canvas re-rendered after image load');
            }, 100);
            
            console.log('✅ Image added to canvas at front');
            console.log('🎨 Canvas objects count:', canvas.getObjects().length);
            console.log('🎨 Canvas objects:', canvas.getObjects().map(obj => ({
              type: obj.type,
              left: obj.left,
              top: obj.top,
              width: obj.width,
              height: obj.height,
            })));
          }).catch((imgError) => {
            clearTimeout(imageLoadTimeout);
            console.error('❌ Failed to load image:', imgError);
            console.error('❌ Image URL was:', imageUrl);
            alert(`⚠️ Şəkil yüklənə bilmədi: ${imgError instanceof Error ? imgError.message : 'Naməlum xəta'}\n\nURL: ${imageUrl}`);
          });
        } else {
          console.warn('⚠️ No image URL found in post object');
          console.log('📋 Available post fields:', Object.keys(post || {}));
        }

        // Selection events
        canvas.on('selection:created', (e) => {
          setSelectedObject(e.selected?.[0] || null);
        });
        
        canvas.on('selection:updated', (e) => {
          setSelectedObject(e.selected?.[0] || null);
        });
        
        canvas.on('selection:cleared', () => {
          setSelectedObject(null);
        });

        console.log('✅ Canvas initialized successfully');
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Failed to initialize canvas:', error);
        setIsLoading(false);
        alert(`❌ Dizayn redaktoru yüklənə bilmədi: ${error instanceof Error ? error.message : 'Naməlum xəta'}\n\nBrauzer konsolunu (F12) yoxlayın.`);
      }
    };

    // Use setTimeout to ensure DOM is ready
    // For fullPage mode, wait longer as the component needs to mount
    const delay = fullPage ? 1000 : 500;
    const timeoutId = setTimeout(() => {
      initCanvas();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      console.log('🧹 Cleanup: Disposing canvas...');
      if (fabricCanvasRef.current) {
        try {
          // Remove all objects first
          const objects = fabricCanvasRef.current.getObjects();
          objects.forEach(obj => {
            try {
              fabricCanvasRef.current?.remove(obj);
            } catch (e) {
              // Ignore errors when removing objects
            }
          });
          
          // Clear canvas
          fabricCanvasRef.current.clear();
          
          // Dispose canvas
          fabricCanvasRef.current.dispose();
          console.log('✅ Canvas disposed successfully');
        } catch (error) {
          console.warn('⚠️ Error disposing canvas (might already be disposed):', error);
        } finally {
          fabricCanvasRef.current = null;
        }
      }
      
      // Clear ref
      if (canvasRef.current) {
        canvasRef.current = null;
      }
    };
  }, [isOpen, post, fullPage]);

  // Add text
  const addText = () => {
    if (!fabricCanvasRef.current) return;
    
    const text = new IText('Mətn yazın...', {
      left: 100,
      top: 100,
      fontSize: 40,
      fill: '#000000',
      fontFamily: 'Arial',
    });
    
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
  };

  // Add rectangle
  const addRectangle = () => {
    if (!fabricCanvasRef.current) return;
    
    const rect = new Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 150,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
    });
    
    fabricCanvasRef.current.add(rect);
    fabricCanvasRef.current.setActiveObject(rect);
    fabricCanvasRef.current.renderAll();
  };

  // Add circle
  const addCircle = () => {
    if (!fabricCanvasRef.current) return;
    
    const circle = new FabricCircle({
      left: 100,
      top: 100,
      radius: 75,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
    });
    
    fabricCanvasRef.current.add(circle);
    fabricCanvasRef.current.setActiveObject(circle);
    fabricCanvasRef.current.renderAll();
  };

  // Add image from file
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricCanvasRef.current) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;
      
      FabricImage.fromURL(imgUrl, (img) => {
        img.scaleToWidth(400);
        img.set({
          left: 100,
          top: 100,
        });
        fabricCanvasRef.current?.add(img);
        fabricCanvasRef.current?.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  // Delete selected object
  const deleteSelected = () => {
    if (!fabricCanvasRef.current) return;
    
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      fabricCanvasRef.current.remove(activeObject);
      fabricCanvasRef.current.renderAll();
    }
  };

  // Duplicate selected object
  const duplicateSelected = () => {
    if (!fabricCanvasRef.current) return;
    
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      activeObject.clone((cloned: FabricObject) => {
        cloned.set({
          left: (cloned.left || 0) + 20,
          top: (cloned.top || 0) + 20,
        });
        fabricCanvasRef.current?.add(cloned);
        fabricCanvasRef.current?.setActiveObject(cloned);
        fabricCanvasRef.current?.renderAll();
      });
    }
  };

  // Zoom
  const zoomIn = () => {
    if (!fabricCanvasRef.current) return;
    const zoom = fabricCanvasRef.current.getZoom();
    fabricCanvasRef.current.setZoom(zoom * 1.1);
  };

  const zoomOut = () => {
    if (!fabricCanvasRef.current) return;
    const zoom = fabricCanvasRef.current.getZoom();
    fabricCanvasRef.current.setZoom(zoom / 1.1);
  };

  // Update text properties
  useEffect(() => {
    if (!selectedObject || !(selectedObject instanceof IText)) return;
    
    selectedObject.set({
      fill: textColor,
      fontSize: fontSize,
      fontFamily: fontFamily,
    });
    fabricCanvasRef.current?.renderAll();
  }, [textColor, fontSize, fontFamily, selectedObject]);

  // Update shape properties
  useEffect(() => {
    if (!selectedObject || selectedObject instanceof IText) return;
    
    selectedObject.set({
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
    });
    fabricCanvasRef.current?.renderAll();
  }, [fillColor, strokeColor, strokeWidth, selectedObject]);

  // Apply filters to image
  useEffect(() => {
    if (!selectedObject || !(selectedObject instanceof FabricImage)) return;
    
    const filters: any[] = [];
    
    if (brightness !== 0) {
      // Note: Filters might need to be imported separately in v7
      // For now, we'll skip filters or implement them differently
      // filters.push(new FabricImage.filters.Brightness({ brightness: brightness / 100 }));
    }
    
    if (contrast !== 0) {
      // filters.push(new FabricImage.filters.Contrast({ contrast: contrast / 100 }));
    }
    
    if (saturation !== 0) {
      // filters.push(new FabricImage.filters.Saturation({ saturation: saturation / 100 }));
    }
    
    // Note: Filter implementation may differ in v7
    // selectedObject.filters = filters;
    // selectedObject.applyFilters();
    fabricCanvasRef.current?.renderAll();
  }, [brightness, contrast, saturation, selectedObject]);

  // Save design
  const handleSave = async () => {
    if (!fabricCanvasRef.current) return;

    setIsSaving(true);
    try {
      // Export as data URL
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'jpeg',
        quality: 0.9,
        multiplier: 1,
      });

      await onSave(dataURL);
      setIsSaving(false);
    } catch (error) {
      console.error('Failed to save design:', error);
      alert('❌ Dizayn saxlanıla bilmədi');
      setIsSaving(false);
    }
  };

  // Early return if no post
  if (!post) {
    return null;
  }

  // If not open and not full page, don't render
  if (!isOpen && !fullPage) {
    return null;
  }

  const content = (
    <>
      <div className={`${fullPage ? 'h-full' : ''} flex flex-col bg-white`}>
        {/* Header */}
        <div className="p-4 border-b bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">🎨 Dizayn Redaktoru</h2>
              <p className="text-sm text-gray-600">
                Professional və pulsuz dizayn redaktoru
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={isSaving || isLoading}
                className="bg-green-600 hover:bg-green-700 text-white border-0"
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
              {!fullPage && (
                <Button 
                  variant="outline" 
                  onClick={onClose} 
                  size="sm" 
                  disabled={isSaving}
                  className="border-2 border-gray-300 hover:border-gray-400 text-gray-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Bağla
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className={`flex ${fullPage ? 'flex-1 overflow-hidden' : 'h-[calc(95vh-80px)]'}`}>
          {/* Toolbar */}
          <div className="w-80 border-r bg-white p-4 overflow-y-auto shadow-sm">
            <Tabs defaultValue="tools" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="tools" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Alətlər</TabsTrigger>
                <TabsTrigger value="properties" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Parametrlər</TabsTrigger>
              </TabsList>

              <TabsContent value="tools" className="space-y-4 mt-4">
                {/* Add Elements */}
                <div className="space-y-2">
                  <Label className="font-semibold text-gray-700">Elementlər</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={addText} 
                      className="h-20 flex-col border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                    >
                      <Type className="w-6 h-6 mb-1 text-gray-700" />
                      <span className="text-xs text-gray-700">Mətn</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={addRectangle} 
                      className="h-20 flex-col border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                    >
                      <Square className="w-6 h-6 mb-1 text-gray-700" />
                      <span className="text-xs text-gray-700">Düzbucaqlı</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={addCircle} 
                      className="h-20 flex-col border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                    >
                      <Circle className="w-6 h-6 mb-1 text-gray-700" />
                      <span className="text-xs text-gray-700">Dairə</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50" 
                      asChild
                    >
                      <label className="cursor-pointer">
                        <ImageIcon className="w-6 h-6 mb-1 text-gray-700" />
                        <span className="text-xs text-gray-700">Şəkil</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Label className="font-semibold text-gray-700">Əməliyyatlar</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={duplicateSelected} 
                      size="sm"
                      className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Kopyala
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={deleteSelected} 
                      size="sm"
                      className="border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Sil
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={zoomIn} 
                      size="sm"
                      className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700"
                    >
                      <ZoomIn className="w-4 h-4 mr-1" />
                      Böyüt
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={zoomOut} 
                      size="sm"
                      className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700"
                    >
                      <ZoomOut className="w-4 h-4 mr-1" />
                      Kiçilt
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="properties" className="space-y-4 mt-4">
                {selectedObject ? (
                  <>
                    {/* Text Properties */}
                    {selectedObject instanceof IText && (
                      <div className="space-y-3">
                        <Label className="font-semibold text-gray-700">Mətn Parametrləri</Label>
                        
                        <div className="space-y-2">
                          <Label>Font</Label>
                          <Select value={fontFamily} onValueChange={setFontFamily}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Arial">Arial</SelectItem>
                              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                              <SelectItem value="Courier New">Courier New</SelectItem>
                              <SelectItem value="Georgia">Georgia</SelectItem>
                              <SelectItem value="Verdana">Verdana</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Mətn</Label>
                          <Input
                            value={textContent}
                            onChange={(e) => {
                              setTextContent(e.target.value);
                              if (selectedObject instanceof IText) {
                                selectedObject.set('text', e.target.value);
                                fabricCanvasRef.current?.renderAll();
                              }
                            }}
                            placeholder="Mətn yazın..."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Font Ölçüsü: {fontSize}px</Label>
                          <Slider
                            value={[fontSize]}
                            onValueChange={(v) => setFontSize(v[0])}
                            min={12}
                            max={200}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Rəng</Label>
                          <Input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="h-10"
                          />
                        </div>
                      </div>
                    )}

                    {/* Shape Properties */}
                    {(selectedObject instanceof Rect || selectedObject instanceof FabricCircle) && (
                      <div className="space-y-3">
                        <Label className="font-semibold text-gray-700">Forma Parametrləri</Label>
                        
                        <div className="space-y-2">
                          <Label>Doldurma Rəngi</Label>
                          <Input
                            type="color"
                            value={fillColor}
                            onChange={(e) => setFillColor(e.target.value)}
                            className="h-10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Kontur Rəngi</Label>
                          <Input
                            type="color"
                            value={strokeColor}
                            onChange={(e) => setStrokeColor(e.target.value)}
                            className="h-10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Kontur Qalınlığı: {strokeWidth}px</Label>
                          <Slider
                            value={[strokeWidth]}
                            onValueChange={(v) => setStrokeWidth(v[0])}
                            min={0}
                            max={20}
                          />
                        </div>
                      </div>
                    )}

                    {/* Image Properties */}
                    {selectedObject instanceof FabricImage && (
                      <div className="space-y-3">
                        <Label className="font-semibold text-gray-700">Şəkil Parametrləri</Label>
                        
                        <div className="space-y-2">
                          <Label>Parlaqlıq: {brightness}%</Label>
                          <Slider
                            value={[brightness]}
                            onValueChange={(v) => setBrightness(v[0])}
                            min={-100}
                            max={100}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Kontrast: {contrast}%</Label>
                          <Slider
                            value={[contrast]}
                            onValueChange={(v) => setContrast(v[0])}
                            min={-100}
                            max={100}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Doygunluq: {saturation}%</Label>
                          <Slider
                            value={[saturation]}
                            onValueChange={(v) => setSaturation(v[0])}
                            min={-100}
                            max={100}
                          />
                        </div>
                      </div>
                    )}

                    {/* Image Filters - Coming soon */}
                    {selectedObject instanceof FabricImage && (
                      <div className="space-y-3">
                        <Label className="font-semibold text-gray-700">Şəkil Filterləri</Label>
                        <div className="text-sm text-gray-500 p-3 bg-gray-100 rounded">
                          Filterlər tezliklə əlavə ediləcək. Hazırda şəkil yükləyib, ölçüləndirə və yerləşdirə bilərsiniz.
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-gray-500 text-sm py-8">
                    Parametrləri görmək üçün bir element seçin
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Canvas */}
          <div 
            key={`canvas-container-${fullPage ? 'fullpage' : 'modal'}-${isOpen ? 'open' : 'closed'}-${post?.id || 'new'}`}
            className="flex-1 bg-gray-100 flex items-center justify-center relative overflow-auto p-4"
            style={{ minHeight: '500px' }}
          >
            <div className="relative" style={{ width: '100%', maxWidth: '800px' }}>
              <canvas 
                ref={canvasRef} 
                className="shadow-2xl"
                width={1080}
                height={1080}
                style={{ 
                  width: '100%',
                  height: 'auto',
                  maxHeight: 'calc(95vh - 200px)',
                  border: '3px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  display: 'block',
                  borderRadius: '8px',
                }}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-lg font-medium">Dizayn redaktoru yüklənir...</p>
                    <p className="text-sm text-gray-500 mt-2">Fabric.js - Pulsuz və açıq qaynaq</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Full page mode
  if (fullPage) {
    return <div className="h-full w-full flex flex-col">{content}</div>;
  }

  // Modal mode
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        // Dispose canvas before closing
        if (fabricCanvasRef.current) {
          try {
            const objects = fabricCanvasRef.current.getObjects();
            objects.forEach(obj => {
              try {
                fabricCanvasRef.current?.remove(obj);
              } catch (e) {
                // Ignore
              }
            });
            fabricCanvasRef.current.clear();
            fabricCanvasRef.current.dispose();
          } catch (error) {
            console.warn('Error disposing canvas on close:', error);
          } finally {
            fabricCanvasRef.current = null;
          }
        }
        onClose();
      }
    }}>
      <DialogContent className="!max-w-none !w-[95vw] !h-[95vh] p-0 overflow-hidden !z-50 bg-white">
        {content}
      </DialogContent>
    </Dialog>
  );
}

