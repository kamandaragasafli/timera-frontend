'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface NotificationBannerProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  dismissible?: boolean;
  badge?: string;
}

export function NotificationBanner({
  type,
  title,
  description,
  actionText,
  actionHref,
  onAction,
  dismissible = false,
  badge
}: NotificationBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'info':
        return 'border-blue-500/20 bg-blue-500/5';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/5';
      case 'success':
        return 'border-green-500/20 bg-green-500/5';
      case 'error':
        return 'border-red-500/20 bg-red-500/5';
      default:
        return 'border-gray-500/20 bg-gray-500/5';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'info': return '💡';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <Card className={getTypeStyles()}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl">{getTypeIcon()}</span>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">{title}</h4>
                {badge && (
                  <Badge variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {actionText && actionHref && (
              <Link href={actionHref}>
                <Button size="sm">
                  {actionText}
                </Button>
              </Link>
            )}
            {actionText && onAction && (
              <Button size="sm" onClick={onAction}>
                {actionText}
              </Button>
            )}
            {dismissible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDismissed(true)}
                className="h-8 w-8 p-0"
              >
                ×
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}







