'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Facebook, Instagram, CheckCircle2, Download, Copy, Settings } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { postsAPI, socialAccountsAPI } from '@/lib/api';

// LinkedIn Icon Component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// YouTube Icon Component
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Meta Business Suite Icon Component
const MetaBusinessIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

interface Post {
  id: string;
  title: string;
  content: string;
  hashtags?: string[];
  image_url?: string;
  custom_image?: string;
  design_url?: string;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

const platforms = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
    hasNativeShare: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: LinkedInIcon,
    color: '#0077B5',
    hasNativeShare: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: '#E4405F',
    hasNativeShare: false,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: TikTokIcon,
    color: '#000000',
    hasNativeShare: false,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: YouTubeIcon,
    color: '#FF0000',
    hasNativeShare: false,
  },
  {
    id: 'meta-business',
    name: 'Meta Business',
    icon: MetaBusinessIcon,
    color: '#1877F2',
    hasNativeShare: false,
  },
];

// Helper functions
const isMobile = () => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const prepareShareContent = (post: Post) => {
  const baseUrl = window.location.origin;
  const postUrl = `${baseUrl}/posts/${post.id}`;
  
  let shareText = post.title || '';
  if (post.content) {
    shareText += '\n\n' + post.content;
  }
  if (post.hashtags && post.hashtags.length > 0) {
    shareText += '\n\n' + post.hashtags.join(' ');
  }
  
  const imageUrl = post.image_url || post.custom_image || post.design_url;
  
  return {
    url: postUrl,
    text: shareText,
    title: post.title,
    hashtags: post.hashtags || [],
    imageUrl: imageUrl,
  };
};

const downloadImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'post-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Failed to download image:', error);
    return false;
  }
};

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

// Note: Browser security prevents automatic paste to Instagram
// Instagram is a different origin, so we cannot programmatically paste text
// The text is copied to clipboard, and user must manually paste (Ctrl+V / Cmd+V)
// Web Share API may pass text on some mobile platforms, but not guaranteed

const shareToInstagram = async (post: Post, type: 'feed' | 'stories', onTextCopied?: () => void) => {
  const content = prepareShareContent(post);
  
  // ALWAYS copy text to clipboard first (Instagram Web Share API doesn't always pass text)
  // This ensures text is available for user to paste
  const textCopied = await copyText(content.text);
  if (textCopied && onTextCopied) {
    onTextCopied(); // Notify that text was copied
  }
  
  // Try Web Share API first (best option - native share with image)
  // This works on mobile browsers and opens native share dialog
  // User can select Instagram from the share options
  if (navigator.share && navigator.canShare) {
    try {
      // Fetch image as blob
      let imageFile: File | null = null;
      if (content.imageUrl) {
        try {
          const imageResponse = await fetch(content.imageUrl);
          const imageBlob = await imageResponse.blob();
          imageFile = new File([imageBlob], 'post-image.jpg', { type: 'image/jpeg' });
        } catch (error) {
          console.error('Failed to fetch image:', error);
        }
      }
      
      // Prepare share data
      // Note: Some platforms (like Instagram) may not receive text via Web Share API
      // That's why we copy text to clipboard first
      const shareData: any = {
        title: content.title,
        text: content.text, // Include text, but Instagram may not use it
      };
      
      // Add image file if available (Web Share API supports files)
      if (imageFile) {
        shareData.files = [imageFile];
      }
      
      // Check if can share
      if (navigator.canShare(shareData)) {
        // Open native share dialog
        // User can select Instagram from the options
        // Text is already copied to clipboard, user can paste it in Instagram
        // Note: Web Share API doesn't support specifying Feed vs Stories
        // So we'll skip Web Share API for Stories and use direct deep link instead
        if (type === 'stories') {
          // For Stories, don't use Web Share API - use direct deep link instead
          // This ensures Stories opens correctly
          // Continue to fallback method below
        } else {
          // For Feed, use Web Share API
          try {
            await navigator.share(shareData);
            return; // Success - native share dialog opened, user selects Instagram
          } catch (error: any) {
            // User cancelled or error - continue to fallback method
            if (error.name === 'AbortError') {
              return; // User cancelled, don't proceed
            }
            // Continue to fallback method
          }
        }
      }
    } catch (error: any) {
      // User cancelled or error - fallback to manual method
      if (error.name !== 'AbortError') {
        console.error('Web Share API error:', error);
      }
      // Continue to fallback method (text is already copied)
    }
  }
  
  // Fallback method: Download image (text already copied above)
  // Download image
  if (content.imageUrl) {
    await downloadImage(content.imageUrl);
  }
  
  // Open Instagram based on type
  if (isMobile()) {
    if (type === 'feed') {
      // Instagram Feed Post
      // Try deep link to open Instagram camera/library
      // User can then select the downloaded image from gallery
      // Text is already in clipboard, user can paste it
      try {
        window.location.href = 'instagram://camera';
        // If deep link fails, fallback to web
        setTimeout(() => {
          window.open('https://www.instagram.com/', '_blank');
        }, 1500);
      } catch (error) {
        window.open('https://www.instagram.com/', '_blank');
      }
    } else {
      // Instagram Stories
      // Try deep link to open Instagram Stories camera
      // Text is already in clipboard, user can paste it
      try {
        window.location.href = 'instagram://stories';
        // If deep link fails, fallback to web
        setTimeout(() => {
          window.open('https://www.instagram.com/stories/create/', '_blank');
        }, 1500);
      } catch (error) {
        window.open('https://www.instagram.com/stories/create/', '_blank');
      }
    }
  } else {
    // Web - redirect to Instagram
    // Text is already in clipboard, user can paste it
    // Note: Browser security prevents automatic paste to Instagram
    if (type === 'feed') {
      window.open('https://www.instagram.com/', '_blank');
    } else {
      window.open('https://www.instagram.com/stories/create/', '_blank');
    }
  }
};

const shareToPlatform = async (platform: string, post: Post, instagramType?: 'feed' | 'stories', onTextCopied?: () => void) => {
  const content = prepareShareContent(post);
  const encodedUrl = encodeURIComponent(content.url);
  const encodedText = encodeURIComponent(content.text);
  
  switch (platform) {
    case 'facebook':
      // Download image (if exists) and copy text like Instagram/TikTok
      if (content.imageUrl) {
        await downloadImage(content.imageUrl);
      }
      {
        const facebookTextCopied = await copyText(content.text);
        if (facebookTextCopied && onTextCopied) {
          onTextCopied(); // Notify that text was copied
        }
      }
      // Then open Facebook share dialog
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        '_blank',
        'width=600,height=400'
      );
      break;
    
    case 'linkedin':
      // LinkedIn - will be handled in component with Company Page selection
      // This case is just a placeholder
      break;
    
    case 'instagram':
      if (instagramType) {
        await shareToInstagram(post, instagramType, onTextCopied);
      }
      // If no type specified, this shouldn't happen (should show sub-menu)
      break;
    
    case 'tiktok':
      // Download image/video and copy text
      if (content.imageUrl) {
        await downloadImage(content.imageUrl);
      }
      const tiktokTextCopied = await copyText(content.text);
      if (tiktokTextCopied && onTextCopied) {
        onTextCopied(); // Notify that text was copied
      }
      
      // Open TikTok
      if (isMobile()) {
        window.location.href = 'tiktok://upload';
        setTimeout(() => {
          window.open('https://www.tiktok.com/upload', '_blank');
        }, 1000);
      } else {
        window.open('https://www.tiktok.com/upload', '_blank');
      }
      break;
    
    case 'youtube':
      // Copy text for YouTube description
      const youtubeTextCopied = await copyText(content.text);
      if (youtubeTextCopied && onTextCopied) {
        onTextCopied(); // Notify that text was copied
      }
      
      // Open YouTube Studio
      window.open('https://www.youtube.com/upload', '_blank');
      break;
    
    case 'meta-business':
      // Meta Business Suite - will be handled in component with input fields
      // This case is just a placeholder
      break;
    
    default:
      break;
  }
};

export default function ShareModal({ isOpen, onClose, post }: ShareModalProps) {
  const t = useTranslation();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [sharing, setSharing] = useState<string | null>(null);
  const [showInstagramOptions, setShowInstagramOptions] = useState(false); // FUTURE: enable Instagram Feed/Stories selection again
  const [textCopiedAlert, setTextCopiedAlert] = useState(false);
  const [showMetaBusinessConfig, setShowMetaBusinessConfig] = useState(false);
  const [metaBusinessId, setMetaBusinessId] = useState('');
  const [metaAssetId, setMetaAssetId] = useState('');
  const [showLinkedInPageSelector, setShowLinkedInPageSelector] = useState(false);
  const [linkedInCompanyPages, setLinkedInCompanyPages] = useState<any[]>([]);
  const [publishingLinkedIn, setPublishingLinkedIn] = useState(false);

  // Callback to show text copied notification
  const handleTextCopied = () => {
    setTextCopiedAlert(true);
    setCopied(true);
    setTimeout(() => {
      setTextCopiedAlert(false);
      setCopied(false);
    }, 5000); // Show for 5 seconds
  };

  // Load Meta Business IDs from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBusinessId = localStorage.getItem('meta_business_id');
      const savedAssetId = localStorage.getItem('meta_asset_id');
      if (savedBusinessId) setMetaBusinessId(savedBusinessId);
      if (savedAssetId) setMetaAssetId(savedAssetId);
    }
    loadLinkedInCompanyPages();
  }, []);

  const loadLinkedInCompanyPages = async () => {
    try {
      const response = await socialAccountsAPI.getAccounts();
      const accounts = response.data.results || response.data || [];
      // Filter LinkedIn Company Pages
      const companyPages = accounts.filter((acc: any) => 
        acc.platform === 'linkedin' && 
        acc.is_active && 
        acc.settings?.is_company_page === true
      );
      setLinkedInCompanyPages(companyPages);
    } catch (error) {
      console.error('Failed to load LinkedIn Company Pages:', error);
    }
  };

  const handleShare = async (platform: string, instagramType?: 'feed' | 'stories') => {
    // Meta Business Suite - show config form
    if (platform === 'meta-business') {
      setShowMetaBusinessConfig(true);
      return;
    }

    // LinkedIn - show Company Page selector if available
    if (platform === 'linkedin') {
      if (linkedInCompanyPages.length > 0) {
        setShowLinkedInPageSelector(true);
        return;
      }
      // If no Company Pages, use API to publish to personal account
      await publishToLinkedIn(null);
      return;
    }

    // CURRENT BEHAVIOR:
    // - Instagram posts always go directly to FEED
    // - Stories option is commented out in the UI (kept for future)
    //
    // If Instagram and no type specified, force 'feed'
    if (platform === 'instagram' && !instagramType) {
      instagramType = 'feed';
      // FUTURE: if we want the sub-menu back, restore this:
      // setShowInstagramOptions(true);
      // return;
    }

    setSharing(platform);
    try {
      await shareToPlatform(platform, post, instagramType, handleTextCopied);
      
      // Show success message for image download
      if (platform === 'instagram' || platform === 'tiktok') {
        setDownloaded(true);
        setTimeout(() => {
          setDownloaded(false);
        }, 3000);
      }
      
      // Close modal after sharing (but keep it open for Instagram to show alert)
      if (platform !== 'instagram' || instagramType) {
        setTimeout(() => {
          onClose();
          setShowInstagramOptions(false);
        }, 500);
      }
    } catch (error) {
      console.error('Failed to share:', error);
    } finally {
      setSharing(null);
    }
  };

  const handleMetaBusinessShare = () => {
    if (!metaBusinessId || !metaAssetId) {
      alert(t.share?.metaBusinessRequired || 'Business ID və Asset ID daxil edin');
      return;
    }

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('meta_business_id', metaBusinessId);
      localStorage.setItem('meta_asset_id', metaAssetId);
    }

    // Download image and copy text
    const content = prepareShareContent(post);
    if (content.imageUrl) {
      downloadImage(content.imageUrl);
    }
    copyText(content.text);
    handleTextCopied();

    // Open Meta Business Suite
    const metaUrl = `https://business.facebook.com/latest/posts/published_posts?asset_id=${metaAssetId}&business_id=${metaBusinessId}&nav_ref=internal_nav`;
    window.open(metaUrl, '_blank');

    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      setShowMetaBusinessConfig(false);
    }, 2000);
  };

  const publishToLinkedIn = async (companyPageId: string | null) => {
    try {
      setPublishingLinkedIn(true);
      await postsAPI.publishToLinkedIn(post.id, companyPageId || undefined);
      alert(t.share?.linkedInPublished || 'LinkedIn-də paylaşıldı!');
      setShowLinkedInPageSelector(false);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: any) {
      console.error('Failed to publish to LinkedIn:', error);
      alert(`${t.share?.linkedInError || 'LinkedIn paylaşım xətası'}: ${error.response?.data?.error || error.message}`);
    } finally {
      setPublishingLinkedIn(false);
    }
  };

  const handleCopyLink = async () => {
    const content = prepareShareContent(post);
    const success = await copyText(content.url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadImage = async () => {
    const content = prepareShareContent(post);
    if (content.imageUrl) {
      const success = await downloadImage(content.imageUrl);
      if (success) {
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
      }
    }
  };

  const content = prepareShareContent(post);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.share?.sharePost || 'Postu Paylaş'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Text Copied Alert - Shows when text is copied to clipboard */}
          {textCopiedAlert && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>{t.share?.textCopied || 'Text kopyalandı!'}</strong>
                {sharing === 'instagram' && (
                  <span className="block mt-1 text-sm">
                    {t.share?.instagramTextPaste || 'Instagram-da şəkil yükləndikdən sonra text sahəsinə yapışdırın (Ctrl+V / Cmd+V)'}
                  </span>
                )}
                {sharing === 'tiktok' && (
                  <span className="block mt-1 text-sm">
                    {t.share?.tiktokInstructions || 'TikTok-da video/şəkli yükləndikdən sonra text sahəsinə yapışdırın (Ctrl+V / Cmd+V)'}
                  </span>
                )}
                {sharing === 'youtube' && (
                  <span className="block mt-1 text-sm">
                    {t.share?.youtubeInstructions || 'YouTube Studio-da video yükləndikdən sonra description sahəsinə yapışdırın (Ctrl+V / Cmd+V)'}
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* LinkedIn Company Page Selector */}
          {showLinkedInPageSelector && (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">
                  {t.share?.linkedInSelectPage || 'LinkedIn Səhifə Seçin'}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLinkedInPageSelector(false)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-2">
                  {t.share?.linkedInSelectPageDesc || 'Paylaşımı hansı LinkedIn səhifəsində etmək istəyirsiniz?'}
                </p>
                
                {/* Personal Account Option */}
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto py-3"
                  onClick={() => publishToLinkedIn(null)}
                  disabled={publishingLinkedIn}
                >
                  <div className="flex items-center gap-3">
                    <LinkedInIcon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{t.share?.linkedInPersonalAccount || 'Şəxsi Hesab'}</div>
                      <div className="text-xs text-muted-foreground">{t.share?.linkedInPersonalDesc || 'Şəxsi profilim'}</div>
                    </div>
                  </div>
                </Button>

                {/* Company Pages */}
                {linkedInCompanyPages.map((page) => (
                  <Button
                    key={page.id}
                    variant="outline"
                    className="w-full justify-start h-auto py-3"
                    onClick={() => publishToLinkedIn(page.platform_user_id)}
                    disabled={publishingLinkedIn}
                  >
                    <div className="flex items-center gap-3">
                      <LinkedInIcon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{page.display_name || page.platform_username}</div>
                        <div className="text-xs text-muted-foreground">{t.share?.linkedInCompanyPage || 'Company Page'}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Meta Business Suite Configuration */}
          {showMetaBusinessConfig && (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">
                  {t.share?.metaBusinessTitle || 'Meta Business Suite Konfiqurasiyası'}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMetaBusinessConfig(false)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="business_id" className="text-xs">
                    {t.share?.metaBusinessId || 'Business ID'}
                  </Label>
                  <Input
                    id="business_id"
                    value={metaBusinessId}
                    onChange={(e) => setMetaBusinessId(e.target.value)}
                    placeholder="259654593502508"
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="asset_id" className="text-xs">
                    {t.share?.metaAssetId || 'Asset ID (Page ID)'}
                  </Label>
                  <Input
                    id="asset_id"
                    value={metaAssetId}
                    onChange={(e) => setMetaAssetId(e.target.value)}
                    placeholder="107575752337424"
                    className="h-8 text-sm"
                  />
                </div>
                <Button
                  onClick={handleMetaBusinessShare}
                  className="w-full h-8 text-sm"
                  style={{ backgroundColor: '#1877F2', color: 'white' }}
                >
                  {t.share?.metaBusinessOpen || 'Meta Business Suite Aç'}
                </Button>
              </div>
            </div>
          )}

          {/* Platform Selection */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              {t.share?.selectPlatform || 'Platforma seçin'}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSharing = sharing === platform.id;
                
                return (
                  <Button
                    key={platform.id}
                    onClick={() => handleShare(platform.id)}
                    disabled={isSharing}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    style={{ backgroundColor: platform.color, color: 'white' }}
                  >
                    {isSharing ? (
                      <div className="animate-spin">⏳</div>
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                    <span className="text-sm font-medium">
                      {platform.name}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Manual Actions */}
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm text-muted-foreground mb-2">
              {t.share?.manualActions || 'Manual əməliyyatlar'}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="flex-1"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {t.share?.linkCopied || 'Kopyalandı!'}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    {t.share?.copyLink || 'Linki kopyala'}
                  </>
                )}
              </Button>
              
              {content.imageUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadImage}
                  className="flex-1"
                >
                  {downloaded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {t.share?.downloaded || 'Yükləndi!'}
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      {t.share?.downloadImage || 'Şəkli yüklə'}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Instructions for manual platforms */}
          {(sharing === 'instagram' || sharing === 'tiktok' || sharing === 'youtube') && (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm">
              <p className="font-medium mb-1">
                {t.share?.instructions || 'Təlimatlar:'}
              </p>
              {sharing === 'instagram' && (
                <p>{t.share?.instagramInstructions || 'Şəkli yükləyin və text-i paste edin'}</p>
              )}
              {sharing === 'tiktok' && (
                <p>{t.share?.tiktokInstructions || 'Video-nu yükləyin və text-i paste edin'}</p>
              )}
              {sharing === 'youtube' && (
                <p>{t.share?.youtubeInstructions || 'Video-nu yükləyin və description-a text-i paste edin'}</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

