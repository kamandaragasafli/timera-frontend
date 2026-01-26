'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authAPI, postsAPI } from '@/lib/api';

export default function SystemStatusPage() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [apiTests, setApiTests] = useState<any>({});
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    testSystemStatus();
  }, []);

  const testSystemStatus = async () => {
    const tests: any = {};

    // Test backend connection
    try {
      const response = await fetch('http://localhost:8000/admin/', { method: 'HEAD' });
      if (response.status === 200 || response.status === 302) {
        setBackendStatus('online');
        tests.backend = { status: 'success', message: 'Backend server is running' };
      } else {
        setBackendStatus('offline');
        tests.backend = { status: 'error', message: 'Backend server not responding' };
      }
    } catch (error) {
      setBackendStatus('offline');
      tests.backend = { status: 'error', message: 'Cannot connect to backend' };
    }

    // Test authentication
    try {
      const response = await authAPI.getStats();
      tests.auth = { status: 'success', message: 'Authentication working', data: response.data };
      setStats(response.data);
    } catch (error) {
      tests.auth = { status: 'error', message: 'Authentication failed' };
    }

    // Test posts API
    try {
      const response = await postsAPI.getPosts();
      tests.posts = { status: 'success', message: `Posts API working (${response.data.length} posts)` };
    } catch (error) {
      tests.posts = { status: 'error', message: 'Posts API failed' };
    }

    // Test company profile
    try {
      const response = await authAPI.getCompanyProfile();
      tests.company = { status: 'success', message: 'Company profile exists' };
    } catch (error) {
      tests.company = { status: 'warning', message: 'No company profile found' };
    }

    setApiTests(tests);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">🔍 System Status</h1>
          <p className="text-muted-foreground">
            Check the health of all system components
          </p>
        </div>

        {/* Overall Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">🚀</span>
              Timera System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <span>Backend Server</span>
                <Badge variant={backendStatus === 'online' ? 'default' : 'destructive'}>
                  {backendStatus === 'checking' ? '⏳ Checking' : 
                   backendStatus === 'online' ? '✅ Online' : '❌ Offline'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Frontend Server</span>
                <Badge variant="default">✅ Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Tests */}
        <Card>
          <CardHeader>
            <CardTitle>API Endpoints Test</CardTitle>
            <CardDescription>
              Testing all API endpoints and integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(apiTests).map(([key, test]: [string, any]) => (
                <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getStatusIcon(test.status)}</span>
                    <div>
                      <div className="font-medium capitalize">{key} API</div>
                      <div className={`text-sm ${getStatusColor(test.status)}`}>
                        {test.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        {stats && (
          <Card>
            <CardHeader>
              <CardTitle>Current Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.total_posts}</div>
                  <div className="text-sm text-muted-foreground">Total Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending_approval}</div>
                  <div className="text-sm text-muted-foreground">Pending Approval</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.approved_posts}</div>
                  <div className="text-sm text-muted-foreground">Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.ai_generated_posts}</div>
                  <div className="text-sm text-muted-foreground">AI Generated</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button onClick={testSystemStatus}>
                <span className="mr-2">🔄</span>
                Refresh Status
              </Button>
              <Button variant="outline" onClick={() => window.open('http://localhost:8000/admin', '_blank')}>
                <span className="mr-2">⚙️</span>
                Django Admin
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                <span className="mr-2">🏠</span>
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Environment Info */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Frontend</div>
                <div className="text-muted-foreground">Next.js 15.5.4 (Turbopack)</div>
                <div className="text-muted-foreground">http://localhost:3000</div>
              </div>
              <div>
                <div className="font-medium">Backend</div>
                <div className="text-muted-foreground">Django REST Framework</div>
                <div className="text-muted-foreground">http://localhost:8000</div>
              </div>
              <div>
                <div className="font-medium">Database</div>
                <div className="text-muted-foreground">SQLite (Development)</div>
              </div>
              <div>
                <div className="font-medium">AI Integration</div>
                <div className="text-muted-foreground">OpenAI GPT-4</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}




