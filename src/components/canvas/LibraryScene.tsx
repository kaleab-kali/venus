import { useEffect, useRef, useState } from "react"
import { scrollStore } from "@/lib/scroll-store"
import { SCROLL_PHASES, getPhaseProgress, easeInOutCubic } from "@/lib/constants"

const BOOK_SPINES = [
  { title: "Crime and Punishment", color: "#8B0000", height: "85%" },
  { title: "The Idiot", color: "#2F1B14", height: "90%" },
  { title: "The Brothers Karamazov", color: "#1B3F5F", height: "95%" },
  { title: "Notes from Underground", color: "#4A2040", height: "82%" },
  { title: "Demons", color: "#3B2F1A", height: "88%" },
  { title: "White Nights", color: "#5C1A1A", height: "80%" },
  { title: "Poor Folk", color: "#1A3A2A", height: "86%" },
  { title: "The Double", color: "#2A1A4A", height: "92%" },
  { title: "Humiliated and Insulted", color: "#4A3B2A", height: "84%" },
  { title: "The Gambler", color: "#1A2A4A", height: "87%" },
  { title: "A Gentle Creature", color: "#6B2F2F", height: "83%" },
  { title: "Dream of a Ridiculous Man", color: "#2A4A3A", height: "91%" },
] as const

export function LibraryScene() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    let rafId: number

    const update = () => {
      const el = wrapperRef.current
      if (!el) {
        rafId = requestAnimationFrame(update)
        return
      }

      const p = scrollStore.progress
      const libStart = SCROLL_PHASES.libraryLanding[0]
      const libEnd = SCROLL_PHASES.landingFlash[1]
      const fadeInStart = libStart - 0.02

      if (p < fadeInStart || p >= libEnd) {
        el.style.opacity = "0"
        el.style.display = "none"
      } else if (p < libStart) {
        const fadeT = (p - fadeInStart) / 0.02
        el.style.display = "flex"
        el.style.opacity = String(Math.min(1, fadeT))
      } else if (p > SCROLL_PHASES.landingFlash[0]) {
        const flashT = getPhaseProgress(p, SCROLL_PHASES.landingFlash)
        el.style.display = "flex"
        el.style.opacity = String(Math.max(0, 1 - flashT))
      } else {
        el.style.display = "flex"
        el.style.opacity = "1"
      }

      // Animate elements inside based on progress
      const t = getPhaseProgress(p, SCROLL_PHASES.libraryLanding)
      el.style.setProperty("--lib-progress", String(easeInOutCubic(Math.min(1, t))))

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [mounted])

  if (!mounted) return null

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-16 flex flex-col items-center justify-center overflow-hidden"
      style={{
        opacity: 0,
        display: "none",
        background: "radial-gradient(ellipse at center, #2A1A0A 0%, #0F0800 60%, #050200 100%)",
        zIndex: 16,
      }}
    >
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(255, 200, 100, 0.12) 0%, transparent 60%)",
        }}
      />

      {/* Floating dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              backgroundColor: "rgba(212, 175, 55, 0.3)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-dust ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: `calc(var(--lib-progress, 0) * 0.8)`,
            }}
          />
        ))}
      </div>

      {/* Bookshelf - left side */}
      <div
        className="absolute left-0 top-0 bottom-0 flex flex-col justify-end"
        style={{
          width: "120px",
          transform: `translateX(calc(-100% + var(--lib-progress, 0) * 100%))`,
          perspective: "500px",
        }}
      >
        <div className="flex items-end gap-[2px] px-2 pb-8 h-full pt-8">
          {BOOK_SPINES.slice(0, 6).map((book, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm flex items-center justify-center"
              style={{
                backgroundColor: book.color,
                height: book.height,
                minWidth: "14px",
                boxShadow: "inset -1px 0 2px rgba(0,0,0,0.3), inset 1px 0 1px rgba(255,255,255,0.05)",
                transform: `rotateY(${5 + Math.random() * 3}deg)`,
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              <span
                className="text-[8px] tracking-wider uppercase"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "Cinzel, serif",
                }}
              >
                {book.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bookshelf - right side */}
      <div
        className="absolute right-0 top-0 bottom-0 flex flex-col justify-end"
        style={{
          width: "120px",
          transform: `translateX(calc(100% - var(--lib-progress, 0) * 100%))`,
          perspective: "500px",
        }}
      >
        <div className="flex items-end gap-[2px] px-2 pb-8 h-full pt-8">
          {BOOK_SPINES.slice(6, 12).map((book, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm flex items-center justify-center"
              style={{
                backgroundColor: book.color,
                height: book.height,
                minWidth: "14px",
                boxShadow: "inset 1px 0 2px rgba(0,0,0,0.3), inset -1px 0 1px rgba(255,255,255,0.05)",
                transform: `rotateY(${-5 - Math.random() * 3}deg)`,
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              <span
                className="text-[8px] tracking-wider uppercase"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "Cinzel, serif",
                }}
              >
                {book.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Center content - baby blanket scene */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 px-8 max-w-lg text-center"
        style={{
          opacity: `var(--lib-progress, 0)`,
          transform: `translateY(calc(30px - var(--lib-progress, 0) * 30px))`,
        }}
      >
        {/* Baby blanket visual */}
        <div
          className="relative w-48 h-32 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F5E6D3 0%, #E8D5C0 50%, #F0E0CC 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
          }}
        >
          {/* Blanket fold lines */}
          <div className="absolute inset-0" style={{
            background: `
              linear-gradient(45deg, transparent 40%, rgba(200,180,150,0.3) 45%, transparent 50%),
              linear-gradient(-45deg, transparent 40%, rgba(200,180,150,0.2) 45%, transparent 50%)
            `,
          }} />
          {/* Small star on blanket */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-venus-gold/40 text-2xl">
            {"\u2605"}
          </div>
        </div>

        <p
          className="font-[Cinzel] text-venus-gold/80 text-sm tracking-[0.3em] uppercase"
          style={{ opacity: `var(--lib-progress, 0)` }}
        >
          Addis Ababa, Ethiopia
        </p>

        <p
          className="font-[EB_Garamond] text-venus-paper/60 text-lg italic leading-relaxed"
          style={{ opacity: `var(--lib-progress, 0)` }}
        >
          In a quiet library, wrapped in warmth and surrounded by stories,
          a beautiful life began its own chapter.
        </p>
      </div>

      <style>{`
        @keyframes float-dust {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-3px); }
          75% { transform: translateY(-20px) translateX(8px); }
        }
      `}</style>
    </div>
  )
}
