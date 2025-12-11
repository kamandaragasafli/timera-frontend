'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PostEditModalProps {
  post: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPost: any) => void;
}

export function PostEditModal({ post, isOpen, onClose, onSave }: PostEditModalProps) {
  const [editedPost, setEditedPost] = useState(post || {});

  useEffect(() => {
    if (post) {
      setEditedPost(post);
    }
  }, [post]);

  if (!post || !isOpen) return null;

  const handleSave = () => {
    onSave(editedPost);
    onClose();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return '💼';
      case 'Twitter': return '🐦';
      case 'Instagram': return '📸';
      case 'Facebook': return '📘';
      case 'Telegram': return '📱';
      default: return '📱';
    }
  };

  const togglePlatform = (platform: string) => {
    if (!editedPost) return;
    const platforms = editedPost.platforms || [];
    const updatedPlatforms = platforms.includes(platform)
      ? platforms.filter((p: string) => p !== platform)
      : [...platforms, platform];

    setEditedPost({ ...editedPost, platforms: updatedPlatforms });
  };

  const availablePlatforms = ['LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'Telegram'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      
      {/* === FIX OLUNMUŞ MODAL CONTENT === */}
      <DialogContent
        className="
          dialog-content-custom
          max-h-[90vh]
          overflow-y-auto
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
      
        <DialogHeader className="pb-3 border-b">
          <DialogTitle className="flex items-center text-lg">
            <div className={`w-3 h-3 rounded-full ${post?.color || 'bg-gray-500'} mr-2 shadow-sm`}></div>
            Post Redaktə Et
          </DialogTitle>
          <DialogDescription className="text-xs mt-1.5">
            Paylaşım məzmununu, zamanlamasını və platformalarını dəyişdirin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          
          {/* Başlıq */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-medium">Başlıq</Label>
            <Input
              id="title"
              value={editedPost?.title || ''}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
              placeholder="Post başlığı..."
              className="h-9"
            />
          </div>

          {/* Məzmun */}
          <div className="space-y-1.5">
            <Label htmlFor="content" className="text-sm font-medium">Məzmun</Label>
            <Textarea
              id="content"
              value={editedPost?.content || ''}
              onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
              placeholder="Post məzmununu yazın..."
              className="min-h-[120px] resize-none"
            />
            <div className="text-xs text-muted-foreground text-right">
              {editedPost?.content?.length || 0} simvol
            </div>
          </div>

          {/* Tarix / Saat */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-sm font-medium">Tarix</Label>
              <Input
                id="date"
                type="date"
                value={editedPost?.date || ''}
                onChange={(e) => setEditedPost({ ...editedPost, date: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="time" className="text-sm font-medium">Saat</Label>
              <Input
                id="time"
                type="time"
                value={editedPost?.time || ''}
                onChange={(e) => setEditedPost({ ...editedPost, time: e.target.value })}
                className="h-9"
              />
            </div>
          </div>

          <Separator />

          {/* Platformalar */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Platformalar</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availablePlatforms.map((platform) => {
                const isSelected = editedPost?.platforms?.includes(platform);
                return (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`flex items-center justify-center space-x-1.5 p-2.5 rounded-lg border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-[1.02]' 
                        : 'bg-background hover:bg-muted border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-base">{getPlatformIcon(platform)}</span>
                    <span className="text-xs font-medium">{platform}</span>
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              Seçildi: {editedPost?.platforms?.length || 0} platforma
            </div>
          </div>

          <Separator />

          {/* Status */}
          <div className="space-y-1.5">
            <Label htmlFor="status" className="text-sm font-medium">Status</Label>
            <select
              id="status"
              value={editedPost?.status || 'draft'}
              onChange={(e) => setEditedPost({ ...editedPost, status: e.target.value })}
              className="w-full h-9 px-3 border rounded-md bg-background text-sm"
            >
              <option value="draft">Qaralama</option>
              <option value="scheduled">Planlaşdırılıb</option>
              <option value="published">Dərc edilib</option>
            </select>
          </div>

          {/* Preview */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Önizləmə</Label>
            <div className="p-4 bg-gradient-to-br from-muted/50 to-muted rounded-lg border-2 border-border/50">
              <div className="flex items-center space-x-2 mb-2.5">
                <div className={`w-3 h-3 rounded-full ${post?.color || 'bg-gray-500'} shadow-sm`}></div>
                <span className="font-semibold text-sm">{editedPost?.title || 'Başlıqsız'}</span>
              </div>

              <div className="text-xs mb-3 line-clamp-3 text-muted-foreground leading-relaxed">
                <pre className="whitespace-pre-wrap font-sans">
                  {editedPost?.content?.substring(0, 150) || 'Məzmun yoxdur...'}
                  {(editedPost?.content?.length || 0) > 150 && '...'}
                </pre>
              </div>

              {editedPost?.platforms?.length > 0 && (
                <div className="flex items-center flex-wrap gap-1.5 pt-2 border-t border-border/50">
                  {editedPost.platforms.map((platform: string) => (
                    <Badge key={platform} variant="secondary" className="text-xs px-2 py-0.5">
                      <span className="mr-1">{getPlatformIcon(platform)}</span>
                      {platform}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t">
            <Button variant="outline" onClick={onClose} className="h-9">
              Ləğv et
            </Button>
            <Button onClick={handleSave} className="h-9">
              <span className="mr-1">💾</span>
              Yadda saxla
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
