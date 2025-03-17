'use client'

import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';

type BackgroundCarouselProps = {
  images: {
    src: string;
    alt: string;
  }[];
  interval?: number;
};

export default function BackgroundCarousel({
  images,
  interval = 5000
}: BackgroundCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 1.5, ease: "easeInOut"}}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            priority={currentIndex === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}