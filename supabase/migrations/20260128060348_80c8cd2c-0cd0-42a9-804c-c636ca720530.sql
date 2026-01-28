-- Fix the search_path for the function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Update the overly permissive RLS policies
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
CREATE POLICY "Authenticated users can create notifications" ON public.notifications 
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "System can create activity logs" ON public.activity_logs;
CREATE POLICY "Authenticated users can create activity logs" ON public.activity_logs 
FOR INSERT WITH CHECK (auth.uid() = user_id);