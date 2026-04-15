"use client";

import { Mail, Phone, MapPin, Share2, Send, Heart, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-black mb-3">
                Subscribe to Our <span className="text-accent">Newsletter</span>
              </h3>
              <p className="text-zinc-400">
                Get the latest travel deals, destination guides, and exclusive offers directly to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                Subscribe
                <ArrowRight size={18} />
              </button>
            </form>
            {subscribed && (
              <p className="text-accent col-span-full text-sm font-medium">
                ✓ Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h4 className="text-xl font-black mb-4 text-accent">SkyWay Travel</h4>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Your trusted partner in creating unforgettable journeys across the world.
            </p>
            <p className="text-zinc-500 text-xs">© {currentYear} SkyWay Travel. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-black text-sm uppercase tracking-widest mb-6 text-white">Company</h5>
            <ul className="space-y-3">
              {["About Us", "Careers", "Blog", "Press"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-zinc-400 hover:text-accent transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-black text-sm uppercase tracking-widest mb-6 text-white">Services</h5>
            <ul className="space-y-3">
              {["Flight Bookings", "Hotels", "Tours", "Travel Insurance"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-zinc-400 hover:text-accent transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-black text-sm uppercase tracking-widest mb-6 text-white">Support</h5>
            <ul className="space-y-3">
              {["Help Center", "Contact Us", "FAQ", "Booking Status"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-zinc-400 hover:text-accent transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-black text-sm uppercase tracking-widest mb-6 text-white">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-zinc-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-zinc-400 text-sm">support@skyway.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-zinc-400 text-sm">Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Share2, label: "Facebook" },
                { icon: Send, label: "Twitter" },
                { icon: Heart, label: "Instagram" },
                { icon: Award, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-zinc-400 hover:bg-accent hover:border-accent hover:text-white transition-all"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-500">
              <Link href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Cookie Policy
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
