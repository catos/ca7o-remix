// TODO: make generix (ex. useShortcut(...)), one does not simply typescript a predicate parameter
import { useEffect } from "react"

// TODO: optimize ?
export function useOnKeyPress(
    condition: boolean,
    cb: (e: KeyboardEvent) => void
) {
    const handler = (e: KeyboardEvent) => {
        const validKeyCombo = e.key === "Enter" && (e.metaKey || e.ctrlKey)
        if (condition && validKeyCombo) {
            cb(e)
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
