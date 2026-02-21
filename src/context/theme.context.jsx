/**
 * theme.context.jsx
 *
 * Provides theme management for the entire application, enabling light/dark mode
 * switching and corresponding logo assets. The theme state is applied to the
 * document body via Bootstrap's data-bs-theme attribute, ensuring consistent
 * theme application across all components, including modals rendered in portals.
 */

import { createContext, useEffect, useState } from "react"
import LogoDark from "../assets/Logo-dark.png"
import LogoLight from "../assets/Logo-light.png"

/**
 * ThemeContext - Context object for theme management
 * Provides theme state and toggle function to descendant components.
 *
 * @typedef {Object} ThemeContextValue
 * @property {string} theme - Current theme: "light" or "dark"
 * @property {Function} handleToggleTheme - Function to toggle between themes
 * @property {string} logo - Path to the current theme's logo asset
 */
const ThemeContext = createContext()

/**
 * ThemeWrapper - Context provider component for theme management
 *
 * Manages application-wide theme state and syncs it with Bootstrap's theme system
 * by updating the document body's data-bs-theme attribute. This ensures all
 * Bootstrap components, including those rendered in portals, receive the correct theme.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that consume the theme context
 * @returns {React.ReactElement} ThemeContext provider wrapping children
 *
 * @example
 * // Usage in App.jsx
 * <ThemeWrapper>
 *   <YourApp />
 * </ThemeWrapper>
 */
function ThemeWrapper(props) {

    /** @type {[string, Function]} Theme state: "light" or "dark" */
    const [theme, setTheme] = useState("light")

    /** @type {[string, Function]} Logo asset path for the current theme */
    const [logo, setLogo] = useState(LogoLight)
    
    /**
     * This is to control the theeme on a complete app level. This will only work if your component or elements 
     * are not using custom background color, if so you need to handle each case individually. This works fine in
     *  this project as all the components are created using react bootstrap. This is needed here and not in App.js
     * as modal views are rentered in a portal mounted outside the main layout. 
     */
    useEffect(() => {
        document.body.setAttribute("data-bs-theme", theme)
    }, [theme])

    /**
     * Toggles the application theme between light and dark modes.
     * Updates both the theme state and the corresponding logo asset.
     * The DOM update is handled by the useEffect hook above.
     */
    const handleToggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
        setLogo(theme === "light" ? LogoDark : LogoLight)
    }

    // Context value passed to consumers
    const passedContext = {
        theme,
        handleToggleTheme,
        logo,
    }

    return (
        <ThemeContext.Provider value={passedContext}>
            {props.children}
        </ThemeContext.Provider>
    )

}

export {
    ThemeContext, ThemeWrapper
}