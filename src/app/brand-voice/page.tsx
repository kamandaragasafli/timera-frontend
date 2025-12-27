'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/useTranslation';

export default function BrandVoicePage() {
  const [selectedVoice, setSelectedVoice] = useState(1);
  const t = useTranslation();

  // Mock brand voices data
  const brandVoices = [
    {
      id: 1,
      name: 'Professional Corporate',
      tone: 'Professional',
      industry: 'Technology',
      targetAudience: 'Business professionals, CTOs, decision makers',
      customInstructions: 'Use formal language, focus on business value, include industry insights, avoid casual expressions.',
      isDefault: true,
      createdAt: '2024-01-10',
      usageCount: 45,
      samplePost: 'We are excited to announce our latest enterprise solution that delivers 40% improved efficiency for modern businesses. Our innovative approach combines cutting-edge technology with proven methodologies to drive sustainable growth. #Innovation #BusinessGrowth #Technology'
    },
    {
      id: 2,
      name: 'Casual & Friendly',
      tone: 'Casual',
      industry: 'Lifestyle',
      targetAudience: 'Young professionals, millennials, lifestyle enthusiasts',
      customInstructions: 'Use conversational tone, include emojis, ask questions to engage audience, be relatable and authentic.',
      isDefault: false,
      createdAt: '2024-01-12',
      usageCount: 23,
      samplePost: 'Hey everyone! 👋 Just wanted to share something awesome that happened today... Our team just hit a major milestone and we couldn\'t be more excited! 🎉 What milestones are you celebrating this week? Drop them in the comments! #TeamWork #Celebration #MondayMotivation'
    },
    {
      id: 3,
      name: 'Creative & Inspirational',
      tone: 'Inspirational',
      industry: 'Creative Arts',
      targetAudience: 'Artists, designers, creative professionals',
      customInstructions: 'Use inspiring language, focus on creativity and innovation, include metaphors, encourage artistic expression.',
      isDefault: false,
      createdAt: '2024-01-15',
      usageCount: 12,
      samplePost: 'Every masterpiece begins with a single brushstroke. Every innovation starts with a spark of imagination. Today, we invite you to embrace the creative journey and transform your boldest ideas into reality. What will you create today? ✨ #Creativity #Innovation #ArtisticJourney'
    }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-focused' },
    { value: 'casual', label: 'Casual', description: 'Friendly and conversational' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'authoritative', label: 'Authoritative', description: 'Expert and confident' },
    { value: 'humorous', label: 'Humorous', description: 'Light-hearted and fun' },
    { value: 'inspirational', label: 'Inspirational', description: 'Motivating and uplifting' }
  ];

  const selectedBrandVoice = brandVoices.find(voice => voice.id === selectedVoice);

  return (
    <DashboardLayout 
      title={t.brandVoice.title}
      description={t.brandVoice.description}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Brand Voices List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button>
                <span className="mr-2">➕</span>
                Create New Voice
              </Button>
              <Button variant="outline">
                <span className="mr-2">📋</span>
                Import Template
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <span className="mr-2">🧪</span>
                Test Voice
              </Button>
            </div>
          </div>

          {/* Brand Voices Grid */}
          <div className="space-y-4">
            {brandVoices.map((voice) => (
              <Card 
                key={voice.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedVoice === voice.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedVoice(voice.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {voice.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {voice.name}
                          {voice.isDefault && (
                            <Badge variant="default" className="ml-2 text-xs">
                              Default
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          {voice.tone} • {voice.industry} • Used {voice.usageCount} times
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <span className="text-sm">✏️</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <span className="text-sm">📋</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <span className="text-sm">🗑️</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Target Audience</h4>
                      <p className="text-sm">{voice.targetAudience}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Sample Output</h4>
                      <div className="p-3 bg-muted rounded-lg text-sm">
                        {voice.samplePost}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar - Voice Details & Editor */}
        <div className="space-y-6">
          {/* Voice Details */}
          {selectedBrandVoice && (
            <Card>
              <CardHeader>
                <CardTitle>Voice Details</CardTitle>
                <CardDescription>
                  Configure the selected brand voice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voiceName">Voice Name</Label>
                  <Input id="voiceName" defaultValue={selectedBrandVoice.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <select 
                    id="tone" 
                    className="w-full p-2 border rounded-md bg-background"
                    defaultValue={selectedBrandVoice.tone.toLowerCase()}
                  >
                    {toneOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue={selectedBrandVoice.industry} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input id="audience" defaultValue={selectedBrandVoice.targetAudience} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Custom Instructions</Label>
                  <textarea 
                    id="instructions"
                    className="w-full p-2 border rounded-md bg-background min-h-[100px] text-sm"
                    defaultValue={selectedBrandVoice.customInstructions}
                    placeholder="Provide specific instructions for AI content generation..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="isDefault" 
                    defaultChecked={selectedBrandVoice.isDefault}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="isDefault" className="text-sm">
                    Set as default voice
                  </Label>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Button className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="outline">
                    Test Voice
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Voice Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Voices</span>
                <span className="font-medium">{brandVoices.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Most Used</span>
                <span className="font-medium">Professional Corporate</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Generations</span>
                <span className="font-medium">80 posts</span>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Voice Performance</h4>
                {brandVoices.map((voice) => (
                  <div key={voice.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{voice.name}</span>
                    <span className="font-medium">{voice.usageCount} uses</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Voice Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Be Specific</h4>
                  <p className="text-muted-foreground">
                    Include specific words, phrases, and styles you want to use or avoid.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Know Your Audience</h4>
                  <p className="text-muted-foreground">
                    Define your target audience clearly for better content alignment.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Test Regularly</h4>
                  <p className="text-muted-foreground">
                    Generate sample content to ensure your voice settings work as expected.
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








