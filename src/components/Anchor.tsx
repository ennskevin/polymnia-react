import { useNumericInput } from "../hooks/useNumericInput"

type Props = {
    anchor: number | undefined;
    setAnchor: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function Anchor({ anchor, setAnchor }: Props) {

    const { input, onChange } = useNumericInput(anchor, setAnchor)

    return (
        <>
            <input
                type="text"
                placeholder="anchor"
                value={input}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    )
}