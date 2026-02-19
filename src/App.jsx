
import { Route, Routes } from 'react-router-dom'

import NavigationBar from './components/NavigationBar'
import HomePage from './pages/HomePage'
import AccountsPage from './pages/AccountsPage'
import AboutPage from './pages/AboutPage'
import NotFound from './pages/NotFoundPage'
import MonthDetailsPage from './pages/MonthDetailsPage'
import AccountTransactionsPage from './pages/AccountTransactions'
import Footer from './components/Footer'

function App() {

  return (
    <div className="d-flex flex-column vh-100">
      <NavigationBar className="flex-shrink-0" />
      <div className="flex-fill overflow-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/accounts/:accountId/transactions" element={<AccountTransactionsPage />} />
          <Route path="/month-details/:yearMonth" element={<MonthDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer className="flex-shrink-0" />
    </div>
  )

}

export default App
