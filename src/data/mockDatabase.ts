// Mock Database for Church Content
// In a real application, this would be replaced with actual database calls

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
  featured: boolean;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  author: string;
  category: string;
}

export interface SpecialEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  registrationRequired: boolean;
  featured: boolean;
}

export interface WeeklyProgram {
  id: number;
  title: string;
  description: string;
  day: string;
  time: string;
  location: string;
  leader: string;
  recurring: boolean;
}

export interface Publication {
  id: number;
  title: string;
  description: string;
  type: 'newsletter' | 'bulletin' | 'magazine' | 'book';
  publishDate: string;
  author: string;
  downloadUrl: string;
  featured: boolean;
  coverImage: string;
}

// Mock Gallery Data
export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/8468660/pexels-photo-8468660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Sunday Worship Service",
    category: "Worship",
    featured: true
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/7169074/pexels-photo-7169074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Community Outreach Program",
    category: "Outreach",
    featured: true
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/6994822/pexels-photo-6994822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Youth Ministry Gathering",
    category: "Youth",
    featured: true
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/8468659/pexels-photo-8468659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Baptism Ceremony",
    category: "Baptism",
    featured: true
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/8468661/pexels-photo-8468661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Prayer Meeting",
    category: "Prayer",
    featured: true
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/7169056/pexels-photo-7169056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Church Fellowship Dinner",
    category: "Fellowship",
    featured: false
  }
];

// Mock Announcements Data
export const announcements: Announcement[] = [
  {
    id: 1,
    title: "Special Christmas Service - December 25th",
    content: "Join us for a special Christmas morning service at 10:00 AM. We'll celebrate the birth of our Savior with carols, special music, and a message of hope. Light refreshments will be served after the service.",
    date: "2024-12-15",
    priority: "high",
    author: "Pastor John Smith",
    category: "Service"
  },
  {
    id: 2,
    title: "New Member Orientation - January 7th",
    content: "Are you new to our church family? Join us for a special orientation session where you'll learn about our ministries, meet other new members, and discover ways to get involved. Registration required.",
    date: "2024-12-20",
    priority: "medium",
    author: "Pastor Sarah Johnson",
    category: "Membership"
  },
  {
    id: 3,
    title: "Youth Winter Retreat Registration Open",
    content: "Registration is now open for our annual youth winter retreat (February 14-16). This year's theme is 'Walking in Faith.' Early bird pricing available until January 15th. Contact the youth ministry for details.",
    date: "2024-12-18",
    priority: "medium",
    author: "Youth Ministry Team",
    category: "Youth"
  },
  {
    id: 4,
    title: "Food Drive for Local Families",
    content: "We're collecting non-perishable food items for local families in need during the holiday season. Drop-off boxes are located in the church lobby. Thank you for your generosity!",
    date: "2024-12-10",
    priority: "high",
    author: "Outreach Committee",
    category: "Outreach"
  }
];

// Mock Special Events Data
export const specialEvents: SpecialEvent[] = [
  {
    id: 1,
    title: "New Year's Eve Watch Night Service",
    description: "Join us as we welcome 2025 with prayer, worship, and fellowship. The service begins at 10:30 PM and includes communion at midnight. Light snacks and hot beverages will be provided.",
    date: "2024-12-31",
    time: "10:30 PM - 12:30 AM",
    location: "Main Sanctuary",
    image: "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registrationRequired: false,
    featured: true
  },
  {
    id: 2,
    title: "Marriage Enrichment Weekend",
    description: "A special weekend retreat for married couples focusing on strengthening relationships through biblical principles. Includes workshops, couple activities, and fellowship meals.",
    date: "2025-02-14",
    time: "Friday 7:00 PM - Sunday 3:00 PM",
    location: "Mountain View Retreat Center",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registrationRequired: true,
    featured: true
  },
  {
    id: 3,
    title: "Easter Sunrise Service",
    description: "Celebrate the resurrection of Jesus Christ with our traditional sunrise service in the church garden, followed by breakfast and our regular Easter worship service.",
    date: "2025-04-20",
    time: "6:30 AM Sunrise Service, 10:00 AM Main Service",
    location: "Church Garden & Main Sanctuary",
    image: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registrationRequired: false,
    featured: true
  },
  {
    id: 4,
    title: "Community Health Fair",
    description: "Free health screenings, wellness information, and prayer ministry. Open to the entire community. Medical professionals from our congregation will provide various health services.",
    date: "2025-03-15",
    time: "9:00 AM - 2:00 PM",
    location: "Fellowship Hall",
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    registrationRequired: false,
    featured: false
  }
];

// Mock Weekly Programs Data
export const weeklyPrograms: WeeklyProgram[] = [
  {
    id: 1,
    title: "Sunday Worship Service",
    description: "Our main worship service featuring contemporary music, biblical preaching, and communion. All ages welcome with children's ministry available.",
    day: "Sunday",
    time: "10:00 AM",
    location: "Main Sanctuary",
    leader: "Pastor John Smith",
    recurring: true
  },
  {
    id: 2,
    title: "Wednesday Bible Study",
    description: "Deep dive into God's Word with interactive discussions and practical applications for daily living. Currently studying the Book of Romans.",
    day: "Wednesday",
    time: "7:00 PM",
    location: "Fellowship Hall",
    leader: "Pastor Sarah Johnson",
    recurring: true
  },
  {
    id: 3,
    title: "Friday Prayer Meeting",
    description: "Corporate prayer time for our church, community, and world. Come join us as we seek God's presence and pray for breakthrough.",
    day: "Friday",
    time: "6:00 PM",
    location: "Prayer Room",
    leader: "Elder Michael Brown",
    recurring: true
  },
  {
    id: 4,
    title: "Saturday Youth Service",
    description: "High-energy worship and relevant teaching designed specifically for teenagers and young adults. Games and fellowship follow the service.",
    day: "Saturday",
    time: "5:00 PM",
    location: "Youth Center",
    leader: "Pastor David Wilson",
    recurring: true
  },
  {
    id: 5,
    title: "Sunday Children's Church",
    description: "Age-appropriate worship, Bible stories, and activities for children ages 4-12. Runs concurrent with the main worship service.",
    day: "Sunday",
    time: "10:00 AM",
    location: "Children's Wing",
    leader: "Sister Mary Johnson",
    recurring: true
  },
  {
    id: 6,
    title: "Tuesday Women's Fellowship",
    description: "Bible study, prayer, and fellowship for women of all ages. Currently studying 'Proverbs 31 Woman' with practical life applications.",
    day: "Tuesday",
    time: "10:00 AM",
    location: "Conference Room",
    leader: "Sister Grace Adams",
    recurring: true
  }
];

// Mock Publications Data
export const publications: Publication[] = [
  {
    id: 1,
    title: "The Deliverance Herald - December 2024",
    description: "Our monthly newsletter featuring upcoming events, ministry highlights, testimonies, and inspirational articles from our pastoral team.",
    type: "newsletter",
    publishDate: "2024-12-01",
    author: "Editorial Team",
    downloadUrl: "/downloads/herald-december-2024.pdf",
    featured: true,
    coverImage: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2"
  },
  {
    id: 2,
    title: "Sunday Bulletin - December 22, 2024",
    description: "This week's service order, announcements, prayer requests, and upcoming events. Includes special Christmas service information.",
    type: "bulletin",
    publishDate: "2024-12-22",
    author: "Church Office",
    downloadUrl: "/downloads/bulletin-december-22-2024.pdf",
    featured: true,
    coverImage: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2"
  },
  {
    id: 3,
    title: "Faith & Life Magazine - Winter Edition",
    description: "Quarterly magazine featuring in-depth articles on Christian living, testimonies, ministry spotlights, and theological insights.",
    type: "magazine",
    publishDate: "2024-12-15",
    author: "Pastor John Smith",
    downloadUrl: "/downloads/faith-life-winter-2024.pdf",
    featured: true,
    coverImage: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2"
  },
  {
    id: 4,
    title: "Walking in Victory: A Study Guide",
    description: "A comprehensive study guide for spiritual growth and overcoming life's challenges through biblical principles and practical applications.",
    type: "book",
    publishDate: "2024-11-30",
    author: "Pastor Sarah Johnson",
    downloadUrl: "/downloads/walking-in-victory-study-guide.pdf",
    featured: false,
    coverImage: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2"
  },
  {
    id: 5,
    title: "Youth Ministry Handbook 2025",
    description: "Complete guide for youth ministry activities, programs, and spiritual development resources for teenagers and young adults.",
    type: "book",
    publishDate: "2024-12-10",
    author: "Youth Ministry Team",
    downloadUrl: "/downloads/youth-ministry-handbook-2025.pdf",
    featured: false,
    coverImage: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2"
  }
];

// Database simulation functions
export const fetchFeaturedGalleryImages = (): Promise<GalleryImage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(galleryImages.filter(img => img.featured));
    }, 500);
  });
};

export const fetchLatestAnnouncements = (limit: number = 4): Promise<Announcement[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sorted = announcements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      resolve(sorted.slice(0, limit));
    }, 300);
  });
};

export const fetchFeaturedSpecialEvents = (): Promise<SpecialEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(specialEvents.filter(event => event.featured));
    }, 400);
  });
};

export const fetchWeeklyPrograms = (): Promise<WeeklyProgram[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const sorted = weeklyPrograms.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
      resolve(sorted);
    }, 350);
  });
};

export const fetchFeaturedPublications = (): Promise<Publication[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sorted = publications
        .filter(pub => pub.featured)
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      resolve(sorted);
    }, 450);
  });
};