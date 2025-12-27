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
import { Loader2, CheckCircle2, AlertTriangle, TrendingUp, ExternalLink, Image as ImageIcon, Instagram, Facebook, Linkedin } from 'lucide-react';

// Helper function to proxy Instagram/LinkedIn images through backend
const getProxiedImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl) return null;
  
  // If it's an Instagram/LinkedIn CDN URL, proxy it through our backend
  if (imageUrl.includes('cdninstagram.com') || imageUrl.includes('instagram.com') || imageUrl.includes('licdn.com')) {
    const baseUrl = API_BASE_URL.replace(/\/api$/, '');
    const proxiedUrl = `${baseUrl}/api/posts/proxy-image/?url=${encodeURIComponent(imageUrl)}`;
    console.log('🖼️ Proxying image:', imageUrl.substring(0, 100), '→', proxiedUrl.substring(0, 100));
    return proxiedUrl;
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
      
      console.log('📊 Full response data:', response.data);
      console.log('📊 Preview data:', response.data.preview);
      console.log('📊 Stats:', response.data.preview?.stats);
      console.log('📊 LinkedIn fields:', {
        experience: response.data.preview?.experience,
        education: response.data.preview?.education,
        skills: response.data.preview?.skills,
        location: response.data.preview?.location,
        headline: response.data.preview?.headline
      });
      
      setResult(response.data);
      setIsAnalyzing(false);
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
            <ExternalLink className="h-8 w-8" />
            Profil Link Analizi
          </h1>
          <p className="text-muted-foreground">
            Sosial media profil linkini yapışdırın və AI-powered analiz alın
          </p>
        </div>

        {!result && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profil Linki</CardTitle>
                <CardDescription>
                  Instagram, Facebook, LinkedIn və ya digər sosial media profil linki
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Profil URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://instagram.com/username"
                    disabled={isAnalyzing}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="manual-input"
                      checked={showManualInput}
                      onChange={(e) => setShowManualInput(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="manual-input" className="cursor-pointer">
                      Profil məlumatlarını manual daxil et (Facebook üçün vacibdir)
                    </Label>
                  </div>
                  
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-sm text-yellow-800">
                      <strong>Qeyd:</strong> Instagram ✅ və LinkedIn ✅ avtomatik scraping işləyir. 
                      Facebook ❌ üçün yuxarıdakı checkbox-ı işarələyib məlumatları manual daxil edin.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="force-refresh"
                      checked={forceRefresh}
                      onChange={(e) => setForceRefresh(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="force-refresh" className="cursor-pointer text-sm text-muted-foreground">
                      Cache-i atla və yenidən analiz et (LinkedIn/Facebook üçün tövsiyə olunur)
                    </Label>
                  </div>
                </div>

                {showManualInput && (
                  <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="username" className="text-xs">Username</Label>
                        <Input
                          id="username"
                          value={manualData.username}
                          onChange={(e) => setManualData({...manualData, username: e.target.value})}
                          placeholder="asarus_salihin"
                          disabled={isAnalyzing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="name" className="text-xs">Ad/Name</Label>
                        <Input
                          id="name"
                          value={manualData.name}
                          onChange={(e) => setManualData({...manualData, name: e.target.value})}
                          placeholder="Asaru's Salihin"
                          disabled={isAnalyzing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="posts" className="text-xs">Posts</Label>
                        <Input
                          id="posts"
                          value={manualData.posts}
                          onChange={(e) => setManualData({...manualData, posts: e.target.value})}
                          placeholder="6"
                          disabled={isAnalyzing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="followers" className="text-xs">Followers</Label>
                        <Input
                          id="followers"
                          value={manualData.followers}
                          onChange={(e) => setManualData({...manualData, followers: e.target.value})}
                          placeholder="106"
                          disabled={isAnalyzing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="following" className="text-xs">Following</Label>
                        <Input
                          id="following"
                          value={manualData.following}
                          onChange={(e) => setManualData({...manualData, following: e.target.value})}
                          placeholder="168"
                          disabled={isAnalyzing}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="category" className="text-xs">Kateqoriya</Label>
                      <Input
                        id="category"
                        value={manualData.category}
                        onChange={(e) => setManualData({...manualData, category: e.target.value})}
                        placeholder="Digital creator"
                        disabled={isAnalyzing}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="bio" className="text-xs">Bio</Label>
                      <Textarea
                        id="bio"
                        value={manualData.bio}
                        onChange={(e) => setManualData({...manualData, bio: e.target.value})}
                        placeholder="Profil təsviri..."
                        rows={3}
                        disabled={isAnalyzing}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={!url || isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analiz Edilir...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Profili Analiz Et
                </>
              )}
            </Button>
          </form>
        )}

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profil Məlumatları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.preview?.image ? (
                    <div className="flex justify-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted border-2 border-border ring-2 ring-offset-2 ring-offset-background ring-primary/20">
                        <img
                          src={getProxiedImageUrl(result.preview.image) || result.preview.image}
                          alt={result.preview.full_name || result.preview.title || 'Profil şəkli'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          onLoad={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.opacity = '1';
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const parent = target.parentElement;
                            const imageSrc = target.src;
                            console.error('❌ Image load error:', imageSrc);
                            
                            if (parent && !parent.querySelector('.error-placeholder')) {
                              const errorDiv = document.createElement('div');
                              errorDiv.className = 'error-placeholder w-full h-full flex flex-col items-center justify-center bg-muted gap-2';
                              errorDiv.innerHTML = '<svg class="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span class="text-xs text-muted-foreground">Şəkil yüklənə bilmədi</span>';
                              parent.innerHTML = '';
                              parent.appendChild(errorDiv);
                            }
                          }}
                          style={{ opacity: 0, transition: 'opacity 0.3s' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted flex items-center justify-center border-2 border-border ring-2 ring-offset-2 ring-offset-background ring-primary/20">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Profil Adı</Label>
                    <p className="font-semibold text-lg mt-1">
                      {result.preview?.full_name || result.preview?.title || url.split('/').filter(Boolean).pop() || 'Məlumat yoxdur'}
                    </p>
                    {result.preview?.username && (
                      <p className="text-sm text-muted-foreground mt-1">@{result.preview.username}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">Bio</Label>
                    <p className="text-sm mt-1 text-muted-foreground">
                      {result.preview?.biography || result.preview?.description || 'Bio əldə edilə bilmədi'}
                    </p>
                  </div>

                  {result.preview?.stats && (() => {
                    const platform = result.preview?.site_name?.toLowerCase() || '';
                    const isInstagram = platform.includes('instagram');
                    const isFacebook = platform.includes('facebook');
                    const isLinkedIn = platform.includes('linkedin');
                    
                    // Instagram template: Posts, Followers, Following
                    if (isInstagram) {
                      return (
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div>
                            <Label className="text-xs text-muted-foreground">Posts</Label>
                            <p className="font-semibold text-lg">{result.preview.stats.posts || 0}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Followers</Label>
                            <p className="font-semibold text-lg">{result.preview.stats.followers || 0}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Following</Label>
                            <p className="font-semibold text-lg">{result.preview.stats.following || 0}</p>
                          </div>
                        </div>
                      );
                    }
                    
                    // Facebook template: Posts, Followers, Likes
                    if (isFacebook) {
                      return (
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div>
                            <Label className="text-xs text-muted-foreground">Posts</Label>
                            <p className="font-semibold text-lg">{result.preview.stats.posts || 0}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Followers</Label>
                            <p className="font-semibold text-lg">{result.preview.stats.followers || 0}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Likes</Label>
                            <p className="font-semibold text-lg">{result.preview.stats.likes || result.preview.stats.following || 0}</p>
                          </div>
                        </div>
                      );
                    }
                    
                    // LinkedIn template: Posts, Followers, Connections
                    if (isLinkedIn) {
                      return (
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div>
                            <Label className="text-xs text-muted-foreground">Posts</Label>
                            <p className="font-semibold text-lg">{result.preview.stats.posts || 0}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Followers</Label>
                            <p className="font-semibold text-lg">{result.preview.stats.followers || 0}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Connections</Label>
                            <p className="font-semibold text-lg">{result.preview.stats.connections || result.preview.stats.following || 0}</p>
                          </div>
                        </div>
                      );
                    }
                    
                    // Default template (for other platforms)
                    return (
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div>
                          <Label className="text-xs text-muted-foreground">Posts</Label>
                          <p className="font-semibold text-lg">{result.preview.stats.posts || 0}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Followers</Label>
                          <p className="font-semibold text-lg">{result.preview.stats.followers || 0}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Following</Label>
                          <p className="font-semibold text-lg">{result.preview.stats.following || 0}</p>
                        </div>
                      </div>
                    );
                  })()}

                  {result.preview?.site_name && (() => {
                    const platform = result.preview?.site_name?.toLowerCase() || '';
                    const isInstagram = platform.includes('instagram');
                    const isFacebook = platform.includes('facebook');
                    const isLinkedIn = platform.includes('linkedin');
                    
                    let PlatformIcon = ExternalLink;
                    let platformColor = '';
                    
                    if (isInstagram) {
                      PlatformIcon = Instagram;
                      platformColor = 'text-pink-600';
                    } else if (isFacebook) {
                      PlatformIcon = Facebook;
                      platformColor = 'text-blue-600';
                    } else if (isLinkedIn) {
                      PlatformIcon = Linkedin;
                      platformColor = 'text-blue-700';
                    }
                    
                    return (
                      <div>
                        <Label className="text-sm text-muted-foreground">Platforma</Label>
                        <p className="text-sm mt-1 flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <PlatformIcon className={`h-3 w-3 ${platformColor}`} />
                            {result.preview.site_name}
                          </Badge>
                          {result.preview?.is_verified && (
                            <Badge variant="outline" className="ml-2">✓ Verified</Badge>
                          )}
                          {result.preview?.is_business && (
                            <Badge variant="outline" className="ml-2">Business</Badge>
                          )}
                          {result.preview?.category && (
                            <Badge variant="secondary" className="ml-2">{result.preview.category}</Badge>
                          )}
                        </p>
                      </div>
                    );
                  })()}

                  {result.preview?.final_url && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Link</Label>
                      <a 
                        href={result.preview.final_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1 mt-1 break-all"
                      >
                        {result.preview.final_url}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </div>
                  )}

                  {/* LinkedIn specific fields */}
                  {result.preview?.site_name?.toLowerCase().includes('linkedin') && (
                    <>
                      {result.preview?.location && (
                        <div>
                          <Label className="text-sm text-muted-foreground">Yer</Label>
                          <p className="text-sm mt-1">
                            {typeof result.preview.location === 'string' 
                              ? result.preview.location 
                              : result.preview.location?.full || 
                                `${result.preview.location?.city || ''}${result.preview.location?.city && result.preview.location?.country ? ', ' : ''}${result.preview.location?.country || ''}` ||
                                JSON.stringify(result.preview.location)}
                          </p>
                        </div>
                      )}
                      
                      {result.preview?.headline && (
                        <div>
                          <Label className="text-sm text-muted-foreground">Headline</Label>
                          <p className="text-sm mt-1">{result.preview.headline}</p>
                        </div>
                      )}
                      
                      {result.preview?.experience && result.preview.experience.length > 0 && (
                        <div>
                          <Label className="text-sm text-muted-foreground">Təcrübə</Label>
                          <div className="space-y-2 mt-2">
                            {result.preview.experience.slice(0, 3).map((exp: any, idx: number) => (
                              <div key={idx} className="p-2 border rounded text-sm">
                                <p className="font-semibold">{exp.title || exp.position || 'N/A'}</p>
                                <p className="text-muted-foreground">{exp.company || exp.companyName || ''}</p>
                                {exp.period && <p className="text-xs text-muted-foreground">{exp.period}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {result.preview?.education && result.preview.education.length > 0 && (
                        <div>
                          <Label className="text-sm text-muted-foreground">Təhsil</Label>
                          <div className="space-y-2 mt-2">
                            {result.preview.education.slice(0, 3).map((edu: any, idx: number) => (
                              <div key={idx} className="p-2 border rounded text-sm">
                                <p className="font-semibold">{edu.schoolName || edu.school || 'N/A'}</p>
                                <p className="text-muted-foreground">{edu.degree || edu.fieldOfStudy || ''}</p>
                                {edu.period && <p className="text-xs text-muted-foreground">{edu.period}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {result.preview?.skills && result.preview.skills.length > 0 && (
                        <div>
                          <Label className="text-sm text-muted-foreground">Bacarıqlar</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {result.preview.skills.map((skill: any, idx: number) => (
                              <Badge key={idx} variant="outline">
                                {typeof skill === 'string' ? skill : skill.name || skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-xs text-blue-800">
                      <strong>Qeyd:</strong> Instagram və digər platformalar login tələb etdiyinə görə, bəzi məlumatlar əldə edilə bilməyə bilər. AI analiz URL və əldə edilən məlumatlara əsasən aparılır.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SMM Analizi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.smm_analysis?.account_type && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Hesab Tipi</Label>
                      <p className="font-semibold mt-1">
                        <Badge>{result.smm_analysis.account_type}</Badge>
                      </p>
                    </div>
                  )}

                  {result.smm_analysis?.niche && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Niche/Sahə</Label>
                      <p className="font-semibold mt-1">
                        <Badge variant="secondary">{result.smm_analysis.niche}</Badge>
                      </p>
                    </div>
                  )}

                  {result.smm_analysis?.content_style && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Kontent Stili</Label>
                      <p className="font-semibold mt-1">
                        <Badge variant="outline">{result.smm_analysis.content_style}</Badge>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {result.preview?.latest_posts && result.preview.latest_posts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Son Paylaşımlar</CardTitle>
                  <CardDescription>
                    {result.preview.latest_posts.length} paylaşım
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {result.preview.latest_posts.map((post: any, idx: number) => (
                      <div key={post.id || idx} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        {(post.display_url || post.image) ? (
                          <div className="relative w-full aspect-square bg-muted overflow-hidden">
                            <img
                              src={getProxiedImageUrl(post.display_url || post.image) || (post.display_url || post.image)}
                              alt={post.caption?.substring(0, 50) || 'Post'}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              onLoad={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.opacity = '1';
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center bg-muted gap-1"><svg class="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span class="text-xs text-muted-foreground">Şəkil yoxdur</span></div>';
                                }
                              }}
                              style={{ opacity: 0, transition: 'opacity 0.3s' }}
                            />
                            {post.type === 'Video' && (
                              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 z-10">
                                <span>▶</span> Video
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="relative w-full aspect-square bg-muted flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                            {post.type === 'Video' && (
                              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                                ▶ Video
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-3 space-y-2">
                          {(post.caption || post.text) && (
                            <p className="text-sm line-clamp-2 text-muted-foreground">
                              {post.caption || post.text}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              ❤️ {post.likes_count || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              💬 {post.comments_count || 0}
                            </span>
                          </div>
                          {post.date ? (
                            <p className="text-xs text-muted-foreground">
                              {post.date}
                            </p>
                          ) : post.timestamp ? (
                            <p className="text-xs text-muted-foreground">
                              {new Date(post.timestamp).toLocaleDateString('az-AZ', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          ) : null}
                          {post.hashtags && post.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {post.hashtags.slice(0, 3).map((tag: string, tagIdx: number) => (
                                <Badge key={tagIdx} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {post.url && (
                            <a
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center gap-1 mt-2"
                            >
                              Post-a bax
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
