
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Event",
      description: "Set up your event in minutes with our easy-to-use dashboard. Customize everything from registration forms to event landing pages.",
    },
    {
      number: "02",
      title: "Invite Participants",
      description: "Share your event with your community or discover new participants through our platform. Simplified registration process for everyone.",
    },
    {
      number: "03",
      title: "Form Teams & Collaborate",
      description: "Participants can browse profiles, form teams based on skills and interests, and collaborate in real-time.",
    },
    {
      number: "04",
      title: "Submit & Evaluate Projects",
      description: "Teams submit their work through the platform. Organizers can manage judging rounds and provide feedback all in one place.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gold/20 px-3 py-1 text-sm text-gold">
              Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">How InnoVent Works</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our simple four-step process makes hosting and participating in events effortless.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:gap-12 lg:grid-cols-2 mt-12">
          <div className="flex flex-col gap-8">
            {steps.slice(0, 2).map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 text-gold font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {steps.slice(2, 4).map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 text-gold font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="bg-gold text-black hover:bg-gold/90">
            <Link to="/how-it-works">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
