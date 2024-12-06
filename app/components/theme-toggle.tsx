import { Moon, Sun } from "lucide-react"
import { Theme, useTheme } from "remix-themes"

import { Button } from "./ui/button"

export function ThemeToggle() {
    const [theme, setTheme] = useTheme()

    const toggleTheme = () => {
        if (theme === Theme.LIGHT) {
            setTheme(Theme.DARK)
        } else {
            setTheme(Theme.LIGHT)
        }
    }

    return (
        <div>
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    )
}