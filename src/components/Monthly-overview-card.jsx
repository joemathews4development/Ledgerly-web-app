import { Doughnut } from 'react-chartjs-2';
import DonutChart from './Chart/BarChart';
import MonthlyTransactionsBar from './Chart/BarChart';
import Stack from 'react-bootstrap/Stack'
import MonthlyTransactionsDonut from './Chart/DonutChart';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MonthlyCard({ month, transactions }) {
    const chartData = {
        labels: ['Expenses', 'Revenues'],
        datasets: [
            {
                label: 'Transactions Summary',
                data: [2000, 3000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const totalExpense = transactions.reduce((sum, transaction) => transaction.type === "expense" ? sum + Number(transaction.amount) : sum, 0)
    const totalRevenue = transactions.reduce((sum, transaction) => transaction.type === "revenue" ? sum + Number(transaction.amount) : sum, 0)
    const balance = (Number(totalRevenue) - Number(totalExpense))
    const isPositive = Number(balance) >= 0
    const balanceString = balance.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    const positiveMessages = [
        "Fantastic work! You closed this month with a positive balance.",
        "Income exceeded expenses this month — keep up the smart planning!",
        "You stayed ahead this month. Financial discipline is paying off.",
        "Strong month! Your earnings outpaced your spending.",
        "Nice momentum! You maintained a healthy surplus.",
        "Well managed! Your financial strategy is working.",
        "Another successful month with money flowing in."
    ]

    const negativeMessages = [
        "Expenses were higher than income this month. Consider reviewing your spending patterns.",
        "This month ended in a deficit. A few small adjustments could help next month.",
        "Spending overtook earnings this month — time to reassess priorities.",
        "A challenging month financially. Let’s rebalance and recover.",
        "Expenses exceeded income. Review major categories for optimization.",
        "Cash outflow was heavier this month. Next month can be stronger.",
        "It happens — use this month as insight for better planning."
    ]

    const positiveEmojis = ["🎉", "💰", "🚀", "🔥", "🤑", "💹", "🥳"]

    const negativeEmojis = ["⚠️", "📉", "😟", "💸", "🔴", "🧾", "⛔"]

    const getRandomItem = (array) => {
        return array[Math.floor(Math.random() * array.length)]
    }

    const formattedMonth = new Date(month + "-01").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long"
    })

    return (
        <div className="w-75 mx-auto">
            <h1>{formattedMonth}</h1>
            <div className='d-flex align-items-center justify-content-center py-5'>
                <div className='w-50'>
                    <h4>Expenses Chart</h4>
                    <MonthlyTransactionsDonut monthTransactions={transactions.filter((transaction) => transaction.type === "expense")} />
                </div>
                <div className='w-50'>
                    <p className={`fs-2 ${isPositive ? "text-success" : "text-danger"} fw-bold`}>{balanceString}</p>
                    <div style={{ fontSize: "6rem" }}>
                        {getRandomItem(isPositive ? positiveEmojis : negativeEmojis)}
                    </div>
                    <p className={`fs-5 fw-semibold ${isPositive ? "text-success" : "text-danger"}`}>
                        {getRandomItem(isPositive ? positiveMessages : negativeMessages)}
                    </p>
                </div>
                <div className='w-50'>
                    <h4>Revenues Chart</h4>
                    <MonthlyTransactionsDonut monthTransactions={transactions.filter((transaction) => transaction.type === "revenue")} />
                </div>
            </div>
            <Card className="shadow-sm">
                <Card.Header className="fw-bold">
                    <Stack direction='horizontal' className="align-items-center my-2 text-info">
                        <div className="w-100">Date</div>
                        <div className="w-100">Title</div>
                        <div className="w-100">Amount</div>
                    </Stack>
                </Card.Header>
                <ListGroup variant="flush">
                    {transactions.slice(0, 3).map((transaction, index) => {
                        const formattedDate = new Date(transaction.createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "UTC"
                        })
                        return (
                            <ListGroup.Item key={transaction.id}>
                                <Stack direction='horizontal' className="align-items-center py-2 my-2" key={index}>
                                    <div className="w-100">{formattedDate}</div>
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

    function getExpensesSum() {
        return transactions.reduce((sum, transaction) => transaction.type === "expense" && sum + transaction.amount, 0)
    }

    function getRevenuesSum() {
        return this.transactions.reduce((sum, transaction) => transaction.type === "revenue" && sum + transaction.amount, 0)
    }

    function getTotal() {
        return getRevenuesSum() - getRevenuesSum()
    }

}

export default MonthlyCard