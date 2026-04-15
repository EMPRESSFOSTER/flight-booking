"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function AirlineInfoSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <style>{`
          @keyframes bounce-shine {
            0%, 100% {
              transform: translateY(0);
              box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
            }
            50% {
              transform: translateY(-12px);
              box-shadow: 0 20px 40px rgba(59, 130, 246, 0.6);
            }
          }

          @keyframes shine {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }

          .button-bounce-shine {
            animation: bounce-shine 2s infinite;
            position: relative;
            overflow: hidden;
          }

          .button-bounce-shine::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
            animation: shine 2s infinite;
          }

          .button-bounce-shine:hover {
            animation: bounce-shine 1.5s infinite;
          }
        `}</style>
      )}

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Background"
            fill
            className="object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/40" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center space-y-6">
            {/* Main Description */}
            <p className="text-lg md:text-xl text-zinc-100 leading-relaxed font-medium">
              SkyWay Travel is your trusted partner in creating unforgettable journeys across Africa and beyond. 
              We specialize in seamless flight bookings, luxury accommodations, and personalized travel experiences 
              that cater to your unique preferences and budget.
            </p>

            {/* Secondary Description */}
            <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
              Be a part of our <span className="text-accent font-semibold">SkyWay Travel</span> family and experience the best of air travel with world-class service, competitive pricing, and 24/7 customer support.
            </p>

            {/* Call to Action */}
            <div className="pt-6">
              <button className="button-bounce-shine px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent/90 transition-colors duration-300">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
