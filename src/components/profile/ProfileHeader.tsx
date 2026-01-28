import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Edit2, 
  MapPin, 
  Link as LinkIcon, 
  Github,
  Linkedin,
  Twitter,
  Mail,
  Calendar
} from "lucide-react";
import { UserProfile } from "@/types/database";
import { format } from "date-fns";

interface ProfileHeaderProps {
  profile: UserProfile;
  email?: string;
  isOwnProfile?: boolean;
  onEdit?: () => void;
  onAvatarChange?: () => void;
}

export const ProfileHeader = ({
  profile,
  email,
  isOwnProfile,
  onEdit,
  onAvatarChange,
}: ProfileHeaderProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-gold/30 via-gold/10 to-gray-800" />

      <CardContent className="relative pt-0 pb-6">
        {/* Avatar */}
        <div className="absolute -top-16 left-6">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-gray-800">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="bg-gray-700 text-3xl">
                {profile.display_name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            {isOwnProfile && onAvatarChange && (
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                onClick={onAvatarChange}
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Edit button */}
        {isOwnProfile && onEdit && (
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              className="border-gray-600"
              onClick={onEdit}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        )}

        {/* Profile info */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">
              {profile.display_name || "Anonymous User"}
            </h1>
            {profile.experience_level && (
              <Badge variant="outline" className="border-gold text-gold capitalize">
                {profile.experience_level}
              </Badge>
            )}
          </div>

          {profile.bio && (
            <p className="text-gray-400 mb-4 max-w-2xl">{profile.bio}</p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
            )}
            {email && (
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {email}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Joined {format(new Date(profile.created_at), "MMMM yyyy")}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {profile.website && (
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600"
                onClick={() => window.open(profile.website!, "_blank")}
              >
                <LinkIcon className="h-4 w-4 mr-1" />
                Website
              </Button>
            )}
            {profile.github_url && (
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600"
                onClick={() => window.open(profile.github_url!, "_blank")}
              >
                <Github className="h-4 w-4 mr-1" />
                GitHub
              </Button>
            )}
            {profile.linkedin_url && (
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600"
                onClick={() => window.open(profile.linkedin_url!, "_blank")}
              >
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn
              </Button>
            )}
            {profile.twitter_url && (
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600"
                onClick={() => window.open(profile.twitter_url!, "_blank")}
              >
                <Twitter className="h-4 w-4 mr-1" />
                Twitter
              </Button>
            )}
          </div>

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-700 text-gray-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
