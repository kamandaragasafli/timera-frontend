'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const t = useTranslation();

  // Mock templates data
  const templates = [
    {
      id: 1,
      name: 'Product Launch Announcement',
      category: 'announcement',
      description: 'Perfect for announcing new products or features',
      content: `🚀 Exciting News! We're thrilled to announce the launch of {product_name}!

After months of development, we're proud to introduce {key_feature} that will {benefit}.

✨ Key highlights:
• {feature_1}
• {feature_2}  
• {feature_3}

Ready to experience the future? Get started today: {link}

#ProductLaunch #Innovation #Technology`,
      variables: ['product_name', 'key_feature', 'benefit', 'feature_1', 'feature_2', 'feature_3', 'link'],
      usageCount: 24,
      platforms: ['LinkedIn', 'Twitter', 'Facebook'],
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'Weekly Industry Insights',
      category: 'educational',
      description: 'Share weekly insights and trends in your industry',
      content: `📊 Weekly Industry Insights - {week_date}

This week in {industry}:

🔍 Trend Spotlight: {main_trend}
{trend_description}

📈 Key Statistics:
• {stat_1}
• {stat_2}
• {stat_3}

💡 Our Take: {company_perspective}

What trends are you seeing in your field? Share your thoughts below! 👇

#IndustryInsights #{industry_hashtag} #TrendAnalysis`,
      variables: ['week_date', 'industry', 'main_trend', 'trend_description', 'stat_1', 'stat_2', 'stat_3', 'company_perspective', 'industry_hashtag'],
      usageCount: 18,
      platforms: ['LinkedIn', 'Twitter'],
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      name: 'Customer Success Story',
      category: 'promotional',
      description: 'Highlight customer achievements and testimonials',
      content: `🌟 Customer Success Story

Meet {customer_name}, {customer_title} at {customer_company}!

The Challenge: {challenge_description}

The Solution: {solution_provided}

The Results: 
📈 {result_1}
⚡ {result_2}
💰 {result_3}

"{customer_quote}" - {customer_name}

Ready to achieve similar results? Let's talk: {contact_link}

#CustomerSuccess #Testimonial #Results`,
      variables: ['customer_name', 'customer_title', 'customer_company', 'challenge_description', 'solution_provided', 'result_1', 'result_2', 'result_3', 'customer_quote', 'contact_link'],
      usageCount: 15,
      platforms: ['LinkedIn', 'Facebook'],
      createdAt: '2024-01-14'
    },
    {
      id: 4,
      name: 'Behind the Scenes',
      category: 'engagement',
      description: 'Show your company culture and team',
      content: `👥 Behind the Scenes at {company_name}

Today we're taking you behind the scenes of {activity_or_process}!

{description_of_activity}

Our team is passionate about {team_passion}, and it shows in everything we do.

Fun fact: {interesting_fact}

What would you like to see more of from our team? Drop your suggestions below! 👇

#BehindTheScenes #TeamCulture #CompanyLife`,
      variables: ['company_name', 'activity_or_process', 'description_of_activity', 'team_passion', 'interesting_fact'],
      usageCount: 12,
      platforms: ['Instagram', 'LinkedIn', 'Facebook'],
      createdAt: '2024-01-16'
    },
    {
      id: 5,
      name: 'Event Promotion',
      category: 'promotional',
      description: 'Promote upcoming events, webinars, or conferences',
      content: `📅 Don't Miss Out! {event_name} is Coming!

Join us on {event_date} for {event_description}.

🎯 What You'll Learn:
• {learning_1}
• {learning_2}
• {learning_3}

👥 Featured Speakers:
{speaker_list}

📍 {event_location_or_platform}
🕐 {event_time}

Early bird tickets available until {early_bird_deadline}!

Register now: {registration_link}

#Event #{event_hashtag} #Learning`,
      variables: ['event_name', 'event_date', 'event_description', 'learning_1', 'learning_2', 'learning_3', 'speaker_list', 'event_location_or_platform', 'event_time', 'early_bird_deadline', 'registration_link', 'event_hashtag'],
      usageCount: 9,
      platforms: ['LinkedIn', 'Twitter', 'Facebook'],
      createdAt: '2024-01-18'
    },
    {
      id: 6,
      name: 'Motivational Monday',
      category: 'engagement',
      description: 'Start the week with motivation and inspiration',
      content: `💪 Motivational Monday!

"{inspirational_quote}"

This week, let's focus on {weekly_focus}. Remember:

✨ {motivation_point_1}
🚀 {motivation_point_2}
🎯 {motivation_point_3}

What's your goal for this week? Share it below and let's support each other! 👇

#MotivationalMonday #MondayMotivation #Goals #Inspiration`,
      variables: ['inspirational_quote', 'weekly_focus', 'motivation_point_1', 'motivation_point_2', 'motivation_point_3'],
      usageCount: 21,
      platforms: ['LinkedIn', 'Instagram', 'Facebook'],
      createdAt: '2024-01-08'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'announcement', name: 'Announcements', count: templates.filter(t => t.category === 'announcement').length },
    { id: 'educational', name: 'Educational', count: templates.filter(t => t.category === 'educational').length },
    { id: 'promotional', name: 'Promotional', count: templates.filter(t => t.category === 'promotional').length },
    { id: 'engagement', name: 'Engagement', count: templates.filter(t => t.category === 'engagement').length },
    { id: 'news', name: 'News', count: templates.filter(t => t.category === 'news').length },
    { id: 'personal', name: 'Personal', count: templates.filter(t => t.category === 'personal').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      announcement: 'bg-blue-500',
      educational: 'bg-green-500',
      promotional: 'bg-purple-500',
      engagement: 'bg-orange-500',
      news: 'bg-red-500',
      personal: 'bg-pink-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <DashboardLayout 
      title={t.templates.title}
      description={t.templates.description}
    >
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button>
              <span className="mr-2">➕</span>
              Create Template
            </Button>
            <Button variant="outline">
              <span className="mr-2">📥</span>
              Import Templates
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                🔍
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Template Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Templates</span>
                  <span className="font-medium">{templates.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Most Used</span>
                  <span className="font-medium">Product Launch</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Usage</span>
                  <span className="font-medium">99 posts</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`${getCategoryColor(template.category)} text-white text-xs`}
                      >
                        {template.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Template Preview */}
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm line-clamp-4">
                        {template.content.substring(0, 150)}...
                      </div>
                    </div>

                    {/* Variables */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Variables ({template.variables.length})
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.slice(0, 3).map((variable) => (
                          <Badge key={variable} variant="outline" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                        {template.variables.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.variables.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Platforms */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Platforms
                      </h4>
                      <div className="flex items-center space-x-2">
                        {template.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform === 'LinkedIn' && '💼'}
                            {platform === 'Twitter' && '🐦'}
                            {platform === 'Instagram' && '📸'}
                            {platform === 'Facebook' && '📘'}
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">
                        Used {template.usageCount} times
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <span className="mr-1">👁️</span>
                          Preview
                        </Button>
                        <Button size="sm">
                          <span className="mr-1">📝</span>
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredTemplates.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm 
                      ? `No templates match "${searchTerm}". Try a different search term.`
                      : 'No templates in this category yet. Create your first template!'
                    }
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <Button>
                      <span className="mr-2">➕</span>
                      Create Template
                    </Button>
                    {searchTerm && (
                      <Button variant="outline" onClick={() => setSearchTerm('')}>
                        Clear Search
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}








