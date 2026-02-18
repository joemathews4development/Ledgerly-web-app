import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { DataContext } from '../context/expenserevenue.context'
import AccountCard from '../components/AccountCard'
import TransactionCard from '../components/TransactionCard'

function AccountTransactionsPage() {

    const { accountId } = useParams()
    const { accounts, monthOverviews } = useContext(DataContext)

    const account = accounts.find((account) => account.id === accountId)

    const monthTransactions = monthOverviews.map(([month, transactions]) => {
      return {month: month, transactions: transactions.filter((transaction) => transaction.accountId === accountId)}
    })

    const formattedMonth = (month) => { 
      return new Date(month + "-01").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long"
      }
    )}

  return (
    <div className="min-vh-100">
      <AccountCard account={account}/>
      {monthTransactions.map((monthTransaction) => {
          return(
            <div className='py-5'>
                <h2>{formattedMonth(monthTransaction.month)}</h2>
                {monthTransaction.transactions.map((transaction) => {
                    return (
                        <TransactionCard transaction={transaction}/>
                    )
                })}
            </div>
          )
      })}
    </div>
  )
}

export default AccountTransactionsPage