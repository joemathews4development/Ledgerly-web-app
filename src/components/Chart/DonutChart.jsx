import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

/**
 * MonthlyTransactionsDonut
 *
 * Renders a donut chart summarizing transactions by category for a month.
 *
 * Props:
 * - monthTransactions: Array — list of transaction objects for the month.
 *   Each transaction is expected to include at least: `{ amount, category }`.
 *
 * Behavior:
 * - Aggregates transactions by `category` (falls back to "Other").
 * - Displays a colored donut (Recharts) and the numeric total in the center.
 */
function MonthlyTransactionsDonut({ monthTransactions }) {

    // Aggregate transactions by category into { category, total } entries
    const chartData = Object.values(
        monthTransactions.reduce((acc, tx) => {
            const category = tx.category || "Other"
            if (!acc[category]) {
                acc[category] = {
                    category,
                    total: 0
                }
            }
            acc[category].total += Number(tx.amount)
            return acc
        }, {})
    )

    // Total amount formatted for display in the center of the donut
    const totalAmount = chartData.reduce((sum, category) => sum + category.total, 0).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })

    // Palette used to color slices. Falls back by index if more categories than colors.
    const COLORS = [
        "#3b82f6",
        "#16a34a",
        "#bfbc0d",
        "#f59e0b",
        "#8b5cf6",
        "#06b6d4",
        "#c28e1f",
        "#b027eb"
    ]

    return (
        <div style={{ width: "100%", height:400, position: "relative" }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="total"
                        nameKey="category"
                        innerRadius={80}   // makes the chart a donut
                        outerRadius={120}
                        paddingAngle={3}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    {/* Recharts helpers for hover tooltip and legend */}
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            {/* Center label showing total formatted amount */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                    fontSize: "20px"
                }}
            >
                ${totalAmount}
            </div>
        </div>
    )
}

export default MonthlyTransactionsDonut