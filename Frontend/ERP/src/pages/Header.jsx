import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { MdAdminPanelSettings } from 'react-icons/md';
import axiosInstance from '../utils/axios';
import Cookies from 'js-cookie';
import Circles from '../components/Shared/Circles';
import GlobalToast from '../components/Shared/Toast';
import Search from '../components/Shared/Search';

const Header = () => {
    const [dataSpecificAdmin, setDataSpecificAdmin] = useState([])

    let { id } = Cookies.get('id')

    // Data Of Loggedin Admin
    const getSpecificAdminData = async () => {
        try {
            const response = await
                axiosInstance.get(`/admins/specific-admin/${id}`,
                    { headers: { token: Cookies.get('token') } })
            setDataSpecificAdmin(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', "Oops! Some thing wrong, try to reload")
            }
        }
    }

    useEffect(() => {
        getSpecificAdminData()
    }, [])

    useEffect(() => { }, [id])


    return (
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
            className=' relative  rounded-b-lg font-montserrat w-full px-10 h-36 flex  justify-around items-center bg-light shadow-md shadow-[#dfd6d3] border-b-2'>

            <div className="w-1/2 h-max flex items-center ">
                {/* Profile Image */}
                <div className='w-1/5'>
                    <div className={`profile relative w-20 h-20 rounded-full my-2
                                  ${dataSpecificAdmin.image && "after:absolute after:bg-green-500 after:w-3 after:h-3  after:bottom-1 after:right-3 after:rounded-full after:animate-pulse"}`}>
                        {dataSpecificAdmin.image &&
                            <img src={dataSpecificAdmin.image} alt="admin-image" className="profile--image relative border-2 h-full w-full rounded-full object-cover object-center" />
                            || <MdAdminPanelSettings className='text-orange border-2 rounded-full w-full h-full' />
                        }
                    </div>
                </div>

                {/* Profile Data */}
                <div className="flex flex-col w-4/5 p-2 font-montserrat font-semibold  h-auto">
                    <span className='uppercase'>
                        {dataSpecificAdmin.username && dataSpecificAdmin.username || "..."}
                    </span>
                    <span className='whitespace-normal  break-words'>
                        {dataSpecificAdmin.email && dataSpecificAdmin.email || "..."}
                    </span>
                </div>

            </div>

            {/* Circles */}
            <Circles className1={'-right-4 top-2 w-14 h-14 bg-sidebar'} className2={'right-10 top-6 w-4 h-4 bg-sidebar'} className3={'right-10 top-10 w-2 h-2 bg-sidebar'} />

            {/* Search */}
            <Search />

        </motion.div >
    )
}

export default Header