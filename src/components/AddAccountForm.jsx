import { useContext, useState } from "react"
import { DataContext } from "../context/expenserevenue.context"
import Card from "../assets/card.png"
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function AddAccountForm({ hideForm }) {

    const [title, setTitle] = useState("")
    const [type, setType] = useState("")
    const [balance, setBalance] = useState("")
    const [currency, setCurrency] = useState("")
    const [startDate, setStartDate] = useState("")

    const [titleError, setTitleError] = useState("")
    const [typeError, setTypeError] = useState("")
    const [balanceError, setBalanceError] = useState("")
    const [currencyError, setCurrencyError] = useState("")
    const [startDateError, setStartDateError] = useState("")

    const handleOnChangeTitle = (event) => setTitle(event.target.value)
    const handleOnChangeType = (event) => setType(event.target.value)
    const handleOnChangeBalance = (event) => setBalance(event.target.value)
    const handleOnChangeCurrency = (event) => setCurrency(event.target.value)
    const handleOnChangeStartDate = (event) => setStartDate(event.target.value)

    const checkValidity = () => {
        let isValid = true
        if (title.trim() === "") {
            setTitleError("Title is required")
            isValid = false
        } else {
            setTitleError("")
        }
        if (type.trim() === "") {
            setTypeError("Account type is required")
            isValid = false
        } else {
            setTypeError("")
        }
        if (balance.trim() === "") {
            setBalanceError("Balance is required")
            isValid = false
        } else {
            setBalanceError("")
        }
        if (currency === "") {
            setCurrencyError("Currency is required")
            isValid = false
        } else {
            setCurrencyError("")
        }
        const newDate = new Date(startDate)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        if (newDate > tomorrow) {
            setStartDateError("Date must be in the past")
            isValid = false
        } else {
            setStartDateError("")
        }
        console.log(`Account form entries are ${isValid}`)
        return isValid
    }

    const handleSave = async () => {
        if (!checkValidity()) {
            return
        }
        const newAccount = {
            name: title, 
            type: type, 
            balance: balance, 
            currency: currency, 
            createdAt: startDate
        }
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/accounts`, newAccount)
            hideForm()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center p-3">
                <Row className='m-3'>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleOnChangeTitle} isInvalid={!!titleError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{titleError}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Account Type" className="mb-3">
                        <Form.Control type="text" placeholder="Enter Account Type" value={type} onChange={handleOnChangeType} isInvalid={!!typeError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{typeError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Row>
                <Row className='m-3'>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Balance" className="mb-3">
                        <Form.Control type="text" placeholder="Enter balance" value={balance} onChange={handleOnChangeBalance} isInvalid={!!balanceError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{balanceError}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Currency" className="mb-3">
                        <Form.Control type="text" placeholder="Enter Currency" value={currency} onChange={handleOnChangeCurrency} isInvalid={!!currencyError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{currencyError}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Start Date" className="mb-3">
                        <Form.Control type="date" value={startDate.split("T")[0]} onChange={handleOnChangeStartDate} isInvalid={!!startDateError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{startDateError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Row>
                <Button variant="danger" size="sm" onClick={handleSave}>
                    Save
                </Button>
            </div>
    )
}

export default AddAccountForm