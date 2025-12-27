'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { metaAdsAPI, socialAccountsAPI } from '@/lib/api';
import { 
  Facebook, 
  Loader2, 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2,
  TrendingUp,
  Eye,
  MousePointerClick,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface AdAccount {
  id: string;
  name: string;
  account_id: string;
  currency: string;
  timezone: string;
  status: string;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: number;
  lifetime_budget?: number;
  start_time?: string;
  end_time?: string;
  created_time?: string;
  updated_time?: string;
}

interface AdSet {
  id: string;
  name: string;
  campaign_id: string;
  status: string;
  daily_budget?: number;
  lifetime_budget?: number;
  billing_event: string;
  optimization_goal: string;
  targeting?: any;
}

interface Ad {
  id: string;
  name: string;
  ad_set_id: string;
  status: string;
  creative?: any;
  created_time?: string;
}

export default function MetaAdsPage() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [adSets, setAdSets] = useState<AdSet[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const t = useTranslation();
  
  // Action states
  const [actionLoading, setActionLoading] = useState<{[key: string]: boolean}>({});

  const [hasFacebookAccount, setHasFacebookAccount] = useState(false);

  useEffect(() => {
    checkFacebookAccount();
    loadAdAccounts();
    loadCampaigns();
  }, []);

  const checkFacebookAccount = async () => {
    try {
      const response = await socialAccountsAPI.getAccounts();
      const accounts = response.data.results || response.data || [];
      const facebookAccount = accounts.find((acc: any) => acc.platform === 'facebook' && acc.is_active);
      setHasFacebookAccount(!!facebookAccount);
    } catch (err) {
      console.error('Failed to check Facebook account:', err);
      setHasFacebookAccount(false);
    }
  };

  const loadAdAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await metaAdsAPI.getAdAccounts();
      setAdAccounts(response.data.results || response.data || []);
    } catch (err: any) {
      console.error('Failed to load ad accounts:', err);
      setError('Reklam hesabları yüklənə bilmədi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectAdAccount = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get OAuth URL
      const response = await metaAdsAPI.getConnectAdAccountUrl();
      const authUrl = response.data.auth_url;
      
      // Redirect to Meta OAuth
      window.location.href = authUrl;
    } catch (err: any) {
      console.error('Failed to get OAuth URL:', err);
      setError(err.response?.data?.error || 'Meta Ads hesabı qoşula bilmədi');
      setIsLoading(false);
    }
  };

  const handleSyncAdAccounts = async () => {
    // Check if Facebook account is connected first
    if (!hasFacebookAccount) {
      setError('Facebook hesabı bağlı deyil. Əvvəlcə Facebook hesabınızı Sosial Hesablar səhifəsindən qoşun.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await metaAdsAPI.syncAdAccounts();
      await loadAdAccounts();
      
      if (response.data.created || response.data.updated) {
        alert(`✅ ${response.data.created || 0} yeni hesab əlavə edildi, ${response.data.updated || 0} hesab yeniləndi`);
      } else {
        alert('ℹ️ Yeni hesab tapılmadı. Bütün hesablar artıq sinxronlaşdırılıb.');
      }
    } catch (err: any) {
      console.error('Failed to sync ad accounts:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Hesablar sinxronlaşdırıla bilmədi';
      
      if (errorMessage.includes('Facebook hesabı bağlı deyil') || errorMessage.includes('Facebook account')) {
        setError('Facebook hesabı bağlı deyil. Əvvəlcə Facebook hesabınızı Sosial Hesablar səhifəsindən qoşun.');
      } else if (err.response?.status === 405) {
        setError('Server xətası: Bu əməliyyat hazırda mövcud deyil. Zəhmət olmasa, Meta Ads hesabınızı "Meta Ads Hesabı Qoş" düyməsi ilə qoşun.');
      } else if (err.response?.status === 400 || errorMessage.includes('permission') || errorMessage.includes('ads_management')) {
        // Facebook hesabı var ama Meta Ads izinleri yok
        setError('Facebook hesabınız bağlıdır, lakin Meta Ads izinləri yoxdur. Meta Ads hesablarını qoşmaq üçün "Meta Ads Hesabı Qoş" düyməsinə klikləyin və Meta Ads izinlərini verin.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadCampaigns = async () => {
    try {
      setIsLoading(true);
      const response = await metaAdsAPI.getCampaigns();
      setCampaigns(response.data.results || response.data || []);
    } catch (err: any) {
      console.error('Failed to load campaigns:', err);
      setError('Kampaniyalar yüklənə bilmədi');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAdSets = async (campaignId?: string) => {
    try {
      setIsLoading(true);
      const response = await metaAdsAPI.getAdSets(campaignId);
      setAdSets(response.data.results || response.data || []);
    } catch (err: any) {
      console.error('Failed to load ad sets:', err);
      setError('Reklam qrupları yüklənə bilmədi');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAds = async (adSetId?: string) => {
    try {
      setIsLoading(true);
      const response = await metaAdsAPI.getAds(adSetId);
      setAds(response.data.results || response.data || []);
    } catch (err: any) {
      console.error('Failed to load ads:', err);
      setError('Reklamlar yüklənə bilmədi');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePauseCampaign = async (campaignId: string) => {
    try {
      setActionLoading(prev => ({ ...prev, [`campaign-${campaignId}`]: true }));
      await metaAdsAPI.pauseCampaign(campaignId);
      await loadCampaigns();
      alert('✅ Kampaniya dayandırıldı');
    } catch (err: any) {
      alert(`❌ Xəta: ${err.response?.data?.error || err.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [`campaign-${campaignId}`]: false }));
    }
  };

  const handleResumeCampaign = async (campaignId: string) => {
    try {
      setActionLoading(prev => ({ ...prev, [`campaign-${campaignId}`]: true }));
      await metaAdsAPI.resumeCampaign(campaignId);
      await loadCampaigns();
      alert('✅ Kampaniya davam etdirildi');
    } catch (err: any) {
      alert(`❌ Xəta: ${err.response?.data?.error || err.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [`campaign-${campaignId}`]: false }));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: {[key: string]: {variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string}} = {
      'ACTIVE': { variant: 'default', label: 'Aktiv' },
      'PAUSED': { variant: 'secondary', label: 'Dayandırılıb' },
      'ARCHIVED': { variant: 'outline', label: 'Arxivləşdirilib' },
      'DELETED': { variant: 'destructive', label: 'Silinib' },
    };
    
    const statusInfo = statusMap[status] || { variant: 'secondary' as const, label: status };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <DashboardLayout 
      title={t.metaAds.title}
      description={t.metaAds.description}
    >
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Ad Accounts Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Facebook className="w-5 h-5 mr-2" />
                  Reklam Hesabları
                </CardTitle>
                <CardDescription>
                  Qoşulmuş Meta reklam hesablarınız
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {hasFacebookAccount && (
                  <Button onClick={handleSyncAdAccounts} variant="outline" size="sm" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    )}
                    Sinxronlaşdır
                  </Button>
                )}
                <Button onClick={handleConnectAdAccount} size="sm" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Yeni Hesab Qoş
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {adAccounts.length === 0 ? (
              <div className="text-center py-8">
                <Facebook className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Hələ heç bir reklam hesabı qoşulmayıb</p>
                <div className="flex items-center justify-center gap-3">
                  <Button onClick={handleConnectAdAccount} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Meta Ads Hesabı Qoş
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
                  {hasFacebookAccount ? (
                    <>
                      Facebook hesabınız bağlıdır. Meta Ads hesablarını qoşmaq üçün iki yol var:
                      <br />
                      <br />
                      <strong>1. Sinxronlaşdır:</strong> Mevcut Facebook token'ı ilə ad account'ları yükləyə bilərsiniz (Meta Ads izinləri lazımdır).
                      <br />
                      <br />
                      <strong>2. Meta Ads Hesabı Qoş:</strong> Meta Ads üçün özel izinlərlə yeni bağlantı qurun (tövsiyə olunur).
                    </>
                  ) : (
                    <>
                      Meta Ads hesabınızı qoşmaq üçün "Meta Ads Hesabı Qoş" düyməsinə klikləyin və Facebook OAuth ilə giriş edin.
                      <br />
                      <span className="text-amber-600 dark:text-amber-400 font-medium block mt-2">
                        ⚠️ Qeyd: Meta Ads hesablarını qoşmaq üçün əvvəlcə Facebook hesabınızı Sosial Hesablar səhifəsindən qoşmalısınız.
                      </span>
                    </>
                  )}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adAccounts.map((account) => (
                  <Card key={account.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>ID: {account.account_id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Valyuta:</span>
                          <span className="text-sm font-medium">{account.currency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          {getStatusBadge(account.status)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns" onClick={() => { loadCampaigns(); setActiveTab('campaigns'); }}>
              Kampaniyalar
            </TabsTrigger>
            <TabsTrigger value="ad-sets" onClick={() => { loadAdSets(); setActiveTab('ad-sets'); }}>
              Reklam Qrupları
            </TabsTrigger>
            <TabsTrigger value="ads" onClick={() => { loadAds(); setActiveTab('ads'); }}>
              Reklamlar
            </TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Kampaniyalar</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Kampaniya
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : campaigns.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Hələ heç bir kampaniya yoxdur</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    İlk Kampaniyanı Yarat
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{campaign.name}</CardTitle>
                          <CardDescription className="mt-1">
                            Məqsəd: {campaign.objective}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(campaign.status)}
                          {campaign.status === 'ACTIVE' ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePauseCampaign(campaign.id)}
                              disabled={actionLoading[`campaign-${campaign.id}`]}
                            >
                              {actionLoading[`campaign-${campaign.id}`] ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Pause className="w-4 h-4" />
                              )}
                            </Button>
                          ) : campaign.status === 'PAUSED' ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleResumeCampaign(campaign.id)}
                              disabled={actionLoading[`campaign-${campaign.id}`]}
                            >
                              {actionLoading[`campaign-${campaign.id}`] ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                          ) : null}
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {campaign.daily_budget && (
                          <div>
                            <span className="text-muted-foreground">Günlük büdcə:</span>
                            <p className="font-medium">${campaign.daily_budget.toLocaleString()}</p>
                          </div>
                        )}
                        {campaign.lifetime_budget && (
                          <div>
                            <span className="text-muted-foreground">Ümumi büdcə:</span>
                            <p className="font-medium">${campaign.lifetime_budget.toLocaleString()}</p>
                          </div>
                        )}
                        {campaign.start_time && (
                          <div>
                            <span className="text-muted-foreground">Başlanğıc:</span>
                            <p className="font-medium">{new Date(campaign.start_time).toLocaleDateString('az-AZ')}</p>
                          </div>
                        )}
                        {campaign.end_time && (
                          <div>
                            <span className="text-muted-foreground">Bitmə:</span>
                            <p className="font-medium">{new Date(campaign.end_time).toLocaleDateString('az-AZ')}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Ad Sets Tab */}
          <TabsContent value="ad-sets" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Reklam Qrupları</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Reklam Qrupu
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : adSets.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Hələ heç bir reklam qrupu yoxdur</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    İlk Reklam Qrupunu Yarat
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {adSets.map((adSet) => (
                  <Card key={adSet.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{adSet.name}</CardTitle>
                          <CardDescription className="mt-1">
                            Optimallaşdırma: {adSet.optimization_goal}
                          </CardDescription>
                        </div>
                        {getStatusBadge(adSet.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        {adSet.daily_budget && (
                          <div>
                            <span className="text-muted-foreground">Günlük büdcə:</span>
                            <p className="font-medium">${adSet.daily_budget.toLocaleString()}</p>
                          </div>
                        )}
                        {adSet.lifetime_budget && (
                          <div>
                            <span className="text-muted-foreground">Ümumi büdcə:</span>
                            <p className="font-medium">${adSet.lifetime_budget.toLocaleString()}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Ödəniş:</span>
                          <p className="font-medium">{adSet.billing_event}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Ads Tab */}
          <TabsContent value="ads" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Reklamlar</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Reklam
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : ads.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Hələ heç bir reklam yoxdur</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    İlk Reklamı Yarat
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ads.map((ad) => (
                  <Card key={ad.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{ad.name}</CardTitle>
                        {getStatusBadge(ad.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {ad.created_time && (
                        <p className="text-sm text-muted-foreground">
                          Yaradılıb: {new Date(ad.created_time).toLocaleDateString('az-AZ')}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

