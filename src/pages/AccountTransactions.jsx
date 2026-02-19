import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { DataContext } from '../context/expenserevenue.context'
import AccountCard from '../components/AccountCard'
import TransactionCard from '../components/TransactionCard'
import { Card, ListGroup, ListGroupItem, Stack } from 'react-bootstrap'

function AccountTransactionsPage() {

  const { accountId } = useParams()
  const { accounts, monthOverviews } = useContext(DataContext)

  const account = accounts.find((account) => account.id === accountId)
  console.log("Over here", account)

  const monthTransactions = monthOverviews.map(([month, transactions]) => {
    return { month: month, transactions: transactions.filter((transaction) => transaction.accountId === accountId) }
  }).filter(month => month.transactions.length > 0)

  const formattedMonth = (month) => {
    return new Date(month + "-01").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long"
    }
    )
  }



  return (
    <div>
      <AccountCard account={account} needTransactionsButton={false} />
      <h1 className="mb-5">Transactions</h1>
      {monthTransactions.length === 0 ? (
        <p className="text-center text-muted py-5">
          No entries found.
        </p>
      ) :
        monthTransactions.map((monthTransaction) => {
          return (
            <div className="mx-5 pb-5">
                <Card className="shadow-sm">
              <Card.Header className="fw-bold">
                {formattedMonth(monthTransaction.month)}
              </Card.Header>
              <Card.Header className="fw-bold">
                <Stack direction='horizontal' className="align-items-center py-1 text-info">
                    <div className="w-100">Date</div>
                    <div className="w-100">Title</div>
                    <div className="w-100">Amount</div>
                    <div className="w-100">Category</div>
                    <div className="w-100">Vendor/Payer</div>
                    <div className="w-100"></div>
                </Stack>
              </Card.Header>
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