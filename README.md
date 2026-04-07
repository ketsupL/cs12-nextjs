# CS12 - Next.js

This repository contains the Next.js frontend for the ARAbian CRM platform.

## Setup & Installation

 - Run `cp .env.example .env`
 - Follow `cs12-laravel` instructions.

This Next.js application is containerized and orchestrated alongside the Laravel backend. **You do not need to start this frontend independently** if you are using the full-stack Docker environment.

## Repository Structure

```text
cs12-nextjs/
├── docker/                             # Containerization configurations
│   └── nextjs/Dockerfile               # Multi-stage production build instructions
├── public/                             # Static public assets
├── src/
│   ├── app/                            # Next.js App Router (Pages & Routing)
│   │   ├── layout.tsx                  # Root application layout
│   │   ├── globals.css                 # Global Tailwind and CSS variables
│   │   ├── (auth)/dashboard/           # Protected Routes (Requires Login)
│   │   │   ├── page.tsx                # Main dashboard page
│   │   │   ├── customers/              # Customer listing and detail pages
│   │   │   ├── invoices/               # Invoice management pages
│   │   │   ├── jobs/                   # Job page
│   │   │   ├── leads/                  # Lead page
│   │   │   └── estimates/              # Estimate page
│   │   └── (public)/                   # Public Routes
│   │       └── (login|register)/       # Auth forms (LoginForm, SignUpForm)
│   │
│   ├── components/                     # Modular React Components
│   │   ├── auth/                       # Auth-specific UI (Logout button)
│   │   ├── customers/                  # Customer domain UI (Forms, Tables, Detail Tabs)
│   │   │   ├── customer-detail/        # Single Customer views (Stats, History, Sub-tabs)
│   │   │   └── ...                     # CRUD forms (Add, Edit, Delete, Batch)
│   │   ├── leads/                      # Lead domain UI (Conversion flows, Modals)
│   │   ├── invoices/                   # Invoice domain UI
│   │   ├── estimates/                  # Estimate domain UI
│   │   ├── jobs/                       # Job domain UI
│   │   ├── layouts/                    # Structural UI components
│   │   │   └── admin/                  # Sidebar, Header, and User Navigation
│   │   ├── providers/                  # Global context providers (ToastProvider)
│   │   └── ui/                         # Base shadcn/ui primitive components
│   │
│   ├── hooks/                          # Custom React Hooks for State/Data
│   │   ├── useDebounce.ts              # Utility hook for delaying search inputs
│   │   └── use[Domain].ts              # Domain-specific logic (Customers, Leads, etc.)
│   │
│   ├── lib/                            # Shared Core Libraries
│   │   ├── axios.ts                    # Client-side Axios instance
│   │   ├── axios.server.ts             # Server-side Axios (handles SSR auth cookies)
│   │   └── utils.ts                    # Common tailwind/class-merging utilities
│   │
│   ├── resources/                      # Internal App Resources
│   │   └── images/websiteIcon.svg      # Branding assets
│   │
│   ├── services/                       # Data Access Layer (API Calls)
│   │   ├── auth.ts                     # Login/Register API endpoints
│   │   └── [domain].ts                 # Entity-specific API calls
│   │
│   ├── types/                          # TypeScript Definitions
│   │   └── [domain].ts                 # Entity models matching the Laravel backend
│   │
│   └── utils/                          # Pure Helper Functions
│       ├── date.ts                     # Date formatting logic
│       ├── promise.ts                  # Async/Promise utilities
│       └── response.ts                 # API response formatters
│
├── .env                                # Environment variables (ignored in git)
├── .gitignore                          # Git tracking exclusions
├── components.json                     # shadcn/ui configuration
├── eslint.config.mjs                   # ESLint rules
├── next.config.ts                      # Next.js compiler and build settings
├── package.json                        # Node dependencies and scripts
├── postcss.config.mjs                  # PostCSS / Tailwind processing
└── tsconfig.json                       # TypeScript compiler settings
