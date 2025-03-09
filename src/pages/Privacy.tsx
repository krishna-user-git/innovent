
import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Last updated: June 1, 2023
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">1. Introduction</h2>
            <p className="text-gray-300 mb-6">
              This Privacy Policy describes how InnoVent ("we", "our", or "us") collects, uses, and discloses your 
              personal information when you use our services, including our website and applications (collectively, the "Services").
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect several types of information from and about users of our Services, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-300">
              <li className="mb-2">Personal information such as name, email address, and profile information when you register an account</li>
              <li className="mb-2">Information about events you create or participate in</li>
              <li className="mb-2">User content you submit through the Services</li>
              <li className="mb-2">Usage data and analytics information</li>
              <li className="mb-2">Communications and interactions with our team</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-300">
              <li className="mb-2">Provide, maintain, and improve our Services</li>
              <li className="mb-2">Process transactions and manage your account</li>
              <li className="mb-2">Send notifications about your account or events</li>
              <li className="mb-2">Respond to your comments, questions, and requests</li>
              <li className="mb-2">Monitor and analyze trends, usage, and activities in connection with our Services</li>
              <li className="mb-2">Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">4. Data Retention</h2>
            <p className="text-gray-300 mb-6">
              We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              unless a longer retention period is required or permitted by law.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">5. Contact Us</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions about this Privacy Policy, please contact us at privacy@innovent.com.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
