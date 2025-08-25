import type { Destination, Package, Review } from "@shared/schema";

// Utility functions for data formatting and manipulation
export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return numPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatDuration = (days: number): string => {
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  
  if (weeks === 1 && remainingDays === 0) return '1 week';
  if (remainingDays === 0) return `${weeks} weeks`;
  if (weeks === 1) return `1 week, ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  return `${weeks} weeks, ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
};

export const formatRating = (rating: string | number): number => {
  const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  return Math.round(numRating * 10) / 10;
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const calculateTotalPrice = (basePrice: string | number, guests: number, addOns: { insurance?: boolean, taxes?: boolean } = {}): number => {
  const numPrice = typeof basePrice === 'string' ? parseFloat(basePrice) : basePrice;
  let total = numPrice * guests;
  
  if (addOns.insurance) {
    total += 99; // Fixed insurance fee
  }
  
  if (addOns.taxes) {
    total += Math.floor(numPrice * 0.1); // 10% taxes
  }
  
  return total;
};

export const getCategoryColor = (category: string): string => {
  const colors = {
    adventure: 'terracotta',
    cultural: 'ocean',
    luxury: 'sunset',
    family: 'forest',
  };
  return colors[category as keyof typeof colors] || 'gray';
};

export const getCategoryBadgeClass = (category: string): string => {
  const classes = {
    adventure: 'bg-terracotta/10 text-terracotta',
    cultural: 'bg-ocean/10 text-ocean',
    luxury: 'bg-sunset/10 text-sunset',
    family: 'bg-forest/10 text-forest',
  };
  return classes[category as keyof typeof classes] || 'bg-gray-100 text-gray-600';
};

export const getDifficultyLevel = (category: string, duration: number): 'Easy' | 'Moderate' | 'Challenging' => {
  if (category === 'luxury' || category === 'family') return 'Easy';
  if (duration <= 7) return 'Moderate';
  if (category === 'adventure' && duration > 10) return 'Challenging';
  return 'Moderate';
};

export const getSeasonRecommendation = (destination?: Destination): string => {
  if (!destination) return 'Year-round';
  
  // Simple logic based on region
  const region = destination.region.toLowerCase();
  if (region.includes('asia')) return 'Oct-Mar (Dry Season)';
  if (region.includes('europe')) return 'May-Sep (Summer)';
  if (region.includes('africa')) return 'Jun-Oct (Dry Season)';
  if (region.includes('america')) return 'Apr-Oct (Spring-Fall)';
  return 'Year-round';
};

export const filterPackagesBySearchParams = (
  packages: Package[], 
  params: {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    category?: string;
    priceRange?: string;
    duration?: string;
  }
) => {
  return packages.filter(pkg => {
    // Category filter
    if (params.category && params.category !== 'all' && pkg.category !== params.category) {
      return false;
    }
    
    // Guest capacity filter
    if (params.guests && pkg.maxGuests < params.guests) {
      return false;
    }
    
    // Price range filter
    if (params.priceRange && params.priceRange !== 'all') {
      const price = parseFloat(pkg.price);
      switch (params.priceRange) {
        case 'budget':
          if (price >= 2000) return false;
          break;
        case 'mid':
          if (price < 2000 || price >= 4000) return false;
          break;
        case 'luxury':
          if (price < 4000) return false;
          break;
      }
    }
    
    // Duration filter
    if (params.duration && params.duration !== 'all') {
      switch (params.duration) {
        case 'short':
          if (pkg.duration > 7) return false;
          break;
        case 'medium':
          if (pkg.duration <= 7 || pkg.duration > 14) return false;
          break;
        case 'long':
          if (pkg.duration <= 14) return false;
          break;
      }
    }
    
    return true;
  });
};

export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const generateShareUrl = (packageId: string, packageTitle: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/packages/${packageId}`;
};

export const generateShareText = (packageTitle: string, price: string): string => {
  return `Check out this amazing travel package: ${packageTitle} starting from $${price}! 🌍✈️`;
};

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today && !isNaN(date.getTime());
};

export const getDaysUntilDeparture = (departureDate: string | Date): number => {
  const departure = typeof departureDate === 'string' ? new Date(departureDate) : departureDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  departure.setHours(0, 0, 0, 0);
  
  const diffTime = departure.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getBookingStatus = (createdAt: string | Date, departureDate: string | Date): 'confirmed' | 'upcoming' | 'completed' | 'cancelled' => {
  const departure = typeof departureDate === 'string' ? new Date(departureDate) : departureDate;
  const today = new Date();
  
  if (departure < today) return 'completed';
  return 'confirmed';
};

// Mock data for development/testing - only use if explicitly needed
export const MOCK_TESTIMONIALS = [
  {
    id: '1',
    rating: 5,
    content: "An incredible journey that exceeded all expectations. The attention to detail and local expertise made this trip unforgettable.",
    author: "Sarah Johnson",
    location: "New York, USA",
    packageTitle: "Greek Islands Discovery",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: '2',
    rating: 5,
    content: "Professional guides, stunning locations, and perfect organization. This adventure changed my perspective on travel.",
    author: "Miguel Rodriguez",
    location: "Barcelona, Spain",
    packageTitle: "Patagonia Trekking",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: '3',
    rating: 5,
    content: "The luxury service and breathtaking destinations made our honeymoon absolutely perfect. Highly recommended!",
    author: "Emily Chen",
    location: "San Francisco, USA", 
    packageTitle: "Maldives Paradise Retreat",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

export const REGIONS = [
  'Asia',
  'Europe', 
  'Africa',
  'North America',
  'South America',
  'Oceania',
  'Middle East',
] as const;

export const CATEGORIES = [
  'adventure',
  'cultural',
  'luxury',
  'family',
  'wellness',
  'wildlife',
] as const;

export const PRICE_RANGES = [
  { label: 'Under $2,000', value: 'budget' },
  { label: '$2,000 - $4,000', value: 'mid' },
  { label: 'Over $4,000', value: 'luxury' },
] as const;

export const DURATION_RANGES = [
  { label: '1-7 Days', value: 'short' },
  { label: '8-14 Days', value: 'medium' },
  { label: '15+ Days', value: 'long' },
] as const;
