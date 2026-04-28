# Nudge

> Stop Scrolling, Start Living. A premium habit-tracking experience designed to build positive behavioral momentum.

## The Problem
Most habit trackers are either overly complex, visually rigid, or feel like a chore. Behavioral change shouldn't be punitive. Nudge was built to explore how thoughtful interactions, psychological rewards, and a premium minimal UI can encourage users to actually stick to their goals.

## Features
- **Interactive Habit Cards:** Swipeable, tactile UI for engaging with daily goals effortlessly.
- **Progress Tracking:** A sleek dashboard providing visual feedback on your behavioral outcomes.
- **Secure Authentication:** Premium, seamless login flow powered by Supabase.
- **Modern, Responsive Design:** Carefully crafted for both mobile and desktop, ensuring a seamless experience anywhere.

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion
- **Backend/Database:** Supabase
- **Hosting/Deployment:** (Coming soon)

## Setup & Local Development

Follow these steps to run Nudge locally:

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd Nudgev6
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   - Copy the `.env.example` file to create your local `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and fill in your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=your_supabase_project_url_here
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Screenshots
*(Placeholder for high-fidelity screenshots of the Dashboard, Swipeable Cards, and Journey Screen)*

## Live Demo
*(Placeholder for live demo link)*

## Why I Built It
As a product designer, I wanted to create a tool that prioritizes user psychology and aesthetics above all else. Nudge is the intersection of premium design thinking and functional engineering—a proof of concept that habit tracking can be beautiful.
