import { Link } from "react-router-dom";
import { Car, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">AutoCare</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for car services in Ahmedabad. Quality service, transparent pricing, and customer satisfaction guaranteed.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/providers" className="hover:text-foreground transition-colors">Find Services</Link></li>
              <li><Link to="/providers" className="hover:text-foreground transition-colors">Car Wash</Link></li>
              <li><Link to="/providers" className="hover:text-foreground transition-colors">Oil Change</Link></li>
              <li><Link to="/providers" className="hover:text-foreground transition-colors">Tire Service</Link></li>
              <li><Link to="/providers" className="hover:text-foreground transition-colors">AC Repair</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 font-semibold">Connect</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Follow us on social media for updates and offers.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AutoCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
