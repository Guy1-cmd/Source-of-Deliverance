import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Heart, Users, Book, Star } from 'lucide-react';

const Home = () => {
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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
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

      {/* Service Times Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Join Us This Week</h2>
            <p className="text-xl text-blue-100">
              Come and experience the presence of God with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-700 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-2">Sunday Worship</h3>
              <p className="text-blue-200">10:00 AM</p>
            </div>
            <div className="bg-blue-700 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-2">Bible Study</h3>
              <p className="text-blue-200">Wednesday 7:00 PM</p>
            </div>
            <div className="bg-blue-700 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-2">Prayer Meeting</h3>
              <p className="text-blue-200">Friday 6:00 PM</p>
            </div>
            <div className="bg-blue-700 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-2">Youth Service</h3>
              <p className="text-blue-200">Saturday 5:00 PM</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-full transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Take Your Next Step?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're new to faith or looking for a church home, we'd love to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300"
            >
              Get in Touch
            </Link>
            <Link
              to="/about"
              className="border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300"
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