import React, { useState, useEffect } from 'react';
import { Heart, Users, Book, Star, Target, Eye, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Story section images
  const storyImages = [
    {
      url: "https://images.pexels.com/photos/8468707/pexels-photo-8468707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Church Community Fellowship",
      description: "Our vibrant church family gathering together"
    },
    {
      url: "https://images.pexels.com/photos/8468660/pexels-photo-8468660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Sunday Worship Service",
      description: "Experiencing God's presence in worship"
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
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === storyImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, storyImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? storyImages.length - 1 : currentImageIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === storyImages.length - 1 ? 0 : currentImageIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false);
  };

  const values = [
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

  const leadership = [
    {
      name: "Pastor John Smith",
      role: "Senior Pastor",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      description: "Leading our church with wisdom and compassion for over 15 years."
    },
    {
      name: "Pastor Sarah Johnson",
      role: "Associate Pastor",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      description: "Passionate about youth ministry and community outreach programs."
    },
    {
      name: "Minister David Brown",
      role: "Worship Leader",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      description: "Creating an atmosphere of worship that touches hearts and souls."
    }
  ];

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Discover our story, mission, and the heart behind Source of Deliverance Church
          </p>
        </div>
      </section>

      {/* Our Story Section with Slideshow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2002, Source of Deliverance Church began as a small gathering of believers 
                with a big vision: to create a place where people could encounter God's love and 
                experience true transformation. What started with just 20 members has grown into a 
                thriving community of over 1,000 faithful believers.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Throughout our journey, we've remained committed to our core values of love, 
                community, biblical teaching, and excellence. We've witnessed countless miracles, 
                baptisms, marriages, and life transformations that continue to inspire us daily.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we stand as a beacon of hope in our community, reaching out to the lost, 
                nurturing the found, and equipping believers to make a difference in the world.
              </p>
            </div>
            
            {/* Image Slideshow */}
            <div className="relative">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl group">
                {/* Main Image */}
                <div className="relative h-full">
                  <img
                    src={storyImages[currentImageIndex].url}
                    alt={storyImages[currentImageIndex].title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{storyImages[currentImageIndex].title}</h3>
                    <p className="text-sm text-gray-200">{storyImages[currentImageIndex].description}</p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Auto-play indicator */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      isAutoPlaying 
                        ? 'bg-green-500/80 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {isAutoPlaying ? 'Auto' : 'Manual'}
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 right-6 flex space-x-2">
                  {storyImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-110 shadow-lg' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                {storyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'ring-2 ring-blue-500 scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To reach the lost, teach the found, and send the trained to make disciples 
                of all nations through the transforming power of Jesus Christ.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a church that transforms lives, strengthens families, and impacts 
                communities through authentic worship and biblical truth.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-700 leading-relaxed">
                Love, integrity, excellence, community, and biblical truth guide everything 
                we do as we serve God and our neighbors.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated leaders who guide our church with wisdom, compassion, and faith.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{leader.role}</p>
                  <p className="text-gray-600 leading-relaxed">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Join Our Church Family</h2>
          <p className="text-xl text-blue-100 mb-8">
            We believe that everyone has a place in God's family. Come and discover yours with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-8 rounded-full transition-colors duration-300"
            >
              Visit Us This Sunday
            </a>
            <a
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-semibold py-4 px-8 rounded-full transition-colors duration-300"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;