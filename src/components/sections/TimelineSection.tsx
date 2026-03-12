import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"

const MEMORIES = [
  {
    date: "The Beginning",
    title: "A Star is Born",
    description: "The universe aligned, and you came into existence --- a moment the stars had been preparing for.",
  },
  {
    date: "First Steps",
    title: "Finding Your Path",
    description: "Like Venus rising above the horizon, you began your journey --- curious, radiant, and unstoppable.",
  },
  {
    date: "Growing",
    title: "Blossoming",
    description: "With each passing year, you grew into someone extraordinary --- kind, brilliant, and beautifully unique.",
  },
  {
    date: "Discovery",
    title: "Finding Your Voice",
    description: "You discovered the worlds within books, the beauty in words, and the power of your own story.",
  },
  {
    date: "Today",
    title: "A New Chapter",
    description: "Here you stand, luminous as ever --- ready for everything the universe has prepared for you.",
  },
]

export function TimelineSection() {
  return (
    <SectionWrapper className="bg-venus-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <GoldDivider />

        <h2 className="mb-16 text-center font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-5xl">
          Timeline
        </h2>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-venus-gold/50 via-venus-gold/20 to-venus-gold/50" />

          {MEMORIES.map((memory, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              className={`relative mb-16 flex ${
                i % 2 === 0 ? "justify-end md:pr-[55%]" : "md:pl-[55%]"
              }`}
            >
              {/* Dot on the line */}
              <div className="absolute left-1/2 top-4 h-3 w-3 -translate-x-1/2 rotate-45 border border-venus-gold bg-venus-black" />

              <div className="w-full max-w-sm rounded-lg border border-venus-gold/15 bg-venus-gold/5 p-6">
                <span className="mb-1 block font-[Cinzel] text-xs tracking-[0.2em] text-venus-gold/60 uppercase">
                  {memory.date}
                </span>
                <h3 className="mb-2 font-serif text-xl text-venus-gold">
                  {memory.title}
                </h3>
                <p className="font-[EB_Garamond] text-base leading-relaxed text-venus-paper/70">
                  {memory.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <GoldDivider />
      </div>
    </SectionWrapper>
  )
}
