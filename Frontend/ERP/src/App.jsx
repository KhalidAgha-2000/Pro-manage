import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Admins from './components/Admins'
import Login from './components/Login'
import Notification from './components/Shared/Notification'
import NotFound from './components/Shared/NotFound'
import Analysis from './components/Analysis'
import Admin from './components/Admin'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import AddAdmin from './components/AddAdmin'

function App() {
  // const idInToken = localStorage.getItem('id')
  const idInToken = Cookies.get('id')

  return (
    <div className=''>

      <Notification />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/login" element={<Login />} />
          {
            Cookies.get('token') ? (
              <Route path="/dashboard" element={<Dashboard idInToken={idInToken} />}>
                <Route path="analysis" element={<Analysis />} />
                <Route path="admins" element={<Admins idInToken={idInToken} />} />
                <Route path="admins/admin/:id" element={<Admin idInToken={idInToken} />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                <Route path='add-admin' element={<AddAdmin />} />
              </Route>
            ) : (
              <Route path="/login" element={<Login />} />
            )
          }
          < Route path="*" element={<NotFound />} />
        </Routes>

      </Router>

    </div>
  )
}

export default App
