import { useEffect, useState } from "react"
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import MonthlyCard from "../components/Monthly-overview-card";
import ExpenseForm from "../components/ExpenseForm";


function HomePage() {

  const [expenses, setExpenses] = useState(null)
  const [revenues, setRevenues] = useState(null)
  const [monthOverviews, setMonthOverviews] = useState(null)
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const [expensesResponse, revenuesResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_SERVER_URL}/expenses`),
        axios.get(`${import.meta.env.VITE_SERVER_URL}/revenues`)
      ])

      const expensesData = expensesResponse.data
      const revenuesData = revenuesResponse.data

      setExpenses(expensesData)
      setRevenues(revenuesData)

      compute(expensesData, revenuesData)
    } catch (error) {
      console.log(error)
    }
  }

  const compute = async (expensesData, revenuesData) => {
      const result = await getMonthlyOverview(expensesData, revenuesData)
      console.log("computing")
      setMonthOverviews(result)
      console.log(result)
      console.log(monthOverviews)
    }

  const getMonthlyOverview = async (expensesData, revenuesData) => {
      return new Promise(resolve => {
        /**Combine both expenses and revenues into 1 array */
        const expensesWithType = expensesData.map(e => ({ ...e, type: "expense" }))
        const revenuesWithType = revenuesData.map(r => ({ ...r, type: "revenue" }))
        const combined = [...expensesWithType, ...revenuesWithType]
        /**
         * Group the combined array on a monthly basis
         */
        const groupedByMonth = combined.reduce((acc, transaction) => {
          const date = new Date(transaction.createdAt)
          const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}` 
          if (!acc[monthKey]) {
            acc[monthKey] = []
          }
          acc[monthKey].push(transaction)
          return acc
        }, {})
        // Sort within each month
        Object.keys(groupedByMonth).forEach(month => {
          groupedByMonth[month].sort((a, b) => new Date(a.date) - new Date(b.date))
        })
        const sortedMonths = Object.entries(groupedByMonth).sort((a, b) => b[0].localeCompare(a[0]))
        resolve(sortedMonths)
      })
  }

  const toggleForm = () => {
    setShowExpenseForm((previousValue) => !previousValue)
  }

  if (expenses === null || revenues === null) {
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
      <button onClick={toggleForm}>Add Expense</button>
      {showExpenseForm && <ExpenseForm hideForm={toggleForm}/>}
      <button>Add Revenue</button>
      {monthOverviews.map(([month, transactions]) => {
        return(
          <MonthlyCard key={month} month={month} transactions={transactions} />
        )
      })}
    </div>
  )
}

export default HomePage