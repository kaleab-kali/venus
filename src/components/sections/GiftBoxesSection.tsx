import { memo, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"

const GIFTS = [
  {
    icon: "\uD83C\uDF39",
    label: "Flowers",
    content: "A bouquet as beautiful as you. Every petal picked with thought, because someone like you deserves flowers just because.",
    accent: "venus-rose",
  },
  {
    icon: "\uD83C\uDF6B",
    label: "Chocolates",
    content: "The finest chocolates for the finest soul. Sweet, rich, and impossible to have just one. Much like conversations with you.",
    accent: "venus-gold",
  },
  {
    icon: "\uD83C\uDFF0",
    label: "Lunch at the Palace",
    content: "A princess belongs in a palace. A special lunch at the National Palace, because you deserve to dine where royalty does.",
    accent: "venus-violet",
  },
  {
    icon: "\uD83E\uDEF6",
    label: "Unlimited Hugs",
    content: "An unlimited supply of the longest, warmest hugs. No expiry date, no limit, redeemable anytime you need one.",
    accent: "venus-rose",
  },
  {
    icon: "\u2728",
    label: "Surprise Gift",
    content: "This one stays a mystery until we meet. Just know it was chosen with you in mind, and it is going to make you smile.",
    accent: "venus-gold",
  },
] as const

const ACCENT_STYLES = {
  "venus-rose": {
    border: "border-venus-rose/30",
    bg: "bg-venus-rose/5",
    bgOpen: "bg-venus-rose/10",
    glow: "shadow-venus-rose/20",
    text: "text-venus-rose",
    ribbon: "bg-venus-rose/40",
  },
  "venus-gold": {
    border: "border-venus-gold/30",
    bg: "bg-venus-gold/5",
    bgOpen: "bg-venus-gold/10",
    glow: "shadow-venus-gold/20",
    text: "text-venus-gold",
    ribbon: "bg-venus-gold/40",
  },
  "venus-violet": {
    border: "border-venus-violet/30",
    bg: "bg-venus-violet/5",
    bgOpen: "bg-venus-violet/10",
    glow: "shadow-venus-violet/20",
    text: "text-venus-violet",
    ribbon: "bg-venus-violet/40",
  },
} as const

const LID_VARIANTS = {
  closed: { rotateX: 0, y: 0 },
  open: { rotateX: -120, y: -20 },
}

const CONTENT_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

const GiftBox = memo(
  ({ gift, index }: { gift: (typeof GIFTS)[number]; index: number }) => {
    const [opened, setOpened] = useState(false)
    const styles = ACCENT_STYLES[gift.accent]

    const handleClick = useCallback(() => {
      setOpened((prev) => !prev)
    }, [])

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12, duration: 0.5 }}
        style={{ perspective: "800px" }}
      >
        <motion.button
          onClick={handleClick}
          className={`group relative w-full cursor-pointer overflow-hidden rounded-xl border ${styles.border} ${opened ? styles.bgOpen : styles.bg} p-0 text-left transition-shadow duration-500 ${opened ? `shadow-lg ${styles.glow}` : ""}`}
          whileHover={opened ? {} : { scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Box body */}
          <div className="relative min-h-[200px] md:min-h-[220px]">
            {/* Ribbon cross (visible when closed) */}
            <AnimatePresence>
              {!opened && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute inset-0 z-10"
                >
                  <div className={`absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 ${styles.ribbon}`} />
                  <div className={`absolute left-0 top-1/2 h-3 w-full -translate-y-1/2 ${styles.ribbon}`} />
                  <div className={`absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full ${styles.ribbon}`} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lid */}
            <motion.div
              variants={LID_VARIANTS}
              animate={opened ? "open" : "closed"}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
              className={`absolute inset-x-0 top-0 z-20 rounded-t-xl border-b ${styles.border} ${styles.bg} backdrop-blur-sm`}
            >
              <div className="flex flex-col items-center justify-center py-8">
                <motion.span
                  className="mb-3 text-5xl"
                  animate={opened ? { scale: [1, 1.3, 0.8], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {gift.icon}
                </motion.span>
                <span className={`font-[Cinzel] text-lg tracking-wider ${styles.text}`}>
                  {gift.label}
                </span>
                <span className="mt-2 font-[EB_Garamond] text-xs uppercase tracking-[0.2em] text-venus-paper/30">
                  {opened ? "tap to close" : "tap to open"}
                </span>
              </div>
            </motion.div>

            {/* Gift content (revealed) */}
            <motion.div
              variants={CONTENT_VARIANTS}
              initial="hidden"
              animate={opened ? "visible" : "hidden"}
              transition={{ delay: opened ? 0.3 : 0, duration: 0.5, ease: "easeOut" }}
              className="flex min-h-[200px] flex-col items-center justify-center px-6 py-8 text-center md:min-h-[220px] md:px-10"
            >
              <span className="mb-4 text-4xl">{gift.icon}</span>
              <span className={`mb-3 block font-[Cinzel] text-sm uppercase tracking-[0.2em] ${styles.text}/60`}>
                {gift.label}
              </span>
              <p className="font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/85 md:text-xl">
                {gift.content}
              </p>
            </motion.div>
          </div>
        </motion.button>
      </motion.div>
    )
  },
  (prev, next) => prev.index === next.index,
)
GiftBox.displayName = "GiftBox"

const GiftBoxesSectionInner = () => (
  <SectionWrapper className="bg-venus-black/80 px-6 py-24 md:px-12">
    <div className="mx-auto max-w-4xl">
      <GoldDivider />

      <h2 className="mb-6 text-center font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-5xl">
        Gifts For You
      </h2>
      <p className="mb-16 text-center font-serif text-lg text-venus-paper/50">
        Tap each box to unwrap your gift
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {GIFTS.map((gift, i) => (
          <GiftBox key={gift.label} gift={gift} index={i} />
        ))}
      </div>

      <GoldDivider />
    </div>
  </SectionWrapper>
)

export const GiftBoxesSection = memo(GiftBoxesSectionInner, () => true)
GiftBoxesSection.displayName = "GiftBoxesSection"
