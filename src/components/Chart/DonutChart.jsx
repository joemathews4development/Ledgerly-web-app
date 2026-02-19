import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

function MonthlyTransactionsDonut({ monthTransactions }) {

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

    const totalAmount = chartData.reduce((sum, category) => sum + category.total, 0).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })

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
                        innerRadius={80}   // 👈 makes it donut
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

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
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