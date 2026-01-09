'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/useTranslation';

export default function AIToolsPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const t = useTranslation();

  // AI tools - reordered
  const aiTools = [
    {
      id: 10,
      name: 'Məhsul Post Yaradıcı',
      description: 'Məhsul rəsmini yükləyin, AI arxa fonu siləcək, analiz edəcək və reklam postları hazırlayacaq',
      icon: '🛍️',
      color: 'bg-amber-500',
      category: 'Visual Content'
    },
    {
      id: 9,
      name: t.aiTools.videoGenerator,
      description: t.aiTools.videoGeneratorDesc,
      icon: '🎬',
      color: 'bg-red-500',
      category: 'Visual Content'
    },
    {
      id: 7,
      name: t.aiTools.logoSloganGenerator,
      description: t.aiTools.logoSloganGeneratorDesc,
      icon: '🎯',
      color: 'bg-teal-500',
      category: 'Branding'
    },
    {
      id: 2,
      name: t.aiTools.hashtagGenerator,
      description: t.aiTools.hashtagGeneratorDesc,
      icon: '#️⃣',
      color: 'bg-blue-500',
      category: 'Optimization',
      comingSoon: false
    },
    {
      id: 3,
      name: t.aiTools.captionOptimizer,
      description: t.aiTools.captionOptimizerDesc,
      icon: '📝',
      color: 'bg-green-500',
      category: 'Optimization',
      comingSoon: false
    },
    {
      id: 4,
      name: t.aiTools.imageGenerator,
      description: t.aiTools.imageGeneratorDesc,
      icon: '🎨',
      color: 'bg-pink-500',
      category: 'Visual Content',
      comingSoon: true
    },
    {
      id: 5,
      name: t.aiTools.trendAnalyzer,
      description: t.aiTools.trendAnalyzerDesc,
      icon: '📈',
      color: 'bg-orange-500',
      category: 'Analytics',
      comingSoon: false
    },
    {
      id: 6,
      name: t.aiTools.competitorAnalysis,
      description: t.aiTools.competitorAnalysisDesc,
      icon: '🔍',
      color: 'bg-indigo-500',
      category: 'Analytics',
      comingSoon: false
    }
  ];

  const brandVoices = [
    { id: 1, name: 'Professional', description: 'Formal and business-focused' },
    { id: 2, name: 'Casual', description: 'Friendly and conversational' },
    { id: 3, name: 'Creative', description: 'Artistic and innovative' },
    { id: 4, name: 'Technical', description: 'Detailed and informative' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`🚀 Excited to share some insights about ${prompt}! 

Our latest research shows that businesses leveraging AI-powered social media management see 40% better engagement rates. Here's what we've learned:

✨ Consistency is key - regular posting builds audience trust
📊 Data-driven decisions lead to better content performance  
🎯 Personalized content resonates more with your audience

What's your experience with social media automation? Share your thoughts below! 

#SocialMediaMarketing #AI #DigitalMarketing #ContentStrategy`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleOpenTool = (toolId: number) => {
    if (toolId === 2) {
      // Navigate to Hashtag Generator page
      router.push('/ai-tools/hashtag-generator');
    } else if (toolId === 3) {
      // Navigate to Caption Optimizer page
      router.push('/ai-tools/caption-optimizer');
    } else if (toolId === 5) {
      // Navigate to Trend Analyzer page
      router.push('/ai-tools/trend-analyzer');
    } else if (toolId === 6) {
      // Navigate to Competitor Analysis page
      router.push('/ai-tools/competitor-analysis');
    } else if (toolId === 7) {
      // Navigate to Logo Generator page
      router.push('/ai-tools/logo-generator');
    } else if (toolId === 9) {
      // Navigate to Video Generator
      router.push('/ai-tools/video-generator');
    } else if (toolId === 10) {
      // Navigate to Product Post Creator
      router.push('/ai-tools/product-post');
    }
  };

  return (
    <DashboardLayout 
      title={t.aiTools.title}
      description={t.aiTools.description}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Generator */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2">✨</span>
                {t.aiTools.contentGenerator}
              </CardTitle>
              <CardDescription>
                {t.aiTools.contentGeneratorDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">{t.aiTools.promptPlaceholder}</Label>
                <Input
                  id="prompt"
                  placeholder={t.aiTools.promptPlaceholder}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button 
                  onClick={handleGenerate} 
                  disabled={!prompt.trim() || isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <span className="mr-2">⏳</span>
                      {t.aiTools.generating}
                    </>
                  ) : (
                    <>
                      <span className="mr-2">✨</span>
                      {t.aiTools.generate}
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <span className="mr-2">⚙️</span>
                  Settings
                </Button>
              </div>

              {generatedContent && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Generated Content</Label>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <span className="mr-1">📋</span>
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <span className="mr-1">✏️</span>
                          Edit
                        </Button>
                        <Button size="sm">
                          <span className="mr-1">📝</span>
                          Use as Post
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* AI Tools Grid */}
          <div>
            <h2 className="text-xl font-semibold mb-4">All AI Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${tool.color} flex items-center justify-center text-white text-lg`}>
                          {tool.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{tool.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {tool.description}
                          </CardDescription>
                        </div>
                      </div>
                      {tool.comingSoon && (
                        <Badge variant="secondary" className="text-xs">
                          Tezliklə
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      size="sm"
                      disabled={tool.comingSoon}
                      variant={tool.comingSoon ? "secondary" : "default"}
                      onClick={() => handleOpenTool(tool.id)}
                    >
                      {tool.comingSoon ? 'Tezliklə' : t.common.start}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Brand Voice Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Voice</CardTitle>
              <CardDescription>
                Choose your AI writing style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {brandVoices.map((voice) => (
                  <div key={voice.id} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={`voice-${voice.id}`}
                      name="brandVoice"
                      defaultChecked={voice.id === 1}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={`voice-${voice.id}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {voice.name}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {voice.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <span className="mr-2">➕</span>
                Create Custom Voice
              </Button>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle>AI Usage This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Content Generated</span>
                <span className="font-medium">47 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hashtags Created</span>
                <span className="font-medium">156 tags</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Images Optimized</span>
                <span className="font-medium">23 images</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Credits Used</span>
                <span className="font-medium">1,247 / 5,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 AI Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Be Specific</h4>
                  <p className="text-muted-foreground">
                    The more specific your prompt, the better the AI output.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Include Context</h4>
                  <p className="text-muted-foreground">
                    Mention your industry, target audience, and goals.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Iterate</h4>
                  <p className="text-muted-foreground">
                    Generate multiple versions and pick the best one.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}