'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { metaAdsAPI, socialAccountsAPI } from '@/lib/api';
import { 
  Facebook, 
  Loader2, 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Demo mode - internal demo only
const DEMO_MODE_AVAILABLE = true;

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
  isDemo?: boolean;
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
  isDemo?: boolean;
}

interface Ad {
  id: string;
  name: string;
  ad_set_id: string;
  status: string;
  creative?: any;
  created_time?: string;
  isDemo?: boolean;
}

// Demo data
const DEMO_CAMPAIGNS: Campaign[] = [
  {
    id: 'DEMO_CAMP_001',
    name: 'Summer Sale Campaign (Demo)',
    status: 'ACTIVE (Demo)',
    objective: 'CONVERSIONS',
    daily_budget: 50,
    start_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isDemo: true,
  },
  {
    id: 'DEMO_CAMP_002',
    name: 'Brand Awareness Campaign (Demo)',
    status: 'PAUSED (Demo)',
    objective: 'BRAND_AWARENESS',
    lifetime_budget: 500,
    start_time: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    isDemo: true,
  },
];

const DEMO_ADSETS: AdSet[] = [
  {
    id: 'DEMO_ADSET_001',
    name: 'Adset 1 - Age 25-35 (Demo)',
    campaign_id: 'DEMO_CAMP_001',
    status: 'ACTIVE (Demo)',
    daily_budget: 25,
    billing_event: 'IMPRESSIONS',
    optimization_goal: 'REACH',
    isDemo: true,
  },
];

const DEMO_ADS: Ad[] = [
  {
    id: 'DEMO_AD_001',
    name: 'Summer Sale - Creative 1 (Demo)',
    ad_set_id: 'DEMO_ADSET_001',
    status: 'ACTIVE (Demo)',
    created_time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isDemo: true,
  },
];

export default function MetaAdsManagerPage() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [adSets, setAdSets] = useState<AdSet[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  
  // Demo mode toggle
  const [demoMode, setDemoMode] = useState(false);
  
  // CRUD is not ready - show disabled state
  const [crudReady, setCrudReady] = useState(false);
  
  const { language } = useLanguage();
  const isEng = language === 'eng';
  const isRus = language === 'rus';

  const [hasFacebookAccount, setHasFacebookAccount] = useState(false);

  useEffect(() => {
    checkFacebookAccount();
    loadAdAccounts();
    if (!demoMode && crudReady) {
      loadCampaigns();
    } else if (demoMode) {
      setCampaigns(DEMO_CAMPAIGNS);
      setAdSets(DEMO_ADSETS);
      setAds(DEMO_ADS);
    }
  }, [demoMode, crudReady]);

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
      setError(
        isEng 
          ? 'Failed to load ad accounts' 
          : isRus 
          ? 'Не удалось загрузить рекламные аккаунты' 
          : 'Reklam hesabları yüklənə bilmədi'
      );
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
      setError(
        err.response?.data?.error || 
        (isEng 
          ? 'Failed to connect Meta Ads account' 
          : isRus 
          ? 'Не удалось подключить рекламный аккаунт Meta' 
          : 'Meta Ads hesabı qoşula bilmədi')
      );
      setIsLoading(false);
    }
  };

  const handleSyncAdAccounts = async () => {
    if (!hasFacebookAccount) {
      setError(
        isEng 
          ? 'Facebook account is not connected. Please connect your Facebook account from Social Accounts page first.' 
          : isRus 
          ? 'Аккаунт Facebook не подключен. Сначала подключите аккаунт Facebook на странице социальных аккаунтов.' 
          : 'Facebook hesabı bağlı deyil. Əvvəlcə Facebook hesabınızı Sosial Hesablar səhifəsindən qoşun.'
      );
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await metaAdsAPI.syncAdAccounts();
      await loadAdAccounts();
      
      if (response.data.created || response.data.updated) {
        alert(`✅ ${response.data.created || 0} ${isEng ? 'new accounts added' : isRus ? 'новых аккаунтов добавлено' : 'yeni hesab əlavə edildi'}, ${response.data.updated || 0} ${isEng ? 'accounts updated' : isRus ? 'аккаунтов обновлено' : 'hesab yeniləndi'}`);
      } else {
        alert(isEng ? 'ℹ️ No new accounts found. All accounts are already synced.' : isRus ? 'ℹ️ Новых аккаунтов не найдено. Все аккаунты уже синхронизированы.' : 'ℹ️ Yeni hesab tapılmadı. Bütün hesablar artıq sinxronlaşdırılıb.');
      }
    } catch (err: any) {
      console.error('Failed to sync ad accounts:', err);
      const errorMessage = err.response?.data?.error || err.message || (isEng ? 'Failed to sync accounts' : isRus ? 'Не удалось синхронизировать аккаунты' : 'Hesablar sinxronlaşdırıla bilmədi');
      setError(errorMessage);
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
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const isDemo = status.includes('Demo');
    const statusMap: {[key: string]: {variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string}} = {
      'ACTIVE': { variant: 'default', label: isEng ? 'Active' : isRus ? 'Активна' : 'Aktiv' },
      'PAUSED': { variant: 'secondary', label: isEng ? 'Paused' : isRus ? 'Приостановлена' : 'Dayandırılıb' },
      'ARCHIVED': { variant: 'outline', label: isEng ? 'Archived' : isRus ? 'Архивирована' : 'Arxivləşdirilib' },
      'DELETED': { variant: 'destructive', label: isEng ? 'Deleted' : isRus ? 'Удалена' : 'Silinib' },
      'ACTIVE (Demo)': { variant: 'default', label: isEng ? 'Active (Demo)' : isRus ? 'Активна (Демо)' : 'Aktiv (Demo)' },
      'PAUSED (Demo)': { variant: 'secondary', label: isEng ? 'Paused (Demo)' : isRus ? 'Приостановлена (Демо)' : 'Dayandırılıb (Demo)' },
    };
    
    const statusInfo = statusMap[status] || { variant: 'secondary' as const, label: status };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const isDisabled = !crudReady && !demoMode;

  return (
    <DashboardLayout 
      title={isEng ? 'Meta Ads Manager' : isRus ? 'Менеджер Meta Ads' : 'Meta Ads İdarəçisi'}
      description={isEng ? 'Create and manage Meta ad campaigns, ad sets, and ads' : isRus ? 'Создавайте и управляйте рекламными кампаниями, наборами объявлений и рекламой Meta' : 'Meta reklam kampaniyalarını, reklam qruplarını və reklamları yaradın və idarə edin'}
    >
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Coming Soon / Disabled State Warning */}
        {!crudReady && !demoMode && (
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {isEng
                ? '⚠️ Campaign creation and management is coming soon. This feature requires Meta Ads authorization (ads_management + business_management permissions). Demo mode is available for preview.'
                : isRus
                ? '⚠️ Создание и управление кампаниями скоро будет доступно. Для этой функции требуется авторизация Meta Ads (разрешения ads_management + business_management). Доступен демо-режим для предварительного просмотра.'
                : '⚠️ Kampaniya yaratma və idarəetmə tezliklə əlavə ediləcək. Bu funksiya Meta Ads icazəsi tələb edir (ads_management + business_management). Ön baxış üçün demo rejimi mövcuddur.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Demo Mode Toggle */}
        {DEMO_MODE_AVAILABLE && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="demo-mode-manager" className="text-sm font-medium">
                    {isEng ? 'Demo Mode (Internal Preview)' : isRus ? 'Демо режим (внутренний предпросмотр)' : 'Demo Rejimi (Daxili Önbaxış)'}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isEng
                      ? 'Enable to preview the campaign management interface with demo data'
                      : isRus
                      ? 'Включите для предварительного просмотра интерфейса управления кампаниями с демонстрационными данными'
                      : 'Kampaniya idarəetmə interfeysini demo məlumatlarla önizləmək üçün aktivləşdirin'}
                  </p>
                </div>
                <Switch
                  id="demo-mode-manager"
                  checked={demoMode}
                  onCheckedChange={setDemoMode}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {demoMode && (
          <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-xs text-amber-800 dark:text-amber-200">
              {isEng
                ? '⚠️ Demo Mode Active: Using demo data for preview. Real campaign IDs (from Meta) will be displayed when live authorization is complete.'
                : isRus
                ? '⚠️ Активен демо-режим: используются демонстрационные данные для предпросмотра. Реальные ID кампаний (от Meta) будут отображаться после завершения авторизации.'
                : '⚠️ Demo Rejimi Aktivdir: Önbaxış üçün demo məlumatlar istifadə olunur. Canlı icazə tamamlananda real kampaniya ID-ləri (Meta-dan) göstəriləcək.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Ad Accounts Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Facebook className="w-5 h-5 mr-2 text-[#1877F2]" />
                  {isEng ? 'Ad Accounts' : isRus ? 'Рекламные аккаунты' : 'Reklam Hesabları'}
                </CardTitle>
                <CardDescription>
                  {isEng ? 'Connected Meta ad accounts' : isRus ? 'Подключенные рекламные аккаунты Meta' : 'Qoşulmuş Meta reklam hesabları'}
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
                    {isEng ? 'Sync' : isRus ? 'Синхр' : 'Sinxronlaşdır'}
                  </Button>
                )}
                <Button onClick={handleConnectAdAccount} size="sm" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {isEng ? 'Add Account' : isRus ? 'Добавить аккаунт' : 'Hesab Əlavə Et'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {adAccounts.length === 0 ? (
              <div className="text-center py-8">
                <Facebook className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  {isEng ? 'No ad accounts connected yet' : isRus ? 'Рекламные аккаунты еще не подключены' : 'Hələ heç bir reklam hesabı qoşulmayıb'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button onClick={handleConnectAdAccount} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    {isEng ? 'Connect Meta Ads Account' : isRus ? 'Подключить аккаунт Meta Ads' : 'Meta Ads Hesabı Qoş'}
                  </Button>
                </div>
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
                          <span className="text-sm text-muted-foreground">
                            {isEng ? 'Currency:' : isRus ? 'Валюта:' : 'Valyuta:'}
                          </span>
                          <span className="text-sm font-medium">{account.currency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            {isEng ? 'Status:' : isRus ? 'Статус:' : 'Status:'}
                          </span>
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
            <TabsTrigger value="campaigns">
              {isEng ? 'Campaigns' : isRus ? 'Кампании' : 'Kampaniyalar'}
            </TabsTrigger>
            <TabsTrigger value="ad-sets">
              {isEng ? 'Ad Sets' : isRus ? 'Наборы объявлений' : 'Reklam Qrupları'}
            </TabsTrigger>
            <TabsTrigger value="ads">
              {isEng ? 'Ads' : isRus ? 'Реклама' : 'Reklamlar'}
            </TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {isEng ? 'Campaigns' : isRus ? 'Кампании' : 'Kampaniyalar'}
              </h3>
              <Button disabled={isDisabled} title={isDisabled ? (isEng ? 'Requires Meta Ads authorization' : isRus ? 'Требуется авторизация Meta Ads' : 'Meta Ads icazəsi tələb olunur') : ''}>
                <Plus className="w-4 h-4 mr-2" />
                {isEng ? 'New Campaign' : isRus ? 'Новая кампания' : 'Yeni Kampaniya'}
                {isDisabled && <Lock className="w-3 h-3 ml-2" />}
              </Button>
            </div>

            {isLoading && !demoMode ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : campaigns.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {isEng ? 'No campaigns yet' : isRus ? 'Кампаний пока нет' : 'Hələ heç bir kampaniya yoxdur'}
                  </p>
                  <Button disabled={isDisabled} title={isDisabled ? (isEng ? 'Requires Meta Ads authorization' : isRus ? 'Требуется авторизация Meta Ads' : 'Meta Ads icazəsi tələb olunur') : ''}>
                    <Plus className="w-4 h-4 mr-2" />
                    {isEng ? 'Create First Campaign' : isRus ? 'Создать первую кампанию' : 'İlk Kampaniyanı Yarat'}
                    {isDisabled && <Lock className="w-3 h-3 ml-2" />}
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
                            {isEng ? 'Objective:' : isRus ? 'Цель:' : 'Məqsəd:'} {campaign.objective}
                          </CardDescription>
                          {campaign.isDemo && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ID: {campaign.id}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(campaign.status)}
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isDisabled}
                            title={isDisabled ? (isEng ? 'Requires Meta Ads authorization' : isRus ? 'Требуется авторизация Meta Ads' : 'Meta Ads icazəsi tələb olunur') : ''}
                          >
                            {campaign.status.includes('ACTIVE') ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isDisabled}
                            title={isDisabled ? (isEng ? 'Requires Meta Ads authorization' : isRus ? 'Требуется авторизация Meta Ads' : 'Meta Ads icazəsi tələb olunur') : ''}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {campaign.daily_budget && (
                          <div>
                            <span className="text-muted-foreground">
                              {isEng ? 'Daily budget:' : isRus ? 'Дневной бюджет:' : 'Günlük büdcə:'}
                            </span>
                            <p className="font-medium">${campaign.daily_budget.toLocaleString()}</p>
                          </div>
                        )}
                        {campaign.lifetime_budget && (
                          <div>
                            <span className="text-muted-foreground">
                              {isEng ? 'Lifetime budget:' : isRus ? 'Общий бюджет:' : 'Ümumi büdcə:'}
                            </span>
                            <p className="font-medium">${campaign.lifetime_budget.toLocaleString()}</p>
                          </div>
                        )}
                        {campaign.start_time && (
                          <div>
                            <span className="text-muted-foreground">
                              {isEng ? 'Start:' : isRus ? 'Начало:' : 'Başlanğıc:'}
                            </span>
                            <p className="font-medium">{new Date(campaign.start_time).toLocaleDateString()}</p>
                          </div>
                        )}
                        {campaign.end_time && (
                          <div>
                            <span className="text-muted-foreground">
                              {isEng ? 'End:' : isRus ? 'Конец:' : 'Bitmə:'}
                            </span>
                            <p className="font-medium">{new Date(campaign.end_time).toLocaleDateString()}</p>
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
              <h3 className="text-lg font-semibold">
                {isEng ? 'Ad Sets' : isRus ? 'Наборы объявлений' : 'Reklam Qrupları'}
              </h3>
              <Button disabled={isDisabled} title={isDisabled ? (isEng ? 'Requires Meta Ads authorization' : isRus ? 'Требуется авторизация Meta Ads' : 'Meta Ads icazəsi tələb olunur') : ''}>
                <Plus className="w-4 h-4 mr-2" />
                {isEng ? 'New Ad Set' : isRus ? 'Новый набор' : 'Yeni Reklam Qrupu'}
                {isDisabled && <Lock className="w-3 h-3 ml-2" />}
              </Button>
            </div>

            {adSets.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {isEng ? 'No ad sets yet' : isRus ? 'Наборов объявлений пока нет' : 'Hələ heç bir reklam qrupu yoxdur'}
                  </p>
                  <Button disabled={isDisabled} title={isDisabled ? (isEng ? 'Requires Meta Ads authorization' : isRus ? 'Требуется авторизация Meta Ads' : 'Meta Ads icazəsi tələb olunur') : ''}>
                    <Plus className="w-4 h-4 mr-2" />
                    {isEng ? 'Create First Ad Set' : isRus ? 'Создать первый набор' : 'İlk Reklam Qrupunu Yarat'}
                    {isDisabled && <Lock className="w-3 h-3 ml-2" />}
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
                            {isEng ? 'Optimization:' : isRus ? 'Оптимизация:' : 'Optimallaşdırma:'} {adSet.optimization_goal}
                          </CardDescription>
                          {adSet.isDemo && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ID: {adSet.id}
                            </p>
                          )}
                        </div>
                        {getStatusBadge(adSet.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        {adSet.daily_budget && (
                          <div>
                            <span className="text-muted-foreground">
                              {isEng ? 'Daily budget:' : isRus ? 'Дневной бюджет:' : 'Günlük büdcə:'}
                            </span>
                            <p className="font-medium">${adSet.daily_budget.toLocaleString()}</p>
                          </div>
                        )}
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
              <h3 className="text-lg font-semibold">
                {isEng ? 'Ads' : isRus ? 'Реклама' : 'Reklamlar'}
              </h3>
              <Button disabled={isDisabled} title={isDisabled ? (isEng ? 'Requires Meta Ads authorization' : isRus ? 'Требуется авторизация Meta Ads' : 'Meta Ads icazəsi tələb olunur') : ''}>
                <Plus className="w-4 h-4 mr-2" />
                {isEng ? 'New Ad' : isRus ? 'Новая реклама' : 'Yeni Reklam'}
                {isDisabled && <Lock className="w-3 h-3 ml-2" />}
              </Button>
            </div>

            {ads.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {isEng ? 'No ads yet' : isRus ? 'Рекламы пока нет' : 'Hələ heç bir reklam yoxdur'}
                  </p>
                  <Button disabled={isDisabled} title={isDisabled ? (isEng ? 'Requires Meta Ads authorization' : isRus ? 'Требуется авторизация Meta Ads' : 'Meta Ads icazəsi tələb olunur') : ''}>
                    <Plus className="w-4 h-4 mr-2" />
                    {isEng ? 'Create First Ad' : isRus ? 'Создать первую рекламу' : 'İlk Reklamı Yarat'}
                    {isDisabled && <Lock className="w-3 h-3 ml-2" />}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ads.map((ad) => (
                  <Card key={ad.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{ad.name}</CardTitle>
                          {ad.isDemo && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ID: {ad.id}
                            </p>
                          )}
                        </div>
                        {getStatusBadge(ad.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {ad.created_time && (
                        <p className="text-sm text-muted-foreground">
                          {isEng ? 'Created:' : isRus ? 'Создано:' : 'Yaradılıb:'} {new Date(ad.created_time).toLocaleDateString()}
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
