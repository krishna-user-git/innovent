import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User,
  Coffee,
  Presentation,
  Users,
  Trophy,
  Mic,
  BookOpen
} from "lucide-react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { ScheduleItem } from "@/types/database";
import { cn } from "@/lib/utils";

interface ScheduleTimelineProps {
  items: ScheduleItem[];
  isLoading?: boolean;
}

const getItemIcon = (type: string | null) => {
  switch (type) {
    case "session":
      return <Presentation className="h-4 w-4" />;
    case "workshop":
      return <BookOpen className="h-4 w-4" />;
    case "break":
      return <Coffee className="h-4 w-4" />;
    case "networking":
      return <Users className="h-4 w-4" />;
    case "ceremony":
      return <Trophy className="h-4 w-4" />;
    case "keynote":
      return <Mic className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getItemColor = (type: string | null) => {
  switch (type) {
    case "session":
      return "border-l-blue-500 bg-blue-500/10";
    case "workshop":
      return "border-l-purple-500 bg-purple-500/10";
    case "break":
      return "border-l-green-500 bg-green-500/10";
    case "networking":
      return "border-l-orange-500 bg-orange-500/10";
    case "ceremony":
      return "border-l-gold bg-gold/10";
    case "keynote":
      return "border-l-pink-500 bg-pink-500/10";
    default:
      return "border-l-gray-500 bg-gray-500/10";
  }
};

const groupItemsByDate = (items: ScheduleItem[]) => {
  const groups: Record<string, ScheduleItem[]> = {};
  
  items.forEach((item) => {
    const date = format(new Date(item.start_time), "yyyy-MM-dd");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
  });

  // Sort items within each group by start time
  Object.keys(groups).forEach((date) => {
    groups[date].sort(
      (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
  });

  return groups;
};

const getDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "EEEE, MMMM d");
};

export const ScheduleTimeline = ({ items, isLoading }: ScheduleTimelineProps) => {
  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-700 rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const groupedItems = groupItemsByDate(items);
  const sortedDates = Object.keys(groupedItems).sort();

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gold" />
          Event Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-600 mb-4" />
              <p className="text-gray-400">No schedule items yet</p>
              <p className="text-gray-500 text-sm">
                The event schedule will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDates.map((date) => (
                <div key={date}>
                  {/* Date header */}
                  <div className="sticky top-0 bg-gray-800 py-2 mb-4 z-10">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-gray-600",
                          isToday(new Date(date)) && "border-gold text-gold"
                        )}
                      >
                        {getDateLabel(date)}
                      </Badge>
                      <div className="flex-1 h-px bg-gray-700" />
                    </div>
                  </div>

                  {/* Timeline items */}
                  <div className="relative pl-6 space-y-4">
                    {/* Vertical line */}
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-700" />

                    {groupedItems[date].map((item) => {
                      const isItemPast = isPast(new Date(item.end_time));

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "relative border-l-4 rounded-r-lg p-4 transition-all hover:translate-x-1",
                            getItemColor(item.type),
                            isItemPast && "opacity-60"
                          )}
                        >
                          {/* Timeline dot */}
                          <div
                            className={cn(
                              "absolute -left-[26px] w-4 h-4 rounded-full border-2 border-gray-800",
                              isItemPast ? "bg-gray-600" : "bg-gold"
                            )}
                          />

                          {/* Content */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-gray-400">
                                  {getItemIcon(item.type)}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-xs capitalize border-gray-600"
                                >
                                  {item.type || "event"}
                                </Badge>
                              </div>

                              <h4 className="font-medium text-white mb-1">
                                {item.title}
                              </h4>

                              {item.description && (
                                <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                                  {item.description}
                                </p>
                              )}

                              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {format(new Date(item.start_time), "h:mm a")} -{" "}
                                  {format(new Date(item.end_time), "h:mm a")}
                                </span>
                                {item.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {item.location}
                                  </span>
                                )}
                                {item.speaker && (
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {item.speaker}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
