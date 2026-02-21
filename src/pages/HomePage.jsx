/**
 * HomePage.jsx
 *
 * Main landing page of the application displaying monthly transaction overviews.
 * Provides quick-access buttons to add new expenses and revenues via modals,
 * with a carousel interface for browsing transactions month by month.
 */

import { useState } from "react"
import Button from 'react-bootstrap/Button'
import MonthlyCard from "../components/Monthly-overview-card"
import ExpenseForm from "../components/Forms/ExpenseForm"
import RevenueForm from "../components/Forms/RevenueForm"
import Modal from "react-bootstrap/Modal"
import { useContext } from "react"
import { DataContext } from "../context/expenserevenue.context"
import Carousel from 'react-bootstrap/Carousel'

/**
 * HomePage - Main dashboard displaying monthly transaction overviews
 *
 * Features:
 * - Carousel of monthly transaction summaries
 * - Modal forms for adding new expenses and revenues
 * - Mutually exclusive form toggles to prevent simultaneous editing
 * - Auto-refresh data when forms are closed (submit or cancel)
 *
 * @component
 * @returns {React.ReactElement} Dashboard page with transaction carousel and action modals
 */
function HomePage() {

  // Retrieve monthly transaction overviews and data refresh function from context
  const { monthOverviews, getData } = useContext(DataContext)

  /** @type {[boolean, Function]} Controls visibility of the Add Expense modal */
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  /** @type {[boolean, Function]} Controls visibility of the Add Revenue modal */
  const [showRevenueForm, setShowRevenueForm] = useState(false)

  /**
   * Toggle the Add Expense modal.
   * When closing the form (showExpenseForm is true), refreshes data to display newly added expenses.
   * Prevents the Revenue form from being open simultaneously.
   */
  const toggleExpenseForm = () => {
    if (showExpenseForm) {
      getData()
    }
    setShowExpenseForm((previousValue) => !previousValue)
  }

  /**
   * Toggle the Add Revenue modal.
   * When closing the form (showRevenueForm is true), refreshes data to display newly added revenues.
   * Prevents the Expense form from being open simultaneously.
   */
  const toggleRevenueForm = () => {
    if (showRevenueForm) {
      getData()
    }
    setShowRevenueForm((previousValue) => !previousValue)
  }

  return (
    <div>
      {/* Add Expense Button and Modal */}
      <Button 
        variant="outline-danger" 
        onClick={toggleExpenseForm} 
        className="m-5 animated-btn animated-btn-danger fw-semibold px-4" 
        disabled={showRevenueForm}
      >
        <i className="bi bi-arrow-down-circle me-2"></i>
        Add Expense
      </Button>
      <Modal
        show={showExpenseForm}
        onHide={() => setShowExpenseForm(false)}
        centered
        size="xl"
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

      {/* Add Revenue Button and Modal */}
      <Button 
        variant="outline-success" 
        onClick={toggleRevenueForm} 
        className="m-5 animated-btn animated-btn-success fw-semibold px-4" 
        disabled={showExpenseForm}
      >
        <i className="bi bi-arrow-up-circle me-2"></i>
        Add Revenue
      </Button>
      <Modal
        show={showRevenueForm}
        onHide={() => setShowRevenueForm(false)}
        centered
        size="xl"
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

      {/* Monthly Transaction Carousel - Browses transactions month by month */}
      <Carousel 
        interval={null} 
        indicators={false}
        wrap={false}
      >
        {monthOverviews.map(([month, transactions], index) => {
          return (
            <Carousel.Item key={transactions[0].id}>
              <MonthlyCard month={month} transactions={transactions} />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}

export default HomePage