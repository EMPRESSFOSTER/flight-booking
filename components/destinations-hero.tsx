"use client";

import Image from "next/image";

export function DestinationsHero() {
  return (
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Destinations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.5)_100%)]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
          Explore Our <span className="text-accent">Worldwide</span> Destinations
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto">
          Discover amazing travel experiences across domestic, regional, and international destinations.
        </p>
      </div>
    </div>
  );
}
