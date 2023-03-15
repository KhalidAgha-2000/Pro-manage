import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Admins from './components/Admins'
import Login from './components/Login'
import Notification from './components/Shared/Notification'
import NotFound from './components/Shared/NotFound'
import Analysis from './components/Analysis'

function App() {
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
                <Route path="Analysis" element={<Analysis />} />
                <Route path="Admins" element={<Admins />} />
                {/* <Route path="*" element={<NotFound />} /> */}
              </Route>
              :
              <Route path="/login" element={<Login />} />
          }
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Router>

    </div>
  )
}

export default App
