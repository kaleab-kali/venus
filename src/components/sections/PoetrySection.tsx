import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"

const poems = [
  {
    title: "Morning Star",
    lines: [
      "Before the sun could claim the sky,",
      "You rose --- a light no cloud could hide.",
      "The Morning Star, both bold and shy,",
      "The universe's quiet pride.",
    ],
  },
  {
    title: "Pages",
    lines: [
      "In libraries of dust and gold,",
      "Where Dostoevsky's words still breathe,",
      "Your story waits to be retold ---",
      "A tale too beautiful to leave.",
    ],
  },
  {
    title: "Venus",
    lines: [
      "Named for love and named for light,",
      "For beauty born from ancient seas,",
      "You turn the ordinary bright,",
      "You are the poem between the trees.",
    ],
  },
]

export function PoetrySection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-venus-black via-[#0f0b18] to-venus-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <GoldDivider />

        <h2 className="mb-16 text-center font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-5xl">
          Poetry
        </h2>

        <div className="space-y-20">
          {poems.map((poem, poemIdx) => (
            <div key={poem.title} className="text-center">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 font-serif text-2xl text-venus-violet"
              >
                {poem.title}
              </motion.h3>

              <div className="space-y-3">
                {poem.lines.map((line, lineIdx) => (
                  <motion.p
                    key={lineIdx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: lineIdx * 0.2,
                      duration: 0.6,
                    }}
                    className="font-[EB_Garamond] text-xl leading-relaxed text-venus-gold/90 italic md:text-2xl"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {poemIdx < poems.length - 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="h-8 w-px bg-venus-violet/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        <GoldDivider />
      </div>
    </SectionWrapper>
  )
}
