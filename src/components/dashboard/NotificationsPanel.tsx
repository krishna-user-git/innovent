import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Trash2, 
  Calendar,
  Users,
  Trophy,
  AlertCircle,
  MessageSquare,
  X
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Notification } from "@/types/database";
import { cn } from "@/lib/utils";

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'event':
      return <Calendar className="h-4 w-4 text-blue-400" />;
    case 'team':
      return <Users className="h-4 w-4 text-green-400" />;
    case 'prize':
      return <Trophy className="h-4 w-4 text-gold" />;
    case 'alert':
      return <AlertCircle className="h-4 w-4 text-red-400" />;
    case 'message':
      return <MessageSquare className="h-4 w-4 text-purple-400" />;
    default:
      return <Bell className="h-4 w-4 text-gray-400" />;
  }
};

const getNotificationColor = (type: string, read: boolean) => {
  if (read) return "border-gray-700";
  
  switch (type) {
    case 'event':
      return "border-l-4 border-l-blue-500 border-gray-700";
    case 'team':
      return "border-l-4 border-l-green-500 border-gray-700";
    case 'prize':
      return "border-l-4 border-l-gold border-gray-700";
    case 'alert':
      return "border-l-4 border-l-red-500 border-gray-700";
    default:
      return "border-l-4 border-l-gray-500 border-gray-700";
  }
};

export const NotificationsPanel = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  isLoading,
}: NotificationsPanelProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center gap-2">
          <Bell className="h-5 w-5 text-gold" />
          Notifications
          {unreadCount > 0 && (
            <Badge className="bg-gold text-gray-900 ml-2">{unreadCount}</Badge>
          )}
        </CardTitle>
        {unreadCount > 0 && onMarkAllAsRead && (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={onMarkAllAsRead}
          >
            <CheckCheck className="h-4 w-4 mr-1" />
            Mark all read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <Bell className="h-12 w-12 text-gray-600 mb-4" />
              <p className="text-gray-400">No notifications yet</p>
              <p className="text-gray-500 text-sm">
                You'll see updates about your events and teams here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "relative rounded-lg border p-4 transition-all hover:bg-gray-700/50",
                    getNotificationColor(notification.type, notification.read || false),
                    !notification.read && "bg-gray-700/30"
                  )}
                  onMouseEnter={() => setHoveredId(notification.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-gray-700 shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={cn(
                          "text-sm font-medium truncate",
                          notification.read ? "text-gray-300" : "text-white"
                        )}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-gold shrink-0" />
                        )}
                      </div>
                      {notification.message && (
                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                          {notification.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons - show on hover */}
                  {hoveredId === notification.id && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      {!notification.read && onMarkAsRead && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-gray-400 hover:text-white"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-gray-400 hover:text-red-400"
                          onClick={() => onDelete(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
