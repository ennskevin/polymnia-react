import { useState, useEffect, useRef } from "react"

type Options = {
    allowFractions?: boolean
}

export function useNumericInput(
    value: number | undefined,
    setValue: (value: number | undefined) => void,
    options?: Options
) {

    const allowFractions = options?.allowFractions ?? false
    const internalUpdate = useRef(false)

    const [input, setInput] = useState("")

    useEffect(() => {
        if (internalUpdate.current) {
            internalUpdate.current = false
            return
        }
        setInput(value?.toString() ?? "")
    }, [value])

    function parseFraction(val: string): number | undefined {
        const normalized = val.replace(":", "/")
        if (!normalized.includes("/")) {
            const num = Number(normalized)
            return Number.isNaN(num) ? undefined : num
        }
        const [numStr, denomStr] = normalized.split("/")
        const num = Number(numStr)
        const denom = Number(denomStr)
        if (
            Number.isNaN(num) ||
            Number.isNaN(denom) ||
            denom === 0
        ) {
            return undefined
        }
        return num / denom
    }

    function onChange(newValue: string) {
        const decimalRegex = /^\d*\.?\d*$/
        const fractionRegex = /^\d*\.?\d*([/:]\d*\.?\d*)?$/
        const valid = allowFractions ? fractionRegex.test(newValue) : decimalRegex.test(newValue)
        if (!valid) return

        setInput(newValue)
        if (newValue === "") {
            internalUpdate.current = true
            setValue(undefined)
            return
        }
        const parsed = allowFractions ? parseFraction(newValue) : Number(newValue)
        if (parsed === undefined || parsed <= 0) return
        internalUpdate.current = true
        setValue(parsed)
    }

    return {
        input,
        onChange
    }
}