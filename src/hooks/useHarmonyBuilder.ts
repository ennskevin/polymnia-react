import { useMemo } from "react"
import type { Interval } from "../types/interval"
 
type Props = {
    harmony: Interval[];
    setHarmony: React.Dispatch<React.SetStateAction<Interval[]>>;
}

export function useHarmonyBuilder({ harmony, setHarmony }: Props) {

    const buttonValues: number[] = useMemo(() => [
        ...Array.from({ length: 49 }, (_, i) => -24 + i)
    ], [])

    function createInterval(semitones: number): Interval {
        return ({
            semitones,
            ratio: 0,
            cents: 0,
        })
    }

    function sortIntervals(arr: Interval[]): Interval[] {
        return arr.sort((a, b) => a.semitones - b.semitones)
    }

    function isSelected(value: number): boolean {
        return harmony.some(interval => interval.semitones === value)
    }

    // THIS IS OUR HARMONY BUILDING STATE SETTER
    function toggleHarmonyIntervals(value: number) {
        if (value === 0) return
        setHarmony(prev => {
            const exists = prev.some(i => i.semitones === value)
            let next: Interval[]
            if (exists) {
                next = prev.filter(i => i.semitones !== value)
            }
            else {
                next = [...prev, createInterval(value)]
            }
            return sortIntervals(next)
        })
    }

    return {
        buttonValues,
        isSelected,
        toggleHarmonyIntervals
    }
}