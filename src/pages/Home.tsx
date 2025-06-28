import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Heart, Users, Book, Star, Calendar, Clock, MapPin, Download, User, Bell, Megaphone, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  fetchLatestAnnouncements,
  fetchFeaturedSpecialEvents,
  fetchWeeklyPrograms,
  fetchFeaturedPublications,
  Announcement,
  SpecialEvent,
  WeeklyProgram,
  Publication
} from '../data/mockDatabase';

const Home = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [specialEvents, setSpecialEvents] = useState<SpecialEvent[]>([]);
  const [weeklyPrograms, setWeeklyPrograms] = useState<WeeklyProgram[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const [isHeroAutoPlaying, setIsHeroAutoPlaying] = useState(true);

  // Hero section images from gallery
  const heroImages = [
    {
      url: "https://images.pexels.com/photos/8468660/pexels-photo-8468660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Sunday Worship Service",
      description: "Experience the presence of God in worship"
    },
    {
      url: "https://images.pexels.com/photos/7169074/pexels-photo-7169074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Community Outreach",
      description: "Serving our community with love"
    },
    {
      url: "https://images.pexels.com/photos/6994822/pexels-photo-6994822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Youth Ministry",
      description: "Empowering the next generation"
    },
    {
      url: "https://images.pexels.com/photos/8468659/pexels-photo-8468659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Baptism Ceremony",
      description: "Celebrating new life in Christ"
    },
    {
      url: "https://images.pexels.com/photos/8468661/pexels-photo-8468661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Prayer Meeting",
      description: "Coming together in prayer"
    },
    {
      url: "https://images.pexels.com/photos/7169056/pexels-photo-7169056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Fellowship Dinner",
      description: "Building community through fellowship"
    }
  ];

  // Auto-slide functionality for hero
  useEffect(() => {
    if (!isHeroAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isHeroAutoPlaying, heroImages.length]);

  const goToHeroPrevious = () => {
    setCurrentHeroImageIndex(currentHeroImageIndex === 0 ? heroImages.length - 1 : currentHeroImageIndex - 1);
    setIsHeroAutoPlaying(false);
  };

  const goToHeroNext = () => {
    setCurrentHeroImageIndex(currentHeroImageIndex === heroImages.length - 1 ? 0 : currentHeroImageIndex + 1);
    setIsHeroAutoPlaying(false);
  };

  const goToHeroSlide = (index: number) => {
    setCurrentHeroImageIndex(index);
    setIsHeroAutoPlaying(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          announcementsData,
          eventsData,
          programsData,
          publicationsData
        ] = await Promise.all([
          fetchLatestAnnouncements(4),
          fetchFeaturedSpecialEvents(),
          fetchWeeklyPrograms(),
          fetchFeaturedPublications()
        ]);

        setAnnouncements(announcementsData);
        setSpecialEvents(eventsData);
        setWeeklyPrograms(programsData);
        setPublications(publicationsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-yellow-500" />,
      title: "Love & Compassion",
      description: "We believe in showing Christ's love to everyone who walks through our doors."
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-500" />,
      title: "Community",
      description: "Building strong relationships and supporting each other in faith and life."
    },
    {
      icon: <Book className="w-8 h-8 text-yellow-500" />,
      title: "Biblical Teaching",
      description: "Grounded in Scripture, we teach and live by God's Word with integrity."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Excellence",
      description: "Striving for excellence in worship, service, and our walk with God."
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPublicationIcon = (type: string) => {
    switch (type) {
      case 'newsletter': return <Bell className="w-5 h-5" />;
      case 'bulletin': return <Megaphone className="w-5 h-5" />;
      case 'magazine': return <BookOpen className="w-5 h-5" />;
      case 'book': return <Book className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading church content...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Photo Slider */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeroImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                style={{
                  backgroundImage: `url(${image.url})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to<br />
            <span className="text-yellow-400">Source of Deliverance</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-light leading-relaxed">
            A place where faith meets community, and miracles happen daily
          </p>
          
          {/* Current Image Description */}
          <div className="mb-8 bg-black/30 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-yellow-300 mb-1">
              {heroImages[currentHeroImageIndex].title}
            </h3>
            <p className="text-sm text-gray-200">
              {heroImages[currentHeroImageIndex].description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Join Us This Sunday
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Slider Navigation */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Navigation Arrows */}
          <button
            onClick={goToHeroPrevious}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 pointer-events-auto group"
          >
            <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={goToHeroNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 pointer-events-auto group"
          >
            <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-3 pointer-events-auto">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToHeroSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-110 ${
                  index === currentHeroImageIndex 
                    ? 'bg-yellow-400 scale-110 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="absolute top-28 right-6 pointer-events-auto">
            <button
              onClick={() => setIsHeroAutoPlaying(!isHeroAutoPlaying)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isHeroAutoPlaying 
                  ? 'bg-green-500/80 text-white shadow-lg' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {isHeroAutoPlaying ? '⏸ Auto' : '▶ Manual'}
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm pointer-events-auto">
            {currentHeroImageIndex + 1} / {heroImages.length}
          </div>
        </div>

        {/* Scroll Down Button */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-30"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Announcements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Bell className="w-8 h-8 mr-3 text-blue-600" />
              Latest Announcements
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest news and important information from our church
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(announcement.date)}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{announcement.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{announcement.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {announcement.author}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {announcement.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Events Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <Star className="w-8 h-8 mr-3 text-yellow-400" />
              Special Events
            </h2>
            <p className="text-xl text-blue-100">
              Join us for these special occasions and celebrations throughout the year
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-blue-100 mb-4 leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  {event.registrationRequired && (
                    <div className="mt-4">
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                        Registration Required
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 mr-3 text-green-600" />
              Weekly Programs
            </h2>
            <p className="text-xl text-gray-600">
              Regular opportunities to worship, learn, and grow together in faith
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-green-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {program.day}
                  </span>
                  <span className="text-green-700 font-bold">{program.time}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{program.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    <span>{program.location}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-green-600" />
                    <span>{program.leader}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 mr-3 text-purple-600" />
              Latest Publications
            </h2>
            <p className="text-xl text-gray-600">
              Stay informed with our newsletters, bulletins, and spiritual resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {publications.map((publication) => (
              <div
                key={publication.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <img
                  src={publication.coverImage}
                  alt={publication.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center text-purple-600 font-semibold text-sm">
                      {getPublicationIcon(publication.type)}
                      <span className="ml-2 capitalize">{publication.type}</span>
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(publication.publishDate)}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{publication.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{publication.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {publication.author}
                    </span>
                    <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome Home
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over two decades, Source of Deliverance Church has been a beacon of hope 
              and faith in our community, transforming lives through the power of God's love.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Your Next Step?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're new to faith or looking for a church home, we'd love to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-8 rounded-full transition-colors duration-300"
            >
              Get in Touch
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-semibold py-4 px-8 rounded-full transition-colors duration-300"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;