// SMALL TIME BUFFER (think 2-20 ms, avoids looking like its a scrolling scope) (X axis)
// Amplitude (Y axis)
import { useEffect, useRef } from "react"

type Props = {
    analyser: AnalyserNode | null
    width?: number
    height?: number
}

export default function WaveformScope({ analyser, width = 300, height = 300 }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    // draw
    useEffect(() => {
        if (!analyser) return

        const canvas = canvasRef.current!
        const ctx = canvas.getContext("2d")!
        const bufferLength = analyser.fftSize
        const dataArray = new Uint8Array(bufferLength)

        function draw() {
            requestAnimationFrame(draw)
            analyser?.getByteTimeDomainData(dataArray)

            let triggerIndex = 0
            for (let i =1; i < bufferLength; i++) {
                if (dataArray[i - 1] < 128 && dataArray[i] >= 128) {
                    triggerIndex = i
                    break
                }
            }

            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, width, height)
            ctx.lineWidth = 3
            ctx.strokeStyle = "black"
            ctx.beginPath()
            
            const visibleSamples = 512
            const sliceWidth = width / visibleSamples

            const jitter = Math.floor(Math.random() * 2)
            triggerIndex += jitter
            const fadeSamples =64

            let x = 0

            for (let i = 0; i < visibleSamples; i++) {
                const index = triggerIndex + i
                if (index + 1 >= bufferLength) break

                const v = dataArray[index] / 128.0
                const vNext = dataArray[index + 1] / 128.0
                const vSmooth = (v + vNext) * 0.5

                let y = (vSmooth * height / 2)

                const distanceFromRight = visibleSamples - i
                if (distanceFromRight < fadeSamples) {
                    const fade = (distanceFromRight / fadeSamples) ** 2
                    y = height / 2 + (y - height / 2) * fade
                }


                if (i === 0) ctx.moveTo(x,y)
                else ctx.lineTo(x, y)
                x += sliceWidth
            }

            ctx.lineTo(width, height / 2)
            ctx.stroke()
        }

        draw()

    }, [analyser])

    return (
        <canvas ref={canvasRef} width={width} height={height} />
    )
}
