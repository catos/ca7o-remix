import { useEffect } from "react"

// TODO: continue working on this

type Props = {
    // TODO: support multiple keys
    // keys: string[]
    key: string
    modifier: string
    cb: (e: KeyboardEvent, key: string) => void
    enabled?: boolean
    preventDefault?: boolean
}

export function useOnKeyPress({
    key,
    cb,
    enabled = true,
    preventDefault = false
}: Props) {
    const handler = (e: KeyboardEvent) => {
        // const validKeyCombo = e.key === "Enter" && (e.metaKey || e.ctrlKey)
        const validKeyCombo = e.key === key
        // const isValidKeyModifier = modifier  (e.metaKey || e.ctrlKey)
        console.log({ key: e.key, validKeyCombo })
        if (enabled && validKeyCombo) {
            preventDefault && e.preventDefault()
            cb(e, key)
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handler)

        return () => {
            window.removeEventListener("keydown", handler)
        }
    })
}

// Fixing inconsistencies from older browsers
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
const aliases = new Map([
    ["Win", "Meta"],
    ["Scroll", "ScrollLock"],
    ["Spacebar", " "],
    ["Down", "ArrowDown"],
    ["Left", "ArrowLeft"],
    ["Right", "ArrowRight"],
    ["Up", "ArrowUp"],
    ["Del", "Delete"],
    ["Crsel", "CrSel"],
    ["Exsel", "ExSel"],
    ["Apps", "ContextMenu"],
    ["Esc", "Escape"],
    ["Decimal", "."],
    ["Multiply", "*"],
    ["Add", "+"],
    ["Subtract", "-"],
    ["Divide", "/"]
])

const shimKeyboardEvent = (event: KeyboardEvent) => {
    if (aliases.has(event.key)) {
        const key = aliases.get(event.key)

        Object.defineProperty(event, "key", {
            configurable: true,
            enumerable: true,
            get() {
                return key
            }
        })
    }
}

// export default shimKeyboardEvent
