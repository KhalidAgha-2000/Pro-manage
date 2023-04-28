import React, { useState, useContext } from 'react'
import axiosInstance from '../../constants/axios'
import Input from './Input'
import { Buttons } from '../Shared/Buttons'
import { Context } from '../Context/Context';
import Cookies from 'js-cookie'
import { AnimatePresence, motion } from 'framer-motion'

const AddEmployee = ({ isOpenToAdd, setIsOpenToAdd, getAllEmployees }) => {

    const { setNotifications, setLoading } = useContext(Context)
    const [employeeToAdd, setEmployeeToAdd] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        image: '',
    })

    // Add Admin
    const handleChangeAddEmployee = (e) => {
        setEmployeeToAdd({ ...employeeToAdd, [e.target.name]: e.target.value })
    }
    const handleFileChangeAddEmployee = (e) => {
        setEmployeeToAdd({ ...employeeToAdd, image: e.target.files[0] })
    }
    const handleAddEmployee = async (e) => {
        if (!employeeToAdd.firstname || !employeeToAdd.lastname || !employeeToAdd.email) {
            setNotifications({
                notificationBar: true,
                pass: false,
                notificationBarMessage: 'Fields are required'
            })
            return
        }
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/employees/add-employee', {
                first_name: employeeToAdd.firstname,
                last_name: employeeToAdd.lastname,
                email: employeeToAdd.email,
                phone: employeeToAdd.phone,
                image: employeeToAdd.image,
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
            getAllEmployees()
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
                    className="fixed top-0 left-0 z-[99] w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
                >
                    <div
                        className='w-1/3 h-fit py-4 m-auto bg-light relative overflow-hidden'>

                        {/* Header */}
                        {/* ---- */}
                        <span className='absolute -left-2 top-0 w-6 h-6 object-cover bg-orange bg-opacity-95 rounded-full' />
                        <span className='absolute left-6 top-2 w-4 h-4 object-cover bg-sidebar  rounded-full' />
                        <span className='absolute left-4 top-6 w-1 h-1 object-cover bg-orange bg-opacity-95 rounded-full' />

                        <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>
                            Add New Employee To The System
                        </h1>

                        <form className='w-full m-auto h-full flex flex-col items-center gap-y-8 mt-4'>

                            <Input
                                onChange={handleChangeAddEmployee}
                                defaultValue={employeeToAdd.firstname}
                                name="firstname" placeholder='First Name'
                                type='text' className={'-my-1'}
                            />


                            <Input
                                onChange={handleChangeAddEmployee}
                                defaultValue={employeeToAdd.lastname}
                                name="lastname"
                                placeholder='Last Name'
                                type='text'
                                className={'-my-1'}
                            />

                            <Input
                                onChange={handleChangeAddEmployee}
                                defaultValue={employeeToAdd.email}
                                name="email" placeholder='Email'
                                type='email' className={'-my-1'}
                            />
                            <Input
                                onChange={handleChangeAddEmployee}
                                defaultValue={employeeToAdd.phone}
                                name="phone" type='number'
                                placeholder='enter a valid phone number (8) digits'
                                className={'-my-1'}
                            />
                            <Input
                                onChange={handleFileChangeAddEmployee}
                                name="image" defaultValue={employeeToAdd.image}
                                placeholder='image'
                                type='file'
                                className={'pt-3 px-1 -my-1'}
                            />

                            <div className='w-[90%] flex justify-end items-center gap-x-2'>
                                <Buttons done text={"Done"} onClick={handleAddEmployee} />
                                <Buttons remove text={"Discard"} onClick={() => {
                                    setIsOpenToAdd(false),
                                        setEmployeeToAdd({ email: '', firstname: '', lastname: '', phone: '', image: '' })
                                }} />
                            </div>

                        </form>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AddEmployee
