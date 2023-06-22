import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Context } from '../../Context/Context';
import Cookies from 'js-cookie';
import logout from '../../utils/logout';
import { AiFillCloseCircle } from 'react-icons/ai';
import Circles from '../Shared/Circles';
import GlobalToast from '../Shared/Toast';
import { Image, Info, Password } from './FormsToUpdate';

const Admin = ({ setAllAdminsData }) => {

    const { setLoading, idToEdit, setOpenFormToAddEdit } = useContext(Context)

    const [adminData, setAdminData] = useState({})
    const [adminEmail, setAdminEmail] = useState(adminData.email)
    const [adminUsername, setAdminUsername] = useState(adminData.username)
    const [adminNewPassword, setAdminNewPassword] = useState('')
    const [adminOldPassword, setAdminOldPassword] = useState('')
    const [image, setImage] = useState('');

    const [tabsToEdit, setTabsToEdit] = useState('info')
    const formComponents = { info: Info, password: Password, image: Image };
    const FormComponent = formComponents[tabsToEdit] || null;

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

        <div>
            {/* Circles */}
            <Circles className1={"-left-2 top-0 w-6 h-6 bg-orange"} className2={"left-6 top-2 w-4 h-4 bg-sidebar"} className3={"left-4 top-6 w-1 h-1 bg-orange"} />
            {/* Close */}
            <AiFillCloseCircle onClick={() => setOpenFormToAddEdit({ openedToEdit: false, })} className='absolute top-2 right-2' cursor='pointer' size={25} color='#e04e17' />
            {/* Title */}
            <h1 className='font-alkatra text-orange font-semibold w-full p-2 my-1 text-center text-xl'>
                Update {Cookies.get('id') === idToEdit ? "Your" : "Admin"} Profile<br />
                {Cookies.get('id') === idToEdit && <p className='text-failed'>Logout Required</p>}
            </h1>

            {/* Nav Tabs */}
            <div className='w-10/12 m-auto h-fit p-2  flex justify-between items-center gap-x-2'>
                {['info', 'password', 'image'].map((key, index) => (
                    <span key={index} onClick={() => setTabsToEdit(key)}
                        className={`${tabsToEdit === key ? 'opacity-40' : ''} w-1/2 rounded-lg transition duration-700 ease-in-out hover:opacity-40 bg-sidebar h-fit p-2 text-center cursor-pointer font-alkatra text-xl`}
                    >{key}
                    </span>
                ))}
            </div>

            {/* Forms */}
            <div className='w-full flex h-full'>
                {FormComponent && <FormComponent
                    // Info
                    adminData={adminData}
                    updateAdminInformation={updateAdminInformation} setAdminUsername={setAdminUsername} setAdminEmail={setAdminEmail}
                    // Password
                    changePassword={changePassword} setAdminOldPassword={setAdminOldPassword} setAdminNewPassword={setAdminNewPassword}
                    // Image
                    image={image} changeImage={changeImage} handleImageUpload={handleImageUpload}
                />}
            </div>
        </div>
    )
}
export default Admin

