import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';

export default function Details() {
  const details = [
    {
      icon: Calendar,
      title: "The Date",
      content: "Saturday, April 18th, 2026",
      sub: "Save the date"
    },
    {
      icon: Clock,
      title: "The Time",
      content: "5:00 PM",
      sub: "Reception & Celebration"
    },
    {
      icon: MapPin,
      title: "The Venue",
      content: "Olympus Venue & Cafe",
      sub: "Celebration Venue"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {details.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          viewport={{ once: true }}
          className="relative group h-full"
        >
          {/* Decorative border frame */}
          <div className="absolute inset-0 border border-gold/20 rounded-xl transform rotate-1 transition-transform duration-500 group-hover:rotate-0" />

          <div className="glass-panel p-10 rounded-xl text-center border border-white/5 relative z-10 luxury-card-hover bg-black/40 h-full flex flex-col items-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/10 to-transparent flex items-center justify-center border border-gold/30 group-hover:border-gold/60 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.1)] shrink-0">
              <item.icon className="w-6 h-6 text-gold drop-shadow-md" />
            </div>

            <h3 className="font-display text-2xl text-gold mb-4 tracking-wide">{item.title}</h3>

            <div className="h-px w-12 bg-gold/30 mx-auto mb-6" />

            <div className="flex-grow flex flex-col justify-center">
              <p className="font-serif text-xl text-ivory mb-2 tracking-wide">{item.content}</p>
              <p className="font-sans text-xs text-gold/60 uppercase tracking-[0.2em]">{item.sub}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
