import type { Interval } from "../types/interval"

type Props = {
    harmony: Interval[];
}

export default function HarmonyDisplay({ harmony }: Props) {

    const harmonyDisplayElements = harmony.map(interval => (
        <span key={interval.semitones} style={{ margin: "2px" }}>{interval.semitones}</span>
    ))

    return (
        <>
            {harmonyDisplayElements}
        </>
    )
}