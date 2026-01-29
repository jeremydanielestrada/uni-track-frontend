import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const governor = useContext(AuthContext);
  // Derive the banner visibility directly from governor

  const isBannerVisible = !!governor;

  return (
    <header className="bg-white border-b border-secondary sticky top-0 z-50">
      <nav className="w-full  md:mx-auto px-3 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">📍</span>
          </div>
          <h2 className="text-4xl font-bold">UniTrack</h2>
        </div>

        {isBannerVisible && (
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Welcome College Governor {governor?.name.split(" ")[0]}
            </span>
            <button className="border rounded  py-1 px-4 border-primary text-primary hover:bg-primary/5 bg-transparent cursor-pointer">
              Logout
            </button>
          </div>
        )}

        {/* Mobile Nav */}

        {isBannerVisible && (
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span>{isMenuOpen ? <X /> : <Menu />}</span>
          </button>
        )}

        {isMenuOpen && isBannerVisible && (
          <div className="absolute top-16 left-0 right-0 bg-secondary border-b border-secondary p-4 md:hidden">
            <div className="flex flex-col gap-3">
              <span className="text-sm text-muted-foreground text-center">
                College Governor
              </span>
              <button className="border rounded py-1 px-4 border-primary text-primary hover:bg-primary/5 bg-transparent cursor-pointer">
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
