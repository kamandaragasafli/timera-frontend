'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { aiAPI, authAPI } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  TrendingUp, 
  Calendar, 
  Hash, 
  Target, 
  Lightbulb,
  BarChart3,
  Clock,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Users,
  Trophy,
  Zap
} from 'lucide-react';

interface Trend {
  title: string;
  description: string;
  relevance_score: number;
  why_relevant: string;
  action_items: string[];
}

interface SeasonalOpportunity {
  event: string;
  date: string;
  content_ideas: string[];
  hashtags: string[];
}

interface TrendingTopic {
  topic: string;
  popularity: number;
  audience_fit: string;
  content_angle: string;
}

interface ContentRecommendation {
  type: string;
  theme: string;
  description: string;
  estimated_engagement: string;
  best_platforms: string[];
}

interface HashtagTrend {
  hashtag: string;
  trend_status: string;
  estimated_reach: string;
  usage_tip: string;
}

interface CompetitorInsight {
  strategy: string;
  why_it_works: string;
  how_to_apply: string;
}

interface UpcomingEvent {
  event: string;
  date: string;
  preparation_timeline: string;
  content_ideas: string[];
}

interface TrendSummary {
  overall_trend_direction: string;
  key_opportunities: string[];
  quick_wins: string[];
  long_term_strategy: string;
}

interface TrendsData {
  current_trends: Trend[];
  seasonal_opportunities: SeasonalOpportunity[];
  trending_topics: TrendingTopic[];
  content_recommendations: ContentRecommendation[];
  hashtag_trends: HashtagTrend[];
  competitor_insights: CompetitorInsight[];
  upcoming_events: UpcomingEvent[];
  summary: TrendSummary;
}

export default function TrendAnalyzerPage() {
  const router = useRouter();
  const t = useTranslation();
  
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [keywords, setKeywords] = useState('');
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [analysisDate, setAnalysisDate] = useState('');

  // Load company profile
  useEffect(() => {
    const loadCompanyProfile = async () => {
      try {
        const response = await authAPI.getCompanyProfile();
        setCompanyProfile(response.data);
      } catch (error) {
        console.error('Failed to load company profile:', error);
      }
    };
    loadCompanyProfile();
  }, []);

  const handleAnalyzeTrends = async () => {
    if (!companyProfile?.industry) {
      setError('Şirkət profili və sənaye məlumatı tələb olunur');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setTrendsData(null);

    try {
      const response = await aiAPI.analyzeTrends({
        company_name: companyProfile.company_name || '',
        industry: companyProfile.industry || '',
        target_audience: companyProfile.target_audience || '',
        keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
        region: 'Azerbaijan'
      });

      if (response.data?.trends) {
        setTrendsData(response.data.trends);
        setAnalysisDate(response.data.analysis_date);
      }
    } catch (err: any) {
      console.error('Error analyzing trends:', err);
      
      // Better error handling
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setError('Sorğu zaman aşımına uğradı. Zəhmət olmasa yenidən cəhd edin.');
      } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        setError('Şəbəkə xətası. Zəhmət olmasa backend serverin işlədiyini yoxlayın və yenidən cəhd edin.');
      } else if (err.response?.status === 404) {
        setError('Endpoint tapılmadı. Backend serveri yenidən başladın.');
      } else if (err.response?.status === 500) {
        setError(err.response?.data?.error || 'Server xətası. Zəhmət olmasa yenidən cəhd edin.');
      } else {
        setError(err.response?.data?.error || err.message || 'Trend analizi zamanı xəta baş verdi');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getTrendStatusColor = (status: string) => {
    if (status.includes('Yüksəlir')) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (status.includes('Populyar')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  };

  const getEngagementColor = (engagement: string) => {
    if (engagement === 'Yüksək') return 'text-green-600 dark:text-green-400';
    if (engagement === 'Orta') return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <DashboardLayout
      title="Trend Analizi"
      description="Sənayeniz üçün aktual trendləri kəşf edin"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            Trend Analizi
          </h1>
          <p className="text-muted-foreground">
            Sosial media trendlərini izləyin və content strategiyanızı optimallaşdırın
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Analysis Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Analiz Parametrləri
            </CardTitle>
            <CardDescription>
              Şirkət məlumatlarınıza əsasən trend analizi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {companyProfile && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">Şirkət Məlumatları:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <strong>Şirkət:</strong> {companyProfile.company_name}
                  </div>
                  {companyProfile.industry && (
                    <div>
                      <strong>Sənaye:</strong> {companyProfile.industry}
                    </div>
                  )}
                  {companyProfile.target_audience && (
                    <div>
                      <strong>Hədəf Auditoriya:</strong> {companyProfile.target_audience}
                    </div>
                  )}
                  <div>
                    <strong>Region:</strong> Azerbaijan
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="keywords">Əlavə Açar Sözlər (İstəyə bağlı)</Label>
              <Input
                id="keywords"
                placeholder="Məsələn: innovasiya, texnologiya, digital"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                disabled={isAnalyzing}
              />
              <p className="text-xs text-muted-foreground">
                Vergüllə ayırın. Bu sözlər trend analizinə daxil ediləcək.
              </p>
            </div>

            <Button
              onClick={handleAnalyzeTrends}
              disabled={isAnalyzing || !companyProfile?.industry}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Trendlər analiz edilir...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Trendləri Analiz Et
                </>
              )}
            </Button>

            {isAnalyzing && (
              <p className="text-sm text-muted-foreground text-center">
                Bu proses 30-60 saniyə çəkə bilər...
              </p>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {trendsData && (
          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="trends">
                <TrendingUp className="w-4 h-4 mr-2" />
                Aktual Trendlər
              </TabsTrigger>
              <TabsTrigger value="seasonal">
                <Calendar className="w-4 h-4 mr-2" />
                Mövsümi İmkanlar
              </TabsTrigger>
              <TabsTrigger value="content">
                <Lightbulb className="w-4 h-4 mr-2" />
                Content İdeyaları
              </TabsTrigger>
              <TabsTrigger value="summary">
                <BarChart3 className="w-4 h-4 mr-2" />
                Xülasə
              </TabsTrigger>
            </TabsList>

            {/* Current Trends */}
            <TabsContent value="trends" className="space-y-6">
              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Trending Mövzular
                  </CardTitle>
                  <CardDescription>
                    Sənayenizdə ən populyar mövzular
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendsData.trending_topics?.map((topic, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{topic.topic}</h3>
                        <Badge variant="secondary">
                          {topic.popularity}% populyarlıq
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Auditoriyaya uyğunluq:</strong> {topic.audience_fit}
                      </p>
                      <p className="text-sm">
                        <strong>Necə istifadə edək:</strong> {topic.content_angle}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Current Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Aktual Trendlər
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendsData.current_trends?.map((trend, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg">{trend.title}</h3>
                        <div className="flex flex-col items-end gap-1">
                          <Badge className="bg-orange-500">
                            {trend.relevance_score}% uyğun
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm">{trend.description}</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          <strong>Niyə relevant:</strong> {trend.why_relevant}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Hərəkət addımları:</p>
                        <ul className="space-y-1">
                          {trend.action_items?.map((item, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Hashtag Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Trend Hashtag-lar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trendsData.hashtag_trends?.map((hashtag, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                            {hashtag.hashtag}
                          </span>
                          <Badge className={getTrendStatusColor(hashtag.trend_status)}>
                            {hashtag.trend_status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Təxmini Reach:</strong> {hashtag.estimated_reach}
                        </p>
                        <p className="text-sm">
                          <strong>Tövsiyə:</strong> {hashtag.usage_tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Competitor Insights */}
              {trendsData.competitor_insights && trendsData.competitor_insights.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Rəqabət Təhlili
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {trendsData.competitor_insights.map((insight, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-2">
                        <h3 className="font-semibold">{insight.strategy}</h3>
                        <p className="text-sm">
                          <strong>Niyə işə yarayır:</strong> {insight.why_it_works}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          <strong>Necə tətbiq edək:</strong> {insight.how_to_apply}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Seasonal Opportunities */}
            <TabsContent value="seasonal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Mövsümi İmkanlar
                  </CardTitle>
                  <CardDescription>
                    Yaxınlaşan bayramlar və event-lər
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendsData.seasonal_opportunities?.map((opportunity, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{opportunity.event}</h3>
                          <p className="text-sm text-muted-foreground">{opportunity.date}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Content İdeyaları:</p>
                        <ul className="space-y-1">
                          {opportunity.content_ideas?.map((idea, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 mt-0.5 text-yellow-500 flex-shrink-0" />
                              {idea}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.hashtags?.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="font-mono">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              {trendsData.upcoming_events && trendsData.upcoming_events.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Yaxınlaşan Event-lər
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {trendsData.upcoming_events.map((event, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{event.event}</h3>
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </div>
                          <Badge variant="outline">
                            {event.preparation_timeline}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Hazırlıq İdeyaları:</p>
                          <ul className="space-y-1">
                            {event.content_ideas?.map((idea, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {idea}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Content Recommendations */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Content Tövsiyələri
                  </CardTitle>
                  <CardDescription>
                    Yüksək engagement üçün content strategiyası
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendsData.content_recommendations?.map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{rec.type}</Badge>
                            <span className={`text-sm font-medium ${getEngagementColor(rec.estimated_engagement)}`}>
                              {rec.estimated_engagement} Engagement
                            </span>
                          </div>
                          <h3 className="font-semibold">{rec.theme}</h3>
                        </div>
                      </div>
                      <p className="text-sm">{rec.description}</p>
                      <div>
                        <p className="text-sm font-medium mb-2">Ən yaxşı platformalar:</p>
                        <div className="flex flex-wrap gap-2">
                          {rec.best_platforms?.map((platform, i) => (
                            <Badge key={i} variant="secondary">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Summary */}
            <TabsContent value="summary" className="space-y-6">
              {trendsData.summary && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Ümumi Təhlil
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="font-medium mb-2">Trend İstiqaməti:</p>
                        <p className="text-sm">{trendsData.summary.overall_trend_direction}</p>
                      </div>

                      <div>
                        <p className="font-medium mb-2 flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          Əsas İmkanlar:
                        </p>
                        <ul className="space-y-2">
                          {trendsData.summary.key_opportunities?.map((opp, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                              {opp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-medium mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-orange-500" />
                          Tez Qazanclar:
                        </p>
                        <ul className="space-y-2">
                          {trendsData.summary.quick_wins?.map((win, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {win}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="font-medium mb-2">Uzunmüddətli Strategiya:</p>
                        <p className="text-sm">{trendsData.summary.long_term_strategy}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {analysisDate && (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground text-center">
                          Analiz tarixi: {new Date(analysisDate).toLocaleDateString('az-AZ', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Tips */}
        {!trendsData && (
          <Card>
            <CardHeader>
              <CardTitle>💡 Trend Analizi haqqında</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Sənayenizdə aktual trendləri kəşf edin</li>
                <li>• Mövsümi imkanlardan maksimum faydalanın</li>
                <li>• Rəqiblərinizin strategiyalarını öyrənin</li>
                <li>• Populyar hashtag-lardan istifadə edin</li>
                <li>• Content strategiyanızı yeniləyin</li>
                <li>• Yaxınlaşan event-lərə hazırlaşın</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

