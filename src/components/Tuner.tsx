import { useState } from "react"

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

    function createInterval(semitones: number): Interval {
        return ({
            semitones,
            ratio: 0,
            cents: 0,
        })
    }
    
    const harmonyCheckboxValues = [
        ...Array.from({ length: 49 }, (_, i) => -24 + i)
    ]

    const [harmony, setHarmony] = useState<Interval[]>([
        createInterval(0)
    ])

    function harmonyIntervalIsSelected(value: number): boolean {
        return harmony.some(interval => interval.semitones === value)
    }

    function sortIntervals(arr: Interval[]): Interval[] {
        return arr.sort((a, b) => a.semitones - b.semitones)
    }

    // THIS IS OUR HARMONY BUILDING STATE SETTER
    function toggleHarmonyIntervals(value: number) {
        if (value === 0) return
        setHarmony(prev => {
            const exists = prev.some(i => i.semitones === value)
            let next: Interval[]
            if (exists) {
                next = prev.filter(i => i.semitones !== value)
            }
            else {
                next = [...prev, createInterval(value)]
            }
            return sortIntervals(next)
        })
    }

    const harmonyCheckBoxElements = harmonyCheckboxValues.map(value => (
        <label key={value}>
            <input 
                type="checkbox"
                checked={harmonyIntervalIsSelected(value)}
                disabled={value === 0}
                onChange={() => toggleHarmonyIntervals(value)}
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