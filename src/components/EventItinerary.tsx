import { motion } from 'framer-motion';
import { Utensils, Music, Waves, GlassWater } from 'lucide-react';

export default function EventItinerary() {
  const events = [
    {
      icon: Waves,
      time: "05:00 PM",
      title: "Photos & Welcome",
      description: "Welcome gathering with family and friends for photos."
    },
    {
      icon: Utensils,
      time: "06:15 PM",
      title: "Opening Prayer & Dinner",
      description: "Opening prayer led by the Debutante, followed by dinner."
    },
    {
      icon: GlassWater,
      time: "07:30 PM",
      title: "The 18 Traditions",
      description: "18 Roses, 18 Candles, and 18 Blue Bills."
    },
    {
      icon: Music,
      time: "08:30 PM",
      title: "Blowing of the Candles",
      description: "Blowing of the cake candles."
    },
    {
      icon: Waves,
      time: "09:00 PM",
      title: "Free Time & Celebration",
      description: "Free time for swimming and celebration."
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <span className="font-script text-3xl text-gold/60 block mb-2">The Program</span>
        <h3 className="font-display text-4xl text-gold tracking-wider">Evening Itinerary</h3>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Center Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:-translate-x-1/2" />

        <div className="space-y-12 md:space-y-24">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Content Side */}
              <div className="flex-1 w-full pl-12 md:pl-0 md:text-center md:w-auto">
                <div className={`glass-panel p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-all duration-500 relative group ${index % 2 === 0 ? 'md:mr-12 md:text-right' : 'md:ml-12 md:text-left'
                  }`}>
                  <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gold rounded-full border-4 border-black z-10 hidden md:block ${index % 2 === 0 ? '-right-[58px]' : '-left-[58px]'
                    }`} />

                  <h4 className="font-display text-2xl text-gold mb-2">{event.title}</h4>
                  <p className="font-serif text-ivory/80 mb-4">{event.description}</p>
                  <span className="inline-block px-4 py-1 border border-gold/30 rounded-full text-xs font-sans uppercase tracking-widest text-gold/80">
                    {event.time}
                  </span>
                </div>
              </div>

              {/* Icon Center */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border border-gold/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <event.icon className="w-5 h-5 text-gold" />
              </div>

              {/* Empty Side for Balance */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
