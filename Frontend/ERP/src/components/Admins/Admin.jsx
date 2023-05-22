import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Buttons } from '../Shared/Buttons'
import { Context } from '../../Context/Context';
import Cookies from 'js-cookie';
import logout from '../../utils/logout';
import { AiFillCloseCircle } from 'react-icons/ai';
import Circles from '../Shared/Circles';
import Inputs from '../Shared/Inputs';
import { AdminContext } from '../../Context/AdminContext';
import { MdAdminPanelSettings } from 'react-icons/md';
import GlobalToast from '../Shared/Toast';

const Admin = ({ setAllAdminsData }) => {

    const { setIsOpenToEdit, idToEdit } = useContext(AdminContext);

    // const { id } = idToEdit
    const [adminData, setAdminData] = useState({})
    const { setLoading } = useContext(Context)
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
                axiosInstance.get(`/admins/specific-admin/${idToEdit}`, {
                    headers: { token: Cookies.get('token') }
                })
            setAdminData(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }

    // Update email / username 
    const updateAdminInformation = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/admins/update-info/${idToEdit}`, { email: adminEmail, username: adminUsername }, {
                headers: { token: Cookies.get('token') }
            });
            setLoading(true)
            GlobalToast('success', response.data.message)
            setAdminData(response.data.data)
            if (Cookies.get('id') === idToEdit) {
                setInterval(() => {
                    logout()
                }, 4000);
            }
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
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    // change Password
    const changePassword = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/admins/change-password/${idToEdit}`, { newPassword: adminNewPassword, oldPassword: adminOldPassword }, {
                headers: { token: Cookies.get('token') }
            });
            setLoading(true)
            GlobalToast('success', response.data.message)
            setAdminData(response.data.data)
            if (Cookies.get('id') === idToEdit) {
                setInterval(() => {
                    logout()
                }, 4000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    // Change Image

    const handleImageUpload = (e) => {
        setImage(e.target.files[0])
    }
    const changeImage = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/admins/change-image/${idToEdit}`, { image: image }, {
                headers: { token: Cookies.get('token'), "content-type": "multipart/form-data", }
            })
            setLoading(true)
            GlobalToast('success', response.data.message)
            if (Cookies.get('id') === idToEdit) {
                setInterval(() => {
                    logout()
                }, 4000);
            }
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
                GlobalToast('warn', response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    return (

        <div className='w-3/4 h-3/5 py-4 mt-24 m-auto flex flex-col items-center bg-light relative overflow-hidden'>

            {/* Header */}
            <AiFillCloseCircle onClick={() => setIsOpenToEdit(false)}
                className='absolute top-2 right-2' cursor='pointer' size={25} color='#e04e17'
            />
            <h1 className='font-alkatra text-orange font-semibold w-full p-2 my-1 text-center text-xl'>
                Update {Cookies.get('id') === idToEdit ? "Your" : "Admin"} Profile<br />
                {Cookies.get('id') === idToEdit && <p className='text-failed'>Logout Required</p>}
            </h1>

            <div className='w-full flex h-full'>

                {/* Email / Username */}
                <form onSubmit={updateAdminInformation}
                    className='w-1/3 m-auto h-full flex flex-col items-center gap-y-8 mt-10'>
                    <Inputs className={'w-11/12'} type={'text'} placeholder='username'
                        defaultValue={adminData.username} onChange={(e) => setAdminUsername(e.target.value)}
                    />
                    <Inputs className={'w-11/12'} type={'email'} placeholder='email'
                        defaultValue={adminData.email} onChange={(e) => setAdminEmail(e.target.value)}
                    />
                    <Buttons done text={"Done"} className={'w-10/12'} />
                </form>
                {/* Change Password */}
                <form onSubmit={changePassword}
                    className='w-1/3 m-auto h-full flex flex-col items-center gap-y-8 mt-10'>
                    <Inputs className={'w-11/12'} type={'password'} placeholder='Old Password'
                        onChange={(e) => setAdminOldPassword(e.target.value)}
                    />
                    <Inputs className={'w-11/12'} type={'password'} placeholder='New Password'
                        onChange={(e) => setAdminNewPassword(e.target.value)}
                    />
                    <Buttons done text={"Done"} className={'w-10/12'} />
                </form>

                {/* Change Image */}
                <form onSubmit={changeImage}
                    className='w-1/3 m-auto h-full flex flex-col items-center gap-y-2 mt-3'>
                    {adminData.image && <img src={adminData.image} alt="admin-image"
                        className="w-24 h-24 mb-3 object-cover object-center border-orange shadow-lg shadow-light rounded-full"
                    /> || <MdAdminPanelSettings className='text-orange w-24 h-24 ' />}

                    <Inputs className={'w-11/12 pt-3 px-1 mt-1'} name="image" defaultValue={image}
                        placeholder='image' type='file' onChange={handleImageUpload}
                    />
                    <Buttons done text={"Upload"} className={'w-10/12 mt-5'} />
                </form>
            </div>

            {/* Circles */}
            <Circles className1={"-left-2 top-0 w-6 h-6 bg-orange"} className2={"left-6 top-2 w-4 h-4 bg-sidebar"} className3={"left-4 top-6 w-1 h-1 bg-orange"} />
        </div>


    )
}

export default Admin
