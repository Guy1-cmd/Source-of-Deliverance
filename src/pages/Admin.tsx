import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Bell, 
  BookOpen, 
  Star,
  Save,
  X,
  Eye,
  Upload,
  Settings,
  BarChart3,
  Users,
  FileText,
  Activity
} from 'lucide-react';

interface AdminItem {
  id: number;
  title: string;
  content?: string;
  description?: string;
  date: string;
  author: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  type?: 'newsletter' | 'bulletin' | 'magazine' | 'book';
  time?: string;
  location?: string;
  image?: string;
  registrationRequired?: boolean;
  featured?: boolean;
  publishDate?: string;
  coverImage?: string;
  downloadUrl?: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'announcement' | 'publication' | 'event'>('announcement');
  const [editingItem, setEditingItem] = useState<AdminItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Mock data - in real app, this would come from API
  const [announcements, setAnnouncements] = useState<AdminItem[]>([
    {
      id: 1,
      title: "Special Christmas Service - December 25th",
      content: "Join us for a special Christmas morning service at 10:00 AM. We'll celebrate the birth of our Savior with carols, special music, and a message of hope.",
      date: "2024-12-15",
      priority: "high",
      author: "Pastor John Smith",
      category: "Service"
    },
    {
      id: 2,
      title: "New Member Orientation - January 7th",
      content: "Are you new to our church family? Join us for a special orientation session where you'll learn about our ministries.",
      date: "2024-12-20",
      priority: "medium",
      author: "Pastor Sarah Johnson",
      category: "Membership"
    }
  ]);

  const [publications, setPublications] = useState<AdminItem[]>([
    {
      id: 1,
      title: "The Deliverance Herald - December 2024",
      description: "Our monthly newsletter featuring upcoming events, ministry highlights, testimonies, and inspirational articles.",
      type: "newsletter",
      publishDate: "2024-12-01",
      author: "Editorial Team",
      downloadUrl: "/downloads/herald-december-2024.pdf",
      featured: true,
      coverImage: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
    }
  ]);

  const [events, setEvents] = useState<AdminItem[]>([
    {
      id: 1,
      title: "New Year's Eve Watch Night Service",
      description: "Join us as we welcome 2025 with prayer, worship, and fellowship. The service begins at 10:30 PM.",
      date: "2024-12-31",
      time: "10:30 PM - 12:30 AM",
      location: "Main Sanctuary",
      image: "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg",
      registrationRequired: false,
      featured: true,
      author: "Admin"
    }
  ]);

  const [formData, setFormData] = useState<Partial<AdminItem>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const openModal = (type: 'announcement' | 'publication' | 'event', item?: AdminItem) => {
    setModalType(type);
    setEditingItem(item || null);
    setFormData(item || {});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: AdminItem = {
      id: editingItem?.id || Date.now(),
      title: formData.title || '',
      content: formData.content,
      description: formData.description,
      date: formData.date || new Date().toISOString().split('T')[0],
      author: formData.author || 'Admin',
      category: formData.category,
      priority: formData.priority,
      type: formData.type,
      time: formData.time,
      location: formData.location,
      image: formData.image,
      registrationRequired: formData.registrationRequired,
      featured: formData.featured,
      publishDate: formData.publishDate,
      coverImage: formData.coverImage,
      downloadUrl: formData.downloadUrl
    };

    if (modalType === 'announcement') {
      if (editingItem) {
        setAnnouncements(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
      } else {
        setAnnouncements(prev => [...prev, newItem]);
      }
    } else if (modalType === 'publication') {
      if (editingItem) {
        setPublications(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
      } else {
        setPublications(prev => [...prev, newItem]);
      }
    } else if (modalType === 'event') {
      if (editingItem) {
        setEvents(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
      } else {
        setEvents(prev => [...prev, newItem]);
      }
    }

    closeModal();
  };

  const handleDelete = (type: 'announcement' | 'publication' | 'event', id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'announcement') {
        setAnnouncements(prev => prev.filter(item => item.id !== id));
      } else if (type === 'publication') {
        setPublications(prev => prev.filter(item => item.id !== id));
      } else if (type === 'event') {
        setEvents(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'newsletter': return 'bg-blue-100 text-blue-800';
      case 'bulletin': return 'bg-green-100 text-green-800';
      case 'magazine': return 'bg-purple-100 text-purple-800';
      case 'book': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = {
    totalAnnouncements: announcements.length,
    totalPublications: publications.length,
    totalEvents: events.length,
    featuredItems: [...publications, ...events].filter(item => item.featured).length
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Announcements</p>
              <p className="text-3xl font-bold">{stats.totalAnnouncements}</p>
            </div>
            <Bell className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Publications</p>
              <p className="text-3xl font-bold">{stats.totalPublications}</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Events</p>
              <p className="text-3xl font-bold">{stats.totalEvents}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Featured Items</p>
              <p className="text-3xl font-bold">{stats.featuredItems}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => openModal('announcement')}
            className="flex items-center justify-center bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg p-6 transition-colors group"
          >
            <div className="text-center">
              <Bell className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-blue-800">New Announcement</p>
            </div>
          </button>

          <button
            onClick={() => openModal('publication')}
            className="flex items-center justify-center bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg p-6 transition-colors group"
          >
            <div className="text-center">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-green-800">New Publication</p>
            </div>
          </button>

          <button
            onClick={() => openModal('event')}
            className="flex items-center justify-center bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg p-6 transition-colors group"
          >
            <div className="text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-purple-800">New Event</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[...announcements, ...publications, ...events]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5)
            .map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">by {item.author} • {formatDate(item.date)}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {announcements.includes(item) ? 'Announcement' : 
                   publications.includes(item) ? 'Publication' : 'Event'}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderContentTable = (items: AdminItem[], type: 'announcement' | 'publication' | 'event') => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 capitalize">{type}s</h3>
          <button
            onClick={() => openModal(type)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {type}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              {type === 'announcement' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              )}
              {type === 'publication' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              )}
              {type === 'event' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {item.content || item.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(item.publishDate || item.date)}
                </td>
                {type === 'announcement' && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority || 'low')}`}>
                      {item.priority?.toUpperCase()}
                    </span>
                  </td>
                )}
                {type === 'publication' && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type || 'newsletter')}`}>
                      {item.type?.toUpperCase()}
                    </span>
                  </td>
                )}
                {type === 'event' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.location}</td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {item.featured && (
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    )}
                    <span className="text-sm text-green-600 font-medium">Published</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(type, item)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(type, item.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {editingItem ? 'Edit' : 'Add'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter title"
            />
          </div>

          {/* Content/Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {modalType === 'announcement' ? 'Content' : 'Description'} *
            </label>
            <textarea
              name={modalType === 'announcement' ? 'content' : 'description'}
              required
              rows={4}
              value={formData.content || formData.description || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder={`Enter ${modalType === 'announcement' ? 'content' : 'description'}`}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {modalType === 'publication' ? 'Publish Date' : 'Date'} *
            </label>
            <input
              type="date"
              name={modalType === 'publication' ? 'publishDate' : 'date'}
              required
              value={formData.publishDate || formData.date || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
            <input
              type="text"
              name="author"
              required
              value={formData.author || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter author name"
            />
          </div>

          {/* Announcement specific fields */}
          {modalType === 'announcement' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority || 'medium'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Service, Membership"
                  />
                </div>
              </div>
            </>
          )}

          {/* Publication specific fields */}
          {modalType === 'publication' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    name="type"
                    value={formData.type || 'newsletter'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newsletter">Newsletter</option>
                    <option value="bulletin">Bulletin</option>
                    <option value="magazine">Magazine</option>
                    <option value="book">Book</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Download URL</label>
                  <input
                    type="url"
                    name="downloadUrl"
                    value={formData.downloadUrl || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/file.pdf"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
            </>
          )}

          {/* Event specific fields */}
          {modalType === 'event' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 10:00 AM - 12:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Main Sanctuary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/event.jpg"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="registrationRequired"
                    checked={formData.registrationRequired || false}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Registration Required</span>
                </label>
              </div>
            </>
          )}

          {/* Featured checkbox for publications and events */}
          {(modalType === 'publication' || modalType === 'event') && (
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Item</span>
              </label>
            </div>
          )}

          {/* Submit buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="pt-28 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your church content and announcements</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'announcements', label: 'Announcements', icon: Bell },
                { id: 'publications', label: 'Publications', icon: BookOpen },
                { id: 'events', label: 'Events', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'announcements' && renderContentTable(announcements, 'announcement')}
          {activeTab === 'publications' && renderContentTable(publications, 'publication')}
          {activeTab === 'events' && renderContentTable(events, 'event')}
        </div>
      </div>

      {/* Modal */}
      {showModal && renderModal()}
    </div>
  );
};

export default Admin;