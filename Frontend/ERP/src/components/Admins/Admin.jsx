import React, { useContext, useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../constants/axios'
import { Buttons } from '../Shared/Buttons'
import { Context } from '../Context/Context';
import Cookies from 'js-cookie';
import logout from '../../constants/logout';
import Input from './Input'
const Admin = () => {
    const { id } = useParams();
    const [adminData, setAdminData] = useState({})
    const { setNotifications, setLoading } = useContext(Context)
    const [adminEmail, setAdminEmail] = useState(adminData.email)
    const [adminUsername, setAdminUsername] = useState(adminData.username)
    const [adminNewPassword, setAdminNewPassword] = useState('')
    const [adminOldPassword, setAdminOldPassword] = useState('')
    const [image, setImage] = useState('');

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
            if (Cookies.get('id') === id) {
                setInterval(() => {
                    logout()
                }, 4000);
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
            if (Cookies.get('id') === id) {
                setInterval(() => {
                    logout()
                }, 4000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
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

    const handleImageUpload = (e) => {
        setImage(e.target.files[0])
        console.log('i', image)
    };
    const changeImage = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/admins/change-image/${id}`, {
                image: image
            }, {
                headers: {
                    token: Cookies.get('token'),
                    "content-type": "multipart/form-data",
                }
            })
            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            if (Cookies.get('id') === id) {
                setInterval(() => {
                    logout()
                }, 4000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
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


    return (
        <div className='w-full m-auto flex flex-col justify-start items-center p-3 gap-4 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            <header className='w-11/12 flex justify-between items-center mb-4'>
                {/* Back */}
                <Link to={"/dashboard/admins/"}>
                    <IoMdArrowRoundBack cursor={'pointer'} size={40} color="#e04e17" />
                </Link>
                <span className="w-max h-auto bg-orange text-light font-bold text-lg font-montserrat px-2.5 py-0.5 rounded-lg">
                    {Cookies.get('id') === id ? "Your" : "Admin"} Information
                </span>
            </header>
            {/* Email / Username */}
            <form className='w-11/12' onSubmit={updateAdminInformation}>
                <div className='w-full flex gap-4 items-center justify-between '>
                    <Input
                        className='w-1/2 '
                        type={'text'}
                        defaultValue={adminData.username}
                        onChange={(e) =>
                            setAdminUsername(e.target.value)
                        }
                    />
                    <Input
                        className='w-1/2'
                        type={'email'}
                        defaultValue={adminData.email}
                        onChange={(e) =>
                            setAdminEmail(e.target.value)
                        }
                    />
                </div>

                <div className='w-full my-2 flex items-center justify-end '>
                    {Cookies.get('id') === id ?
                        <span className='font-montserrat font-bold text-failed text-lg mx-1'>Logout Required</span>
                        : null}
                    <Buttons done text={"Done"} />

                </div>
            </form>
            {/* Change Password */}
            <form className='w-11/12' onSubmit={changePassword}>

                <div className='flex justify-between items-center w-full gap-4'>
                    <Input
                        className='w-1/2'
                        onChange={(e) =>
                            setAdminOldPassword(e.target.value)
                        }
                        type={'password'}
                        placeholder='Old Password'

                    />
                    <Input
                        className='w-1/2'
                        onChange={(e) =>
                            setAdminNewPassword(e.target.value)
                        }
                        type={'password'}
                        placeholder='New Password'

                    />

                </div>

                <div className='w-full my-2 flex items-center justify-end '>
                    {Cookies.get('id') === id ?
                        <span className='font-montserrat font-bold text-failed text-lg mx-1'>Logout Required</span>
                        : null}
                    <Buttons done text={"Done"} />
                </div>

            </form>
            {/* Change Image */}
            <form onSubmit={changeImage} className='my-3 w-11/12 flex justify-between items-center'>
                <Input
                    onChange={handleImageUpload}
                    name="image" defaultValue={image}
                    placeholder='image'
                    type='file'
                    className='pt-3 px-1 w-1/2'
                />
                <div cclassName='w-1/2 my-2 flex items-center justify-end '>
                    {Cookies.get('id') === id ?
                        <span className='font-montserrat font-bold text-failed text-lg mx-1'>Logout Required</span>
                        : null}
                    <Buttons done text={"Done"} />
                </div>
            </form>

        </div >
    )
}

export default Admin