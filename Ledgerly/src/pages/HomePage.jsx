import { useEffect, useState, useMemo } from "react"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import MonthlyCard from "../components/Monthly-overview-card";
import ExpenseForm from "../components/ExpenseForm";
import RevenueForm from "../components/RevenueForm";
import Modal from "react-bootstrap/Modal"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/expenserevenue.context"


function HomePage() {

  const {expenses, revenues, monthOverviews, getData } = useContext(DataContext)

  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showRevenueForm, setShowRevenueForm] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      getData()
    }
    loadData()
  }, [])

  const toggleExpenseForm = () => {
    if (showExpenseForm) {
      getData()
    }
    setShowExpenseForm((previousValue) => !previousValue)
  }

  const toggleRevenueForm = () => {
    if (showRevenueForm) {
      getData()
    }
    setShowRevenueForm((previousValue) => !previousValue)
  }


  if (expenses === null || revenues === null || monthOverviews === null) {
    return (
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading expenses and revenues...
      </Button>
    )
  }
  return (
    <div>
      <Button onClick={toggleExpenseForm} className="m-5" disabled={showRevenueForm}>Add Expense</Button>
      <Modal
        show={showExpenseForm}
        onHide={() => setShowExpenseForm(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ExpenseForm hideForm={toggleExpenseForm} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExpenseForm(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={toggleRevenueForm} className="m-5" disabled={showExpenseForm}>Add Revenue</Button>
      <Modal
        show={showRevenueForm}
        onHide={() => setShowRevenueForm(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Revenue</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <RevenueForm hideForm={toggleRevenueForm}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRevenueForm(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {monthOverviews.map(([month, transactions], index) => {
        return (
          <Link to={`/month-details/${month}`}>
            <MonthlyCard key={transactions[0].id} month={month} transactions={transactions} />
          </Link>
        )
      })}
    </div>
  )
}

export default HomePage