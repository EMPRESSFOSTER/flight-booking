"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CommonValuesSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const images = [
    "/Nigeria 1.jpg",
    "/Nigeria 2.jpg",
    "/nigeia 3.jpg",
    "/nigeria 4.jpg",
    "/nigeria 5.jpg",
    "/nigeria 6.jpg",
    "/nigeria 7.jpg",
    "/nigeria 8.jpg",
    "/nigeria 9.jpg",
    "/nigeria 10.jpg",
    "/nigeria 11.jpg",
  ];

  const itemsPerView = 4;

  // Auto-play slides
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (images.length - itemsPerView + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [autoPlay, images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + 1 < images.length - itemsPerView + 1 ? prev + 1 : 0
    );
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev - 1 >= 0 ? prev - 1 : images.length - itemsPerView
    );
    setAutoPlay(false);
  };

  const dotCount = Math.max(images.length - itemsPerView + 1, 1);

  return (
    <section className="py-24 bg-zinc-50 dark:bg-black/30">
      <div className="container mx-auto px-6 md:px-12">
        {/* Content */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Common <span className="text-accent">Values</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl font-medium">
            Whether you are from the North, South, East or West, we work diligently to meet your expectations.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Carousel */}
          <div className="relative w-full overflow-hidden">
            {/* Images Container */}
            <div className="flex gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 transition-all duration-500 ease-out ${
                    index >= currentSlide && index < currentSlide + itemsPerView
                      ? "w-1/4 opacity-100"
                      : "w-1/4 opacity-0 hidden"
                  }`}
                >
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-900 shadow-xl">
                    <Image
                      src={image}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      priority={index < 4}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center text-accent hover:bg-accent/30 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center text-accent hover:bg-accent/30 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2 justify-center mt-12">
            {Array.from({ length: dotCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setAutoPlay(false);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-accent w-8"
                    : "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
