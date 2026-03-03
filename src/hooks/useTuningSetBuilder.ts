import { useMemo } from "react"
import type { Interval } from "../types/interval"

type Props = {
    tuningSet: Record<number, Interval>;
    setTuningSet: React.Dispatch<React.SetStateAction<Record<number, Interval>>>;
}

export function useTuningSetBuilder({ tuningSet, setTuningSet }: Props) {

    const semitonesValues: number[] = useMemo(() => [
        ...Array.from({ length: 33 }, (_, i) => -16 + i)
    ], [])

    function sortIntervals(arr: Interval[]): Interval[] {
        return arr.sort((a, b) => a.semitones - b.semitones)
    }

    function updateRatio(semitones: number, value: string) {
        const key = Math.abs(semitones)
        setTuningSet(prev => {
            const next = {...prev}

            if (value.trim() === "") {
                delete next[key]
                return next
            }

            const numeric = Number(value)

            if (Number.isNaN(numeric)) {
                return prev;
            }

            next[key] = {
                semitones: key,
                ratio: numeric,
                cents: 0
            }
            return next
        })
    }

    return {
        semitonesValues,
        updateRatio,
    }

}