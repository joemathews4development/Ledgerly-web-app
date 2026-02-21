/**
 * expenserevenue.context.jsx
 *
 * Provides centralized data management for expenses, revenues, and accounts.
 * Handles fetching data from the backend, managing loading/error states, and
 * computing monthly overviews by combining transactions across both income and expenses.
 */

import { createContext, useState, useMemo, useEffect } from "react"
import axios from "axios"
import { Button, Spinner } from "react-bootstrap"

/**
 * DataContext - Context object for financial data management
 * Provides expenses, revenues, accounts, and monthly overviews to descendant components.
 *
 * @typedef {Object} DataContextValue
 * @property {Array|null} expenses - List of expense transactions
 * @property {Array|null} revenues - List of revenue transactions
 * @property {Array|null} accounts - List of user accounts
 * @property {Array|null} monthOverviews - Monthly grouped and sorted transaction data
 * @property {Function} getData - Refetch all data from the backend
 * @property {Function} handleSetExpenses - Update expenses state
 * @property {Function} handleSetRevenues - Update revenues state
 */
const DataContext = createContext()

/**
 * DataWrapper - Context provider component for financial data management
 *
 * Manages the lifecycle of financial data, including initial fetching, loading states,
 * and error handling. Provides monthly transaction overviews by combining expenses and
 * revenues grouped by month and sorted in descending order.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that consume the data context
 * @returns {React.ReactElement} DataContext provider or loading/error UI
 *
 * @example
 * // Usage in App.jsx
 * <DataWrapper>
 *   <YourApp />
 * </DataWrapper>
 */
function DataWrapper(props) {

    /** @type {[Array|null, Function]} Set of expense transactions */
    const [expenses, setExpenses] = useState(null)

    /** @type {[Array|null, Function]} Set of revenue transactions */
    const [revenues, setRevenues] = useState(null)

    /** @type {[Array|null, Function]} Set of user accounts */
    const [accounts, setAccounts] = useState(null)

    /** @type {[boolean, Function]} Loading state for initial data fetch */
    const [isLoading, setIsLoading] = useState(true)

    /** @type {[boolean, Function]} Error state when data fetch fails */
    const [isError, setIsError] = useState(false)

    /**
     * Update the expenses state with new data.
     * @param {Array} expenses - Array of expense transaction objects
     */
    const handleSetExpenses = (expenses) => {
        setExpenses(expenses)
    }

    /**
     * Update the revenues state with new data.
     * @param {Array} revenues - Array of revenue transaction objects
     */
    const handleSetRevenues = (revenues) => {
        setRevenues(revenues)
    }

    useEffect(() => {
        getData()
    }, [])

    /**
     * Fetch expenses, revenues, and accounts data from the backend.
     * Sets loading state while fetching and handles errors gracefully.
     * Uses Promise.all to fetch all datasets in parallel for performance.
     *
     * @async
     * @returns {Promise<void>}
     */
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
            setIsLoading(false)
            setIsError(true)
        }
    }

    /**
     * Combine expenses and revenues, then group by month in descending order.
     * Adds a `type` property to each transaction ("expense" or "revenue") for classification.
     *
     * @param {Array} expensesData - Array of expense transactions
     * @param {Array} revenuesData - Array of revenue transactions
     * @returns {Array<[string, Array]>} Array of [monthKey, transactions] pairs sorted newest first
     */
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

    // Context value provided to all consuming components
    const passedContext = {
        expenses,
        revenues,
        accounts,
        monthOverviews,
        getData,
        handleSetExpenses,
        handleSetRevenues,
    }

    if (isLoading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-body">
                <Spinner animation="grow" variant="success" style={{ width: "3rem", height: "3rem" }}/>
                <h5 className="mt-4 text-body-secondary">
                    Preparing your dashboard...
                </h5>
            </div>
        )
    }
    if (isError) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-body">
                <div className="p-5 rounded shadow bg-body-tertiary text-center">
                    <div style={{ fontSize: "4rem" }}>💸</div>
                    <h1 className="fw-bold mt-3">404 - Page Not Found</h1>
                    <p className="text-body-secondary mt-3">
                        The page you're looking for doesn’t exist.
                    </p>
                    <Button variant="outline-primary" className="mt-4" onClick={() => {
                        setIsLoading(true)
                        getData()
                    }}>
                        Try Again
                    </Button>
                </div>
            </div>
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