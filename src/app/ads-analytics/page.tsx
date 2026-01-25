'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { metaAdsAPI, socialAccountsAPI } from '@/lib/api';
import { 
  Facebook, 
  Loader2, 
  TrendingUp,
  Eye,
  MousePointerClick,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Plus,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdAccount {
  id: string;
  name: string;
  account_id: string;
  currency: string;
  status: string;
}

interface InsightsData {
  impressions: number;
  clicks: number;
  spend: number;
  reach: number;
  ctr: number;
  cpc: number;
  impressions_change: number;
  clicks_change: number;
  spend_change: number;
  reach_change: number;
}

// Demo data
const DEMO_INSIGHTS: InsightsData = {
  impressions: 125430,
  clicks: 3567,
  spend: 458.32,
  reach: 89234,
  ctr: 2.84,
  cpc: 0.13,
  impressions_change: 12.5,
  clicks_change: 8.3,
  spend_change: -5.2,
  reach_change: 15.7,
};

const DEMO_AD_ACCOUNT: AdAccount = {
  id: 'demo-acc-001',
  name: 'Demo Ad Account',
  account_id: 'DEMO_ADACC_001',
  currency: 'USD',
  status: 'ACTIVE',
};

export default function AdsAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFacebookAccount, setHasFacebookAccount] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Data states
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('last_7_days');
  const [insightsData, setInsightsData] = useState<InsightsData | null>(null);
  
  // Demo mode toggle
  const [demoMode, setDemoMode] = useState(false);
  
  const { language } = useLanguage();
  const isEng = language === 'eng';
  const isRus = language === 'rus';

  useEffect(() => {
    checkFacebookAccount();
    loadAdAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccountId && !demoMode) {
      loadInsights();
    } else if (demoMode) {
      setInsightsData(DEMO_INSIGHTS);
    }
  }, [selectedAccountId, dateRange, demoMode]);

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
      const accounts = response.data.results || response.data || [];
      setAdAccounts(accounts);
      
      // Auto-select first account
      if (accounts.length > 0 && !selectedAccountId) {
        setSelectedAccountId(accounts[0].id);
      }
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

  const loadInsights = async () => {
    if (!selectedAccountId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await metaAdsAPI.getInsights(selectedAccountId, dateRange);
      setInsightsData(response.data);
    } catch (err: any) {
      console.error('Failed to load insights:', err);
      setInsightsData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectAdAccount = async () => {
    try {
      setIsConnecting(true);
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
      setIsConnecting(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value: number): string => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-3 h-3 text-green-500" />;
    if (change < 0) return <ArrowDown className="w-3 h-3 text-red-500" />;
    return null;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-muted-foreground';
  };

  const hasAdAccount = adAccounts.length > 0 || demoMode;
  const showData = (selectedAccountId || demoMode) && insightsData;

  return (
    <DashboardLayout
      title={isEng ? 'Meta Ads Analytics' : isRus ? 'Аналитика Meta Ads' : 'Meta Ads Analitika'}
      description={
        isEng
          ? 'View insights and performance metrics for your Meta ad campaigns'
          : isRus
          ? 'Просматривайте статистику и метрики эффективности ваших рекламных кампаний Meta'
          : 'Meta reklam kampaniyalarınız üçün statistika və performans metrikləri'
      }
    >
      <div className="space-y-6">
        {/* Coming Soon Banner - Timera V2 */}
        <Card className="border-2 border-dashed bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3">
              <div className="text-2xl">📈</div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Coming Soon - Timera V2
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enhanced Meta Ads Analytics is coming in Timera V2
                </p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Account Selection & Date Range */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center">
                  <Facebook className="w-5 h-5 mr-2 text-[#1877F2]" />
                  {isEng ? 'Ad Account Insights' : isRus ? 'Статистика рекламного аккаунта' : 'Reklam Hesabı Statistikası'}
                </CardTitle>
                <CardDescription>
                  {isEng
                    ? 'Monitor campaign performance and key metrics'
                    : isRus
                    ? 'Отслеживайте эффективность кампаний и ключевые метрики'
                    : 'Kampaniya performansı və əsas metriklər'}
                </CardDescription>
              </div>
              
              {!hasAdAccount && (
                <Button onClick={handleConnectAdAccount} size="sm" disabled={isConnecting}>
                  {isConnecting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {isEng ? 'Connect Meta Ads Account' : isRus ? 'Подключить аккаунт Meta Ads' : 'Meta Ads Hesabı Qoş'}
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Demo Mode Toggle (optional) */}
            <div className="flex items-center justify-between p-3 border rounded-lg bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <Label htmlFor="demo-mode" className="text-sm font-medium cursor-pointer">
                  {isEng ? 'Demo Mode' : isRus ? 'Демо режим' : 'Demo Rejimi'}
                </Label>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                  {isEng ? 'Optional' : isRus ? 'Опционально' : 'İstəyə bağlı'}
                </Badge>
              </div>
              <Switch
                id="demo-mode"
                checked={demoMode}
                onCheckedChange={setDemoMode}
              />
            </div>

            {demoMode && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {isEng
                    ? '⚠️ Demo data — not from Meta. Real data will be shown when an ad account is connected and demo mode is disabled.'
                    : isRus
                    ? '⚠️ Демо данные — не из Meta. Реальные данные будут отображаться при подключении рекламного аккаунта и отключении демо режима.'
                    : '⚠️ Demo məlumat — Meta-dan deyil. Real məlumatlar reklam hesabı qoşulduqda və demo rejimi söndürüldükdə göstəriləcək.'}
                </AlertDescription>
              </Alert>
            )}

            {/* Ad Account Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  {isEng ? 'Ad Account' : isRus ? 'Рекламный аккаунт' : 'Reklam Hesabı'}
                </Label>
                <Select 
                  value={demoMode ? DEMO_AD_ACCOUNT.id : selectedAccountId} 
                  onValueChange={setSelectedAccountId}
                  disabled={!hasAdAccount || demoMode}
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue 
                      placeholder={
                        isEng 
                          ? 'No ad account connected' 
                          : isRus 
                          ? 'Рекламный аккаунт не подключен' 
                          : 'Reklam hesabı qoşulmayıb'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {demoMode ? (
                      <SelectItem value={DEMO_AD_ACCOUNT.id}>
                        <div className="flex items-center gap-2">
                          <span>{DEMO_AD_ACCOUNT.name}</span>
                          <Badge variant="outline" className="text-[9px] px-1 py-0">Demo</Badge>
                        </div>
                      </SelectItem>
                    ) : adAccounts.length === 0 ? (
                      <SelectItem value="none" disabled>
                        {isEng ? 'No accounts available' : isRus ? 'Нет доступных аккаунтов' : 'Mövcud hesab yoxdur'}
                      </SelectItem>
                    ) : (
                      adAccounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          <div className="flex items-center justify-between gap-2">
                            <span>{acc.name}</span>
                            <span className="text-[10px] text-muted-foreground">({acc.account_id})</span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Selector */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  {isEng ? 'Date Range' : isRus ? 'Диапазон дат' : 'Tarix Aralığı'}
                </Label>
                <Select value={dateRange} onValueChange={setDateRange} disabled={!hasAdAccount}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">
                      {isEng ? 'Today' : isRus ? 'Сегодня' : 'Bu gün'}
                    </SelectItem>
                    <SelectItem value="yesterday">
                      {isEng ? 'Yesterday' : isRus ? 'Вчера' : 'Dünən'}
                    </SelectItem>
                    <SelectItem value="last_7_days">
                      {isEng ? 'Last 7 days' : isRus ? 'Последние 7 дней' : 'Son 7 gün'}
                    </SelectItem>
                    <SelectItem value="last_14_days">
                      {isEng ? 'Last 14 days' : isRus ? 'Последние 14 дней' : 'Son 14 gün'}
                    </SelectItem>
                    <SelectItem value="last_30_days">
                      {isEng ? 'Last 30 days' : isRus ? 'Последние 30 дней' : 'Son 30 gün'}
                    </SelectItem>
                    <SelectItem value="this_month">
                      {isEng ? 'This month' : isRus ? 'Этот месяц' : 'Bu ay'}
                    </SelectItem>
                    <SelectItem value="last_month">
                      {isEng ? 'Last month' : isRus ? 'Прошлый месяц' : 'Keçən ay'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty State - No Ad Account Connected */}
        {!hasAdAccount && (
          <Card>
            <CardContent className="text-center py-12">
              <Facebook className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                {isEng ? 'No Ad Account Connected' : isRus ? 'Рекламный аккаунт не подключен' : 'Reklam Hesabı Qoşulmayıb'}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                {isEng
                  ? 'Connect your Meta Ads account to view campaign insights and performance metrics.'
                  : isRus
                  ? 'Подключите аккаунт Meta Ads для просмотра статистики кампаний и метрик эффективности.'
                  : 'Kampaniya statistikası və performans metriklərini görmək üçün Meta Ads hesabınızı qoşun.'}
              </p>
              <Button onClick={handleConnectAdAccount} disabled={isConnecting}>
                {isConnecting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                {isEng ? 'Connect Meta Ads Account' : isRus ? 'Подключить аккаунт Meta Ads' : 'Meta Ads Hesabı Qoş'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* KPI Cards */}
        {hasAdAccount && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Impressions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isEng ? 'Impressions' : isRus ? 'Показы' : 'Göstərilmələr'}
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {!showData ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-muted-foreground">--</p>
                    <p className="text-xs text-muted-foreground">
                      {isEng ? 'Connect ad account to view data' : isRus ? 'Подключите аккаунт' : 'Hesab qoşun'}
                    </p>
                  </div>
                ) : isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  <div>
                    <div className="text-2xl font-bold">{formatNumber(insightsData.impressions)}</div>
                    {insightsData.impressions_change !== 0 && (
                      <p className={`text-xs flex items-center gap-1 ${getChangeColor(insightsData.impressions_change)}`}>
                        {getChangeIcon(insightsData.impressions_change)}
                        <span>{formatPercentage(insightsData.impressions_change)}</span>
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Clicks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isEng ? 'Clicks' : isRus ? 'Клики' : 'Kliklər'}
                </CardTitle>
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {!showData ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-muted-foreground">--</p>
                    <p className="text-xs text-muted-foreground">
                      {isEng ? 'Connect ad account to view data' : isRus ? 'Подключите аккаунт' : 'Hesab qoşun'}
                    </p>
                  </div>
                ) : isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  <div>
                    <div className="text-2xl font-bold">{formatNumber(insightsData.clicks)}</div>
                    {insightsData.clicks_change !== 0 && (
                      <p className={`text-xs flex items-center gap-1 ${getChangeColor(insightsData.clicks_change)}`}>
                        {getChangeIcon(insightsData.clicks_change)}
                        <span>{formatPercentage(insightsData.clicks_change)}</span>
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Spend */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isEng ? 'Spend' : isRus ? 'Расходы' : 'Xərc'}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {!showData ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-muted-foreground">--</p>
                    <p className="text-xs text-muted-foreground">
                      {isEng ? 'Connect ad account to view data' : isRus ? 'Подключите аккаунт' : 'Hesab qoşun'}
                    </p>
                  </div>
                ) : isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  <div>
                    <div className="text-2xl font-bold">{formatCurrency(insightsData.spend)}</div>
                    {insightsData.spend_change !== 0 && (
                      <p className={`text-xs flex items-center gap-1 ${getChangeColor(insightsData.spend_change)}`}>
                        {getChangeIcon(insightsData.spend_change)}
                        <span>{formatPercentage(insightsData.spend_change)}</span>
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reach */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isEng ? 'Reach' : isRus ? 'Охват' : 'Əhatə'}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {!showData ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-muted-foreground">--</p>
                    <p className="text-xs text-muted-foreground">
                      {isEng ? 'Connect ad account to view data' : isRus ? 'Подключите аккаунт' : 'Hesab qoşun'}
                    </p>
                  </div>
                ) : isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  <div>
                    <div className="text-2xl font-bold">{formatNumber(insightsData.reach)}</div>
                    {insightsData.reach_change !== 0 && (
                      <p className={`text-xs flex items-center gap-1 ${getChangeColor(insightsData.reach_change)}`}>
                        {getChangeIcon(insightsData.reach_change)}
                        <span>{formatPercentage(insightsData.reach_change)}</span>
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Additional Metrics */}
        {showData && insightsData && !isLoading && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {isEng ? 'Performance Metrics' : isRus ? 'Метрики эффективности' : 'Performans Metrikləri'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">
                    {isEng ? 'CTR (Click-through Rate)' : isRus ? 'CTR (показатель кликабельности)' : 'CTR (Klik Nisbəti)'}
                  </span>
                  <p className="text-lg font-semibold">{insightsData.ctr.toFixed(2)}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">
                    {isEng ? 'CPC (Cost per Click)' : isRus ? 'CPC (цена за клик)' : 'CPC (Klik başına xərc)'}
                  </span>
                  <p className="text-lg font-semibold">{formatCurrency(insightsData.cpc)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

