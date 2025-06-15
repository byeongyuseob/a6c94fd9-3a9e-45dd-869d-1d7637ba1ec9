
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Check, CheckCheck, Trash2, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useNotifications, Notification } from '@/contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return <Info className="h-4 w-4 text-blue-500" aria-hidden="true" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" aria-hidden="true" />;
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" aria-hidden="true" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" aria-hidden="true" />;
  }
};

export const NotificationPanel = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 relative"
          aria-label="알림 보기"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              aria-label={`읽지 않은 알림 ${unreadCount}개`}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
          <span className="sr-only">알림</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-full max-w-sm sm:w-96 p-0 bg-background border shadow-lg z-50"
        aria-label="알림 목록"
        role="region"
      >
        <div className="p-4 border-b bg-background/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground" id="notification_header">알림</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount}개 읽지 않음
                </Badge>
              )}
            </div>
            <div className="flex gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="h-7 px-2 text-xs"
                  aria-label="모든 알림 읽음 처리"
                >
                  <CheckCheck className="h-3 w-3 mr-1" />
                  모두 읽음
                </Button>
              )}
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllNotifications}
                  className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                  aria-label="모든 알림 삭제"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  모두 삭제
                </Button>
              )}
            </div>
          </div>
        </div>

        <ScrollArea className="h-96" role="listbox" aria-labelledby="notification_header">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">새로운 알림이 없습니다</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/50 ${
                      !notification.read
                        ? 'bg-primary/5 border-l-2 border-l-primary'
                        : 'hover:bg-accent/30'
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                    role="option"
                    aria-selected={!notification.read}
                    tabIndex={0}
                    aria-label={notification.title}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-sm font-medium truncate ${
                            !notification.read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearNotification(notification.id);
                              }}
                              className="h-6 w-6 p-0 opacity-80 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                              aria-label="알림 삭제"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDistanceToNow(notification.timestamp, {
                            addSuffix: true,
                            locale: ko
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < notifications.length - 1 && (
                    <Separator className="my-1" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
