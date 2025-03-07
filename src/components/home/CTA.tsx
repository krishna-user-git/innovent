
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Host Your Next Event?
            </h2>
            <p className="text-gray-500 md:text-xl">
              Join thousands of event organizers who use EngageHub to create memorable experiences and build communities.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
            <Button asChild size="lg" className="font-medium">
              <Link to="/create-event">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
