import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"

const flowers = [
  { name: "Rose", meaning: "Love and devotion", color: "text-venus-rose" },
  { name: "Lily", meaning: "Purity and renewal", color: "text-venus-paper" },
  { name: "Violet", meaning: "Faithfulness and wisdom", color: "text-venus-violet" },
  { name: "Jasmine", meaning: "Grace and elegance", color: "text-venus-gold" },
]

export function GardenSection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-venus-black via-[#150f14] to-venus-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl">
        <GoldDivider />

        <h2 className="mb-6 text-center font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-5xl">
          Garden of Venus
        </h2>
        <p className="mb-16 text-center font-serif text-lg text-venus-rose/80">
          Where every bloom speaks a language of its own
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {flowers.map((flower, i) => (
            <motion.div
              key={flower.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group rounded-lg border border-venus-rose/10 bg-venus-rose/5 p-8 transition-colors hover:border-venus-rose/30"
            >
              <h3 className={`mb-2 font-serif text-2xl ${flower.color}`}>
                {flower.name}
              </h3>
              <p className="font-[EB_Garamond] text-lg text-venus-paper/70">
                {flower.meaning}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 text-center font-[EB_Garamond] text-xl leading-relaxed text-venus-paper/70 italic"
        >
          In the garden of Venus, beauty is not merely seen --- it is felt.
          Every petal, every fragrance, every color tells a story of something
          timeless and extraordinary.
        </motion.p>

        <GoldDivider />
      </div>
    </SectionWrapper>
  )
}
