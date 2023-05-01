import React, { useState, useContext } from 'react'
import axiosInstance from '../../constants/axios'
import Input from './Input'
import { Buttons } from '../Shared/Buttons'
import { Context } from '../Context/Context';
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from "framer-motion";

const AddAdmin = ({ isOpenToAdd, setIsOpenToAdd, setAllAdminsData, allAdminsData }) => {

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
            setAllAdminsData([...allAdminsData, response.data.admin]);
            setTimeout(() => {
                setIsOpenToAdd(false)
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
        <AnimatePresence>
            {isOpenToAdd && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
                >
                    <div
                        className='w-1/3 h-3/4 max-h-fit m-auto bg-light relative overflow-hidden'>

                        {/* Header */}
                        {/* ---- */}
                        <span className='absolute -left-2 bottom-0 w-6 h-6 object-cover bg-orange bg-opacity-95 rounded-full' />
                        <span className='absolute left-6 bottom-2 w-4 h-4 object-cover bg-sidebar  rounded-full' />
                        <span className='absolute left-4 bottom-6 w-1 h-1 object-cover bg-orange bg-opacity-95 rounded-full' />

                        <h1 className='font-alkatra text-orange font-semibold w-full p-2 my-1 text-center'>Add New Admin To The System</h1>
                        <form
                            className='w-full m-auto h-full flex flex-col items-center gap-y-8 mt-4 '
                        >

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
                                className={'pt-3 px-1'}
                            />
                            <div className='w-[90%] flex justify-end items-center gap-x-2'>
                                <Buttons onClick={() => {
                                    setIsOpenToAdd(false),
                                        setAdminToAdd({ email: '', username: '', password: '', image: '' })
                                }} remove text={"Discard"} />
                                <Buttons onClick={handleAddAdmin} done text={"Done"} />
                            </div>
                            {/* ---- */}
                            <span className='absolute -right-2 top-0 w-6 h-6 object-cover bg-orange bg-opacity-95 rounded-full' />
                            <span className='absolute right-6 top-2 w-4 h-4 object-cover bg-sidebar  rounded-full' />
                            <span className='absolute right-4 top-6 w-1 h-1 object-cover bg-orange bg-opacity-95 rounded-full' />

                        </form>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AddAdmin