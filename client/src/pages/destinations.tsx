import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DestinationCard from "@/components/destination-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const { data: destinations, isLoading } = useQuery({
    queryKey: ['/api/destinations'],
  });

  const filteredDestinations = destinations?.filter((dest: any) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || dest.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchesSearch && matchesRegion;
  }) || [];

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-forest to-ocean">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-5xl md:text-6xl text-white mb-6">
            Explore Destinations
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Discover breathtaking places around the world, from tropical paradises to cultural treasures
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="search-destinations"
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="md:w-48" data-testid="filter-region">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="south america">South America</SelectItem>
                  <SelectItem value="north america">North America</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="font-poppins font-bold text-3xl text-gray-800">
              {filteredDestinations.length} Destinations Found
            </h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-80"></div>
              ))}
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-16">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No destinations found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="destinations-list">
              {filteredDestinations.map((destination: any) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
