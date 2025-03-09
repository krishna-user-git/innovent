
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const Hero = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                The Ultimate Event Management Platform
              </h1>
              <p className="max-w-[600px] text-gray-400 md:text-xl">
                InnoVent makes it easy to create, manage, and participate in events
                of all kinds. From hackathons to conferences, we've got you covered.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="gap-1 bg-gold text-black hover:bg-gold/90">
                    <Link to="/events">
                      Explore Events <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10">
                    <Link to="/create-event">Create Event</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="gap-1 bg-gold text-black hover:bg-gold/90">
                    <Link to="/register">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full md:h-[420px] lg:h-[580px]">
              <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-gold/20 opacity-30 blur-3xl"></div>
              <div className="absolute right-0 top-28 h-[250px] w-[250px] rounded-full bg-gold/10 opacity-30 blur-3xl"></div>
              
              <div className="relative animate-float z-10 mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl bg-gray-800 p-4 shadow-2xl border border-gray-700">
                <div className="space-y-2 pb-4">
                  <div className="h-10 w-3/4 rounded-lg bg-gray-700"></div>
                  <div className="h-4 w-1/2 rounded-lg bg-gray-700"></div>
                </div>
                <div className="space-y-3 border-t border-gray-700 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                    <div className="space-y-1">
                      <div className="h-4 w-20 rounded-md bg-gray-700"></div>
                      <div className="h-3 w-16 rounded-md bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                    <div className="space-y-1">
                      <div className="h-4 w-24 rounded-md bg-gray-700"></div>
                      <div className="h-3 w-14 rounded-md bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 w-full rounded-md bg-gray-700"></div>
                    <div className="h-4 w-3/4 rounded-md bg-gray-700"></div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <div className="h-8 w-24 rounded-md bg-gold/20"></div>
                    <div className="h-8 w-24 rounded-md bg-gray-700"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 z-0 md:bottom-10 md:right-10">
                <div className="h-44 w-44 rounded-2xl bg-gray-800 p-3 shadow-lg border border-gray-700 rotate-6">
                  <div className="h-full w-full rounded-lg bg-gray-700 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-gold/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
