import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from "lucide-react";

interface EventsChartProps {
  registrationData?: { date: string; count: number }[];
  eventTypeData?: { name: string; value: number }[];
  monthlyData?: { month: string; events: number; participants: number }[];
  isLoading?: boolean;
}

const COLORS = ['#D4AF37', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const defaultRegistrationData = [
  { date: "Jan", count: 12 },
  { date: "Feb", count: 19 },
  { date: "Mar", count: 28 },
  { date: "Apr", count: 35 },
  { date: "May", count: 42 },
  { date: "Jun", count: 56 },
  { date: "Jul", count: 78 },
];

const defaultEventTypeData = [
  { name: "Hackathons", value: 45 },
  { name: "Workshops", value: 25 },
  { name: "Conferences", value: 15 },
  { name: "Meetups", value: 10 },
  { name: "Webinars", value: 5 },
];

const defaultMonthlyData = [
  { month: "Jan", events: 4, participants: 120 },
  { month: "Feb", events: 6, participants: 180 },
  { month: "Mar", events: 8, participants: 240 },
  { month: "Apr", events: 5, participants: 150 },
  { month: "May", events: 10, participants: 320 },
  { month: "Jun", events: 12, participants: 400 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const EventsChart = ({
  registrationData = defaultRegistrationData,
  eventTypeData = defaultEventTypeData,
  monthlyData = defaultMonthlyData,
  isLoading,
}: EventsChartProps) => {
  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-gold" />
          Analytics Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="bg-gray-700 mb-4">
            <TabsTrigger value="registrations" className="data-[state=active]:bg-gold data-[state=active]:text-gray-900">
              <TrendingUp className="h-4 w-4 mr-2" />
              Registrations
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-gold data-[state=active]:text-gray-900">
              <BarChart3 className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="types" className="data-[state=active]:bg-gold data-[state=active]:text-gray-900">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Types
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registrations" className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Registrations"
                  stroke="#D4AF37"
                  fillOpacity={1}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="events" className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="events" name="Events" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                <Bar dataKey="participants" name="Participants" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="types" className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {eventTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
