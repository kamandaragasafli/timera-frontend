'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { postsAPI, authAPI } from '@/lib/api';

export default function TestAIPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const testGeneration = async () => {
    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      // First check if company profile exists
      let hasProfile = false;
      try {
        await authAPI.getCompanyProfile();
        hasProfile = true;
      } catch (e) {
        // Create a test company profile
        await authAPI.createCompanyProfile({
          company_name: 'Test Şirkəti',
          industry: 'technology',
          company_size: '11-50',
          business_description: 'Biz texnologiya sahəsində innovativ həllər təklif edən şirkətik.',
          target_audience: 'Kiçik və orta biznes sahibləri',
          unique_selling_points: 'AI əsaslı həllər və 24/7 dəstək',
          social_media_goals: 'Brend məlumatlılığını artırmaq',
          preferred_tone: 'professional',
          content_topics: ['texnologiya', 'AI', 'innovasiya'],
          keywords: ['AI', 'texnologiya', 'həllər'],
          avoid_topics: [],
          primary_language: 'az'
        });
      }

      // Generate posts
      const response = await postsAPI.generatePosts({
        generate_images: true
      });

      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Generation failed');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🧪 AI Generation Test</CardTitle>
            <CardDescription>
              Test the OpenAI integration for Azerbaijani content generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testGeneration}
              disabled={isGenerating}
              size="lg"
            >
              {isGenerating ? (
                <>
                  <span className="mr-2">⏳</span>
                  Generating Posts...
                </>
              ) : (
                <>
                  <span className="mr-2">🚀</span>
                  Test AI Generation
                </>
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <Alert className="border-green-500 bg-green-50 text-green-700">
                <AlertDescription>
                  ✅ Success! Generated {result.total_posts} posts. 
                  Batch ID: {result.batch_id}
                </AlertDescription>
              </Alert>
            )}

            {result && result.posts && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Generated Posts:</h3>
                {result.posts.slice(0, 2).map((post: any, index: number) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm bg-muted p-3 rounded">
                        <pre className="whitespace-pre-wrap font-sans">
                          {post.content.substring(0, 300)}...
                        </pre>
                      </div>
                      {post.hashtags && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {post.hashtags.map((tag: string, idx: number) => (
                            <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {result.posts.length > 2 && (
                  <p className="text-sm text-muted-foreground text-center">
                    ... and {result.posts.length - 2} more posts
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}







