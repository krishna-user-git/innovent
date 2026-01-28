import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Gift, Award, Star, DollarSign } from "lucide-react";
import { Prize } from "@/types/database";
import { cn } from "@/lib/utils";

interface PrizeShowcaseProps {
  prizes: Prize[];
  showWinners?: boolean;
}

const positionConfig: Record<number, { icon: typeof Trophy; color: string; bg: string }> = {
  1: {
    icon: Trophy,
    color: "text-gold",
    bg: "from-gold/20 to-transparent",
  },
  2: {
    icon: Award,
    color: "text-gray-400",
    bg: "from-gray-400/20 to-transparent",
  },
  3: {
    icon: Award,
    color: "text-orange-600",
    bg: "from-orange-600/20 to-transparent",
  },
};

export const PrizeShowcase = ({ prizes, showWinners = false }: PrizeShowcaseProps) => {
  // Separate main prizes (with position) from special prizes
  const mainPrizes = prizes.filter((p) => p.position && p.position <= 3);
  const specialPrizes = prizes.filter((p) => !p.position || p.position > 3);

  // Sort main prizes by position
  mainPrizes.sort((a, b) => (a.position || 0) - (b.position || 0));

  if (prizes.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="py-12 text-center">
          <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No prizes announced yet</p>
          <p className="text-gray-500 text-sm">
            Prize details will be revealed soon
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-gold" />
          Prizes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Main prizes */}
        {mainPrizes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {mainPrizes.map((prize) => {
              const config = positionConfig[prize.position || 1] || positionConfig[1];
              const Icon = config.icon;

              return (
                <div
                  key={prize.id}
                  className={cn(
                    "relative rounded-lg border border-gray-700 p-6 text-center bg-gradient-to-b",
                    config.bg,
                    prize.position === 1 && "md:scale-105 md:-mt-2"
                  )}
                >
                  {/* Position badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      className={cn(
                        "text-gray-900 font-bold",
                        prize.position === 1 && "bg-gold",
                        prize.position === 2 && "bg-gray-400",
                        prize.position === 3 && "bg-orange-600"
                      )}
                    >
                      {prize.position === 1
                        ? "1st Place"
                        : prize.position === 2
                        ? "2nd Place"
                        : "3rd Place"}
                    </Badge>
                  </div>

                  <Icon className={cn("h-12 w-12 mx-auto mb-4", config.color)} />

                  <h3 className="font-bold text-lg text-white mb-2">
                    {prize.name}
                  </h3>

                  {prize.value && (
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gold mb-2">
                      <DollarSign className="h-6 w-6" />
                      {prize.value}
                    </div>
                  )}

                  {prize.description && (
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {prize.description}
                    </p>
                  )}

                  {prize.sponsor && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-xs text-gray-500">Sponsored by</p>
                      <p className="text-sm text-gray-300 font-medium">
                        {prize.sponsor.name}
                      </p>
                    </div>
                  )}

                  {showWinners && prize.winner_project && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <Badge className="bg-emerald-600 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Winner: {prize.winner_project.name}
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Special prizes */}
        {specialPrizes.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="border-gray-600 text-gray-400">
                <Gift className="h-3 w-3 mr-1" />
                Special Prizes
              </Badge>
              <div className="flex-1 h-px bg-gray-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialPrizes.map((prize) => (
                <div
                  key={prize.id}
                  className="rounded-lg border border-gray-700 p-4 flex items-start gap-4"
                >
                  <div className="p-2 rounded-full bg-gray-700 shrink-0">
                    <Gift className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white mb-1">{prize.name}</h4>
                    {prize.value && (
                      <p className="text-gold font-semibold mb-1">
                        ${prize.value}
                      </p>
                    )}
                    {prize.description && (
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {prize.description}
                      </p>
                    )}
                    {prize.sponsor && (
                      <p className="text-xs text-gray-500 mt-2">
                        by {prize.sponsor.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
