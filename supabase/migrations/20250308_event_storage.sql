
-- Create a storage bucket for event banners
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-banners', 'Event Banners', true);

-- Set up storage policies to allow authenticated users to upload banners
CREATE POLICY "Allow authenticated users to upload event banners"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'event-banners');

-- Allow users to update their own banner files
CREATE POLICY "Allow users to update their own banner files" 
ON storage.objects FOR UPDATE TO authenticated 
USING (bucket_id = 'event-banners' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow users to delete their own banner files
CREATE POLICY "Allow users to delete their own banner files" 
ON storage.objects FOR DELETE TO authenticated 
USING (bucket_id = 'event-banners' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public read access to event banners
CREATE POLICY "Allow public read access to event banners"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'event-banners');
