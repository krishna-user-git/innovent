import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Medal, ExternalLink } from "lucide-react";
import { LeaderboardEntry } from "@/types/database";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TopThreeProps {
  entries: LeaderboardEntry[];
  onViewProject?: (projectId: string) => void;
}

const podiumConfig = {
  1: {
    icon: Trophy,
    iconColor: "text-gold",
    bgGradient: "from-gold/30 via-gold/10 to-transparent",
    borderColor: "border-gold/50",
    order: "order-2",
    height: "h-64",
    crown: true,
  },
  2: {
    icon: Medal,
    iconColor: "text-gray-400",
    bgGradient: "from-gray-500/30 via-gray-500/10 to-transparent",
    borderColor: "border-gray-500/50",
    order: "order-1",
    height: "h-56",
    crown: false,
  },
  3: {
    icon: Medal,
    iconColor: "text-orange-600",
    bgGradient: "from-orange-600/30 via-orange-600/10 to-transparent",
    borderColor: "border-orange-600/50",
    order: "order-3",
    height: "h-52",
    crown: false,
  },
};

export const TopThree = ({ entries, onViewProject }: TopThreeProps) => {
  const topThree = entries.slice(0, 3);

  if (topThree.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Trophy className="h-6 w-6 text-gold" />
        Top Projects
      </h3>
      
      <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6">
        {topThree.map((entry) => {
          const config = podiumConfig[entry.rank as 1 | 2 | 3];
          const Icon = config.icon;

          return (
            <Card
              key={entry.project.id}
              className={cn(
                "relative w-full md:w-72 bg-gradient-to-b border-2 overflow-hidden transition-all hover:scale-105",
                config.bgGradient,
                config.borderColor,
                config.order,
                config.height
              )}
            >
              {/* Crown for 1st place */}
              {config.crown && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
                  <span className="text-3xl">👑</span>
                </div>
              )}

              {/* Rank badge */}
              <div className="absolute top-3 right-3">
                <div className={cn(
                  "flex items-center justify-center h-10 w-10 rounded-full",
                  entry.rank === 1 && "bg-gold text-gray-900",
                  entry.rank === 2 && "bg-gray-400 text-gray-900",
                  entry.rank === 3 && "bg-orange-600 text-white"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <CardContent className="flex flex-col items-center justify-center h-full p-6 pt-10">
                {/* Project thumbnail */}
                <Avatar className="h-20 w-20 rounded-xl mb-4 border-2 border-gray-600">
                  {entry.project.thumbnail_url ? (
                    <AvatarImage
                      src={entry.project.thumbnail_url}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-gray-700 rounded-xl text-2xl">
                    {entry.project.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Project name */}
                <h4 className="font-bold text-lg text-white text-center line-clamp-1 mb-1">
                  {entry.project.name}
                </h4>

                {/* Team name */}
                <p className="text-sm text-gray-400 text-center line-clamp-1 mb-3">
                  by {entry.team.name}
                </p>

                {/* Score */}
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-gold fill-gold" />
                  <span className="text-2xl font-bold text-white">
                    {entry.averageScore.toFixed(1)}
                  </span>
                </div>

                {/* View button */}
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full mt-auto"
                  onClick={() => onViewProject?.(entry.project.id)}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Project
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
