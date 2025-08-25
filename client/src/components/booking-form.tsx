import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, CreditCard } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function BookingForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    packageId: "pkg-2", // Default to Greek Islands
    guestCount: 2,
    departureDate: "",
    specialRequests: "",
    paymentMethod: "",
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
      // Reset form
      setFormData({
        packageId: "pkg-2",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingData = {
      ...formData,
      userId: "temp-user-id", // In real app, get from auth context
      totalPrice: "5996.00", // Calculate based on package and guests
      departureDate: new Date(formData.departureDate),
    };
    
    bookingMutation.mutate(bookingData);
  };

  const calculateTotal = () => {
    const basePrice = 2799; // Greek Islands base price
    const guestMultiplier = formData.guestCount;
    const insurance = 99;
    const taxes = 299;
    return (basePrice * guestMultiplier) + insurance + taxes;
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8">
      <h3 className="font-poppins font-semibold text-2xl text-center mb-8">Book Your Adventure</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6" data-testid="booking-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="package" className="block text-sm font-semibold text-gray-700 mb-2">
              Selected Package
            </Label>
            <Select value={formData.packageId} onValueChange={(value) => setFormData(prev => ({ ...prev, packageId: value }))}>
              <SelectTrigger data-testid="select-package">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pkg-2">Greek Islands Discovery - $2,799</SelectItem>
                <SelectItem value="pkg-3">Maldives Paradise Retreat - $4,999</SelectItem>
                <SelectItem value="pkg-1">Colorado River Expedition - $1,899</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Travelers
            </Label>
            <Select value={formData.guestCount.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, guestCount: parseInt(value) }))}>
              <SelectTrigger data-testid="select-travelers">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Adult</SelectItem>
                <SelectItem value="2">2 Adults</SelectItem>
                <SelectItem value="3">2 Adults, 1 Child</SelectItem>
                <SelectItem value="4">2 Adults, 2 Children</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="departure" className="block text-sm font-semibold text-gray-700 mb-2">
              Departure Date
            </Label>
            <Input
              id="departure"
              type="date"
              value={formData.departureDate}
              onChange={(e) => setFormData(prev => ({ ...prev, departureDate: e.target.value }))}
              className="border border-gray-300 focus:border-forest"
              data-testid="input-departure-date"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="requests" className="block text-sm font-semibold text-gray-700 mb-2">
              Special Requests
            </Label>
            <Select value={formData.specialRequests} onValueChange={(value) => setFormData(prev => ({ ...prev, specialRequests: value }))}>
              <SelectTrigger data-testid="select-special-requests">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="dietary">Dietary Requirements</SelectItem>
                <SelectItem value="accessibility">Accessibility Needs</SelectItem>
                <SelectItem value="anniversary">Anniversary Celebration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div>
          <Label className="block text-sm font-semibold text-gray-700 mb-4">Payment Method</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['visa', 'mastercard', 'paypal', 'apple-pay'].map((method) => (
              <label key={method} className="flex items-center justify-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-forest transition-colors">
                <input 
                  type="radio" 
                  name="payment" 
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  className="sr-only" 
                />
                <CreditCard className="h-8 w-8 text-gray-600" />
              </label>
            ))}
          </div>
        </div>
        
        {/* Price Summary */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Greek Islands Discovery ({formData.guestCount} adults)</span>
              <span>${(2799 * formData.guestCount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Travel Insurance</span>
              <span>$99</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Taxes & Fees</span>
              <span>$299</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-forest" data-testid="booking-total">
                  ${calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          type="submit" 
          disabled={bookingMutation.isPending}
          className="w-full bg-forest text-white py-4 text-lg font-semibold hover:bg-green-800 transition-colors"
          data-testid="submit-booking"
        >
          <Lock className="mr-2 h-5 w-5" />
          {bookingMutation.isPending ? "Processing..." : `Secure Booking - $${calculateTotal().toLocaleString()}`}
        </Button>
      </form>
    </div>
  );
}
