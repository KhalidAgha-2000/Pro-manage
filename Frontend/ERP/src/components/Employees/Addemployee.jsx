import React, { useState, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import axiosInstance from '../../utils/axios'
import Input from './Input'
import { Buttons } from '../Shared/Buttons'
import { Context } from '../../Context/Context';
import Cookies from 'js-cookie'
import Circles from '../Shared/Circles';
import { EmployeeContext } from '../../Context/EmployeeeContext';
import GlobalToast from '../Shared/Toast';

const AddEmployee = ({ getAllEmployees }) => {

    const { setLoading } = useContext(Context)
    const { isOpenToAdd, setIsOpenToAdd } = useContext(EmployeeContext);

    const [employeeToAdd, setEmployeeToAdd] = useState({ firstname: '', lastname: '', email: '', phone: '', image: '', })

    // Add Admin
    const handleChangeAddEmployee = (e) => {
        setEmployeeToAdd({ ...employeeToAdd, [e.target.name]: e.target.value })
    }
    const handleFileChangeAddEmployee = (e) => {
        setEmployeeToAdd({ ...employeeToAdd, image: e.target.files[0] })
    }
    const handleAddEmployee = async (e) => {
        if (!employeeToAdd.firstname || !employeeToAdd.lastname || !employeeToAdd.email) {
            GlobalToast('warn', 'Fields are required')
            return
        }
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/employees/add-employee', {
                first_name: employeeToAdd.firstname, last_name: employeeToAdd.lastname, email: employeeToAdd.email, phone: employeeToAdd.phone, image: employeeToAdd.image,
            }, { headers: { token: Cookies.get('token'), "content-type": "multipart/form-data", } }
            )
            setLoading(true)
            GlobalToast('success', response.data.message)
            getAllEmployees()
            setTimeout(() => { setIsOpenToAdd(false) }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }
    return (
        <AnimatePresence>
            {isOpenToAdd && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 z-[99] w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">

                    <div className='w-1/3 h-fit py-4 m-auto bg-light relative overflow-hidden'>
                        {/* Circles */}
                        <Circles className1={'--left-2 top-0 w-6 h-6 bg-orange'} className2={'left-6 top-2 w-4 h-4 bg-sidebar'} className3={'left-4 top-6 w-1 h-1 bg-orange'} />

                        <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>Add New Employee To The System</h1>

                        <form className='w-full m-auto h-full flex flex-col items-center gap-y-8 mt-4'>

                            <Input onChange={handleChangeAddEmployee}
                                value={employeeToAdd.firstname} name="firstname" placeholder='First Name' type='text' className={'-my-1'}
                            />

                            <Input onChange={handleChangeAddEmployee}
                                value={employeeToAdd.lastname} name="lastname" placeholder='Last Name' type='text' className={'-my-1'}
                            />

                            <Input onChange={handleChangeAddEmployee}
                                value={employeeToAdd.email} name="email" placeholder='Email' type='email' className={'-my-1'}
                            />

                            <Input onChange={handleChangeAddEmployee}
                                value={employeeToAdd.phone} name="phone" type='number' placeholder='enter a valid phone number (8) digits' className={'-my-1'}
                            />

                            <Input onChange={handleFileChangeAddEmployee}
                                name="image" defaultValue={employeeToAdd.image} placeholder='image' type='file' className={'pt-3 px-1 -my-1'}
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
