import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    rating: 5,
    content: "The Greek Islands tour exceeded all our expectations. The local guides were incredible, and every moment was perfectly planned. We'll definitely book with Wanderlust again!",
    author: "Sarah & Mark Johnson",
    package: "Greek Islands Discovery",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 2,
    rating: 5,
    content: "An absolutely life-changing adventure! The white water rafting was thrilling, and the camping under the stars was magical. Professional guides made us feel safe throughout.",
    author: "Emily Chen",
    package: "Colorado River Expedition",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 3,
    rating: 5,
    content: "Pure luxury from start to finish. The overwater villa was stunning, and the service was impeccable. Our honeymoon couldn't have been more perfect!",
    author: "David & Lisa Rodriguez",
    package: "Maldives Paradise Retreat",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-forest/5 to-ocean/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-800 mb-6">
            Traveler Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our adventurers about their unforgettable experiences around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="testimonials-grid">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-sunset">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold" data-testid={`testimonial-author-${testimonial.id}`}>
                      {testimonial.author}
                    </div>
                    <div className="text-gray-500 text-sm">{testimonial.package}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
