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

    const [harmony, setHarmony] = useState<Interval[]>([])
    const [tuningSet, setTuningSet] = useState<Interval[]>([])



    return (
        <>
        </>
    )
}