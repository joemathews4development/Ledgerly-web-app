import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'


function TransactionCard({ transaction }) {

    const isExpense = transaction.type === "expense"

    return (
        <Stack direction='horizontal' className="align-items-center border-bottom py-3">
            <div className="w-100">{transaction.createdAt}</div>
            <div className="w-100">{transaction.title}</div>
            <div className="w-100">{transaction.amount}</div>
            <div className="w-100">{transaction.category}</div>
            {isExpense && <div className="w-100">{transaction.vendor}</div>}
            {!isExpense && <div className="w-100">{transaction.payerName}</div>}
            <Stack direction='horizontal' className="align-items-center w-100 d-flex justify-content-center">
                <Button variant="primary" size="sm" className="me-2">
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                </Button>

                <Button variant="danger" size="sm">
                    <i className="bi bi-trash me-1"></i>
                    Delete
                </Button>
            </Stack>
        </Stack>
    )
}

export default TransactionCard