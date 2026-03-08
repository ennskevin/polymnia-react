import { useNumericInput } from "../hooks/useNumericInput"
import type { Interval } from "../types/interval"

type Props = {
    semitones: number
    interval: Interval | undefined
    setTuningSet: React.Dispatch<React.SetStateAction<Record<number, Interval>>>
}

export default function TuningRatioInput({ semitones, interval, setTuningSet }: Props) {

    function setRatio(value: number | undefined) {
        const key = Math.abs(semitones)
        setTuningSet(prev => {
            const next = {...prev}
            if (value === undefined) {
                delete next[key]
                return next
            }
            next[key] = {
                semitones: key,
                ratio: value,
                cents: 0,
                frequency: undefined
            }
            return next
        })
    }

    const { input, onChange } = useNumericInput(interval?.ratio, setRatio, { allowFractions: true })

    return(
        <span key={semitones} style={{ margin: "10px" }}>
            <span>{Math.abs(semitones)}</span>
            <input
                type="text"
                value={input}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: "45px" }}
                disabled={semitones === 0}
            />
        </span>
    )

}