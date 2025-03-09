
import { Award, Calendar, Globe, Laptop, Users, Zap } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Event Setup",
      description: "Create customizable event pages in minutes with our intuitive drag-and-drop interface.",
    },
    {
      icon: Zap,
      title: "One-Click Registration",
      description: "Simplify sign-ups with social authentication and streamlined forms.",
    },
    {
      icon: Users,
      title: "Smart Team Formation",
      description: "Match participants based on skills, interests, and goals using our AI-powered system.",
    },
    {
      icon: Globe,
      title: "Virtual & Hybrid Events",
      description: "Host seamless online, in-person, or hybrid events with integrated video conferencing.",
    },
    {
      icon: Laptop,
      title: "Project Showcase",
      description: "Enable participants to submit and showcase their projects with GitHub integration.",
    },
    {
      icon: Award,
      title: "Judging & Feedback",
      description: "Streamline the judging process with customizable criteria and real-time scoring.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gold/20 px-3 py-1 text-sm text-gold">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Everything You Need</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              InnoVent provides all the tools you need to host successful events and foster meaningful connections.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-2 p-6 bg-gray-900 rounded-lg shadow-sm border border-gray-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
                <feature.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
