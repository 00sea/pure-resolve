'use client'

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { create } from 'zustand';

// Define the store interface
interface CarouselState {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  incrementIndex: (totalImages: number) => void;
}

// Create the store with Zustand
const useCarouselStore = create<CarouselState>((set) => ({
  currentIndex: 0,
  setCurrentIndex: (index) => set({ currentIndex: index }),
  incrementIndex: (totalImages) => set((state) => ({ 
    currentIndex: (state.currentIndex + 1) % totalImages 
  })),
}));

type BackgroundCarouselProps = {
  images: {
    src: string;
    alt: string;
  }[];
  interval?: number;
  overlayOpacity?: number;
};

export default function BackgroundCarousel({
  images,
  interval = 5000,
  overlayOpacity = 100 // Default to 70% opacity (bg-black/70)
}: BackgroundCarouselProps) {
  // Use the global store instead of local state
  const { currentIndex, incrementIndex } = useCarouselStore();
  
  // Set up the interval for advancing slides
  useEffect(() => {
    // Don't set up interval if there's only one image
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      incrementIndex(images.length);
    }, interval);
    
    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [images.length, interval, incrementIndex]);

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
    </div>
  );
}