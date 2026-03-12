import { memo } from "react"
import { motion } from "framer-motion"
import { GoldDivider } from "@/components/shared/GoldDivider"

const VENUS_ACRONYM = [
  {
    letter: "V",
    word: "Vibrant",
    description: "A life that fills every room with warmth and color",
    accent: "#D4AF37",
  },
  {
    letter: "E",
    word: "Extraordinary",
    description: "Because ordinary was never in her nature",
    accent: "#CFA6A6",
  },
  {
    letter: "N",
    word: "Nurturing",
    description: "She carries the whole world gently in her hands",
    accent: "#8C7AE6",
  },
  {
    letter: "U",
    word: "Unique",
    description: "There is no constellation quite like her",
    accent: "#F5F1E8",
  },
  {
    letter: "S",
    word: "Starlit",
    description: "Born beneath the watchful light of the evening star",
    accent: "#D4AF37",
  },
] as const

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
  }),
} as const

const VenusAcronymSectionInner = () => (
  <section className="bg-venus-black/80 px-6 py-24 md:px-12" style={{ position: "relative", zIndex: 20 }}>
    <div className="mx-auto max-w-3xl">
      <GoldDivider />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-4 text-center font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-5xl"
      >
        V.E.N.U.S
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-16 text-center font-[EB_Garamond] text-lg text-venus-paper/60 italic"
      >
        Every letter holds a meaning
      </motion.p>

      <div className="flex flex-col gap-8">
        {VENUS_ACRONYM.map((item, i) => (
          <motion.div
            key={item.letter}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex items-center gap-6 rounded-lg border border-venus-gold/10 bg-venus-gold/5 p-6 md:p-8"
          >
            <span
              className="flex-shrink-0 font-[Cinzel] text-5xl font-bold md:text-6xl"
              style={{ color: item.accent }}
            >
              {item.letter}
            </span>
            <div>
              <h3
                className="mb-1 font-[Cinzel] text-xl tracking-wider md:text-2xl"
                style={{ color: item.accent }}
              >
                {item.word}
              </h3>
              <p className="font-[EB_Garamond] text-base leading-relaxed text-venus-paper/70 md:text-lg">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <GoldDivider />
    </div>
  </section>
)

export const VenusAcronymSection = memo(VenusAcronymSectionInner, () => true)
VenusAcronymSection.displayName = "VenusAcronymSection"
