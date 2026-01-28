import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  Settings,
  Crown,
  ExternalLink
} from "lucide-react";
import { Team, TeamMember } from "@/types/database";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
  members?: TeamMember[];
  isOwner?: boolean;
  onJoinRequest?: (teamId: string) => void;
  onViewDetails?: (teamId: string) => void;
  onManage?: (teamId: string) => void;
  className?: string;
}

export const TeamCard = ({
  team,
  members = [],
  isOwner,
  onJoinRequest,
  onViewDetails,
  onManage,
  className,
}: TeamCardProps) => {
  const memberCount = members.length;
  const maxMembers = team.max_members || 4;
  const isFull = memberCount >= maxMembers;

  return (
    <Card className={cn(
      "bg-gray-800 border-gray-700 hover:border-gray-600 transition-all",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-white">{team.name}</h3>
              {isOwner && (
                <Badge variant="outline" className="border-gold text-gold text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  Owner
                </Badge>
              )}
            </div>
            <p className="text-gray-400 text-sm line-clamp-2">
              {team.description || "No description provided"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                isFull
                  ? "border-red-500 text-red-400"
                  : team.looking_for_members
                  ? "border-emerald-500 text-emerald-400"
                  : "border-gray-600 text-gray-400"
              )}
            >
              <Users className="h-3 w-3 mr-1" />
              {memberCount}/{maxMembers}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Team Members Avatars */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-2">Team Members</p>
          <div className="flex -space-x-2">
            {members.slice(0, 5).map((member, index) => (
              <Avatar
                key={member.id}
                className="border-2 border-gray-800 h-8 w-8"
              >
                <AvatarImage src={member.profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-gray-700 text-xs">
                  {member.profile?.display_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            ))}
            {members.length > 5 && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 border-2 border-gray-800 text-xs text-gray-300">
                +{members.length - 5}
              </div>
            )}
            {members.length === 0 && (
              <div className="text-gray-500 text-sm">No members yet</div>
            )}
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          {team.looking_for_members && !isFull && (
            <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600">
              <UserPlus className="h-3 w-3 mr-1" />
              Looking for members
            </Badge>
          )}
          {isFull && (
            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
              Team Full
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-700 gap-2">
        {onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => onViewDetails(team.id)}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View
          </Button>
        )}
        
        {!isOwner && !isFull && team.looking_for_members && onJoinRequest && (
          <Button
            size="sm"
            className="flex-1 bg-gold hover:bg-gold/90 text-gray-900"
            onClick={() => onJoinRequest(team.id)}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Join Team
          </Button>
        )}

        {isOwner && onManage && (
          <Button
            size="sm"
            className="flex-1 bg-gold hover:bg-gold/90 text-gray-900"
            onClick={() => onManage(team.id)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Manage
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
