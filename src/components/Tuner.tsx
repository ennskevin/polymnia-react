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

    const harmonyCheckBoxElements = harmonyBuilder.harmonyCheckboxValues.map(value => (
        <label key={value}>
            <input 
                type="checkbox"
                checked={harmonyBuilder.harmonyIntervalIsSelected(value)}
                disabled={value === 0}
                onChange={() => harmonyBuilder.toggleHarmonyIntervals(value)}
            />
            {value}
        </label>
    ))

    const harmonyDisplayElements = harmony.map(interval => (
        <div>{interval.semitones}</div>
    ))


    // for later
    // const [tuningSet, setTuningSet] = useState<Interval[]>([])



    console.log(harmonyCheckBoxElements)



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