import React, { useState, useContext } from 'react'
import axiosInstance from '../../utils/axios'
import { Buttons } from '../Shared/Buttons'
import { Context } from '../../Context/Context';
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from "framer-motion";
import Circles from '../Shared/Circles';
import Inputs from '../Shared/Inputs';
import { AdminContext } from '../../Context/AdminContext';
import GlobalToast from '../Shared/Toast';

const AddAdmin = ({ setAllAdminsData, allAdminsData }) => {

    const { isOpenToAdd, setIsOpenToAdd } = useContext(AdminContext)

    const { setLoading } = useContext(Context)
    const [adminToAdd, setAdminToAdd] = useState({ email: '', username: '', password: '', image: '', })

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
            }, { headers: { token: Cookies.get('token'), "content-type": "multipart/form-data", } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            setAllAdminsData([...allAdminsData, response.data.admin]);
            setTimeout(() => { setIsOpenToAdd(false) }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        }
        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }

    return (
        <AnimatePresence>
            {isOpenToAdd && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">

                    <div className='w-1/3 h-3/4 max-h-fit m-auto bg-light relative overflow-hidden'>

                        {/* Header */}
                        <h1 className='font-alkatra text-orange font-semibold w-full p-2 my-1 text-center'>Add New Admin To The System</h1>

                        <form className='w-full m-auto h-full flex flex-col items-center gap-y-8 mt-4 '>

                            <Inputs className={'w-5/6'} onChange={handleChangeAddAdmin}
                                name="username" value={adminToAdd.username}
                                placeholder='admin name' type='text'
                            />

                            <Inputs className={'w-5/6'} onChange={handleChangeAddAdmin}
                                name="email" value={adminToAdd.email}
                                placeholder='email' type='email'
                            />

                            <Inputs className={'w-5/6'} onChange={handleChangeAddAdmin}
                                name="password" value={adminToAdd.password}
                                placeholder='generate password' type='password'
                            />

                            <Inputs className={'w-5/6 py-3 px-1'} onChange={handleFileChangeAddAdmin}
                                name="image" value={adminToAdd.image}
                                placeholder='image' type='file'
                            />

                            <div className='w-5/6 flex justify-end items-center gap-x-2'>
                                <Buttons onClick={() => {
                                    setIsOpenToAdd(false),
                                        setAdminToAdd({ email: '', username: '', password: '', image: '' })
                                }} remove text={"Discard"} />

                                <Buttons onClick={handleAddAdmin} done text={"Done"} />
                            </div>

                            {/* Circles */}
                            <Circles className1={'-left-2 bottom-0 w-6 h-6 bg-orange'} className2={'left-6 bottom-2 w-4 h-4 bg-sidebar'} className3={'left-4 bottom-6 w-1 h-1 bg-orange'} />

                        </form>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AddAdmin