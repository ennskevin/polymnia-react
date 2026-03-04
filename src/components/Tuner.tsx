import { useState } from "react";
import type { Interval } from "../types/interval";
import HarmonyBuilder from "./HarmonyBuilder";
import TuningSetBuilder from "./TuningSetBuilder";
import HarmonyDisplay from "./HarmonyDisplay";

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

    // TUNING
    const [tuningSet, setTuningSet] = useState<Record<number, Interval>>({})

    // todo: PAYLOAD HANDLING

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
                        <div>
                            HARMONY BUILDER
                            <HarmonyBuilder 
                                harmony={harmony}
                                setHarmony={setHarmony}
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