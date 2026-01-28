import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MessageSquare, 
  Briefcase,
  Clock
} from "lucide-react";
import { Mentor } from "@/types/database";
import { cn } from "@/lib/utils";

interface MentorCardProps {
  mentor: Mentor;
  onBookSession?: (mentorId: string) => void;
  onMessage?: (mentorId: string) => void;
  className?: string;
}

export const MentorCard = ({
  mentor,
  onBookSession,
  onMessage,
  className,
}: MentorCardProps) => {
  return (
    <Card className={cn(
      "bg-gray-800 border-gray-700 hover:border-gray-600 transition-all",
      className
    )}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-gray-700">
            <AvatarImage src={mentor.avatar_url || undefined} />
            <AvatarFallback className="bg-gray-700 text-xl">
              {mentor.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-white truncate">
              {mentor.name}
            </h3>
            {mentor.title && (
              <p className="text-sm text-gray-400 truncate">{mentor.title}</p>
            )}
            {mentor.company && (
              <p className="text-sm text-gray-500 flex items-center gap-1 truncate">
                <Briefcase className="h-3 w-3" />
                {mentor.company}
              </p>
            )}
          </div>
        </div>

        {mentor.bio && (
          <p className="text-sm text-gray-400 mt-4 line-clamp-3">
            {mentor.bio}
          </p>
        )}

        {/* Expertise */}
        {mentor.expertise && mentor.expertise.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Expertise</p>
            <div className="flex flex-wrap gap-1.5">
              {mentor.expertise.slice(0, 4).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-700 text-gray-200 text-xs"
                >
                  {skill}
                </Badge>
              ))}
              {mentor.expertise.length > 4 && (
                <Badge
                  variant="outline"
                  className="border-gray-600 text-gray-400 text-xs"
                >
                  +{mentor.expertise.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        {mentor.availability && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{mentor.availability}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-gray-700 gap-2">
        {onMessage && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-gray-600"
            onClick={() => onMessage(mentor.id)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Message
          </Button>
        )}
        {onBookSession && (
          <Button
            size="sm"
            className="flex-1 bg-gold hover:bg-gold/90 text-gray-900"
            onClick={() => onBookSession(mentor.id)}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Book Session
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
