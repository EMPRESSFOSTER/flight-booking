"use client";

import Image from "next/image";

export function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      image: "/japan.jpg",
      title: "Tokyo, Japan",
      description: "Experience ancient temples blended with cutting-edge technology, stunning gardens, and world-renowned cuisine in Asia's most vibrant metropolis.",
    },
    {
      id: 2,
      image: "/paris.jpg",
      title: "Paris, France",
      description: "The city of love awaits with iconic landmarks, world-class museums, charming cafés, and timeless romantic ambiance that captivates every visitor.",
    },
    {
      id: 3,
      image: "/china.jpg",
      title: "Beijing, China",
      description: "Discover ancient imperial heritage, the majestic Great Wall, traditional architecture, and a perfect blend of history and modern development.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Popular <span className="text-accent">Destinations</span>
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium">
              Discover the most beautiful places around the world with exclusive deals and seamless travel planning.
            </p>
          </div>
          <button className="text-accent font-bold flex items-center gap-2 group">
            View all destinations 
            <span className="w-8 h-[2px] bg-accent transition-all group-hover:w-12"></span>
          </button>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-2xl transition-transform hover:-translate-y-2"
            >
              {/* Image */}
              <Image
                src={destination.image}
                alt={destination.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 group-hover:from-black/95 transition-all" />

              {/* Content */}
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">Explore</span>
                <h3 className="text-3xl font-bold text-white mb-3">{destination.title}</h3>
                <p className="text-sm md:text-base text-zinc-200 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
