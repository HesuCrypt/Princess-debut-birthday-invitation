import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    setTimeout(onComplete, 2500); // Wait for animation to finish before unmounting
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <motion.div 
        className="relative w-full max-w-md p-4 cursor-pointer perspective-1000" 
        onClick={handleOpen}
        animate={isOpen ? { scale: [1, 0.9, 1.1], rotate: [0, -2, 2, 0] } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 absolute -top-24 left-0 right-0 z-20"
            >
              <p className="text-gold font-serif italic mb-2 text-lg">You have received an invitation</p>
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/50 text-xs uppercase tracking-[0.3em]"
              >
                Tap to open
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope Container */}
        <motion.div 
          className="relative w-full aspect-[4/3] mx-auto"
          whileHover={!isOpen ? { scale: 1.02, rotate: [0, -1, 1, -1, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          {/* Magic Dust Particles */}
          <AnimatePresence>
            {isOpen && [...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-gold z-30"
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1, 0], 
                  x: (Math.random() - 0.5) * 400, 
                  y: (Math.random() - 0.5) * 400,
                  opacity: 0
                }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
              />
            ))}
          </AnimatePresence>

          {/* Envelope (Front) */}
          <motion.div
            className="absolute inset-0 z-10 backface-hidden"
            animate={isOpen ? { 
              rotateX: [0, 90], 
              opacity: [1, 0],
              scale: [1, 1.5]
            } : { rotateX: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
             <div className="w-full h-full bg-[#1a0505] border border-gold/30 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden relative">
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-transparent to-black/40" />
                
                {/* Shimmer Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                />
                
                {/* Wax Seal */}
                <motion.div 
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B0000] to-[#3a0000] border-2 border-gold/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center z-20 relative"
                  whileHover={{ scale: 1.1 }}
                >
                   <div className="absolute inset-0 rounded-full border border-white/10" />
                   <span className="text-gold font-display text-3xl drop-shadow-md">S</span>
                </motion.div>
                
                {/* Decorative Lines */}
                <div className="absolute top-8 left-8 right-8 bottom-8 border border-gold/10 rounded-sm" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
             </div>
          </motion.div>
          
          {/* Flash Effect */}
          <motion.div
            className="absolute inset-0 bg-white z-20 pointer-events-none mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* Invitation Card (Revealed) */}
          <motion.div
            className="absolute inset-0 bg-[#0a0a0a] border border-gold/50 rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.3)] flex flex-col items-center justify-center p-8 text-center z-0"
            initial={{ scale: 0.8, opacity: 0, rotateX: -20, y: 50, filter: "blur(10px)" }}
            animate={isOpen ? { 
              scale: 1, 
              opacity: 1, 
              rotateX: 0,
              y: 0,
              filter: "blur(0px)"
            } : { scale: 0.8, opacity: 0, rotateX: -20, y: 50, filter: "blur(10px)" }}
            transition={{ delay: 0.4, duration: 1.2, type: "spring", bounce: 0.5 }}
          >
             {/* Card Content */}
             <div className="relative z-10">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={isOpen ? { scale: 1 } : { scale: 0 }}
                 transition={{ delay: 1, type: "spring" }}
                 className="w-12 h-1 bg-gold/50 mx-auto mb-6"
               />
               <h1 className="font-display text-4xl md:text-5xl text-gold-gradient mb-4 drop-shadow-lg">Princess Sophia</h1>
               <div className="flex items-center justify-center gap-4 mb-4 opacity-60">
                  <span className="h-px w-8 bg-gold"></span>
                  <span className="text-gold text-xs uppercase tracking-widest">Est. 2008</span>
                  <span className="h-px w-8 bg-gold"></span>
               </div>
               <p className="font-serif text-ivory/90 italic text-lg">18th Birthday Celebration</p>
             </div>
             
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
