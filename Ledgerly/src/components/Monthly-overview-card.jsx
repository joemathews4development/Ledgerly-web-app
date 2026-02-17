import { Doughnut } from 'react-chartjs-2';

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

    return (
        <div>
            <h1>{month}</h1>
            {/* <Doughnut data={chartData} /> */}
            {transactions.map((transaction, index) => {
                return (
                    <div key={index}>
                        <p>{transaction.createdAt}</p>
                        <p>{transaction.amount}</p>
                    </div>
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