import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface CreateTeamDialogProps {
  eventId: string;
  onTeamCreated?: () => void;
  trigger?: React.ReactNode;
}

export const CreateTeamDialog = ({
  eventId,
  onTeamCreated,
  trigger,
}: CreateTeamDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxMembers: "4",
    lookingForMembers: true,
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a team",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Team name is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create the team
      const { data: team, error: teamError } = await supabase
        .from("teams")
        .insert({
          event_id: eventId,
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          max_members: parseInt(formData.maxMembers),
          looking_for_members: formData.lookingForMembers,
          created_by: user.id,
        })
        .select()
        .single();

      if (teamError) throw teamError;

      // Add the creator as a team member with 'leader' role
      const { error: memberError } = await supabase
        .from("team_members")
        .insert({
          team_id: team.id,
          user_id: user.id,
          role: "leader",
        });

      if (memberError) throw memberError;

      toast({
        title: "Team created!",
        description: `${formData.name} has been created successfully.`,
      });

      setOpen(false);
      setFormData({
        name: "",
        description: "",
        maxMembers: "4",
        lookingForMembers: true,
      });
      
      onTeamCreated?.();
    } catch (error: any) {
      console.error("Error creating team:", error);
      toast({
        title: "Failed to create team",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gold hover:bg-gold/90 text-gray-900">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gold" />
            Create New Team
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a team to collaborate with other participants in this event.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name *</Label>
            <Input
              id="name"
              placeholder="Enter team name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-900 border-gray-700"
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your team and what you're looking for..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-gray-900 border-gray-700 min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right">
              {formData.description.length}/500
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxMembers">Maximum Team Size</Label>
            <Select
              value={formData.maxMembers}
              onValueChange={(value) =>
                setFormData({ ...formData, maxMembers: value })
              }
            >
              <SelectTrigger className="bg-gray-900 border-gray-700">
                <SelectValue placeholder="Select max team size" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="2">2 members</SelectItem>
                <SelectItem value="3">3 members</SelectItem>
                <SelectItem value="4">4 members</SelectItem>
                <SelectItem value="5">5 members</SelectItem>
                <SelectItem value="6">6 members</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="lookingForMembers">Looking for Members</Label>
              <p className="text-xs text-gray-500">
                Allow others to request to join your team
              </p>
            </div>
            <Switch
              id="lookingForMembers"
              checked={formData.lookingForMembers}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, lookingForMembers: checked })
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gold hover:bg-gold/90 text-gray-900"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Create Team
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
