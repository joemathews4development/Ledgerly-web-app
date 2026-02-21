/**
 * TransactionCard.jsx
 *
 * Reusable transaction display and edit component. Shows transaction details
 * in a responsive layout with inline edit and delete capabilities. Supports
 * both desktop and mobile views with appropriate formatting for each.
 */

import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { useContext, useState } from "react"
import { DataContext } from "../context/expenserevenue.context"
import Modal from "react-bootstrap/Modal"
import axios from 'axios'
import EditTransactionForm from './Forms/EditTransactionForm'
import DeleteConfirmation from './DeleteConfirmationModal'
import { displayableDateTime } from "./Constants"

/**
 * TransactionCard - Individual transaction display with edit and delete actions
 *
 * Features:
 * - Responsive layout (table row on desktop, stacked on mobile)
 * - Inline transaction details (date, title, amount, category, vendor/payer)
 * - Edit transaction via modal form
 * - Delete transaction with confirmation
 * - Dynamic color coding (red for expenses, green for revenues)
 * - Auto-refreshes data after edit or delete operations
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.transaction - Transaction object with id, type, amount, title, category, vendor/payerName, accountId, createdAt
 * @param {string} props.transaction.id - Unique transaction identifier
 * @param {string} props.transaction.type - Transaction type: "expense" or "revenue"
 * @param {number} props.transaction.amount - Transaction amount
 * @param {string} props.transaction.title - Transaction title/description
 * @param {string} props.transaction.category - Transaction category
 * @param {string} props.transaction.vendor - Vendor name (for expenses)
 * @param {string} props.transaction.payerName - Payer name (for revenues)
 * @param {string} props.transaction.accountId - Associated account ID
 * @param {string} props.transaction.createdAt - Transaction creation date/time
 * @returns {React.ReactElement} Transaction display card with edit/delete controls
 *
 * @example
 * <TransactionCard transaction={transactionObject} />
 */
function TransactionCard({ transaction }) {

    // Retrieve account data and refresh function from context
    const { getData, accounts } = useContext(DataContext)

    /** @type {[boolean, Function]} Controls visibility of the Edit Transaction modal */
    const [showEditTransactionForm, setShowEditTransactionForm] = useState(false)

    // Determine if transaction is an expense for type-specific logic and styling
    const isExpense = transaction.type === "expense"

    /**
     * Delete the transaction and update the associated account balance.
     * Makes parallel API requests to remove the transaction and update account.
     * Refreshes data on completion.
     * @async
     * @returns {Promise<void>}
     */
    const handleDelete = async () => {
        const type = isExpense ? "expenses" : "revenues"
        try {
            const selectedAccount = accounts.find((account) => account.id === transaction.accountId)
            const accountPatch = {
                balance: isExpense ? Number(selectedAccount.balance) + Number(transaction.amount)
                    : Number(selectedAccount.balance) - Number(transaction.amount)
            }
            await Promise.all([
                axios.delete(`${import.meta.env.VITE_SERVER_URL}/${type}/${transaction.id}`),
                axios.patch(`${import.meta.env.VITE_SERVER_URL}/accounts/${selectedAccount.id}`, accountPatch)
            ])
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Toggle the Edit Transaction modal visibility.
     * Refreshes data after form is closed to reflect any changes.
     */
    const toggleTransactionForm = () => {
        getData()
        setShowEditTransactionForm((previousValue) => !previousValue)
    }

    // Confirmation message displayed before deleting transaction
    const deleteConfirmationMessage = (
        <>
            Are you sure you want to delete this transaction?
            <br />
            <br />
            <strong>This action cannot be undone.</strong>
        </>
    )

    return (
        <div>
            {/* Desktop View - Table Row Layout */}
            <Stack direction='horizontal' className="d-none d-md-flex align-items-center py-3">
                <div className="w-100">{displayableDateTime(transaction.createdAt)}</div>
                <div className="w-100">{transaction.title}</div>
                <div className={`w-100 ${isExpense ? "text-danger" : "text-success"}`}>{transaction.amount}</div>
                <div className="w-100">{transaction.category}</div>
                {isExpense && <div className="w-100">{transaction.vendor}</div>}
                {!isExpense && <div className="w-100">{transaction.payerName}</div>}

                {/* Edit and Delete Action Buttons */}
                <Stack direction='horizontal' className="align-items-center w-100 d-flex justify-content-center">
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={toggleTransactionForm}>
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                    </Button>

                    {/* Edit Transaction Modal */}
                    <Modal show={showEditTransactionForm} onHide={() => setShowEditTransactionForm(false)} centered size="xl"
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

                    {/* Delete Transaction Button with Confirmation */}
                    <DeleteConfirmation onConfirm={handleDelete} content={deleteConfirmationMessage} />
                </Stack>
            </Stack>

            {/* Mobile View - Stacked Card Layout */}
            <Stack
                direction="horizontal"
                className="flex-column d-md-none align-items-start align-items-md-center py-3"
            >
                {/* Title + Amount */}
                <div className="w-100 d-flex justify-content-between">
                    <strong>{transaction.title}</strong>
                    <span className={isExpense ? "text-danger" : "text-success"}>
                        {transaction.amount}
                    </span>
                </div>

                {/* Secondary Info */}
                <div className="text-muted small mt-1">
                    {displayableDateTime(transaction.createdAt)} • {transaction.category}
                </div>

                {/* Vendor / Payer */}
                <div className="small">
                    {isExpense ? transaction.vendor : transaction.payerName}
                </div>
                {/* Buttons */}
                <div className="mt-2 d-flex gap-2">
                    <Button variant="outline-primary" size="sm" onClick={toggleTransactionForm}>
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                    </Button>
                    <DeleteConfirmation onConfirm={handleDelete} content={deleteConfirmationMessage} />
                </div>

            </Stack>
        </div>
    )
}

export default TransactionCard