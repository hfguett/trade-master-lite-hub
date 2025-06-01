
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellRing, Check, X, Filter, MoreVertical } from 'lucide-react';

interface Notification {
  id: string;
  type: 'trade' | 'whale' | 'goal' | 'market' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    callback: () => void;
  };
}

export const NotificationsCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'whale',
      title: 'Large SOL Transaction Detected',
      message: 'Whale moved 50,000 SOL ($2.5M) to Raydium 15 minutes ago',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'trade',
      title: 'Trade Alert: BTC/USDT',
      message: 'Your BTC/USDT position reached take profit target (+$1,250)',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'goal',
      title: 'Daily Goal Achieved!',
      message: 'Congratulations! You\'ve reached your daily profit target of $500',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'market',
      title: 'Market Alert',
      message: 'Bitcoin breaks above $43,000 resistance level with high volume',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'system',
      title: 'Platform Update',
      message: 'New whale tracking features are now available in your dashboard',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'trade' | 'whale' | 'goal'>('all');

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === 'high' ? 'text-red-400' : priority === 'medium' ? 'text-mint' : 'text-blue-400';
    
    switch (type) {
      case 'whale': return <BellRing className={`h-4 w-4 ${iconClass}`} />;
      case 'trade': return <Bell className={`h-4 w-4 ${iconClass}`} />;
      case 'goal': return <Bell className={`h-4 w-4 ${iconClass}`} />;
      case 'market': return <Bell className={`h-4 w-4 ${iconClass}`} />;
      case 'system': return <Bell className={`h-4 w-4 ${iconClass}`} />;
      default: return <Bell className={`h-4 w-4 ${iconClass}`} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-mint/20 text-mint border-mint/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold gradient-text">Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="border-mint/50 hover-mint-border"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All', count: notifications.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'trade', label: 'Trading', count: notifications.filter(n => n.type === 'trade').length },
          { key: 'whale', label: 'Whale Alerts', count: notifications.filter(n => n.type === 'whale').length },
          { key: 'goal', label: 'Goals', count: notifications.filter(n => n.type === 'goal').length }
        ].map(({ key, label, count }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(key as any)}
            className={filter === key ? "bg-mint text-dark-blue" : "border-mint/50 hover-mint-border"}
          >
            {label} {count > 0 && `(${count})`}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications found</p>
              <p className="text-sm mt-2">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {filteredNotifications.map((notification, index) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-dark-blue/30 transition-all duration-300 animate-slide-up ${
                    !notification.read ? 'border-l-4 border-mint bg-mint/5' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type, notification.priority)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(notification.priority)}`}
                          >
                            {notification.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {notification.type}
                          </Badge>
                        </div>
                        <p className={`text-sm ${!notification.read ? 'text-foreground/80' : 'text-muted-foreground'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                        
                        {notification.action && (
                          <Button 
                            size="sm" 
                            className="mt-3 bg-mint hover:bg-mint/80 text-dark-blue"
                            onClick={notification.action.callback}
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 w-8 p-0 hover:bg-mint/20"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-8 w-8 p-0 hover:bg-red-500/20 text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
