import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"

const gifts = [
  {
    label: "A Wish",
    content:
      "May every book you open lead you to a world more beautiful than the last, and may every chapter of your life be worth reading twice.",
    color: "border-venus-gold",
    bg: "bg-venus-gold/10",
  },
  {
    label: "A Promise",
    content:
      "That no matter how many stars fill the sky, none will shine as brightly as the ones reserved for your story.",
    color: "border-venus-rose",
    bg: "bg-venus-rose/10",
  },
  {
    label: "A Secret",
    content:
      "The shooting star from Venus? It carried this message across the cosmos just for you. You are extraordinary.",
    color: "border-venus-violet",
    bg: "bg-venus-violet/10",
  },
  {
    label: "A Gift",
    content:
      "This entire website --- every star, every word, every pixel --- was made with you in mind. Happy Birthday, Venus.",
    color: "border-venus-gold",
    bg: "bg-venus-gold/10",
  },
]

export function GiftBoxesSection() {
  return (
    <SectionWrapper className="bg-venus-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl">
        <GoldDivider />

        <h2 className="mb-6 text-center font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-5xl">
          Gifts
        </h2>
        <p className="mb-16 text-center font-serif text-lg text-venus-paper/50">
          Click each box to reveal what&apos;s inside
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {gifts.map((gift, i) => (
            <GiftBox key={i} gift={gift} index={i} />
          ))}
        </div>

        <GoldDivider />
      </div>
    </SectionWrapper>
  )
}

function GiftBox({
  gift,
  index,
}: {
  gift: (typeof gifts)[number]
  index: number
}) {
  const [opened, setOpened] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <motion.button
        onClick={() => setOpened(!opened)}
        className={`w-full cursor-pointer rounded-lg border ${gift.color}/30 ${gift.bg} p-8 text-left transition-colors hover:${gift.bg.replace("/10", "/20")}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <span className="mb-4 text-4xl">🎁</span>
              <span className="font-[Cinzel] text-lg tracking-wider text-venus-paper/80">
                {gift.label}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 block font-[Cinzel] text-sm tracking-wider text-venus-gold/60 uppercase">
                {gift.label}
              </span>
              <p className="font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/80">
                {gift.content}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
