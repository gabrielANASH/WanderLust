import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Compass, Facebook, Instagram, Twitter, Youtube, Phone, Mail } from "lucide-react";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Compass className="text-2xl text-sunset" />
              <span className="font-poppins font-bold text-xl">Wanderlust</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Creating unforgettable travel experiences that connect you with the world's most beautiful destinations and cultures.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gray-800 rounded-full hover:bg-sunset transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gray-800 rounded-full hover:bg-sunset transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gray-800 rounded-full hover:bg-sunset transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gray-800 rounded-full hover:bg-sunset transition-colors"
                data-testid="social-youtube"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/destinations" className="text-gray-400 hover:text-sunset transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-sunset transition-colors">
                  Travel Packages
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-400 hover:text-sunset transition-colors">
                  Group Tours
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-gray-400 hover:text-sunset transition-colors">
                  Custom Itineraries
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="text-gray-400 hover:text-sunset transition-colors">
                  Travel Insurance
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-sunset transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-sunset transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/modifications" className="text-gray-400 hover:text-sunset transition-colors">
                  Booking Modifications
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-gray-400 hover:text-sunset transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-gray-400 hover:text-sunset transition-colors">
                  Travel Guidelines
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get the latest travel deals and inspiration.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3" data-testid="newsletter-form">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 focus:border-sunset text-white placeholder:text-gray-400"
                data-testid="newsletter-email"
                required
              />
              <Button
                type="submit"
                className="w-full bg-sunset hover:bg-orange-600 text-white"
                data-testid="newsletter-submit"
              >
                Subscribe
              </Button>
            </form>
            
            {/* Contact Info */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-3" />
                <span>hello@wanderlust.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; 2024 Wanderlust Adventures. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-sunset transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-sunset transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-sunset transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
