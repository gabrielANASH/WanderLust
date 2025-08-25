import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { useLocation } from "wouter";

export default function SearchForm() {
  const [, setLocation] = useLocation();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to packages page with search parameters
    const params = new URLSearchParams({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests,
    });
    setLocation(`/packages?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto search-shadow animate-slide-up">
      <form onSubmit={handleSearch} data-testid="search-form">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
              Destination
            </Label>
            <div className="relative">
              <Input
                id="destination"
                type="text"
                placeholder="Where to?"
                value={searchData.destination}
                onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
                className="pl-10 py-3 border-2 border-gray-200 focus:border-forest"
                data-testid="input-destination"
              />
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <Label htmlFor="checkin" className="block text-sm font-semibold text-gray-700 mb-2">
              Check-in
            </Label>
            <div className="relative">
              <Input
                id="checkin"
                type="date"
                value={searchData.checkIn}
                onChange={(e) => setSearchData(prev => ({ ...prev, checkIn: e.target.value }))}
                className="pl-10 py-3 border-2 border-gray-200 focus:border-forest"
                data-testid="input-checkin"
              />
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <Label htmlFor="checkout" className="block text-sm font-semibold text-gray-700 mb-2">
              Check-out
            </Label>
            <div className="relative">
              <Input
                id="checkout"
                type="date"
                value={searchData.checkOut}
                onChange={(e) => setSearchData(prev => ({ ...prev, checkOut: e.target.value }))}
                className="pl-10 py-3 border-2 border-gray-200 focus:border-forest"
                data-testid="input-checkout"
              />
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <Label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
              Guests
            </Label>
            <div className="relative">
              <Select 
                value={searchData.guests} 
                onValueChange={(value) => setSearchData(prev => ({ ...prev, guests: value }))}
              >
                <SelectTrigger className="pl-10 py-3 border-2 border-gray-200 focus:border-forest" data-testid="select-guests">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                </SelectContent>
              </Select>
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button
            type="submit"
            size="lg"
            className="bg-sunset hover:bg-orange-600 text-white px-12 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            data-testid="search-button"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Adventures
          </Button>
        </div>
      </form>
    </div>
  );
}
