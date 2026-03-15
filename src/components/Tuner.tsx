import { useState, useEffect } from "react";
import type { Interval } from "../types/interval";
import HarmonyBuilder from "./HarmonyBuilder";
import TuningSetBuilder from "./TuningSetBuilder";
import HarmonyDisplay from "./HarmonyDisplay";
import Anchor from "./Anchor";
import HarmonyText from "./HarmonyText";
import { useHarmonyPlayer } from "../hooks/useHarmonyPlayer";
import WaveformScope from "./scopes/WaveformScope";

export default function Tuner() {

    // ANCHOR
    const [anchor, setAnchor] = useState<number | undefined>()

    // HARMONY
    const [harmony, setHarmony] = useState<Interval[]>([
        { semitones: 0, ratio: 1, cents: 0, frequency: undefined }
    ])

    // 12TET harmony
    const [use12TET, setUse12TET] = useState(false)
    const twelveTETHarmony = harmony.map(interval => ({
        ...interval,
        ratio: (2 ** (1 / 12)) ** interval.semitones,
        cents: interval.semitones * 100,
        frequency: anchor ? anchor * Math.pow(2, interval.semitones / 12) : undefined
    }))

    const activeHarmony = use12TET ? twelveTETHarmony : harmony

    function toggle12TET() {
        setUse12TET(prev => !prev)
    }

    // TUNINGSET
    const [tuningSet, setTuningSet] = useState<Record<number, Interval>>({})

    // UPDATE HARMONY WHEN ANCHOR CHANGES
    useEffect(() => {
        // if (!anchor) return
        setHarmony(prev => {
            return prev.map(interval => (
                {...interval, frequency: anchor ? anchor * interval.ratio : undefined}
            ))
        })
    }, [anchor])

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
        if (harmony.length < 2 || Object.keys(tuningSet).length === 0) return
        const payload = buildPayload()
        const response = await fetch("/api/tuning", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            console.error("Request failed:", response.status)
            return
        }
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

    console.log(tuningSet)

    // PLAYBACK HOOK
    const { playing, togglePlayback, playHarmony, analyser } = useHarmonyPlayer()

    // if harmony changed while playback is playing
    useEffect(() => {
        if (playing) playHarmony(activeHarmony)
    },[activeHarmony])

    
    return (
        <>
            <section>
                <div>
                    <WaveformScope 
                        analyser={analyser}
                    />
                </div>
            </section>

            <section>
                <div>
                    <HarmonyText 
                        harmony={activeHarmony}
                    />
                </div>
            </section>

            <section>
                <div>

                    <section>
                        <div>
                            Harmony display
                            <HarmonyDisplay
                                harmony={activeHarmony}
                            />
                        </div>
                    </section>

                    <section>
                        <button onClick={submitTuning}>
                            TUNE
                        </button>
                    </section>

                    <section>
                        <button onClick={toggle12TET}>
                            {use12TET ? "TURN 12TET OFF" : "TURN 12TET ON"}
                        </button>
                    </section>

                    <section>
                        <button onClick={() => togglePlayback(activeHarmony)}>
                            {playing ? "STOP" : "PLAY"}
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