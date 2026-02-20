import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/expenserevenue.context"
import Card from "../assets/card.png"
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmationModal";
import { ACCOUNT_TYPES as accountTpyes } from "./Constants"


function AccountCard({ account, needTransactionsButton }) {

    const { getData } = useContext(DataContext)
    console.log(account)

    const navigate = useNavigate()
    /**
     * this is needed to update the balance as it is handled by state in this file, so changing the context will not affect here automatically.
     *  So we track the change in account and change the state of balance
     */
    useEffect(() => {
        setBalance(account.balance)
    }, [account])

    const [title, setTitle] = useState(account.name)
    const [type, setType] = useState(account.type)
    const [balance, setBalance] = useState(account.balance)
    const [currency, setCurrency] = useState(account.currency)
    const [startDate, setStartDate] = useState(account.createdAt)

    const [titleError, setTitleError] = useState("")
    const [typeError, setTypeError] = useState("")
    const [balanceError, setBalanceError] = useState("")
    const [currencyError, setCurrencyError] = useState("")
    const [startDateError, setStartDateError] = useState("")

    const [isEditing, setIsEditing] = useState(false)

    const handleOnChangeTitle = (event) => setTitle(event.target.value)
    const handleOnChangeType = (event) => setType(event.target.value)
    const handleOnChangeBalance = (event) => setBalance(event.target.value)
    const handleOnChangeCurrency = (event) => setCurrency(event.target.value)
    const handleOnChangeStartDate = (event) => setStartDate(new Date(event.target.value).toISOString())

    const checkValidity = () => {
        let isValid = true
        if (title.trim() === "") {
            setTitleError("Name is required")
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
        if (balance === "") {
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
        console.log(`Expense form entries are ${isValid}`)
        return isValid
    }

    const toggleEditing = () => {
        setIsEditing((previousValue) => !previousValue)
    }

    const handleCancel = () => {
        setTitle(account.name)
        setType(account.type)
        setBalance(account.balance)
        setCurrency(account.currency)
        setStartDate(account.createdAt)
        toggleEditing()
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_URL}/accounts/${account.id}`)
            getData()
            navigate("/accounts")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSave = async () => {
        if (!checkValidity()) {
            return
        }
        const editedAccount = {
            name: title, 
            type: type, 
            balance: balance, 
            currency: currency, 
            createdAt: startDate
        }
        try {
            await axios.put(`${import.meta.env.VITE_SERVER_URL}/accounts/${account.id}`, editedAccount)
            getData()
            toggleEditing()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteConfirmationMessage = (
        <>
            Are you sure you want to delete this account?
            <br />
            <br />
            This will delete all transactions linked to this account.
            <br />
            <br />
            <strong>This action cannot be undone.</strong>
        </>
    )

    return (
        <div className="d-flex justify-content-center align-items-center p-3">
            <img src={accountTpyes.find((ty) => ty.value === type).image} alt="" style={{width: "25%", height: "10%"}} />
            <div>
                <div className="d-flex justify-content-end m-5">
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={toggleEditing} hidden={isEditing}>
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                    </Button>
                    <DeleteConfirmation onConfirm={handleDelete} content={deleteConfirmationMessage} />
                </div>
                <Row className='m-3'>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Name" className="mb-3">
                        <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleOnChangeTitle} isInvalid={!!titleError} disabled={!isEditing}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{titleError}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Account Type" className="mb-3">
                        <Form.Select aria-label="Default select example" value={type} onChange={handleOnChangeType} isInvalid={!!typeError} disabled={!isEditing}>
                            <option>Select account type</option>
                            {accountTpyes.map((accountType) => {
                                return (
                                    <option value={accountType.value}>{accountType.label}</option>
                                )
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className='text-start'>{typeError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Row>
                <Row className='m-3'>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Balance" className="mb-3">
                        <Form.Control type="text" placeholder="Enter balance" value={balance} onChange={handleOnChangeBalance} isInvalid={!!balanceError} disabled={!isEditing}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{balanceError}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Currency" className="mb-3">
                        <Form.Control type="text" placeholder="Enter Currency" value={currency} onChange={handleOnChangeCurrency} isInvalid={!!currencyError} disabled={!isEditing}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{currencyError}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel as={Col} controlId="floatingInput" label="Start Date" className="mb-3">
                        <Form.Control type="date" value={startDate.split("T")[0]} onChange={handleOnChangeStartDate} isInvalid={!!startDateError} disabled={!isEditing}/>
                        <Form.Control.Feedback type="invalid" className='text-start'>{startDateError}</Form.Control.Feedback>
                    </FloatingLabel>
                </Row>
                <div className="d-flex justify-content-end m-5">
                    <Button variant="primary" size="sm" className="me-2" onClick={handleCancel} hidden={!isEditing}>
                        Cancel
                    </Button>
                    <Button variant="danger" size="sm" onClick={handleSave} hidden={!isEditing}>
                        Save
                    </Button>
                </div>
                {needTransactionsButton && <Link to={`/accounts/${account.id}/transactions`}>
                    <Button variant="outline-primary" className="me-2" hidden={isEditing}>
                        Show Transactions
                    </Button>
                </Link>}
            </div>
        </div>
    )
}

export default AccountCard