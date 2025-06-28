import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Search, Filter, ChevronRight, Ticket } from 'lucide-react';
import { fetchFeaturedSpecialEvents, SpecialEvent as SpecialEventType } from '../data/mockDatabase';

const SpecialEvent = () => {
  const [events, setEvents] = useState<SpecialEventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // In a real app, this would fetch all special events
        const data = await fetchFeaturedSpecialEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error loading special events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const isPast = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const filteredEvents = events
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesFilter = true;
      switch (selectedFilter) {
        case 'upcoming':
          matchesFilter = isUpcoming(event.date);
          break;
        case 'past':
          matchesFilter = isPast(event.date);
          break;
        case 'registration':
          matchesFilter = event.registrationRequired;
          break;
        case 'featured':
          matchesFilter = event.featured;
          break;
        default:
          matchesFilter = true;
      }
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'upcoming', label: 'Upcoming Events' },
    { value: 'past', label: 'Past Events' },
    { value: 'registration', label: 'Registration Required' },
    { value: 'featured', label: 'Featured Events' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date (Earliest First)' },
    { value: 'date-desc', label: 'Date (Latest First)' },
    { value: 'title', label: 'Title A-Z' }
  ];

  if (loading) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading special events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Special Events</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Join us for these special occasions and celebrations that bring our community together
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white rounded-lg p-2 text-center shadow-lg">
                      <div className="text-xs font-semibold text-gray-600 uppercase">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {event.featured && (
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          Featured
                        </span>
                      )}
                      {isUpcoming(event.date) && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Upcoming
                        </span>
                      )}
                      {isPast(event.date) && (
                        <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Past Event
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                    
                    {/* Event Details */}
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-green-600" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-green-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-green-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    {/* Registration Status */}
                    {event.registrationRequired && (
                      <div className="mb-4">
                        <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                          <Ticket className="w-3 h-3 mr-1" />
                          Registration Required
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex justify-between items-center">
                      <button className="flex items-center text-green-600 hover:text-green-800 font-semibold transition-colors group">
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      {isUpcoming(event.date) && event.registrationRequired && (
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-semibold">
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Star className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-4xl font-bold mb-6">Don't Miss Out!</h2>
          <p className="text-xl text-green-100 mb-8">
            Stay connected with our church community and be the first to know about upcoming special events and celebrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-8 rounded-full transition-colors duration-300">
              Subscribe to Updates
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold py-4 px-8 rounded-full transition-colors duration-300">
              View Calendar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecialEvent;