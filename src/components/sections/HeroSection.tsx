import { motion } from "framer-motion"

const letters = "VENUS".split("")

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-venus-black">
      {/* Title */}
      <div className="flex">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: "easeOut" }}
            className="font-[Cinzel] text-7xl font-bold tracking-[0.3em] text-venus-gold md:text-9xl"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 1.2 }}
        className="mt-8 font-serif text-xl tracking-widest text-venus-rose md:text-2xl"
      >
        A Journey Through the Stars
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <span className="font-[EB_Garamond] text-sm tracking-wider text-venus-paper/50">
          scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="h-6 w-px bg-venus-gold/50"
        />
      </motion.div>
    </section>
  )
}
