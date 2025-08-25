import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "24/7 Emergency Support Available",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@wanderlust.com", "support@wanderlust.com"],
      description: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Adventure Street", "San Francisco, CA 94102"],
      description: "Visit us Monday - Friday, 9AM - 6PM",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon - Fri: 9AM - 6PM PST", "Emergency: 24/7"],
      description: "Always here when you need us",
    },
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-ocean to-forest">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-5xl md:text-6xl text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Ready to plan your next adventure? Get in touch with our travel experts who are here to help make your dream trip a reality
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-8 w-8 text-forest" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl mb-3">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium mb-1">{detail}</p>
                  ))}
                  <p className="text-gray-500 text-sm mt-3">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-poppins font-bold text-4xl text-gray-800 mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about our packages, need travel advice, or want to customize your perfect trip? Fill out the form and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Send className="h-6 w-6 text-sunset" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Quick Response</h4>
                    <p className="text-gray-600">We typically respond to all inquiries within 24 hours during business days.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="h-6 w-6 text-ocean" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Emergency Support</h4>
                    <p className="text-gray-600">Need immediate assistance during your trip? Our 24/7 emergency line is always available.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="focus:border-forest"
                        data-testid="input-name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="focus:border-forest"
                        data-testid="input-email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="focus:border-forest"
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                        <SelectTrigger className="focus:border-forest" data-testid="select-subject">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="booking">Booking Question</SelectItem>
                          <SelectItem value="custom">Custom Trip Planning</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your travel plans, questions, or how we can help..."
                      rows={6}
                      className="focus:border-forest"
                      data-testid="textarea-message"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-forest hover:bg-green-800 text-white py-3 text-lg"
                    data-testid="submit-contact"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl text-gray-800 mb-4">
              Visit Our Office
            </h2>
            <p className="text-gray-600">
              Drop by our San Francisco office to meet our team and plan your next adventure in person
            </p>
          </div>
          
          <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center" data-testid="map-placeholder">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-forest mx-auto mb-4" />
              <h3 className="font-semibold text-xl text-gray-700 mb-2">123 Adventure Street</h3>
              <p className="text-gray-600">San Francisco, CA 94102</p>
              <Button variant="outline" className="mt-4 border-forest text-forest hover:bg-forest hover:text-white">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}