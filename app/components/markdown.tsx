// import List from "~/components/ui/list"
// import ListItem from "~/components/ui/list-item"
// import Timer from "../timer"
import Markdown from "react-markdown"

import { Image } from "~/components/image"
import { Heading } from "~/components/ui/heading"

import { Link } from "./ui/link"

export default function MarkdownLol({ children }: { children: string | null }) {
    if (!children) return null

    return (
        <Markdown
            components={{
                h1: ({ children }) => {
                    return (
                        <Heading
                            as="h3"
                            className="mt-2 mb-0">
                            {children}
                        </Heading>
                    )
                },

                h2: ({ children }) => {
                    return (
                        <Heading
                            as="h4"
                            className="mt-2 mb-0">
                            {children}
                        </Heading>
                    )
                },

                h3: ({ children }) => {
                    return (
                        <Heading
                            as="h5"
                            className="mt-2 mb-0">
                            {children}
                        </Heading>
                    )
                },

                ul: ({ children }) => {
                    return <ul>{children}</ul>
                },

                li: ({ children }) => {
                    return <li>{children}</li>
                },

                p: ({ children }) => {
                    return <p className="mb-4 leading-relaxed">{children}</p>
                },

                code: ({ children, className, ...rest }) => {
                    //   const code = children && children[0]
                    //   if (code && code.startsWith("timer:")) {
                    //   return <Timer value={parseInt(code.replace("timer:", ""))} />
                    //     return null
                    //   }
                    return (
                        <code
                            {...rest}
                            className={className}>
                            {children}
                        </code>
                    )
                },

                img: ({ src, alt }) => {
                    return (
                        <span className="relative">
                            <Image
                                src={src}
                                alt={alt ?? ""}
                            />
                        </span>
                    )
                },

                link: ({ href, children }) => {
                    if (!href) {
                        return null
                    }
                    return (
                        <Link
                            to={href}
                            className="text-red-900">
                            {children}
                        </Link>
                    )
                }
            }}>
            {children}
        </Markdown>
    )
}
