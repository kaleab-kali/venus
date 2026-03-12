import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"

export function MeaningSection() {
  return (
    <SectionWrapper className="bg-venus-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl">
        <GoldDivider />

        <h2 className="mb-12 text-center font-[Cinzel] text-4xl font-bold tracking-wider text-venus-gold md:text-5xl">
          The Meaning of Venus
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          {/* The Planet */}
          <div className="rounded-lg border border-venus-gold/20 bg-venus-paper/5 p-8">
            <h3 className="mb-4 font-serif text-2xl text-venus-gold">
              The Planet
            </h3>
            <p className="font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/80">
              Venus, the second planet from the Sun, is the brightest natural object
              in Earth's night sky after the Moon. Known as the Morning Star and the
              Evening Star, it has captivated humanity since the dawn of civilization.
              It is wrapped in thick clouds, mysterious and luminous --- much like the
              person it was named for.
            </p>
          </div>

          {/* The Goddess */}
          <div className="rounded-lg border border-venus-gold/20 bg-venus-paper/5 p-8">
            <h3 className="mb-4 font-serif text-2xl text-venus-rose">
              The Goddess
            </h3>
            <p className="font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/80">
              In Roman mythology, Venus is the goddess of love, beauty, desire,
              and prosperity. She embodies the creative force that brings beauty
              into the world. Her Greek counterpart Aphrodite was born from the
              sea foam --- emerging from chaos to bring grace and wonder to
              all who witnessed her presence.
            </p>
          </div>
        </div>

        {/* The Name */}
        <div className="mt-12 rounded-lg border border-venus-violet/30 bg-venus-violet/5 p-8 text-center">
          <h3 className="mb-4 font-serif text-2xl text-venus-violet">
            The Name
          </h3>
          <p className="font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/80">
            Some names carry the weight of stars. Venus is one of them --- a name
            that echoes through mythology, astronomy, art, and literature. It speaks
            of radiance, of beauty that illuminates the darkness, of a presence that
            transforms everything it touches.
          </p>
        </div>

        <GoldDivider />
      </div>
    </SectionWrapper>
  )
}
