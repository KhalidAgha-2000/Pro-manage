import React, { useContext, useState } from 'react'
import { Buttons } from '../Shared/Buttons'
import { Context } from '../../Context/Context'
import Cookies from 'js-cookie'
import GlobalToast from '../Shared/Toast'
import axiosInstance from '../../utils/axios'
import Circles from '../Shared/Circles'
import Inputs from '../Shared/Inputs'

const Addemployee = ({ getAllEmployees }) => {

    const { setLoading, setOpenFormToAddEdit } = useContext(Context)

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
            setTimeout(() => { setOpenFormToAddEdit({ openedToAdd: false }) }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }
    return (
        <>
            {/* Circles */}
            <Circles className1={'-left-2 top-0 w-6 h-6 bg-orange'} className2={'left-6 top-2 w-4 h-4 bg-sidebar'} className3={'left-4 top-6 w-1 h-1 bg-orange'} />

            <h1 className='font-alkatra text-xl text-orange font-semibold w-full p-2 my-1 mb-6 text-center'>Add New Employee To The System</h1>

            <form className='w-full m-auto h-full flex flex-col items-center gap-y-4'>

                <Inputs onChange={handleChangeAddEmployee}
                    value={employeeToAdd.firstname} name="firstname" placeholder='First Name' type='text' className={'w-10/12 -my-1'}
                />

                <Inputs onChange={handleChangeAddEmployee}
                    value={employeeToAdd.lastname} name="lastname" placeholder='Last Name' type='text' className={'w-10/12 -my-1'}
                />

                <Inputs onChange={handleChangeAddEmployee}
                    value={employeeToAdd.email} name="email" placeholder='Email' type='email' className={'w-10/12 -my-1'}
                />

                <Inputs onChange={handleChangeAddEmployee}
                    value={employeeToAdd.phone} name="phone" type='number' placeholder='enter a valid phone number (8) digits' className={'w-10/12 -my-1'}
                />

                <Inputs onChange={handleFileChangeAddEmployee}
                    name="image" defaultValue={employeeToAdd.image} placeholder='image' type='file' className={'pt-3 px-1 w-10/12 -my-1'}
                />

                <div className='w-10/12  flex justify-end items-center gap-x-2 bg-['>
                    <Buttons done text={"Done"} onClick={handleAddEmployee} />
                    <Buttons remove text={"Discard"} onClick={() => {
                        setOpenFormToAddEdit({ openedToAdd: false }),
                            setEmployeeToAdd({ email: '', firstname: '', lastname: '', phone: '', image: '' })
                    }} />
                </div>

            </form>
        </>
    )
}

export default Addemployee