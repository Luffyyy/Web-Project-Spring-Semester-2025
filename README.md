This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

NextFit is a fitness application that provides exercise recommendations, workout routines, and AI-powered fitness coaching through an integrated chat assistant.

## Getting Started

### Prerequisites

Before running the application, you need to set up the required environment variables.

### Environment Configuration

Create a `.env.local` file in the root directory and configure the following variables:

```bash
# MongoDB connection string
MONGODB_URI=your_mongodb_connection_string_here

# Google Gemini AI API key for the chat assistant
GEMINI_API_KEY=your_gemini_api_key_here

# Gmail credentials for password reset emails
GMAIL_EMAIL=your_gmail_address_here
GMAIL_APP_PASS=your_gmail_app_specific_password_here

# Site URL for password reset links
SITE_URL=http://localhost:3000
```

See `.env.local.example` for a template with all required variables.

### Required Services

- **MongoDB Atlas**: Database for storing users, exercises, and routines
- **Google Gemini AI**: AI chat assistant for fitness recommendations
- **Gmail SMTP**: Email service for password reset functionality

### Installation and Setup

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- **Exercise Database**: Browse and search fitness exercises with difficulty levels and muscle group targeting
- **User Profiles**: Personalized profiles with BMI calculation and muscle group preferences
- **Workout Routines**: Create, edit, and manage custom workout routines
- **AI Chat Assistant**: Powered by Google Gemini AI for exercise recommendations and routine creation
- **Favorites System**: Save and organize favorite exercises
- **YouTube Integration**: Exercise demonstration videos with automatic thumbnail extraction
- **User Authentication**: Registration, login, and password reset functionality

## Project Structure

- `app/` - Next.js app directory with pages and server actions
- `components/` - Reusable React components
- `lib/` - Utility functions and database configuration
- `public/` - Static assets including muscle group images

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
