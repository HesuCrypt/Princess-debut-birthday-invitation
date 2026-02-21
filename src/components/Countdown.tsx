import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const targetDate = new Date('2026-04-18T17:00:00'); // April 18, 2026 at 5PM
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-5xl mx-auto px-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div className="glass-panel p-6 md:p-8 rounded-xl text-center relative overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="block text-5xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-b from-[#F4DFB0] via-[#D4AF37] to-[#AA771C] mb-2 tabular-nums drop-shadow-sm">
              {String(unit.value).padStart(2, '0')}
            </span>
            
            <div className="h-px w-8 bg-gold/20 mx-auto mb-3" />
            
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-ivory/60 font-sans group-hover:text-gold/80 transition-colors">
              {unit.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
