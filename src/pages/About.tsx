
import { Layout } from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">About InnoVent</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              InnoVent is the leading platform for creating, managing, and participating in events that foster innovation and collaboration.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              Our mission is to empower organizations to create meaningful events that drive innovation, foster community, and facilitate collaboration. 
              We believe that great ideas come from bringing diverse minds together, and we're dedicated to making that process as seamless as possible.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Our Story</h2>
            <p className="text-gray-300 mb-6">
              InnoVent was founded in 2025 by a team of event organizers and tech enthusiasts who saw the need for a comprehensive platform that 
              could handle the unique challenges of organizing hackathons, workshops, and other collaborative events. 
              After experiencing the limitations of existing tools, we set out to build something better.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Our Team</h2>
            <p className="text-gray-300 mb-6">
              We're a diverse group of professionals with backgrounds in event management, software development, and community building. 
              United by our passion for innovation and collaboration, we're committed to continuously improving the InnoVent platform 
              based on user feedback and evolving needs.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Contact Us</h2>
            <p className="text-gray-300 mb-2">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <p className="text-gray-300 mb-1">Email: support@innovent.com</p>
            <p className="text-gray-300 mb-6">Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
