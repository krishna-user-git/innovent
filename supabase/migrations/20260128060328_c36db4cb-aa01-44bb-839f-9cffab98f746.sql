-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'hackathon',
  format TEXT NOT NULL DEFAULT 'hybrid',
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  team_formation_deadline TIMESTAMP WITH TIME ZONE,
  project_submission_deadline TIMESTAMP WITH TIME ZONE,
  banner_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  max_team_size INTEGER DEFAULT 4,
  min_team_size INTEGER DEFAULT 1,
  max_participants INTEGER,
  prize_pool TEXT,
  location TEXT,
  venue_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event_registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'registered',
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  skills TEXT[],
  bio TEXT,
  looking_for_team BOOLEAN DEFAULT true,
  UNIQUE(event_id, user_id)
);

-- Create user_profiles table
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  skills TEXT[],
  experience_level TEXT DEFAULT 'intermediate',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  looking_for_members BOOLEAN DEFAULT true,
  max_members INTEGER DEFAULT 4,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Create team_invitations table
CREATE TABLE public.team_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  inviter_id UUID NOT NULL,
  invitee_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(team_id, invitee_id)
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  github_url TEXT,
  demo_url TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  technologies TEXT[],
  status TEXT NOT NULL DEFAULT 'draft',
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_images table
CREATE TABLE public.project_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create judges table
CREATE TABLE public.judges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create judging_criteria table
CREATE TABLE public.judging_criteria (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  max_score INTEGER NOT NULL DEFAULT 10,
  weight DECIMAL(3,2) DEFAULT 1.0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_scores table
CREATE TABLE public.project_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  judge_id UUID NOT NULL REFERENCES public.judges(id) ON DELETE CASCADE,
  criteria_id UUID NOT NULL REFERENCES public.judging_criteria(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, judge_id, criteria_id)
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sponsors table
CREATE TABLE public.sponsors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  tier TEXT NOT NULL DEFAULT 'bronze',
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prizes table
CREATE TABLE public.prizes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  value TEXT,
  position INTEGER,
  sponsor_id UUID REFERENCES public.sponsors(id) ON DELETE SET NULL,
  winner_project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resources table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  type TEXT NOT NULL DEFAULT 'link',
  category TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activity_logs table
CREATE TABLE public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create faqs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  is_global BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create schedule_items table
CREATE TABLE public.schedule_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  type TEXT DEFAULT 'session',
  speaker TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentors table
CREATE TABLE public.mentors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  bio TEXT,
  avatar_url TEXT,
  expertise TEXT[],
  availability TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentor_sessions table
CREATE TABLE public.mentor_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID NOT NULL REFERENCES public.mentors(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  user_id UUID NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  topic TEXT,
  notes TEXT,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judging_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Published events are viewable by everyone" ON public.events FOR SELECT USING (status = 'published');
CREATE POLICY "Users can view their own events" ON public.events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create events" ON public.events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own events" ON public.events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own events" ON public.events FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for event_registrations
CREATE POLICY "Users can view registrations for events they manage" ON public.event_registrations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = event_registrations.event_id AND events.user_id = auth.uid())
  OR auth.uid() = user_id
);
CREATE POLICY "Users can register for events" ON public.event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their registrations" ON public.event_registrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can cancel their registrations" ON public.event_registrations FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can create their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for teams
CREATE POLICY "Teams are viewable by event participants" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Users can create teams" ON public.teams FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Team creators can update teams" ON public.teams FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Team creators can delete teams" ON public.teams FOR DELETE USING (auth.uid() = created_by);

-- RLS Policies for team_members
CREATE POLICY "Team members are viewable by everyone" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Team creators can add members" ON public.team_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.teams WHERE teams.id = team_members.team_id AND teams.created_by = auth.uid())
  OR auth.uid() = user_id
);
CREATE POLICY "Users can leave teams" ON public.team_members FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for team_invitations
CREATE POLICY "Users can view their invitations" ON public.team_invitations FOR SELECT USING (
  auth.uid() = inviter_id OR auth.uid() = invitee_id
);
CREATE POLICY "Team members can send invitations" ON public.team_invitations FOR INSERT WITH CHECK (auth.uid() = inviter_id);
CREATE POLICY "Invitees can respond to invitations" ON public.team_invitations FOR UPDATE USING (auth.uid() = invitee_id);

-- RLS Policies for projects
CREATE POLICY "Submitted projects are viewable by everyone" ON public.projects FOR SELECT USING (status = 'submitted' OR auth.uid() = user_id);
CREATE POLICY "Users can create projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for project_images
CREATE POLICY "Project images are viewable with projects" ON public.project_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_images.project_id AND (projects.status = 'submitted' OR projects.user_id = auth.uid()))
);
CREATE POLICY "Project owners can add images" ON public.project_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_images.project_id AND projects.user_id = auth.uid())
);

-- RLS Policies for judges
CREATE POLICY "Judges are viewable by everyone" ON public.judges FOR SELECT USING (true);
CREATE POLICY "Event owners can add judges" ON public.judges FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = judges.event_id AND events.user_id = auth.uid())
);

-- RLS Policies for judging_criteria
CREATE POLICY "Criteria are viewable by everyone" ON public.judging_criteria FOR SELECT USING (true);
CREATE POLICY "Event owners can add criteria" ON public.judging_criteria FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = judging_criteria.event_id AND events.user_id = auth.uid())
);

-- RLS Policies for project_scores
CREATE POLICY "Scores are viewable by project owners and event owners" ON public.project_scores FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_scores.project_id AND projects.user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.judges WHERE judges.id = project_scores.judge_id AND judges.user_id = auth.uid())
);
CREATE POLICY "Judges can add scores" ON public.project_scores FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.judges WHERE judges.id = project_scores.judge_id AND judges.user_id = auth.uid())
);

-- RLS Policies for notifications
CREATE POLICY "Users can view their notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for announcements
CREATE POLICY "Announcements are viewable by everyone" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Event owners can create announcements" ON public.announcements FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = announcements.event_id AND events.user_id = auth.uid())
);

-- RLS Policies for sponsors
CREATE POLICY "Sponsors are viewable by everyone" ON public.sponsors FOR SELECT USING (true);
CREATE POLICY "Event owners can add sponsors" ON public.sponsors FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = sponsors.event_id AND events.user_id = auth.uid())
);

-- RLS Policies for prizes
CREATE POLICY "Prizes are viewable by everyone" ON public.prizes FOR SELECT USING (true);
CREATE POLICY "Event owners can add prizes" ON public.prizes FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = prizes.event_id AND events.user_id = auth.uid())
);

-- RLS Policies for resources
CREATE POLICY "Resources are viewable by everyone" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Users can create resources" ON public.resources FOR INSERT WITH CHECK (auth.uid() = created_by);

-- RLS Policies for activity_logs
CREATE POLICY "Users can view their activity" ON public.activity_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can create activity logs" ON public.activity_logs FOR INSERT WITH CHECK (true);

-- RLS Policies for faqs
CREATE POLICY "FAQs are viewable by everyone" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Anyone authenticated can create FAQs" ON public.faqs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for schedule_items
CREATE POLICY "Schedule items are viewable by everyone" ON public.schedule_items FOR SELECT USING (true);
CREATE POLICY "Event owners can add schedule items" ON public.schedule_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = schedule_items.event_id AND events.user_id = auth.uid())
);

-- RLS Policies for mentors
CREATE POLICY "Mentors are viewable by everyone" ON public.mentors FOR SELECT USING (true);
CREATE POLICY "Event owners can add mentors" ON public.mentors FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = mentors.event_id AND events.user_id = auth.uid())
);

-- RLS Policies for mentor_sessions
CREATE POLICY "Users can view their sessions" ON public.mentor_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can book sessions" ON public.mentor_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_project_scores_updated_at BEFORE UPDATE ON public.project_scores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();