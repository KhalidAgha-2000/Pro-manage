import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Notification from './components/Shared/Notification'
import NotFound from './components/Shared/NotFound'
import Analysis from './components/Analysis'
import Cookies from 'js-cookie'
import Admins from './components/Admins/Admins'
import Admin from './components/Admins/Admin'
import AddAdmin from './components/Admins/AddAdmin'
import Employees from './components/Employees/Employees'
import Addemployee from './components/Employees/Addemployee'

function App() {

  const idInToken = Cookies.get('id')

  return (
    <div className='bg-light'>

      <Notification />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/login" element={<Login />} />
          {
            Cookies.get('token') ? (
              <Route path="/dashboard" element={<Dashboard idInToken={idInToken} />}>
                {/* ANALYSIS */}
                <Route path="analysis" element={<Analysis />} />

                {/* ADMINS */}
                <Route path="admins" element={<Admins idInToken={idInToken} />} />
                <Route path='admins/add-admin' element={<AddAdmin />} />
                <Route path="admins/admin/:id" element={<Admin idInToken={idInToken} />} />

                {/* EMPLOYEES */}
                <Route path="employees" element={<Employees />} />
                <Route path="employees/add-employee" element={<Addemployee />} />

                {/* <Route path="*" element={<NotFound />} /> */}
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
