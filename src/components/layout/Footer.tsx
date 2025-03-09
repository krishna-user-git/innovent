
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-800 bg-gray-900/95 backdrop-blur">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl mb-4">
              <span className="text-white">Inno</span>
              <span className="text-gold">Vent</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              InnoVent is the all-in-one platform for creating, managing, and participating in events that matter.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3 text-white">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/events" className="text-gray-400 hover:text-gold transition-colors">Events</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-gold transition-colors">How it works</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3 text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-gold transition-colors">About us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-gold transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-gold transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} InnoVent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
