import { memo, useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { GoldDivider } from "@/components/shared/GoldDivider"

const QUESTIONS = [
  { id: 1, label: "Perfect hangout?", a: "Coffee shop vibes", b: "Late night adventure" },
  { id: 2, label: "Reading mood?", a: "Dostoevsky", b: "Mystery thriller" },
  { id: 3, label: "Your style?", a: "Gold jewelry", b: "Silver jewelry" },
  { id: 4, label: "Golden hour?", a: "Sunrise", b: "Sunset" },
  { id: 5, label: "How you connect?", a: "Handwritten letter", b: "Voice note" },
  { id: 6, label: "Birthday must-have?", a: "Birthday cake", b: "Birthday wish" },
  { id: 7, label: "On the dance floor?", a: "Dancing alone", b: "Dancing with the crowd" },
  { id: 8, label: "What pulls you in?", a: "Stars", b: "City lights" },
] as const

const RECIPIENT_EMAIL = "kaleabktg065@gmail.com"
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`

const RESULT_PROFILES = {
  dreamer: {
    title: "The Starlit Dreamer",
    description: "You are the quiet magic of the universe, drawn to depth, softness, and the beauty in small moments. You see the world in poetry.",
  },
  adventurer: {
    title: "The Golden Adventurer",
    description: "You are energy and light wrapped in elegance, drawn to the bold, the bright, and the beautifully unpredictable. You live like every day is a gift.",
  },
  philosopher: {
    title: "The Midnight Philosopher",
    description: "You are the perfect balance of fire and grace, drawn equally to the deep and the dazzling. You carry multitudes, and you wear them beautifully.",
  },
} as const

const DREAMER_ANSWERS = new Set(["Coffee shop vibes", "Dostoevsky", "Gold jewelry", "Sunrise", "Handwritten letter", "Birthday wish", "Dancing alone", "Stars"])

const sendResultsEmail = async (answers: Array<{ question: string; answer: string }>, profileTitle: string) => {
  const answerLines = answers.map((a, i) => `${i + 1}. ${a.question} => ${a.answer}`).join("\n")
  const body = `Venus Challenge Results\n\nProfile: ${profileTitle}\n\nAnswers:\n${answerLines}`

  await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: "Venus Challenge Results",
      message: body,
      _template: "box",
    }),
  }).catch(() => {})
}

const OptionButton = memo(
  ({
    label,
    selected,
    onClick,
  }: {
    label: string
    selected: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`flex-1 rounded-lg border px-4 py-6 text-center font-[EB_Garamond] text-lg transition-all duration-300 md:px-8 md:py-8 md:text-xl ${
        selected
          ? "border-venus-gold bg-venus-gold/15 text-venus-gold"
          : "border-venus-gold/20 bg-venus-black/40 text-venus-paper/80 hover:border-venus-gold/40 hover:bg-venus-gold/5"
      }`}
    >
      {label}
      {selected && (
        <span className="ml-2 inline-block text-venus-gold">{"\u2713"}</span>
      )}
    </button>
  ),
  (prev, next) => prev.label === next.label && prev.selected === next.selected,
)
OptionButton.displayName = "OptionButton"

const InteractiveGameInner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Array<{ question: string; answer: string }>>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelect = useCallback(
    (answer: string) => {
      if (selectedAnswer) return
      setSelectedAnswer(answer)

      const timer = globalThis.setTimeout(() => {
        const newEntry = { question: QUESTIONS[currentIndex].label, answer }
        const newAnswers = [...answers, newEntry]
        setAnswers(newAnswers)
        setSelectedAnswer(null)

        if (currentIndex + 1 >= QUESTIONS.length) {
          setShowResult(true)
          const dreamerCount = newAnswers.filter((a) => DREAMER_ANSWERS.has(a.answer)).length
          const profile = dreamerCount >= 6
            ? RESULT_PROFILES.dreamer
            : dreamerCount <= 2
              ? RESULT_PROFILES.adventurer
              : RESULT_PROFILES.philosopher
          sendResultsEmail(newAnswers, profile.title)
        } else {
          setCurrentIndex((prev) => prev + 1)
        }
      }, 600)

      return () => globalThis.clearTimeout(timer)
    },
    [selectedAnswer, answers, currentIndex],
  )

  const handleSelectA = useCallback(() => {
    handleSelect(QUESTIONS[currentIndex].a)
  }, [handleSelect, currentIndex])

  const handleSelectB = useCallback(() => {
    handleSelect(QUESTIONS[currentIndex].b)
  }, [handleSelect, currentIndex])

  const result = useMemo(() => {
    if (!showResult) return null
    const dreamerCount = answers.filter((a) => DREAMER_ANSWERS.has(a.answer)).length
    if (dreamerCount >= 6) return RESULT_PROFILES.dreamer
    if (dreamerCount <= 2) return RESULT_PROFILES.adventurer
    return RESULT_PROFILES.philosopher
  }, [showResult, answers])

  const question = QUESTIONS[currentIndex]

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
        The Venus Challenge
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-12 text-center font-[EB_Garamond] text-lg text-venus-paper/60 italic md:text-xl"
      >
        Tap your pick, no wrong choices
      </motion.p>

      <div className="relative mx-auto max-w-xl">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-venus-gold/20 bg-[#1a1510] p-6 md:p-10"
            >
              <span className="mb-2 block text-center font-[EB_Garamond] text-sm uppercase tracking-[0.3em] text-venus-gold/50">
                {currentIndex + 1} / {QUESTIONS.length}
              </span>
              <p className="mb-6 text-center font-[Cinzel] text-base tracking-wide text-venus-paper/70">
                {question.label}
              </p>
              <div className="flex gap-4">
                <OptionButton
                  label={question.a}
                  selected={selectedAnswer === question.a}
                  onClick={handleSelectA}
                />
                <div className="flex items-center">
                  <span className="font-[Cinzel] text-sm text-venus-gold/40">or</span>
                </div>
                <OptionButton
                  label={question.b}
                  selected={selectedAnswer === question.b}
                  onClick={handleSelectB}
                />
              </div>
            </motion.div>
          ) : (
            result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-xl border border-venus-gold/30 bg-[#1a1510] p-8 text-center md:p-12"
              >
                <span className="mb-2 block font-[EB_Garamond] text-sm uppercase tracking-[0.3em] text-venus-gold/50">
                  Your Venus Profile
                </span>
                <h3 className="mb-4 font-[Cinzel] text-2xl font-bold tracking-wide text-venus-gold md:text-3xl">
                  {result.title}
                </h3>
                <p className="mb-8 font-[EB_Garamond] text-lg leading-relaxed text-venus-paper/80 italic md:text-xl">
                  {result.description}
                </p>
                <p className="font-[EB_Garamond] text-sm text-venus-paper/40">
                  Screenshot this and send it to me
                </p>
              </motion.div>
            )
          )}
        </AnimatePresence>

        {!showResult && (
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-venus-gold/10">
            <motion.div
              className="h-full bg-venus-gold/50"
              animate={{ width: `${((currentIndex + (selectedAnswer ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>

      <GoldDivider />
    </SectionWrapper>
  )
}

export const InteractiveGame = memo(InteractiveGameInner, () => true)
InteractiveGame.displayName = "InteractiveGame"
