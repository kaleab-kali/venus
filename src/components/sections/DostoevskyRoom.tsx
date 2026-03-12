import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"

export function DostoevskyRoom() {
  return (
    <SectionWrapper className="relative min-h-screen overflow-hidden bg-gradient-to-b from-venus-black via-[#1a1410] to-venus-black px-6 py-24 md:px-12">
      {/* Bookshelf ambiance (decorative borders) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-venus-gold to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-venus-gold to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-venus-gold to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-venus-gold to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="mb-6 font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-5xl">
            The Dostoevsky Room
          </h2>

          <p className="mb-16 font-serif text-lg text-venus-rose/80">
            Where great stories find their readers
          </p>
        </motion.div>

        {/* Bookshelves visual representation */}
        <div className="mb-16 grid grid-cols-5 gap-2 md:grid-cols-8">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="flex h-32 items-end justify-center rounded-t-sm border border-venus-gold/10 md:h-40"
              style={{
                background: `linear-gradient(180deg, ${
                  ["#2d1f14", "#1a1510", "#2a1a12", "#1f1612"][i % 4]
                } 0%, #0B0B0F 100%)`,
                width: `${Math.random() * 20 + 80}%`,
              }}
            >
              <div className="mb-2 h-px w-3/4 bg-venus-gold/20" />
            </motion.div>
          ))}
        </div>

        {/* Dostoevsky Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="relative mx-auto max-w-2xl px-8"
        >
          <span className="absolute -left-2 -top-6 font-[Cinzel] text-6xl text-venus-gold/30">
            &ldquo;
          </span>
          <p className="font-[EB_Garamond] text-2xl leading-relaxed text-venus-paper/90 italic md:text-3xl">
            Beauty will save the world.
          </p>
          <footer className="mt-6 font-serif text-lg text-venus-gold/70">
            --- Fyodor Dostoevsky, <em>The Idiot</em>
          </footer>
          <span className="absolute -bottom-6 -right-2 font-[Cinzel] text-6xl text-venus-gold/30">
            &rdquo;
          </span>
        </motion.blockquote>
      </div>
    </SectionWrapper>
  )
}
