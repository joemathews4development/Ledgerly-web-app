import { useContext, useState } from "react";
import { DataContext } from "../context/expenserevenue.context"
import { useParams } from "react-router-dom";
import TransactionCard from "../components/TransactionCard";
import { Stack } from "react-bootstrap";

function MonthDetailsPage(props) {

    const {expenses, revenues, monthOverviews, getData} = useContext(DataContext)

    const params = useParams()

     const monthOverview = monthOverviews.find(([month, transactions]) => month === params.yearMonth)

    return (
        <div className="min-vh-100">

            <Stack direction='horizontal' className="align-items-center border-bottom py-3 my-2 text-info">
                <div className="w-100">Date</div>
                <div className="w-100">Title</div>
                <div className="w-100">Amount</div>
                <div className="w-100">Category</div>
                <div className="w-100">Vendor/Payer</div>
                <div className="w-100"></div>
            </Stack>
            {monthOverview[1].map((transaction) => {
                return(
                    <TransactionCard transaction={transaction}/>
                )
            })}
        </div>
    )
}

export default MonthDetailsPage