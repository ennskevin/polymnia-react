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

            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, width, height)
            ctx.lineWidth = 2
            ctx.strokeStyle = "black"
            ctx.beginPath()
            
            const visibleSamples = 128
            const sliceWidth = width / visibleSamples
            let x = 0

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0
                const y = v * height / 2
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
