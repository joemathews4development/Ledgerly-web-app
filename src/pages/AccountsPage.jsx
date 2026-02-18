import { useContext, useState } from "react"
import { DataContext } from "../context/expenserevenue.context"
import AccountCard from "../components/AccountCard"
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal"
import AddAccountForm from "../components/Forms/AddAccountForm";


function AccountsPage() {

    const {accounts, getData} = useContext(DataContext)

    const [showAddAccountForm, setShowAddAccountForm] = useState(false)

    console.log(accounts)

    const toggleAddAccountForm = () => {
    if (showAddAccountForm) {
      getData()
    }
    setShowAddAccountForm((previousValue) => !previousValue)
  }

  return (
    <div className="min-vh-100">
      <h1>Accounts</h1>
      <Button variant="primary" size="lg" className="me-2" onClick={toggleAddAccountForm}>
          Create New Account
      </Button>
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
      {accounts.map((account) => {
          return (
            <AccountCard account={account} key={account.id}/>
          )
      })}
    </div>
  )
}

export default AccountsPage