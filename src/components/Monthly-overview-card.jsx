/**
 * Monthly-overview-card.jsx
 *
 * Card component that displays a monthly financial summary including expense/revenue
 * breakdown charts, balance status with motivational messages, and recent transactions.
 * Provides a quick snapshot of monthly financial health with visual and emotional feedback.
 */

import Stack from 'react-bootstrap/Stack'
import MonthlyTransactionsDonut from './Chart/DonutChart'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { displayableDateTime } from "./Constants"

/**
 * MonthlyCard - Monthly financial overview with charts and balance summary
 *
 * Features:
 * - Expense and revenue breakdown charts (donut charts)
 * - Balance calculation with dynamic color coding (positive/negative)
 * - Motivational messages and emojis based on financial outcome
 * - Recent transactions preview (top 3)
 * - Responsive layout (row on large screens, column on mobile)
 * - Link to detailed month view for full transaction history
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.month - Month identifier in format "YYYY-M"
 * @param {Array<Object>} props.transactions - Array of transaction objects with type, amount, title, createdAt
 * @returns {React.ReactElement} Monthly overview card component
 *
 * @example
 * <MonthlyCard month="2026-2" transactions={februaryTransactions} />
 */
function MonthlyCard({ month, transactions }) {
    
    // Calculate total expenses from transactions
    const totalExpense = transactions.reduce((sum, transaction) => transaction.type === "expense" ? sum + Number(transaction.amount) : sum, 0)

    // Calculate total revenues from transactions
    const totalRevenue = transactions.reduce((sum, transaction) => transaction.type === "revenue" ? sum + Number(transaction.amount) : sum, 0)

    // Calculate net balance (revenue - expenses)
    const balance = (Number(totalRevenue) - Number(totalExpense))

    // Determine if balance is positive for styling and message selection
    const isPositive = Number(balance) >= 0

    // Format balance as localized currency string
    const balanceString = balance.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })

    // Motivational messages for positive balance outcomes
    const positiveMessages = [
        "Fantastic work! You closed this month with a positive balance.",
        "Income exceeded expenses this month — keep up the smart planning!",
        "You stayed ahead this month. Financial discipline is paying off.",
        "Strong month! Your earnings outpaced your spending.",
        "Nice momentum! You maintained a healthy surplus.",
        "Well managed! Your financial strategy is working.",
        "Another successful month with money flowing in."
    ]

    // Motivational messages for negative balance outcomes (deficit)
    const negativeMessages = [
        "Expenses were higher than income this month. Consider reviewing your spending patterns.",
        "This month ended in a deficit. A few small adjustments could help next month.",
        "Spending overtook earnings this month — time to reassess priorities.",
        "A challenging month financially. Let’s rebalance and recover.",
        "Expenses exceeded income. Review major categories for optimization.",
        "Cash outflow was heavier this month. Next month can be stronger.",
        "It happens — use this month as insight for better planning."
    ]

    // Emoji icons for positive balance outcomes
    const positiveEmojis = ["🎉", "💰", "🚀", "🔥", "🤑", "💹", "🥳"]

    // Emoji icons for negative balance outcomes
    const negativeEmojis = ["⚠️", "📉", "😟", "💸", "🔴", "🧾", "⛔"]

    /**
     * Select a random item from an array.
     * Used for varying motivational messages and emoji feedback.
     * @param {Array} array - Array to select from
     * @returns {*} Random element from the array
     */
    const getRandomItem = (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

    // Format month identifier into human-readable date (e.g., "February 2026")
    const formattedMonth = new Date(month + "-01").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long"
    })

    return (
        <div className="w-75 mx-auto">
            <h1>{formattedMonth}</h1>
            {/* This remains row on larger screens but on all other screens it becomes column to have better 
                displays supporting responsiveness */}
            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center py-5">
                {/* Expenses Chart - shown only on large screens */}
                <div className="w-100 w-md-50 text-center">
                    <h4>Expenses Chart</h4>
                    <MonthlyTransactionsDonut
                        monthTransactions={transactions.filter(
                            (transaction) => transaction.type === "expense"
                        )}
                    />
                </div>
                {/* Center Summary */}
                <div className="w-100 w-md-50 text-center my-4 my-md-0">
                    {/* Balance */}
                    <p className={`fs-2 ${isPositive ? "text-success" : "text-danger"} fw-bold`}>
                        {balanceString}
                    </p>
                    <div style={{ fontSize: "6rem" }}>
                        {getRandomItem(isPositive ? positiveEmojis : negativeEmojis)}
                    </div>
                    <p className={`fs-5 fw-semibold ${isPositive ? "text-success" : "text-danger"}`}>
                        {getRandomItem(isPositive ? positiveMessages : negativeMessages)}
                    </p>
                </div>
                {/* Revenues Chart - shown only on large screens */}
                <div className="w-100 w-md-50 text-center">
                    <h4>Revenues Chart</h4>
                    <MonthlyTransactionsDonut
                        monthTransactions={transactions.filter(
                            (transaction) => transaction.type === "revenue"
                        )}
                    />
                </div>
            </div>
            <Card className="shadow-sm mb-5">
                <Card.Header className="fw-bold">
                    <Stack direction='horizontal' className="align-items-center my-2 text-info">
                        <div className="w-100">Date</div>
                        <div className="w-100">Title</div>
                        <div className="w-100">Amount</div>
                    </Stack>
                </Card.Header>
                <ListGroup variant="flush">
                    {transactions.slice(0, 3).map((transaction, index) => {
                        return (
                            <ListGroup.Item key={transaction.id}>
                                <Stack direction='horizontal' className="align-items-center py-2 my-2" key={index}>
                                    <div className="w-100">{displayableDateTime(transaction.createdAt)}</div>
                                    <div className="w-100">{transaction.title}</div>
                                    <div className={`w-100 ${transaction.type === "expense" ? "text-danger" : "text-success"}`}>{transaction.amount}</div>
                                </Stack>
                            </ListGroup.Item>
                        )
                    })}
                    <Link to={`/month-details/${month}`} >
                        <Button variant="outline-primary" size="sm" className="me-2 py-2 my-3">
                            Show More
                        </Button>
                    </Link>
                </ListGroup>
            </Card>
        </div>
    )

}

export default MonthlyCard