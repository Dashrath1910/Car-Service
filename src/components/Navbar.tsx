import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { currentUser, logout } from "@/utils/auth";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Track login state using currentUser()
  const [user, setUser] = useState(() => currentUser());

  // Update state whenever localStorage changes (optional enhancement)
  useEffect(() => {
    const handleStorageChange = () => setUser(currentUser());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isLoggedIn = !!user;
  const userRole = user?.role || "guest";

  const navLinks = [
    { to: "/", label: "Home", public: true },
    { to: "/providers", label: "Find Services", public: true },
    { to: "/dashboard", label: "Dashboard", roles: ["customer"] },
    { to: "/bookings", label: "My Bookings", roles: ["customer"] },
    { to: "/provider/dashboard", label: "Provider Dashboard", roles: ["provider"] },
    { to: "/admin", label: "Admin Panel", roles: ["admin"] },
  ];

  const visibleLinks = navLinks.filter(
    (link) => link.public || (link.roles && link.roles.includes(userRole))
  );

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">AutoCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  isActive(link.to)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {!isLoggedIn ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-secondary">
                  <Link to="/auth/register">Get Started</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" title={user.name || "Profile"}>
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-md p-2 text-foreground hover:bg-muted"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in border-t py-4">
            <div className="flex flex-col space-y-2">
              {visibleLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    isActive(link.to)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {!isLoggedIn && (
                <>
                  <Button variant="outline" asChild className="mt-4">
                    <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="bg-gradient-secondary">
                    <Link to="/auth/register" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
              {isLoggedIn && (
                <Button variant="outline" className="mt-4" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
