import React, { useState, useContext } from 'react'
import axiosInstance from '../../utils/axios'
import { Buttons } from '../Shared/Buttons'
import { Context } from '../../Context/Context';
import Cookies from 'js-cookie'
import Circles from '../Shared/Circles';
import Inputs from '../Shared/Inputs';
import GlobalToast from '../Shared/Toast';

const AddAdmin = ({ setAllAdminsData, allAdminsData }) => {

    const { setLoading, setOpenFormToAddEdit } = useContext(Context)

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
            setTimeout(() => { setOpenFormToAddEdit({ openedToAdd: false }) }, 2000);
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
        <>
            {/* Title */}
            <h1 className='font-alkatra text-orange font-semibold w-full p-2 my-1 text-center text-xl'>Add New Admin To The System</h1>

            <form className='w-full m-auto h-full flex flex-col items-center gap-y-8 mt-4 '>
                <Inputs className={'w-5/6'} onChange={handleChangeAddAdmin}
                    name="username" value={adminToAdd.username} placeholder='admin name' type='text' />

                <Inputs className={'w-5/6'} onChange={handleChangeAddAdmin}
                    name="email" value={adminToAdd.email} placeholder='email' type='email' />

                <Inputs className={'w-5/6'} onChange={handleChangeAddAdmin}
                    name="password" value={adminToAdd.password} placeholder='generate password' type='password' />

                <Inputs className={'w-5/6 py-3 px-1'} onChange={handleFileChangeAddAdmin}
                    name="image" value={adminToAdd.image} placeholder='image' type='file' />

                <div className='w-5/6 flex justify-end items-center gap-x-2 pb-10  mb-10'>
                    <Buttons onClick={() => {
                        setOpenFormToAddEdit({ openedToAdd: false, }),
                            setAdminToAdd({ email: '', username: '', password: '', image: '' })
                    }} remove text={"Discard"} />

                    <Buttons onClick={handleAddAdmin} done text={"Done"} />
                </div>

                {/* Circles */}
                <Circles className1={'-left-2 bottom-0 w-6 h-6 bg-orange'} className2={'left-6 bottom-2 w-4 h-4 bg-sidebar'} className3={'left-4 bottom-6 w-1 h-1 bg-orange'} />

            </form>
        </>
    )
}

export default AddAdmin