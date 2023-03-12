import { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Context } from './components/Context/Context'
import Dashboard from './components/Dashboard'
import Admins from './components/Admins'
import Login from './components/Login'
import Notification from './components/Shared/Notification'

function App() {
  const { notificationBar, setNotificationBar, notificationBarMessage, setNotificationBarMessage } = useContext(Context)
  return (


    <div className=''  >

      <Notification />

      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/login" element={<Login />} />
          {
            localStorage.getItem('token') !== null || '' ?
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="Admins" element={<Admins />} />
              </Route>
              :
              <Route path="*" element={<Login />} />
          }
        </Routes>
      </Router>

    </div>
  )
}

export default App
