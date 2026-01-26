'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { falAIAPI, API_BASE_URL } from '@/lib/api';
import { Loader2, Search, Instagram, Facebook, Linkedin, ExternalLink, Users, Heart, MessageCircle, TrendingUp, Briefcase, GraduationCap, MapPin, Award } from 'lucide-react';

const getProxiedImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl) return null;
  if (imageUrl.includes('cdninstagram.com') || imageUrl.includes('instagram.com') || imageUrl.includes('licdn.com')) {
    const baseUrl = API_BASE_URL.replace(/\/api$/, '');
    return `${baseUrl}/api/posts/proxy-image/?url=${encodeURIComponent(imageUrl)}`;
  }
  return imageUrl;
};

export default function ProfileAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [manualData, setManualData] = useState({
    username: '',
    name: '',
    bio: '',
    followers: '',
    following: '',
    posts: '',
    category: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    
    if (!url) {
      setError('Profil linki daxil edin');
      return;
    }

    setIsAnalyzing(true);

    try {
      const payload: any = { url, force_refresh: forceRefresh };
      
      if (showManualInput) {
        payload.manual_data = {
          username: manualData.username,
          name: manualData.name,
          bio: manualData.bio,
          followers: manualData.followers,
          following: manualData.following,
          posts: manualData.posts,
          category: manualData.category
        };
      }
      
      const response = await falAIAPI.analyzeProfileFromUrl(payload);
      setResult(response.data);
      setIsAnalyzing(false);
    } catch (err: any) {
      setIsAnalyzing(false);
      setError(err.response?.data?.error || err.message || 'Analiz xətası');
    }
  };

  const getPlatformIcon = (siteName: string) => {
    const platform = siteName?.toLowerCase() || '';
    if (platform.includes('instagram')) return <Instagram className="h-5 w-5 text-pink-600" />;
    if (platform.includes('facebook')) return <Facebook className="h-5 w-5 text-blue-600" />;
    if (platform.includes('linkedin')) return <Linkedin className="h-5 w-5 text-blue-700" />;
    return <ExternalLink className="h-5 w-5" />;
  };

  return (
    <DashboardLayout
      title="Profil Analizi"
      description="Sosial media profillərini analiz edin və dərin məlumat əldə edin"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search Section */}
        {!result && (
          <Card className="border-2 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Profil Analizi</CardTitle>
              <CardDescription className="text-base">
                Instagram, Facebook və ya LinkedIn profil linkini daxil edin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="url" className="text-base">Profil URL *</Label>
                  <div className="relative">
                    <Input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://instagram.com/username"
                      disabled={isAnalyzing}
                      required
                      className="h-12 text-base pl-4"
                    />
                  </div>
                </div>

                {/* Platform Support Info */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span className="text-sm font-medium">Instagram ✓</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <Linkedin className="h-5 w-5 text-blue-700" />
                    <span className="text-sm font-medium">LinkedIn ✓</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Facebook ~</span>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="manual-input"
                      checked={showManualInput}
                      onChange={(e) => setShowManualInput(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <Label htmlFor="manual-input" className="text-sm cursor-pointer">
                      Məlumatları manual daxil et (Facebook üçün)
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="force-refresh"
                      checked={forceRefresh}
                      onChange={(e) => setForceRefresh(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <Label htmlFor="force-refresh" className="text-sm cursor-pointer text-muted-foreground">
                      Cache-i yenilə
                    </Label>
                  </div>
                </div>

                {/* Manual Input Fields */}
                {showManualInput && (
                  <Card className="border-dashed">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Manual Məlumatlar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Username</Label>
                          <Input
                            value={manualData.username}
                            onChange={(e) => setManualData({...manualData, username: e.target.value})}
                            placeholder="username"
                            disabled={isAnalyzing}
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Ad</Label>
                          <Input
                            value={manualData.name}
                            onChange={(e) => setManualData({...manualData, name: e.target.value})}
                            placeholder="Ad Soyad"
                            disabled={isAnalyzing}
                            className="h-9"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Posts</Label>
                          <Input
                            value={manualData.posts}
                            onChange={(e) => setManualData({...manualData, posts: e.target.value})}
                            placeholder="0"
                            disabled={isAnalyzing}
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Followers</Label>
                          <Input
                            value={manualData.followers}
                            onChange={(e) => setManualData({...manualData, followers: e.target.value})}
                            placeholder="0"
                            disabled={isAnalyzing}
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Following</Label>
                          <Input
                            value={manualData.following}
                            onChange={(e) => setManualData({...manualData, following: e.target.value})}
                            placeholder="0"
                            disabled={isAnalyzing}
                            className="h-9"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">Bio</Label>
                        <Textarea
                          value={manualData.bio}
                          onChange={(e) => setManualData({...manualData, bio: e.target.value})}
                          placeholder="Profil təsviri..."
                          rows={2}
                          disabled={isAnalyzing}
                          className="text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={!url || isAnalyzing}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analiz edilir...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Analiz Et
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="overflow-hidden border-2">
              <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />
              <CardContent className="relative pt-0 pb-6">
                <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 mx-auto md:mx-0">
                      <div className="w-full h-full rounded-full overflow-hidden bg-background border-4 border-background shadow-lg">
                        {result.preview?.image ? (
                          <img
                            src={getProxiedImageUrl(result.preview.image) || result.preview.image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3C/svg%3E';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <Users className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center md:text-left space-y-3 pt-4 md:pt-12">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                        {result.preview?.full_name || result.preview?.title || 'Profil'}
                        {result.preview?.is_verified && (
                          <Badge variant="default" className="ml-2">
                            ✓ Verified
                          </Badge>
                        )}
                      </h2>
                      {result.preview?.username && (
                        <p className="text-muted-foreground mt-1">@{result.preview.username}</p>
                      )}
                    </div>

                    {result.preview?.site_name && (
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        {getPlatformIcon(result.preview.site_name)}
                        <span className="text-sm font-medium">{result.preview.site_name}</span>
                        {result.preview?.category && (
                          <Badge variant="secondary">{result.preview.category}</Badge>
                        )}
                      </div>
                    )}

                    {result.preview?.biography && (
                      <p className="text-sm text-muted-foreground max-w-2xl">
                        {result.preview.biography}
                      </p>
                    )}

                    {result.preview?.headline && (
                      <p className="text-sm font-medium text-foreground">
                        {result.preview.headline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stats Grid */}
                {result.preview?.stats && (
                  <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{result.preview.stats.posts || 0}</p>
                      <p className="text-sm text-muted-foreground">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{result.preview.stats.followers || 0}</p>
                      <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {result.preview.stats.following || result.preview.stats.connections || 0}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {result.preview?.site_name?.toLowerCase().includes('linkedin') ? 'Connections' : 'Following'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* LinkedIn Specific Info */}
            {result.preview?.site_name?.toLowerCase().includes('linkedin') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Experience */}
                {result.preview?.experience && result.preview.experience.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Təcrübə
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.preview.experience.slice(0, 3).map((exp: any, idx: number) => (
                        <div key={idx} className="p-3 border rounded-lg">
                          <p className="font-semibold">{exp.title || exp.position}</p>
                          <p className="text-sm text-muted-foreground">{exp.company || exp.companyName}</p>
                          {exp.period && <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Education */}
                {result.preview?.education && result.preview.education.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Təhsil
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.preview.education.slice(0, 3).map((edu: any, idx: number) => (
                        <div key={idx} className="p-3 border rounded-lg">
                          <p className="font-semibold">{edu.schoolName || edu.school}</p>
                          <p className="text-sm text-muted-foreground">{edu.degree || edu.fieldOfStudy}</p>
                          {edu.period && <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Skills */}
                {result.preview?.skills && result.preview.skills.length > 0 && (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Bacarıqlar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.preview.skills.map((skill: any, idx: number) => (
                          <Badge key={idx} variant="outline">
                            {typeof skill === 'string' ? skill : skill.name || skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* SMM Analysis */}
            {result.smm_analysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    SMM Analizi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.smm_analysis.account_type && (
                      <div className="p-4 border rounded-lg">
                        <Label className="text-xs text-muted-foreground">Hesab Tipi</Label>
                        <p className="font-semibold mt-1">{result.smm_analysis.account_type}</p>
                      </div>
                    )}
                    {result.smm_analysis.niche && (
                      <div className="p-4 border rounded-lg">
                        <Label className="text-xs text-muted-foreground">Niche</Label>
                        <p className="font-semibold mt-1">{result.smm_analysis.niche}</p>
                      </div>
                    )}
                    {result.smm_analysis.content_style && (
                      <div className="p-4 border rounded-lg">
                        <Label className="text-xs text-muted-foreground">Kontent Stili</Label>
                        <p className="font-semibold mt-1">{result.smm_analysis.content_style}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Latest Posts */}
            {result.preview?.latest_posts && result.preview.latest_posts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Son Paylaşımlar</CardTitle>
                  <CardDescription>{result.preview.latest_posts.length} paylaşım</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {result.preview.latest_posts.map((post: any, idx: number) => (
                      <Card key={post.id || idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative aspect-square bg-muted">
                          {post.display_url || post.thumbnail_url || post.image ? (
                            <img
                              src={getProxiedImageUrl(post.thumbnail_url || post.display_url || post.image) || (post.thumbnail_url || post.display_url || post.image)}
                              alt="Post"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              crossOrigin="anonymous"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <MessageCircle className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                          {post.type === 'Video' && (
                            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                              ▶ Video
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3 space-y-2">
                          {post.caption && (
                            <p className="text-sm line-clamp-2">{post.caption}</p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {post.likes_count || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {post.comments_count || 0}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setResult(null);
                  setUrl('');
                  setManualData({
                    username: '',
                    name: '',
                    bio: '',
                    followers: '',
                    following: '',
                    posts: '',
                    category: ''
                  });
                }}
                variant="outline"
                className="flex-1"
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