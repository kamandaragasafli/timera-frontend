'use client';

import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Linkedin, TrendingUp, BarChart3, Target, Calendar, Hash } from 'lucide-react';

export default function SocialMediaAnalysisPage() {
  const router = useRouter();

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Instagram profil analizi və SMM tövsiyələri. Bio, hashtag, content strategiyası və optimal posting saatları.',
      icon: Instagram,
      color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
      href: '/ai-tools/instagram-smm',
      features: [
        'Bio təklifləri',
        'Hashtag strategiyası',
        'Content mix analizi',
        'Optimal posting saatları',
        'Engagement artırma tipləri',
        '30 günlük growth plan'
      ]
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Facebook Page analizi və SMM tövsiyələri. About, content strategiyası, video content və community engagement.',
      icon: Facebook,
      color: 'bg-gradient-to-br from-blue-600 to-blue-800',
      href: '/ai-tools/facebook-smm',
      features: [
        'About təklifləri',
        'Video content strategiyası',
        'Live video tövsiyələri',
        'Community engagement',
        'Facebook Groups strategiyası',
        'Optimal posting saatları'
      ]
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'LinkedIn profil analizi və professional SMM tövsiyələri. Headline, thought leadership content və B2B strategiyası.',
      icon: Linkedin,
      color: 'bg-gradient-to-br from-blue-700 to-blue-900',
      href: '/ai-tools/linkedin-smm',
      features: [
        'Headline təklifləri',
        'Article strategiyası',
        'Thought leadership content',
        'Professional networking',
        'B2B content pillars',
        'Optimal posting saatları'
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            Sosial Media Analiz
          </h1>
          <p className="text-muted-foreground text-lg">
            Platforma üzrə detallı analiz və AI-powered SMM tövsiyələri alın
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <Card 
                key={platform.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary"
                onClick={() => router.push(platform.href)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`${platform.color} p-3 rounded-lg text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{platform.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {platform.features.slice(0, 3).map((feature, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button 
                      className="w-full mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(platform.href);
                      }}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Analizə Başla
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Analiz Nə Verir?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Content Strategiyası</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Content mix, posting tezliyi və content pillars tövsiyələri
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Optimal Saatlar</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Real vaxt formatında ən effektiv posting saatları və səbəbləri
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Growth Plan</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  30 günlük detallı growth strategiyası və realistic hədəflər
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Engagement Tips</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Platforma xüsusi engagement artırma tipləri və best practices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

