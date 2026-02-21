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

/**
 * MonthlyTransactionsBar
 *
 * Renders a grouped bar chart showing daily revenues and expenses for a month.
 *
 * Props:
 * - monthTransactions: Array — transactions for the month; each should include
 *   at least `{ createdAt, amount, type }` where `type` is 'revenue' or 'expense'.
 *
 * Behavior:
 * - Aggregates transactions by day (formatted as `Mon DD`) and sums revenue/expense separately.
 * - Uses Recharts `BarChart` with two bars per day: revenue (green) and expense (red).
 */
function MonthlyTransactionsBar({ monthTransactions }) {

  // Aggregate by day: produce { date: 'Mon DD', revenue: number, expense: number }
  const chartData = Object.values(
    monthTransactions.reduce((acc, tx) => {
      // Normalize createdAt to YYYY-MM-DD and format for the x-axis label
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

      // Sum amounts into either revenue or expense depending on tx.type
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

          {/* X axis uses the formatted `date` string produced above */}
          <XAxis dataKey="date" />

          {/* Numeric Y axis for amounts */}
          <YAxis />

          {/* Hover tooltip and legend helpers from Recharts */}
          <Tooltip />
          <Legend />

          {/* Two bars: green revenue and red expense */}
          <Bar dataKey="revenue" fill="#16a34a" />
          <Bar dataKey="expense" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyTransactionsBar