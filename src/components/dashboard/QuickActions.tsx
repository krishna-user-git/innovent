import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Users, 
  Folder, 
  Search, 
  Settings, 
  Bell,
  Calendar,
  Trophy,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  description: string;
  path: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    icon: <Plus className="h-5 w-5" />,
    label: "Create Event",
    description: "Start a new hackathon or event",
    path: "/create-event",
    color: "bg-gold hover:bg-gold/90 text-gray-900",
  },
  {
    icon: <Search className="h-5 w-5" />,
    label: "Browse Events",
    description: "Find events to participate in",
    path: "/events",
    color: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "My Teams",
    description: "Manage your teams",
    path: "/teams",
    color: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  {
    icon: <Folder className="h-5 w-5" />,
    label: "My Projects",
    description: "View your project submissions",
    path: "/projects",
    color: "bg-purple-600 hover:bg-purple-700 text-white",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    label: "Leaderboard",
    description: "See top projects and winners",
    path: "/leaderboard",
    color: "bg-orange-600 hover:bg-orange-700 text-white",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    label: "Notifications",
    description: "Check your notifications",
    path: "/notifications",
    color: "bg-pink-600 hover:bg-pink-700 text-white",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Resources",
    description: "Learning materials and guides",
    path: "/resources",
    color: "bg-cyan-600 hover:bg-cyan-700 text-white",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    description: "Manage your profile",
    path: "/settings",
    color: "bg-gray-600 hover:bg-gray-700 text-white",
  },
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gold" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              className={`h-auto flex flex-col items-center justify-center p-4 ${action.color}`}
              onClick={() => navigate(action.path)}
            >
              <div className="mb-2">{action.icon}</div>
              <span className="text-sm font-medium">{action.label}</span>
              <span className="text-xs opacity-75 text-center mt-1 hidden md:block">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
