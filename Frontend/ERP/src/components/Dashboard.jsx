import { Outlet } from "react-router-dom";
import SideBar from "./Shared/SideBar";
import Header from "./Shared/Header";
import Loading from './Shared/Loading'
import { Context } from "./Context/Context";
import axiosInstance from '../constants/axios';
import Cookies from "js-cookie";
function Dashboard() {


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
