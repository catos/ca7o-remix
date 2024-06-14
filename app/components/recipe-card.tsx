import { Heart, Star } from "lucide-react"
import { twMerge } from "tailwind-merge"

import { snip } from "~/lib/snip"

import { Heading } from "./ui/heading"
import { Link } from "./ui/link"

type Props = {
    image: string
    href: string
    title: string
    isFavorite: boolean
    rating: number
    time: number
    difficulty: number
    description: string
}

export function RecipeCard({ image, href, title, isFavorite }: Props) {
    return (
        <Link
            className="relative flex flex-col max-h-64 no-underline w-full rounded overflow-hidden shadow-lg hover:outline hover:outline-primary-700 hover:outline-2"
            to={href}>
            <img
                className="h-64 object-cover bg-primary-300"
                src={image}
                alt={title}
            />
            <CardHeading
                title={title}
                isFavorite={isFavorite}
            />
            <Rating rating={4.5} />
        </Link>
    )
}

function CardHeading({
    title,
    isFavorite
}: {
    title: string
    isFavorite: boolean
}) {
    let size = "text-2xl"

    if (title.length > 15) {
        size = "text-xl"
    }

    if (title.length > 30) {
        size = "text-lg"
    }

    return (
        <Heading
            as="h2"
            className={twMerge(
                "absolute bottom-0 left-0 right-0 h-24 flex gap-2 flex-1 items-center px-4 bg-slate-900 bg-opacity-75 overflow-hidden font-semibold text-white mb-0",
                size
            )}>
            {isFavorite && (
                <Heart className="w-6 h-6 text-white fill-red-500" />
            )}
            <span>{snip(title, 50)}</span>
        </Heading>
    )
}

function Rating({ rating }: { rating: number }) {
    const arr = [...Array(Math.floor(rating)).keys()]
    return (
        <div className="flex gap-1 absolute bottom-2 right-2 bg-primary-700 text-white font-semibold">
            {arr.map(i => (
                <Star
                    key={i}
                    className="w-4 h-4"
                />
            ))}
        </div>
    )
}
