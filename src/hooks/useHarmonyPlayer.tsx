import { useRef, useState } from "react";
import type { Interval } from "../types/interval";

type OscillatorEntry = {
    osc: OscillatorNode
    gain: GainNode
}

export function useHarmonyPlayer() {
    const audioCtxRef = useRef<AudioContext | null>(null)
    const oscMapRef = useRef<Record<number, OscillatorEntry>>({})
    const [playing, setPlaying] = useState(false)

    function initAudioContext() {
        if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
        if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume()
        return audioCtxRef.current
    }

    function playHarmony(harmony: Interval[]) {
        const ctx = initAudioContext()
        harmony.forEach(interval => {
            if (!interval.frequency) return

            const key = interval.semitones
            const existing = oscMapRef.current[key]

            if (existing) {
                existing.osc.frequency.setTargetAtTime(
                    interval.frequency,
                    ctx.currentTime,
                    0.02
                )
            }
            else {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                osc.type = "sine"
                osc.frequency.value = interval.frequency
                gain.gain.setValueAtTime(0, ctx.currentTime)
                gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.25)
                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.start()
                oscMapRef.current[key] = { osc, gain }
            }
        })

        Object.keys(oscMapRef.current).forEach(keyStr => {
            const key = Number(keyStr)
            if (!harmony.find(i => i.semitones === key)) {
                const entry = oscMapRef.current[key]
                entry.gain.gain.cancelScheduledValues(ctx.currentTime)
                entry.gain.gain.setValueAtTime(entry.gain.gain.value, ctx.currentTime)
                entry.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
                entry.osc.stop(ctx.currentTime + 0.5)
                delete oscMapRef.current[key]
            }
        })

        setPlaying(true)
    }

    function stopHarmony() {
        const ctx = audioCtxRef.current
        const release = 0.5
        if (!ctx) return
        Object.values(oscMapRef.current).forEach(({ osc, gain }) => {
            const now = ctx.currentTime
            gain.gain.cancelScheduledValues(now)
            gain.gain.setValueAtTime(gain.gain.value, now)
            gain.gain.linearRampToValueAtTime(0, now + release)
            osc.stop(now + release)
        })
        oscMapRef.current = {}
        setPlaying(false)
    }

    function togglePlayback(harmony: Interval[]) {
        if (playing) stopHarmony()
        else playHarmony(harmony)
    }

    return { playing, playHarmony, stopHarmony, togglePlayback }

}