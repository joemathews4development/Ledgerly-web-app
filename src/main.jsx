import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { DataWrapper } from './context/expenserevenue.context'
import { ThemeWrapper } from './context/theme.context.jsx';

createRoot(document.getElementById('root')).render(
  <DataWrapper>
    <ThemeWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeWrapper>
  </DataWrapper>
)
