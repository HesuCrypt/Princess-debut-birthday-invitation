import { motion } from 'framer-motion';

export default function VenueGallery() {
    const images = [
        { src: '/assets/venue/venue1.jpg', alt: 'Venue View 1' },
        { src: '/assets/venue/venue2.jpg', alt: 'Venue View 2' },
        { src: '/assets/venue/venue3.jpg', alt: 'Venue View 3' },
    ];

    return (
        <section className="py-24 px-4 bg-black/30">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="font-script text-3xl text-gold/60 block mb-2">The Setting</span>
                    <h2 className="font-display text-4xl text-gold tracking-wider mb-4">Our Venue</h2>
                    <div className="w-16 h-px bg-gold/30 mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative aspect-video overflow-hidden rounded-lg border border-gold/20 group luxury-card-hover"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 font-sans text-xs text-gold/40 uppercase tracking-[0.3em]"
                >
                    Olympus Venue & Cafe
                </motion.p>
            </div>
        </section>
    );
}
