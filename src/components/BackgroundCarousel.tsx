'use client'

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { create } from 'zustand';

// Define the store interface
interface CarouselState {
  currentIndex: number;
  lastInteractionTime: number;
  setCurrentIndex: (index: number) => void;
  incrementIndex: (totalImages: number) => void;
  decrementIndex: (totalImages: number) => void;
  updateInteractionTime: () => void;
}

// Create the store with Zustand
const useCarouselStore = create<CarouselState>((set) => ({
  currentIndex: 0,
  lastInteractionTime: 0,
  setCurrentIndex: (index) => set((state) => ({ 
    currentIndex: index,
    lastInteractionTime: Date.now()
  })),
  incrementIndex: (totalImages) => set((state) => ({ 
    currentIndex: (state.currentIndex + 1) % totalImages 
  })),
  decrementIndex: (totalImages) => set((state) => ({ 
    currentIndex: (state.currentIndex - 1 + totalImages) % totalImages 
  })),
  updateInteractionTime: () => set(() => ({ 
    lastInteractionTime: Date.now() 
  })),
}));

type BackgroundCarouselProps = {
  images: {
    src: string;
    alt: string;
  }[];
  interval?: number;
  overlayOpacity?: number;
  showControls?: boolean;
  showIndicators?: boolean;
};

export default function BackgroundCarousel({
  images,
  interval = 6000, 
  overlayOpacity = 100,
  showControls = true,
  showIndicators = true
}: BackgroundCarouselProps) {
  // Use the global store and access the lastInteractionTime
  const { 
    currentIndex, 
    lastInteractionTime,
    setCurrentIndex, 
    incrementIndex, 
    decrementIndex,
    updateInteractionTime 
  } = useCarouselStore();
  
  // Use a ref to keep track of the timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Set up the interval for advancing slides
  useEffect(() => {
    // Don't set up interval if there's only one image
    if (images.length <= 1) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Create a new timer
    timerRef.current = setInterval(() => {
      // Get the current time
      const now = Date.now();
      
      // Only auto-advance if enough time has passed since the last user interaction
      if (now - lastInteractionTime >= interval) {
        incrementIndex(images.length);
      }
    }, interval);
    
    // Clean up the interval on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [images.length, interval, incrementIndex, lastInteractionTime]);

  // Handle previous slide
  const handlePrevious = () => {
    decrementIndex(images.length);
    updateInteractionTime();
  };

  // Handle next slide
  const handleNext = () => {
    incrementIndex(images.length);
    updateInteractionTime();
  };

  // Handle direct navigation to a specific slide
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    // The updateInteractionTime happens inside setCurrentIndex
  };

  // Safety check to ensure currentIndex is valid
  const safeIndex = images.length > 0 ? currentIndex % images.length : 0;
  
  // Handle empty images array
  if (images.length === 0) {
    return <div className="w-full h-full bg-black"></div>;
  }

  return (
    <div className="relative w-full h-full">
      {/* Animate the changing background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={safeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[safeIndex].src}
            alt={images[safeIndex].alt}
            fill
            priority={safeIndex === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay to ensure text readability */}
      <div 
        className={`absolute inset-0 bg-black/${overlayOpacity}`}
        aria-hidden="true"
      ></div>

      {/* Navigation Arrows */}
      {showControls && images.length > 1 && (
        <>
          {/* Left Arrow (Previous) */}
          <button
            onClick={handlePrevious}
            className="absolute left-10 top-1/2 z-20 -translate-y-1/2 ring-2 ring-white/50 ring-inline rounded-full opacity-30 p-3 text-white backdrop-blur-sm transition-colors hover:opacity-70
            active:bg-white active:opacity-100 active:ring-white/75"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Right Arrow (Next) */}
          <button
            onClick={handleNext}
            className="absolute right-10 top-1/2 z-20 -translate-y-1/2 ring-2 ring-white/50 ring-inline rounded-full opacity-30 p-3 text-white backdrop-blur-sm transition-colors hover:opacity-70
            active:bg-white active:opacity-100 active:ring-white/75"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {/* Indicator Dots */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center opacity-30">
            <div className="border-white border-0 h-1 w-40 flex justify-center">
                {images.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`flex-1 transition-all duration-300 ${
                        index === safeIndex
                        ? "bg-white scale-110"
                        : "bg-white opacity-30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === safeIndex ? "true" : "false"}
                    />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}