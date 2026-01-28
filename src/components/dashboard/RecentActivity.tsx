import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { 
  Calendar, 
  Users, 
  Trophy, 
  Bell, 
  CheckCircle, 
  UserPlus,
  Folder,
  MessageSquare
} from "lucide-react";
import { ActivityLog } from "@/types/database";

interface RecentActivityProps {
  activities: ActivityLog[];
  isLoading?: boolean;
}

const getActivityIcon = (action: string) => {
  switch (action) {
    case 'event_created':
      return <Calendar className="h-4 w-4 text-blue-400" />;
    case 'team_joined':
      return <Users className="h-4 w-4 text-green-400" />;
    case 'project_submitted':
      return <Folder className="h-4 w-4 text-purple-400" />;
    case 'registration_completed':
      return <CheckCircle className="h-4 w-4 text-emerald-400" />;
    case 'team_created':
      return <UserPlus className="h-4 w-4 text-orange-400" />;
    case 'announcement_posted':
      return <Bell className="h-4 w-4 text-yellow-400" />;
    case 'prize_won':
      return <Trophy className="h-4 w-4 text-gold" />;
    default:
      return <MessageSquare className="h-4 w-4 text-gray-400" />;
  }
};

const getActivityMessage = (activity: ActivityLog) => {
  const metadata = activity.metadata as Record<string, any> || {};
  
  switch (activity.action) {
    case 'event_created':
      return `Created event "${metadata.event_name || 'New Event'}"`;
    case 'team_joined':
      return `Joined team "${metadata.team_name || 'a team'}"`;
    case 'project_submitted':
      return `Submitted project "${metadata.project_name || 'New Project'}"`;
    case 'registration_completed':
      return `Registered for "${metadata.event_name || 'an event'}"`;
    case 'team_created':
      return `Created team "${metadata.team_name || 'New Team'}"`;
    case 'announcement_posted':
      return `Posted announcement: "${metadata.title || 'New announcement'}"`;
    case 'prize_won':
      return `Won ${metadata.prize_name || 'a prize'}!`;
    default:
      return activity.action.replace(/_/g, ' ');
  }
};

const getActivityBadge = (action: string) => {
  switch (action) {
    case 'event_created':
      return <Badge variant="outline" className="border-blue-400 text-blue-400">Event</Badge>;
    case 'team_joined':
    case 'team_created':
      return <Badge variant="outline" className="border-green-400 text-green-400">Team</Badge>;
    case 'project_submitted':
      return <Badge variant="outline" className="border-purple-400 text-purple-400">Project</Badge>;
    case 'registration_completed':
      return <Badge variant="outline" className="border-emerald-400 text-emerald-400">Registration</Badge>;
    case 'prize_won':
      return <Badge variant="outline" className="border-gold text-gold">Prize</Badge>;
    default:
      return <Badge variant="outline" className="border-gray-400 text-gray-400">Activity</Badge>;
  }
};

export const RecentActivity = ({ activities, isLoading }: RecentActivityProps) => {
  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-10 w-10 rounded-full bg-gray-700" />
                <div className="space-y-2 flex-1">
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
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bell className="h-5 w-5 text-gold" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <Bell className="h-12 w-12 text-gray-600 mb-4" />
              <p className="text-gray-400">No recent activity</p>
              <p className="text-gray-500 text-sm">Your activity will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-gray-700">
                    {getActivityIcon(activity.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getActivityBadge(activity.action)}
                    </div>
                    <p className="text-sm text-white truncate">
                      {getActivityMessage(activity)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
