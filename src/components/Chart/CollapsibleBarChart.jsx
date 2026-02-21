import { Button, Collapse } from "react-bootstrap";
import MonthlyTransactionsBar from "./BarChart";
import { useState } from "react";

/**
 * CollapsibleBarChart
 *
 * Small wrapper that toggles visibility of the `MonthlyTransactionsBar`.
 * Props:
 * - transactions: Array — list of transactions passed through to the inner bar chart.
 *
 * Behavior:
 * - Shows a toggle button that expands/collapses the chart using React-Bootstrap's `Collapse`.
 */
function CollapsibleBarChart({ transactions }) {

  // Local UI state controlling whether the chart is visible
  const [open, setOpen] = useState(false)

  return (
    <div className="my-3">

      {/* Toggle button: updates `open` and provides accessible attributes */}
      <Button
        variant="outline-primary"
        onClick={() => setOpen(!open)}
        aria-controls="bar-chart-collapse"
        aria-expanded={open}
      >
        {open ? "▲ Hide Chart" : "▼ Show Chart"}
      </Button>

      {/* Collapse animates showing/hiding of the inner `MonthlyTransactionsBar` component */}
      <Collapse in={open}>
        <div id="bar-chart-collapse" className="mt-3">
          <MonthlyTransactionsBar monthTransactions={transactions} />
        </div>
      </Collapse>

    </div>
  )
}

export default CollapsibleBarChart