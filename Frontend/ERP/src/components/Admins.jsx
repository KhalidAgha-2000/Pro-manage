import React, { useContext, useEffect, useState } from 'react'
import Buttons from './Shared/Buttons'
import { AiOutlineUserDelete, AiFillPushpin, AiFillEdit, AiOutlineInfoCircle } from "react-icons/ai";
import axiosInstance from '../constants/axios';
import { Context } from './Context/Context';
import { MdAdminPanelSettings } from 'react-icons/md';
import { BsPinFill } from 'react-icons/bs';
import { motion } from "framer-motion";
import Loading from './Shared/Loading';
import { Link } from 'react-router-dom';
import { GiCheckMark } from 'react-icons/gi';
import { TbLetterX } from 'react-icons/tb';
const Admins = () => {
    const { setNotificationBar, setNotificationBarMessage, setPass, setLoading } = useContext(Context)
    const [allAdminsData, setAllAdminsData] = useState([])
    const [prepareToRemove, setPrepareToRemove] = useState(null)

    const removeAdmin = async (id) => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.delete(`/admins/remove-admin/${id}`, {
                    headers: { token: localStorage.getItem('token') }
                })
            setNotificationBar(true)
            setPass(true)
            setNotificationBarMessage(response.data.message)
            setAllAdminsData(allAdminsData.filter((admin) => admin._id !== id))
        } catch (error) {
            if (error.response && error.response.data) {
                setNotificationBar(true)
                setPass(false)
                setNotificationBarMessage("Oops! Some thing wrong, try to reload")
            }
        }
        finally {
            setLoading(false);
            setInterval(() => {
                setNotificationBarMessage('')
                setPass(false)
                setNotificationBar(false)
            }, 9000);
        }
    }

    const getAllAdmins = async () => {
        try {
            setLoading(true)
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
            setLoading(false);
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
        <div className='w-full h-[75vh] flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            {
                allAdminsData
                    .sort((loggedIn) => {
                        if (loggedIn._id === localStorage.getItem('id')) {
                            return -1; // admin1 should come first
                        } else {
                            return 0; // keep the same order
                        }
                    })
                    .map((admin) => (

                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                            transition={{ duration: 0.5 }}
                            key={admin._id}
                            className={`relative w-[32%] h-[200px] 
                                   max-w-sm py-5 rounded-lg shadow-md font-montserrat shadow-orange bg-dark `
                            }
                        >
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
                            <div className='h-full w-4 absolute top-0 pr-4 right-3 flex flex-col items-start  justify-evenly  text-light'>
                                <Link to={"/dashboard/Admins/admin/" + admin._id}>
                                    <AiFillEdit className='hover:scale-150  transition duration-200 ease-in-out' size={20} color='#e04e17' cursor={'pointer'} />
                                </Link>
                                <AiOutlineUserDelete className={`hover:scale-150  transition duration-200 ease-in-out ${admin._id === localStorage.getItem('id') && "hidden"}`}
                                    size={20} color='#e04e17' cursor={'pointer'} onClick={() => { setPrepareToRemove(admin._id) }}
                                />
                            </div>
                            {/* Pinned */}
                            <AiFillPushpin size={20} color="#e04e17"
                                className={`absolute -rotate-90 top-1 left-1 ${admin._id !== localStorage.getItem('id') && "hidden"}`}
                            />
                            {/* Delete */}
                            <div className={`flex justify-around items-center w-full h-full absolute top-0 z-30 bg-light opacity-70  ${prepareToRemove === admin._id ? "flex" : "hidden"} `}>
                                <GiCheckMark size={40} cursor={'pointer'} color="#4bb543" onClick={() => { removeAdmin(admin._id) }} />
                                <TbLetterX size={40} cursor={'pointer'} color="#ff3333" onClick={() => { setPrepareToRemove('') }} />
                            </div>
                        </motion.div>
                    ))
            }
        </div>
    )
}

export default Admins