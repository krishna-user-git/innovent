import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, MapPin, Users, ArrowRight, Clock } from "lucide-react";
import { format, differenceInDays, isPast } from "date-fns";
import { Event } from "@/types/database";
import { useNavigate } from "react-router-dom";

interface UpcomingEventsProps {
  events: Event[];
  isLoading?: boolean;
}

const getEventStatus = (event: Event) => {
  const now = new Date();
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  if (isPast(endDate)) {
    return { label: "Completed", className: "bg-gray-600 text-gray-200" };
  }
  if (isPast(startDate) && !isPast(endDate)) {
    return { label: "In Progress", className: "bg-emerald-600 text-white" };
  }
  const daysUntil = differenceInDays(startDate, now);
  if (daysUntil <= 7) {
    return { label: "Starting Soon", className: "bg-orange-600 text-white" };
  }
  return { label: "Upcoming", className: "bg-blue-600 text-white" };
};

const getDaysUntilEvent = (startDate: string) => {
  const days = differenceInDays(new Date(startDate), new Date());
  if (days < 0) return null;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
};

export const UpcomingEvents = ({ events, isLoading }: UpcomingEventsProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-gray-700 rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gold" />
          Upcoming Events
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-gold hover:text-gold/80"
          onClick={() => navigate("/events")}
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <Calendar className="h-12 w-12 text-gray-600 mb-4" />
              <p className="text-gray-400">No upcoming events</p>
              <p className="text-gray-500 text-sm mb-4">Create your first event to get started</p>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10"
                onClick={() => navigate("/create-event")}
              >
                Create Event
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => {
                const status = getEventStatus(event);
                const daysUntil = getDaysUntilEvent(event.start_date);

                return (
                  <div
                    key={event.id}
                    className="group relative overflow-hidden rounded-lg border border-gray-700 hover:border-gold/50 transition-all cursor-pointer"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    {/* Banner Image */}
                    <div className="h-20 overflow-hidden">
                      {event.banner_url ? (
                        <img
                          src={event.banner_url}
                          alt={event.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-600" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={status.className}>{status.label}</Badge>
                        {daysUntil && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            <Clock className="h-3 w-3 mr-1" />
                            {daysUntil}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-white truncate">{event.name}</h3>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(event.start_date), "MMM d, yyyy")}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Registered Badge */}
                    {event.is_registered && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-emerald-600 text-white">
                          Registered
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
