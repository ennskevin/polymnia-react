type Props = {
    anchor: number | undefined;
    setAnchor: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function Anchor({ anchor, setAnchor }: Props) {

    function updateAnchor(value: string) {
        if (value === "") {
            setAnchor(undefined)
        }
        const num = Number(value)
        if (num > 0) {
            setAnchor(num)
        }
        
    }
    console.log(anchor)

    return (
        <>
            <span>Anchor Frequency</span>
            <input
                type="text"
                value={anchor ?? ""}
                onChange={(e) => {
                    const value = e.target.value
                    if (!/^\d*\.?\d*$/.test(value)) return
                    updateAnchor(value)
                }}
            />
        </>
    )
}