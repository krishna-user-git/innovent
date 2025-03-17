
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/61aab18e-1c95-46ef-a372-38be01974789.png" 
        alt="InnoVent Logo" 
        className="h-8 mr-2"
      />
      <span className="text-xl font-bold">
        <span className="text-white">Inno</span>
        <span className="text-gold">Vent</span>
      </span>
    </Link>
  );
};
