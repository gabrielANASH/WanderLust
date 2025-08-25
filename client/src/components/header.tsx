import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Compass, Globe } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Packages', href: '/packages' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-md'
      }`}
      data-testid="header"
    >
      <nav className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" data-testid="logo">
            <Compass className="text-2xl text-forest" />
            <span className="font-poppins font-bold text-xl text-forest">Wanderlust</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`transition-colors duration-200 ${
                  location === item.href 
                    ? 'text-forest font-medium' 
                    : 'text-gray-700 hover:text-forest'
                }`}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Globe className="text-gray-600 hover:text-forest cursor-pointer transition-colors" />
            <Button 
              variant="outline" 
              className="hidden md:block border-forest text-forest hover:bg-forest hover:text-white"
              data-testid="sign-in-button"
            >
              Sign In
            </Button>
            <Button 
              className="bg-sunset hover:bg-orange-600 text-white"
              data-testid="get-started-button"
            >
              <span className="hidden md:inline">Get Started</span>
              <span className="md:hidden">Join</span>
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="mobile-menu-button">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg transition-colors duration-200 ${
                        location === item.href 
                          ? 'text-forest font-medium' 
                          : 'text-gray-700 hover:text-forest'
                      }`}
                      data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full mb-2 border-forest text-forest">
                      Sign In
                    </Button>
                    <Button className="w-full bg-sunset hover:bg-orange-600 text-white">
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
