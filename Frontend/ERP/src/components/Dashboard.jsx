import { Outlet } from "react-router-dom";
import SideBar from "./Shared/SideBar";
import Header from "./Shared/Header";
import axios from "axios";
import Loading from './Shared/Loading'
import { useContext, useEffect, useState } from "react";
import { Context } from "./Context/Context";
import axiosInstance from '../constants/axios';
function Dashboard(props) {

    const { setNotificationBar, setNotificationBarMessage, setPass } = useContext(Context)
    const [dataSpecificAdmin, setDataSpecificAdmin] = useState([])

    const getSpecificAdminData = async () => {
        try {
            const response = await
                axiosInstance.get(`/admins/specific-admin/${props.idInToken}`, {
                    headers: { token: localStorage.getItem('token') }
                })
            setDataSpecificAdmin(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                setNotificationBar(true)
                setPass(false)
                setNotificationBarMessage("Oops! Some thing wrong, try to reload")
            }
        }
        finally {
            setInterval(() => {
                setNotificationBar(false)
                setPass(false)
                setNotificationBarMessage('')
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
