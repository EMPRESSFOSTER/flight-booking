"use client";

import { useState } from "react";
import { Plane, MapPin, Calendar, Users, Briefcase, ChevronDown } from "lucide-react";

export function FlightSearchCard() {
  const [tripType, setTripType] = useState("return");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("15-Apr-2026");
  const [returnDate, setReturnDate] = useState("19-Apr-2026");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [evoucher, setEvoucher] = useState("");

  return (
    <div className="w-full max-w-lg glass rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane size={24} className="text-red-600" />
          <h2 className="text-xl font-black text-red-600">Book a Flight</h2>
        </div>
        <ChevronDown size={24} className="text-zinc-400 cursor-pointer hover:text-white transition-colors" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* From / To */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">From</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select city"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent transition-colors"
              />
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">To</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select city"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent transition-colors"
              />
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Trip Type Toggle */}
        <div className="flex gap-3">
          <button
            onClick={() => setTripType("return")}
            className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
              tripType === "return"
                ? "bg-zinc-700 text-white"
                : "bg-white/10 text-zinc-400 hover:bg-white/15"
            }`}
          >
            ↔ Return
          </button>
          <button
            onClick={() => setTripType("oneway")}
            className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
              tripType === "oneway"
                ? "bg-zinc-700 text-white"
                : "bg-white/10 text-zinc-400 hover:bg-white/15"
            }`}
          >
            → One Way
          </button>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Depart</label>
            <div className="relative">
              <input
                type="text"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent transition-colors"
              />
              <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {tripType === "return" && (
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Return</label>
              <div className="relative">
                <input
                  type="text"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent transition-colors"
                />
                <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>
          )}
        </div>

        {/* Passengers */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Adult</label>
            <div className="relative">
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num} className="bg-zinc-900">
                    {num}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Child</label>
            <div className="relative">
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num} className="bg-zinc-900">
                    {num}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Infant</label>
            <div className="relative">
              <select
                value={infants}
                onChange={(e) => setInfants(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              >
                {[0, 1, 2, 3].map((num) => (
                  <option key={num} value={num} className="bg-zinc-900">
                    {num}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* EVoucher */}
        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">EVoucher</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter voucher code"
              value={evoucher}
              onChange={(e) => setEvoucher(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent transition-colors"
            />
            <Briefcase size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full bg-red-600 text-white py-3 rounded-lg font-black hover:bg-red-700 transition-colors mt-4">
          Search Flights
        </button>
      </div>

      {/* Manage Booking */}
      <div className="bg-white/5 px-6 py-4 border-t border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-2">
          <Plane size={20} className="text-red-600" />
          <h3 className="font-black text-red-600">Manage Booking</h3>
        </div>
        <ChevronDown size={24} className="text-zinc-400" />
      </div>
    </div>
  );
}
