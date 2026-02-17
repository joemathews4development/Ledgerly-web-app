import React, { useEffect } from 'react'

function MonthDetailsPage(props) {

    const [expenses, setExpenses] = useState(null)
    const [revenues, setRevenues] = useState(null)

    useEffect(() => {

    }, [])

    const getData = async () => {
        try {
        const [expensesResponse, revenuesResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_SERVER_URL}/expenses`),
            axios.get(`${import.meta.env.VITE_SERVER_URL}/revenues`)
        ])

        const expensesData = expensesResponse.data
        const revenuesData = revenuesResponse.data

        setExpenses(expensesData)
        setRevenues(revenuesData)

        // compute(expensesData, revenuesData)
        } catch (error) {
        console.log(error)
        }
    }

    return (
        <div>MonthDetailsPage</div>
    )
}

export default MonthDetailsPage