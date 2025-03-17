
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { NavItems } from "./NavItems";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-900 text-white border-gray-800">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
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
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-6 my-6">
            <ul className="flex flex-col gap-4">
              <NavItems setIsOpen={setIsOpen} />
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 mb-4 p-2 border rounded-md border-gray-800">
                  <UserCircle className="h-10 w-10" />
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/create-event" onClick={() => setIsOpen(false)}>
                    Create Event
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
