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
import { Badge } from "@/components/ui/badge";
import { Folder, Github, ExternalLink, Video, Loader2, X, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface SubmitProjectDialogProps {
  eventId: string;
  teamId?: string;
  onProjectSubmitted?: () => void;
  trigger?: React.ReactNode;
}

export const SubmitProjectDialog = ({
  eventId,
  teamId,
  onProjectSubmitted,
  trigger,
}: SubmitProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    githubUrl: "",
    demoUrl: "",
    videoUrl: "",
    technologies: [] as string[],
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTech();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a project",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("projects").insert({
        event_id: eventId,
        team_id: teamId || null,
        user_id: user.id,
        name: formData.name.trim(),
        tagline: formData.tagline.trim() || null,
        description: formData.description.trim() || null,
        github_url: formData.githubUrl.trim() || null,
        demo_url: formData.demoUrl.trim() || null,
        video_url: formData.videoUrl.trim() || null,
        technologies: formData.technologies.length > 0 ? formData.technologies : null,
        status: "submitted",
        submitted_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Project submitted!",
        description: "Your project has been submitted successfully.",
      });

      setOpen(false);
      setFormData({
        name: "",
        tagline: "",
        description: "",
        githubUrl: "",
        demoUrl: "",
        videoUrl: "",
        technologies: [],
      });

      onProjectSubmitted?.();
    } catch (error: any) {
      console.error("Error submitting project:", error);
      toast({
        title: "Failed to submit project",
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
            <Folder className="h-4 w-4 mr-2" />
            Submit Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5 text-gold" />
            Submit Your Project
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Share your amazing project with the community and judges.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              placeholder="Enter your project name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-900 border-gray-700"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              placeholder="A short, catchy description"
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
              className="bg-gray-900 border-gray-700"
              maxLength={150}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project, what problem it solves, and how it works..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-gray-900 border-gray-700 min-h-[120px]"
              maxLength={2000}
            />
            <p className="text-xs text-gray-500 text-right">
              {formData.description.length}/2000
            </p>
          </div>

          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a technology (e.g., React, Python)"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-gray-900 border-gray-700"
              />
              <Button
                type="button"
                variant="outline"
                className="border-gray-600 shrink-0"
                onClick={handleAddTech}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-700 text-gray-200 pr-1"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub URL
              </Label>
              <Input
                id="githubUrl"
                type="url"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                className="bg-gray-900 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demoUrl" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Demo URL
              </Label>
              <Input
                id="demoUrl"
                type="url"
                placeholder="https://..."
                value={formData.demoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, demoUrl: e.target.value })
                }
                className="bg-gray-900 border-gray-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video URL (Demo/Pitch)
            </Label>
            <Input
              id="videoUrl"
              type="url"
              placeholder="https://youtube.com/... or https://loom.com/..."
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              className="bg-gray-900 border-gray-700"
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
              Submit Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
