import type { Interval } from "../types/interval"

type Props = {
    harmony: Interval[];
}

export default function HarmonyDisplay({ harmony }: Props) {

    const centsBorder = Math.max(
        ...harmony.map(i => Math.abs(i.semitones * 100)),
        1
    )
    const minStretchThreshold = 1400


    const harmonyDisplayElements = harmony.map(interval => {
        let normalized = interval.cents / centsBorder * 100
        if (centsBorder < minStretchThreshold) {
            normalized *= centsBorder / minStretchThreshold
        }
        return (
            <span 
                className="displayed-interval"
                key={interval.semitones}
                style={{ "--pos": normalized} as React.CSSProperties}
            >
                {interval.semitones}
            </span>
    )})

    return (
        <>
            {harmonyDisplayElements}
        </>
    )
}