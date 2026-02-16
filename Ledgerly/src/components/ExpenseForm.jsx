import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from 'axios';

function ExpenseForm({hideForm}) {

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("")
    const [vendor, setVndor] = useState("")
    const [note, setNote] = useState("")
    const [date, setDate] = useState("")

    const handleOnClickTitle = (event) => setTitle(event.target.value)
    const handleOnClickAmount = (event) => setAmount(event.target.value)
    const handleOnClickCategory = (event) => setCategory(event.target.value)
    const handleOnClickVendor = (event) => setVendor(event.target.value)
    const handleOnClickNote = (event) => setNote(event.target.value)
    const handleOnClickDate = (event) => setDate(event.target.value)

    const handleOnSubmit = async () => {
        const newExpense = {
            accountId: "c3f5b2e8-9d43-4e2a-8c6b-3f4e5d6c7a82", 
            title: title, 
            amount: amount, 
            category: category, 
            vendor: vendor, 
            note: note, 
            receiptUrl: "", 
            createdAt: new Date(date)
        }
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/expenses`, newExpense)
            hideForm()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form  className='m-5'>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={10} controlId="formBasicTitle">
                    <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="Enter title" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicAmount">
                    <FloatingLabel controlId="floatingInput" label="Amount" className="mb-3">
                        <Form.Control type="number" placeholder="0" />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} controlId="formBasicCategory">
                    <FloatingLabel controlId="floatingInput" label="Category" className="mb-3">
                        <Form.Control type="text" placeholder="0" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicVendor">
                    <FloatingLabel controlId="floatingInput" label="Vendor" className="mb-3">
                        <Form.Control type="text" placeholder="0" />
                    </FloatingLabel>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={10} controlId="formBasicNote">
                    <FloatingLabel controlId="floatingInput" label="Note" className="mb-3">
                        <Form.Control as="textarea" placeholder="Add some notes" style={{ height: `100px` }} />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicDate">
                    <FloatingLabel controlId="floatingInput" label="Date" className="mb-3">
                        <Form.Control type="date" />
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