import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'loading';
  label?: string;
  className?: string;
}

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'loading': return 'bg-yellow-500 animate-pulse';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'loading': return 'Loading';
      default: return 'Unknown';
    }
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className={cn('w-2 h-2 rounded-full', getStatusColor())} />
      <span className="text-sm text-muted-foreground">
        {label || getStatusText()}
      </span>
    </div>
  );
}







