import React, { useState, useEffect } from 'react';
import { Download, Calendar, User, BookOpen, Bell, Megaphone, Book, Search, Filter, Eye } from 'lucide-react';
import { fetchFeaturedPublications, Publication as PublicationType } from '../data/mockDatabase';

const Publication = () => {
  const [publications, setPublications] = useState<PublicationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadPublications = async () => {
      try {
        // In a real app, this would fetch all publications, not just featured ones
        const data = await fetchFeaturedPublications();
        setPublications(data);
      } catch (error) {
        console.error('Error loading publications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  const getPublicationIcon = (type: string) => {
    switch (type) {
      case 'newsletter': return <Bell className="w-6 h-6" />;
      case 'bulletin': return <Megaphone className="w-6 h-6" />;
      case 'magazine': return <BookOpen className="w-6 h-6" />;
      case 'book': return <Book className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'newsletter': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'bulletin': return 'bg-green-100 text-green-800 border-green-200';
      case 'magazine': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'book': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPublications = publications
    .filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pub.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || pub.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'oldest':
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const publicationTypes = [
    { value: 'all', label: 'All Publications' },
    { value: 'newsletter', label: 'Newsletters' },
    { value: 'bulletin', label: 'Bulletins' },
    { value: 'magazine', label: 'Magazines' },
    { value: 'book', label: 'Books' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' }
  ];

  if (loading) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading publications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Publications</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Discover our collection of newsletters, bulletins, magazines, and spiritual resources
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
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                >
                  {publicationTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedType !== 'all' && ` in ${publicationTypes.find(t => t.value === selectedType)?.label}`}
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPublications.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No publications found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPublications.map((publication) => (
                <div
                  key={publication.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                >
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={publication.coverImage}
                      alt={publication.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(publication.type)}`}>
                        {getPublicationIcon(publication.type)}
                        <span className="ml-2 capitalize">{publication.type}</span>
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {publication.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(publication.publishDate)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {publication.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                      {publication.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {publication.author}
                      </span>
                      <div className="flex gap-2">
                        <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-300 text-sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </button>
                        <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors duration-300 text-sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-purple-100 mb-8">
            Subscribe to our newsletter to receive the latest publications and church updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Publication;