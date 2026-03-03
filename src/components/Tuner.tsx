import { useState } from "react"
import { useHarmonyBuilder } from "../hooks/useHarmonyBuilder";

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

    type Interval = {
        semitones: number;
        ratio: number;
        cents: number;
    }

    const [harmony, setHarmony] = useState<Interval[]>([
        { semitones: 0, ratio: 0, cents: 0 }
    ])

    const harmonyBuilder = useHarmonyBuilder({
        harmony,
        setHarmony
    })

    const harmonyCheckBoxElements = harmonyBuilder.buttonValues.map(value => (
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


    // for later
    // const [tuningSet, setTuningSet] = useState<Interval[]>([])


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
                            {harmonyCheckBoxElements}
                        </div>
                    </section>

                    <section>
                        <div>
                            Tuning Set builder
                        </div>
                    </section>

                </div>
            </section>
        </>
    )
}