import React, { useContext, useEffect, useState } from 'react'
import Buttons from './Shared/Buttons'
import { AiOutlineUserDelete, AiFillEdit, AiOutlineInfoCircle } from "react-icons/ai";
import axiosInstance from '../constants/axios';
import { Context } from './Context/Context';
import { MdAdminPanelSettings } from 'react-icons/md';
import { motion } from "framer-motion";
const Admins = () => {
    const { setNotificationBar, setNotificationBarMessage, setPass } = useContext(Context)
    const [allAdminsData, setAllAdminsData] = useState([])
    const adminID = localStorage.getItem('id')

    const getAllAdmins = async () => {
        try {
            const response = await
                axiosInstance.get('/admins/all-admins', {
                    headers: { token: localStorage.getItem('token') }
                })
            setAllAdminsData(response.data.data)
            console.log(response.data.data);
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
        getAllAdmins()
    }, [])
    return (
        <div className='w-full h-[75vh] flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark '>

            {
                allAdminsData.map((admin) => (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                        transition={{ duration: 0.5 }}
                        key={admin._id}
                        className="relative w-[32%] h-[200px] 
                                   max-w-sm py-5 rounded-lg shadow-md font-montserrat shadow-orange bg-dark ">
                        <div className="flex flex-col items-center ">

                            {
                                admin.image &&
                                <img
                                    src={admin.image} alt="admin-image"
                                    className="w-24 h-24 mb-3 object-center aspect-square border-4 border-orange shadow-lg shadow-light rounded-full"
                                /> ||
                                <MdAdminPanelSettings className='text-orange w-24 h-24 ' />
                            }

                            <h5 className="mb-1 text-2xl font-bold  text-light">{admin.username}</h5>
                            <span className="text-sm text-light">{admin.email}</span>
                        </div>
                        {/* Tools */}
                        <div className='h-full w-4 absolute top-0 pr-4 right-2 flex flex-col items-start  justify-evenly  text-light'>
                            <AiFillEdit className='hover:scale-150  transition duration-200 ease-in-out' size={20} color='#e04e17' cursor={'pointer'} />
                            <AiOutlineUserDelete className='hover:scale-150  transition duration-200 ease-in-out' size={20} color='#e04e17' cursor={'pointer'} />
                            <AiOutlineInfoCircle className='hover:scale-150  transition duration-200 ease-in-out' size={20} color='#e04e17' cursor={'pointer'} />
                        </div>
                    </motion.div>
                ))}

        </div>
    )
}

export default Admins