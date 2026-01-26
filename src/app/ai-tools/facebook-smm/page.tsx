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
import { Loader2, CheckCircle2, AlertTriangle, Facebook, TrendingUp, Calendar, Target, History } from 'lucide-react';
import { useEffect } from 'react';

interface AboutSuggestion {
  about: string;
  explanation: string;
}

interface ContentStrategy {
  content_mix: {
    [key: string]: number;
  };
  post_frequency: string;
  video_frequency: string;
  live_frequency: string;
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

interface AnalysisResult {
  success: boolean;
  profile_info: {
    page_name: string;
    followers: number;
    likes: number;
    posts: number;
    engagement_rate: number;
    niche: string;
    page_stage: string;
    engagement_ratio: number;
  };
  analysis: {
    about_suggestions: AboutSuggestion[];
    content_strategy: ContentStrategy;
    posting_schedule: PostingSchedule;
    engagement_tips: string[];
    growth_strategy: GrowthStrategy;
    overall_assessment: OverallAssessment;
  };
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

export default function FacebookSMMPage() {
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
      const response = await falAIAPI.getSavedProfiles('facebook');
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
      
      const followers = typeof stats.followers === 'string' 
        ? parseInt(stats.followers.replace(/[^\d]/g, '')) || 0
        : (stats.followers || 0);
      const likes = typeof stats.likes === 'string'
        ? parseInt(stats.likes.replace(/[^\d]/g, '')) || 0
        : (stats.likes || 0);
      const posts = typeof stats.posts === 'string'
        ? parseInt(stats.posts.replace(/[^\d]/g, '')) || 0
        : (stats.posts || 0);
      
      const response = await falAIAPI.analyzeFacebookProfile({
        page_name: profile.full_name || profile.username || '',
        current_about: preview.biography || preview.description || '',
        followers_count: followers,
        likes_count: likes,
        posts_count: posts,
        posting_frequency: '3-4',
        niche: profile.smm_analysis?.niche || ''
      });
      
      setResult(response.data);
      setIsAnalyzing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setIsAnalyzing(false);
      setError(err.response?.data?.error || err.message || 'Analiz xətası');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Facebook className="h-8 w-8 text-blue-600" />
            Facebook Page SMM Analizi
          </h1>
          <p className="text-muted-foreground">
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
              ) : savedProfiles.length > 0 ? (
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
                          <div className="flex items-center gap-2">
                            <p className="font-semibold truncate">
                              {profile.full_name || profile.username || 'Unknown'}
                            </p>
                            {profile.smm_analysis?.account_type && (
                              <Badge variant="outline" className="text-xs">
                                {profile.smm_analysis.account_type}
                              </Badge>
                            )}
                          </div>
                          {profile.username && (
                            <p className="text-sm text-muted-foreground truncate">
                              {profile.username}
                            </p>
                          )}
                          {profile.stats && (
                            <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                              <span>{profile.stats.posts || 0} posts</span>
                              <span>{profile.stats.followers || 0} followers</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Hələ heç bir profil yoxdur</h3>
                  <p className="text-muted-foreground mb-4">
                    İlk öncə "Profil Link Analizi" səhifəsindən profil analiz edin
                  </p>
                  <Button asChild>
                    <a href="/profile-analyzer">Profil Analiz Et</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {isAnalyzing && (
          <Card>
            <CardContent className="py-12 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">SMM Analizi hazırlanır...</h3>
              <p className="text-muted-foreground">
                {selectedProfile?.username && `${selectedProfile.username} profili analiz edilir`}
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
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <strong>{result.profile_info.page_name}</strong> Page-i uğurla analiz edildi!
                <br />
                <span className="text-sm text-muted-foreground">
                  Page mərhələsi: {result.profile_info.page_stage}
                </span>
              </AlertDescription>
            </Alert>

            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Page Statistikası</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{result.profile_info.followers.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{result.profile_info.likes.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Likes</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{result.profile_info.posts}</p>
                    <p className="text-sm text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{result.profile_info.engagement_rate}%</p>
                    <p className="text-sm text-muted-foreground">Engagement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Content - Similar structure to Instagram but adapted for Facebook */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="growth">Growth</TabsTrigger>
                <TabsTrigger value="assessment">Qiymətləndirmə</TabsTrigger>
              </TabsList>

              {/* About Suggestions */}
              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About Təklifləri</CardTitle>
                    <CardDescription>AI-generated about variantları</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.analysis.about_suggestions?.map((suggestion, idx) => (
                      <div key={idx} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline">Variant {idx + 1}</Badge>
                        </div>
                        <p className="font-medium text-lg">{suggestion.about}</p>
                        <p className="text-sm text-muted-foreground">{suggestion.explanation}</p>
                      </div>
                    ))}
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
                      <h4 className="font-semibold mb-3">Content Mix</h4>
                      <div className="space-y-2">
                        {Object.entries(result.analysis.content_strategy.content_mix).map(([type, percentage]) => (
                          <div key={type} className="flex items-center gap-3">
                            <span className="w-32 text-sm capitalize">{type}</span>
                            <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-12 text-sm text-right font-medium">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Frequencies */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Post Tezliyi</p>
                        <p className="font-semibold">{result.analysis.content_strategy.post_frequency}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Video Tezliyi</p>
                        <p className="font-semibold">{result.analysis.content_strategy.video_frequency}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Live Tezliyi</p>
                        <p className="font-semibold">{result.analysis.content_strategy.live_frequency}</p>
                      </div>
                    </div>

                    {/* Content Pillars */}
                    <div>
                      <h4 className="font-semibold mb-2">Content Pillars</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.analysis.content_strategy.content_pillars?.map((pillar, idx) => (
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
                      {result.analysis.engagement_tips?.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Posting Schedule - Same structure as Instagram */}
              <TabsContent value="schedule" className="space-y-4">
                {/* Top 3 Best Times */}
                {result.analysis.posting_schedule.top_3_best_times && 
                 Array.isArray(result.analysis.posting_schedule.top_3_best_times) && 
                 result.analysis.posting_schedule.top_3_best_times.length > 0 && (
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
                        {result.analysis.posting_schedule.top_3_best_times.map((item: any, idx: number) => (
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
                    {/* Weekdays - Same structure as Instagram */}
                    <div>
                      <h4 className="font-semibold mb-3">Həftə İçi</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(() => {
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

                          const morning = getTimeSlot(result.analysis.posting_schedule.weekdays.morning);
                          const afternoon = getTimeSlot(result.analysis.posting_schedule.weekdays.afternoon);
                          const evening = getTimeSlot(result.analysis.posting_schedule.weekdays.evening);
                          
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
                                  {result.analysis.posting_schedule.weekdays.best_time || ''}
                                </p>
                                {result.analysis.posting_schedule.weekdays.best_time_reason && (
                                  <p className="text-xs text-primary/80">{result.analysis.posting_schedule.weekdays.best_time_reason}</p>
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
                            {result.analysis.posting_schedule.weekend?.best_time || ''}
                          </p>
                          {result.analysis.posting_schedule.weekend?.best_time_reason && (
                            <p className="text-xs text-primary/80">{result.analysis.posting_schedule.weekend.best_time_reason}</p>
                          )}
                        </div>
                        {result.analysis.posting_schedule.weekend?.alternative_times && 
                         Array.isArray(result.analysis.posting_schedule.weekend.alternative_times) &&
                         result.analysis.posting_schedule.weekend.alternative_times.length > 0 && (
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">Alternativ Saatlar</p>
                            <div className="flex flex-wrap gap-2">
                              {result.analysis.posting_schedule.weekend.alternative_times.map((time: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-sm">
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Growth Strategy - Same structure as Instagram */}
              <TabsContent value="growth" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      30 Günlük Growth Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(result.analysis.growth_strategy['30_day_plan']).map(([week, plan]) => (
                      <div key={week} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2 capitalize">{week.replace('_', ' ')}</h4>
                        <p className="text-sm">{plan}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Realistik Hədəflər</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Followers Artımı</p>
                      <p className="text-2xl font-bold">{result.analysis.growth_strategy.realistic_goals.followers_growth}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Engagement Hədəfi</p>
                      <p className="text-2xl font-bold">{result.analysis.growth_strategy.realistic_goals.engagement_target}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>İzləməli Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.analysis.growth_strategy.metrics_to_track?.map((metric, idx) => (
                        <Badge key={idx} variant="secondary">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Overall Assessment - Same structure as Instagram */}
              <TabsContent value="assessment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">Güclü Tərəflər</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.analysis.overall_assessment.strengths?.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-orange-600">Zəif Tərəflər</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.analysis.overall_assessment.weaknesses?.map((weakness, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-blue-600">Fürsətlər</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.analysis.overall_assessment.opportunities?.map((opportunity, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-purple-600">Öncelikli Addımlar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.analysis.overall_assessment.priority_actions?.map((action, idx) => (
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
                  setPageName('');
                  setCurrentAbout('');
                  setFollowers('');
                  setLikes('');
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

