// import List from "~/components/ui/list"
// import ListItem from "~/components/ui/list-item"
// import Timer from "../timer"
import ReactMarkdown from "react-markdown"
import { twMerge } from "tailwind-merge"

import { Image } from "~/components/image"
import { Heading } from "~/components/ui/heading"

import { Link } from "./ui/link"

export function Markdown({
    children,
    className
}: {
    children: string | null
    className?: string
}) {
    if (!children) return null

    return (
        <ReactMarkdown
            components={{
                h1: ({ children }) => {
                    return (
                        <Heading
                            className={className}
                            as="h1">
                            {children}
                        </Heading>
                    )
                },

                h2: ({ children }) => {
                    return (
                        <Heading
                            className={className}
                            as="h2">
                            {children}
                        </Heading>
                    )
                },

                h3: ({ children }) => {
                    return (
                        <Heading
                            className={className}
                            as="h3">
                            {children}
                        </Heading>
                    )
                },

                ul: ({ children }) => {
                    const classes = twMerge("pl-6 my-2", className)
                    return <ul className={classes}>{children}</ul>
                },

                li: ({ children }) => {
                    const classes = twMerge("list-decimal", className)
                    return <li className={classes}>{children}</li>
                },

                p: ({ children }) => {
                    const classes = twMerge("leading-relaxed", className)
                    return <p className={classes}>{children}</p>
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
                    const classes = twMerge("relative", className)
                    return (
                        <span className={classes}>
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

                    const classes = twMerge("text-red-900", className)

                    return (
                        <Link
                            to={href}
                            className={classes}>
                            {children}
                        </Link>
                    )
                }
            }}>
            {children}
        </ReactMarkdown>
    )
}
