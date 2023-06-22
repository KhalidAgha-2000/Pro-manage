import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Loading from "../components/Shared/Loading";
import GlobalToast from "../components/Shared/Toast";
import Cookies from "js-cookie";

function Dashboard() {

  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
      location.reload()
      GlobalToast('warn', 'Your session has expired')
    }, 3540000);
  }, [])

  useEffect(() => {
    if (!token) {
      GlobalToast('warn', "Your session has expired !")
      navigate('/login')
    }
  }, [token, navigate]);

  return (
    <div className='dashboard flex w-full h-[100vh] overflow-hidden'>
      <SideBar />
      <div className='dashboard-body w-4/5'>
        <Header />
        <Loading />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard



