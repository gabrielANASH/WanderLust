import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Globe, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: "250K+", label: "Happy Travelers" },
  { icon: Globe, value: "180+", label: "Destinations" },
  { icon: Award, value: "98%", label: "Satisfaction Rate" },
  { icon: Heart, value: "15+", label: "Years Experience" },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Passionate traveler with 20+ years in the tourism industry",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    bio: "Expert in logistics and creating seamless travel experiences",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
  },
  {
    name: "Elena Rodriguez",
    role: "Travel Designer",
    bio: "Specializes in crafting unique and personalized itineraries",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-forest to-ocean">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-5xl md:text-6xl text-white mb-6">
            About Wanderlust
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're passionate about creating extraordinary travel experiences that connect you with the world's most beautiful destinations and cultures
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins font-bold text-4xl text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2008, Wanderlust began as a small dream to make authentic travel experiences accessible to everyone. What started as a passion project has grown into a trusted travel partner for adventurers worldwide.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We believe that travel has the power to transform lives, broaden perspectives, and create connections that last a lifetime. Every journey we design is carefully crafted to provide not just a vacation, but a meaningful experience.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we're proud to have helped over 250,000 travelers explore 180+ destinations across all seven continents, always with a focus on sustainable tourism and authentic cultural exchange.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Team planning travel experiences"
                className="rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-forest" />
                </div>
                <div className="text-3xl font-bold font-poppins text-gray-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-gray-800 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our passionate team of travel experts is dedicated to creating unforgettable experiences for every traveler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="team-grid">
            {team.map((member, index) => (
              <Card key={index} className="text-center shadow-lg">
                <CardContent className="p-8">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                    loading="lazy"
                  />
                  <h3 className="font-poppins font-semibold text-xl mb-2" data-testid={`team-member-${index + 1}`}>
                    {member.name}
                  </h3>
                  <p className="text-forest font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-gray-800 mb-6">
              Our Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sunset/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-sunset" />
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-4">Authentic Experiences</h3>
              <p className="text-gray-600">We create genuine connections with local cultures and communities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-ocean" />
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-4">Sustainable Tourism</h3>
              <p className="text-gray-600">We're committed to protecting the places we visit for future generations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-forest" />
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-4">Excellence</h3>
              <p className="text-gray-600">We strive for perfection in every detail of your travel experience</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}