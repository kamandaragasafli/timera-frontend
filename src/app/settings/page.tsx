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
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const t = useTranslation();

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
      title={t.settings.title}
      description={t.settings.description}
    >
      <div className="max-w-4xl space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.profile.title}</CardTitle>
            <CardDescription>
              {t.settings.profile.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t.settings.profile.firstName}</Label>
                <Input id="firstName" defaultValue={user?.first_name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t.settings.profile.lastName}</Label>
                <Input id="lastName" defaultValue={user?.last_name} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t.settings.profile.email}</Label>
              <Input id="email" type="email" defaultValue={user?.email} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">{t.settings.profile.companyName}</Label>
              <Input id="company" defaultValue={user?.company_name || ''} />
            </div>
            
            <Button>{t.settings.profile.saveChanges}</Button>
          </CardContent>
        </Card>

        {/* Company Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t.settings.companyProfile.title}</CardTitle>
                <CardDescription>
                  {t.settings.companyProfile.description}
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
                  {companyProfile ? t.settings.companyProfile.edit : t.settings.companyProfile.create}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingProfile ? (
              <p className="text-sm text-muted-foreground">{t.settings.companyProfile.loading}</p>
            ) : companyProfile ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">{t.settings.companyProfile.companyName}</Label>
                    <p className="font-medium">{companyProfile.company_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">{t.settings.companyProfile.industry}</Label>
                    <p className="font-medium">{companyProfile.industry}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">{t.settings.companyProfile.companySize}</Label>
                    <p className="font-medium">{companyProfile.company_size}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">{t.settings.companyProfile.style}</Label>
                    <p className="font-medium">{companyProfile.preferred_tone}</p>
                  </div>
                </div>
                
                {companyProfile.website && (
                  <div>
                    <Label className="text-sm text-muted-foreground">{t.settings.companyProfile.website}</Label>
                    <p className="font-medium">
                      <a href={companyProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {companyProfile.website}
                      </a>
                    </p>
                  </div>
                )}
                
                {companyProfile.business_description && (
                  <div>
                    <Label className="text-sm text-muted-foreground">{t.settings.companyProfile.businessDescription}</Label>
                    <p className="text-sm">{companyProfile.business_description}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {t.settings.companyProfile.noProfile}
                </p>
                <Button onClick={() => router.push('/setup/company')}>
                  {t.settings.companyProfile.createProfile}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.account.title}</CardTitle>
            <CardDescription>
              {t.settings.account.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.account.emailVerification}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.account.emailVerificationDesc}
                </p>
              </div>
              <Badge variant={user?.is_email_verified ? "default" : "secondary"}>
                {user?.is_email_verified ? t.settings.account.verified : t.settings.account.unverified}
              </Badge>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.account.subscriptionPlan}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.account.subscriptionPlanDesc.replace('{plan}', user?.subscription_plan || 'Free')}
                </p>
              </div>
              <Button variant="outline">{t.settings.account.upgradePlan}</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.account.changePassword}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.account.changePasswordDesc}
                </p>
              </div>
              <Button variant="outline">{t.settings.account.changePassword}</Button>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.languagePreferences.title}</CardTitle>
            <CardDescription>
              {t.settings.languagePreferences.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.languagePreferences.interfaceLanguage}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.languagePreferences.interfaceLanguageDesc}
                </p>
              </div>
              <LanguageSelector />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.notifications.title}</CardTitle>
            <CardDescription>
              {t.settings.notifications.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.notifications.emailNotifications}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.notifications.emailNotificationsDesc}
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.notifications.postReminders}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.notifications.postRemindersDesc}
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.notifications.weeklyReports}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.notifications.weeklyReportsDesc}
                </p>
              </div>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Legal */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.legal.title}</CardTitle>
            <CardDescription>
              {t.settings.legal.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.legal.privacyPolicy}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.legal.privacyPolicyDesc}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => router.push('/policy')}
              >
                {t.settings.legal.read}
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.legal.termsOfService}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.legal.termsOfServiceDesc}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => router.push('/terms')}
              >
                {t.settings.legal.read}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">{t.settings.dangerZone.title}</CardTitle>
            <CardDescription>
              {t.settings.dangerZone.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t.settings.dangerZone.deleteAccount}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.settings.dangerZone.deleteAccountDesc}
                </p>
              </div>
              <Button variant="destructive">{t.settings.dangerZone.deleteAccount}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}



