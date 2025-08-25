# Wanderlust Travel Platform

## Overview

Wanderlust is a modern travel and tourism website that provides travelers with an immersive platform to discover destinations, browse travel packages, and book adventures. The application features a comprehensive travel booking system with destinations management, package categorization, user reviews, and a streamlined booking workflow. Built with a full-stack TypeScript architecture, it emphasizes modern design principles with nature-inspired themes and responsive layouts for optimal user experience across all devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management with caching and synchronization
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom design system featuring nature-inspired color palette (forest, ocean, terracotta, sunset themes)
- **Typography**: Multi-font system using Poppins for headings, Inter for body text, and Playfair Display for elegant accents

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture with organized route handlers
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development**: Hot reloading with Vite integration and comprehensive logging middleware

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Cloud Provider**: Neon Database serverless PostgreSQL hosting
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Data Layer**: In-memory storage implementation with interface for easy database swapping
- **Type Safety**: Shared schema types between frontend and backend using Zod validation

### Authentication and Authorization
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage
- **Security**: Prepared for user authentication with secure session handling
- **Data Validation**: Zod schemas for runtime type checking and API request validation

### Key Features Architecture
- **Destination Management**: Comprehensive destination catalog with featured destinations, ratings, and regional categorization
- **Package System**: Travel packages with categorization (adventure, cultural, luxury, family), duration filters, and pricing tiers
- **Booking System**: Multi-step booking flow with guest management, date selection, and special requests
- **Review System**: User review and rating system for packages and destinations
- **Search and Filtering**: Advanced search capabilities with multiple filter criteria
- **Responsive Design**: Mobile-first approach with adaptive layouts for all screen sizes

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React plugin for Vite development environment
- **wouter**: Lightweight routing library for single-page applications
- **@tanstack/react-query**: Powerful data synchronization for React applications

### UI and Design System
- **@radix-ui/react-***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Type-safe variant creation for component styling
- **lucide-react**: Modern icon library with React components

### Database and Validation
- **drizzle-orm**: Type-safe SQL ORM for TypeScript with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL database client
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration package for Drizzle ORM and Zod validation

### Development and Build Tools
- **typescript**: Static type checking for JavaScript applications
- **vite**: Fast build tool and development server
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for Node.js

### Additional Utilities
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: Tiny, secure, URL-friendly unique string ID generator
- **embla-carousel-react**: Modern carousel component for React applications