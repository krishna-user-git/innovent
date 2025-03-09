
import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Last updated: June 1, 2023
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">1. Agreement to Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing or using InnoVent's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
              If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. Use License</h2>
            <p className="text-gray-300 mb-6">
              Permission is granted to temporarily access the materials on InnoVent's website for personal, non-commercial use. 
              This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, 
              use the materials for any commercial purpose, attempt to decompile or reverse engineer any software contained on InnoVent's servers, 
              remove any copyright or other proprietary notations from the materials, or transfer the materials to another person or "mirror" the 
              materials on any other server.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. User Accounts</h2>
            <p className="text-gray-300 mb-6">
              When you create an account with us, you must provide accurate, complete, and current information. 
              You are responsible for safeguarding the password that you use to access the services and for any activities or actions under your password. 
              We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account. 
              You agree not to disclose your password to any third party.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">4. Events & Content</h2>
            <p className="text-gray-300 mb-6">
              Users are responsible for any events they create and content they post through our services. 
              InnoVent does not claim ownership of your content but requires certain permissions to provide our services. 
              By using our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, distribute, 
              and display such content solely for the purpose of providing and improving our services.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">5. Limitation of Liability</h2>
            <p className="text-gray-300 mb-6">
              In no event shall InnoVent or its suppliers be liable for any damages arising out of the use or inability to use our services, 
              even if InnoVent or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">6. Changes to Terms</h2>
            <p className="text-gray-300 mb-6">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting the new Terms of Service on our website 
              and/or sending you an email. Your continued use of our services after such modifications will constitute your acknowledgment and agreement to the modified terms.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">7. Contact Us</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions about these Terms, please contact us at support@innovent.com.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
