"use client";

import Image from "next/image";
import { MapPin, Plane } from "lucide-react";

export function DestinationsSections() {
  const domesticDestinations = [
    {
      id: 1,
      image: "/Nigeria 1.jpg",
      title: "Lagos",
      subtitle: "The Gateway to West Africa",
      description: "Experience Nigeria's bustling energy, vibrant nightlife, world-class restaurants, and beautiful beaches.",
    },
    {
      id: 2,
      image: "/Nigeria 2.jpg",
      title: "Abuja",
      subtitle: "Nigeria's Modern Capital",
      description: "Discover stunning architecture, cultural attractions, serene parks, and excellent hospitality.",
    },
    {
      id: 3,
      image: "/nigeia 3.jpg",
      title: "Northern Nigeria",
      subtitle: "Land of Heritage",
      description: "Immerse in centuries-old traditions, ancient Hausa culture, and breathtaking historical monuments.",
    },
  ];

  const regionalDestinations = [
    {
      id: 4,
      image: "/Nigeria 4.jpg",
      title: "Accra, Ghana",
      subtitle: "West Africa's Gem",
      description: "Explore beautiful beaches, colorful markets, historical landmarks, and vibrant local culture.",
    },
    {
      id: 5,
      image: "/Nigeria 5.jpg",
      title: "Nairobi, Kenya",
      subtitle: "Safari Capital",
      description: "Experience wildlife safaris, stunning national parks, and African adventure at its finest.",
    },
    {
      id: 6,
      image: "/Nigeria 6.jpg",
      title: "Cape Town, South Africa",
      subtitle: "City of Wonders",
      description: "Witness Table Mountain, pristine beaches, Wine Country, and cosmopolitan city life.",
    },
  ];

  const internationalDestinations = [
    {
      id: 7,
      image: "/japan.jpg",
      title: "Tokyo, Japan",
      subtitle: "Land of Innovation",
      description: "Blend of ancient temples, cutting-edge technology, stunning gardens, and world-renowned cuisine.",
    },
    {
      id: 8,
      image: "/paris.jpg",
      title: "Paris, France",
      subtitle: "The City of Love",
      description: "Iconic landmarks, world-class museums, charming cafés, and timeless romantic ambiance.",
    },
    {
      id: 9,
      image: "/china.jpg",
      title: "Beijing, China",
      subtitle: "Ancient Wonders",
      description: "Imperial heritage, the Great Wall, traditional architecture, and perfect blend of history and modernity.",
    },
  ];

  const DestinationCard = ({ destination }: { destination: typeof domesticDestinations[0] }) => (
    <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 shadow-xl hover:shadow-2xl transition-all">
      {/* Image */}
      <Image
        src={destination.image}
        alt={destination.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 group-hover:from-black/90 transition-all" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
        <div className="flex items-center gap-2 text-accent bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full w-fit">
          <Plane size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Destination</span>
        </div>

        <div>
          <p className="text-accent text-sm font-bold mb-2">{destination.subtitle}</p>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{destination.title}</h3>
          <p className="text-sm md:text-base text-zinc-200 leading-relaxed line-clamp-2 group-hover:line-clamp-4 transition-all">
            {destination.description}
          </p>
        </div>

        {/* Learn More Button */}
        <button className="mt-4 inline-flex items-center gap-2 text-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          Explore <Plane size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-black">
      {/* Domestic Destinations */}
      <section className="py-20 md:py-28 border-b border-zinc-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <span className="text-accent font-black uppercase tracking-widest text-sm">Domestic Routes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Explore <span className="text-accent">Nigeria</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Discover the beauty, culture, and hospitality of Nigeria with our comprehensive domestic flight network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {domesticDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Regional Destinations */}
      <section className="py-20 md:py-28 border-b border-zinc-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-blue-500 rounded-full" />
              <span className="text-blue-400 font-black uppercase tracking-widest text-sm">Regional Routes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Discover <span className="text-blue-400">Africa</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Connect to major African destinations with ease. Experience the diversity and richness of the African continent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regionalDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* International Destinations */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-purple-500 rounded-full" />
              <span className="text-purple-400 font-black uppercase tracking-widest text-sm">International Routes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Fly <span className="text-purple-400">Worldwide</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Explore the world's most iconic destinations with our global flight network spanning multiple continents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {internationalDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Book Your Adventure?</h3>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Choose from thousands of flights to your favorite destinations. Book with SkyWay Travel today.
            </p>
            <button className="button-bounce-shine px-10 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent/90 transition-colors text-lg">
              Book Your Flight
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
