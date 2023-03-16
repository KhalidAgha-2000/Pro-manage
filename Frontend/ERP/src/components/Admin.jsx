import React, { useContext, useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GiCheckMark } from 'react-icons/gi';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../constants/axios';
import { Context } from './Context/Context';

const Admin = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({})
    const { setNotificationBar, setNotificationBarMessage, setPass, setLoading } = useContext(Context)


    useEffect(() => {
        specificAdmin()
    }, [])
    const specificAdmin = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/admins/specific-admin/${id}`, {
                    headers: { token: localStorage.getItem('token') }
                })
            setAdminData(response.data.data)
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

    return (
        <div className='ww-full h-[75vh] flex flex-col justify-start p-3 gap-4 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            {/* Back */}
            <IoMdArrowRoundBack
                onClick={() => navigate(-1)}
                cursor={'pointer'} size={40} color="#e04e17"
            />
            <h1>Admin Information</h1>

            <div className='flex items-center gap-x-1'>
                <input className='w-11/12 h-14 rounded-md p-2 my-1 flex justify-between items-center 
                    bg-light outline-none border-2 border-orange placeholder:text-dark text-dark'
                    defaultValue={adminData.username}
                />
                <GiCheckMark color='#4bb543' cursor={'pointer'} />
            </div>

            <div className='flex items-center gap-x-1'>
                <input className='w-11/12 h-14 rounded-md p-2 my-1 flex justify-between items-center 
            bg-light outline-none border-2 border-orange placeholder:text-dark text-dark'
                    defaultValue={adminData.email}
                />
                <GiCheckMark color='#4bb543' cursor={'pointer'} />
            </div>
            <div className='flex items-center gap-x-1'>

                <div className='flex justify-between items-center w-11/12 gap-x-1'>

                    <input className='w-1/2 h-14 rounded-md p-2  my-1 flex justify-between items-center 
                bg-light outline-none border-2 border-orange placeholder:text-dark text-dark'
                        placeholder='Old Password'
                    />
                    <input className='w-1/2 h-14 rounded-md p-2  my-1 flex justify-between items-center 
                bg-light outline-none border-2 border-orange placeholder:text-dark text-dark'
                        placeholder='New Password'
                    />

                </div>
                <GiCheckMark color='#4bb543' cursor={'pointer'} />
            </div>
        </div>
    )
}

export default Admin