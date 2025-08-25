import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertBookingSchema, insertReviewSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Destinations API
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/featured", async (req, res) => {
    try {
      const destinations = await storage.getFeaturedDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  // Packages API
  app.get("/api/packages", async (req, res) => {
    try {
      const { category, destination } = req.query;
      const filters = {
        category: category as string,
        destination: destination as string,
      };
      const packages = await storage.getPackages(filters);
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  app.get("/api/packages/featured", async (req, res) => {
    try {
      const packages = await storage.getFeaturedPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured packages" });
    }
  });

  app.get("/api/packages/:id", async (req, res) => {
    try {
      const packageData = await storage.getPackage(req.params.id);
      if (!packageData) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(packageData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });

  // Bookings API
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const { userId } = req.query;
      const bookings = await storage.getBookings(userId as string);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  // Reviews API
  app.get("/api/packages/:packageId/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews(req.params.packageId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/packages/:packageId/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse({
        ...req.body,
        packageId: req.params.packageId,
      });
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Search API
  app.get("/api/search", async (req, res) => {
    try {
      const { destination, checkIn, checkOut, guests, category } = req.query;
      
      // For now, return filtered packages based on available filters
      const filters: any = {};
      if (category) filters.category = category as string;
      
      const packages = await storage.getPackages(filters);
      
      // In a real implementation, you would filter by dates, destination, etc.
      res.json({
        packages,
        totalResults: packages.length,
        searchParams: { destination, checkIn, checkOut, guests, category }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to perform search" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
