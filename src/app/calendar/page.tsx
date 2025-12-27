'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VisualCalendar } from '@/components/calendar/VisualCalendar';
import { PostEditModal } from '@/components/calendar/PostEditModal';
import { postsAPI } from '@/lib/api';
import { Loader2, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
  scheduled_time?: string;
  date?: string;
  time?: string;
  platforms?: string[];
  color?: string;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [optimalTiming, setOptimalTiming] = useState<any>(null);
  const [loadingOptimal, setLoadingOptimal] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    loadPosts();
    loadOptimalTiming();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const response = await postsAPI.getPosts();
      const postsData = response.data.results || response.data;
      
      // Convert posts to calendar format
      const calendarPosts = postsData.map((post: any) => {
        const scheduledTime = post.scheduled_time ? new Date(post.scheduled_time) : null;
        return {
          id: post.id,
          title: post.title || t.calendar.untitled,
          content: post.content,
          status: post.status,
          date: scheduledTime ? scheduledTime.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          time: scheduledTime ? scheduledTime.toTimeString().slice(0, 5) : '09:00',
          platforms: post.platforms || [],
          color: getStatusColor(post.status)
        };
      });
      
      setPosts(calendarPosts);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadOptimalTiming = async () => {
    try {
      setLoadingOptimal(true);
      const response = await postsAPI.getOptimalTiming([], 7);
      setOptimalTiming(response.data);
    } catch (error) {
      console.error('Failed to load optimal timing:', error);
    } finally {
      setLoadingOptimal(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'published': return 'bg-green-500';
      case 'approved': return 'bg-purple-500';
      case 'pending_approval': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Handle post updates from drag and drop
  const handlePostUpdate = async (postId: string, newDate: Date, newTime: string) => {
    try {
      // Combine date and time
      const scheduledDateTime = new Date(newDate);
      const [hours, minutes] = newTime.split(':');
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));
      
      // Update post via API
      const post = posts.find(p => p.id === postId);
      if (post) {
        await postsAPI.schedulePost(
          postId, 
          scheduledDateTime.toISOString(),
          post.platforms || [],
          false
        );
        
        // Reload posts
        await loadPosts();
      }
    } catch (error) {
      console.error('Failed to update post schedule:', error);
      alert(t.common.loading); // TODO: Add proper error message
    }
  };

  // Handle post editing
  const handlePostEdit = (post: any) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };

  // Handle post save
  const handlePostSave = async (updatedPost: any) => {
    try {
      // If date/time changed, schedule the post
      if (updatedPost.date && updatedPost.time) {
        const scheduledDateTime = new Date(`${updatedPost.date}T${updatedPost.time}`);
        await postsAPI.schedulePost(
          updatedPost.id,
          scheduledDateTime.toISOString(),
          updatedPost.platforms || [],
          false
        );
      }
      
      // Reload posts
      await loadPosts();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to save post:', error);
      alert(t.common.loading); // TODO: Add proper error message
    }
  };

  const todaysPosts = posts.filter(post => {
    const today = new Date().toISOString().split('T')[0];
    return post.date === today;
  });

  const upcomingPosts = posts.filter(post => {
    const today = new Date().toISOString().split('T')[0];
    return post.date > today;
  }).slice(0, 5);

  // Get posts for selected date
  const selectedDatePosts = selectedDate ? posts.filter(post => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    return post.date === selectedDateStr;
  }) : [];

  return (
    <DashboardLayout 
      title={t.calendar.title}
      description={t.calendar.description}
    >
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button>
              <span className="mr-2">📅</span>
              Schedule Post
            </Button>
            <Button variant="outline">
              <span className="mr-2">📋</span>
              Bulk Schedule
            </Button>
            <Button variant="outline">
              <span className="mr-2">🤖</span>
              AI Schedule
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <span className="mr-2">📊</span>
              Analytics
            </Button>
            <Button variant="outline" size="sm">
              <span className="mr-2">⚙️</span>
              Settings
            </Button>
          </div>
        </div>

        {/* Visual Calendar */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">{t.calendar.loading}</span>
          </div>
        ) : (
          <VisualCalendar
            posts={posts}
            onPostUpdate={handlePostUpdate}
            onPostEdit={handlePostEdit}
          />
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">💡</span>
              How to Use
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Drag & Drop</h4>
                  <p className="text-muted-foreground">
                    Click and drag posts to reschedule them to different dates and times.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Click to Edit</h4>
                  <p className="text-muted-foreground">
                    Click on any post to open the edit modal and modify content, platforms, or timing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">View Options</h4>
                  <p className="text-muted-foreground">
                    Switch between Month, Week, and Day views using the toolbar buttons.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Today's Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2">📅</span>
                Today's Schedule
              </CardTitle>
              <CardDescription>
                Posts scheduled for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todaysPosts.length > 0 ? (
                <div className="space-y-4">
                  {todaysPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{post.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Scheduled for {post.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {post.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform === 'LinkedIn' && '💼'}
                            {platform === 'Twitter' && '🐦'}
                            {platform === 'Instagram' && '📸'}
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-muted-foreground">No posts scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Scheduled</span>
                <span className="font-medium">12 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Published</span>
                <span className="font-medium">8 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Drafts</span>
                <span className="font-medium">3 posts</span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Posts</CardTitle>
              <CardDescription>
                Next scheduled content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPosts.map((post) => (
                  <div key={post.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{post.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {post.date} at {post.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {post.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform === 'LinkedIn' && '💼'}
                          {platform === 'Twitter' && '🐦'}
                          {platform === 'Instagram' && '📸'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best Times to Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                {t.calendar.optimalTiming}
              </CardTitle>
              <CardDescription>
                {t.calendar.optimalTimingDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingOptimal ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              ) : optimalTiming ? (
                <div className="space-y-4">
                  {/* Platform-specific optimal times */}
                  {optimalTiming.platforms && Object.entries(optimalTiming.platforms).map(([platform, times]: [string, any]) => (
                    <div key={platform} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {platform === 'linkedin' && '💼'}
                          {platform === 'facebook' && '📘'}
                          {platform === 'instagram' && '📸'}
                          {platform === 'youtube' && '📺'}
                          {platform === 'tiktok' && '🎵'}
                          {platform === 'twitter' && '🐦'}
                        </span>
                        <span className="text-sm font-medium capitalize">{platform}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {times.slice(0, 3).map((time: any, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {time.time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Common optimal times */}
                  {optimalTiming.common_times && optimalTiming.common_times.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        Çoxlu platform üçün optimal zamanlar:
                      </div>
                      <div className="space-y-1">
                        {optimalTiming.common_times.slice(0, 3).map((ct: any, idx: number) => (
                          <div key={idx} className="text-xs">
                            <span className="font-medium">{ct.time}</span>
                            <span className="text-muted-foreground ml-2">
                              ({Object.keys(ct.platforms).length} platform)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  {t.calendar.noPostsDesc}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Post Edit Modal */}
        <PostEditModal
          post={editingPost}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handlePostSave}
        />
      </div>
    </DashboardLayout>
  );
}
