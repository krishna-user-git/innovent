
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CalendarIcon, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  name: string;
  tagline: string;
  description: string;
  banner_url: string;
  type: string;
  format: string;
  start_date: string;
  end_date: string;
  registration_deadline: string | null;
  team_formation_deadline: string | null;
  project_submission_deadline: string | null;
  created_at: string;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          throw new Error("Event ID is missing");
        }
        
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        toast({
          title: "Failed to load event details",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventDetails();
  }, [id, toast]);

  function formatDate(dateString: string) {
    return format(new Date(dateString), "MMM d, yyyy");
  }

  return (
    <Layout>
      <div className="container py-12">
        <Link to="/events" className="inline-flex items-center text-gold hover:text-gold/80 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : !event ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Event not found</h3>
            <p className="text-gray-400 mb-6">The event you're looking for might have been removed or is no longer available.</p>
            <Link to="/events">
              <Button className="bg-gold hover:bg-gold/90 text-gray-900">Back to Events</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                <div className="h-[300px] md:h-[400px] w-full overflow-hidden relative">
                  {event.banner_url ? (
                    <img 
                      src={event.banner_url}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500">No banner image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded font-medium capitalize">
                      {event.type}
                    </span>
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded font-medium capitalize">
                      {event.format}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
                  <p className="text-xl text-gray-300 mb-6">{event.tagline}</p>
                  
                  <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 mr-3 text-gold mt-0.5" />
                    <div>
                      <h4 className="font-medium">Event Date</h4>
                      <p className="text-gray-400">
                        {formatDate(event.start_date)} - {formatDate(event.end_date)}
                      </p>
                    </div>
                  </div>
                  
                  {event.registration_deadline && (
                    <div className="flex items-start">
                      <Users className="h-5 w-5 mr-3 text-gold mt-0.5" />
                      <div>
                        <h4 className="font-medium">Registration Deadline</h4>
                        <p className="text-gray-400">{formatDate(event.registration_deadline)}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.team_formation_deadline && (
                    <div className="flex items-start">
                      <Users className="h-5 w-5 mr-3 text-gold mt-0.5" />
                      <div>
                        <h4 className="font-medium">Team Formation Deadline</h4>
                        <p className="text-gray-400">{formatDate(event.team_formation_deadline)}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.project_submission_deadline && (
                    <div className="flex items-start">
                      <CalendarIcon className="h-5 w-5 mr-3 text-gold mt-0.5" />
                      <div>
                        <h4 className="font-medium">Project Submission Deadline</h4>
                        <p className="text-gray-400">{formatDate(event.project_submission_deadline)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Join this Event</h3>
                <Button className="w-full bg-gold hover:bg-gold/90 text-gray-900">
                  Register for Event
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventDetails;
