import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineUserDelete, AiFillPushpin, AiFillEdit } from "react-icons/ai";
import axiosInstance from '../../constants/axios'
import { Context } from '../Context/Context';
import { MdAdd, MdAdminPanelSettings } from 'react-icons/md';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { GiCheckMark } from 'react-icons/gi';
import { TbLetterX } from 'react-icons/tb';
import Cookies from 'js-cookie';
import { IconButtons } from '../Shared/Buttons';

const Admins = (props) => {
    const { setNotifications, setLoading, search } = useContext(Context)
    const [allAdminsData, setAllAdminsData] = useState([])
    const [prepareToRemove, setPrepareToRemove] = useState(null)

    const removeAdmin = async (id) => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.delete(`/admins/remove-admin/${id}`, {
                    headers: { token: Cookies.get('token') }
                    // headers: { token: localStorage.getItem('token') }
                })
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            setAllAdminsData(allAdminsData.filter((admin) => admin._id !== id))
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
            setLoading(false);
            setInterval(() => {
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 9000);
        }
    }

    const getAllAdmins = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/admins/all-admins', {
                    headers: { token: Cookies.get('token') }
                    // headers: { token: localStorage.getItem('token') }
                })
            setAllAdminsData(response.data.data)
            // console.log(response.data.data);
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
            setLoading(false);
            setInterval(() => {
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 4000);
        }
    }

    // Search
    const filteredAdminsToSearch = allAdminsData.filter(val => {
        if (search === '') {
            return allAdminsData;
        } else if (val.username.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            return val;
        }
    });
    useEffect(() => {
        getAllAdmins()

    }, [search])
    return (
        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            {

                filteredAdminsToSearch.length === 0 ? (
                    <h1 className='w-max h-max m-auto p-3 my-8 rounded-md bg-orange text-lg font-montserrat text-light'>
                        No value match your search input
                    </h1>
                ) : (
                    filteredAdminsToSearch
                        .sort((loggedIn) => {
                            if (loggedIn._id === props.idInToken) {
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
                                className={`relative w-[32%] h-[200px] max-w-sm py-5 rounded-lg shadow-lg font-montserrat overflow-hidden shadow-orange bg-dark `
                                }
                            >
                                <div className="flex flex-col items-center">

                                    {
                                        admin.image &&
                                        <img
                                            src={admin.image} alt="admin-image"
                                            className="w-24 h-24 mb-3 object-cover object-center border-orange shadow-lg shadow-light rounded-full"
                                        /> ||
                                        <MdAdminPanelSettings className='text-orange w-24 h-24 ' />
                                    }

                                    <h5 className="mb-1 text-2xl font-bold  text-light">{admin.username}</h5>
                                    <span className="text-sm text-light">{admin.email}</span>
                                </div>
                                {/* Tools */}
                                <div className='h-full w-4 absolute top-0 pr-4 right-3 flex flex-col items-start  justify-evenly  text-light'>
                                    <Link to={"/dashboard/admins/admin/" + admin._id}>
                                        <AiFillEdit className='hover:scale-150  transition duration-200 ease-in-out' size={20} color='#f0f0f0' cursor={'pointer'} />
                                    </Link>
                                    <AiOutlineUserDelete className={`hover:scale-150  transition duration-200 ease-in-out ${admin._id === props.idInToken && "hidden"}`}
                                        size={20} color='#f0f0f0' cursor={'pointer'} onClick={() => { setPrepareToRemove(admin._id) }}
                                    />
                                </div>
                                {/* Pinned */}
                                <AiFillPushpin size={20} color="#f0f0f0"
                                    className={`absolute -rotate-90 top-1 left-1 ${admin._id !== props.idInToken && "hidden"}`}
                                />
                                {/* Delete */}
                                <div className={`flex justify-around items-center w-full h-full absolute top-0 z-30 bg-light opacity-70  ${prepareToRemove === admin._id ? "flex" : "hidden"} `}>
                                    <GiCheckMark size={40} cursor={'pointer'} color="#4bb543" onClick={() => { removeAdmin(admin._id) }} />
                                    <TbLetterX size={40} cursor={'pointer'} color="#ff3333" onClick={() => { setPrepareToRemove('') }} />
                                </div>

                                {/* ---- */}
                                <span className='absolute  right-2 -bottom-2 w-4 h-4 object-cover bg-[#dfd6d3] bg-opacity-95 rounded-full'></span>
                                <span className='absolute  right-2 bottom-4 w-1 h-1 object-cover bg-[#dfd6d3] bg-opacity-95 rounded-full'></span>

                            </motion.div>
                        ))
                )
            }
            {/* Add Button */}
            <Link className='fixed z-[9999] right-6 bottom-6' to={"/dashboard/admins/add-admin/"}>
                <IconButtons Icon={MdAdd} />
            </Link>

        </div>
    )
}

export default Admins