import { useState } from "react"
import { useHarmonyBuilder } from "../hooks/useHarmonyBuilder";
import { useTuningSetBuilder } from "../hooks/useTuningSetBuilder";
import type { Interval } from "../types/interval";

export default function Tuner() {

    /**
     * This is the feature component for tuning
     * 
     * For basic functionality, it will be composed of an interval
     * builder and a tuning set builder
     * 
     * Containers:
     *  interval builder -> interval bank (checklist?), selected harmony (selected checklist?)
     *  tuning set builder -> text input for each interval [1, 15(whatever the highest one we allow)]
     * 
     * State:
     *  harmony = [{semitones, ratio, cents}]
     *  tuningSet = [{semitons, ratio}]
     * 
     *  banks -> harmony bank, tuningset bank,
     * 
     * Derived state:
     *  isTuned -> if tuning request successful (200 status), then true.
     *  
     *  
     * 
     * User interaction:
     * 
     */

    // HARMONY
    const [harmony, setHarmony] = useState<Interval[]>([
        { semitones: 0, ratio: 0, cents: 0 }
    ])

    const harmonyBuilder = useHarmonyBuilder({
        harmony,
        setHarmony
    })

    const harmonyButtonElements = harmonyBuilder.buttonValues.map(value => (
        <button
            key={value}
            type="button"
            aria-pressed={harmonyBuilder.isSelected(value)}
            disabled={value === 0}
            onClick={() => harmonyBuilder.toggleHarmonyIntervals(value)}
        >
            {value}
        </button>
    ))

    const harmonyDisplayElements = harmony.map(interval => (
        <span key={interval.semitones} style={{ margin: "2px" }}>{interval.semitones}</span>
    ))

    // TUNING
    const [tuningSet, setTuningSet] = useState<Record<number, Interval>>({})

    const tuningSetBuilder = useTuningSetBuilder({
        tuningSet,
        setTuningSet
    })

    const tuningSetInputElements = tuningSetBuilder.semitonesValues.map(semitones => {
        const interval = tuningSet[Math.abs(semitones)]
        return (
            <span key={semitones} style={{ margin: "10px" }}>
                <span>{Math.abs(semitones)}</span>
                <input
                    type="number"
                    value={interval ? interval.ratio : ""}
                    onChange={(e) => 
                        tuningSetBuilder.updateRatio(semitones, e.target.value)
                    }
                    style={{ width: "45px" }}
                    disabled={semitones === 0}
                />
            </span>
        )
    })

    console.log(tuningSet)


    return (
        <>
            <section>
                <div>
                    DISPLAY GRAPHICS
                </div>
            </section>

            <section>
                <div>
                    DISPLAY TUNING RESPONSE (raw)
                </div>
            </section>

            <section>
                <div>

                    <section>
                        <div>
                            Harmony display
                            {harmonyDisplayElements}
                        </div>
                    </section>

                    <section>
                        <div>
                            HARMONY BUILDER
                            {harmonyButtonElements}
                        </div>
                    </section>

                    <section>
                        <div>
                            Tuning Set builder
                            {tuningSetInputElements}
                        </div>
                    </section>

                </div>
            </section>
        </>
    )
}