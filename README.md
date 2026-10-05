# 🏆 APEX Multi-Sports Club Web Platform

A modern, responsive, and dynamic web platform for **APEX Sports Club**, built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (Database, Realtime & Auth)**.

---

## 🌟 Key Features

- **⚡ Modern Athletic UI/UX**: Clean & high-energy athletic design with responsive layouts and fluid transitions.
- **🏟️ Multi-Sport Academy Showcase**: Interactive discipline cards for Football, Cricket, Basketball, Badminton, Tennis, and Swimming.
- **🔴 Live Match Scoreboard**: Real-time score updates, live minute/over badges, and fixture schedule filtering.
- **🏆 Hall of Fame & Awards**: Dynamic trophy legacy showcase filterable by sport.
- **💳 Membership Plans**: Flexible Monthly & Annual pricing cards with a dynamic 20% discount calculator.
- **🛡️ Pro Coaches Roster**: Certifications, tactical specializations, and coach bios.
- **📸 Fullscreen Gallery Lightbox**: Filterable media gallery with keyboard navigation (`Esc`, `←`, `→`).
- **🔐 Supabase Authentication**: User sign-in, account creation, and session persistence.
- **⚙️ Club Manager CMS Dashboard (`/admin`)**:
  - Protected by admin authentication.
  - Live scoreboard editor with real-time updates to the homepage.
  - Post news, announcements, and tournament updates.
  - Add trophies and awards to the Hall of Fame.
  - View member registrations and trial booking requests.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Realtime, Row Level Security, Auth)

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/aflahtk001/club.git
cd club
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.local.example` to `.env.local` and add your Supabase credentials:
```bash
cp .env.local.example .env.local
```

Fill in your project keys in `.env.local`:
```ini
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Setup Supabase Database
1. Open your **Supabase Dashboard** > **SQL Editor**.
2. Run the SQL script located in [`supabase/schema.sql`](supabase/schema.sql).

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── admin/           # Admin CMS Dashboard & Staff Login Gate
│   │   ├── login/           # Member Sign In & Registration Page
│   │   ├── globals.css      # Custom Tailwind & Animation Styles
│   │   ├── icon.svg         # Club Trophy Favicon
│   │   ├── layout.tsx       # Root Layout with AuthProvider & Fonts
│   │   └── page.tsx         # Main Landing Page
│   ├── components/          # Modular UI Sections & Modals
│   ├── context/             # Supabase Auth Context & Hook
│   ├── data/                # Typed Fallback Data Models
│   ├── lib/                 # Supabase Client Initialization
│   └── services/            # Club Service Data Access Layer
├── supabase/
│   └── schema.sql           # Database Schema, RLS & Seed Data
├── package.json
└── tailwind.config.ts
```

---

## 📜 License
MIT License. Created for APEX Sports Club.
