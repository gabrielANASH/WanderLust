import { Card } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import { Link } from "wouter";
import type { Destination } from "@shared/schema";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.id}`}>
      <Card className="group cursor-pointer transform hover:scale-105 transition-all duration-300 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl">
        <div className="relative overflow-hidden">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{destination.country}</span>
            </div>
            <h3 className="font-poppins font-semibold text-2xl mb-2">{destination.name}</h3>
            <p className="text-white/90 mb-2">From ${destination.priceFrom} per person</p>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-sunset fill-current" />
              <span className="ml-1 text-sm">
                {destination.rating} ({destination.reviewCount?.toLocaleString() || 0} reviews)
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
