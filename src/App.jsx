
import { Route, Routes } from 'react-router-dom'

import NavigationBar from './components/NavigationBar'
import HomePage from './pages/HomePage'
import AccountsPage from './pages/AccountsPage'
import AboutPage from './pages/AboutPage'
import MonthDetailsPage from './pages/MonthDetailsPage'
import AccountTransactionsPage from './pages/AccountTransactions'
import Footer from './components/Footer'
import { useContext } from 'react'
import { ThemeContext } from './context/theme.context'

function App() {

  const { theme } = useContext(ThemeContext)
  console.log("here", theme)

  return (
    <div className={`d-flex flex-column vh-100 ${theme}`}>
      {/**
       * flex-shrink-0 for navbar and footer to keep it fixed and inner div get flex-fill to fill the 
       * remaining space and overflow-auto, so that it does not go after footer and it becomes scrollable.
       */}
      <NavigationBar className="flex-shrink-0" />
      <div className="flex-fill overflow-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/accounts/:accountId/transactions" element={<AccountTransactionsPage />} />
          <Route path="/month-details/:yearMonth" element={<MonthDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer className="flex-shrink-0" />
    </div>
  )
}

export default App
