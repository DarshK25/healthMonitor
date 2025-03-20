import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useNavigate } from 'react-router-dom';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: 'High Heart Rate Alert',
    description: 'Your heart rate has exceeded the normal range.',
    severity: 'high',
    timestamp: new Date().toISOString(),
    type: 'alert',
    link: '/dashboard?tab=alerts'
  },
  {
    id: 2,
    title: 'Blood Pressure Warning',
    description: 'Your blood pressure is slightly elevated.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: 'alert',
    link: '/dashboard?tab=alerts'
  },
  {
    id: 3,
    title: 'New Health Report',
    description: 'Your monthly health report is ready to view.',
    severity: 'low',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: 'report',
    link: '/dashboard?tab=metrics'
  }
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    
    // Navigate to the appropriate page
    navigate(notification.link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 cursor-pointer ${
                  !notification.read ? 'bg-accent/50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{notification.title}</span>
                    <Badge
                      variant={
                        notification.severity === 'high'
                          ? 'destructive'
                          : notification.severity === 'medium'
                          ? 'warning'
                          : 'success'
                      }
                      className="ml-2"
                    >
                      {notification.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => navigate('/dashboard?tab=alerts')}
            >
              View all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 