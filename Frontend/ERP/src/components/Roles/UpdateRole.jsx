import React, { useContext, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Context } from '../../Context/Context'
import Cookies from 'js-cookie'
import { GiCheckMark } from 'react-icons/gi'
import { TbLetterX } from 'react-icons/tb'
import GlobalToast from '../Shared/Toast'


const UpdateRole = ({ setAllRolesData, roleToUpdate, setRoleToUpdate }) => {

    const [updateTheRole, setUpdateTheRole] = useState('')
    const { setLoading } = useContext(Context)

    // Update Role`s name
    const updateRoleName = async (e) => {
        e.preventDefault()
        // Check if the updateTheRole state is empty
        if (!updateTheRole) {
            GlobalToast('warn', 'Please enter a role name.')
            return
        }

        try {
            const response = await axiosInstance.put(`/roles/update-role-name/${roleToUpdate.id}`, { name: updateTheRole }, {
                headers: { token: Cookies.get('token') }
            })
            setLoading(true)
            GlobalToast('success', response.data.message)
            console.log(response);
            setTimeout(() => { setRoleToUpdate({ isOpen: false }) }, 1000);
            // Get The Updated Role Data
            setAllRolesData((prevAllRolesData) =>
                prevAllRolesData.map((role) => role._id === roleToUpdate.id ? { ...role, name: response.data.data.name } : role)
            );
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }

    return (
        <form className='inset-y-1/2 w-1/3 h-fit flex flex-col gap-y-2  p-4 rounded-2xl bg-white border-4 border-sidebar '>
            <span className='text-orange text-[13px] font-montserrat'>You can modify the Role name, however you should not change it because it is associated with employees data.</span>
            <div className='flex items-center justify-between'>
                <input
                    onChange={(e) => setUpdateTheRole(e.target.value.trim())}
                    type="text" defaultValue={roleToUpdate.roleName} required name="name" placeholder={roleToUpdate.roleName}
                    className="w-3/4 bg-gray-50 text-sm rounded-lg focus:ring-orange border outline-none p-2.5 "
                />
                <GiCheckMark cursor='pointer' color='#4bb543' onClick={updateRoleName} />
                <TbLetterX cursor='pointer' color='#ff3333' onClick={() => setRoleToUpdate({ isOpen: false })} />
            </div>
        </form>
    )
}

export default UpdateRole