import { useContext, useState } from "react"
import { DataContext } from "../context/expenserevenue.context"
import AccountCard from "../components/AccountCard"
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal"
import AddAccountForm from "../components/Forms/AddAccountForm";
import { ListGroup } from "react-bootstrap";


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
    <div>
      <h1>Accounts</h1>
      <Button size="lg" variant="outline-success" className="m-5 animated-btn animated-btn-success fw-semibold px-4" onClick={toggleAddAccountForm}>
        <i className="bi bi-plus-circle me-2"></i>
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
      <ListGroup variant="flush">
        {accounts.map((account) => {
          return (
            <ListGroup.Item key={account.id}>
                <AccountCard account={account} needTransactionsButton={true}/>
            </ListGroup.Item>
          )
      })}
      </ListGroup>
    </div>
  )
}

export default AccountsPage