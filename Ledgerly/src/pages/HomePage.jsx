import { useEffect, useState, useMemo } from "react"
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import MonthlyCard from "../components/Monthly-overview-card";
import ExpenseForm from "../components/ExpenseForm";
import RevenueForm from "../components/RevenueForm";
import Modal from "react-bootstrap/Modal"
import { Link } from "react-router-dom";
import { expensesAndRevenues } from "../Utilities/ExpenseRevenueCalculations"
import { useContext } from "react";
import { DataContext } from "../context/expenserevenue.context"


function HomePage() {

  // const [expenses, setExpenses] = useState(null)
  // const [revenues, setRevenues] = useState(null)
  // const [monthOverviews, setMonthOverviews] = useState(null)

  const {expenses, revenues, monthOverviews, getData } = useContext(DataContext)

  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showRevenueForm, setShowRevenueForm] = useState(false)

  // let monthOverviews = null

  useEffect(() => {
    const loadData = async () => {
      getData()
    }
    loadData()
  }, [])

  // const getData = async () => {
  //   try {
  //     const [expensesResponse, revenuesResponse] = await Promise.all([
  //       axios.get(`${import.meta.env.VITE_SERVER_URL}/expenses`),
  //       axios.get(`${import.meta.env.VITE_SERVER_URL}/revenues`)
  //     ])
  //     const expensesData = expensesResponse.data
  //     const revenuesData = revenuesResponse.data
  //     handleSetExpenses(expensesData)
  //     handleSetRevenues(revenuesData)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const getMonthlyOverview = (expensesData, revenuesData) => {
  //   /**Combine both expenses and revenues into 1 array */
  //   const expensesWithType = expensesData.map(e => ({ ...e, type: "expense" }))
  //   const revenuesWithType = revenuesData.map(r => ({ ...r, type: "revenue" }))
  //   const combined = [...expensesWithType, ...revenuesWithType]
  //   /**
  //    * Group the combined array on a monthly basis
  //    */
  //   const groupedByMonth = combined.reduce((acc, transaction) => {
  //     const date = new Date(transaction.createdAt)
  //     const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
  //     if (!acc[monthKey]) {
  //       acc[monthKey] = []
  //     }
  //     acc[monthKey].push(transaction)
  //     return acc
  //   }, {})
  //   // Sort within each month
  //   Object.keys(groupedByMonth).forEach(month => {
  //     groupedByMonth[month].sort((a, b) => new Date(a.date) - new Date(b.date))
  //   })
  //   const sortedMonths = Object.entries(groupedByMonth).sort((a, b) => b[0].localeCompare(a[0]))
  //   return sortedMonths
  // }

  // const monthOverviews = useMemo(() => {
  //   if (!expenses || !revenues) return null

  //   return getMonthlyOverview(expenses, revenues)
  //   // console.log(monthOverviews)
  // }, [expenses, revenues])

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
      {monthOverviews.map(([month, transactions]) => {
        return (
          <Link to={`/month-details/${month}`}>
            <MonthlyCard key={month} month={month} transactions={transactions} />
          </Link>
        )
      })}
    </div>
  )
}

export default HomePage