
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
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/61aab18e-1c95-46ef-a372-38be01974789.png" 
                alt="InnoVent Logo" 
                className="h-12 mr-2"
              />
              <span className="text-2xl font-bold">
                <span className="text-white">Inno</span>
                <span className="text-gold">Vent</span>
              </span>
            </div>
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
            <img 
              src="https://i.imgur.com/IxoLl6U.jpeg" 
              alt="InnoVent Banner" 
              className="w-full rounded-xl shadow-2xl border border-gray-700 z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
