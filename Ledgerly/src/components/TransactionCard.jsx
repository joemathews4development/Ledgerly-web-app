import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { useContext, useState } from "react";
import { DataContext } from "../context/expenserevenue.context"
import Modal from "react-bootstrap/Modal"
import axios from 'axios';
import EditTransactionForm from './EditTransactionForm';


function TransactionCard({ transaction }) {

    const { getData } = useContext(DataContext)
    const [showEditTransactionForm, setShowEditTransactionForm] = useState(false)

    const isExpense = transaction.type === "expense"

    const handleDelete = async () => {
        const type = isExpense ? "expenses" : "revenues" 
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_URL}/${type}/${transaction.id}`)
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    const toggleTransactionForm = () => {
        if (showEditTransactionForm) {
            getData()
        }
        setShowEditTransactionForm((previousValue) => !previousValue)
    }

    return (
        <Stack direction='horizontal' className="align-items-center border-bottom py-3">
            <div className="w-100">{transaction.createdAt}</div>
            <div className="w-100">{transaction.title}</div>
            <div className={`w-100 ${isExpense ? "text-danger" : "text-success"}`}>{transaction.amount}</div>
            <div className="w-100">{transaction.category}</div>
            {isExpense && <div className="w-100">{transaction.vendor}</div>}
            {!isExpense && <div className="w-100">{transaction.payerName}</div>}
            <Stack direction='horizontal' className="align-items-center w-100 d-flex justify-content-center">
                <Button variant="primary" size="sm" className="me-2" onClick={toggleTransactionForm}>
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                </Button>
                <Modal
                    show={showEditTransactionForm}
                    onHide={() => setShowEditTransactionForm(false)}
                    centered
                    size="xl"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit {isExpense ? "Expense" : "Revenue"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditTransactionForm transaction={transaction} hideForm={toggleTransactionForm} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditTransactionForm(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="danger" size="sm" onClick={handleDelete}>
                    <i className="bi bi-trash me-1"></i>
                    Delete
                </Button>
            </Stack>
        </Stack>
    )
}

export default TransactionCard