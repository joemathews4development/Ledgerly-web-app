import { useEffect, useState, useMemo } from "react"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import MonthlyCard from "../components/Monthly-overview-card";
import ExpenseForm from "../components/Forms/ExpenseForm";
import RevenueForm from "../components/Forms/RevenueForm";
import Modal from "react-bootstrap/Modal"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/expenserevenue.context"
import Carousel from 'react-bootstrap/Carousel';


function HomePage() {

  const { expenses, revenues, accounts, monthOverviews, getData } = useContext(DataContext)

  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showRevenueForm, setShowRevenueForm] = useState(false)

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

  return (
    <div className="min-vh-100">
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
          <RevenueForm hideForm={toggleRevenueForm} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRevenueForm(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Carousel interval={null} indicators={false}>
        {monthOverviews.map(([month, transactions], index) => {
          return (
            <Carousel.Item key={transactions[0].id}>
              <Link to={`/month-details/${month}`} className="text-reset text-decoration-none">
                <MonthlyCard month={month} transactions={transactions} />
              </Link>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}

export default HomePage