'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { usePostGeneration } from '@/contexts/PostGenerationContext';
import { useTranslation } from '@/hooks/useTranslation';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { hasActiveGeneration, generatedPosts } = usePostGeneration();
  const [collapsed, setCollapsed] = useState(false);
  const t = useTranslation();

  // Navigation items
  const navigationItems = [
    {
      title: t.sidebar.dashboard,
      href: '/dashboard',
      icon: '📊',
      description: t.sidebar.dashboardDesc
    },
    {
      title: t.sidebar.posts,
      href: '/posts',
      icon: '📝',
      description: t.sidebar.postsDesc
    },
    {
      title: t.sidebar.calendar,
      href: '/calendar',
      icon: '📅',
      description: t.sidebar.calendarDesc
    },
    {
      title: t.sidebar.aiContentGenerator,
      href: '/ai-content-generator',
      icon: '🚀',
      description: t.sidebar.aiContentGeneratorDesc
    },
    {
      title: t.sidebar.aiTools,
      href: '/ai-tools',
      icon: '🤖',
      description: t.sidebar.aiToolsDesc
    },
    {
      title: t.sidebar.socialAccounts,
      href: '/social-accounts',
      icon: '🔗',
      description: t.sidebar.socialAccountsDesc
    },
    {
      title: t.sidebar.analytics,
      href: '/analytics',
      icon: '📈',
      description: t.sidebar.analyticsDesc
    },
    {
      title: t.sidebar.socialMediaAnalysis,
      href: '/social-media-analysis',
      icon: '🔍',
      description: t.sidebar.socialMediaAnalysisDesc
    },
    {
      title: 'Profil Link Analizi',
      href: '/profile-analyzer',
      icon: '🔗',
      description: 'Linkdən profil analizi'
    },
    {
      title: t.sidebar.metaAds,
      href: '/meta-ads',
      icon: '📢',
      description: t.sidebar.metaAdsDesc
    },
    {
      title: t.sidebar.brandVoice,
      href: '/brand-voice',
      icon: '🎯',
      description: t.sidebar.brandVoiceDesc
    },
    {
      title: t.sidebar.templates,
      href: '/templates',
      icon: '📋',
      description: t.sidebar.templatesDesc
    },
    {
      title: t.sidebar.settings,
      href: '/settings',
      icon: '⚙️',
      description: t.sidebar.settingsDesc
    }
  ];

  const getUserInitials = (user: any) => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <div className={cn(
      "flex flex-col h-full bg-card border-r border-border",
      collapsed ? "w-16" : "w-64",
      "transition-all duration-300 ease-in-out",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🚀</div>
            <h1 className="text-xl font-bold text-foreground">Timera</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? '→' : '←'}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const showPendingBadge = item.href === '/ai-content-generator' && hasActiveGeneration;
          const pendingCount = generatedPosts.filter(p => p.status === 'pending_approval').length;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-12",
                  collapsed ? "px-2" : "px-3",
                  isActive && "bg-secondary text-secondary-foreground"
                )}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {!collapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                    {showPendingBadge && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        {pendingCount} {t.sidebar.pending}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={user?.email} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitials(user)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <span className="mr-2">⚙️</span>
                  {t.sidebar.settings}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/profile">
                  <span className="mr-2">👤</span>
                  {t.sidebar.profile}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/billing">
                  <span className="mr-2">💳</span>
                  {t.sidebar.billing}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <span className="mr-2">🚪</span>
                {t.sidebar.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {user?.company_name || t.sidebar.personalAccount}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-1">
            <ThemeToggle />
          </div>
        </div>

        {!collapsed && (
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{t.sidebar.plan}: {user?.subscription_plan || t.sidebar.free}</span>
          </div>
        )}
      </div>
    </div>
  );
}

