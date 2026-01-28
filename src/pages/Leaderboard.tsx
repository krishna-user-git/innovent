import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { TopThree } from "@/components/leaderboard/TopThree";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Event, LeaderboardEntry } from "@/types/database";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("status", "published")
        .order("start_date", { ascending: false });
      setEvents((data as Event[]) || []);
      if (data && data.length > 0) {
        setSelectedEventId(data[0].id);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Mock leaderboard data for demonstration
  useEffect(() => {
    if (selectedEventId) {
      // In a real app, this would fetch actual scored projects
      setEntries([]);
    }
  }, [selectedEventId]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Trophy className="h-8 w-8 text-gold" />
              Leaderboard
            </h1>
            <p className="text-gray-400 mt-1">See the top projects and their scores</p>
          </div>

          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger className="w-full md:w-72 bg-gray-800 border-gray-700">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-gray-800 border-gray-700 h-20 animate-pulse" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="py-16 text-center">
              <Trophy className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Rankings Yet</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {selectedEventId
                  ? "Projects haven't been scored yet. Check back after judging is complete."
                  : "Select an event to view its leaderboard."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <TopThree entries={entries} onViewProject={(id) => navigate(`/projects/${id}`)} />
            <LeaderboardTable entries={entries} onViewProject={(id) => navigate(`/projects/${id}`)} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Leaderboard;
