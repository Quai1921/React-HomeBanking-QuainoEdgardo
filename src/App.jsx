import { useState, useEffect } from 'react'
import MainLayout from './layouts/MainLayout'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Accounts from './pages/Accounts'
import Cards from './pages/Cards'
import Loans from './pages/Loans'
import AccountDetail from './pages/AccountDetail'
import Transactions from './pages/Transactions'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'
import AvailableLoans from './pages/AvailableLoans'
import { withAuth } from './hocs/whitAuth'
import { useDispatch, useSelector } from 'react-redux'
import  authActions from './redux/actions/auth.actions.js'
import axios from 'axios'



function App() {

  const AccountsWithAuth = withAuth(Accounts)
  const CardsWithAuth = withAuth(Cards)
  const LoansWithAuth = withAuth(Loans)
  const AccountDetailWithAuth = withAuth(AccountDetail)
  const TransactionsWithAuth = withAuth(Transactions)


  const user = useSelector(store => store.authReducer.user)

  const dispatch = useDispatch()

  const { current, login } = authActions

  useEffect(() => {

      const token = localStorage.getItem("token")

      if (!user.loggedIn && !!token) {
          axios.get('/api/clients/current', {
              headers: {
                  Authorization: "Bearer " + token
              }
          })
              .then(response => {
                  dispatch(current(response.data))
                  dispatch(login(token))
              })
              .catch(error => console.log(error.response.data))
      }
  }, [])

  


  return (

    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SingUp />} />
          <Route path="/login" element={<SingIn />} />
          <Route path="/avaiableLoans" element={<AvailableLoans />} />


          <Route
            path="/*"
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }>

            <Route path="accounts" element={<AccountsWithAuth />} />
            <Route path="cards" element={<CardsWithAuth />} />
            <Route path="loans" element={<LoansWithAuth />} />
            <Route path="accounts/:id" element={<AccountDetailWithAuth />} />
            <Route path="transactions" element={<TransactionsWithAuth />} />

          </Route>
        </Routes>
    </BrowserRouter>

  )

}

export default App



    // <BrowserRouter>
      
    //   <MainLayout>
    //     <Routes>

    //       <Route path="/" element={<Home />}/>
    //       <Route path="/accounts" element={<Accounts />}/>
    //       <Route path="/cards" element={<Cards />}/>
    //       <Route path="/loans" element={<Loans />}/>
    //       <Route path='/accounts/:id' element={<AccountDetail/>}/>
    //       <Route path='/transactions' element={<Transactions/>}/>
          
    //     </Routes>
          
    //   </MainLayout>
    // </BrowserRouter>
