import axios from "axios"

export const expensesAndRevenues = async () => {
    try {
      const [expensesResponse, revenuesResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_SERVER_URL}/expenses`),
        axios.get(`${import.meta.env.VITE_SERVER_URL}/revenues`)
      ])

      const expensesData = expensesResponse.data
      const revenuesData = revenuesResponse.data
      console.log(expensesData)
      console.log(revenuesData)
      return {expensesData, revenuesData}

      // compute(expensesData, revenuesData)
    } catch (error) {
      console.log(error)
    }
}