import { useMemo } from "react";
import type { Interval } from "../types/interval";

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
                cents: 0
            }
            return next
        })
    }

    const tuningSetInputElements = semitonesValues.map(semitones => {
        const interval = tuningSet[Math.abs(semitones)]
        return (
            <span key={semitones} style={{ margin: "10px" }}>
                <span>{Math.abs(semitones)}</span>
                <input
                    type="number"
                    value={interval ? interval.ratio : ""}
                    onChange={(e) => 
                        updateRatio(semitones, e.target.value)
                    }
                    style={{ width: "45px" }}
                    disabled={semitones === 0}
                />
            </span>
        )
    })

    return (
        <>
            {tuningSetInputElements}
        </>
    )
}