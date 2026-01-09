'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { aiAPI, authAPI } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Hash,
  Lightbulb,
  Award,
  AlertCircle,
  Loader2,
  Search,
  CheckCircle2,
  X,
  ArrowRight,
  Zap,
  TrendingDown
} from 'lucide-react';

interface ContentType {
  type: string;
  percentage: number;
  performance: string;
}

interface CompetitorOverview {
  name: string;
  platform: string;
  follower_count: number;
  engagement_rate: string;
  posting_frequency: string;
  overall_score: number;
  strengths: string[];
  weaknesses: string[];
}

interface ContentStrategy {
  content_types: ContentType[];
  themes: string[];
  tone: string;
  language_style: string;
}

interface EngagementAnalysis {
  average_likes: number;
  average_comments: number;
  average_shares: number;
  engagement_rate: string;
  best_performing_content: string;
  peak_engagement_times: string[];
}

interface HashtagStrategy {
  most_used_hashtags: string[];
  hashtag_count_per_post: string;
  hashtag_effectiveness: string;
  recommendations: string[];
}

interface CompetitiveAdvantage {
  advantage: string;
  impact: string;
  how_they_do_it: string;
  how_you_can_compete: string;
}

interface Opportunity {
  opportunity: string;
  difficulty: string;
  potential_impact: string;
  action_steps: string[];
}

interface ContentGap {
  gap: string;
  why_important: string;
  how_to_leverage: string;
}

interface Recommendation {
  category: string;
  recommendation: string;
  priority: string;
  expected_result: string;
}

interface Summary {
  overall_assessment: string;
  key_takeaways: string[];
  immediate_actions: string[];
  long_term_strategy: string;
}

interface AnalysisData {
  competitor_overview: CompetitorOverview;
  content_strategy: ContentStrategy;
  engagement_analysis: EngagementAnalysis;
  hashtag_strategy: HashtagStrategy;
  audience_insights: any;
  competitive_advantages: CompetitiveAdvantage[];
  opportunities_for_you: Opportunity[];
  content_gaps: ContentGap[];
  recommendations: Recommendation[];
  summary: Summary;
}

export default function CompetitorAnalysisPage() {
  const router = useRouter();
  const t = useTranslation();

  const [competitorUrl, setCompetitorUrl] = useState('');
  const [competitorName, setCompetitorName] = useState('');
  const [analysisDepth, setAnalysisDepth] = useState<'quick' | 'standard' | 'deep'>('standard');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [companyProfile, setCompanyProfile] = useState<any>(null);

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

  const handleAnalyze = async () => {
    if (!competitorUrl && !competitorName) {
      setError('Zəhmət olmasa, rəqibin URL və ya adını daxil edin');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setAnalysisData(null);
    setScrapedData(null);

    try {
      const response = await aiAPI.analyzeCompetitor({
        competitor_url: competitorUrl,
        competitor_name: competitorName,
        analysis_depth: analysisDepth
      });

      if (response.data?.analysis) {
        setAnalysisData(response.data.analysis);
        setScrapedData(response.data.competitor_data);
      }
    } catch (err: any) {
      console.error('Error analyzing competitor:', err);
      
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setError('Sorğu zaman aşımına uğradı. Zəhmət olmasa yenidən cəhd edin.');
      } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        setError('Şəbəkə xətası. Backend serverin işlədiyini yoxlayın.');
      } else {
        setError(err.response?.data?.error || err.message || 'Analiz zamanı xəta baş verdi');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'Yüksək') return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    if (priority === 'Orta') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  };

  const getDifficultyIcon = (difficulty: string) => {
    if (difficulty === 'Asan') return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (difficulty === 'Orta') return <Target className="w-4 h-4 text-yellow-500" />;
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <DashboardLayout
      title="Rəqib Analizi"
      description="Rəqiblərinizi analiz edin və strategiyanızı təkmilləşdirin"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Target className="w-8 h-8 text-indigo-500" />
            Rəqib Analizi
          </h1>
          <p className="text-muted-foreground">
            Rəqiblərinizin sosial media strategiyasını analiz edin və öz strategiyanızı təkmilləşdirin
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
              <Search className="w-5 h-5" />
              Rəqib Məlumatları
            </CardTitle>
            <CardDescription>
              Rəqibinizin sosial media profilini analiz etmək üçün URL və ya ad daxil edin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="competitor-url">Rəqib Profil URL</Label>
                <Input
                  id="competitor-url"
                  placeholder="https://instagram.com/username"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                  disabled={isAnalyzing}
                />
                <p className="text-xs text-muted-foreground">
                  Instagram, Facebook və ya LinkedIn profil linki
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="competitor-name">və ya Rəqib Adı</Label>
                <Input
                  id="competitor-name"
                  placeholder="@username və ya Şirkət Adı"
                  value={competitorName}
                  onChange={(e) => setCompetitorName(e.target.value)}
                  disabled={isAnalyzing}
                />
                <p className="text-xs text-muted-foreground">
                  URL yoxdursa, adı daxil edin
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="analysis-depth">Analiz Dərinliyi</Label>
              <Select value={analysisDepth} onValueChange={(value: any) => setAnalysisDepth(value)}>
                <SelectTrigger id="analysis-depth">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Sürətli (30 san)</SelectItem>
                  <SelectItem value="standard">Standart (1 dəq)</SelectItem>
                  <SelectItem value="deep">Dərin (2 dəq)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {scrapedData && (
              <Alert>
                <CheckCircle2 className="w-4 h-4" />
                <AlertDescription>
                  ✅ Real data əldə edildi! Daha dəqiq analiz üçün scraping uğurlu oldu.
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!competitorUrl && !competitorName)}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analiz edilir...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Rəqibi Analiz Et
                </>
              )}
            </Button>

            {isAnalyzing && (
              <p className="text-sm text-muted-foreground text-center">
                {analysisDepth === 'quick' && 'Sürətli analiz... 30 saniyə'}
                {analysisDepth === 'standard' && 'Standart analiz... 1 dəqiqə'}
                {analysisDepth === 'deep' && 'Dərin analiz... 2 dəqiqə'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {analysisData && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="overview">
                <BarChart3 className="w-4 h-4 mr-2" />
                Ümumi
              </TabsTrigger>
              <TabsTrigger value="strategy">
                <Target className="w-4 h-4 mr-2" />
                Strategiya
              </TabsTrigger>
              <TabsTrigger value="advantages">
                <Award className="w-4 h-4 mr-2" />
                Üstünlüklər
              </TabsTrigger>
              <TabsTrigger value="opportunities">
                <Lightbulb className="w-4 h-4 mr-2" />
                İmkanlar
              </TabsTrigger>
              <TabsTrigger value="recommendations">
                <Zap className="w-4 h-4 mr-2" />
                Tövsiyələr
              </TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rəqib Profili</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Ad</p>
                      <p className="text-lg font-semibold">{analysisData.competitor_overview.name}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Platform</p>
                      <p className="text-lg font-semibold">{analysisData.competitor_overview.platform}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Followers</p>
                      <p className="text-lg font-semibold">{analysisData.competitor_overview.follower_count?.toLocaleString() || 'N/A'}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Engagement Rate</p>
                      <p className="text-lg font-semibold">{analysisData.competitor_overview.engagement_rate}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Posting Frequency</p>
                      <p className="text-lg font-semibold">{analysisData.competitor_overview.posting_frequency}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Overall Score</p>
                      <p className={`text-2xl font-bold ${getScoreColor(analysisData.competitor_overview.overall_score)}`}>
                        {analysisData.competitor_overview.overall_score}/100
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Güclü Tərəfləri
                      </h3>
                      <ul className="space-y-1">
                        {analysisData.competitor_overview.strengths.map((strength, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Zəif Tərəfləri
                      </h3>
                      <ul className="space-y-1">
                        {analysisData.competitor_overview.weaknesses.map((weakness, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Engagement Analizi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 border rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Orta Likes</p>
                      <p className="text-lg font-semibold">{analysisData.engagement_analysis.average_likes}</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Orta Comments</p>
                      <p className="text-lg font-semibold">{analysisData.engagement_analysis.average_comments}</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Orta Shares</p>
                      <p className="text-lg font-semibold">{analysisData.engagement_analysis.average_shares}</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Engagement Rate</p>
                      <p className="text-lg font-semibold">{analysisData.engagement_analysis.engagement_rate}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Ən yaxşı performans:</strong> {analysisData.engagement_analysis.best_performing_content}
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Peak saatlar:</strong> {analysisData.engagement_analysis.peak_engagement_times?.join(', ')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Strategy */}
            <TabsContent value="strategy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Strategiyası</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Content Növləri</h3>
                    <div className="space-y-2">
                      {analysisData.content_strategy.content_types?.map((type, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{type.type}</span>
                            <Badge variant="secondary">{type.percentage}%</Badge>
                          </div>
                          <Badge className={
                            type.performance === 'Yüksək' ? 'bg-green-500' :
                            type.performance === 'Orta' ? 'bg-yellow-500' : 'bg-red-500'
                          }>
                            {type.performance}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Temalər</p>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.content_strategy.themes?.map((theme, i) => (
                          <Badge key={i} variant="outline">{theme}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Ton</p>
                      <p className="font-medium">{analysisData.content_strategy.tone}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Dil Stili</p>
                      <p className="font-medium">{analysisData.content_strategy.language_style}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hashtag Strategy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Hashtag Strategiyası
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Ən çox istifadə olunan hashtag-lar:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysisData.hashtag_strategy.most_used_hashtags?.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="font-mono">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Post başına hashtag sayı</p>
                      <p className="font-semibold">{analysisData.hashtag_strategy.hashtag_count_per_post}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Effektivlik</p>
                      <p className="font-semibold">{analysisData.hashtag_strategy.hashtag_effectiveness}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm font-medium mb-2">Tövsiyələr:</p>
                    <ul className="space-y-1">
                      {analysisData.hashtag_strategy.recommendations?.map((rec, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advantages */}
            <TabsContent value="advantages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rəqabət Üstünlükləri</CardTitle>
                  <CardDescription>Rəqibinizin üstünlükləri və onlara necə cavab verəcəyiniz</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisData.competitive_advantages?.map((advantage, i) => (
                    <div key={i} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{advantage.advantage}</h3>
                        <Badge className={
                          advantage.impact === 'Yüksək' ? 'bg-red-500' :
                          advantage.impact === 'Orta' ? 'bg-yellow-500' : 'bg-green-500'
                        }>
                          {advantage.impact} İmpact
                        </Badge>
                      </div>
                      <p className="text-sm">
                        <strong>Necə edirlər:</strong> {advantage.how_they_do_it}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        <strong>Siz necə rəqabət apara bilərsiniz:</strong> {advantage.how_you_can_compete}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Content Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Boşluqları</CardTitle>
                  <CardDescription>Rəqibinizin etmədiyi və sizin edə biləcəyiniz şeylər</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisData.content_gaps?.map((gap, i) => (
                    <div key={i} className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg space-y-2">
                      <h3 className="font-semibold text-green-800 dark:text-green-400">{gap.gap}</h3>
                      <p className="text-sm">
                        <strong>Niyə vacib:</strong> {gap.why_important}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        <strong>Necə istifadə etmək:</strong> {gap.how_to_leverage}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Opportunities */}
            <TabsContent value="opportunities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sizin üçün İmkanlar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisData.opportunities_for_you?.map((opp, i) => (
                    <div key={i} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getDifficultyIcon(opp.difficulty)}
                          <h3 className="font-semibold">{opp.opportunity}</h3>
                        </div>
                        <Badge variant="outline">{opp.difficulty}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={
                          opp.potential_impact === 'Yüksək' ? 'text-green-600 dark:text-green-400' :
                          opp.potential_impact === 'Orta' ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-gray-600 dark:text-gray-400'
                        }>
                          <strong>Potensial İmpact:</strong> {opp.potential_impact}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Hərəkət addımları:</p>
                        <ul className="space-y-1">
                          {opp.action_steps?.map((step, j) => (
                            <li key={j} className="text-sm flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recommendations */}
            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tövsiyələr</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisData.recommendations?.map((rec, i) => (
                    <div key={i} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2">{rec.category}</Badge>
                          <h3 className="font-semibold">{rec.recommendation}</h3>
                        </div>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Gözlənilən nəticə:</strong> {rec.expected_result}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Xülasə</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">{analysisData.summary.overall_assessment}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Əsas Çıxarışlar:</h3>
                    <ul className="space-y-1">
                      {analysisData.summary.key_takeaways?.map((takeaway, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      Dərhal edin:
                    </h3>
                    <ul className="space-y-1">
                      {analysisData.summary.immediate_actions?.map((action, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h3 className="font-semibold mb-2">Uzunmüddətli Strategiya:</h3>
                    <p className="text-sm">{analysisData.summary.long_term_strategy}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
}

