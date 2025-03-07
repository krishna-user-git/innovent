
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "How it works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
  ];

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            to={link.href}
            className="text-gray-700 hover:text-brand-600 transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-brand-600">Engage</span>
            <span>Hub</span>
          </Link>
          
          {!isMobile && (
            <nav>
              <ul className="flex items-center gap-6">
                <NavItems />
              </ul>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isMobile ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          ) : (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 font-bold text-xl">
                      <span className="text-brand-600">Engage</span>
                      <span>Hub</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col gap-6 my-6">
                    <ul className="flex flex-col gap-4">
                      <NavItems />
                    </ul>
                  </nav>
                  <div className="mt-auto flex flex-col gap-3">
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/register" onClick={() => setIsOpen(false)}>
                        Sign up
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};
