import React, { cloneElement, useEffect, useRef, useState } from "react"

import { Button } from "~/components/ui/button"

type Props = {
    defaultOpen?: boolean
    toggler?: React.ReactNode
    children: React.ReactNode
}

export function Popover({ defaultOpen = false, toggler, children }: Props) {
    const [open, setOpen] = useState(defaultOpen)
    const toggle = () => setOpen(!open)
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 })
    const togglerRef = useRef<HTMLButtonElement>(null)
    const popoverRef = useRef<HTMLDivElement>(null)

    const adjustPosition = () => {
        console.log("adjustPosition", togglerRef.current, popoverRef.current)
        if (togglerRef.current && popoverRef.current) {
            const togglerRect = togglerRef.current.getBoundingClientRect()
            const popoverRect = popoverRef.current.getBoundingClientRect()
            const viewportWidth = window.innerWidth
            const viewportHeight = window.innerHeight

            let top = togglerRect.bottom
            let left = togglerRect.left

            console.log({
                left,
                "popoverRect.width": popoverRect.width,
                viewportWidth
            })

            // Adjust if popover goes beyond the right edge of the viewport
            if (left + popoverRect.width > viewportWidth) {
                left = viewportWidth - popoverRect.width - 48
            }

            // Adjust if popover goes beyond the bottom edge of the viewport
            if (top + popoverRect.height > viewportHeight) {
                top = togglerRect.top - popoverRect.height
            }

            setPopoverPosition({ top, left })
        }
    }

    useEffect(() => {
        if (open) {
            adjustPosition()
        }
    }, [open])

    const { x, y, width, height } =
        popoverRef.current?.getBoundingClientRect() || {}

    const _toggler = toggler ? (
        cloneElement(toggler as React.ReactElement, {
            onClick: toggle,
            ref: togglerRef
        })
    ) : (
        <Button
            onClick={toggle}
            ref={togglerRef}>
            Toggle
        </Button>
    )

    return (
        <>
            {_toggler}
            {open && (
                <div
                    ref={popoverRef}
                    // className="border rounded-lg fixed bg-white w-2/3 max-h-2/3 shadow-lg"
                    className="border rounded-lg fixed bg-white w-[400px] shadow-lg"
                    style={{
                        top: `${popoverPosition.top}px`,
                        left: `${popoverPosition.left}px`
                    }}>
                    <ul>
                        <li>top: {popoverPosition.top}</li>
                        <li>left: {popoverPosition.left}</li>
                        <li>
                            popoverRect:{" "}
                            {popoverRef.current
                                ?.getBoundingClientRect()
                                .toString()}
                        </li>
                    </ul>
                    {children}
                </div>
            )}
        </>
    )
}
