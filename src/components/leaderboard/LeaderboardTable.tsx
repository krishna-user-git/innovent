import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Medal, 
  Star, 
  ExternalLink, 
  Github,
  ChevronUp,
  ChevronDown,
  Minus
} from "lucide-react";
import { LeaderboardEntry } from "@/types/database";
import { cn } from "@/lib/utils";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  isLoading?: boolean;
  onViewProject?: (projectId: string) => void;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-gold" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-orange-600" />;
    default:
      return <span className="text-gray-400 font-medium">{rank}</span>;
  }
};

const getRankBackground = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-gold/20 to-transparent";
    case 2:
      return "bg-gradient-to-r from-gray-500/20 to-transparent";
    case 3:
      return "bg-gradient-to-r from-orange-600/20 to-transparent";
    default:
      return "";
  }
};

const getTrendIcon = (change?: number) => {
  if (!change || change === 0) {
    return <Minus className="h-4 w-4 text-gray-500" />;
  }
  if (change > 0) {
    return (
      <span className="flex items-center text-emerald-500 text-xs">
        <ChevronUp className="h-4 w-4" />
        {change}
      </span>
    );
  }
  return (
    <span className="flex items-center text-red-500 text-xs">
      <ChevronDown className="h-4 w-4" />
      {Math.abs(change)}
    </span>
  );
};

export const LeaderboardTable = ({
  entries,
  isLoading,
  onViewProject,
}: LeaderboardTableProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-16 bg-gray-800 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
        <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-400">No entries yet</h3>
        <p className="text-gray-500 text-sm">
          Projects will appear here once they've been judged
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-800 hover:bg-gray-800">
            <TableHead className="w-16 text-center">Rank</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="text-center">Judges</TableHead>
            <TableHead className="w-28"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow
              key={entry.project.id}
              className={cn(
                "hover:bg-gray-800/50 transition-colors",
                getRankBackground(entry.rank)
              )}
            >
              <TableCell className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto">
                  {getRankIcon(entry.rank)}
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-md">
                    {entry.project.thumbnail_url ? (
                      <AvatarImage
                        src={entry.project.thumbnail_url}
                        className="object-cover"
                      />
                    ) : null}
                    <AvatarFallback className="bg-gray-700 rounded-md">
                      {entry.project.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">
                      {entry.project.name}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {entry.project.tagline || "No tagline"}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-gray-700 text-xs">
                      {entry.team.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-300 truncate max-w-[120px]">
                    {entry.team.name}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <span className="font-bold text-lg text-white">
                    {entry.averageScore.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Total: {entry.totalScore}
                </p>
              </TableCell>

              <TableCell className="text-center">
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  {entry.judgeCount} judge{entry.judgeCount !== 1 ? "s" : ""}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 justify-end">
                  {entry.project.github_url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-white"
                      onClick={() => window.open(entry.project.github_url!, "_blank")}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gold hover:text-gold/80"
                    onClick={() => onViewProject?.(entry.project.id)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
