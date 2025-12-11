'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await authAPI.getCompanyProfile();
        setCompanyProfile(response.data);
      } catch (error) {
        console.log('No company profile found');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchCompanyProfile();
  }, []);

  return (
    <DashboardLayout 
      title="Settings"
      description="Manage your account preferences and configuration"
    >
      <div className="max-w-4xl space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user?.first_name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={user?.last_name} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" defaultValue={user?.company_name || ''} />
            </div>
            
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Company Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Şirkət Profili</CardTitle>
                <CardDescription>
                  AI məzmunu üçün şirkət məlumatlarınızı idarə edin
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/settings/branding-preview')}
                >
                  🎨 Branding Preview
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/setup/company')}
                >
                  {companyProfile ? 'Redaktə Et' : 'Yarat'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingProfile ? (
              <p className="text-sm text-muted-foreground">Yüklənir...</p>
            ) : companyProfile ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Şirkət Adı</Label>
                    <p className="font-medium">{companyProfile.company_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Sənaye</Label>
                    <p className="font-medium">{companyProfile.industry}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Şirkət Ölçüsü</Label>
                    <p className="font-medium">{companyProfile.company_size}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Üslub</Label>
                    <p className="font-medium">{companyProfile.preferred_tone}</p>
                  </div>
                </div>
                
                {companyProfile.website && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Vebsayt</Label>
                    <p className="font-medium">
                      <a href={companyProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {companyProfile.website}
                      </a>
                    </p>
                  </div>
                )}
                
                {companyProfile.business_description && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Biznes Təsviri</Label>
                    <p className="text-sm">{companyProfile.business_description}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Hələ ki şirkət profili yaradılmayıb
                </p>
                <Button onClick={() => router.push('/setup/company')}>
                  Şirkət Profili Yarat
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Verification</h4>
                <p className="text-sm text-muted-foreground">
                  Verify your email address to secure your account
                </p>
              </div>
              <Badge variant={user?.is_email_verified ? "default" : "secondary"}>
                {user?.is_email_verified ? "Verified" : "Unverified"}
              </Badge>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Subscription Plan</h4>
                <p className="text-sm text-muted-foreground">
                  Current plan: {user?.subscription_plan || 'Free'}
                </p>
              </div>
              <Button variant="outline">Upgrade Plan</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Receive updates about your posts and account
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Post Reminders</h4>
                <p className="text-sm text-muted-foreground">
                  Get reminded about scheduled posts
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Weekly Reports</h4>
                <p className="text-sm text-muted-foreground">
                  Receive weekly performance summaries
                </p>
              </div>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Legal */}
        <Card>
          <CardHeader>
            <CardTitle>Qanuni Sənədlər</CardTitle>
            <CardDescription>
              Gizlilik siyasəti və istifadə şərtləri
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Gizlilik Siyasəti</h4>
                <p className="text-sm text-muted-foreground">
                  Məlumatlarınızın necə toplandığı və istifadə olunduğu haqqında
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => router.push('/policy')}
              >
                Oxu
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">İstifadə Şərtləri</h4>
                <p className="text-sm text-muted-foreground">
                  Platformadan istifadə qaydaları və şərtləri
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => router.push('/terms')}
              >
                Oxu
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions that affect your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}



