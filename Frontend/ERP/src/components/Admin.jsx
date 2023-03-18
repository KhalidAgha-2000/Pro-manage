import React, { useContext, useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GiCheckMark } from 'react-icons/gi';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../constants/axios';
import { Context } from './Context/Context';
import Buttons from './Shared/Buttons';
import Cookies from 'js-cookie';
import logout from '../constants/logout';

const Admin = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({})
    const { setNotifications, setLoading } = useContext(Context)
    const [adminEmail, SetAdminEmail] = useState(adminData.email)
    const [adminUsername, setAdminUsername] = useState(adminData.username)
    const [adminNewPassword, setAdminNewPassword] = useState('')
    const [adminOldPassword, setAdminOldPassword] = useState('')
    const [image, setImage] = useState(null);

    useEffect(() => {
        specificAdmin()
    }, [])

    // Data of the admin
    const specificAdmin = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get(`/admins/specific-admin/${id}`, {
                    headers: { token: Cookies.get('token') }
                    // headers: { token: localStorage.getItem('token') }
                })
            setAdminData(response.data.data)
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

    // Update email / username 
    const updateAdminInformation = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/admins/update-info/${id}`, { email: adminEmail, username: adminUsername }, {
                headers: { token: Cookies.get('token') }
            });
            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            setAdminData(response.data.data)
            if (props.idInToken === id) {
                logout()
            }
            // console.log(response.data.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
                // console.log(error.response.data.message);
            }
        } finally {
            setInterval(() => {
                setLoading(false)
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 9000);
        }
    }

    // change Password
    const changePassword = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/admins/change-password/${id}`, { newPassword: adminNewPassword, oldPassword: adminOldPassword }, {
                headers: { token: Cookies.get('token') }
            });
            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            setAdminData(response.data.data)
            if (props.idInToken === id) {
                logout()
            }
            // console.log(response.data.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
                // console.log(error.response.data.message);
            }
        } finally {
            setInterval(() => {
                setLoading(false)
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 9000);
        }
    }

    // Change Image
    const handleFileChange = (event) => {
        setImage(event.target.files[0])
        console.log(image);
    };
    const changeImage = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append('image', image);
            const response = await axiosInstance.put(`/admins/change-image/${id}`, { image: formData }, {
                headers: { token: Cookies.get('token') }
            })
            // setLoading(true)
            // setNotificationBar(true)
            // setPass(true)
            // setNotificationBarMessage(response.data.message)
            // setAdminData(response.data.data)
            // if (props.idInToken === id) {
            //     logout()
            // }
            console.log(response);
        } catch (error) {
            if (error.response && error.response.data) {
                // setNotificationBar(true)
                // setPass(false)
                // setNotificationBarMessage(error.response.data.message)
                console.log(error.response.data.message);
            }
        } finally {
            setInterval(() => {
                // setLoading(false)
                // setNotificationBar(false)
                // setPass(false)
                // setNotificationBarMessage('')
            }, 4000);
        }

    }


    return (
        <div className='ww-full h-[75vh] flex flex-col justify-start p-3 gap-4 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            <div className='w-11/12 flex justify-between items-center mb-4'>
                {/* Back */}
                <IoMdArrowRoundBack
                    onClick={() => navigate(-1)}
                    cursor={'pointer'} size={40} color="#e04e17"
                />
                <span className="w-max h-auto bg-orange text-light font-bold text-lg font-montserrat px-2.5 py-0.5 rounded-lg">
                    {props.idInToken === id ? "Your" : "Admin"} Information
                </span>
            </div>
            {/* Email / Username */}
            <form onSubmit={updateAdminInformation}>
                <input className='w-11/12 h-14 rounded-md px-6 my-1  
                    bg-light outline-none border-2 font-montserrat font-semibold border-orange placeholder:text-dark text-dark'
                    defaultValue={adminData.username}
                    // placeholder={adminData.username}
                    required
                    onChange={(e) =>
                        setAdminUsername(e.target.value)
                    }
                />

                <input className='w-11/12 h-14 rounded-md px-6 my-1  
                    bg-light outline-none border-2 font-montserrat font-semibold border-orange placeholder:text-dark text-dark'
                    defaultValue={adminData.email}
                    // placeholder={adminData.email}
                    required
                    type={'email'}
                    onChange={(e) =>
                        SetAdminEmail(e.target.value)
                    }
                />

                <div className='w-11/12 items-center justify-end flex'>
                    {props.idInToken === id ?
                        <span className='font-montserrat font-bold text-failed text-lg mx-1'>Logout Required</span>
                        : null}
                    <Buttons done text={"Done"} />

                </div>
            </form>

            {/* Change Password */}
            <form onSubmit={changePassword}>

                <div className='flex items-center gap-x-1'>
                    <div className='flex justify-between items-center w-11/12 gap-x-1'>
                        <input required type={'password'} className='w-1/2 h-14 rounded-md p-2  my-1 flex justify-between items-center 
                            bg-light outline-none border-2 border-orange placeholder:text-dark text-dark'
                            placeholder='Old Password'
                            onChange={(e) =>
                                setAdminOldPassword(e.target.value)
                            }
                        />
                        <input required type={'password'} className='w-1/2 h-14 rounded-md p-2  my-1 flex justify-between items-center 
                            bg-light outline-none border-2 border-orange placeholder:text-dark text-dark'
                            placeholder='New Password'
                            onChange={(e) =>
                                setAdminNewPassword(e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className='w-11/12 items-center justify-end flex'>
                    {props.idInToken === id ?
                        <span className='font-montserrat font-bold text-failed text-lg mx-1'>Logout Required</span>
                        : null}
                    <Buttons done text={"Done"} />
                </div>

            </form>
            {/* Change Image */}
            <form onSubmit={changeImage} className='my-3 w-11/12 flex justify-between'>
                <input onChange={handleFileChange} accept="image/*" type="file" required placeholder='admin-image' />
                <div>
                    {props.idInToken === id ?
                        <span className='font-montserrat font-bold text-failed text-lg mx-1'>Logout Required</span>
                        : null}
                    <Buttons done text={"Done"} />
                </div>
            </form>
        </div >
    )
}

export default Admin