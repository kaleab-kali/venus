import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"

export function LetterSection() {
  return (
    <SectionWrapper className="bg-venus-black px-6 py-24 md:px-12">
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
            Dear Venus,
          </p>

          <p className="mb-4 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
            On this special day, I wanted to create something that captures even
            a fraction of the wonder you bring into the world. Like the planet
            you share a name with, you shine brightest when the world is at its
            darkest.
          </p>

          <p className="mb-4 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
            You have a rare gift --- the ability to make the ordinary feel
            extraordinary, to find beauty in the overlooked, and to bring warmth
            to every room you enter. Your passion for literature, your depth of
            thought, and your kindness are not just qualities --- they are
            constellations that guide those lucky enough to know you.
          </p>

          <p className="mb-4 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
            As Dostoevsky wrote, beauty will save the world. And if that is
            true, then the world is a little more saved because of you.
          </p>

          <p className="mb-8 font-[EB_Garamond] text-lg leading-loose text-venus-black/80">
            Happy Birthday. May this new chapter be your most luminous yet.
          </p>

          <p className="font-[EB_Garamond] text-lg text-venus-black/70 italic">
            With all the stars in the sky,
          </p>
          <p className="mt-1 font-[EB_Garamond] text-lg text-venus-black/70 italic">
            Your stargazer
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
