import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import Hero3DRose from './components/Hero3DRose';
import Intro from './components/Intro';
import Countdown from './components/Countdown';
import Details from './components/Details';
import MusicPlayer, { MusicPlayerHandle } from './components/MusicPlayer';
import CustomCursor from './components/CustomCursor';
import DecorativeBackground from './components/DecorativeBackground';
import GoldDivider from './components/GoldDivider';
import ThemePalette from './components/ThemePalette';
import EventItinerary from './components/EventItinerary';
import { ChevronDown } from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gold font-serif tracking-widest animate-pulse">LOADING CELEBRATION</p>
      </div>
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Attempt to play music after user interaction (intro click)
    if (musicPlayerRef.current) {
      musicPlayerRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-black text-ivory selection:bg-crimson selection:text-white overflow-x-hidden">
      <CustomCursor />
      <MusicPlayer ref={musicPlayerRef} />
      <DecorativeBackground />

      <AnimatePresence>
        {showIntro && <Intro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <main className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'} relative z-10`}>
        
        {/* HERO SECTION */}
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          {/* 3D Background */}
          <div className="absolute inset-0 z-0">
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Hero3DRose />
              </Canvas>
            </Suspense>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-10 pointer-events-none opacity-80" />

          {/* Hero Content */}
          <div className="relative z-20 text-center px-4 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="mb-6 flex items-center justify-center gap-4"
            >
              <div className="h-px w-12 bg-gold/50" />
              <p className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-gold">
                You Are Cordially Invited
              </p>
              <div className="h-px w-12 bg-gold/50" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.8, duration: 1 }}
              className="font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient mb-4 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Princess Sophia
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
              className="font-script text-4xl md:text-6xl text-crimson mb-10 text-glow"
            >
              18th Birthday Celebration
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5 }}
              onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-4 overflow-hidden rounded-full bg-transparent border border-gold/40 text-gold shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              <span className="relative z-10 font-display uppercase tracking-[0.2em] text-xs md:text-sm">Enter the Celebration</span>
              <div className="absolute inset-0 bg-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            className="absolute bottom-10 z-20 animate-bounce text-gold/50"
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        <GoldDivider />

        {/* ABOUT SECTION */}
        <section id="details" className="py-24 px-4 relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <span className="font-script text-4xl text-gold/60 mb-2 block">The Celebration</span>
              <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-8 tracking-wide">A Night of Elegance</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-crimson to-transparent mx-auto mb-8" />
              <p className="font-serif text-xl md:text-2xl text-ivory/90 leading-relaxed max-w-3xl mx-auto italic">
                "Join us for an enchanting evening of music, dining, and celebration as Princess Sophia steps into a new chapter of life. 
                Surrounded by the timeless beauty of red roses and the warmth of loved ones."
              </p>
            </motion.div>
            
            <Countdown />
          </div>
        </section>

        <GoldDivider />

        {/* DETAILS SECTION */}
        <section className="py-24 px-4 bg-gradient-to-b from-black/50 to-[#0f0202]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-script text-3xl text-gold/60 block mb-2">The Particulars</span>
              <h2 className="font-display text-4xl md:text-5xl text-gold tracking-wider">Event Details</h2>
            </div>
            <Details />
          </div>
        </section>

        <GoldDivider />

        {/* THEME & ITINERARY SECTION */}
        <section className="py-24 px-4 relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
           <div className="max-w-7xl mx-auto space-y-24 relative z-10">
              <ThemePalette />
              <EventItinerary />
           </div>
        </section>

        <GoldDivider />

        {/* FOOTER */}
        <footer className="py-16 text-center border-t border-gold/10 bg-black/80 backdrop-blur-md relative z-20">
          <div className="mb-6">
            <span className="font-display text-3xl text-gold-gradient">S</span>
          </div>
          <p className="font-display text-gold text-xl mb-3 tracking-widest">Princess Sophia's 18th</p>
          <p className="font-sans text-xs text-white/30 uppercase tracking-[0.3em]">Designed with Elegance</p>
        </footer>

      </main>
    </div>
  );
}

export default App;
