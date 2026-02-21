/**
 * Constants.jsx
 *
 * Centralized location for application-wide constants and utility functions.
 * Includes account type definitions with visual assets and date/time formatting utilities.
 */

import Card1 from "../assets/Card1.png"
import Card2 from "../assets/Card2.png"
import Card3 from "../assets/Card3.png"
import Card4 from "../assets/Card4.png"
import Card5 from "../assets/Card5.png"
import Card6 from "../assets/Card6.png"
import Card7 from "../assets/Card7.png"

/**
 * Account type options for account creation/editing
 * Each type includes a display label, internal value, and associated card image asset.
 *
 * @type {Array<{label: string, value: string, image: string}>}
 * @constant
 *
 * @example
 * // Use in form selects
 * ACCOUNT_TYPES.map(type => <option value={type.value}>{type.label}</option>)
 */
export const ACCOUNT_TYPES = [
    { label: "Bank Account", value: "Bank", image: Card7 },
    { label: "Savings Account", value: "Savings", image: Card6 },
    { label: "Credit Card", value: "Credit Card", image: Card5 },
    { label: "Cash", value: "Cash", image: Card4 },
    { label: "Investment", value: "Investment", image: Card3 },
    { label: "Wallet", value: "Wallet", image: Card2 }
]

/**
 * Convert ISO datetime string to format compatible with HTML datetime-local input.
 * Pads month, day, hours, and minutes with leading zeros for proper formatting.
 *
 * @param {string} isoDate - ISO format datetime string (e.g., "2026-02-21T14:30:00.000Z")
 * @returns {string} Formatted datetime string for input fields (e.g., "2026-02-21T14:30")
 *
 * @example
 * const isoDate = "2026-02-21T14:30:00.000Z"
 * getFormattedInputDate(isoDate) // Returns "2026-02-21T14:30"
 */
export const getFormattedInputDate = (isoDate) => {
    if (!isoDate) return ""
    const dateObj = new Date(isoDate)
    const pad = (num) => num.toString().padStart(2, "0")
    return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}T${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`
}

/**
 * Convert ISO datetime string to human-readable format for display in the UI.
 * Uses en-US locale with full date and time components.
 *
 * @param {string} isoDate - ISO format datetime string (e.g., "2026-02-21T14:30:00.000Z")
 * @returns {string} Formatted readable datetime (e.g., "February 21, 2026, 02:30 PM")
 *
 * @example
 * const isoDate = "2026-02-21T14:30:00.000Z"
 * displayableDateTime(isoDate) // Returns "February 21, 2026, 02:30 PM"
 */
export const displayableDateTime = (isoDate) => { 
    return new Date(isoDate).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}