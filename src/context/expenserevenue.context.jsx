import { createContext, useState, useMemo, useEffect } from "react"
import axios from "axios"
import { Button, Spinner } from "react-bootstrap"

const DataContext = createContext()

function DataWrapper(props) {

    const [expenses, setExpenses] = useState(null)
    const [revenues, setRevenues] = useState(null)
    const [accounts, setAccounts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleSetExpenses = (expenses) => {
        setExpenses(expenses)
    }

    const handleSetRevenues = (revenues) => {
        setRevenues(revenues)
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const [expensesResponse, revenuesResponse, accountsResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_SERVER_URL}/expenses`),
                axios.get(`${import.meta.env.VITE_SERVER_URL}/revenues`),
                axios.get(`${import.meta.env.VITE_SERVER_URL}/accounts`)
            ])
            const expensesData = expensesResponse.data
            const revenuesData = revenuesResponse.data
            const accountsData = accountsResponse.data
            handleSetExpenses(expensesData)
            handleSetRevenues(revenuesData)
            setAccounts(accountsData)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getMonthlyOverview = (expensesData, revenuesData) => {
        /**Combine both expenses and revenues into 1 array */
        const expensesWithType = expensesData.map(e => ({ ...e, type: "expense" }))
        const revenuesWithType = revenuesData.map(r => ({ ...r, type: "revenue" }))
        const combined = [...expensesWithType, ...revenuesWithType]
        /**
         * Group the combined array on a monthly basis
         */
        const groupedByMonth = combined.reduce((acc, transaction) => {
            const date = new Date(transaction.createdAt)
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
            if (!acc[monthKey]) {
                acc[monthKey] = []
            }
            acc[monthKey].push(transaction)
            return acc
        }, {})
        // Sort within each month
        Object.keys(groupedByMonth).forEach(month => {
            groupedByMonth[month].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        })
        const sortedMonths = Object.entries(groupedByMonth).sort((a, b) => b[0].localeCompare(a[0]))
        return sortedMonths
    }

    const monthOverviews = useMemo(() => {
        if (!expenses || !revenues) return null
        return getMonthlyOverview(expenses, revenues)
    }, [expenses, revenues])

    const passedContext = {
        expenses, revenues, accounts, monthOverviews,
        getData, handleSetExpenses, handleSetRevenues
    }

    if (isLoading) {
        return (
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading expenses and revenues...
            </Button>
        )
    }
    return (
        <DataContext.Provider value={passedContext}>
            {props.children}
        </DataContext.Provider>
    )

}

export {
    DataContext,
    DataWrapper
}