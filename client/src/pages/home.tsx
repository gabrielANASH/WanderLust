import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import DestinationCard from "@/components/destination-card";
import PackageCard from "@/components/package-card";
import InteractiveMap from "@/components/interactive-map";
import BookingForm from "@/components/booking-form";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Star, MapPin, Users, Calendar, Phone, Mail } from "lucide-react";

export default function Home() {
  const { data: featuredDestinations, isLoading: destinationsLoading } = useQuery({
    queryKey: ['/api/destinations/featured'],
  });

  const { data: featuredPackages, isLoading: packagesLoading } = useQuery({
    queryKey: ['/api/packages/featured'],
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPackages = featuredPackages?.filter((pkg: any) => 
    activeFilter === 'all' || pkg.category === activeFilter
  ) || [];

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      <HeroSection />
      
      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in" data-testid="stat-travelers">
              <div className="text-4xl font-poppins font-bold text-forest mb-2">250K+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div className="animate-fade-in" data-testid="stat-destinations">
              <div className="text-4xl font-poppins font-bold text-ocean mb-2">180+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div className="animate-fade-in" data-testid="stat-satisfaction">
              <div className="text-4xl font-poppins font-bold text-terracotta mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="animate-fade-in" data-testid="stat-support">
              <div className="text-4xl font-poppins font-bold text-sunset mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-800 mb-6">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the world's most captivating places, from pristine beaches to majestic mountains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="destinations-grid">
            {destinationsLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-80"></div>
              ))
            ) : (
              featuredDestinations?.map((destination: any) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/destinations">
              <Button variant="outline" size="lg" className="border-forest text-forest hover:bg-forest hover:text-white">
                View All Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-800 mb-6">
              Curated Travel Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked experiences that combine adventure, culture, and comfort for the perfect getaway
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-12" data-testid="package-filters">
            {['all', 'adventure', 'cultural', 'luxury', 'family'].map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={activeFilter === filter ? "default" : "outline"}
                className={`rounded-full ${
                  activeFilter === filter 
                    ? 'bg-forest text-white hover:bg-green-800' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                data-testid={`filter-${filter}`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)} 
                {filter === 'all' ? ' Packages' : ''}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="packages-grid">
            {packagesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-96"></div>
              ))
            ) : (
              filteredPackages.map((pkg: any) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/packages">
              <Button variant="outline" size="lg" className="border-forest text-forest hover:bg-forest hover:text-white">
                View All Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <InteractiveMap />

      {/* Booking System */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-800 mb-6">
              Simple & Secure Booking
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Book your dream vacation in just a few clicks with our streamlined process
            </p>
          </div>
          
          {/* Booking Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">Choose Your Adventure</h3>
              <p className="text-gray-600">Browse our curated packages or customize your perfect trip</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">Secure Payment</h3>
              <p className="text-gray-600">Pay safely with multiple payment options and full protection</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sunset text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">Start Your Journey</h3>
              <p className="text-gray-600">Receive your itinerary and enjoy 24/7 support during your trip</p>
            </div>
          </div>
          
          <BookingForm />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      <Footer />

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="icon"
          className="w-16 h-16 bg-sunset hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110" 
          data-testid="chat-button"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.42L1 22l5.58-2.05C8.96 20.64 10.46 21 12 21c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 16c-1.29 0-2.51-.3-3.58-.85l-.29-.15-2.39.88.88-2.39-.15-.29C5.7 14.51 5.4 13.29 5.4 12c0-3.69 3.01-6.7 6.7-6.7s6.7 3.01 6.7 6.7-3.01 6.7-6.7 6.7z"/>
          </svg>
        </Button>
      </div>
    </div>
  );
}
