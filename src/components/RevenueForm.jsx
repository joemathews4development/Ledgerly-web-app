import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from 'axios';

function RevenueForm() {
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("")
    const [payer, setPayer] = useState("")
    const [note, setNote] = useState("")
    const [date, setDate] = useState("")

    const [titleError, setTitleError] = useState("")
    const [amountError, setAmountError] = useState("")
    const [categoryError, setCategoryError] = useState("")
    const [dateError, setDateError] = useState("")

    const handleOnClickTitle = (event) => setTitle(event.target.value)
    const handleOnClickAmount = (event) => setAmount(event.target.value)
    const handleOnClickCategory = (event) => setCategory(event.target.value)
    const handleOnClickPayer = (event) => setPayer(event.target.value)
    const handleOnClickNote = (event) => setNote(event.target.value)
    const handleOnClickDate = (event) => setDate(event.target.value)

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        if (!checkValidity()) {
            return
        }
        const newRevenue = {
            accountId: "c3f5b2e8-9d43-4e2a-8c6b-3f4e5d6c7a82", 
            title: title, 
            amount: amount, 
            category: category, 
            payerName: payer, 
            note: note, 
            receiptUrl: "", 
            createdAt: new Date(date)
        }
        console.log("saving")
        console.log(newRevenue)
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/revenues`, newRevenue)
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
        <Form  className='m-5' onSubmit={handleOnSubmit}>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={10} controlId="formBasicTitle">
                    <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="Enter title" onChange={handleOnClickTitle} isInvalid={!!titleError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{titleError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicAmount">
                    <FloatingLabel controlId="floatingInput" label="Amount" className="mb-3">
                        <Form.Control type="number" placeholder="0" onChange={handleOnClickAmount} isInvalid={!!titleError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{titleError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} controlId="formBasicCategory">
                    <FloatingLabel controlId="floatingInput" label="Category" className="mb-3">
                        <Form.Control type="text" placeholder="0" onChange={handleOnClickCategory} isInvalid={!!titleError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{titleError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicVendor">
                    <FloatingLabel controlId="floatingInput" label="Vendor" className="mb-3">
                        <Form.Control type="text" placeholder="0" onChange={handleOnClickPayer}/>
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={10} controlId="formBasicNote">
                    <FloatingLabel controlId="floatingInput" label="Note" className="mb-3">
                        <Form.Control as="textarea" placeholder="Add some notes" style={{ height: `100px` }} onChange={handleOnClickNote}/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicDate">
                    <FloatingLabel controlId="floatingInput" label="Date" className="mb-3">
                        <Form.Control type="date" onChange={handleOnClickDate} isInvalid={!!titleError}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{titleError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Add Revenue
            </Button>
        </Form>
    )
}

export default RevenueForm