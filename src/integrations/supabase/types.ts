export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string | null
          event_id: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_id?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_id?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          content: string
          created_at: string
          created_by: string
          event_id: string
          id: string
          priority: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          event_id: string
          id?: string
          priority?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          event_id?: string
          id?: string
          priority?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          bio: string | null
          event_id: string
          id: string
          looking_for_team: boolean | null
          registered_at: string
          skills: string[] | null
          status: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          event_id: string
          id?: string
          looking_for_team?: boolean | null
          registered_at?: string
          skills?: string[] | null
          status?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          event_id?: string
          id?: string
          looking_for_team?: boolean | null
          registered_at?: string
          skills?: string[] | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          banner_url: string | null
          created_at: string
          description: string | null
          end_date: string
          format: string
          id: string
          location: string | null
          max_participants: number | null
          max_team_size: number | null
          min_team_size: number | null
          name: string
          prize_pool: string | null
          project_submission_deadline: string | null
          registration_deadline: string | null
          start_date: string
          status: string
          tagline: string | null
          team_formation_deadline: string | null
          type: string
          updated_at: string
          user_id: string
          venue_address: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          description?: string | null
          end_date: string
          format?: string
          id?: string
          location?: string | null
          max_participants?: number | null
          max_team_size?: number | null
          min_team_size?: number | null
          name: string
          prize_pool?: string | null
          project_submission_deadline?: string | null
          registration_deadline?: string | null
          start_date: string
          status?: string
          tagline?: string | null
          team_formation_deadline?: string | null
          type?: string
          updated_at?: string
          user_id: string
          venue_address?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          description?: string | null
          end_date?: string
          format?: string
          id?: string
          location?: string | null
          max_participants?: number | null
          max_team_size?: number | null
          min_team_size?: number | null
          name?: string
          prize_pool?: string | null
          project_submission_deadline?: string | null
          registration_deadline?: string | null
          start_date?: string
          status?: string
          tagline?: string | null
          team_formation_deadline?: string | null
          type?: string
          updated_at?: string
          user_id?: string
          venue_address?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          display_order: number | null
          event_id: string | null
          id: string
          is_global: boolean | null
          question: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          event_id?: string | null
          id?: string
          is_global?: boolean | null
          question: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          event_id?: string | null
          id?: string
          is_global?: boolean | null
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "faqs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      judges: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          event_id: string
          id: string
          name: string
          title: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          event_id: string
          id?: string
          name: string
          title?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          event_id?: string
          id?: string
          name?: string
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "judges_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      judging_criteria: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          event_id: string
          id: string
          max_score: number
          name: string
          weight: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          event_id: string
          id?: string
          max_score?: number
          name: string
          weight?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          event_id?: string
          id?: string
          max_score?: number
          name?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "judging_criteria_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_sessions: {
        Row: {
          created_at: string
          duration_minutes: number | null
          id: string
          mentor_id: string
          notes: string | null
          scheduled_at: string
          status: string | null
          team_id: string | null
          topic: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_minutes?: number | null
          id?: string
          mentor_id: string
          notes?: string | null
          scheduled_at: string
          status?: string | null
          team_id?: string | null
          topic?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number | null
          id?: string
          mentor_id?: string
          notes?: string | null
          scheduled_at?: string
          status?: string | null
          team_id?: string | null
          topic?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentor_sessions_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_sessions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      mentors: {
        Row: {
          availability: string | null
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          event_id: string
          expertise: string[] | null
          id: string
          name: string
          title: string | null
          user_id: string
        }
        Insert: {
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          event_id: string
          expertise?: string[] | null
          id?: string
          name: string
          title?: string | null
          user_id: string
        }
        Update: {
          availability?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          event_id?: string
          expertise?: string[] | null
          id?: string
          name?: string
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          message: string | null
          metadata: Json | null
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string | null
          metadata?: Json | null
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string | null
          metadata?: Json | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      prizes: {
        Row: {
          created_at: string
          description: string | null
          event_id: string
          id: string
          name: string
          position: number | null
          sponsor_id: string | null
          value: string | null
          winner_project_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_id: string
          id?: string
          name: string
          position?: number | null
          sponsor_id?: string | null
          value?: string | null
          winner_project_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          event_id?: string
          id?: string
          name?: string
          position?: number | null
          sponsor_id?: string | null
          value?: string | null
          winner_project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prizes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prizes_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prizes_winner_project_id_fkey"
            columns: ["winner_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_images: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          project_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          project_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_scores: {
        Row: {
          created_at: string
          criteria_id: string
          feedback: string | null
          id: string
          judge_id: string
          project_id: string
          score: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          criteria_id: string
          feedback?: string | null
          id?: string
          judge_id: string
          project_id: string
          score: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          criteria_id?: string
          feedback?: string | null
          id?: string
          judge_id?: string
          project_id?: string
          score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_scores_criteria_id_fkey"
            columns: ["criteria_id"]
            isOneToOne: false
            referencedRelation: "judging_criteria"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_scores_judge_id_fkey"
            columns: ["judge_id"]
            isOneToOne: false
            referencedRelation: "judges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_scores_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          demo_url: string | null
          description: string | null
          event_id: string
          github_url: string | null
          id: string
          name: string
          status: string
          submitted_at: string | null
          tagline: string | null
          team_id: string | null
          technologies: string[] | null
          thumbnail_url: string | null
          updated_at: string
          user_id: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          demo_url?: string | null
          description?: string | null
          event_id: string
          github_url?: string | null
          id?: string
          name: string
          status?: string
          submitted_at?: string | null
          tagline?: string | null
          team_id?: string | null
          technologies?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          demo_url?: string | null
          description?: string | null
          event_id?: string
          github_url?: string | null
          id?: string
          name?: string
          status?: string
          submitted_at?: string | null
          tagline?: string | null
          team_id?: string | null
          technologies?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          category: string | null
          created_at: string
          created_by: string
          description: string | null
          event_id: string | null
          id: string
          title: string
          type: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          event_id?: string | null
          id?: string
          title: string
          type?: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          event_id?: string | null
          id?: string
          title?: string
          type?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_items: {
        Row: {
          created_at: string
          description: string | null
          end_time: string
          event_id: string
          id: string
          location: string | null
          speaker: string | null
          start_time: string
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time: string
          event_id: string
          id?: string
          location?: string | null
          speaker?: string | null
          start_time: string
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string
          event_id?: string
          id?: string
          location?: string | null
          speaker?: string | null
          start_time?: string
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedule_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          event_id: string
          id: string
          logo_url: string | null
          name: string
          tier: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          event_id: string
          id?: string
          logo_url?: string | null
          name: string
          tier?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          event_id?: string
          id?: string
          logo_url?: string | null
          name?: string
          tier?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invitations: {
        Row: {
          created_at: string
          id: string
          invitee_id: string
          inviter_id: string
          message: string | null
          responded_at: string | null
          status: string
          team_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invitee_id: string
          inviter_id: string
          message?: string | null
          responded_at?: string | null
          status?: string
          team_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invitee_id?: string
          inviter_id?: string
          message?: string | null
          responded_at?: string | null
          status?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_invitations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          joined_at: string
          role: string
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          event_id: string
          id: string
          looking_for_members: boolean | null
          max_members: number | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          event_id: string
          id?: string
          looking_for_members?: boolean | null
          max_members?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          event_id?: string
          id?: string
          looking_for_members?: boolean | null
          max_members?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          experience_level: string | null
          github_url: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          skills: string[] | null
          twitter_url: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          experience_level?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          skills?: string[] | null
          twitter_url?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          experience_level?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          skills?: string[] | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
