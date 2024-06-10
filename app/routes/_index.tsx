import type { MetaFunction } from "@remix-run/node"
import { Outlet, useOutletContext } from "@remix-run/react"
import Heading from "~/components/ui/heading"
import { MyOutletContext } from "~/root"

export const meta: MetaFunction = () => {
  return [
    { title: "ca7o deux" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Index() {
  const { lol } = useOutletContext<MyOutletContext>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Heading>Welcome to Remix</Heading>
      <p>Context lol is {lol}</p>
      <Outlet />
    </div>
  )
}
