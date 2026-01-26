'use client';

import { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, Views, Event } from 'react-big-calendar';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface PostEvent extends Event {
  id: string;
  title: string;
  content: string;
  platforms: string[];
  status: string;
  color: string;
  start: Date;
  end: Date;
}

interface VisualCalendarProps {
  posts: any[];
  onPostUpdate: (postId: string, newDate: Date, newTime: string) => void;
  onPostEdit: (post: any) => void;
}

export function VisualCalendar({ posts, onPostUpdate, onPostEdit }: VisualCalendarProps) {
  const [view, setView] = useState<any>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Convert posts to calendar events
  const events: PostEvent[] = posts.map(post => {
    const [hours, minutes] = post.time.split(':');
    const startDate = new Date(post.date);
    startDate.setHours(parseInt(hours), parseInt(minutes));
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30); // 30-minute duration

    return {
      id: post.id.toString(),
      title: post.title,
      content: post.content,
      platforms: post.platforms,
      status: post.status,
      color: post.color,
      start: startDate,
      end: endDate,
      resource: post
    };
  });

  // Handle event drag and drop
  const handleEventDrop = useCallback(({ event, start, end }: any) => {
    const newTime = moment(start).format('HH:mm');
    const newDate = moment(start).format('YYYY-MM-DD');
    onPostUpdate(event.id, start, newTime);
  }, [onPostUpdate]);

  // Handle event resize
  const handleEventResize = useCallback(({ event, start, end }: any) => {
    const newTime = moment(start).format('HH:mm');
    onPostUpdate(event.id, start, newTime);
  }, [onPostUpdate]);

  // Custom event component
  const EventComponent = ({ event }: { event: PostEvent }) => {
    const getPlatformIcon = (platform: string) => {
      switch (platform) {
        case 'LinkedIn': return '💼';
        case 'Twitter': return '🐦';
        case 'Instagram': return '📸';
        case 'Facebook': return '📘';
        case 'Telegram': return '📱';
        default: return '📱';
      }
    };

    return (
      <div 
        className="p-2 rounded-md text-white text-xs cursor-pointer hover:opacity-90 transition-opacity"
        style={{ 
          backgroundColor: event.color.replace('bg-', '').replace('-500', ''),
          background: event.color.includes('blue') ? '#3b82f6' :
                     event.color.includes('green') ? '#10b981' :
                     event.color.includes('purple') ? '#8b5cf6' :
                     event.color.includes('orange') ? '#f97316' :
                     event.color.includes('pink') ? '#ec4899' :
                     event.color.includes('indigo') ? '#6366f1' :
                     event.color.includes('cyan') ? '#06b6d4' :
                     event.color.includes('emerald') ? '#059669' : '#6b7280'
        }}
        onClick={() => onPostEdit(event.resource)}
      >
        <div className="font-medium truncate mb-1">{event.title}</div>
        <div className="flex items-center space-x-1 mb-1">
          {event.platforms.slice(0, 3).map((platform, index) => (
            <span key={index} className="text-xs">
              {getPlatformIcon(platform)}
            </span>
          ))}
          {event.platforms.length > 3 && (
            <span className="text-xs">+{event.platforms.length - 3}</span>
          )}
        </div>
        <div className="text-xs opacity-90 line-clamp-2">
          {event.content.substring(0, 50)}...
        </div>
      </div>
    );
  };

  // Custom toolbar
  const CustomToolbar = ({ label, onNavigate, onView }: any) => (
    <div className="flex items-center justify-between mb-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => onNavigate('PREV')}>
          ←
        </Button>
        <Button variant="outline" size="sm" onClick={() => onNavigate('TODAY')}>
          Today
        </Button>
        <Button variant="outline" size="sm" onClick={() => onNavigate('NEXT')}>
          →
        </Button>
      </div>
      
      <h2 className="text-lg font-semibold">{label}</h2>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant={view === Views.MONTH ? "default" : "outline"} 
          size="sm" 
          onClick={() => { setView(Views.MONTH); onView(Views.MONTH); }}
        >
          Month
        </Button>
        <Button 
          variant={view === Views.WEEK ? "default" : "outline"} 
          size="sm" 
          onClick={() => { setView(Views.WEEK); onView(Views.WEEK); }}
        >
          Week
        </Button>
        <Button 
          variant={view === Views.DAY ? "default" : "outline"} 
          size="sm" 
          onClick={() => { setView(Views.DAY); onView(Views.DAY); }}
        >
          Day
        </Button>
      </div>
    </div>
  );

  // Custom day cell wrapper
  const DayCellWrapper = ({ children, value }: any) => {
    const dayPosts = events.filter(event => 
      moment(event.start).isSame(value, 'day')
    );

    return (
      <div className="relative h-full">
        {children}
        {dayPosts.length > 0 && view === Views.MONTH && (
          <div className="absolute top-1 right-1">
            <Badge variant="secondary" className="text-xs h-5 w-5 p-0 flex items-center justify-center">
              {dayPosts.length}
            </Badge>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="mr-2">📅</span>
          Visual Content Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div style={{ height: '700px' }} className="p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            resizable
            draggableAccessor={() => true}
            components={{
              event: EventComponent,
              toolbar: CustomToolbar,
              dateCellWrapper: DayCellWrapper,
            }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0,
                margin: '1px',
              }
            })}
            dayLayoutAlgorithm="no-overlap"
            step={15}
            timeslots={4}
            min={new Date(2025, 0, 1, 6, 0, 0)} // 6 AM
            max={new Date(2025, 0, 1, 22, 0, 0)} // 10 PM
            formats={{
              timeGutterFormat: 'HH:mm',
              eventTimeRangeFormat: ({ start, end }) => 
                `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
            }}
            className="custom-calendar"
          />
        </div>
      </CardContent>
    </Card>
  );
}








