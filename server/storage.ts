import { 
  type User, 
  type InsertUser, 
  type Destination, 
  type InsertDestination,
  type Package,
  type InsertPackage,
  type Booking,
  type InsertBooking,
  type Review,
  type InsertReview,
  type PackageWithDestination
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getFeaturedDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Packages
  getPackages(filters?: {category?: string, destination?: string}): Promise<PackageWithDestination[]>;
  getFeaturedPackages(): Promise<PackageWithDestination[]>;
  getPackage(id: string): Promise<PackageWithDestination | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  
  // Bookings
  getBookings(userId?: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  // Reviews
  getReviews(packageId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private destinations: Map<string, Destination>;
  private packages: Map<string, Package>;
  private bookings: Map<string, Booking>;
  private reviews: Map<string, Review>;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.packages = new Map();
    this.bookings = new Map();
    this.reviews = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed destinations
    const destinations: Destination[] = [
      {
        id: "dest-1",
        name: "Maldives",
        country: "Maldives",
        region: "Asia",
        description: "Tropical paradise with crystal clear waters and pristine beaches",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        priceFrom: "2899",
        rating: "4.9",
        reviewCount: 2100,
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "dest-2",
        name: "Swiss Alps",
        country: "Switzerland",
        region: "Europe",
        description: "Majestic mountain peaks and alpine adventures",
        imageUrl: "https://pixabay.com/get/g9b9e03f78cd89e14db484c867e720068c21d17fc8c74e2c1d0ede2ee94f266c05ebcc9651eb33890de6bf03a08ce46c367b8d7d34cb2637b65e845aee639b67b_1280.jpg",
        priceFrom: "1599",
        rating: "4.8",
        reviewCount: 1500,
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "dest-3",
        name: "Kyoto",
        country: "Japan",
        region: "Asia",
        description: "Ancient temples and traditional Japanese culture",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        priceFrom: "1299",
        rating: "4.7",
        reviewCount: 987,
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "dest-4",
        name: "Kenya",
        country: "Kenya",
        region: "Africa",
        description: "African safari adventure with incredible wildlife",
        imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        priceFrom: "3499",
        rating: "4.9",
        reviewCount: 756,
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "dest-5",
        name: "Machu Picchu",
        country: "Peru",
        region: "South America",
        description: "Ancient Incan ruins in the breathtaking Andes",
        imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        priceFrom: "1899",
        rating: "4.8",
        reviewCount: 1200,
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "dest-6",
        name: "Iceland",
        country: "Iceland",
        region: "Europe",
        description: "Northern lights and dramatic volcanic landscapes",
        imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        priceFrom: "2199",
        rating: "4.9",
        reviewCount: 892,
        featured: true,
        createdAt: new Date(),
      }
    ];

    destinations.forEach(dest => this.destinations.set(dest.id, dest));

    // Seed packages
    const packages: Package[] = [
      {
        id: "pkg-1",
        title: "Colorado River Expedition",
        description: "5-day white water rafting and camping adventure through the Grand Canyon",
        destinationId: null,
        category: "adventure",
        duration: 5,
        maxGuests: 12,
        price: "1899",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        rating: "4.8",
        reviewCount: 124,
        inclusions: ["Professional guide", "All equipment", "Camping gear", "Meals"],
        itinerary: [
          { day: 1, title: "Arrival & Setup", description: "Meet your guide and set up camp" },
          { day: 2, title: "Rapids Training", description: "Learn rafting techniques" },
          { day: 3, title: "Canyon Adventure", description: "Navigate exciting rapids" },
          { day: 4, title: "Wilderness Camping", description: "Camp under the stars" },
          { day: 5, title: "Final Rapids", description: "Complete the expedition" }
        ],
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "pkg-2",
        title: "Greek Islands Discovery",
        description: "10-day cultural journey through Santorini, Mykonos, and Crete with local guides",
        destinationId: null,
        category: "cultural",
        duration: 10,
        maxGuests: 18,
        price: "2799",
        imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        rating: "4.9",
        reviewCount: 89,
        inclusions: ["Boutique hotels", "Local guides", "Island transfers", "Traditional meals"],
        itinerary: [
          { day: 1, title: "Athens Arrival", description: "Explore the Acropolis" },
          { day: 2, title: "Santorini", description: "Famous blue domes and sunset" },
          { day: 3, title: "Wine Tasting", description: "Local vineyard tours" },
          { day: 4, title: "Mykonos", description: "Charming windmills and beaches" },
          { day: 5, title: "Crete Adventure", description: "Minoan palace exploration" }
        ],
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "pkg-3",
        title: "Maldives Paradise Retreat",
        description: "7-day luxury escape in overwater villas with private butler service",
        destinationId: "dest-1",
        category: "luxury",
        duration: 7,
        maxGuests: 2,
        price: "4999",
        imageUrl: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        rating: "5.0",
        reviewCount: 67,
        inclusions: ["Overwater villa", "Private butler", "Spa treatments", "Fine dining"],
        itinerary: [
          { day: 1, title: "Arrival", description: "Private seaplane transfer" },
          { day: 2, title: "Spa Day", description: "Full day wellness treatments" },
          { day: 3, title: "Snorkeling", description: "Explore coral reefs" },
          { day: 4, title: "Sunset Cruise", description: "Private yacht experience" },
          { day: 5, title: "Island Hopping", description: "Visit local islands" }
        ],
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "pkg-4",
        title: "Tanzania Family Safari",
        description: "8-day family-friendly safari with expert guides and comfortable lodges",
        destinationId: "dest-4",
        category: "family",
        duration: 8,
        maxGuests: 8,
        price: "3299",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        rating: "4.7",
        reviewCount: 156,
        inclusions: ["Safari vehicle", "Expert guide", "Luxury lodge", "All meals"],
        itinerary: [
          { day: 1, title: "Arrival", description: "Welcome to Tanzania" },
          { day: 2, title: "Serengeti", description: "Big Five wildlife viewing" },
          { day: 3, title: "Ngorongoro", description: "Crater exploration" },
          { day: 4, title: "Cultural Visit", description: "Maasai village experience" },
          { day: 5, title: "Game Drive", description: "Morning wildlife safari" }
        ],
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "pkg-5",
        title: "Patagonia Trekking",
        description: "12-day guided trekking adventure through Torres del Paine National Park",
        destinationId: null,
        category: "adventure",
        duration: 12,
        maxGuests: 10,
        price: "2599",
        imageUrl: "https://pixabay.com/get/gf7b0d7ac0e0a412fb9a005c17a0d52b0e31648749b19bc3b4451718366ffb1f4285db6c4180b6453fd7bf9d2d55c003d14c3896211bdfdc938bda3b5f0bfec45_1280.jpg",
        rating: "4.6",
        reviewCount: 203,
        inclusions: ["Trekking guide", "Camping equipment", "Meals", "Permits"],
        itinerary: [
          { day: 1, title: "Base Camp", description: "Equipment check and preparation" },
          { day: 2, title: "Torres Trek", description: "Iconic towers hike" },
          { day: 3, title: "French Valley", description: "Dramatic valley views" },
          { day: 4, title: "Grey Glacier", description: "Glacier boat tour" },
          { day: 5, title: "Wildlife Day", description: "Puma tracking expedition" }
        ],
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "pkg-6",
        title: "Buddhist Temples Tour",
        description: "14-day spiritual journey through ancient temples of Myanmar and Thailand",
        destinationId: null,
        category: "cultural",
        duration: 14,
        maxGuests: 15,
        price: "2199",
        imageUrl: "https://pixabay.com/get/g26eab73116eb381267a3be9174a17604e30b2c5d67c50a20586927149c01bf497b1827b8b550ec725924131350d4b960184074a5d8ca09e31251ea6d1de42961_1280.jpg",
        rating: "4.8",
        reviewCount: 94,
        inclusions: ["Temple guides", "Cultural experiences", "Traditional accommodation", "Vegetarian meals"],
        itinerary: [
          { day: 1, title: "Bangkok", description: "Golden temple visits" },
          { day: 2, title: "Meditation", description: "Morning meditation session" },
          { day: 3, title: "Chiang Mai", description: "Mountain temple trek" },
          { day: 4, title: "Myanmar", description: "Ancient Bagan temples" },
          { day: 5, title: "Spiritual Practice", description: "Buddhist ceremony participation" }
        ],
        featured: true,
        createdAt: new Date(),
      }
    ];

    packages.forEach(pkg => this.packages.set(pkg.id, pkg));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(dest => dest.featured);
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = randomUUID();
    const destination: Destination = { ...insertDestination, id, createdAt: new Date() };
    this.destinations.set(id, destination);
    return destination;
  }

  // Packages
  async getPackages(filters?: {category?: string, destination?: string}): Promise<PackageWithDestination[]> {
    let packages = Array.from(this.packages.values());
    
    if (filters?.category && filters.category !== 'all') {
      packages = packages.filter(pkg => pkg.category === filters.category);
    }
    
    if (filters?.destination) {
      packages = packages.filter(pkg => pkg.destinationId === filters.destination);
    }
    
    return packages.map(pkg => ({
      ...pkg,
      destination: pkg.destinationId ? this.destinations.get(pkg.destinationId) : undefined
    }));
  }

  async getFeaturedPackages(): Promise<PackageWithDestination[]> {
    const packages = Array.from(this.packages.values()).filter(pkg => pkg.featured);
    return packages.map(pkg => ({
      ...pkg,
      destination: pkg.destinationId ? this.destinations.get(pkg.destinationId) : undefined
    }));
  }

  async getPackage(id: string): Promise<PackageWithDestination | undefined> {
    const pkg = this.packages.get(id);
    if (!pkg) return undefined;
    
    return {
      ...pkg,
      destination: pkg.destinationId ? this.destinations.get(pkg.destinationId) : undefined
    };
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const id = randomUUID();
    const pkg: Package = { ...insertPackage, id, createdAt: new Date() };
    this.packages.set(id, pkg);
    return pkg;
  }

  // Bookings
  async getBookings(userId?: string): Promise<Booking[]> {
    const bookings = Array.from(this.bookings.values());
    return userId ? bookings.filter(booking => booking.userId === userId) : bookings;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { ...insertBooking, id, createdAt: new Date() };
    this.bookings.set(id, booking);
    return booking;
  }

  // Reviews
  async getReviews(packageId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.packageId === packageId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { ...insertReview, id, createdAt: new Date() };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
