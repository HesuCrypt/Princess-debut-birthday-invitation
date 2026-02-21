import { motion } from 'framer-motion';

export default function ThemePalette() {
  const colors = [
    { name: "Pristine White", hex: "#FAF9F6", class: "bg-[#FAF9F6]" },
    { name: "Royal Red", hex: "#C41E3A", class: "bg-[#C41E3A]" },
    { name: "Deep Burgundy", hex: "#5C0011", class: "bg-[#5C0011]" },
    { name: "Soft Apricot", hex: "#FBCEB1", class: "bg-[#FBCEB1]" }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <span className="font-script text-3xl text-gold/60 block mb-2">The Aesthetic</span>
        <h3 className="font-display text-3xl text-gold tracking-wider">Color Palette</h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4">
        {colors.map((color, index) => (
          <motion.div
            key={color.name}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group flex flex-col items-center"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gold/20 p-2 transition-transform duration-500 group-hover:scale-110 group-hover:border-gold/60">
              <div className={`w-full h-full rounded-full shadow-inner ${color.class} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                {/* Shine effect */}
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </div>
            </div>
            <p className="mt-4 font-serif text-lg text-ivory/90">{color.name}</p>
            <p className="font-sans text-xs text-gold/40 uppercase tracking-widest">{color.hex}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
