import { memo } from "react"
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"

const LetterSectionInner = () => (
  <SectionWrapper className="bg-venus-black/80 px-6 py-24 md:px-12">
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-12 text-center font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-5xl">
        A Letter For You
      </h2>

      <motion.div
        initial={{ opacity: 0, rotate: -1 }}
        whileInView={{ opacity: 1, rotate: -1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="rounded-lg border border-venus-gold/20 bg-venus-paper p-10 shadow-2xl md:p-14"
        style={{ transform: "rotate(-1deg)" }}
      >
        <p className="mb-6 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
          Dear Veni,
        </p>

        <p className="mb-4 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
          Talking with you has always felt peaceful. There is an ease to the way we communicate that I do not take for granted. No games, no pretending, just honest conversation that flows naturally. That is rare, and I want you to know I notice it.
        </p>

        <p className="mb-4 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
          You have one of the purest hearts I have come across. You are supportive in a way that feels effortless, understanding in a way that feels genuine, and caring in a way that makes the people around you feel safe. You see the good in things, even when the world makes that difficult, and your optimism is something I truly admire.
        </p>

        <p className="mb-4 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
          I love that you read. Not everyone does, and the fact that you lose yourself in books says something beautiful about who you are. You have curiosity, depth, and a mind that is always reaching for more. That is something special.
        </p>

        <p className="mb-4 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
          And the way you love your family, the way you carry them with you in everything you do, that tells me everything about your character. You are rooted in something real, and it shows.
        </p>

        <p className="mb-8 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
          Happy Birthday. I hope this year brings you everything your beautiful heart deserves.
        </p>

        <p className="font-[EB_Garamond] text-lg text-venus-black/70 italic">
          With admiration,
        </p>
        <p className="mt-1 font-[EB_Garamond] text-lg text-venus-black/70 italic">
          KG
        </p>
      </motion.div>
    </div>
  </SectionWrapper>
)

export const LetterSection = memo(LetterSectionInner, () => true)
LetterSection.displayName = "LetterSection"
