
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, MapPin, Users, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";

interface Event {
  id: string;
  name: string;
  tagline: string;
  banner_url: string;
  type: string;
  format: string;
  start_date: string;
  end_date: string;
  created_at: string;
  is_registered?: boolean;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'published')
          .order('start_date', { ascending: true });
        
        if (eventsError) throw eventsError;
        
        // If user is authenticated, check which events they are registered for
        let eventsWithRegistrationStatus = [...eventsData];
        
        if (isAuthenticated && user) {
          const { data: registrationsData, error: registrationsError } = await supabase
            .from('event_registrations')
            .select('event_id')
            .eq('user_id', user.id);
            
          if (registrationsError) throw registrationsError;
          
          const registeredEventIds = new Set(registrationsData.map(reg => reg.event_id));
          
          eventsWithRegistrationStatus = eventsData.map(event => ({
            ...event,
            is_registered: registeredEventIds.has(event.id)
          }));
        }
        
        setEvents(eventsWithRegistrationStatus);
        console.log("Fetched events:", eventsWithRegistrationStatus);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Failed to load events",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [toast, user, isAuthenticated]);

  const handleViewDetails = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
            <p className="text-gray-400">
              Discover and join the latest hackathons, workshops, and tech events
            </p>
          </div>
          <Link to="/create-event">
            <Button className="bg-gold hover:bg-gold/90 text-gray-900">Create Event</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-gray-400 mb-6">Be the first to create an event for the community!</p>
            <Link to="/create-event">
              <Button className="bg-gold hover:bg-gold/90 text-gray-900">Create Your Event</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  {event.banner_url ? (
                    <img 
                      src={event.banner_url} 
                      alt={event.name} 
                      className="w-full h-full object-cover object-center" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500">No banner image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded font-medium capitalize">
                      {event.type}
                    </span>
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded font-medium capitalize">
                      {event.format}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{event.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.tagline || "Join this exciting event!"}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>
                        {format(new Date(event.start_date), "MMM d, yyyy")} - {format(new Date(event.end_date), "MMM d, yyyy")}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-gold text-gold hover:bg-gold/10"
                        onClick={() => handleViewDetails(event.id)}
                      >
                        View Details
                      </Button>
                      
                      {event.is_registered && (
                        <div className="flex items-center text-emerald-500 text-sm font-medium">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span>Registered</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Events;
