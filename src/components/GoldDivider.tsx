import { motion } from 'framer-motion';

export default function GoldDivider() {
  return (
    <div className="flex items-center justify-center py-12 opacity-60">
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100px", opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mx-4 text-gold text-xl"
      >
        ❦
      </motion.div>
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100px", opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
      />
    </div>
  );
}
