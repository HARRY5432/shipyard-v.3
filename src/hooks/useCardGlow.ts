import { useCallback, useRef } from "react";

export function useCardGlow() {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty("--glow-x", `${x}px`)
    card.style.setProperty("--glow-y", `${y}px`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = ref.current
    if (!card) return
    card.style.setProperty("--glow-x", "-9999px")
    card.style.setProperty("--glow-y", "-9999px")
  }, [])

  return { ref, handleMouseMove, handleMouseLeave }
}
