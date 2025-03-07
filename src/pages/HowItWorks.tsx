
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Calendar, UserCircle, Users, Award, LucideIcon, Zap, BoxSelect, FileCheck } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Feature = ({ icon: Icon, title, description }: FeatureProps) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 mt-1">
      <Icon className="h-6 w-6 text-brand-600" />
    </div>
    <div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const HowItWorks = () => {
  const features = [
    {
      icon: Calendar,
      title: "Create Your Event",
      description: "Set up your event in minutes with customizable templates for hackathons, workshops, conferences, and more. Add your branding, set registration options, and create a beautiful landing page for your event."
    },
    {
      icon: UserCircle,
      title: "One-Click Registration",
      description: "Offer a seamless registration experience with social authentication via GitHub, Google, and LinkedIn. Collect only the information you need with customizable registration forms."
    },
    {
      icon: Users,
      title: "Team Formation",
      description: "Enable participants to form teams based on skills and interests. Our smart matching algorithm can suggest potential teammates, or participants can browse profiles and form their own teams."
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Provide teams with built-in collaboration tools including chat, file sharing, and project planning boards. Integrate with GitHub for seamless code sharing and version control."
    },
    {
      icon: BoxSelect,
      title: "Project Submissions",
      description: "Collect project submissions through a standardized process. Teams can submit code repositories, demos, presentations, and more. Set submission deadlines and requirements."
    },
    {
      icon: FileCheck,
      title: "Judging & Evaluation",
      description: "Create custom judging criteria and assign judges to projects. Our platform supports multiple rounds of judging with aggregated scores and feedback mechanisms."
    },
    {
      icon: Award,
      title: "Recognition & Rewards",
      description: "Announce winners through the platform and distribute prizes. Provide certificates of participation and achievement badges that participants can share on social media."
    }
  ];

  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">How EngageHub Works</h1>
          <p className="text-xl text-gray-600">
            Our platform simplifies every aspect of organizing and participating in events, from registration to team formation to project submission.
          </p>
        </div>

        <div className="grid gap-16 md:gap-24">
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">For Event Organizers</h2>
            <div className="grid gap-12 md:grid-cols-2 mb-12">
              {features.slice(0, 4).map((feature, i) => (
                <Feature key={i} {...feature} />
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">Organizer Benefits</h3>
              <ul className="space-y-3">
                {[
                  "Save 20+ hours of manual work per event",
                  "Increase participant engagement by 40%",
                  "Access detailed analytics and participant insights",
                  "Simplify logistics with automated communications",
                  "Create a professional event experience with minimal effort"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">For Participants</h2>
            <div className="grid gap-12 md:grid-cols-2 mb-12">
              {features.slice(4).map((feature, i) => (
                <Feature key={i} {...feature} />
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">Participant Benefits</h3>
              <ul className="space-y-3">
                {[
                  "Find events matching your interests and skills",
                  "Connect with like-minded collaborators",
                  "Build your portfolio with project showcases",
                  "Receive valuable feedback from industry experts",
                  "Discover career opportunities through event networking"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/create-event">Create an Event</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/events">Browse Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
