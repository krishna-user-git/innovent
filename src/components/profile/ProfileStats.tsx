import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Trophy, 
  Calendar, 
  Users, 
  Folder, 
  Target,
  Award,
  TrendingUp
} from "lucide-react";

interface ProfileStatsProps {
  stats: {
    eventsParticipated: number;
    eventsOrganized: number;
    teamsJoined: number;
    projectsSubmitted: number;
    prizesWon: number;
    totalPoints: number;
  };
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => {
  const statItems = [
    {
      icon: Calendar,
      label: "Events Participated",
      value: stats.eventsParticipated,
      color: "text-blue-400",
    },
    {
      icon: Target,
      label: "Events Organized",
      value: stats.eventsOrganized,
      color: "text-emerald-400",
    },
    {
      icon: Users,
      label: "Teams Joined",
      value: stats.teamsJoined,
      color: "text-purple-400",
    },
    {
      icon: Folder,
      label: "Projects Submitted",
      value: stats.projectsSubmitted,
      color: "text-orange-400",
    },
    {
      icon: Trophy,
      label: "Prizes Won",
      value: stats.prizesWon,
      color: "text-gold",
    },
    {
      icon: TrendingUp,
      label: "Total Points",
      value: stats.totalPoints,
      color: "text-cyan-400",
    },
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Award className="h-5 w-5 text-gold" />
          Activity Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-gray-700/50 rounded-lg p-4 text-center"
              >
                <Icon className={`h-6 w-6 mx-auto mb-2 ${item.color}`} />
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-gray-400">{item.label}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
