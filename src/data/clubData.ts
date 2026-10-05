export interface SportItem {
  id: string;
  name: string;
  category: 'team' | 'racquet' | 'individual';
  badge: string;
  image: string;
  description: string;
  specs: { icon: string; text: string }[];
}

export interface FixtureItem {
  id: string;
  sport: 'football' | 'cricket' | 'basketball' | 'badminton';
  league: string;
  isLive: boolean;
  statusText: string;
  homeTeam: {
    name: string;
    rankOrDetail: string;
    score: string;
    iconType: string;
  };
  awayTeam: {
    name: string;
    rankOrDetail: string;
    score: string;
    iconType: string;
  };
  venue: string;
  footerText: string;
  highlightScorers?: string;
  actionText: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular?: boolean;
  features: { text: string; included: boolean }[];
}

export interface CoachItem {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  socials: { linkedin?: string; instagram?: string };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'tournaments' | 'training' | 'facilities';
  categoryLabel: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface MerchItem {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface AwardItem {
  id: string;
  title: string;
  sport: string;
  year: number;
  category: string;
  description: string;
  image?: string;
  badge?: string;
}

export const awardsData: AwardItem[] = [
  {
    id: 'award-1',
    title: 'State Premier Football League Champions',
    sport: 'Football',
    year: 2025,
    category: 'Championship',
    description: 'Apex Thunder FC clinched the State Premier Cup title with an undefeated 14-match season.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    badge: 'State Champions',
  },
  {
    id: 'award-2',
    title: 'National Inter-Club T20 Trophy',
    sport: 'Cricket',
    year: 2024,
    category: 'Championship',
    description: 'Apex Royals CC defeated Metro Spartans in a thrilling final to secure the prestigious club trophy.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    badge: 'National Trophy',
  },
  {
    id: 'award-3',
    title: 'Best Multi-Sport Infrastructure & Academy',
    sport: 'General',
    year: 2025,
    category: 'Excellence Award',
    description: 'Awarded Best Private Sports Complex for modern FIFA-grade turf and high-performance recovery labs.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    badge: 'Gold Standard',
  },
  {
    id: 'award-4',
    title: 'Regional BWF Open Badminton Grand Slam',
    sport: 'Badminton',
    year: 2024,
    category: 'Individual Gold',
    description: 'Gold medal won in Men’s & Women’s Doubles under Coach Elena Rostova’s high-performance squad.',
    image: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=800&q=80',
    badge: 'Gold Medal',
  },
];

export const sportsData: SportItem[] = [
  {
    id: 'football',
    name: 'Football & Futsal Academy',
    category: 'team',
    badge: 'Football',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    description: 'Full 11-a-side natural turf pitch and two 5-a-side floodlit astro-turf cages. Youth academy & weekend corporate leagues.',
    specs: [
      { icon: 'clock', text: '6 AM - 11 PM' },
      { icon: 'users', text: '5v5 & 11v11' },
      { icon: 'award', text: 'UEFA Licensed' }
    ]
  },
  {
    id: 'cricket',
    name: 'Cricket Arena & Batting Nets',
    category: 'team',
    badge: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    description: 'BCCI standard grass wicket, automated bowling machines, high-speed video analysis and 6 indoor & outdoor practice nets.',
    specs: [
      { icon: 'clock', text: '6 AM - 10 PM' },
      { icon: 'zap', text: '6 Turf Nets' },
      { icon: 'award', text: 'Bowling Machines' }
    ]
  },
  {
    id: 'basketball',
    name: 'Indoor Hardwood Basketball',
    category: 'team',
    badge: 'Basketball',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    description: 'FIBA-certified maple hardwood court with electronic shot clocks, spring-loaded glass backboards, and spectator seating.',
    specs: [
      { icon: 'clock', text: '6 AM - 11 PM' },
      { icon: 'shield', text: 'FIBA Hardwood' },
      { icon: 'award', text: '3x3 & 5v5' }
    ]
  },
  {
    id: 'badminton',
    name: 'Badminton Multi-Courts',
    category: 'racquet',
    badge: 'Badminton',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    description: '8 international BWF-approved synthetic shock-absorption courts with glare-free specialized LED lighting and AC lounge.',
    specs: [
      { icon: 'clock', text: '5:30 AM - 11 PM' },
      { icon: 'layers', text: '8 Courts' },
      { icon: 'award', text: 'BWF Approved' }
    ]
  },
  {
    id: 'tennis',
    name: 'Championship Tennis Courts',
    category: 'racquet',
    badge: 'Tennis',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
    description: '4 synthetic acrylic hard courts and 2 clay courts. Professional racket stringing, ball machines and certified coaches.',
    specs: [
      { icon: 'clock', text: '6 AM - 10 PM' },
      { icon: 'sun', text: 'Hard & Clay' },
      { icon: 'award', text: 'ITF Certified' }
    ]
  },
  {
    id: 'swimming',
    name: 'Olympic Aquatic Complex',
    category: 'individual',
    badge: 'Swimming',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    description: '50m 8-lane temperature-controlled swimming pool with electronic touch pads, diving boards and dedicated kids pool.',
    specs: [
      { icon: 'clock', text: '6 AM - 9 PM' },
      { icon: 'thermometer', text: 'Heated Pool' },
      { icon: 'award', text: 'FINA Standard' }
    ]
  }
];

export const fixturesData: FixtureItem[] = [
  {
    id: 'fix-1',
    sport: 'football',
    league: 'Apex Premier League • Semifinal',
    isLive: true,
    statusText: "LIVE 68'",
    homeTeam: { name: 'Apex Thunder FC', rankOrDetail: 'Home', score: '2', iconType: 'shield' },
    awayTeam: { name: 'Metro Strikers', rankOrDetail: 'Away', score: '1', iconType: 'zap' },
    venue: 'Main Stadium',
    footerText: 'Started 07:00 PM',
    highlightScorers: 'Apex: R. Silva 24\', M. Torres 58\' | MS: D. Vance 41\'',
    actionText: 'Watch Stream'
  },
  {
    id: 'fix-2',
    sport: 'cricket',
    league: 'Apex T20 Championship • Super 8',
    isLive: true,
    statusText: 'LIVE 16.4 Ov',
    homeTeam: { name: 'Apex Royals CC', rankOrDetail: '168/4 (20.0 ov)', score: '168/4', iconType: 'crown' },
    awayTeam: { name: 'Spartans CC', rankOrDetail: 'Target: 169 (Req. 27 from 20)', score: '142/3', iconType: 'shield' },
    venue: 'Turf Ground A',
    footerText: 'Evening Match',
    highlightScorers: 'K. Rahul 64*(38) • Bowler: A. Khan 2/28',
    actionText: 'Ball by Ball'
  },
  {
    id: 'fix-3',
    sport: 'basketball',
    league: 'Inter-Club Slam Cup • Final',
    isLive: false,
    statusText: 'Tomorrow, 06:30 PM',
    homeTeam: { name: 'Apex Ballers', rankOrDetail: 'Seed #1', score: '-', iconType: 'flame' },
    awayTeam: { name: 'Coastline Raptors', rankOrDetail: 'Seed #2', score: '-', iconType: 'feather' },
    venue: 'Wooden Court 1',
    footerText: 'Free entry for club members',
    actionText: 'Book Seat'
  },
  {
    id: 'fix-4',
    sport: 'badminton',
    league: 'Masters Singles Open • Quarterfinal',
    isLive: false,
    statusText: 'Sat, Oct 11 • 10:00 AM',
    homeTeam: { name: 'Vikram Sen', rankOrDetail: 'Rank #3', score: '-', iconType: 'user' },
    awayTeam: { name: 'Lucas Meyer', rankOrDetail: 'Rank #6', score: '-', iconType: 'user' },
    venue: 'Court 3 (AC)',
    footerText: 'Best of 3 sets (21 pts)',
    actionText: 'Register Fan Pass'
  }
];

export const pricingData: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Club Starter',
    tagline: 'Ideal for fitness enthusiasts & recreational sports',
    monthlyPrice: 39,
    annualPrice: 31,
    features: [
      { text: 'Access to 1 chosen sport court', included: true },
      { text: 'Standard gym & fitness equipment', included: true },
      { text: '4 court booking credits / month', included: true },
      { text: 'Locker & shower facility access', included: true },
      { text: 'Coach 1-on-1 personal training', included: false },
      { text: 'League tournament entry pass', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Pro Athlete',
    tagline: 'Complete multi-sport access with coach mentoring',
    monthlyPrice: 79,
    annualPrice: 63,
    isPopular: true,
    features: [
      { text: 'Unlimited access to all 6+ sports', included: true },
      { text: 'Full gym, sauna & Olympic pool access', included: true },
      { text: '16 advance court booking credits', included: true },
      { text: '2 Monthly 1-on-1 coach masterclasses', included: true },
      { text: 'Free entry to internal club leagues', included: true },
      { text: '15% discount on club merchandise', included: true },
    ]
  },
  {
    id: 'vip',
    name: 'VIP Champion Squad',
    tagline: 'For competitive players, families & corporate teams',
    monthlyPrice: 129,
    annualPrice: 103,
    features: [
      { text: 'Up to 4 family or team members', included: true },
      { text: 'Unlimited prime-time court bookings', included: true },
      { text: 'Dedicated personal coach & physio checkup', included: true },
      { text: 'VIP lounge & private locker suite', included: true },
      { text: 'Free guest passes (5 per month)', included: true },
      { text: 'Free tournament jersey kit', included: true },
    ]
  }
];

export const coachesData: CoachItem[] = [
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Football Head Coach',
    credentials: "UEFA 'A' License • Ex-National League Pro (12 Yrs)",
    bio: 'Specializes in tactical pressing, agility training, and youth development academies.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    socials: { linkedin: '#', instagram: '#' }
  },
  {
    id: 'rohan',
    name: 'Rohan Sharma',
    role: 'Cricket Director',
    credentials: 'BCCI Level 3 Coach • Former First-Class Captain',
    bio: 'Pioneer of modern strokeplay biomechanics and speed bowling analysis programs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    socials: { linkedin: '#', instagram: '#' }
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Racquet Sports Lead',
    credentials: 'BWF Certified Elite Mentor • Olympic Doubles Medalist',
    bio: 'Master in rapid footwork drills, net control, and competitive tournament preparation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    socials: { linkedin: '#', instagram: '#' }
  },
  {
    id: 'david',
    name: 'David Jenkins',
    role: 'Basketball & Strength',
    credentials: 'FIBA Certified Trainer • NCAA Champion Alumni',
    bio: 'Focused on shooting mechanics, plyometrics, explosive jumping and defensive stamina.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    socials: { linkedin: '#', instagram: '#' }
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Annual Championship Win',
    category: 'tournaments',
    categoryLabel: 'Tournaments',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-2',
    title: 'Youth Agility Drills',
    category: 'training',
    categoryLabel: 'Training Camps',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-3',
    title: 'Night Stadium Lights',
    category: 'facilities',
    categoryLabel: 'Facilities',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-4',
    title: 'Singles Grand Slam Final',
    category: 'tournaments',
    categoryLabel: 'Tournaments',
    image: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-5',
    title: '50m Heated Lap Pool',
    category: 'facilities',
    categoryLabel: 'Facilities',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-6',
    title: 'Strength Lab Workout',
    category: 'training',
    categoryLabel: 'Training Camps',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
  }
];

export const newsData: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Annual Junior Summer Sports Camp Registration Begins',
    category: 'Announcement',
    date: 'Oct 15, 2026',
    excerpt: 'Open for ages 6–16 across Football, Cricket, Tennis and Swimming. Early bird discount of 25% valid until Oct 25.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'news-2',
    title: 'Apex Corporate Football League 2026 Fixtures Revealed',
    category: 'Tournament',
    date: 'Oct 22, 2026',
    excerpt: 'Over 32 corporate teams set to battle under the floodlights every weekend. Free entry passes available for all club members.',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'news-3',
    title: 'Upgraded BWF Certified Wooden Courts Inaugurated',
    category: 'Facility Upgrade',
    date: 'Nov 05, 2026',
    excerpt: 'Enhanced anti-slip cushioning and high-lumen glare-free lights installed across all 8 badminton & squash courts.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80'
  }
];

export const merchData: MerchItem[] = [
  {
    id: 'merch-1',
    title: 'Apex Official Home Jersey 2026',
    category: 'Apparel',
    price: 45.00,
    description: 'Breathable moisture-wicking aerodynamic athletic mesh',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500&q=80',
    badge: 'Best Seller'
  },
  {
    id: 'merch-2',
    title: 'Apex Elite Windbreaker Hoodie',
    category: 'Apparel',
    price: 65.00,
    description: 'Thermal insulated weather-proof training jacket',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80',
    badge: 'New'
  },
  {
    id: 'merch-3',
    title: 'Pro Athlete Gear Duffel Bag (45L)',
    category: 'Accessories',
    price: 38.00,
    description: 'Dedicated shoe compartment & water-resistant nylon',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'merch-4',
    title: 'Apex Performance Snapback Cap',
    category: 'Accessories',
    price: 22.00,
    description: 'UV protection with laser-cut ventilation holes',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=80'
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Arjun Mehta',
    role: 'Cricket Team Captain • Member for 3 Years',
    quote: 'APEX has transformed our weekend routine. The cricket nets with automated bowling machines and the FIFA-grade turf pitch are second to none in this city!',
    rating: 5
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'Parent & Pro Athlete Member',
    quote: 'The badminton coaching by Elena helped my 14-year-old daughter qualify for the State Junior Championship. Incredible community, spotless locker rooms, and great staff!',
    rating: 5
  },
  {
    id: 't3',
    name: 'David Chen',
    role: 'Basketball League Player',
    quote: 'Booking courts on my phone is super seamless. The recovery ice baths and fitness gym have boosted my basketball game tremendously. Highly recommended!',
    rating: 5
  }
];
