import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, MapPin } from "lucide-react";

const experiences = [
  {
    id: "exp-1",
    title: "Northern Lights Photography Workshop",
    description: "Capture the aurora borealis with professional guidance in Iceland's pristine wilderness.",
    category: "Photography",
    duration: "5 hours",
    groupSize: "8 people max",
    price: "$299",
    rating: "4.9",
    reviews: 127,
    location: "Reykjavik, Iceland",
    imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
  {
    id: "exp-2", 
    title: "Cooking Class with Local Chef",
    description: "Learn authentic Italian cuisine from a Michelin-starred chef in the heart of Tuscany.",
    category: "Culinary",
    duration: "4 hours",
    groupSize: "12 people max",
    price: "$185",
    rating: "4.8",
    reviews: 203,
    location: "Florence, Italy",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
  {
    id: "exp-3",
    title: "Hot Air Balloon Safari",
    description: "Soar above the Serengeti and witness the Great Migration from a bird's eye view.",
    category: "Adventure",
    duration: "3 hours",
    groupSize: "16 people max", 
    price: "$450",
    rating: "5.0",
    reviews: 89,
    location: "Serengeti, Tanzania",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
];

const categoryColors = {
  Photography: "bg-ocean/10 text-ocean",
  Culinary: "bg-terracotta/10 text-terracotta", 
  Adventure: "bg-forest/10 text-forest",
  Wellness: "bg-sunset/10 text-sunset",
};

export default function Experiences() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-sunset to-terracotta">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-5xl md:text-6xl text-white mb-6">
            Unique Experiences
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Discover extraordinary activities and immersive experiences that create lasting memories
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <h2 className="font-poppins font-bold text-3xl text-gray-800 mb-4">
              Featured Experiences
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Handpicked activities that showcase local culture, natural wonders, and unique adventures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="experiences-grid">
            {experiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={experience.imageUrl}
                    alt={experience.title}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      className={`${categoryColors[experience.category as keyof typeof categoryColors]} font-semibold`}
                      data-testid={`badge-${experience.category.toLowerCase()}`}
                    >
                      {experience.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-sunset fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {experience.rating} ({experience.reviews})
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{experience.location}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-poppins font-semibold text-xl mb-2" data-testid={`experience-title-${experience.id}`}>
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{experience.groupSize}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-forest" data-testid={`experience-price-${experience.id}`}>
                        {experience.price}
                      </span>
                      <span className="text-gray-500">/person</span>
                    </div>
                    <Button 
                      className="bg-sunset hover:bg-orange-600 text-white"
                      data-testid={`book-experience-${experience.id}`}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}