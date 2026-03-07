import { useState, useEffect } from "react"

export function useNumericInput(
    value: number | undefined,
    setValue: (value: number | undefined) => void
) {

    const [input, setInput] = useState("")

    useEffect(() => {
        setInput(value?.toString() ?? "")
    }, [value])

    function onChange(newValue: string) {
        if (!/^\d*\.?\d*$/.test(newValue)) return
        setInput(newValue)
        if (newValue === "") {
            setValue(undefined)
            return
        }
        const num = Number(newValue)
        if (num <= 0) return
        if (!Number.isNaN(num)) {
            setValue(num)
        }
    }

    return {
        input,
        onChange
    }
}