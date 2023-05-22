import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Loading from "../components/Shared/Loading";

function Dashboard() {

    const navigate = useNavigate();
    const token = Cookies.get('token');

    useEffect(() => {
        if (!token) {
            GlobalToast('warn', "Your session has expired !")
            navigate('/login')
        }
    }, [token, navigate]);

    return (
        <div className='dashboard flex w-full h-[100vh] overflow-hidden '>
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
