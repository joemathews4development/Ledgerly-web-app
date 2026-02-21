/**
 * AccountTransactions.jsx
 *
 * Account-specific transaction history page. Displays all transactions for a
 * selected account, organized by month. Shows account details and a chronological
 * list of transactions with their complete information.
 */

import { useContext } from 'react'
import { useParams } from 'react-router'
import { DataContext } from '../context/expenserevenue.context'
import AccountCard from '../components/AccountCard'
import TransactionCard from '../components/TransactionCard'
import { Card, ListGroup, Stack } from 'react-bootstrap'

/**
 * AccountTransactionsPage - Detailed transaction history for a specific account
 *
 * Features:
 * - Displays account details header with account information
 * - Groups transactions by month in chronological order
 * - Shows only months with transactions for that account
 * - Displays full transaction details (date, title, amount, category, vendor/payer)
 * - Handles empty state when no transactions exist for account
 *
 * Route Params:
 * - accountId (string): Identifier of the account to display transactions for
 *
 * @component
 * @returns {React.ReactElement} Account transactions page with grouped monthly views
 */
function AccountTransactionsPage() {

  // Extract account ID from URL route parameter
  const { accountId } = useParams()

  // Retrieve account list and all monthly transaction data from context
  const { accounts, monthOverviews } = useContext(DataContext)

  // Find the specific account matching the route parameter
  const account = accounts.find((account) => account.id === accountId)

  // Filter and group transactions by month for the specific account
  // Only includes months that have transactions for this account
  const monthTransactions = monthOverviews.map(([month, transactions]) => {
    return { month: month, transactions: transactions.filter((transaction) => transaction.accountId === accountId) }
  }).filter(month => month.transactions.length > 0)

  /**
   * Format month identifier into human-readable date string.
   * @param {string} month - Month identifier in format "YYYY-M"
   * @returns {string} Formatted date string (e.g., "February 2026")
   */
  const formattedMonth = (month) => {
    return new Date(month + "-01").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long"
    }
    )
  }

  return (
    <div>
      {/* Account Details Header */}
      <AccountCard account={account} needTransactionsButton={false} />
      
      {/* Transactions Section Header */}
      <h1 className="mb-5">Transactions</h1>
      
      {/* Empty State or Monthly Transaction Groups */}
      {monthTransactions.length === 0 ? (
        <p className="text-center text-muted py-5">
          No entries found.
        </p>
      ) :
      monthTransactions.map((monthTransaction) => {
          return (
            <div className="mx-5 pb-5">
              <Card className="shadow-sm">
                {/* Month Header */}
                <Card.Header className="fw-bold">{formattedMonth(monthTransaction.month)}</Card.Header>
                
                {/* Transaction Column Headers */}
                <Card.Header className="fw-bold d-none d-md-block">
                    <Stack direction='horizontal' className="align-items-center py-1 text-info">
                        <div className="w-100">Date</div>
                        <div className="w-100">Title</div>
                        <div className="w-100">Amount</div>
                        <div className="w-100">Category</div>
                        <div className="w-100">Vendor/Payer</div>
                        <div className="w-100"></div>
                    </Stack>
                </Card.Header>
                
                {/* Transaction Items for the Month */}
                <ListGroup variant="flush">
                        {monthTransaction.transactions.map(transaction => (
                            <ListGroup.Item key={transaction.id}>
                              <TransactionCard transaction={transaction}/>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
              </Card>
            </div>
          )
        })}
    </div>
  )
}

export default AccountTransactionsPage