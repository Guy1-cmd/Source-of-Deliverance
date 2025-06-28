import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Facebook, Instagram, Twitter, Youtube, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPublicationDropdownOpen, setIsPublicationDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { 
      label: 'Publication', 
      path: '/publication',
      hasDropdown: true,
      subItems: [
        { label: 'Publication', path: '/publication' },
        { label: 'Announcement', path: '/announcement' },
        { label: 'Special Event', path: '/special-event' }
      ]
    },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handlePublicationMouseEnter = () => {
    setIsPublicationDropdownOpen(true);
  };

  const handlePublicationMouseLeave = () => {
    setIsPublicationDropdownOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Menu Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Left Side - Admin and Register */}
            <div className="flex space-x-6">
              <Link 
                to="/admin" 
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium"
              >
                Admin
              </Link>
              <Link 
                to="/login" 
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium"
              >
                Register
              </Link>
            </div>

            {/* Right Side - Social Media and Search */}
            <div className="flex items-center space-x-4">
              {/* Social Media Icons */}
              <div className="hidden sm:flex space-x-3">
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
              </div>

              {/* Search */}
              <div className="relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="bg-gray-800 text-white px-3 py-1 rounded-l-md text-sm w-32 sm:w-40 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded-r-md transition-colors duration-200"
                    >
                      <Search size={14} className="text-black" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="ml-2 text-gray-300 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                    aria-label="Search"
                  >
                    <Search size={16} />
                  </button>
                )}
              </div>

              {/* Payment Link */}
              <Link
                to="/payment"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Tithe/Offering
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <div className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled || !isHomePage ? 'text-blue-800' : 'text-white'
              }`}>
                Source of Deliverance
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={item.hasDropdown ? handlePublicationMouseEnter : undefined}
                  onMouseLeave={item.hasDropdown ? handlePublicationMouseLeave : undefined}
                >
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button
                        className={`font-medium transition-colors duration-300 hover:text-yellow-500 flex items-center ${
                          location.pathname.startsWith('/publication') || 
                          location.pathname === '/announcement' || 
                          location.pathname === '/special-event'
                            ? 'text-yellow-500' 
                            : isScrolled || !isHomePage 
                              ? 'text-gray-700' 
                              : 'text-white'
                        }`}
                      >
                        {item.label}
                        <ChevronDown 
                          size={16} 
                          className={`ml-1 transition-transform duration-200 ${
                            isPublicationDropdownOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 ${
                        isPublicationDropdownOpen 
                          ? 'opacity-100 visible transform translate-y-0' 
                          : 'opacity-0 invisible transform -translate-y-2'
                      }`}>
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                              location.pathname === subItem.path
                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                            }`}
                            onClick={() => setIsPublicationDropdownOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`font-medium transition-colors duration-300 hover:text-yellow-500 ${
                        location.pathname === item.path 
                          ? 'text-yellow-500' 
                          : isScrolled || !isHomePage 
                            ? 'text-gray-700' 
                            : 'text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
                isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-4 mb-4">
              {/* Mobile Top Menu Items */}
              <div className="px-6 py-2 border-b border-gray-200 mb-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex space-x-4">
                    <Link to="/admin" className="text-gray-600 hover:text-blue-800">
                      Admin
                    </Link>
                    <Link to="/login" className="text-gray-600 hover:text-blue-800">
                      Register
                    </Link>
                  </div>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-600 hover:text-blue-800">
                      <Facebook size={16} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-800">
                      <Instagram size={16} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-800">
                      <Twitter size={16} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-800">
                      <Youtube size={16} />
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <Link
                    to="/payment"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Tithe/Offering
                  </Link>
                </div>
              </div>

              {/* Mobile Main Menu Items */}
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.hasDropdown ? (
                    <div>
                      <div className={`block w-full text-left px-6 py-3 transition-colors duration-200 ${
                        location.pathname.startsWith('/publication') || 
                        location.pathname === '/announcement' || 
                        location.pathname === '/special-event'
                          ? 'bg-blue-50 text-blue-800 font-semibold'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                      }`}>
                        {item.label}
                      </div>
                      {/* Mobile Sub-menu */}
                      <div className="pl-4 border-l-2 border-gray-200 ml-6">
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block w-full text-left px-6 py-2 text-sm transition-colors duration-200 ${
                              location.pathname === subItem.path
                                ? 'bg-blue-50 text-blue-800 font-semibold'
                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block w-full text-left px-6 py-3 transition-colors duration-200 ${
                        location.pathname === item.path
                          ? 'bg-blue-50 text-blue-800 font-semibold'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;