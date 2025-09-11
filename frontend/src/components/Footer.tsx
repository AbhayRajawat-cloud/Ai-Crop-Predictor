import { Link } from "react-router-dom";
import { 
  Sprout, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram,
  Leaf,
  Shield,
  FileText
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground text-primary">
                <Sprout className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-bold">GreenByte</span>
                <p className="text-sm text-primary-foreground/80">AI Crop Intelligence</p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Empowering Indian farmers with AI-driven insights to optimize crop yields, reduce waste, 
              and build sustainable agricultural practices across all states of India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/weather" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Weather Report
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">Crop Yield Prediction</span>
              </li>
              <li className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">Weather Analytics</span>
              </li>
              <li className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">Soil Health Monitoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">Irrigation Optimization</span>
              </li>
              <li className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">Pest Control Analytics</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/80">
                  AgriTech Park, Sector 67<br />
                  Gurugram, Haryana 122018
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">+91-9891352828</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/80">info@agripredict.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <p className="text-sm text-primary-foreground/80">
                © 2025 AgriPredict. All rights reserved.
              </p>
              <div className="mt-2 flex space-x-4 md:mt-0">
                <Link to="/privacy" className="flex items-center space-x-1 text-xs text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  <Shield className="h-3 w-3" />
                  <span>Privacy Policy</span>
                </Link>
                <Link to="/terms" className="flex items-center space-x-1 text-xs text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  <FileText className="h-3 w-3" />
                  <span>Terms of Service</span>
                </Link>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-primary-foreground/80">
                Certified Organic • Sustainable Agriculture • AI Innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;