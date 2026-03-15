import { useMemo } from "react"
import type { Interval } from "../types/interval"

type Props = {
    harmony: Interval[];
    setHarmony: React.Dispatch<React.SetStateAction<Interval[]>>;
    anchor: number | undefined
}

export default function HarmonyBuilder({ harmony, setHarmony, anchor }: Props) {

    const buttonValues: number[] = useMemo(() => [
        ...Array.from({ length: 49 }, (_, i) => -24 + i)
    ], [])

    // creates 12TET intervals
    function createInterval(semitones: number): Interval {
        const ratio = (2 ** (1/12)) ** semitones
        return {
            semitones,
            ratio,
            cents: semitones * 100,
            frequency: anchor ? anchor * ratio : undefined
        }
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

    const harmonyButtonElements = buttonValues.map(value => (
        <button
            className="interval"
            key={value}
            type="button"
            aria-pressed={isSelected(value)}
            disabled={value === 0}
            onClick={() => toggleHarmonyIntervals(value)}
        >
            {value}
        </button>
    ))

    return (
        <>
            {harmonyButtonElements}
        </>
    )
}