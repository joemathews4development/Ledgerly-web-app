import { useContext, useState } from "react";
import { DataContext } from "../context/expenserevenue.context"
import { useParams } from "react-router-dom";
import TransactionCard from "../components/TransactionCard";

function MonthDetailsPage(props) {

    const {expenses, revenues, monthOverviews, getData} = useContext(DataContext)

    const params = useParams()

     const monthOverview = monthOverviews.find(([month, transactions]) => month === params.yearMonth)

    return (
        <div>
            {monthOverview[1].map((transaction) => {
                return(
                    <TransactionCard transaction={transaction}/>
                )
            })}
        </div>
    )
}

export default MonthDetailsPage