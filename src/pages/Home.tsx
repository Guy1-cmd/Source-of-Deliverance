import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Heart, Users, Book, Star, Calendar, Clock, MapPin, Download, User, Bell, Megaphone, BookOpen } from 'lucide-react';
import GallerySlider from '../components/GallerySlider';
import {
  fetchFeaturedGalleryImages,
  fetchLatestAnnouncements,
  fetchFeaturedSpecialEvents,
  fetchWeeklyPrograms,
  fetchFeaturedPublications,
  GalleryImage,
  Announcement,
  SpecialEvent,
  WeeklyProgram,
  Publication
} from '../data/mockDatabase';

const Home = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [specialEvents, setSpecialEvents] = useState<SpecialEvent[]>([]);
  const [weeklyPrograms, setWeeklyPrograms] = useState<WeeklyProgram[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          galleryData,
          announcementsData,
          eventsData,
          programsData,
          publicationsData
        ] = await Promise.all([
          fetchFeaturedGalleryImages(),
          fetchLatestAnnouncements(4),
          fetchFeaturedSpecialEvents(),
          fetchWeeklyPrograms(),
          fetchFeaturedPublications()
        ]);

        setGalleryImages(galleryData);
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to<br />
            <span className="text-yellow-400">Source of Deliverance</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
            A place where faith meets community, and miracles happen daily
          </p>
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

        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Church Life Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Glimpses of our vibrant church community and the amazing things God is doing in our midst
            </p>
          </div>
          
          <GallerySlider images={galleryImages} />
          
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-flex items-center bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
            >
              View Full Gallery
              <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
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