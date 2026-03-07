import { useMemo } from "react";
import type { Interval } from "../types/interval";
import { useNumericInput } from "../hooks/useNumericInput";
import TuningRatioInput from "./TuningRatioInput";

type Props = {
    tuningSet: Record<number, Interval>;
    setTuningSet: React.Dispatch<React.SetStateAction<Record<number, Interval>>>;
}

export default function TuningSetBuilder({ tuningSet, setTuningSet }: Props) {

    const semitonesValues: number[] = useMemo(() => [
        ...Array.from({ length: 33 }, (_, i) => -16 + i)
    ], [])

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
                cents: 0,
                frequency: undefined
            }
            return next
        })
    }

    const tuningSetInputElements = semitonesValues.map(semitones => {
        const interval = tuningSet[Math.abs(semitones)]
        return (
            <TuningRatioInput 
                key={semitones}
                semitones={semitones}
                interval={interval}
                setTuningSet={setTuningSet}
            />
        )
    })

    return (
        <>
            {tuningSetInputElements}
        </>
    )
}