import { motion } from "framer-motion"

export function FinalSceneSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-venus-black/80" style={{ zIndex: 20 }}>
      {/* CSS starfield */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Venus glow */}
      <div className="absolute left-1/2 top-1/4 h-32 w-32 -translate-x-1/2 rounded-full bg-venus-gold/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="relative z-10 text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="font-[Cinzel] text-3xl font-bold leading-relaxed tracking-wider text-venus-gold md:text-5xl"
        >
          Every great story
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="mt-4 font-[Cinzel] text-3xl font-bold leading-relaxed tracking-wider text-venus-gold md:text-5xl"
        >
          deserves another chapter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="mt-16"
        >
          <p className="font-serif text-2xl tracking-widest text-venus-rose md:text-3xl">
            Happy Birthday
          </p>
          <p className="mt-2 font-[Cinzel] text-5xl font-bold tracking-[0.3em] text-venus-gold md:text-7xl">
            Veni
          </p>
          <p className="mt-8 font-[EB_Garamond] text-lg tracking-wide text-venus-paper/50 italic">
            by KG, a great admirer
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-venus-black to-transparent" />
    </section>
  )
}
