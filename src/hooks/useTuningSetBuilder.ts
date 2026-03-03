import { useMemo } from "react"
import type { Interval } from "../types/interval"

type Props = {
    tuningSet: Interval[];
    setTuningSet: React.Dispatch<React.SetStateAction<Interval[]>>;
}

export function useTuningSetBuilder({ tuningSet, setTuningSet }: Props) {

    const semitonesValues: number[] = useMemo(() => [
        ...Array.from({ length: 33 }, (_, i) => -16 + i)
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

    function updateRatio(semitones: number, value: string) {
        const numericValue = Number(value)
        setTuningSet(prev =>
            prev.map(interval =>
                interval.semitones === semitones
                ? { ...interval, ratio: numericValue }
                : interval
            )
        )
    }

    return {
        semitonesValues,
        updateRatio,
    }

}