"use client";

import { 
  Bed, 
  Plane, 
  TrainFront, 
  Car, 
  Compass, 
  Building2, 
  Ship, 
  ShieldCheck, 
  Map, 
  Palmtree, 
  Gift, 
  ChevronRight 
} from "lucide-react";

const services = [
  { icon: Bed, label: "Hotels & Homes" },
  { icon: Plane, label: "Flights", active: true },
  { icon: TrainFront, label: "Trains" },
  { icon: Car, label: "Cars" },
  { icon: Compass, label: "Attractions & Tours" },
  { icon: Building2, label: "Flight + Hotel" },
  { type: "separator" },
  { icon: Ship, label: "Cruises" },
  { icon: ShieldCheck, label: "Travel Insurance" },
  { icon: Map, label: "Private Tours" },
  { icon: Palmtree, label: "Group Tours" },
  { icon: Gift, label: "Gift Cards" },
];

export function ServiceSidebar() {
  return (
    <div className="glass rounded-[2rem] p-6 w-72 shadow-2xl border border-white/10 hidden xl:flex flex-col gap-1">
      {services.map((service, index) => {
        if (service.type === "separator") {
          return <div key={index} className="my-4 h-px bg-white/10 mx-2" />;
        }

        const Icon = service.icon!;
        return (
          <button
            key={service.label}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group cursor-pointer ${
              service.active 
                ? "bg-accent text-white shadow-lg shadow-accent/20 scale-105" 
                : "text-zinc-400 hover:text-white hover:bg-white/5 hover:scale-105 active:scale-95"
            }`}
          >
            <div className={`${service.active ? "text-white" : "text-zinc-500 group-hover:text-accent group-hover:animate-bounce"} transition-colors`}>
              <Icon size={22} strokeWidth={service.active ? 2.5 : 2} />
            </div>
            <span className="text-[15px] font-bold tracking-tight">
              {service.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
