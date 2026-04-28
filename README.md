# Nudge 2.0

## What problem it solves
Nudge 2.0 is designed to help users build better habits and break bad ones through a gentle, interactive, and visually engaging experience. It makes behavioral changes feel less like a chore and more like a rewarding journey.

## Features
- **Interactive Habit Cards:** Swipeable and engaging UI for interacting with your daily goals.
- **Progress Tracking:** A dashboard that provides visual feedback on your outcomes.
- **Secure Authentication:** User data is securely managed through Supabase.
- **Modern, Responsive UI:** Built for both mobile and desktop experiences.

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase
- **Hosting/Deployment:** (Coming soon)

## Setup Steps

Follow these steps to run Nudge 2.0 locally:

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
   - Open `.env` and fill in your actual Supabase credentials:
     ```env
     VITE_SUPABASE_URL=your_supabase_project_url_here
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Screenshots
*(Placeholder for screenshots of the Dashboard, Swipeable Cards, and Journey Screen)*

## Live Demo
*(Placeholder for live demo link)*

## Why I built it
As a designer, I wanted to create a habit-tracking experience that prioritizes user psychology and aesthetics. Most habit trackers are overly complex or visually rigid. Nudge 2.0 was built to explore how thoughtful interactions and minimal UI can encourage positive behavioral momentum.
