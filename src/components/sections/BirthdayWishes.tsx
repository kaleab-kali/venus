import { memo } from "react"
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"

const SPARKLE_COUNT = 20
const SPARKLE_POSITIONS = Array.from({ length: SPARKLE_COUNT }).map((_, i) => ({
  left: `${(i * 37 + 13) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: (i * 0.3) % 3,
  size: 2 + (i % 3),
}))

const PARAGRAPHS = [
  "Today the world celebrates the day you arrived in it, and honestly, the world got better that day.",
  "You are the kind of person who makes people feel seen. You listen with your whole self. You laugh in a way that makes everyone around you want to laugh too. You carry depth and lightness at the same time, and that is one of the rarest things a person can be.",
  "I hope this year brings you everything you have been quietly wishing for. The adventures, the peace, the moments that take your breath away. I hope you read books that change you, meet people who match your energy, and wake up more mornings feeling exactly like yourself.",
  "You deserve a birthday as extraordinary as the person you are. Not just gifts and cake, but the feeling of being truly known and deeply appreciated.",
  "Here is to another year of you being fearless, kind, and completely yourself.",
] as const

const STAGGER_DELAY = 0.15

const BirthdayWishesInner = () => (
  <SectionWrapper className="relative min-h-screen overflow-hidden bg-venus-black px-6 py-24 md:px-12">
    {/* CSS sparkle particles */}
    <div className="pointer-events-none absolute inset-0">
      {SPARKLE_POSITIONS.map((sparkle, i) => (
        <div
          key={i}
          className="absolute animate-pulse rounded-full bg-venus-gold/30"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${2 + sparkle.delay}s`,
          }}
        />
      ))}
    </div>

    <GoldDivider />

    <div className="relative mx-auto max-w-2xl text-center">
      {PARAGRAPHS.map((text, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * STAGGER_DELAY, duration: 0.8, ease: "easeOut" }}
          className="mb-8 font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/85 md:text-xl"
        >
          {text}
        </motion.p>
      ))}

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: PARAGRAPHS.length * STAGGER_DELAY, duration: 1, ease: "easeOut" }}
        className="mt-16 font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-6xl"
      >
        Happy Birthday, Venus
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: PARAGRAPHS.length * STAGGER_DELAY + 0.5, duration: 1 }}
        className="mt-4 font-[EB_Garamond] text-lg text-venus-paper/50 italic"
      >
        {"\u2728"} March 13, 2026 {"\u2728"}
      </motion.div>
    </div>

    <GoldDivider />
  </SectionWrapper>
)

export const BirthdayWishes = memo(BirthdayWishesInner, () => true)
BirthdayWishes.displayName = "BirthdayWishes"
