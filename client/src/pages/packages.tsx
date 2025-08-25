import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PackageCard from "@/components/package-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Packages() {
  const [location] = useLocation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [duration, setDuration] = useState("all");

  // Parse URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const category = urlParams.get('category');
    if (category) {
      setActiveFilter(category);
    }
  }, [location]);

  const { data: packages, isLoading } = useQuery({
    queryKey: ['/api/packages', { category: activeFilter !== 'all' ? activeFilter : undefined }],
  });

  const filteredPackages = packages?.filter((pkg: any) => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceRange === "all" || 
      (priceRange === "budget" && parseInt(pkg.price) < 2000) ||
      (priceRange === "mid" && parseInt(pkg.price) >= 2000 && parseInt(pkg.price) < 4000) ||
      (priceRange === "luxury" && parseInt(pkg.price) >= 4000);
    
    const matchesDuration = duration === "all" ||
      (duration === "short" && pkg.duration <= 7) ||
      (duration === "medium" && pkg.duration > 7 && pkg.duration <= 14) ||
      (duration === "long" && pkg.duration > 14);

    return matchesSearch && matchesPrice && matchesDuration;
  }) || [];

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-terracotta to-sunset">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-5xl md:text-6xl text-white mb-6">
            Travel Packages
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Curated adventures designed to create unforgettable memories and life-changing experiences
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="search-packages"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40" data-testid="filter-price">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Under $2,000</SelectItem>
                  <SelectItem value="mid">$2,000 - $4,000</SelectItem>
                  <SelectItem value="luxury">Over $4,000</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="w-40" data-testid="filter-duration">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="short">1-7 Days</SelectItem>
                  <SelectItem value="medium">8-14 Days</SelectItem>
                  <SelectItem value="long">15+ Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4" data-testid="category-filters">
            {['all', 'adventure', 'cultural', 'luxury', 'family'].map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={activeFilter === filter ? "default" : "outline"}
                className={`rounded-full ${
                  activeFilter === filter 
                    ? 'bg-forest text-white hover:bg-green-800' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                }`}
                data-testid={`category-${filter}`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)} 
                {filter === 'all' ? ' Packages' : ''}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="font-poppins font-bold text-3xl text-gray-800">
              {filteredPackages.length} Packages Found
            </h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-96"></div>
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No packages found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="packages-list">
              {filteredPackages.map((pkg: any) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
