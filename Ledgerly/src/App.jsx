import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import NavigationBar from './components/navigationBar'
import HomePage from './pages/Home'
// import AccountsPage from './pages/AccountsPage'
// import AboutPage from './pages/AboutPage'
// import NotFound from './pages/NotFoundPage'

function App() {

  return (
    <>
      <NavigationBar/>

      <Routes>
           <Route path="/" element={<HomePage/>}></Route> 
          {/* <Route path="/accounts" element={<AccountsPage/>}></Route>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="*" element={<NotFound/>}></Route> */}
      </Routes>
    </>
  )
}

export default App
