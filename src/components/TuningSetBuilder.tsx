import { useMemo } from "react";
import type { Interval } from "../types/interval";
import TuningRatioInput from "./TuningRatioInput";

type Props = {
    tuningSet: Record<number, Interval>;
    setTuningSet: React.Dispatch<React.SetStateAction<Record<number, Interval>>>;
}

export default function TuningSetBuilder({ tuningSet, setTuningSet }: Props) {

    const semitonesValues: number[] = useMemo(() => [
        ...Array.from({ length: 33 }, (_, i) => -16 + i)
    ], [])

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