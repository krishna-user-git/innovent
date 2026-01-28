import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ExternalLink, 
  Github, 
  Play, 
  Eye,
  Trophy,
  Clock,
  Code2,
  Star
} from "lucide-react";
import { Project } from "@/types/database";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  showScore?: boolean;
  score?: number;
  rank?: number;
  onView?: (projectId: string) => void;
  className?: string;
}

const getTechnologyColor = (tech: string) => {
  const colors: Record<string, string> = {
    react: "bg-cyan-600",
    typescript: "bg-blue-600",
    javascript: "bg-yellow-600",
    python: "bg-green-600",
    nodejs: "bg-emerald-600",
    "next.js": "bg-gray-600",
    tailwind: "bg-teal-600",
    supabase: "bg-emerald-700",
    firebase: "bg-orange-600",
    mongodb: "bg-green-700",
    postgresql: "bg-blue-700",
    graphql: "bg-pink-600",
    aws: "bg-orange-700",
    docker: "bg-blue-500",
  };
  
  const key = tech.toLowerCase().replace(/\s+/g, "");
  return colors[key] || "bg-gray-600";
};

export const ProjectCard = ({
  project,
  showScore,
  score,
  rank,
  onView,
  className,
}: ProjectCardProps) => {
  return (
    <Card className={cn(
      "bg-gray-800 border-gray-700 hover:border-gray-600 transition-all overflow-hidden group",
      className
    )}>
      {/* Thumbnail / Banner */}
      <div className="relative h-40 overflow-hidden">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
            <Code2 className="h-12 w-12 text-gray-500" />
          </div>
        )}
        
        {/* Rank badge */}
        {rank && (
          <div className="absolute top-2 left-2">
            <Badge className={cn(
              "text-white font-bold",
              rank === 1 && "bg-gold",
              rank === 2 && "bg-gray-400",
              rank === 3 && "bg-orange-700",
              rank > 3 && "bg-gray-600"
            )}>
              <Trophy className="h-3 w-3 mr-1" />
              #{rank}
            </Badge>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-2 right-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs capitalize backdrop-blur-sm",
              project.status === "submitted" && "border-emerald-500 text-emerald-400 bg-emerald-500/10",
              project.status === "draft" && "border-gray-500 text-gray-400 bg-gray-500/10",
              project.status === "winner" && "border-gold text-gold bg-gold/10"
            )}
          >
            {project.status}
          </Badge>
        </div>

        {/* Overlay with links */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
          {project.github_url && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-gray-800/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.github_url!, "_blank");
              }}
            >
              <Github className="h-4 w-4" />
            </Button>
          )}
          {project.demo_url && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-gray-800/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demo_url!, "_blank");
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
          {project.video_url && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-gray-800/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.video_url!, "_blank");
              }}
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-white truncate">
              {project.name}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-1">
              {project.tagline || "No tagline"}
            </p>
          </div>
          {showScore && score !== undefined && (
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-4 w-4 text-gold fill-gold" />
              <span className="font-bold text-gold">{score.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 mb-3">
          {project.description || "No description available"}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <Badge
                key={index}
                className={cn("text-xs text-white", getTechnologyColor(tech))}
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Team info */}
        {project.team && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-gray-700 text-xs">
                {project.team.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-400 truncate">
              {project.team.name}
            </span>
          </div>
        )}

        {/* Submission date */}
        {project.submitted_at && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
            <Clock className="h-3 w-3" />
            <span>
              Submitted {format(new Date(project.submitted_at), "MMM d, yyyy")}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-700">
        <Button
          className="w-full bg-gold hover:bg-gold/90 text-gray-900"
          onClick={() => onView?.(project.id)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
};
