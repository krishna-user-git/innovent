import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Shield, Palette, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types/database";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      if (data) {
        setProfile(data as UserProfile);
      } else {
        // Create profile if doesn't exist
        const { data: newProfile } = await supabase
          .from("user_profiles")
          .insert({ user_id: user.id })
          .select()
          .single();
        setProfile(newProfile as UserProfile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-48 bg-gray-800 rounded-lg" />
            <div className="h-32 bg-gray-800 rounded-lg" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-gold" />
          Settings
        </h1>

        {profile && (
          <>
            <ProfileHeader
              profile={profile}
              email={user?.email}
              isOwnProfile={true}
              onEdit={() => setEditOpen(true)}
            />

            <div className="mt-6">
              <ProfileStats
                stats={{
                  eventsParticipated: 0,
                  eventsOrganized: 0,
                  teamsJoined: 0,
                  projectsSubmitted: 0,
                  prizesWon: 0,
                  totalPoints: 0,
                }}
              />
            </div>

            <Card className="bg-gray-800 border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gold" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Team Invitations</Label>
                    <p className="text-sm text-gray-500">Get notified when invited to teams</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Event Updates</Label>
                    <p className="text-sm text-gray-500">Updates about events you're registered for</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gold" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full md:w-auto"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            <EditProfileDialog
              open={editOpen}
              onOpenChange={setEditOpen}
              profile={profile}
              onProfileUpdated={fetchProfile}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Settings;
