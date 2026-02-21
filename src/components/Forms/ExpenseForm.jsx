import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { DataContext } from "../../context/expenserevenue.context"
import { getFormattedInputDate } from "../Constants"

/**
 * ExpenseForm
 *
 * Form used to create a new expense and update the associated account balance.
 * This component is controlled and uses DataContext to read available accounts.
 *
 * Props:
 * - hideForm: function — callback to hide/close the parent form modal after successful submit
 *
 * Behavior:
 * - Validates required fields locally before sending requests.
 * - On submit, posts a new expense and patches the account balance in parallel.
 */
function ExpenseForm({hideForm}) {

    // Context: available accounts (id, name, balance, ...)
    const { accounts } = useContext(DataContext)
    
    // --- Controlled form fields ---
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("")
    const [accountId, setAccountId] = useState("")
    const [vendor, setVendor] = useState("")
    const [note, setNote] = useState("")
    const [date, setDate] = useState(new Date().toISOString())

    // --- Validation error messages ---
    const [titleError, setTitleError] = useState("")
    const [amountError, setAmountError] = useState("")
    const [categoryError, setCategoryError] = useState("")
    const [accountIdError, setAccountIdError] = useState("")
    const [dateError, setDateError] = useState("")

    // --- Field change handlers (simple setters) ---
    const handleOnChangeAmount = (event) => setAmount(event.target.value)
    const handleOnChangeCategory = (event) => setCategory(event.target.value)
    const handleOnChangeTitle = (event) => setTitle(event.target.value)
    const handleOnChangeAccountId = (event) => setAccountId(event.target.value)
    const handleOnChangeVendor = (event) => setVendor(event.target.value)
    const handleOnChangeNote = (event) => setNote(event.target.value)
    const handleOnChangeDate = (event) => setDate(new Date(event.target.value).toISOString())

    /**
     * handleOnSubmit
     * - Validate form inputs with `checkValidity`.
     * - Create `newExpense` payload and patch the selected account's balance.
     * - Uses `Promise.all` to perform both network requests in parallel.
     */
    const handleOnSubmit = async (event) => {
        event.preventDefault()
        if (!checkValidity()) {
            return
        }
        const newExpense = {
            accountId: accountId, 
            title: title, 
            amount: amount, 
            category: category, 
            vendor: vendor, 
            note: note, 
            receiptUrl: "", 
            createdAt: new Date(date)
        }
        const selectedAccount = accounts.find((account) => account.id === accountId)
        const accountPatch = {
            balance: selectedAccount.balance - amount
        }
        try {
            await Promise.all([
                axios.post(`${import.meta.env.VITE_SERVER_URL}/expenses`, newExpense),
                axios.patch(`${import.meta.env.VITE_SERVER_URL}/accounts/${accountId}`, accountPatch)
            ])
            hideForm()
        } catch (error) {
            // Network or server error — log for now. UI feedback could be added later.
            console.log(error)
        }
    }

    /**
     * checkValidity
     * - Performs simple client-side validation and sets error messages.
     * - Returns `true` when all validations pass.
     */
    const checkValidity = () => {
        let isValid = true
        if (title.trim() === "") {
            setTitleError("Title is required")
            isValid = false
        } else {
            setTitleError("")
        }
        if (amount <= 0) {
            setAmountError("Amount must be greater than 0")
            isValid = false
        } else {
            setAmountError("")
        }
        if (category.trim() === "") {
            setCategoryError("Category is required")
            isValid = false
        } else {
            setCategoryError("")
        }
        if (accountId === "") {
            setAccountIdError("Account is required")
            isValid = false
        } else {
            setAccountIdError("")
        }
        const newDate = new Date(date)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        if (newDate > tomorrow) {
            setDateError("Date must be in the past")
            isValid = false
        } else {
            setDateError("")
        }
        return isValid
    }

    return (
        <Form  className='m-5' onSubmit={handleOnSubmit}>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={8} controlId="formBasicTitle">
                    <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="Enter title" onChange={handleOnChangeTitle} isInvalid={!!titleError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{titleError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicAmount">
                    <FloatingLabel controlId="floatingInput" label="Amount" className="mb-3">
                        <Form.Control type="number" placeholder="0" onChange={handleOnChangeAmount} isInvalid={!!amountError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{amountError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} controlId="formBasicCategory">
                    <FloatingLabel controlId="floatingInput" label="Category" className="mb-3">
                        <Form.Control type="text" placeholder="0" onChange={handleOnChangeCategory} isInvalid={!!categoryError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{categoryError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicAccountId">
                    <FloatingLabel controlId="floatingInput" label="AccountId" className="mb-3">
                        <Form.Select aria-label="Default select example" onChange={handleOnChangeAccountId} isInvalid={!!accountIdError}>
                            <option>Select an account</option>
                            {accounts.map((account) => {
                                return (
                                    <option value={account.id}>{account.name}</option>
                                )
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className='text-start'>{accountIdError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicVendor">
                    <FloatingLabel controlId="floatingInput" label="Vendor" className="mb-3">
                        <Form.Control type="text" placeholder="0" onChange={handleOnChangeVendor}/>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={7} controlId="formBasicNote">
                    <FloatingLabel controlId="floatingInput" label="Note" className="mb-3">
                        <Form.Control as="textarea" placeholder="Add some notes" style={{ height: `100px` }} onChange={handleOnChangeNote}/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicDate">
                    <FloatingLabel controlId="floatingInput" label="Date" className="mb-3">
                        <Form.Control type="datetime-local" value={getFormattedInputDate(date)} onChange={handleOnChangeDate} isInvalid={!!dateError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{dateError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            <Button variant="outline-primary" type="submit">
                Add Expense
            </Button>
        </Form>
    )
}

export default ExpenseForm