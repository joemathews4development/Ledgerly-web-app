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
      const category = tx.category || "Other"

      if (!acc[category]) {
        acc[category] = {
          category,
          revenue: 0,
          expense: 0
        }
      }

      if (tx.type === "revenue") {
        acc[category].revenue += Number(tx.amount)
      } else {
        acc[category].expense += Number(tx.amount)
      }

      return acc
    }, {})
  )

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

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