import { useNumericInput } from "../hooks/useNumericInput"
import type { Interval } from "../types/interval"

type Props = {
    semitones: number
    interval: Interval | undefined
    setTuningSet: React.Dispatch<React.SetStateAction<Record<number, Interval>>>
}

export default function TuningRatioInput({ semitones, interval, setTuningSet }: Props) {

    function setRatio(value: number | undefined, raw?: string) {
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
                displayRatio: raw ?? value.toString(),
                cents: 1200 * Math.log2(value),
                frequency: undefined
            }
            return next
        })
    }

    const { input, onChange } = useNumericInput(
        interval?.ratio,
        setRatio,
        { allowFractions: true },
        interval?.displayRatio
    )

    function handleBlur() {
        if (!interval) return
        console.log(interval)
        const TwelveTETCents = interval.semitones * 100
        const diff = Math.abs(interval.cents - TwelveTETCents)
        if (diff > 60) {
            // reset the button and remove the interval
            console.log(`Diff is ${diff} cents. Clearing ratio`)
            setTuningSet(prev => {
                const next = {...prev}
                delete next[interval.semitones]
                return next
            })
        }
    }

    return(
        <div key={semitones} className="interval" style={{}}>
            {/* <span>{Math.abs(semitones)}</span> */}
            <input
                type="text"
                value={input}
                onChange={(e) => onChange(e.target.value)}
                onBlur={handleBlur}
                style={{}}
                disabled={semitones === 0}
            />
        </div>
    )

}