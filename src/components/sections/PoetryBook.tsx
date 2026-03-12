import { memo, useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"
import image10 from "@/assets/image-10.jpg"
import image2 from "@/assets/image-2.jpg"
import video22 from "@/assets/video-22.mp4"
import image6 from "@/assets/image-6.jpg"
import image12 from "@/assets/image-12.jpg"
import video26 from "@/assets/video-26.mp4"
import image8 from "@/assets/image-8.jpg"
import video32 from "@/assets/video-32.mp4"

const PAGES = [
  {
    media: image10,
    type: "image" as const,
    title: "Your Eyes",
    poem: "Windows to a universe untold,\nWhere stories dance in amber gold.\nThey hold the depth of midnight skies,\nA thousand truths, no need for lies.\nIn every glance, a world revealed,\nA book of wonders, never sealed.",
  },
  {
    media: image2,
    type: "image" as const,
    title: "Your Smile",
    poem: "It starts before the lips have moved,\nA warmth the coldest room has proved.\nLike sunrise breaking through the grey,\nIt turns the ordinary day\nInto a masterpiece of light,\nYour smile, the antidote to night.",
  },
  {
    media: video22,
    type: "video" as const,
    title: "Your Soul",
    poem: "There\u2019s something words will never catch,\nA spirit no one else can match.\nIn motion, laughter, quiet thought,\nA fire that can\u2019t be sold or bought.\nYou are the verse before the rhyme,\nA soul untouched by passing time.",
  },
  {
    media: image6,
    type: "image" as const,
    title: "Your Mind",
    poem: "Between the pages you have turned,\nA fire of curiosity burned.\nYou think in colors most can\u2019t see,\nIn philosophies wild and free.\nA mind that dances, questions, dreams,\nNothing is quite as simple as it seems.",
  },
  {
    media: image12,
    type: "image" as const,
    title: "Your Grace",
    poem: "You move as though the world might break,\nWith every step, a breath to take.\nAdorned in heritage and pride,\nWith elegance you cannot hide.\nNot learned, not practiced, not rehearsed,\nIn grace, you were forever versed.",
  },
  {
    media: video26,
    type: "video" as const,
    title: "Your Joy",
    poem: "You laugh like morning breaking free,\nLike waves that rush to meet the sea.\nIn every moment, small or grand,\nYou find the joy that others planned\nTo save for later, save for when,\nBut you live now, again, again.",
  },
  {
    media: image8,
    type: "image" as const,
    title: "Your Heart",
    poem: "Rooted in the ancient ground,\nWhere culture, love, and faith are found.\nYou carry warmth like sacred flame,\nA heart that honors every name.\nFrom those who came and paved the way,\nYour heart remembers, every day.",
  },
  {
    media: video32,
    type: "video" as const,
    title: "Your Light",
    poem: "Some people enter like the dawn,\nAnd suddenly the dark is gone.\nYou don\u2019t even try, you don\u2019t even know,\nThe way you make the whole room glow.\nA light not borrowed, not on loan,\nA radiance entirely your own.",
  },
] as const

const TOTAL_PAGES = PAGES.length

const PageDots = memo(
  ({ current, total, onDotClick }: { current: number; total: number; onDotClick: (i: number) => void }) => (
    <div className="flex items-center justify-center gap-2 pt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
            i === current
              ? "scale-125 bg-venus-gold"
              : "bg-venus-gold/30 hover:bg-venus-gold/50"
          }`}
          aria-label={`Go to page ${i + 1}`}
        />
      ))}
    </div>
  ),
  (prev, next) => prev.current === next.current && prev.total === next.total,
)
PageDots.displayName = "PageDots"

const PoetryBookInner = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [fading, setFading] = useState(false)
  const pendingPage = useRef<number | null>(null)
  const touchStartX = useRef(0)

  const changePage = useCallback((newPage: number) => {
    if (newPage < 0 || newPage >= TOTAL_PAGES) return
    setFading(true)
    pendingPage.current = newPage
  }, [])

  useEffect(() => {
    if (!fading) return
    const timer = globalThis.setTimeout(() => {
      if (pendingPage.current !== null) {
        setCurrentPage(pendingPage.current)
        pendingPage.current = null
      }
      setFading(false)
    }, 250)
    return () => globalThis.clearTimeout(timer)
  }, [fading])

  const goNext = useCallback(() => changePage(currentPage + 1), [currentPage, changePage])
  const goPrev = useCallback(() => changePage(currentPage - 1), [currentPage, changePage])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX
      const SWIPE_THRESHOLD = 50
      if (diff > SWIPE_THRESHOLD) goNext()
      else if (diff < -SWIPE_THRESHOLD) goPrev()
    },
    [goNext, goPrev],
  )

  const page = PAGES[currentPage]

  return (
    <SectionWrapper className="relative min-h-screen bg-venus-black px-4 py-16 md:px-8 md:py-24">
      <GoldDivider />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-2 text-center font-[Cinzel] text-3xl font-bold tracking-wider text-venus-gold md:text-5xl"
      >
        A Book of Venus
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-10 text-center font-[EB_Garamond] text-lg text-venus-paper/60 italic md:text-xl"
      >
        Eight poems, eight facets of who you are
      </motion.p>

      <div
        className="relative mx-auto max-w-5xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Nav arrows */}
        <button
          onClick={goPrev}
          disabled={currentPage === 0 || fading}
          className="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full border border-venus-gold/30 bg-venus-black/60 p-3 text-venus-gold backdrop-blur-sm transition-all hover:border-venus-gold/60 hover:bg-venus-black/80 disabled:opacity-20 disabled:cursor-not-allowed md:-left-6"
          aria-label="Previous page"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={goNext}
          disabled={currentPage === TOTAL_PAGES - 1 || fading}
          className="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full border border-venus-gold/30 bg-venus-black/60 p-3 text-venus-gold backdrop-blur-sm transition-all hover:border-venus-gold/60 hover:bg-venus-black/80 disabled:opacity-20 disabled:cursor-not-allowed md:-right-6"
          aria-label="Next page"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Book container - fixed height so arrows never shift */}
        <div className="overflow-hidden rounded-lg border border-venus-gold/20 bg-[#1a1510]">
          <div
            className="flex flex-col transition-opacity duration-250 ease-in-out md:flex-row"
            style={{ opacity: fading ? 0 : 1 }}
          >
            {/* Left: media */}
            <div className="relative aspect-[3/4] w-full md:w-1/2">
              {page.type === "video" ? (
                <video
                  key={page.media}
                  src={page.media}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <img
                  key={page.media}
                  src={page.media}
                  alt={page.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/30" />
            </div>

            {/* Right: poem */}
            <div className="flex w-full flex-col items-center justify-center bg-venus-paper/5 px-6 py-10 md:w-1/2 md:px-12 md:py-16">
              <div className="mx-auto max-w-sm text-center">
                <span className="mb-1 block font-[EB_Garamond] text-sm uppercase tracking-[0.3em] text-venus-gold/50">
                  {String(currentPage + 1).padStart(2, "0")} / {String(TOTAL_PAGES).padStart(2, "0")}
                </span>
                <h3 className="mb-6 font-[Cinzel] text-2xl font-bold tracking-wide text-venus-gold md:text-3xl">
                  {page.title}
                </h3>
                <p className="whitespace-pre-line font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/90 italic md:text-xl">
                  {page.poem}
                </p>
              </div>
            </div>
          </div>
        </div>

        <PageDots current={currentPage} total={TOTAL_PAGES} onDotClick={changePage} />
      </div>

      <GoldDivider />
    </SectionWrapper>
  )
}

export const PoetryBook = memo(PoetryBookInner, () => true)
PoetryBook.displayName = "PoetryBook"
