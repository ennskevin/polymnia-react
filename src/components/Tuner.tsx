import { useState } from "react";
import type { Interval } from "../types/interval";
import HarmonyBuilder from "./HarmonyBuilder";
import TuningSetBuilder from "./TuningSetBuilder";
import HarmonyDisplay from "./HarmonyDisplay";
import Anchor from "./Anchor";

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
        { semitones: 0, ratio: 1, cents: 0, frequency: undefined }
    ])

    // TUNINGSET
    const [tuningSet, setTuningSet] = useState<Record<number, Interval>>({})

    // ANCHOR
    const [anchor, setAnchor] = useState<number | undefined>()

    // UPDATE HARMONY WHEN ANCHOR CHANGES
    function udpateFrequencies() {

    }


    // REQUEST AND RESPONSE HANDLING
    function buildPayload() {
        const tuningSetArray = Object.values(tuningSet)
        // build essential payload
        const payload: any = {
            harmony: harmony.map(interval => (
                {semitones: interval.semitones}
            )),
            tuningSet: tuningSetArray.map(interval => (
                {
                    semitones: interval.semitones,
                    ratio: interval.ratio
                }
            ))
        }
        // add optionals
        if (anchor) payload.anchor=anchor
        console.log(payload)
        return payload
    }

    async function submitTuning() {
        const payload = buildPayload()
        const response = await fetch("/api/tuning", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        handleResponse(data)
        console.log("Response:", data)
    }
    
    type TuningResponse = {
        harmony: Interval[];
        tuningSet: Interval[];
        frequencies: number[] | undefined;
    }

    function handleResponse(data: TuningResponse) {
        let newHarmony = data.harmony
        if (data.frequencies) {
            newHarmony = newHarmony.map((interval, i) => ({
                ...interval,
                frequency: data.frequencies![i]
            }))
        }
        setHarmony(newHarmony)
    }

    console.log(harmony)
    
    return (
        <>
            <section>
                <div>
                    HARMONY GRAPHICS
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
                            <HarmonyDisplay
                                harmony={harmony}
                            />
                        </div>
                    </section>

                    <section>
                        <button onClick={submitTuning}>
                            TUNE
                        </button>
                    </section>

                    <section>
                        <div>
                            <Anchor
                                anchor={anchor}
                                setAnchor={setAnchor}
                            />
                        </div>
                    </section>

                    <section>
                        <div>
                            HARMONY BUILDER
                            <HarmonyBuilder 
                                harmony={harmony}
                                setHarmony={setHarmony}
                                anchor={anchor}
                            />
                        </div>
                    </section>

                    <section>
                        <div>
                            <TuningSetBuilder 
                                tuningSet={tuningSet}
                                setTuningSet={setTuningSet}
                            />
                        </div>
                    </section>

                </div>
            </section>
        </>
    )
}