import { createContext, useState } from "react"
import LogoDark from "../assets/Logo-dark.png"
import LogoLight from "../assets/Logo-light.png"

const ThemeContext = createContext()

function ThemeWrapper(props) {

    const [theme, setTheme] = useState("light")
    const [logo, setLogo] = useState(LogoLight)

    const handleToggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
        setLogo(theme === "light" ? LogoDark : LogoLight)
    }

    const passedContext = {
        theme, handleToggleTheme, logo
    }

    return <ThemeContext.Provider value={passedContext}>
        {props.children}
    </ThemeContext.Provider>

}

export {
    ThemeContext, ThemeWrapper
}