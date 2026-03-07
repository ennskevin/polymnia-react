import type { Interval } from "../types/interval"

type Props = {
    harmony: Interval[]
}

export default function HarmonyText({ harmony }: Props) {

    const intervalElements = harmony.map(interval => (
        <div key={interval.semitones} className="flow">
            <span>Semitones: {interval.semitones}</span>
            <span>Ratio: {interval.ratio.toFixed(5)}</span>
            <span>Cents: {interval.cents.toFixed(2)}</span>
            {interval.frequency ? <span>Frequency {interval.frequency.toFixed(2)}</span> : undefined}
        </div>
    ))


    return (
        <>
            {intervalElements}
        </>
    )
}