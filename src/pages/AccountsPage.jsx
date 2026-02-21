/**
 * AccountsPage.jsx
 *
 * Accounts management page displaying all user accounts and providing
 * functionality to create new accounts. Shows account details and provides
 * navigation to view account-specific transactions.
 */

import { useContext, useState } from "react"
import { DataContext } from "../context/expenserevenue.context"
import AccountCard from "../components/AccountCard"
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal"
import AddAccountForm from "../components/Forms/AddAccountForm"
import { ListGroup } from "react-bootstrap"

/**
 * AccountsPage - Main accounts management interface
 *
 * Features:
 * - Display all user accounts in a list view
 * - Modal form for creating new accounts
 * - Auto-refresh data when new accounts are added
 * - Each account card links to its transaction history
 * - Responsive design with Bootstrap components
 *
 * @component
 * @returns {React.ReactElement} Accounts page with account list and creation interface
 *
 * @example
 * // Usage in routing
 * <AccountsPage />
 */
function AccountsPage() {

    // Retrieve accounts list and data refresh function from context
    const { accounts, getData } = useContext(DataContext)

    /** @type {[boolean, Function]} Controls visibility of the Add Account modal */
    const [showAddAccountForm, setShowAddAccountForm] = useState(false)

    /**
     * Toggle the Add Account modal visibility.
     * When closing the form (showAddAccountForm is true), refreshes data to display newly created accounts.
     */
    const toggleAddAccountForm = () => {
      if (showAddAccountForm) {
        getData()
      }
      setShowAddAccountForm((previousValue) => !previousValue)
    }

  return (
    <div>
      {/* Page Header */}
      <h1>Accounts</h1>

      {/* Create New Account Button */}
      <Button 
        size="lg" 
        variant="outline-success" 
        className="m-5 animated-btn animated-btn-success fw-semibold px-4" 
        onClick={toggleAddAccountForm}
      >
        <i className="bi bi-plus-circle me-2"></i>
        Create New Account
      </Button>

      {/* Add Account Modal */}
      <Modal
        show={showAddAccountForm}
        onHide={() => setShowAddAccountForm(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddAccountForm hideForm={toggleAddAccountForm} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddAccountForm(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Accounts List */}
      <ListGroup variant="flush">
        {accounts.map((account) => {
          return (
            <ListGroup.Item key={account.id}>
              <AccountCard account={account} needTransactionsButton={true} />
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
  )
}

export default AccountsPage