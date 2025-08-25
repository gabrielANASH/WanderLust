import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Users } from "lucide-react";
import { Link } from "wouter";
import type { PackageWithDestination } from "@shared/schema";

interface PackageCardProps {
  package: PackageWithDestination;
}

const categoryColors = {
  adventure: "bg-terracotta/10 text-terracotta",
  cultural: "bg-ocean/10 text-ocean",
  luxury: "bg-sunset/10 text-sunset",
  family: "bg-forest/10 text-forest",
};

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <Badge 
            className={`${categoryColors[pkg.category as keyof typeof categoryColors]} font-semibold`}
            data-testid={`badge-${pkg.category}`}
          >
            {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-sunset fill-current" />
            <span className="ml-1 text-sm font-medium">
              {pkg.rating} ({pkg.reviewCount})
            </span>
          </div>
        </div>
        
        <h3 className="font-poppins font-semibold text-xl mb-2" data-testid={`package-title-${pkg.id}`}>
          {pkg.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{pkg.duration} Days</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>Max {pkg.maxGuests}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-forest" data-testid={`package-price-${pkg.id}`}>
              ${pkg.price}
            </span>
            <span className="text-gray-500">/person</span>
          </div>
          <Link href={`/packages/${pkg.id}`}>
            <Button 
              className="bg-sunset hover:bg-orange-600 text-white"
              data-testid={`view-details-${pkg.id}`}
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
