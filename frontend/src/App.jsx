import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ConnectToMetaMask } from './components/LoginPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingPage from './components/LoadingPage'
import { AuthProvider } from './context/AuthContext'
import HomePage from './components/HomePage'
import SendMoney from './components/SendMoney'
import DB from './components/Database'
import CreateUserPage from './components/CreateUser'
import AddPage from './components/AddPage'
import QuickPay from './assets/quickPay/content'
import SendArray from './temp'
import RetrieveRecords from './assets/RetreivedContent'
function App() {
  const [count, setCount] = useState(0)

  return (
  <AuthProvider>
     <Router>
      <Routes>
        <Route path="/" element={<ConnectToMetaMask />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/send" element={<SendMoney/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/db" element={<RetrieveRecords />} />
        <Route path="/create" element={<CreateUserPage />} />
        <Route path="/add" element={<AddPage/>} />
        <Route path="/quick" element={<QuickPay/>} />
        <Route path="/tempquick" element={<SendArray/>} />

        {/* <Route path="/createUser" element={<CreateUserPage />} /> */}
      </Routes>
    </Router>
    </AuthProvider>

  )
}


export default App
