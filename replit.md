# BEC Vision - Gamified Recruitment & Project Management Platform

## Overview

BEC Vision is a comprehensive gamified platform for the Business and English Club (BEC) at FTU2, established since 2005. The system provides a complete recruitment journey and project management experience with tree-based KPI tracking for business communication and English language development. The platform guides candidates through all BEC procedures from application to project execution with visual progress tracking and gamification elements focused on business leadership and English proficiency skills.

## User Preferences

Preferred communication style: Simple, everyday language.
Visual Design: Red velvet and white theme with owl mascot for BEC branding.
Design Theme: Red velvet and white color scheme reflecting BEC's brand identity.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and production builds

The frontend follows a component-based architecture with reusable UI components and pages organized by feature areas (dashboard, achievements, analytics, learning paths).

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API endpoints with JSON responses

The backend uses a layered architecture with routes, storage abstraction, and shared schema definitions between client and server.

### Build & Development
- **Development**: Vite dev server with HMR for frontend, tsx for backend compilation
- **Production**: Vite build + esbuild for server bundling
- **Deployment**: Single-server deployment with static file serving

## Key Components

### Database Schema
The application uses a comprehensive schema for tracking learning progress:

- **Users**: Core user data with XP, level, streak tracking
- **Projects**: Multi-stage learning projects with progress tracking
- **Project Stages**: Individual milestones within projects
- **Skills**: User skill proficiency tracking with categories and levels
- **Achievements**: Gamification system with unlockable badges
- **Learning Paths**: Structured learning sequences
- **Activities**: User activity logging for analytics

### UI Components
Built on shadcn/ui foundation with custom components for:

- **Dashboard**: Welcome section, project cards, skill development tracking
- **Progress Tracking**: XP bars, level progression, streak counters
- **Analytics**: Performance metrics, growth charts, statistics
- **Mobile-First**: Responsive design with dedicated mobile tab bar
- **Achievements**: Badge system with categorized accomplishments
- **Mascot System**: Interactive owl mascot with contextual speech bubbles for guidance and encouragement
- **BEC Branding**: Red velvet and white theme with graduation cap-wearing owl mascot

### Storage Layer
Implements a storage abstraction pattern:

- **Interface**: IStorage defining all database operations
- **Implementation**: Currently uses in-memory storage (MemStorage) 
- **Database**: Configured for PostgreSQL with Drizzle migrations
- **Scalability**: Abstract interface allows easy migration to different storage backends

## Data Flow

1. **User Interaction**: Users interact with React components
2. **State Management**: TanStack Query handles server state and caching
3. **API Requests**: HTTP requests to Express.js REST endpoints
4. **Data Processing**: Express routes validate and process requests
5. **Storage Operations**: Storage layer abstracts database interactions
6. **Response**: JSON responses flow back through the stack
7. **UI Updates**: React components re-render with new data

### Authentication Flow
Currently uses session-based authentication with user ID routing, though full authentication implementation appears to be in progress.

## External Dependencies

### Frontend Dependencies
- **UI Framework**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation
- **Animations**: Class Variance Authority for component variants

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: Drizzle ORM with Zod integration for type safety
- **Session Storage**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx with file watching for automatic restarts
- **Database**: Drizzle migrations with push/pull capabilities
- **Environment**: Replit-optimized with development banners and error overlays

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server to `dist/index.js`
- **Static Serving**: Express serves built frontend files
- **Database**: Uses environment variable for DATABASE_URL connection

### Configuration
- **TypeScript**: Shared tsconfig.json for client, server, and shared code
- **Path Aliases**: Configured for clean imports (@/, @shared/)
- **ESM**: Full ES module support throughout the stack
- **Environment**: Supports both development and production modes

The application is designed to be deployed as a single Node.js server that serves both the API and static frontend files, making it suitable for platforms like Replit, Vercel, or traditional VPS hosting.