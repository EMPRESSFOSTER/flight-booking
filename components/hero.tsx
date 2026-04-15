"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ServiceSidebar } from "./service-sidebar";
import { FlightSearchCard } from "./flight-search-card";

export function Hero() {
  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="SkyWay Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Modern multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/30 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.5)_100%)]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="flex flex-col xl:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Main Content */}
          <div className="flex-1 text-center xl:text-left">
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold tracking-wide uppercase mb-8">
                ✨ Next Generation Travel
              </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1]">
              Explore the World <br />
              <span className="text-gradient drop-shadow-sm">Seamlessly</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto xl:mx-0 mb-16 leading-relaxed">
              Book your next adventure with the world's most advanced flight search engine. 
              Real-time pricing, premium support, and zero hidden fees.
            </p>

            {/* Flight Search Card */}
            <div className="w-full flex justify-center xl:justify-start mb-10">
              <FlightSearchCard />
            </div>
          </div>

          {/* Right Column: Service Sidebar */}
          <div className="animate-in fade-in slide-in-from-right-12 duration-1000 delay-200">
            <ServiceSidebar />
          </div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-zinc-500 font-bold text-xs uppercase tracking-[0.3em]">
        <span className="animate-bounce">Scroll</span>
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-accent to-transparent p-[1px]">
          <div className="w-full h-1/3 bg-white rounded-full animate-infinite-scroll" />
        </div>
      </div>
    </div>
  );
}
