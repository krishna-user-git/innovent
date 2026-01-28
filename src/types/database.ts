// Custom database types for the application

export interface Event {
  id: string;
  user_id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  type: string;
  format: string;
  start_date: string;
  end_date: string;
  registration_deadline: string | null;
  team_formation_deadline: string | null;
  project_submission_deadline: string | null;
  banner_url: string | null;
  status: string;
  max_team_size: number | null;
  min_team_size: number | null;
  max_participants: number | null;
  prize_pool: string | null;
  location: string | null;
  venue_address: string | null;
  created_at: string;
  updated_at: string;
  is_registered?: boolean;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  status: string;
  registered_at: string;
  skills: string[] | null;
  bio: string | null;
  looking_for_team: boolean | null;
}

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  skills: string[] | null;
  experience_level: string | null;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  event_id: string;
  name: string;
  description: string | null;
  looking_for_members: boolean | null;
  max_members: number | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  members?: TeamMember[];
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profile?: UserProfile;
}

export interface TeamInvitation {
  id: string;
  team_id: string;
  inviter_id: string;
  invitee_id: string;
  status: string;
  message: string | null;
  created_at: string;
  responded_at: string | null;
  team?: Team;
}

export interface Project {
  id: string;
  event_id: string;
  team_id: string | null;
  user_id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  github_url: string | null;
  demo_url: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  technologies: string[] | null;
  status: string;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
  scores?: ProjectScore[];
  team?: Team;
  event?: Event;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  display_order: number | null;
  created_at: string;
}

export interface Judge {
  id: string;
  event_id: string;
  user_id: string;
  name: string;
  title: string | null;
  company: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface JudgingCriteria {
  id: string;
  event_id: string;
  name: string;
  description: string | null;
  max_score: number;
  weight: number | null;
  display_order: number | null;
  created_at: string;
}

export interface ProjectScore {
  id: string;
  project_id: string;
  judge_id: string;
  criteria_id: string;
  score: number;
  feedback: string | null;
  created_at: string;
  updated_at: string;
  criteria?: JudgingCriteria;
  judge?: Judge;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string | null;
  read: boolean | null;
  action_url: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

export interface Announcement {
  id: string;
  event_id: string;
  title: string;
  content: string;
  priority: string | null;
  created_by: string;
  created_at: string;
}

export interface Sponsor {
  id: string;
  event_id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: string;
  description: string | null;
  display_order: number | null;
  created_at: string;
}

export interface Prize {
  id: string;
  event_id: string;
  name: string;
  description: string | null;
  value: string | null;
  position: number | null;
  sponsor_id: string | null;
  winner_project_id: string | null;
  created_at: string;
  sponsor?: Sponsor;
  winner_project?: Project;
}

export interface Resource {
  id: string;
  event_id: string | null;
  title: string;
  description: string | null;
  url: string | null;
  type: string;
  category: string | null;
  created_by: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  event_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

export interface FAQ {
  id: string;
  event_id: string | null;
  question: string;
  answer: string;
  category: string | null;
  display_order: number | null;
  is_global: boolean | null;
  created_at: string;
}

export interface ScheduleItem {
  id: string;
  event_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  location: string | null;
  type: string | null;
  speaker: string | null;
  created_at: string;
}

export interface Mentor {
  id: string;
  event_id: string;
  user_id: string;
  name: string;
  title: string | null;
  company: string | null;
  bio: string | null;
  avatar_url: string | null;
  expertise: string[] | null;
  availability: string | null;
  created_at: string;
}

export interface MentorSession {
  id: string;
  mentor_id: string;
  team_id: string | null;
  user_id: string;
  scheduled_at: string;
  duration_minutes: number | null;
  topic: string | null;
  notes: string | null;
  status: string | null;
  created_at: string;
  mentor?: Mentor;
}

// Dashboard Stats
export interface DashboardStats {
  totalEvents: number;
  totalParticipants: number;
  activeTeams: number;
  projectSubmissions: number;
  upcomingEvents: number;
  completedEvents: number;
}

// Leaderboard Entry
export interface LeaderboardEntry {
  rank: number;
  project: Project;
  team: Team;
  totalScore: number;
  averageScore: number;
  judgeCount: number;
}
