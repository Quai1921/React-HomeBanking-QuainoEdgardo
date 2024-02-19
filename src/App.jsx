import { useState } from 'react'
import MainLayout from './layouts/MainLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accounts from './pages/Accounts'
import Cards from './pages/Cards'
import Loans from './pages/Loans'
import AccountDetail from './pages/AccountDetail'
import Transactions from './pages/Transactions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          <Route path="/" element={<Accounts />}/>
          <Route path="/accounts" element={<Accounts />}/>
          <Route path="/cards" element={<Cards />}/>
          <Route path="/loans" element={<Loans />}/>
          <Route path='/accounts/:id' element={<AccountDetail/>}/>
          <Route path='/transactions' element={<Transactions/>}/>
          
        </Routes>
          
          
      </MainLayout>
    </BrowserRouter>
        

  )

}

export default App
