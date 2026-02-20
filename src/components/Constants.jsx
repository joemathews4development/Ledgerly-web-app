import Card1 from "../assets/Card1.png"
import Card2 from "../assets/Card2.png"
import Card3 from "../assets/Card3.png"
import Card4 from "../assets/Card4.png"
import Card5 from "../assets/Card5.png"
import Card6 from "../assets/Card6.png"
import Card7 from "../assets/Card7.png"

export const ACCOUNT_TYPES = [
    { label: "Bank Account", value: "Bank", image: Card7 },
    { label: "Savings Account", value: "Savings", image: Card6 },
    { label: "Credit Card", value: "Credit Card", image: Card5 },
    { label: "Cash", value: "Cash", image: Card4 },
    { label: "Investment", value: "Investment", image: Card3 },
    { label: "Wallet", value: "Wallet", image: Card2 }
]

export const getFormattedInputDate = (isoDate) => {
    if (!isoDate) return ""
    const dateObj = new Date(isoDate)
    const pad = (num) => num.toString().padStart(2, "0")
    return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}T${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`
}

export const displayableDateTime = (isoDate) => { 
    return new Date(isoDate).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}