'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from '@/hooks/useTranslation';
import { socialAccountsAPI } from '@/lib/api';
import { Clock, CheckCircle2, Sparkles, Instagram, Facebook, ExternalLink, AlertCircle } from 'lucide-react';

interface PostEditModalProps {
  post: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPost: any) => void;
}

interface ConnectedAccount {
  id: string;
  platform: string;
  platform_username?: string;
  display_name?: string;
  is_active: boolean;
}

export function PostEditModal({ post, isOpen, onClose, onSave }: PostEditModalProps) {
  const [editedPost, setEditedPost] = useState(post || {});
  const [isAIRecommended, setIsAIRecommended] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const router = useRouter();
  const t = useTranslation();

  useEffect(() => {
    if (post) {
      setEditedPost(post);
      // Check if this post was scheduled with AI optimal timing
      setIsAIRecommended(post?.ai_recommended_time === true || false);
    }
  }, [post]);

  useEffect(() => {
    if (isOpen) {
      loadConnectedAccounts();
    }
  }, [isOpen]);

  const loadConnectedAccounts = async () => {
    try {
      setLoadingAccounts(true);
      const response = await socialAccountsAPI.getAccounts();
      const accounts = response.data.results || response.data || [];
      setConnectedAccounts(accounts.filter((acc: ConnectedAccount) => acc.is_active));
    } catch (error) {
      console.error('Failed to load connected accounts:', error);
    } finally {
      setLoadingAccounts(false);
    }
  };

  const getConnectedAccount = (platform: string): ConnectedAccount | null => {
    const platformMap: { [key: string]: string } = {
      'Instagram': 'instagram',
      'Facebook': 'facebook',
      'LinkedIn': 'linkedin',
      'Twitter': 'twitter',
      'Telegram': 'telegram',
    };
    
    const platformKey = platformMap[platform] || platform.toLowerCase();
    return connectedAccounts.find(acc => acc.platform === platformKey) || null;
  };

  const isPlatformConnected = (platform: string): boolean => {
    return !!getConnectedAccount(platform);
  };

  const handleConnectClick = () => {
    router.push('/social-accounts');
  };

  if (!post || !isOpen) return null;
  
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const locale = t.common.loading === 'Loading...' ? 'en-US' : t.common.loading === 'Yüklənir...' ? 'az-AZ' : 'ru-RU';
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

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
    
    // Don't allow toggling if platform is not connected
    if (!isPlatformConnected(platform)) {
      return;
    }
    
    const platforms = editedPost.platforms || [];
    const updatedPlatforms = platforms.includes(platform)
      ? platforms.filter((p: string) => p !== platform)
      : [...platforms, platform];

    setEditedPost({ ...editedPost, platforms: updatedPlatforms });
  };

  const availablePlatforms = ['LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'Telegram'];

  const instagramAccount = getConnectedAccount('Instagram');
  const facebookAccount = getConnectedAccount('Facebook');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            {t.calendar.editPost || 'Post Redaktə Et'}
          </DialogTitle>
          <DialogDescription className="text-xs mt-1.5">
            {t.calendar.editPostDesc || 'Paylaşım məzmununu, zamanlamasını və platformalarını dəyişdirin'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          
          {/* Current Connected Accounts */}
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg border">
            <Label className="text-xs font-medium text-muted-foreground">
              {t.calendar.currentConnectedAccounts || 'Current Connected Accounts'}
            </Label>
            
            <div className="space-y-2">
              {/* Instagram Account */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#E4405F]" />
                  <span className="font-medium">Instagram:</span>
                  {instagramAccount ? (
                    <>
                      <span className="text-muted-foreground">
                        {instagramAccount.platform_username ? `@${instagramAccount.platform_username}` : instagramAccount.display_name || 'Connected'}
                      </span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-green-500 text-green-600 dark:text-green-400">
                        {t.calendar.connected || 'Connected'}
                      </Badge>
                    </>
                  ) : (
                    <>
                      <span className="text-muted-foreground">{t.calendar.notConnected || 'Not connected'}</span>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs text-primary"
                        onClick={handleConnectClick}
                      >
                        {t.calendar.connect || 'Connect'}
                      </Button>
                    </>
                  )}
                </div>
                {instagramAccount && (
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs"
                    onClick={handleConnectClick}
                  >
                    {t.calendar.change || 'Change'}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>

              {/* Facebook Account */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-[#1877F2]" />
                  <span className="font-medium">Facebook Page:</span>
                  {facebookAccount ? (
                    <>
                      <span className="text-muted-foreground">
                        {facebookAccount.display_name || facebookAccount.platform_username || 'Connected'}
                      </span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-green-500 text-green-600 dark:text-green-400">
                        {t.calendar.connected || 'Connected'}
                      </Badge>
                    </>
                  ) : (
                    <>
                      <span className="text-muted-foreground">{t.calendar.notConnected || 'Not connected'}</span>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs text-primary"
                        onClick={handleConnectClick}
                      >
                        {t.calendar.connect || 'Connect'}
                      </Button>
                    </>
                  )}
                </div>
                {facebookAccount && (
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs"
                    onClick={handleConnectClick}
                  >
                    {t.calendar.change || 'Change'}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Başlıq */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-medium">{t.calendar.titleLabel || 'Başlıq'}</Label>
            <Input
              id="title"
              value={editedPost?.title || ''}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
              placeholder={t.calendar.titlePlaceholder || 'Post başlığı...'}
              className="h-9"
            />
          </div>

          {/* Məzmun */}
          <div className="space-y-1.5">
            <Label htmlFor="content" className="text-sm font-medium">{t.calendar.content || 'Məzmun'}</Label>
            <Textarea
              id="content"
              value={editedPost?.content || ''}
              onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
              placeholder={t.calendar.contentPlaceholder || 'Post məzmununu yazın...'}
              className="min-h-[120px] resize-none"
            />
            <div className="text-xs text-muted-foreground text-right">
              {editedPost?.content?.length || 0} {t.calendar.characters || 'simvol'}
            </div>
          </div>

          {/* Tarix / Saat */}
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="date" className="text-sm font-medium">{t.calendar.date || 'Tarix'}</Label>
                {isAIRecommended && (
                  <Badge variant="outline" className="text-xs bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {t.calendar.aiRecommended}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="date"
                  type="date"
                  value={editedPost?.date || ''}
                  onChange={(e) => {
                    setEditedPost({ ...editedPost, date: e.target.value });
                    setIsAIRecommended(false); // User override
                  }}
                  className="h-9"
                />
                <div className="space-y-1.5">
                  <Label htmlFor="time" className="text-sm font-medium">{t.calendar.time || 'Saat'}</Label>
                  <Input
                    id="time"
                    type="time"
                    value={editedPost?.time || ''}
                    onChange={(e) => {
                      setEditedPost({ ...editedPost, time: e.target.value });
                      setIsAIRecommended(false); // User override
                    }}
                    className="h-9"
                  />
                </div>
              </div>
              {isAIRecommended && (
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {t.calendar.recommendedTimeAI} - {t.calendar.userOverride}
                </div>
              )}
            </div>
            
            {/* Schedule Details - for scheduled posts */}
            {post?.status === 'scheduled' && post?.scheduled_time && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-100">
                  <Clock className="w-4 h-4" />
                  {t.calendar.scheduledTime}
                </div>
                <div className="text-xs text-blue-800 dark:text-blue-200">
                  {formatDateTime(post.scheduled_time)}
                </div>
                
                {/* Publishing to accounts */}
                {post?.post_platforms && post.post_platforms.length > 0 && (
                  <div className="pt-2 border-t border-blue-200 dark:border-blue-800 space-y-1.5">
                    <div className="text-xs font-medium text-blue-900 dark:text-blue-100">
                      {t.calendar.publishingTo}:
                    </div>
                    {post.post_platforms.map((pp: any) => (
                      <div key={pp.id} className="text-xs text-blue-800 dark:text-blue-200 flex items-center gap-2">
                        <span className="capitalize">{pp.social_account_name}</span>
                        <span className="text-muted-foreground">
                          ({pp.social_account_display_name || pp.social_account_username || 'Unknown'})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Auto publish notice */}
                <div className="pt-2 border-t border-blue-200 dark:border-blue-800 flex items-center gap-2 text-xs text-blue-800 dark:text-blue-200">
                  <CheckCircle2 className="w-3 h-3" />
                  {t.calendar.willPublishAutomatically}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Platformalar */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t.calendar.platforms || 'Platformalar'}</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availablePlatforms.map((platform) => {
                const isSelected = editedPost?.platforms?.includes(platform);
                const isConnected = isPlatformConnected(platform);
                const isDisabled = !isConnected;
                
                return (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    disabled={isDisabled}
                    className={`flex flex-col items-center justify-center space-y-1 p-2.5 rounded-lg border-2 transition-all duration-200 ${
                      isDisabled
                        ? 'bg-muted/30 border-border/50 opacity-50 cursor-not-allowed'
                        : isSelected 
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-[1.02]' 
                        : 'bg-background hover:bg-muted border-border hover:border-primary/50'
                    }`}
                    title={
                      isDisabled
                        ? platform === 'Instagram'
                          ? t.calendar.connectInstagramFirst || 'Connect Instagram first'
                          : platform === 'Facebook'
                          ? t.calendar.connectFacebookFirst || 'Connect Facebook Page first'
                          : t.calendar.connectPlatformFirst || 'Connect platform first'
                        : undefined
                    }
                  >
                    <span className="text-base">{getPlatformIcon(platform)}</span>
                    <span className="text-xs font-medium">{platform}</span>
                    {isDisabled && (
                      <span className="text-[9px] text-muted-foreground text-center mt-1">
                        {platform === 'Instagram'
                          ? t.calendar.connectInstagramFirst || 'Connect Instagram first'
                          : platform === 'Facebook'
                          ? t.calendar.connectFacebookFirst || 'Connect Facebook Page first'
                          : t.calendar.connectFirst || 'Connect first'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              {t.calendar.selected || 'Seçildi'}: {editedPost?.platforms?.length || 0} {t.calendar.platform || 'platforma'}
            </div>
          </div>

          <Separator />

          {/* Status */}
          <div className="space-y-1.5">
            <Label htmlFor="status" className="text-sm font-medium">{t.calendar.status || 'Status'}</Label>
            <select
              id="status"
              value={editedPost?.status || 'draft'}
              onChange={(e) => setEditedPost({ ...editedPost, status: e.target.value })}
              className="w-full h-9 px-3 border rounded-md bg-background text-sm"
            >
              <option value="draft">{t.calendar.draft || 'Qaralama'}</option>
              <option value="scheduled">{t.calendar.scheduled || 'Planlaşdırılıb'}</option>
              <option value="published">{t.calendar.published || 'Dərc edilib'}</option>
            </select>
          </div>

          {/* Preview */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">{t.calendar.preview || 'Önizləmə'}</Label>
            <div className="p-4 bg-gradient-to-br from-muted/50 to-muted rounded-lg border-2 border-border/50">
              <div className="flex items-center space-x-2 mb-2.5">
                <div className={`w-3 h-3 rounded-full ${post?.color || 'bg-gray-500'} shadow-sm`}></div>
                <span className="font-semibold text-sm">{editedPost?.title || t.calendar.untitled || 'Başlıqsız'}</span>
              </div>

              <div className="text-xs mb-3 line-clamp-3 text-muted-foreground leading-relaxed">
                <pre className="whitespace-pre-wrap font-sans">
                  {editedPost?.content?.substring(0, 150) || t.calendar.noContent || 'Məzmun yoxdur...'}
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

          {/* Posting Destination Notice */}
          <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-xs text-blue-800 dark:text-blue-200">
              {t.calendar.postingDestination || 'Posts will be published from your connected accounts. Manage connections in Social Accounts.'}
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t">
            <Button variant="outline" onClick={onClose} className="h-9">
              {t.common.cancel || 'Ləğv et'}
            </Button>
            <Button onClick={handleSave} className="h-9">
              <span className="mr-1">💾</span>
              {t.common.save || 'Yadda saxla'}
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
