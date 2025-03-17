
import { Link } from "react-router-dom";

interface NavItemsProps {
  setIsOpen?: (isOpen: boolean) => void;
}

export const NavItems = ({ setIsOpen }: NavItemsProps) => {
  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "How it works", href: "/how-it-works" },
  ];

  return (
    <>
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            to={link.href}
            className="text-gray-300 hover:text-gold transition-colors font-medium"
            onClick={() => setIsOpen && setIsOpen(false)}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );
};
