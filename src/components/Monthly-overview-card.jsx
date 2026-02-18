import { Doughnut } from 'react-chartjs-2';
import DonutChart from './Chart/BarChart';
import MonthlyTransactionsBar from './Chart/BarChart';
import Stack from 'react-bootstrap/Stack'
import MonthlyTransactionsDonut from './Chart/DonutChart';

function MonthlyCard({month, transactions}) {
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

    const totalExpense = transactions.reduce((sum, transaction) => transaction.type === "expense" ? sum + Number(transaction.amount): sum, 0)
    const totalRevenue = transactions.reduce((sum, transaction) => transaction.type === "revenue" ? sum + Number(transaction.amount): sum, 0)
    const balance = totalRevenue - totalExpense
    console.log(totalExpense, totalRevenue, balance)

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
                    <p className={`fs-2 ${balance < 0 ? "text-danger" : "text-success"} fw-bold`}>{balance}</p>
                    <p>
                        {balance < 0 
                            ? `Expenses were higher than income this month. Consider reviewing your spending patterns.`
                            : `Great job! You closed this month with a positive balance.`}
                    </p>
                </div>
                <div className='w-50'>
                    <h4>Revenues Chart</h4>
                    <MonthlyTransactionsDonut monthTransactions={transactions.filter((transaction) => transaction.type === "revenue")} />
                </div>
            </div>
            {transactions.slice(0, 5).map((transaction, index) => {
                const formattedDate = new Date(transaction.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC"
                })
                return (
                    <Stack direction='horizontal' className="align-items-center border-bottom py-3 my-2" key={index}>
                        <div className="w-100">{formattedDate}</div>
                        <div className="w-100">{transaction.title}</div>
                        <div className={`w-100 ${transaction.type === "expense" ? "text-danger" : "text-success"}`}>{transaction.amount}</div>
                    </Stack>
                )
            })}
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