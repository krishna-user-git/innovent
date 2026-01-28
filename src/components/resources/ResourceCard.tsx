import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  FileText, 
  Video, 
  Link as LinkIcon,
  Download,
  BookOpen,
  Code,
  Image as ImageIcon
} from "lucide-react";
import { Resource } from "@/types/database";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: Resource;
  onOpen?: (resource: Resource) => void;
  className?: string;
}

const getResourceIcon = (type: string) => {
  switch (type) {
    case "document":
      return <FileText className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    case "link":
      return <LinkIcon className="h-5 w-5" />;
    case "download":
      return <Download className="h-5 w-5" />;
    case "tutorial":
      return <BookOpen className="h-5 w-5" />;
    case "code":
      return <Code className="h-5 w-5" />;
    case "image":
      return <ImageIcon className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getResourceColor = (type: string) => {
  switch (type) {
    case "document":
      return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    case "video":
      return "bg-red-500/20 text-red-400 border-red-500/50";
    case "link":
      return "bg-green-500/20 text-green-400 border-green-500/50";
    case "download":
      return "bg-purple-500/20 text-purple-400 border-purple-500/50";
    case "tutorial":
      return "bg-orange-500/20 text-orange-400 border-orange-500/50";
    case "code":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/50";
    case "image":
      return "bg-pink-500/20 text-pink-400 border-pink-500/50";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/50";
  }
};

export const ResourceCard = ({
  resource,
  onOpen,
  className,
}: ResourceCardProps) => {
  const handleOpen = () => {
    if (onOpen) {
      onOpen(resource);
    } else if (resource.url) {
      window.open(resource.url, "_blank");
    }
  };

  return (
    <Card
      className={cn(
        "bg-gray-800 border-gray-700 hover:border-gray-600 transition-all cursor-pointer group",
        className
      )}
      onClick={handleOpen}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "p-3 rounded-lg border shrink-0",
              getResourceColor(resource.type)
            )}
          >
            {getResourceIcon(resource.type)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate group-hover:text-gold transition-colors">
                  {resource.title}
                </h4>
                {resource.description && (
                  <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                    {resource.description}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-gray-400 hover:text-gold"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Badge
                variant="outline"
                className="text-xs capitalize border-gray-600 text-gray-400"
              >
                {resource.type}
              </Badge>
              {resource.category && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-gray-700 text-gray-300"
                >
                  {resource.category}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
