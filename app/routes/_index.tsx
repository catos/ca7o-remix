import type { MetaFunction } from "@remix-run/node"
import { useOutletContext } from "@remix-run/react"
import { MyOutletContext } from "~/root"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Index() {
  const { lol } = useOutletContext<MyOutletContext>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <p>Context lol is {lol}</p>
    </div>
  )
}
