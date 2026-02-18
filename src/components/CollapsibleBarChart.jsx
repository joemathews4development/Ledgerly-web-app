import { Button, Collapse } from "react-bootstrap";
import MonthlyTransactionsBar from "../components/BarChart";
import { useState } from "react";

function CollapsibleBarChart({ transactions }) {

  const [open, setOpen] = useState(false)

  return (
    <div className="my-3">

      <Button
        variant="outline-primary"
        onClick={() => setOpen(!open)}
        aria-controls="bar-chart-collapse"
        aria-expanded={open}
      >
        {open ? "▲ Hide Chart" : "▼ Show Chart"}
      </Button>

      <Collapse in={open}>
        <div id="bar-chart-collapse" className="mt-3">
          <MonthlyTransactionsBar  monthTransactions={transactions}
          />
        </div>
      </Collapse>

    </div>
  )
}

export default CollapsibleBarChart