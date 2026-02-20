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

function ExpenseForm({hideForm}) {

    const { accounts } = useContext(DataContext)
    
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("")
    const [accountId, setAccountId] = useState("")
    const [vendor, setVendor] = useState("")
    const [note, setNote] = useState("")
    const [date, setDate] = useState("")

    const [titleError, setTitleError] = useState("")
    const [amountError, setAmountError] = useState("")
    const [categoryError, setCategoryError] = useState("")
    const [accountIdError, setAccountIdError] = useState("")
    const [dateError, setDateError] = useState("")

    const handleOnChangeAmount = (event) => setAmount(event.target.value)
    const handleOnChangeCategory = (event) => setCategory(event.target.value)
    const handleOnChangeTitle = (event) => setTitle(event.target.value)
    const handleOnChangeAccountId = (event) => setAccountId(event.target.value)
    const handleOnChangeVendor = (event) => setVendor(event.target.value)
    const handleOnChangeDate = (event) => setDate(event.target.value)
    const handleOnChangeNote = (event) => setDate(new Date(event.target.value).toISOString())

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
            console.log(error)
        }
    }

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
        console.log(`Expense form entries are ${isValid}`)
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
                        <Form.Control type="datetime-localate" value={getFormattedInputDate(date)} onChange={handleOnChangeDate} isInvalid={!!dateError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{dateError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Add Expense
            </Button>
        </Form>
    )
}

export default ExpenseForm