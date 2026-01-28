import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { TeamCard } from "@/components/teams/TeamCard";
import { TeamInvitationCard } from "@/components/teams/TeamInvitationCard";
import { CreateTeamDialog } from "@/components/teams/CreateTeamDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Mail, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Team, TeamInvitation, TeamMember } from "@/types/database";

const Teams = () => {
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTeams = async () => {
    if (!user) return;
    try {
      const { data: memberData } = await supabase
        .from("team_members")
        .select("team_id")
        .eq("user_id", user.id);

      if (memberData && memberData.length > 0) {
        const teamIds = memberData.map((m) => m.team_id);
        const { data: teamsData } = await supabase
          .from("teams")
          .select("*")
          .in("id", teamIds);
        setMyTeams((teamsData as Team[]) || []);
      }

      const { data: inviteData } = await supabase
        .from("team_invitations")
        .select("*")
        .eq("invitee_id", user.id)
        .eq("status", "pending");
      setInvitations((inviteData as TeamInvitation[]) || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [user]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">My Teams</h1>
            <p className="text-gray-400">Manage your teams and invitations</p>
          </div>
        </div>

        <Tabs defaultValue="teams" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="teams" className="data-[state=active]:bg-gold data-[state=active]:text-gray-900">
              <Users className="h-4 w-4 mr-2" />
              My Teams ({myTeams.length})
            </TabsTrigger>
            <TabsTrigger value="invitations" className="data-[state=active]:bg-gold data-[state=active]:text-gray-900">
              <Mail className="h-4 w-4 mr-2" />
              Invitations ({invitations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-700 pl-10"
              />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-gray-800 border-gray-700 h-48 animate-pulse" />
                ))}
              </div>
            ) : myTeams.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">You haven't joined any teams yet</p>
                  <p className="text-gray-500 text-sm">Join an event to create or join a team</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myTeams
                  .filter((team) => team.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((team) => (
                    <TeamCard
                      key={team.id}
                      team={team}
                      isOwner={team.created_by === user?.id}
                    />
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="invitations">
            {invitations.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="py-12 text-center">
                  <Mail className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No pending invitations</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <TeamInvitationCard
                    key={invitation.id}
                    invitation={invitation}
                    onRespond={fetchTeams}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Teams;
