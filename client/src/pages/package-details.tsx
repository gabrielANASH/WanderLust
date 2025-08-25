import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Check, 
  Heart,
  Share2,
  ArrowLeft,
  CreditCard,
  Lock,
  Phone,
  Mail
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import PackageCard from "@/components/package-card";

const categoryColors = {
  adventure: "bg-terracotta/10 text-terracotta",
  cultural: "bg-ocean/10 text-ocean", 
  luxury: "bg-sunset/10 text-sunset",
  family: "bg-forest/10 text-forest",
};

export default function PackageDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [bookingData, setBookingData] = useState({
    guestCount: 2,
    departureDate: "",
    specialRequests: "",
    paymentMethod: "",
  });
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: "",
    comment: "",
  });

  const { data: packageData, isLoading: packageLoading } = useQuery({
    queryKey: ['/api/packages', id],
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['/api/packages', id, 'reviews'],
  });

  const { data: relatedPackages } = useQuery({
    queryKey: ['/api/packages', { category: packageData?.category }],
    enabled: !!packageData?.category,
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Your adventure booking has been successfully confirmed.",
      });
      setBookingData({
        guestCount: 2,
        departureDate: "",
        specialRequests: "",
        paymentMethod: "",
      });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", `/api/packages/${id}/reviews`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your experience.",
      });
      setReviewData({ rating: 5, title: "", comment: "" });
    },
    onError: () => {
      toast({
        title: "Review Failed",
        description: "There was an error submitting your review.",
        variant: "destructive",
      });
    },
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageData) return;

    const booking = {
      ...bookingData,
      packageId: packageData.id,
      userId: "temp-user-id", // In real app, get from auth context
      totalPrice: calculateTotal().toString(),
      departureDate: new Date(bookingData.departureDate),
    };

    bookingMutation.mutate(booking);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reviewMutation.mutate({
      ...reviewData,
      userId: "temp-user-id",
    });
  };

  const calculateTotal = () => {
    if (!packageData) return 0;
    const basePrice = parseFloat(packageData.price);
    const guestMultiplier = bookingData.guestCount;
    const insurance = 99;
    const taxes = Math.floor(basePrice * 0.1);
    return (basePrice * guestMultiplier) + insurance + taxes;
  };

  if (packageLoading) {
    return (
      <div className="min-h-screen bg-warm-white">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-warm-white">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-8">The package you're looking for doesn't exist.</p>
            <Link href="/packages">
              <Button className="bg-forest hover:bg-green-800 text-white">
                Back to Packages
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredRelatedPackages = relatedPackages?.filter((pkg: any) => pkg.id !== packageData.id).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-6">
            <Link href="/packages">
              <Button variant="ghost" className="text-gray-600 hover:text-forest" data-testid="back-to-packages">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Packages
              </Button>
            </Link>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
            <img
              src={packageData.imageUrl}
              alt={packageData.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Badge 
                  className={`${categoryColors[packageData.category as keyof typeof categoryColors]} bg-white/20 backdrop-blur-sm`}
                  data-testid="package-category"
                >
                  {packageData.category.charAt(0).toUpperCase() + packageData.category.slice(1)}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-sunset fill-current mr-1" />
                  <span className="font-medium">{packageData.rating} ({packageData.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-2" data-testid="package-title">
                {packageData.title}
              </h1>
              {packageData.destination && (
                <div className="flex items-center text-white/90">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{packageData.destination.name}, {packageData.destination.country}</span>
                </div>
              )}
            </div>
            <div className="absolute top-8 right-8 flex gap-2">
              <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30" data-testid="share-package">
                <Share2 className="h-5 w-5 text-white" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30" data-testid="favorite-package">
                <Heart className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8" data-testid="package-tabs">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-4">
                        Package Details
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {packageData.duration} Days
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            Max {packageData.maxGuests} Guests
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {packageData.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>What to Expect</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Clock className="h-4 w-4 text-forest" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Duration</h4>
                            <p className="text-gray-600">{packageData.duration} days of unforgettable adventure</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Users className="h-4 w-4 text-ocean" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Group Size</h4>
                            <p className="text-gray-600">Maximum {packageData.maxGuests} travelers for personalized experience</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="itinerary" className="space-y-4">
                  {packageData.itinerary?.map((day: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full bg-sunset text-white flex items-center justify-center font-bold flex-shrink-0">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-poppins font-semibold text-xl mb-2" data-testid={`itinerary-day-${day.day}`}>
                              Day {day.day}: {day.title}
                            </h3>
                            <p className="text-gray-700">{day.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )) || (
                    <Card>
                      <CardContent className="p-6 text-center text-gray-500">
                        Detailed itinerary will be provided upon booking confirmation.
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="inclusions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>What's Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {packageData.inclusions?.map((inclusion: string, index: number) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-forest flex-shrink-0" />
                            <span className="text-gray-700">{inclusion}</span>
                          </div>
                        )) || (
                          <p className="text-gray-500">Inclusions will be detailed upon booking.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-6">
                  {/* Review Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Share Your Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleReviewSubmit} className="space-y-4" data-testid="review-form">
                        <div>
                          <Label htmlFor="rating">Rating</Label>
                          <Select value={reviewData.rating.toString()} onValueChange={(value) => setReviewData(prev => ({ ...prev, rating: parseInt(value) }))}>
                            <SelectTrigger data-testid="review-rating">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[5, 4, 3, 2, 1].map((rating) => (
                                <SelectItem key={rating} value={rating.toString()}>
                                  {rating} Star{rating !== 1 ? 's' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="review-title">Title</Label>
                          <Input
                            id="review-title"
                            value={reviewData.title}
                            onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Summarize your experience"
                            data-testid="review-title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="review-comment">Your Review</Label>
                          <Textarea
                            id="review-comment"
                            value={reviewData.comment}
                            onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                            placeholder="Tell us about your experience..."
                            rows={4}
                            data-testid="review-comment"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          disabled={reviewMutation.isPending}
                          className="bg-forest hover:bg-green-800 text-white"
                          data-testid="submit-review"
                        >
                          {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Reviews List */}
                  {reviewsLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                          <CardContent className="p-6 space-y-3">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : reviews && reviews.length > 0 ? (
                    <div className="space-y-4" data-testid="reviews-list">
                      {reviews.map((review: any) => (
                        <Card key={review.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-forest to-ocean rounded-full flex items-center justify-center text-white font-semibold">
                                {review.userId?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating ? 'text-sunset fill-current' : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                {review.title && (
                                  <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
                                )}
                                <p className="text-gray-700">{review.comment}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center text-gray-500">
                        No reviews yet. Be the first to share your experience!
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Book This Package</span>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-forest" data-testid="package-price">
                          ${packageData.price}
                        </div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBooking} className="space-y-4" data-testid="package-booking-form">
                      <div>
                        <Label htmlFor="guests">Number of Travelers</Label>
                        <Select 
                          value={bookingData.guestCount.toString()} 
                          onValueChange={(value) => setBookingData(prev => ({ ...prev, guestCount: parseInt(value) }))}
                        >
                          <SelectTrigger data-testid="booking-guests">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: packageData.maxGuests }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1} Guest{i !== 0 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="departure">Departure Date</Label>
                        <Input
                          id="departure"
                          type="date"
                          value={bookingData.departureDate}
                          onChange={(e) => setBookingData(prev => ({ ...prev, departureDate: e.target.value }))}
                          className="focus:border-forest"
                          data-testid="booking-departure"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="requests">Special Requests</Label>
                        <Textarea
                          id="requests"
                          value={bookingData.specialRequests}
                          onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                          placeholder="Any special requirements..."
                          rows={3}
                          data-testid="booking-requests"
                        />
                      </div>

                      {/* Price Breakdown */}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Package ({bookingData.guestCount} guests)</span>
                          <span>${(parseFloat(packageData.price) * bookingData.guestCount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Travel Insurance</span>
                          <span>$99</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Taxes & Fees</span>
                          <span>${Math.floor(parseFloat(packageData.price) * 0.1)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>Total</span>
                          <span className="text-forest" data-testid="booking-total">
                            ${calculateTotal().toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={bookingMutation.isPending}
                        className="w-full bg-forest hover:bg-green-800 text-white py-3 text-lg font-semibold"
                        data-testid="book-package"
                      >
                        <Lock className="mr-2 h-5 w-5" />
                        {bookingMutation.isPending ? "Processing..." : `Book Now - $${calculateTotal().toLocaleString()}`}
                      </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t text-center space-y-2">
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-1" />
                          <span>Secure Payment</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Free cancellation up to 48 hours before departure
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="mt-6">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-4">Need Help?</h3>
                    <p className="text-gray-600 mb-4">
                      Our travel experts are here to help you plan the perfect adventure.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" data-testid="contact-phone">
                        <Phone className="h-4 w-4 mr-2" />
                        +1 (555) 123-4567
                      </Button>
                      <Button variant="outline" className="w-full" data-testid="contact-email">
                        <Mail className="h-4 w-4 mr-2" />
                        hello@wanderlust.com
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {filteredRelatedPackages.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-gray-800 mb-4">
                Similar Adventures
              </h2>
              <p className="text-xl text-gray-600">
                Discover more amazing {packageData.category} experiences
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="related-packages">
              {filteredRelatedPackages.map((pkg: any) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
