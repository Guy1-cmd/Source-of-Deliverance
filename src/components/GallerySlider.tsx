import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../data/mockDatabase';

interface GallerySliderProps {
  images: GalleryImage[];
}

const GallerySlider: React.FC<GallerySliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (images.length === 0) {
    return (
      <div className="relative h-96 bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Loading gallery images...</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl group">
      {/* Main Image */}
      <div className="relative h-full">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Image Info */}
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-xl font-bold mb-1">{images[currentIndex].title}</h3>
          <p className="text-sm text-gray-200">{images[currentIndex].category}</p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-6 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

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
    </div>
  );
};

export default GallerySlider;