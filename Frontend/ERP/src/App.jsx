import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Analysis from './components/Analysis/Analysis'
import Cookies from 'js-cookie'
import Admins from './components/Admins/Admins'
import Employees from './components/Employees/Employees'
import Teams from './components/Teams/Teams'
import Team from './components/Teams/Team'
import AddTeam from './components/Teams/AddTeam'
import Projects from './components/Projects/Projects'
import Project from './components/Projects/Project'
import Kpis from './components/KPIS/Kpis'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Roles from './components/Roles/Roles'

function App() {

  return (
    <div className='bg-light'>

      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/login" element={<Login />} />
          {Cookies.get('token') !== null || '' ?
            <Route path="/dashboard" element={<Dashboard />}>
              {/* ANALYSIS */}
              <Route path="analysis" element={<Analysis />} />

              {/* ADMINS */}
              <Route path="admins" element={<Admins />} />

              {/* EMPLOYEES */}
              <Route path="employees" element={<Employees />} />

              {/* TEAMS */}
              <Route path="teams" element={<Teams />} />
              <Route path="teams/add-team" element={<AddTeam />} />
              <Route path="teams/team/:id" element={<Team />} />

              {/* PROJECTS */}
              <Route path="projects" element={<Projects />} />
              <Route path="projects/project/:id" element={<Project />} />

              {/* KPIS */}
              <Route path="kpis" element={<Kpis />} />

              {/* ROLES  */}
              <Route path="roles" element={<Roles />} />

              {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
            :
            <Route path="/login" element={<Login />} />

          }
          < Route path="*" element={<NotFound />} />
        </Routes>

      </Router>

    </div>
  )
}

export default App
