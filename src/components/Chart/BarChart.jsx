import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts"

function MonthlyTransactionsBar({ monthTransactions }) {

  const chartData = Object.values(
    monthTransactions.reduce((acc, tx) => {
      const date = tx.createdAt.split("T")[0]
      const formattedDate = new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric"
      })
      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          date: formattedDate,
          revenue: 0,
          expense: 0
        }
      }

      if (tx.type === "revenue") {
        acc[formattedDate].revenue += Number(tx.amount)
      } else {
        acc[formattedDate].expense += Number(tx.amount)
      }

      return acc
    }, {})
  )

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar dataKey="revenue" fill="#16a34a" />
          <Bar dataKey="expense" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyTransactionsBar