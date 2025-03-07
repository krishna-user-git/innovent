
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Host & Join Events with <span className="text-brand-600">Impact</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                EngageHub is the all-in-one platform that makes event organization effortless, attendee engagement seamless, and collaboration natural.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="font-medium">
                <Link to="/create-event">Create Your Event <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/events">Explore Events</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(id => (
                  <div key={id} className="inline-block h-8 w-8 rounded-full bg-gray-100 ring-2 ring-white" />
                ))}
              </div>
              <p className="text-gray-500">Join 10,000+ organizers & attendees</p>
            </div>
          </div>
          <div className="mx-auto flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
              <div className="absolute left-0 top-0 h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] lg:h-[400px] lg:w-[400px] rounded-lg bg-gradient-to-br from-brand-100 to-brand-300 dark:from-brand-900 dark:to-brand-700 animate-float">
                <div className="absolute inset-1 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur flex flex-col p-6">
                  <div className="mb-4 flex justify-between items-center">
                    <div className="font-semibold">Upcoming Hackathon</div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">48 Spots Left</div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">CloudTech Innovators Challenge</h3>
                  <p className="text-sm text-gray-500 mb-4">Join the premier hackathon for cloud technology innovation.</p>
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <div className="bg-gray-100 px-3 py-1 rounded-full">Remote</div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full">Aug 15-18</div>
                  </div>
                  <div className="mt-auto">
                    <Button size="sm" className="w-full">Register Now</Button>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 h-[200px] w-[250px] rounded-lg bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 animate-float" style={{ animationDelay: "1s" }}>
                <div className="absolute inset-1 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur flex flex-col p-4">
                  <h3 className="text-lg font-bold mb-2">Team Formation</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1, 2, 3, 4, 5, 6].map(id => (
                      <div key={id} className="h-6 w-6 rounded-full bg-gray-200" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Find the perfect team based on skills and interests.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
