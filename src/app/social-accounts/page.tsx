'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { socialAccountsAPI } from '@/lib/api';
import { 
  Facebook, 
  Instagram, 
  Loader2, 
  RefreshCw, 
  Settings, 
  Trash2,
  AlertCircle,
  CheckCircle2,
  Youtube
} from 'lucide-react';

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

interface SocialAccount {
  id: string;
  platform: string;
  platform_username: string;
  display_name: string;
  profile_picture_url?: string;
  is_active: boolean;
  last_used: string | null;
  created_at: string;
}

export default function SocialAccountsPage() {
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await socialAccountsAPI.getAccounts();
      setConnectedAccounts(response.data.results || response.data);
    } catch (error) {
      console.error('Failed to load accounts:', error);
      setError('Hesabları yükləyərkən xəta baş verdi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (platform: string) => {
    try {
      setIsConnecting(platform);
      setError(null);
      
      // Token yoxla
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('❌ Giriş tələb olunur. Zəhmət olmasa, yenidən giriş edin.');
        setIsConnecting(null);
        return;
      }
      
      // Normalize platform name for backend (ensure lowercase)
      const normalizedPlatform = platform.toLowerCase();
      
      console.log('🔗 Attempting to connect platform:', normalizedPlatform);
      console.log('📡 Full URL will be:', `/social-accounts/auth-url/${normalizedPlatform}/`);
      console.log('🔑 Token exists:', !!token);
      
      // Get OAuth URL from backend
      const response = await socialAccountsAPI.getAuthUrl(normalizedPlatform);
      
      console.log('✅ Response received:', response.data);
      
      if (!response.data?.auth_url) {
        throw new Error('Backend did not return auth_url');
      }
      
      const { auth_url } = response.data;
      console.log('🔗 Redirecting to OAuth URL:', auth_url);
      
      // Redirect to OAuth page
      window.location.href = auth_url;
    } catch (error: any) {
      console.error('❌ Failed to initiate connection:', error);
      console.error('📋 Full error object:', error);
      console.error('📋 Error response:', error.response);
      console.error('📋 Error response data:', error.response?.data);
      console.error('📋 Error response status:', error.response?.status);
      console.error('📋 Error response headers:', error.response?.headers);
      
      // Extract detailed error message
      let errorMessage = 'Əlaqə başlatmaq mümkün olmadı';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        console.log('📋 Parsing error data:', errorData);
        
        // Try multiple possible error message fields
        errorMessage = errorData.detail || 
                      errorData.error || 
                      errorData.message ||
                      (Array.isArray(errorData.non_field_errors) ? errorData.non_field_errors[0] : null) ||
                      (typeof errorData === 'string' ? errorData : null) ||
                      JSON.stringify(errorData) ||
                      `Server xətası: ${error.response.status} ${error.response.statusText}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Platform-specific error messages
      if (platform.toLowerCase() === 'linkedin') {
        if (error.response?.status === 401) {
          errorMessage = 'Giriş tələb olunur. Zəhmət olmasa, yenidən giriş edin.';
        } else if (error.response?.status === 503) {
          errorMessage = 'LinkedIn inteqrasiyası hazırda konfiqurasiya edilməyib. Backend developer ilə əlaqə saxlayın.';
        } else if (error.response?.status === 404) {
          errorMessage = 'LinkedIn endpoint tapılmadı. Backend-də `/api/social-accounts/auth-url/linkedin/` endpoint-i mövcud deyil.';
        } else if (error.response?.status === 400) {
          const backendMessage = error.response?.data?.detail || error.response?.data?.error || error.response?.data?.message;
          if (backendMessage) {
            // Backend-dən gələn spesifik mesaj
            if (backendMessage.toLowerCase().includes('not supported') || backendMessage.toLowerCase().includes('platform not supported')) {
              errorMessage = '❌ LinkedIn platforması hazırda dəstəklənmir.\n\nBackend developer ilə əlaqə saxlayın və:\n1. LinkedIn OAuth konfiqurasiyasını yoxlayın\n2. `LINKEDIN_CLIENT_ID` və `LINKEDIN_CLIENT_SECRET` environment variable-larını təyin edin\n3. Backend-də LinkedIn dəstəyini aktivləşdirin';
            } else {
              errorMessage = `LinkedIn: ${backendMessage}`;
            }
          } else {
            errorMessage = 'LinkedIn inteqrasiyası hazırda aktiv deyil. Backend tərəfində LinkedIn dəstəyinin aktiv olduğundan və `/api/social-accounts/auth-url/linkedin/` endpoint-inin mövcud olduğundan əmin olun.';
          }
        }
      } else if (error.response?.status === 401) {
        errorMessage = 'Giriş tələb olunur. Zəhmət olmasa, yenidən giriş edin.';
      } else if (error.response?.status === 503) {
        errorMessage = 'Backend xidməti hazırda mövcud deyil. Zəhmət olmasa, bir az sonra yenidən cəhd edin.';
      } else if (error.response?.status === 404) {
        errorMessage = `Endpoint tapılmadı. Backend-də '/api/social-accounts/auth-url/${platform.toLowerCase()}/' endpoint-i mövcud deyil.`;
      } else if (!error.response) {
        // Network error - server işləmir və ya qoşula bilmir
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
          errorMessage = '❌ Backend server-ə qoşula bilmədi.\n\nOla bilər ki:\n1. Backend server işləmir\n2. DigitalOcean-da ödəniş problemi var\n3. Server suspend olunub\n\nZəhmət olmasa, backend server status-unu yoxlayın və DigitalOcean-da ödənişi təsdiqləyin.';
        } else {
          errorMessage = 'Network xətası. Backend server-ə qoşula bilmədi. Zəhmət olmasa, internet əlaqənizi yoxlayın.';
        }
      }
      
      console.error('💬 Final error message:', errorMessage);
      setError(errorMessage);
      setIsConnecting(null);
    }
  };

  const handleDisconnect = async (accountId: string, platform: string) => {
    if (!confirm(`${platform} hesabını ayırmaq istədiyinizdən əminsiniz?`)) return;
    
    try {
      await socialAccountsAPI.disconnectAccount(accountId);
      setSuccess('Hesab uğurla ayrıldı');
      loadAccounts();
    } catch (error) {
      console.error('Failed to disconnect account:', error);
      setError('Hesabı ayırmaq mümkün olmadı');
    }
  };

  const getPlatformInfo = (platform: string) => {
    const platforms: Record<string, any> = {
      facebook: {
        name: 'Facebook',
        icon: <Facebook className="w-5 h-5" />,
        color: 'bg-blue-600',
        description: 'Səhifələrə və qruplara paylaşım'
      },
      instagram: {
        name: 'Instagram',
        icon: <Instagram className="w-5 h-5" />,
        color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
        description: 'Şəkil və hekayə paylaşın'
      },
      linkedin: {
        name: 'LinkedIn',
        icon: <LinkedInIcon className="w-5 h-5" />,
        color: 'bg-[#0077b5]',
        description: 'Peşəkar şəbəkə və biznes paylaşımları'
      },
      youtube: {
        name: 'YouTube',
        icon: <Youtube className="w-5 h-5" />,
        color: 'bg-[#FF0000]',
        description: 'Video paylaşımı və kanal idarəetməsi'
      },
      tiktok: {
        name: 'TikTok',
        icon: <TikTokIcon className="w-5 h-5" />,
        color: 'bg-black',
        description: 'Qısa video paylaşımı'
      }
    };
    return platforms[platform] || {
      name: platform,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'bg-gray-600',
      description: ''
    };
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Heç vaxt';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('az-AZ', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Available platforms to connect
  const availablePlatforms = [
    {
      key: 'facebook',
      name: 'Facebook',
      description: 'Səhifələrə və qruplara paylaşım',
      icon: <Facebook className="w-6 h-6" />,
      color: 'bg-blue-600',
      available: true
    },
    {
      key: 'instagram',
      name: 'Instagram',
      description: 'Şəkil və hekayə paylaşın',
      icon: <Instagram className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
      available: true
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      description: 'Peşəkar şəbəkə və biznes paylaşımları',
      icon: <LinkedInIcon className="w-6 h-6" />,
      color: 'bg-[#0077b5]',
      available: true
    },
    {
      key: 'youtube',
      name: 'YouTube',
      description: 'Video paylaşımı və kanal idarəetməsi',
      icon: <Youtube className="w-6 h-6" />,
      color: 'bg-[#FF0000]',
      available: true
    },
    {
      key: 'tiktok',
      name: 'TikTok',
      description: 'Qısa video paylaşımı',
      icon: <TikTokIcon className="w-6 h-6" />,
      color: 'bg-black',
      available: true
    }
  ];

  return (
    <DashboardLayout 
      title="Sosial Hesablar"
      description="Sosial media hesablarınızı əlaqələndirin və idarə edin"
    >
      <div className="space-y-6">
        {/* Alerts */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="bg-green-50 text-green-900 border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Connected Accounts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Əlaqələndirilmiş Hesablar</h2>
            <Button variant="outline" onClick={loadAccounts} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Yenilə
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Yüklənir...</span>
            </div>
          ) : connectedAccounts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {connectedAccounts.map((account) => {
                const platformInfo = getPlatformInfo(account.platform);
                return (
                  <Card key={account.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full ${platformInfo.color} flex items-center justify-center text-white`}>
                            {platformInfo.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{platformInfo.name}</CardTitle>
                            <CardDescription className="text-sm">
                              @{account.platform_username}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={account.is_active ? "default" : "secondary"} className="bg-green-500">
                          {account.is_active ? "Aktiv" : "Qeyri-aktiv"}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Ad:</span>
                          <span className="font-medium">{account.display_name}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Son İstifadə:</span>
                          <span className="font-medium text-xs">{formatDate(account.last_used)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Əlavə Edilib:</span>
                          <span className="font-medium text-xs">{formatDate(account.created_at)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-3 border-t">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleDisconnect(account.id, platformInfo.name)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Ayır
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="text-center py-16">
              <CardContent>
                <div className="text-6xl mb-4">🔗</div>
                <h3 className="text-xl font-semibold mb-2">Hesab əlaqələndirilməyib</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Məzmununuzu idarə etməyə başlamaq üçün sosial media hesablarınızı əlaqələndirin
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Available Platforms */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Mövcud Platformalar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availablePlatforms.map((platform) => {
              const isConnected = connectedAccounts.some(a => a.platform === platform.key);
              return (
                <Card key={platform.key} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-full ${platform.color} flex items-center justify-center text-white`}>
                        {platform.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {platform.name}
                          {isConnected && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Əlaqəli
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{platform.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Button 
                      className="w-full" 
                      disabled={!platform.available || isConnecting === platform.key}
                      onClick={() => handleConnect(platform.key)}
                      variant={isConnected ? "outline" : "default"}
                    >
                      {isConnecting === platform.key ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Əlaqələndirilir...
                        </>
                      ) : isConnected ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Yenidən Əlaqələndir
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Əlaqələndir
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Connection Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Əlaqələndirmə Təlimatı</CardTitle>
            <CardDescription>
              Sosial media hesablarınızı necə əlaqələndirmək olar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Platforma Seçin</h4>
                  <p className="text-sm text-muted-foreground">
                    Yuxarıdakı mövcud variantlardan əlaqələndirmək istədiyiniz sosial media platformasını seçin.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">İcazə Verin</h4>
                  <p className="text-sm text-muted-foreground">
                    Platformanın icazə səhifəsinə yönləndiriləcəksiniz. Timera-ya məzmununuzu idarə etmək üçün icazə verin.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Yaratmağa Başlayın</h4>
                  <p className="text-sm text-muted-foreground">
                    Əlaqələndirdikdən sonra sosial media hesablarınız üçün paylaşım yaratmağa və planlaşdırmağa başlaya bilərsiniz.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}





