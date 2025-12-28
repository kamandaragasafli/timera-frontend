'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { falAIAPI } from '@/lib/api';
import { Loader2, CheckCircle2, AlertTriangle, Instagram, TrendingUp, Hash, Calendar, Target, History, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

interface BioSuggestion {
  bio: string;
  explanation: string;
}

interface HashtagStrategy {
  high_competition: string[];
  medium_competition: string[];
  low_competition: string[];
  usage_tips: string;
}

interface ContentStrategy {
  content_mix: {
    [key: string]: number;
  };
  post_frequency: string;
  story_frequency: string;
  reels_frequency: string;
  content_pillars: string[];
}

interface TimeSlot {
  time_range?: string;
  best_time: string;
  effectiveness?: string;
}

interface PostingSchedule {
  weekdays: {
    morning: TimeSlot | string;
    afternoon: TimeSlot | string;
    evening: TimeSlot | string;
    best_time: string;
    best_time_reason?: string;
  };
  weekend: {
    best_time: string;
    alternative_times?: string[];
    best_time_reason?: string;
  };
  story_times: string[];
  top_3_best_times?: Array<{
    time: string;
    day_type: string;
    effectiveness_score: string;
    reason: string;
  }>;
}

interface GrowthStrategy {
  '30_day_plan': {
    week_1: string;
    week_2: string;
    week_3: string;
    week_4: string;
  };
  realistic_goals: {
    followers_growth: string;
    engagement_target: string;
  };
  metrics_to_track: string[];
}

interface OverallAssessment {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  priority_actions: string[];
}

interface PostAnalysis {
  total_posts: number;
  analyzed_posts: number;
  analysis_available: boolean;
  message?: string;
  optimal_posting_times?: Array<{
    time: string;
    frequency: number;
    percentage: number;
    reason: string;
  }>;
  most_active_days?: Array<{
    day: string;
    count: number;
  }>;
  time_slot_distribution?: {
    [key: string]: {
      count: number;
      percentage: number;
    };
  };
  average_posting_hour?: number;
  median_posting_hour?: number;
  average_days_between_posts?: number;
  median_days_between_posts?: number;
  posting_consistency?: string;
  analysis_period?: {
    first_post: string;
    last_post: string;
    days_span: number;
  };
}

interface AnalysisResult {
  success: boolean;
  profile_info: {
    username: string;
    followers: number;
    following: number;
    posts: number;
    engagement_rate: number;
    niche: string;
    account_stage: string;
    following_ratio: number;
  };
  bio_suggestions: BioSuggestion[];
  hashtag_strategy: HashtagStrategy;
  content_strategy: ContentStrategy;
  posting_schedule: PostingSchedule;
  post_analysis?: PostAnalysis;
  engagement_tips: string[];
  growth_strategy: GrowthStrategy;
  overall_assessment: OverallAssessment;
  triggered_rules: Array<{
    rule_id: string;
    severity: string;
    category: string;
    message: string;
    recommendation: string;
  }>;
  generated_at: string;
}

const NICHE_OPTIONS = [
  'Fashion',
  'Beauty',
  'Tech',
  'Food',
  'Travel',
  'Fitness',
  'Business',
  'Education',
  'Art',
  'Music',
  'Sports',
  'Lifestyle',
  'Health',
  'Photography',
  'Gaming',
  'Fashion & Style',
  'Home & Decor',
  'Pets',
  'Motivation',
  'Other'
];

const POSTING_FREQUENCY_OPTIONS = [
  { value: '1-2', label: 'Həftədə 1-2 dəfə' },
  { value: '3-4', label: 'Həftədə 3-4 dəfə' },
  { value: '5-7', label: 'Həftədə 5-7 dəfə' },
  { value: 'daily', label: 'Gündə 1 dəfə' },
  { value: '2plus', label: 'Gündə 2+ dəfə' }
];

export default function InstagramSMMPage() {
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [savedProfiles, setSavedProfiles] = useState<any[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(false);

  useEffect(() => {
    loadSavedProfiles();
  }, []);

  const loadSavedProfiles = async () => {
    setLoadingSaved(true);
    try {
      const response = await falAIAPI.getSavedProfiles('instagram');
      setSavedProfiles(response.data.profiles || []);
    } catch (err: any) {
      console.error('Saved profiles yüklənə bilmədi:', err);
    } finally {
      setLoadingSaved(false);
    }
  };

  const handleSelectProfile = async (profile: any) => {
    setSelectedProfile(profile);
    setError('');
    setResult(null);
    
    if (!profile) return;
    
    setIsAnalyzing(true);

    try {
      const preview = profile.preview_data || {};
      const stats = preview.stats || {};
      
      // Debug: log stats
      console.log('📊 Profile stats:', stats);
      console.log('📊 Profile preview:', preview);
      
      // Parse stats - handle both string and number formats
      const followers = typeof stats.followers === 'string' 
        ? parseInt(stats.followers.replace(/[^\d]/g, '')) || 0
        : (stats.followers || 0);
      const following = typeof stats.following === 'string'
        ? parseInt(stats.following.replace(/[^\d]/g, '')) || 0
        : (stats.following || 0);
      const posts = typeof stats.posts === 'string'
        ? parseInt(stats.posts.replace(/[^\d]/g, '')) || 0
        : (stats.posts || 0);
      
      console.log('📊 Parsed values:', { followers, following, posts });
      
      const response = await falAIAPI.analyzeInstagramProfile({
        instagram_username: profile.username || '',
        current_bio: preview.biography || preview.description || '',
        followers_count: followers,
        following_count: following,
        posts_count: posts,
        posting_frequency: '3-4', // Default
        niche: profile.smm_analysis?.niche || ''
      });
      
      setResult(response.data);
      setIsAnalyzing(false);
      
      // Scroll to results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setIsAnalyzing(false);
      setError(err.response?.data?.error || err.message || 'Analiz xətası');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 max-w-7xl pt-20 pb-4 md:pt-4 md:pb-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex flex-wrap items-center gap-2">
            <Instagram className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />
            <span>Instagram SMM Analizi</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Saxlanılmış profilləri seçin və AI-powered SMM tövsiyələri alın
          </p>
        </div>

        {/* Saved Profiles Section */}
        {!result && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Saxlanılmış Profillər
              </CardTitle>
              <CardDescription>
                Əvvəl analiz etdiyiniz profillər. Profilə klikləyərək SMM analizi alın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingSaved ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedProfiles.map((profile) => (
                    <div
                      key={profile.id}
                      onClick={() => handleSelectProfile(profile)}
                      className={`border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                        selectedProfile?.id === profile.id ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {profile.image && (
                          <img
                            src={profile.image}
                            alt={profile.username}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold truncate flex-1 min-w-0">
                              {profile.full_name || profile.username || 'Unknown'}
                            </p>
                            {profile.smm_analysis?.account_type && (
                              <Badge variant="outline" className="text-xs flex-shrink-0">
                                {profile.smm_analysis.account_type}
                              </Badge>
                            )}
                          </div>
                          {profile.username && (
                            <p className="text-sm text-muted-foreground truncate">
                              @{profile.username}
                            </p>
                          )}
                          {profile.stats && (
                            <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                              <span>{profile.stats.posts || 0} posts</span>
                              <span>{profile.stats.followers || 0} followers</span>
                            </div>
                          )}
                          {profile.last_accessed && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(profile.last_accessed).toLocaleDateString('az-AZ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!result && savedProfiles.length === 0 && !loadingSaved && (
          <Card>
            <CardContent className="py-12 text-center">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hələ heç bir profil yoxdur</h3>
              <p className="text-muted-foreground mb-4">
                İlk öncə "Profil Link Analizi" səhifəsindən profil analiz edin
              </p>
              <Button asChild>
                <a href="/profile-analyzer">Profil Analiz Et</a>
              </Button>
            </CardContent>
          </Card>
        )}

        {isAnalyzing && (
          <Card>
            <CardContent className="py-12 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">SMM Analizi hazırlanır...</h3>
              <p className="text-muted-foreground">
                {selectedProfile?.username && `@${selectedProfile.username} profili analiz edilir`}
              </p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="space-y-6">
            {/* Success Message */}
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
              <AlertDescription className="break-words">
                <strong>@{result.profile_info.username}</strong> profili uğurla analiz edildi!
                <br />
                <span className="text-sm text-muted-foreground">
                  Hesab mərhələsi: {result.profile_info.account_stage}
                </span>
              </AlertDescription>
            </Alert>

            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profil Statistikası</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-muted rounded-lg">
                    <p className="text-xl sm:text-2xl font-bold">{result.profile_info.followers.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Followers</p>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-muted rounded-lg">
                    <p className="text-xl sm:text-2xl font-bold">{result.profile_info.posts}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Postlar</p>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-muted rounded-lg">
                    <p className="text-xl sm:text-2xl font-bold">{result.profile_info.engagement_rate}%</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Engagement</p>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-muted rounded-lg">
                    <p className="text-xl sm:text-2xl font-bold">{result.profile_info.following_ratio.toFixed(2)}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-words">Following Nisbəti</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Content */}
            <Tabs defaultValue="bio" className="w-full">
              <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                <TabsList className="inline-flex w-auto md:w-full h-auto md:h-10">
                  <TabsTrigger value="bio" className="flex-shrink-0 whitespace-nowrap">Bio</TabsTrigger>
                  <TabsTrigger value="rules" className="flex-shrink-0 whitespace-nowrap">Qaydalar</TabsTrigger>
                  <TabsTrigger value="posts" className="flex-shrink-0 whitespace-nowrap">Postlar</TabsTrigger>
                  <TabsTrigger value="hashtags" className="flex-shrink-0 whitespace-nowrap">Hashtag</TabsTrigger>
                  <TabsTrigger value="content" className="flex-shrink-0 whitespace-nowrap">Kontent</TabsTrigger>
                  <TabsTrigger value="schedule" className="flex-shrink-0 whitespace-nowrap">Cədvəl</TabsTrigger>
                  <TabsTrigger value="growth" className="flex-shrink-0 whitespace-nowrap">İnkişaf</TabsTrigger>
                  <TabsTrigger value="assessment" className="flex-shrink-0 whitespace-nowrap">Qiymət</TabsTrigger>
                </TabsList>
              </div>

              {/* Bio Suggestions */}
              <TabsContent value="bio" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Bio Təklifləri</CardTitle>
                    <CardDescription>AI-generated bio variantları</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.bio_suggestions?.map((suggestion, idx) => (
                      <div key={idx} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline">Variant {idx + 1}</Badge>
                        </div>
                        <p className="font-medium text-lg">{suggestion.bio}</p>
                        <p className="text-sm text-muted-foreground">{suggestion.explanation}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Triggered Rules - NEW */}
              <TabsContent value="rules" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Aktiv Qaydalar 🎯</CardTitle>
                    <CardDescription>
                      Profil metriklərinə əsasən aktivləşən biznes qaydaları
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.triggered_rules && result.triggered_rules.length > 0 ? (
                      result.triggered_rules.map((rule: any, idx: number) => (
                        <div 
                          key={idx} 
                          className={`p-4 border rounded-lg space-y-2 ${
                            rule.severity === 'critical' ? 'border-red-500 bg-red-50' :
                            rule.severity === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                            'border-blue-500 bg-blue-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={
                                  rule.severity === 'critical' ? 'destructive' :
                                  rule.severity === 'warning' ? 'default' :
                                  'secondary'
                                }
                              >
                                {rule.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{rule.category}</Badge>
                            </div>
                          </div>
                          <p className="font-medium">{rule.message}</p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Tövsiyə:</strong> {rule.recommendation}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                        <p>Heç bir kritik problem tapılmadı! 🎉</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Post Analysis */}
              <TabsContent value="posts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>📊 Post Analizi</CardTitle>
                    <CardDescription>
                      Post paylaşım vaxt aralıqlarının analizi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {result.post_analysis?.analysis_available ? (
                      <>
                        {/* Optimal Posting Times */}
                        {result.post_analysis.optimal_posting_times && (
                          <div>
                            <h4 className="font-semibold mb-3">Optimal Paylaşım Saatları</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {result.post_analysis.optimal_posting_times.map((time: any, idx: number) => (
                                <div key={idx} className="p-4 border rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl font-bold">{time.time}</span>
                                    <Badge>{time.percentage}%</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{time.reason}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Time Slot Distribution */}
                        {result.post_analysis.time_slot_distribution && (
                          <div>
                            <h4 className="font-semibold mb-3">Vaxt Aralığı Paylanması</h4>
                            <div className="space-y-2">
                              {Object.entries(result.post_analysis.time_slot_distribution).map(([slot, data]: [string, any]) => (
                                <div key={slot} className="flex items-center justify-between p-3 border rounded-lg">
                                  <span className="font-medium capitalize">{slot}</span>
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground">{data.count} post</span>
                                    <Badge variant="secondary">{data.percentage}%</Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Most Active Days */}
                        {result.post_analysis.most_active_days && (
                          <div>
                            <h4 className="font-semibold mb-3">Ən Aktiv Günlər</h4>
                            <div className="flex flex-wrap gap-2">
                              {result.post_analysis.most_active_days.map((day: any, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-sm">
                                  {day.day}: {day.count} post
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Posting Consistency */}
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Paylaşım Davamlılığı</h4>
                          <p className="text-sm text-muted-foreground">
                            Postlar arası orta gün: {result.post_analysis.average_days_between_posts} gün
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Davamlılıq: <Badge variant="secondary">{result.post_analysis.posting_consistency}</Badge>
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                        <p>{result.post_analysis?.message || 'Post analizi mövcud deyil'}</p>
                        <p className="text-sm mt-2">Post-lar scrape edilməyib və ya timestamp-lər parse edilə bilməyib</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Hashtag Strategy */}
              <TabsContent value="hashtags" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      Hashtag Strategiyası
                    </CardTitle>
                    <CardDescription>{result.hashtag_strategy?.note || 'Niche-based hashtag strategy'}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Note */}
                    {result.hashtag_strategy?.note && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">{result.hashtag_strategy.note}</p>
                        {result.hashtag_strategy.recommendation && (
                          <p className="text-sm mt-2 text-blue-700">{result.hashtag_strategy.recommendation}</p>
                        )}
                      </div>
                    )}

                    {/* Focus Areas */}
                    {result.hashtag_strategy?.niche_focus_areas && (
                      <div>
                        <h4 className="font-semibold mb-3">Niche Focus Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.hashtag_strategy.niche_focus_areas.map((area: string, idx: number) => (
                            <Badge key={idx} variant="secondary">{area}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Competition Mix */}
                    {result.hashtag_strategy?.competition_mix && (
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Competition Mix</h4>
                        <p className="text-sm text-muted-foreground">{result.hashtag_strategy.competition_mix}</p>
                      </div>
                    )}

                    {/* Count Recommendation */}
                    {result.hashtag_strategy?.count_recommendation && (
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Hashtag Sayı</h4>
                        <p className="text-sm text-muted-foreground">{result.hashtag_strategy.count_recommendation}</p>
                      </div>
                    )}

                    {/* Strategy Tips */}
                    {result.hashtag_strategy?.strategy_tips && (
                      <div>
                        <h4 className="font-semibold mb-3">Strategiya Tipləri</h4>
                        <ul className="space-y-2">
                          {result.hashtag_strategy.strategy_tips.map((tip: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Research Tips */}
                    {result.hashtag_strategy?.research_tips && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold mb-2 text-yellow-900">Research Tips</h4>
                        <p className="text-sm text-yellow-800">{result.hashtag_strategy.research_tips}</p>
                      </div>
                    )}

                    {/* Tools */}
                    {result.hashtag_strategy?.tools && (
                      <div>
                        <h4 className="font-semibold mb-3">Tövsiyə olunan alətlər</h4>
                        <ul className="space-y-2">
                          {result.hashtag_strategy.tools.map((tool: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Target className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Strategy */}
              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Strategiyası</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Content Mix */}
                    <div>
                      <h4 className="font-semibold mb-3">Kontent Qarışığı</h4>
                      <div className="space-y-3">
                        {Object.entries(result.content_strategy.content_mix).map(([type, percentage]) => (
                          <div key={type} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                            <span className="text-sm capitalize w-24 sm:w-32 flex-shrink-0">{type}</span>
                            <div className="flex-1 w-full sm:w-auto h-6 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-right font-medium w-12 flex-shrink-0">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Frequencies */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Post Tezliyi</p>
                        <p className="font-semibold">{result.content_strategy.post_frequency}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Story Tezliyi</p>
                        <p className="font-semibold">{result.content_strategy.story_frequency}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Reels Tezliyi</p>
                        <p className="font-semibold">{result.content_strategy.reels_frequency}</p>
                      </div>
                    </div>

                    {/* Content Pillars */}
                    <div>
                      <h4 className="font-semibold mb-2">Kontent Sütunları</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.content_strategy.content_pillars.map((pillar, idx) => (
                          <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                            {pillar}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Engagement Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Artırma Tiplər</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.engagement_tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Posting Schedule */}
              <TabsContent value="schedule" className="space-y-4">
                {/* Top 3 Best Times */}
                {result.posting_schedule.top_3_best_times && 
                 Array.isArray(result.posting_schedule.top_3_best_times) && 
                 result.posting_schedule.top_3_best_times.length > 0 && (
                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <TrendingUp className="h-5 w-5" />
                        Top 3 Ən Effektiv Paylaşım Saatları
                      </CardTitle>
                      <CardDescription>
                        Bu saatlarda paylaşım etmək ən yüksək engagement və reach göstərəcək
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {result.posting_schedule.top_3_best_times.map((item: any, idx: number) => (
                          <div key={idx} className={`p-4 rounded-lg border-2 ${
                            idx === 0 ? 'bg-primary/10 border-primary' : 
                            idx === 1 ? 'bg-blue-50 border-blue-300 dark:bg-blue-950/20 dark:border-blue-700' : 
                            'bg-green-50 border-green-300 dark:bg-green-950/20 dark:border-green-700'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant={idx === 0 ? "default" : "secondary"} className="text-lg font-bold">
                                #{idx + 1}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{item?.day_type || ''}</span>
                            </div>
                            <p className="text-3xl font-bold mb-2">{item?.time || ''}</p>
                            <p className="text-sm font-semibold text-primary mb-2">
                              Effektivlik: {item?.effectiveness_score || ''}
                            </p>
                            <p className="text-sm text-muted-foreground">{item?.reason || ''}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Ətraflı Paylaşım Cədvəli
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Weekdays */}
                    <div>
                      <h4 className="font-semibold mb-3">Həftə İçi</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(() => {
                          // Helper function to safely get time slot data
                          const getTimeSlot = (slot: any) => {
                            if (typeof slot === 'string') {
                              return { time_range: slot, best_time: '', effectiveness: '' };
                            }
                            if (slot && typeof slot === 'object') {
                              return {
                                time_range: slot.time_range || '',
                                best_time: slot.best_time || '',
                                effectiveness: slot.effectiveness || ''
                              };
                            }
                            return { time_range: '', best_time: '', effectiveness: '' };
                          };

                          const morning = getTimeSlot(result.posting_schedule.weekdays.morning);
                          const afternoon = getTimeSlot(result.posting_schedule.weekdays.afternoon);
                          const evening = getTimeSlot(result.posting_schedule.weekdays.evening);
                          
                          return (
                            <>
                              <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">🌅 Səhər</p>
                                <p className="font-semibold text-lg mb-1">
                                  {morning.time_range || morning.best_time || ''}
                                </p>
                                {morning.best_time && morning.time_range && (
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Optimal: <span className="font-medium">{morning.best_time}</span>
                                  </p>
                                )}
                                {morning.effectiveness && (
                                  <p className="text-xs text-muted-foreground italic mt-2">{morning.effectiveness}</p>
                                )}
                              </div>
                              <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">☀️ Gündüz</p>
                                <p className="font-semibold text-lg mb-1">
                                  {afternoon.time_range || afternoon.best_time || ''}
                                </p>
                                {afternoon.best_time && afternoon.time_range && (
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Optimal: <span className="font-medium">{afternoon.best_time}</span>
                                  </p>
                                )}
                                {afternoon.effectiveness && (
                                  <p className="text-xs text-muted-foreground italic mt-2">{afternoon.effectiveness}</p>
                                )}
                              </div>
                              <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">🌆 Axşam</p>
                                <p className="font-semibold text-lg mb-1">
                                  {evening.time_range || evening.best_time || ''}
                                </p>
                                {evening.best_time && evening.time_range && (
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Optimal: <span className="font-medium">{evening.best_time}</span>
                                  </p>
                                )}
                                {evening.effectiveness && (
                                  <p className="text-xs text-muted-foreground italic mt-2">{evening.effectiveness}</p>
                                )}
                              </div>
                              <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
                                <p className="text-sm text-primary mb-1 font-semibold">⭐ Ən Yaxşı Vaxt (Həftə İçi)</p>
                                <p className="font-bold text-primary text-2xl mb-2">
                                  {result.posting_schedule.weekdays.best_time || ''}
                                </p>
                                {result.posting_schedule.weekdays.best_time_reason && (
                                  <p className="text-xs text-primary/80">{result.posting_schedule.weekdays.best_time_reason}</p>
                                )}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Weekend */}
                    <div>
                      <h4 className="font-semibold mb-3">Həftə Sonu</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
                          <p className="text-sm text-primary mb-1 font-semibold">⭐ Ən Yaxşı Vaxt</p>
                          <p className="font-bold text-primary text-2xl mb-2">
                            {result.posting_schedule.weekend?.best_time || ''}
                          </p>
                          {result.posting_schedule.weekend?.best_time_reason && (
                            <p className="text-xs text-primary/80">{result.posting_schedule.weekend.best_time_reason}</p>
                          )}
                        </div>
                        {result.posting_schedule.weekend?.alternative_times && 
                         Array.isArray(result.posting_schedule.weekend.alternative_times) &&
                         result.posting_schedule.weekend.alternative_times.length > 0 && (
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">Alternativ Saatlar</p>
                            <div className="flex flex-wrap gap-2">
                              {result.posting_schedule.weekend.alternative_times.map((time: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-sm">
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Story Times */}
                    <div>
                      <h4 className="font-semibold mb-3">📱 Story Vaxtları</h4>
                      {result.posting_schedule.story_times && 
                       Array.isArray(result.posting_schedule.story_times) && (
                        <>
                          <div className="flex flex-wrap gap-3">
                            {result.posting_schedule.story_times.map((time: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-sm py-2 px-4 text-base">
                                {time}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Story-ləri bu saatlarda paylaşmaq ən yaxşı engagement verəcək
                          </p>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Growth Strategy */}
              <TabsContent value="growth" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      30 Günlük Growth Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(result.growth_strategy['30_day_plan']).map(([week, plan]) => {
                      const weekNames: { [key: string]: string } = {
                        'week_1': 'Həftə 1',
                        'week_2': 'Həftə 2',
                        'week_3': 'Həftə 3',
                        'week_4': 'Həftə 4'
                      };
                      return (
                        <div key={week} className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">{weekNames[week] || week.replace('_', ' ')}</h4>
                          <p className="text-sm">{plan}</p>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Realistik Hədəflər</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Followers Artımı</p>
                      <p className="text-2xl font-bold">{result.growth_strategy.realistic_goals.followers_growth}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Engagement Hədəfi</p>
                      <p className="text-2xl font-bold">{result.growth_strategy.realistic_goals.engagement_target}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>İzləməli Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.growth_strategy.metrics_to_track.map((metric, idx) => (
                        <Badge key={idx} variant="secondary">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Overall Assessment */}
              <TabsContent value="assessment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">Güclü Tərəflər</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.overall_assessment.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Weaknesses */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-orange-600">Zəif Tərəflər</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.overall_assessment.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-600">Fürsətlər</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.overall_assessment.opportunities.map((opportunity, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Priority Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-purple-600">Öncelikli Addımlar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.overall_assessment.priority_actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Target className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm font-medium">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
              onClick={() => {
                setResult(null);
                setUsername('');
                setCurrentBio('');
                setFollowers('');
                setFollowing('');
                setPosts('');
                setPostingFrequency('');
                setNiche('');
              }}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Yeni Analiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

