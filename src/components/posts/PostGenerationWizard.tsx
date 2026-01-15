'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { postsAPI } from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';

interface PostGenerationWizardProps {
  onComplete: (posts: any[]) => void;
  companyProfile: any;
}

export default function PostGenerationWizard({ onComplete, companyProfile }: PostGenerationWizardProps) {
  const router = useRouter();
  const t = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [pollingStatus, setPollingStatus] = useState<'idle' | 'polling' | 'complete'>('idle');
  const [foundPostsCount, setFoundPostsCount] = useState(0);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingStartTimeRef = useRef<number | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const startPollingForPosts = () => {
    setPollingStatus('polling');
    setFoundPostsCount(0);
    pollingStartTimeRef.current = Date.now();
    
    // Poll every 3 seconds
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await postsAPI.getPendingPosts();
        const posts = response.data.results || response.data;
        
        if (posts.length > 0) {
          setFoundPostsCount(posts.length);
          
          // Check if all posts have been generated (compare with expected count)
          const expectedCount = postsCount;
          if (posts.length >= expectedCount || Date.now() - (pollingStartTimeRef.current || 0) > 180000) {
            // Either all posts found or 3 minutes passed
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
            }
            setPollingStatus('complete');
            setIsGenerating(false);
            onComplete(posts);
          }
        }
      } catch (err) {
        // Silent error handling - don't show errors to user
        // Just log for debugging and continue polling
        console.log('Polling check in progress...');
      }
    }, 3000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setPollingStatus('idle');

    try {
      // Start the generation request (don't wait for it to complete)
      postsAPI.generatePosts({
        generate_images: false,
        custom_prompt: customPrompt
      }).then((response) => {
        // If it completes successfully before timeout
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        setPollingStatus('complete');
        setIsGenerating(false);
        onComplete(response.data.posts);
      }).catch((err) => {
        // Timeout or error - but keep polling silently
        // Don't show error to user, just continue polling
        console.log('Generation request timed out or failed, continuing with polling...');
      });

      // Start polling immediately for posts (even if request fails)
      setTimeout(() => {
        startPollingForPosts();
      }, 5000); // Start polling after 5 seconds
      
    } catch (err: any) {
      // Silent error handling - just start polling
      // User won't see any error messages
      console.log('Error in generation, starting polling anyway...');
      
      // Start polling even if there's an error
      setTimeout(() => {
        startPollingForPosts();
      }, 5000);
    }
  };

  const postsCount = companyProfile.posts_to_generate || 10;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          AI Content Generator
        </h1>
      </div>

      {/* Company Info Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <span className="mr-2">🏢</span>
                Company Information
              </CardTitle>
              <CardDescription>
                AI will use this information to generate relevant content for your brand
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/setup/company')}
            >
              ✏️ Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">Company</Badge>
                <span className="font-medium">{companyProfile.company_name}</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">Industry</Badge>
                <span>{companyProfile.industry}</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">Company size</Badge>
                <span>{companyProfile.company_size}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Tone</Badge>
                <span>{companyProfile.preferred_tone}</span>
              </div>
            </div>
            <div>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-muted-foreground">Business:</span>
                  <p className="text-xs">{companyProfile.business_description?.substring(0, 100)}...</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Audience:</span>
                  <p className="text-xs">{companyProfile.target_audience?.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">⚙️</span>
            Generation Options
          </CardTitle>
          <CardDescription>
            Customize how AI should generate your content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="space-y-2">
            <Label htmlFor="custom_prompt">Additional Instructions (optional)</Label>
            <Textarea
              id="custom_prompt"
              placeholder="Add any special instructions for content generation..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground">
              For example: "Focus on new product features", "Include customer testimonials", "Highlight sustainability"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Generation Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">🤖</span>
            What will be generated
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Content characteristics:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center"><span className="mr-2">✅</span> {postsCount} unique posts</li>
                <li className="flex items-center"><span className="mr-2">✅</span> English language (configurable later)</li>
                <li className="flex items-center"><span className="mr-2">✅</span> Engaging headlines</li>
                <li className="flex items-center"><span className="mr-2">✅</span> Relevant hashtags</li>
                <li className="flex items-center"><span className="mr-2">✅</span> Post descriptions</li>
                <li className="flex items-center"><span className="mr-2">✅</span> Mixed content types</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Post types:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">📢 Announcements</Badge>
                <Badge variant="secondary">📚 Education</Badge>
                <Badge variant="secondary">🎯 Promotion</Badge>
                <Badge variant="secondary">💬 Discussion</Badge>
                <Badge variant="secondary">🏢 Company Culture</Badge>
                <Badge variant="secondary">💡 Tips & Ideas</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="text-center">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          size="lg"
          className="px-12 py-3"
        >
          {isGenerating ? (
            <>
              <span className="mr-2">⏳</span>
              Generating posts...
            </>
          ) : (
            <>
              <span className="mr-2">🚀</span>
              Generate {postsCount} AI posts
            </>
          )}
        </Button>
        
        {isGenerating && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span>
                {pollingStatus === 'polling' && foundPostsCount > 0 
                  ? `${foundPostsCount} posts are ready, continuing...` 
                  : 'AI is generating high-quality content...'
                }
              </span>
            </div>
            
            {pollingStatus === 'polling' && (
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    {postsCount >= 20 
                      ? `Posts are being generated in batches (${Math.ceil(postsCount / 10)} batches)...`
                      : 'Posts are being generated...'
                    }
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-4 text-xs text-blue-600 dark:text-blue-400">
                  <span>✓ {foundPostsCount}/{postsCount} found</span>
                  <span>• Auto refreshing</span>
                  {postsCount >= 20 && (
                    <span>• Batch {Math.ceil(foundPostsCount / 10)}/{Math.ceil(postsCount / 10)}</span>
                  )}
                </div>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">
              {postsCount >= 20 
                ? `Large request (${postsCount} posts). Posts are generated in batches (10+10). This may take 5–10 minutes. Please keep this page open.`
                : postsCount >= 10 
                ? `For bigger requests, posts are generated in the background. Ready items will appear automatically. This may take 2–5 minutes.`
                : 'This may take 30–90 seconds. Please keep this page open.'
              }
            </p>
            
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-xs text-green-700 dark:text-green-300">
                💡 <span className="font-medium">New:</span> Images now use skeleton loading and will appear as they are ready. Error messages are minimized for a smoother experience.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
