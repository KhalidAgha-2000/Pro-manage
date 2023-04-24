import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../constants/axios'
import { Buttons } from '../Shared/Buttons'
import { Context } from '../Context/Context';
import Cookies from 'js-cookie';
import logout from '../../constants/logout';
import Input from './Input'
import { AiFillCloseCircle } from 'react-icons/ai';

const Admin = ({ isOpenToEdit, setIsOpenToEdit, setAllAdminsData }) => {

    const { id } = isOpenToEdit
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
            setTimeout(() => {
                setIsOpenToEdit(isOpenToEdit => ({ ...isOpenToEdit, opened: false }))
            }, 2000)
            // Get The Updated Admin Data
            setAllAdminsData(prevAdminsData => {
                const updatedAdminsData = prevAdminsData.map(admin => {
                    if (admin._id === response.data.data._id) {
                        return response.data.data;
                    }
                    return admin;
                });
                return updatedAdminsData;
            })

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
            setTimeout(() => {
                setIsOpenToEdit(isOpenToEdit => ({ ...isOpenToEdit, opened: false }))
            }, 2000);
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
    }
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
            setTimeout(() => {
                setIsOpenToEdit(isOpenToEdit => ({ ...isOpenToEdit, opened: false }))
            }, 2000)
            // Get The Updated Admin Data
            setAllAdminsData(prevAdminsData => {
                const updatedAdminsData = prevAdminsData.map(admin => {
                    if (admin._id === response.data.id) {
                        return { ...admin, image: response.data.data.image };
                    }
                    return admin;
                });
                return updatedAdminsData;
            })
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

        <div
            className='w-1/2 h-2/3 mt-24 max-h-fit m-auto bg-light relative overflow-hidden'>
            {/* Header */}

            {/* ---- */}
            <span className='absolute -left-2 bottom-0 w-6 h-6 object-cover bg-orange bg-opacity-95 rounded-full' />
            <span className='absolute left-6 bottom-2 w-4 h-4 object-cover bg-sidebar  rounded-full' />
            <span className='absolute left-4 bottom-6 w-1 h-1 object-cover bg-orange bg-opacity-95 rounded-full' />

            <AiFillCloseCircle
                onClick={() => setIsOpenToEdit(isOpenToEdit => ({ ...isOpenToEdit, opened: false }))}
                className='absolute top-2 right-2' cursor='pointer' size={25} color='#e04e17'
            />
            <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>
                Update {Cookies.get('id') === id ? "Your" : "Admin"} Information
                <br />
                {Cookies.get('id') === id &&
                    <p>Logout Required</p>}
            </h1>

            {/* Email / Username */}
            <form
                onSubmit={updateAdminInformation}
                className='w-[90%] m-auto my-14 h-fit flex items-center justify-evenly gap-x-4 mt-4 '
            >
                <Input
                    type={'text'} placeholder='username'
                    defaultValue={adminData.username}
                    onChange={(e) =>
                        setAdminUsername(e.target.value)
                    }
                />
                <Input
                    type={'email'} placeholder='email'
                    defaultValue={adminData.email}
                    onChange={(e) =>
                        setAdminEmail(e.target.value)
                    }
                />
                <Buttons done text={"Done"} />
            </form>
            {/* Change Password */}
            <form
                onSubmit={changePassword}
                className='w-[90%] m-auto my-14 h-fit flex items-center justify-evenly gap-x-4 mt-4 '
            >
                <Input
                    onChange={(e) =>
                        setAdminOldPassword(e.target.value)
                    }
                    type={'password'}
                    placeholder='Old Password'
                />
                <Input

                    onChange={(e) =>
                        setAdminNewPassword(e.target.value)
                    }
                    type={'password'}
                    placeholder='New Password'
                />
                <Buttons done text={"Done"} />
            </form>

            {/* Change Image */}
            <form
                onSubmit={changeImage}
                className='w-[90%] m-auto my-14 h-fit flex items-center justify-evenly gap-x-4 mt-4 '
            >
                <Input
                    onChange={handleImageUpload}
                    name="image" defaultValue={image}
                    placeholder='image'
                    type='file'
                    className='pt-3 px-1 '
                />
                <Buttons done text={"Done"} />
            </form>
        </div>


    )
}

export default Admin
