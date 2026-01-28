import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, X, Users, Clock, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { TeamInvitation } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TeamInvitationCardProps {
  invitation: TeamInvitation;
  onRespond?: () => void;
  className?: string;
}

export const TeamInvitationCard = ({
  invitation,
  onRespond,
  className,
}: TeamInvitationCardProps) => {
  const [loading, setLoading] = useState<"accept" | "decline" | null>(null);
  const { toast } = useToast();

  const handleRespond = async (accept: boolean) => {
    setLoading(accept ? "accept" : "decline");

    try {
      // Update invitation status
      const { error: inviteError } = await supabase
        .from("team_invitations")
        .update({
          status: accept ? "accepted" : "declined",
          responded_at: new Date().toISOString(),
        })
        .eq("id", invitation.id);

      if (inviteError) throw inviteError;

      // If accepted, add user to team
      if (accept) {
        const { error: memberError } = await supabase
          .from("team_members")
          .insert({
            team_id: invitation.team_id,
            user_id: invitation.invitee_id,
            role: "member",
          });

        if (memberError) throw memberError;
      }

      toast({
        title: accept ? "Invitation accepted!" : "Invitation declined",
        description: accept
          ? `You've joined ${invitation.team?.name || "the team"}`
          : "The invitation has been declined",
      });

      onRespond?.();
    } catch (error: any) {
      console.error("Error responding to invitation:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to respond to invitation",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const isPending = invitation.status === "pending";

  return (
    <Card className={cn(
      "bg-gray-800 border-gray-700",
      isPending && "border-l-4 border-l-gold",
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-gray-700">
            <Users className="h-5 w-5 text-gold" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-white truncate">
                {invitation.team?.name || "Team Invitation"}
              </h4>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs capitalize",
                  invitation.status === "pending" && "border-gold text-gold",
                  invitation.status === "accepted" && "border-emerald-500 text-emerald-400",
                  invitation.status === "declined" && "border-red-500 text-red-400"
                )}
              >
                {invitation.status}
              </Badge>
            </div>

            {invitation.message && (
              <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                "{invitation.message}"
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>
                {formatDistanceToNow(new Date(invitation.created_at), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>

          {isPending && (
            <div className="flex gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500/10"
                onClick={() => handleRespond(false)}
                disabled={!!loading}
              >
                {loading === "decline" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => handleRespond(true)}
                disabled={!!loading}
              >
                {loading === "accept" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
