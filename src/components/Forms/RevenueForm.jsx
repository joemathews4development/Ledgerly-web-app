/**
 * RevenueForm.jsx
 *
 * Form component for creating new revenue transactions. Handles revenue entry
 * with account selection, payer information, and automatic account balance updates.
 * Includes form validation and error handling.
 */

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useContext, useState } from 'react'
import axios from 'axios'
import { DataContext } from '../../context/expenserevenue.context'
import { getFormattedInputDate } from "../Constants"

/**
 * RevenueForm - Form for creating new revenue transactions
 *
 * Features:
 * - Revenue entry with title, amount, category, and payer information
 * - Account selection for crediting the revenue
 * - Optional note/description and custom transaction date
 * - Form validation with error messages for all required fields
 * - Automatic account balance update when revenue is added
 * - Date validation to prevent future dates
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.hideForm - Callback to hide/close the form after submission
 * @returns {React.ReactElement} Revenue entry form
 *
 * @example
 * const [showForm, setShowForm] = useState(false);
 * <RevenueForm hideForm={() => setShowForm(false)} />
 */
function RevenueForm({ hideForm }) {

    // Retrieve accounts list from context
    const { accounts } = useContext(DataContext)

    // Form field states
    /** @type {[string, Function]} Revenue title/description */
    const [title, setTitle] = useState("")

    /** @type {[number, Function]} Revenue amount */
    const [amount, setAmount] = useState(0)

    /** @type {[string, Function]} Revenue category */
    const [category, setCategory] = useState("")

    /** @type {[string, Function]} Account ID to credit the revenue to */
    const [accountId, setAccountId] = useState("")

    /** @type {[string, Function]} Name of the payer/source */
    const [payer, setPayer] = useState("")

    /** @type {[string, Function]} Optional notes about the revenue */
    const [note, setNote] = useState("")

    /** @type {[string, Function]} Transaction date in ISO format */
    const [date, setDate] = useState(new Date().toISOString())

    // Form validation error states
    /** @type {[string, Function]} Title field error message */
    const [titleError, setTitleError] = useState("")

    /** @type {[string, Function]} Amount field error message */
    const [amountError, setAmountError] = useState("")

    /** @type {[string, Function]} Category field error message */
    const [categoryError, setCategoryError] = useState("")

    /** @type {[string, Function]} Account ID field error message */
    const [accountIdError, setAccountIdError] = useState("")

    /** @type {[string, Function]} Date field error message */
    const [dateError, setDateError] = useState("")

    // Form field change handlers
    const handleOnClickTitle = (event) => setTitle(event.target.value)
    const handleOnClickAmount = (event) => setAmount(event.target.value)
    const handleOnClickCategory = (event) => setCategory(event.target.value)
    const handleOnChangeAccountId = (event) => setAccountId(event.target.value)
    const handleOnClickPayer = (event) => setPayer(event.target.value)
    const handleOnClickNote = (event) => setNote(event.target.value)
    const handleOnClickDate = (event) => setDate(new Date(event.target.value).toISOString())

    /**
     * Handle form submission. Validates form, creates revenue record, and updates account balance.
     * Makes parallel API requests for revenue creation and account balance update.
     * @async
     * @param {Event} event - Form submit event
     * @returns {Promise<void>}
     */
    const handleOnSubmit = async (event) => {
        event.preventDefault()
        if (!checkValidity()) {
            return
        }
        const newRevenue = {
            accountId: accountId, 
            title: title, 
            amount: amount, 
            category: category, 
            payerName: payer, 
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
                axios.post(`${import.meta.env.VITE_SERVER_URL}/revenues`, newRevenue),
                axios.patch(`${import.meta.env.VITE_SERVER_URL}/accounts/${accountId}`, accountPatch)
            ])
            hideForm()
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Validate all form fields and set error messages.
     * Checks for required fields, positive amount, and dates not in the future.
     * @returns {boolean} True if all fields are valid, false otherwise
     */
    const checkValidity = () => {
        let isValid = true
        if (title.trim() === "") {
            setTitleError("Title is required")
            isValid = false
        }
        if (amount <= 0) {
            setAmountError("Amount must be greater than 0")
            isValid = false
        }
        if (category.trim() === "") {
            setCategoryError("Category is required")
            isValid = false
        }
        const newDate = new Date(date)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        if (newDate > tomorrow) {
            setDateError("Date must be in the past")
            isValid = false
        }
        console.log(`Expense form entries are ${isValid}`)
        return isValid
    }

    return (
        <Form className='m-5' onSubmit={handleOnSubmit}>
            {/* Title and Amount Fields */}
            <Row className='mb-3'>
                <Form.Group as={Col} xs={10} controlId="formBasicTitle">
                    <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="Enter title" onChange={handleOnClickTitle} isInvalid={!!titleError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{titleError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicAmount">
                    <FloatingLabel controlId="floatingInput" label="Amount" className="mb-3">
                        <Form.Control type="number" placeholder="0" onChange={handleOnClickAmount} isInvalid={!!amountError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{amountError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            {/* Category, Account, and Payer Fields */}
            <Row className='mb-3'>
                <Form.Group as={Col} controlId="formBasicCategory">
                    <FloatingLabel controlId="floatingInput" label="Category" className="mb-3">
                        <Form.Control type="text" placeholder="0" onChange={handleOnClickCategory} isInvalid={!!categoryError}/>
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
                <Form.Group as={Col} controlId="formBasicPayer">
                    <FloatingLabel controlId="floatingInput" label="Payer" className="mb-3">
                        <Form.Control type="text" placeholder="0" onChange={handleOnClickPayer}/>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            {/* Notes and Date Fields */}
            <Row className='mb-3'>
                <Form.Group as={Col} xs={7} controlId="formBasicNote">
                    <FloatingLabel controlId="floatingInput" label="Note" className="mb-3">
                        <Form.Control as="textarea" placeholder="Add some notes" style={{ height: `100px` }} onChange={handleOnClickNote}/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicDate">
                    <FloatingLabel controlId="floatingInput" label="Date" className="mb-3">
                        <Form.Control type="datetime-local" value={getFormattedInputDate(date)} onChange={handleOnClickDate} isInvalid={!!dateError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{dateError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            {/* Submit Button */}
            <Button variant="outline-primary" type="submit">
                Add Revenue
            </Button>
        </Form>
    )
}

export default RevenueForm