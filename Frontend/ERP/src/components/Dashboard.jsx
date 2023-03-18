import { Outlet } from "react-router-dom";
import SideBar from "./Shared/SideBar";
import Header from "./Shared/Header";
import Loading from './Shared/Loading'
import { useContext, useEffect, useState } from "react";
import { Context } from "./Context/Context";
import axiosInstance from '../constants/axios';
import Cookies from "js-cookie";
function Dashboard(props) {

    const { setNotifications } = useContext(Context)
    const [dataSpecificAdmin, setDataSpecificAdmin] = useState([])

    const getSpecificAdminData = async () => {
        try {
            const response = await
                axiosInstance.get(`/admins/specific-admin/${props.idInToken}`, {
                    // headers: { token: localStorage.getItem('token') }
                    headers: { token: Cookies.get('token') }
                })
            setDataSpecificAdmin(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: "Oops! Some thing wrong, try to reload"
                })
            }
        }
        finally {
            setInterval(() => {
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 4000);
        }
    }
    useEffect(() => {
        getSpecificAdminData()
    }, [])
    return (
        <div className='dashboard flex w-full h-[100vh] overflow-hidden '>
            <SideBar dataSpecificAdmin={dataSpecificAdmin} />
            <div className='dashboard-body w-3/4'>
                <Header dataSpecificAdmin={dataSpecificAdmin} />
                <Loading />
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
