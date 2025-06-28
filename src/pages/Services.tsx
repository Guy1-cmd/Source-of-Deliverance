import React from 'react';
import { Clock, Calendar, Users, Music, Heart, BookOpen, Mic, Baby } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Sunday Worship",
      time: "10:00 AM",
      description: "Join us for powerful worship, inspiring messages, and fellowship with believers from all walks of life.",
      icon: <Music className="w-8 h-8 text-yellow-500" />,
      details: "Our main worship service featuring contemporary music, biblical preaching, and communion."
    },
    {
      title: "Bible Study",
      time: "Wednesday 7:00 PM",
      description: "Dive deeper into God's Word with our midweek Bible study sessions.",
      icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
      details: "Interactive study sessions exploring biblical themes and practical Christian living."
    },
    {
      title: "Prayer Meeting",
      time: "Friday 6:00 PM",
      description: "Come together for prayer, intercession, and spiritual breakthrough.",
      icon: <Heart className="w-8 h-8 text-yellow-500" />,
      details: "A time of corporate prayer, worship, and seeking God's presence together."
    },
    {
      title: "Youth Service",
      time: "Saturday 5:00 PM",
      description: "Dynamic service designed for teens and young adults.",
      icon: <Users className="w-8 h-8 text-yellow-500" />,
      details: "Age-appropriate worship, teaching, and activities for our younger generation."
    }
  ];

  const ministries = [
    {
      name: "Children's Ministry",
      description: "Nurturing young hearts with age-appropriate lessons and activities.",
      icon: <Baby className="w-6 h-6" />,
      ages: "Ages 2-12"
    },
    {
      name: "Youth Ministry",
      description: "Empowering teenagers to grow in faith and leadership.",
      icon: <Users className="w-6 h-6" />,
      ages: "Ages 13-18"
    },
    {
      name: "Women's Fellowship",
      description: "Building sisterhood through Bible study and community service.",
      icon: <Heart className="w-6 h-6" />,
      ages: "All Ages"
    },
    {
      name: "Men's Fellowship",
      description: "Strengthening brotherhood and spiritual accountability.",
      icon: <Users className="w-6 h-6" />,
      ages: "All Ages"
    },
    {
      name: "Choir Ministry",
      description: "Leading worship through music and song.",
      icon: <Mic className="w-6 h-6" />,
      ages: "All Ages"
    },
    {
      name: "Outreach Programs",
      description: "Serving our community through various outreach initiatives.",
      icon: <Heart className="w-6 h-6" />,
      ages: "All Ages"
    }
  ];

  const specialEvents = [
    {
      title: "Easter Celebration",
      date: "March/April",
      description: "Celebrating the resurrection of Jesus Christ with special services and events."
    },
    {
      title: "Christmas Services",
      date: "December",
      description: "Commemorating the birth of our Savior with candlelight services and programs."
    },
    {
      title: "Vacation Bible School",
      date: "Summer",
      description: "Fun-filled week of learning, games, and activities for children."
    },
    {
      title: "Church Retreat",
      date: "Annual",
      description: "Weekend getaway for spiritual renewal and fellowship."
    }
  ];

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Join us for worship, fellowship, and spiritual growth throughout the week
          </p>
        </div>
      </section>

      {/* Weekly Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Weekly Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Regular opportunities to worship, learn, and grow together in faith.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-blue-600 font-semibold text-lg">{service.time}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>
                <p className="text-gray-600 text-sm">{service.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Ministries</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have ministries for every age and stage of life, designed to help you grow in faith and community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    {ministry.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{ministry.name}</h3>
                    <p className="text-blue-600 text-sm font-semibold">{ministry.ages}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{ministry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Throughout the year, we host special events that bring our community together in celebration and worship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {specialEvents.map((event, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl border border-yellow-200"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-yellow-600 mr-3" />
                  <span className="text-yellow-600 font-semibold">{event.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What to Expect</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              First time visiting? Here's what you can expect when you join us for worship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Warm Welcome</h3>
              <p className="text-blue-100">
                Our friendly greeters will welcome you and help you feel at home from the moment you arrive.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Inspiring Worship</h3>
              <p className="text-blue-100">
                Experience contemporary worship music that will lift your spirit and draw you closer to God.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Biblical Teaching</h3>
              <p className="text-blue-100">
                Hear practical, life-changing messages rooted in Scripture that you can apply to your daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We'd love to have you worship with us this Sunday. Come as you are and experience God's love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300"
            >
              Plan Your Visit
            </a>
            <a
              href="/about"
              className="border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;