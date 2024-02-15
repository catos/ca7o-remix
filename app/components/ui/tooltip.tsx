import { useState } from "react"

export default function Tooltip({
  toggler,
  text,
}: {
  toggler?: React.ReactNode
  text?: string
}) {
  const [show] = useState(false)
  return (
    <div>
      {toggler}
      {show && <div>{text}</div>}
    </div>
  )
}
