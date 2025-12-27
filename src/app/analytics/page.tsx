'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { metaAnalyticsAPI, metaAdsAPI, postsAPI } from '@/lib/api';
import { 
  TrendingUp,
  Eye,
  MousePointerClick,
  DollarSign,
  Users,
  Loader2,
  Download,
  Calendar,
  BarChart3,
  AlertCircle,
  Facebook,
  Info,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
  RefreshCw,
  Target
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface InsightData {
  impressions?: number;
  reach?: number;
  clicks?: number;
  spend?: number;
  cpm?: number;
  cpc?: number;
  ctr?: number;
  conversions?: number;
  date_start?: string;
  date_stop?: string;
}

interface AdAccount {
  account_id: string;
  name: string;
  currency: string;
  status: string;
}

interface PostPerformance {
  id: string;
  post_platform: string;
  platform: string;
  post_title: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  impressions: number;
  engagement_rate: number | null;
  link_clicks: number;
  last_fetched_at: string | null;
}

interface PostPerformanceSummary {
  total_posts: number;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  total_reach: number;
  total_impressions: number;
  average_engagement_rate: number | null;
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [datePreset, setDatePreset] = useState('last_7d');
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [accountId, setAccountId] = useState<string>('');
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
  const t = useTranslation();
  
  // Post Performance states
  const [postPerformances, setPostPerformances] = useState<PostPerformance[]>([]);
  const [postPerformanceSummary, setPostPerformanceSummary] = useState<PostPerformanceSummary | null>(null);
  const [isLoadingPostPerformance, setIsLoadingPostPerformance] = useState(false);
  const [isUpdatingPerformance, setIsUpdatingPerformance] = useState(false);

  useEffect(() => {
    loadAdAccounts();
    loadPostPerformance();
  }, []);

  useEffect(() => {
    if (accountId) {
      loadInsights();
    }
  }, [datePreset, accountId]);

  const loadAdAccounts = async () => {
    try {
      setIsLoadingAccounts(true);
      const response = await metaAdsAPI.getAdAccounts();
      const accounts = response.data.results || response.data || [];
      setAdAccounts(accounts);
      
      // Auto-select first account if available
      if (accounts.length > 0 && !accountId) {
        setAccountId(accounts[0].account_id);
      }
    } catch (err: any) {
      console.error('Failed to load ad accounts:', err);
      setError('Reklam hesabları yüklənə bilmədi. Zəhmət olmasa, Meta Ads hesabınızı qoşun.');
    } finally {
      setIsLoadingAccounts(false);
    }
  };

  const loadInsights = async () => {
    if (!accountId) {
      setError('Zəhmət olmasa, bir reklam hesabı seçin.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const params: any = {
        account_id: accountId,
        date_preset: datePreset
      };

      const response = await metaAnalyticsAPI.getInsights(params);
      
      // Handle different response formats
      const data = response.data.data?.[0] || response.data || {};
      setInsights(data);
    } catch (err: any) {
      console.error('Failed to load insights:', err);
      
      // Get more specific error message
      let errorMessage = 'Analitika məlumatları yüklənə bilmədi.';
      
      if (err.response?.status === 400) {
        const errorData = err.response?.data;
        if (errorData?.error) {
          errorMessage = `Xəta: ${errorData.error}`;
          if (errorData.error.includes('account_id') || errorData.error.includes('required')) {
            errorMessage = 'Reklam hesabı seçilməyib. Zəhmət olmasa, bir reklam hesabı seçin.';
          }
        } else if (errorData?.detail) {
          errorMessage = `Xəta: ${errorData.detail}`;
        } else {
          errorMessage = 'Yanlış parametrlər göndərildi. Zəhmət olmasa, düzgün hesab ID-si seçdiyinizdən əmin olun.';
        }
      } else if (err.response?.status === 401) {
        errorMessage = 'Meta Ads hesabınız bağlı deyil və ya token müddəti bitib. Zəhmət olmasa, hesabınızı yenidən qoşun: Meta Ads səhifəsinə gedin və "Meta Ads Hesabı Qoş" düyməsinə klikləyin.';
      } else if (err.response?.status === 404) {
        errorMessage = 'Meta Analytics API endpoint tapılmadı. Zəhmət olmasa, backend konfiqurasiyasını yoxlayın.';
      } else if (err.response?.status === 500) {
        errorMessage = 'Server xətası. Meta API ilə əlaqə qurula bilmədi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
      setInsights(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (num?: number) => {
    if (!num) return '$0.00';
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (num?: number | null) => {
    if (!num && num !== 0) return '0%';
    return `${num.toFixed(2)}%`;
  };

  const loadPostPerformance = async () => {
    try {
      setIsLoadingPostPerformance(true);
      const response = await postsAPI.getAllPostPerformance();
      setPostPerformances(response.data.performances || []);
      setPostPerformanceSummary(response.data.summary || null);
    } catch (err: any) {
      console.error('Failed to load post performance:', err);
      // Don't show error for post performance, it's optional
    } finally {
      setIsLoadingPostPerformance(false);
    }
  };

  const updatePostPerformance = async (postId?: string) => {
    try {
      setIsUpdatingPerformance(true);
      if (postId) {
        await postsAPI.updatePostPerformance(postId);
      } else {
        // Update all posts
        for (const perf of postPerformances) {
          if (perf.post_platform) {
            try {
              await postsAPI.updatePostPerformance(perf.post_platform);
            } catch (err) {
              console.error(`Failed to update performance for post ${perf.post_platform}:`, err);
            }
          }
        }
      }
      // Reload performance data
      await loadPostPerformance();
    } catch (err: any) {
      console.error('Failed to update post performance:', err);
      setError('Post performans metrikləri yenilənə bilmədi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.');
    } finally {
      setIsUpdatingPerformance(false);
    }
  };

  return (
    <DashboardLayout 
      title={t.analytics.title}
      description={t.analytics.description}
    >
      <div className="space-y-6">
        {/* Info Card - How it works */}
        <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-900 dark:text-blue-100">
            <strong>Analytics necə işləyir?</strong>
            <br />
            <span className="text-sm mt-1 block">
              Meta Ads Analytics, reklam hesablarınızın performansını izləmək üçün Meta Marketing API-dən məlumat çəkir. 
              İstifadə etmək üçün: 1) Meta Ads hesabınızı qoşun (Meta Ads səhifəsindən), 2) Aşağıdan bir reklam hesabı seçin, 3) Tarix aralığını seçin və məlumatları görün.
            </span>
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Ad Account Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Facebook className="w-5 h-5 mr-2" />
              Reklam Hesabı Seçin
            </CardTitle>
            <CardDescription>
              Analitika məlumatlarını görmək istədiyiniz reklam hesabını seçin
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingAccounts ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Reklam hesabları yüklənir...</span>
              </div>
            ) : adAccounts.length === 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Heç bir reklam hesabı tapılmadı. Meta Ads hesabınızı qoşmaq üçün:
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/meta-ads'}
                  className="w-full sm:w-auto"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Meta Ads Səhifəsinə Get
                </Button>
              </div>
            ) : (
              <Select value={accountId} onValueChange={setAccountId}>
                <SelectTrigger className="w-full sm:w-[400px]">
                  <SelectValue placeholder="Reklam hesabı seçin" />
                </SelectTrigger>
                <SelectContent>
                  {adAccounts.map((account) => (
                    <SelectItem key={account.account_id} value={account.account_id}>
                      {account.name} ({account.account_id}) - {account.currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>

        {/* Date Range Selector */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Tarix Aralığı
                </CardTitle>
                <CardDescription>
                  Analitika məlumatları üçün tarix aralığını seçin
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={datePreset} onValueChange={setDatePreset} disabled={!accountId}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Bu gün</SelectItem>
                    <SelectItem value="yesterday">Dünən</SelectItem>
                    <SelectItem value="last_7d">Son 7 gün</SelectItem>
                    <SelectItem value="last_14d">Son 14 gün</SelectItem>
                    <SelectItem value="last_28d">Son 28 gün</SelectItem>
                    <SelectItem value="last_30d">Son 30 gün</SelectItem>
                    <SelectItem value="last_90d">Son 90 gün</SelectItem>
                    <SelectItem value="this_month">Bu ay</SelectItem>
                    <SelectItem value="last_month">Keçən ay</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={loadInsights} 
                  variant="outline" 
                  size="sm"
                  disabled={!accountId || isLoading}
                >
                  <Loader2 className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Yenilə
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Göstərilmə (Impressions)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{formatNumber(insights?.impressions)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {insights?.date_start && insights?.date_stop && 
                      `${new Date(insights.date_start).toLocaleDateString('az-AZ')} - ${new Date(insights.date_stop).toLocaleDateString('az-AZ')}`
                    }
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Çatış (Reach)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{formatNumber(insights?.reach)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unikal istifadəçilər
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <MousePointerClick className="w-4 h-4 mr-2" />
                Kliklər (Clicks)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{formatNumber(insights?.clicks)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    CTR: {formatPercentage(insights?.ctr)}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Xərclənmiş Məbləğ (Spend)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{formatCurrency(insights?.spend)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    CPM: {formatCurrency(insights?.cpm)} | CPC: {formatCurrency(insights?.cpc)}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Ümumi Baxış</TabsTrigger>
            <TabsTrigger value="performance">Performans</TabsTrigger>
            <TabsTrigger value="post-performance">Post Performansı</TabsTrigger>
            <TabsTrigger value="reports">Hesabatlar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performans Metrikaları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">CPM (1000 görüntüləməyə görə xərc):</span>
                        <span className="font-semibold">{formatCurrency(insights?.cpm)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">CPC (Klik başına xərc):</span>
                        <span className="font-semibold">{formatCurrency(insights?.cpc)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">CTR (Klik dərəcəsi):</span>
                        <span className="font-semibold">{formatPercentage(insights?.ctr)}</span>
                      </div>
                      {insights?.conversions && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Konversiyalar:</span>
                          <span className="font-semibold">{formatNumber(insights.conversions)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Xərclər və Nəticələr
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Ümumi Xərc</span>
                          <span className="font-semibold text-lg">{formatCurrency(insights?.spend)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: insights?.spend ? `${Math.min((insights.spend / 1000) * 100, 100)}%` : '0%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Ümumi Kliklər</span>
                          <span className="font-semibold text-lg">{formatNumber(insights?.clicks)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: insights?.clicks ? `${Math.min((insights.clicks / 10000) * 100, 100)}%` : '0%' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detallı Performans</CardTitle>
                <CardDescription>
                  Reklamlarınızın ətraflı performans göstəriciləri
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Detallı performans qrafikləri tezliklə əlavə olunacaq
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="post-performance" className="space-y-4">
            {/* Summary Card */}
            {postPerformanceSummary && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      Ümumi Bəyənmələr
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(postPerformanceSummary.total_likes)}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {postPerformanceSummary.total_posts} post üzrə
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ümumi Şərhlər
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(postPerformanceSummary.total_comments)}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {postPerformanceSummary.total_posts} post üzrə
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <Share2 className="w-4 h-4 mr-2" />
                      Ümumi Paylaşımlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(postPerformanceSummary.total_shares)}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {postPerformanceSummary.total_posts} post üzrə
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Orta Engagement Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercentage(postPerformanceSummary.average_engagement_rate)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {postPerformanceSummary.total_posts} post üzrə
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Summary Stats */}
            {postPerformanceSummary && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Ümumi Statistika</CardTitle>
                      <CardDescription>
                        Bütün postlarınızın ümumi performans göstəriciləri
                      </CardDescription>
                    </div>
                    <Button 
                      onClick={() => updatePostPerformance()} 
                      variant="outline" 
                      size="sm"
                      disabled={isUpdatingPerformance}
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isUpdatingPerformance ? 'animate-spin' : ''}`} />
                      Bütün Metrikləri Yenilə
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Ümumi Çatış</p>
                      <p className="text-2xl font-bold">{formatNumber(postPerformanceSummary.total_reach)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ümumi Göstərilmə</p>
                      <p className="text-2xl font-bold">{formatNumber(postPerformanceSummary.total_impressions)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ümumi Postlar</p>
                      <p className="text-2xl font-bold">{postPerformanceSummary.total_posts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Orta Engagement Rate</p>
                      <p className="text-2xl font-bold">
                        {formatPercentage(postPerformanceSummary.average_engagement_rate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Individual Post Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Post Performansları</CardTitle>
                <CardDescription>
                  Hər bir postun platforma görə performans metrikləri
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingPostPerformance ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : postPerformances.length === 0 ? (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Hələ heç bir post performans metrikləri yoxdur.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Postlarınızı paylaşdıqdan sonra metrikləri yeniləmək üçün "Bütün Metrikləri Yenilə" düyməsinə klikləyin.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {postPerformances.map((perf) => (
                      <Card key={perf.id} className="border">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-base">{perf.post_title || 'Başlıqsız Post'}</CardTitle>
                              <CardDescription className="mt-1">
                                <Badge variant="outline" className="mr-2">{perf.platform}</Badge>
                                {perf.last_fetched_at && (
                                  <span className="text-xs">
                                    Son yenilənmə: {new Date(perf.last_fetched_at).toLocaleString('az-AZ')}
                                  </span>
                                )}
                              </CardDescription>
                            </div>
                            <Button
                              onClick={() => updatePostPerformance(perf.post_platform)}
                              variant="ghost"
                              size="sm"
                              disabled={isUpdatingPerformance}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Bəyənmələr</p>
                              <p className="text-lg font-semibold">{formatNumber(perf.likes)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Şərhlər</p>
                              <p className="text-lg font-semibold">{formatNumber(perf.comments)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Paylaşımlar</p>
                              <p className="text-lg font-semibold">{formatNumber(perf.shares)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Çatış</p>
                              <p className="text-lg font-semibold">{formatNumber(perf.reach)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Göstərilmə</p>
                              <p className="text-lg font-semibold">{formatNumber(perf.impressions)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Engagement Rate</p>
                              <p className="text-lg font-semibold">{formatPercentage(perf.engagement_rate)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hesabatlar</CardTitle>
                <CardDescription>
                  Analitika hesabatlarını yükləyin və ya yaradın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    CSV Yüklə
                  </Button>
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Yeni Hesabat Yarad
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}








