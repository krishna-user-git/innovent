
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "./navbar/Logo";
import { NavItems } from "./navbar/NavItems";
import { UserMenu } from "./navbar/UserMenu";
import { MobileNav } from "./navbar/MobileNav";

export const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          
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
            <UserMenu />
          ) : (
            <MobileNav />
          )}
        </div>
      </div>
    </header>
  );
};
