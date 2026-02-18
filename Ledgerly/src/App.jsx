
import { Route, Routes } from 'react-router-dom'

import NavigationBar from './components/navigationBar'
import HomePage from './pages/HomePage'
import AccountsPage from './pages/AccountsPage'
import AboutPage from './pages/AboutPage'
import NotFound from './pages/NotFoundPage'
import MonthDetailsPage from './pages/MonthDetailsPage'

function App() {

  return (
    <>
      <NavigationBar/>
      <Routes className="min-vh-100">
          <Route path="/" element={<HomePage/>}></Route> 
          <Route path="/accounts" element={<AccountsPage/>}></Route>
          <Route path="/month-details/:yearMonth" element={<MonthDetailsPage/>}></Route>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </>
  )

}

export default App
