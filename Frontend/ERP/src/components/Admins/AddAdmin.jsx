import React, { useState, useContext } from 'react'
import { GiCancel } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../constants/axios'
import Input from './Input'
import Buttons from '../Shared/Buttons'
import { Context } from '../Context/Context';
import Cookies from 'js-cookie'

const AddAdmin = () => {

    const navigate = useNavigate()
    const { setNotifications, setLoading } = useContext(Context)
    const [adminToAdd, setAdminToAdd] = useState({
        email: '',
        username: '',
        password: '',
        image: '',
    })

    // Add Admin
    const handleChangeAddAdmin = (e) => {
        setAdminToAdd({ ...adminToAdd, [e.target.name]: e.target.value });
    }
    const handleFileChangeAddAdmin = (e) => {
        setAdminToAdd({ ...adminToAdd, image: e.target.files[0] });
    }
    const handleAddAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/admins/add-admin', {
                username: adminToAdd.username,
                email: adminToAdd.email,
                password: adminToAdd.password,
                image: adminToAdd.image,
            }, {
                headers: {
                    token: Cookies.get('token'),
                    "content-type": "multipart/form-data",
                }
            }
            )
            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
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
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 9000);
            setLoading(false)
        }
    }


    return (
        <div className='w-full flex flex-col justify-start p-3 gap-4 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            <header className='w-11/12 flex justify-between items-center mb-4'>
                {/* Back */}
                <GiCancel onClick={() => navigate(-1)}
                    cursor={'pointer'} size={30} color="#e04e17"
                />
                <span className="w-max h-max bg-orange text-light font-bold text-lg font-montserrat px-2.5 py-0.5 rounded-lg">
                    Add New Admin
                </span>
            </header>

            <form onSubmit={handleAddAdmin} className='flex flex-col gap-4'>
                <Input onChange={handleChangeAddAdmin}
                    name="username" defaultValue={adminToAdd.username}
                    placeholder='admin name'
                    type='text'
                />
                <Input onChange={handleChangeAddAdmin}
                    name="email" defaultValue={adminToAdd.email}
                    placeholder='email'
                    type='email'
                />
                <Input onChange={handleChangeAddAdmin}
                    name="password" defaultValue={adminToAdd.password}
                    placeholder='generate password'
                    type='password'
                />
                <Input onChange={handleFileChangeAddAdmin}
                    name="image" defaultValue={adminToAdd.image}
                    placeholder='image'
                    type='file'
                    className='pt-3 px-1'
                />
                <div className='w-11/12 items-center justify-end flex'>
                    <Buttons done text={"Done"} />
                </div>

            </form>
        </div >
    )
}

export default AddAdmin