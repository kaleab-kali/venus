import { memo } from "react"
import { motion } from "framer-motion"
import coverImage from "@/assets/image-11.jpg"

const VogueCoverInner = () => (
  <section
    className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-venus-black/80"
    style={{ position: "relative", zIndex: 20 }}
  >
    {/* Full Bleed Background Photo */}
    <div className="absolute inset-0 z-0">
      <img
        src={coverImage}
        alt="Venus"
        style={{ objectPosition: "center 30%" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>

    {/* ========== DESKTOP VERSION (md and up) ========== */}
    <div className="relative z-10 hidden min-h-screen w-full flex-col md:flex">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 pt-6 text-white/80">
        <span className="font-[EB_Garamond] text-xs tracking-[0.3em] uppercase">
          March 2026
        </span>
        <span className="font-[EB_Garamond] text-xs tracking-wider">
          Birthday Edition
        </span>
      </div>

      {/* VOGUE Masthead */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-4 text-center"
      >
        <h1
          className="text-[15vw] font-light leading-none tracking-[-0.02em] text-white lg:text-[180px]"
          style={{ fontFamily: "'Didot', 'Playfair Display Variable', 'Times New Roman', serif" }}
        >
          VOGUE
        </h1>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Content Area */}
      <div className="px-8 pb-12 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          {/* Left Side - Main Feature */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-md text-left"
          >
            <p className="mb-2 font-[EB_Garamond] text-xs tracking-[0.3em] uppercase text-venus-gold">
              The Birthday Issue
            </p>
            <h2 className="mb-3 font-[Cinzel] text-7xl font-light tracking-tight text-white lg:text-8xl">
              VENUS
            </h2>
            <p className="max-w-xs font-[EB_Garamond] text-sm leading-relaxed tracking-wide text-white/90">
              Celebrating elegance, beauty, and another year of being absolutely extraordinary
            </p>
          </motion.div>

          {/* Right Side - Headlines */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-3 text-right"
          >
            <p className="font-[Cinzel] text-xl italic text-venus-gold lg:text-2xl">
              Inside
            </p>
            <ul className="space-y-1 font-[EB_Garamond] text-xs tracking-wide text-white/80">
              <li>The Art of Being Extraordinary</li>
              <li>A Star Born Beneath Venus</li>
              <li>Literature, Love & Light</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Border Line */}
      <div className="mx-8 mb-4 h-[1px] bg-gradient-to-r from-transparent via-venus-gold/50 to-transparent" />

      {/* Frame Border */}
      <div className="pointer-events-none absolute inset-8 border border-white/10" />
    </div>

    {/* ========== MOBILE VERSION (below md) ========== */}
    <div className="absolute inset-0 z-10 flex flex-col p-4 md:hidden">
      {/* Frame Border */}
      <div className="pointer-events-none absolute inset-3 z-30 border border-white/20" />

      {/* Top Section */}
      <div className="flex items-start justify-between font-[EB_Garamond] text-[8px] uppercase tracking-[0.2em] text-white/80">
        <span>March 2026</span>
        <span>Birthday Edition</span>
      </div>

      {/* VOGUE Masthead - Mobile */}
      <div className="mt-2 text-center">
        <h1
          className="text-[18vw] font-light leading-none tracking-[0.05em] text-white"
          style={{ fontFamily: "'Didot', 'Playfair Display Variable', 'Times New Roman', serif" }}
        >
          VOGUE
        </h1>
      </div>

      {/* Side Headlines - Left */}
      <div className="absolute left-4 top-1/3 space-y-1 font-[EB_Garamond] text-[7px] tracking-wide text-white/70">
        <p>Beauty Redefined</p>
        <p>Born Under Stars</p>
        <p>The Art of Elegance</p>
      </div>

      {/* Side Headlines - Right */}
      <div className="absolute right-4 top-1/3 space-y-1 text-right font-[EB_Garamond] text-[7px] tracking-wide text-white/70">
        <p>Exclusive Feature</p>
        <p>Literature & Love</p>
        <p>A Star is Named</p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Section */}
      <div className="pb-2 text-center">
        <p className="mb-1 font-[EB_Garamond] text-[8px] uppercase tracking-[0.3em] text-venus-gold">
          Cover Star
        </p>
        <h2 className="font-[Cinzel] text-[14vw] font-light leading-none tracking-tight text-white">
          VENUS
        </h2>
        <p className="mx-auto mt-2 max-w-[240px] font-[EB_Garamond] text-[9px] tracking-wide text-white/80">
          Celebrating elegance, beauty & another year of being absolutely extraordinary
        </p>

        {/* Keywords */}
        <div className="mt-3 flex justify-center gap-3 font-[EB_Garamond] text-[7px] tracking-wide text-white/60">
          <span>Beauty</span>
          <span>&middot;</span>
          <span>Literature</span>
          <span>&middot;</span>
          <span>Starlight</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-end justify-between font-[EB_Garamond] text-[7px] uppercase tracking-wider text-white/50">
        <span>Birthday Special</span>
        <span>Collector's Edition</span>
      </div>
    </div>
  </section>
)

export const VogueCover = memo(VogueCoverInner, () => true)
VogueCover.displayName = "VogueCover"
