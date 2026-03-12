import { memo } from "react"
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"
import image7 from "@/assets/image-7.jpg"

const BOOK_COLORS = [
  "#2d1f14", "#1a1510", "#2a1a12", "#1f1612",
  "#2d1f14", "#1a1510", "#2a1a12", "#1f1612",
  "#2d1f14", "#1a1510",
] as const

const DostoevskyRoomInner = () => (
  <SectionWrapper className="relative min-h-screen overflow-hidden bg-gradient-to-b from-venus-black/80 via-[#1a1410]/80 to-venus-black/80 px-6 py-24 md:px-12">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-venus-gold to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-venus-gold to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-venus-gold to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-venus-gold to-transparent" />
    </div>

    <GoldDivider />

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-4 text-center font-[Cinzel] text-3xl font-bold tracking-wider text-venus-gold md:text-5xl"
    >
      A Soul Who Reads
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="mb-16 text-center font-serif text-lg text-venus-rose/80"
    >
      Where great stories find their readers
    </motion.p>

    <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:gap-16">
      {/* Left: reading photo */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full md:w-1/2"
      >
        <div className="overflow-hidden rounded-lg border border-venus-gold/20">
          <img
            src={image7}
            alt="Venus reading"
            className="w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-3 -right-3 rounded border border-venus-gold/30 bg-venus-black/80 px-4 py-2 font-[EB_Garamond] text-sm text-venus-paper/70 italic">
          &ldquo;We Kill for Love&rdquo;
        </div>
      </motion.div>

      {/* Right: literary content */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2"
      >
        <p className="mb-8 font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/85 md:text-xl">
          There is something rare about the way you read. Not to escape the world, but to understand it better. You hold books the way some people hold secrets, with reverence, with curiosity, with the quiet knowledge that every page turned is a door opened.
        </p>

        <p className="mb-10 font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/85 md:text-xl">
          Dostoevsky once wrote that beauty will save the world. He could have been writing about the kind of beauty that comes from a mind that never stops seeking. The beauty of someone who finds wonder in words, who carries the weight of great stories and still walks lightly.
        </p>

        {/* Dostoevsky Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative border-l-2 border-venus-gold/40 pl-6"
        >
          <span className="absolute -left-1 -top-4 font-[Cinzel] text-4xl text-venus-gold/30">
            &ldquo;
          </span>
          <p className="font-[EB_Garamond] text-2xl leading-relaxed text-venus-paper/90 italic md:text-3xl">
            Beauty will save the world.
          </p>
          <footer className="mt-4 font-serif text-base text-venus-gold/70">
            Fyodor Dostoevsky, <em>The Idiot</em>
          </footer>
        </motion.blockquote>
      </motion.div>
    </div>

    {/* Decorative bookshelf */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 1 }}
      className="mx-auto mt-20 flex max-w-2xl items-end justify-center gap-1"
    >
      {BOOK_COLORS.map((color, i) => (
        <div
          key={i}
          className="rounded-t-sm border border-venus-gold/10"
          style={{
            background: `linear-gradient(180deg, ${color} 0%, #0B0B0F 100%)`,
            height: `${48 + (i % 3) * 12}px`,
            width: `${20 + (i % 2) * 8}px`,
          }}
        />
      ))}
    </motion.div>

    <GoldDivider />
  </SectionWrapper>
)

export const DostoevskyRoom = memo(DostoevskyRoomInner, () => true)
DostoevskyRoom.displayName = "DostoevskyRoom"
