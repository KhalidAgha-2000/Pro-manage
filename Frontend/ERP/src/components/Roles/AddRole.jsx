import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { Context } from '../../Context/Context'
import Cookies from 'js-cookie'
import GlobalToast from '../Shared/Toast'
import { GiCheckMark } from 'react-icons/gi'
import { TbLetterX } from 'react-icons/tb'
import axiosInstance from '../../utils/axios'

const AddRole = ({ allRolesData, setAllRolesData, addRole, setAddRole }) => {

    const [newRole, setNewRole] = useState('')
    const { setLoading } = useContext(Context)

    // Add Role 
    const addNewRole = async (e) => {
        e.preventDefault()
        // Check if the Role input is empty
        if (!newRole) {
            GlobalToast('warn', 'Please enter a role name.')
            return
        }

        try {
            const response = await axiosInstance.post('/roles/add-role', { name: newRole }, { headers: { token: Cookies.get('token') } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            setAllRolesData([...allRolesData, response.data.data]);
            setAddRole(false)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }
    return (
        <AnimatePresence>
            {addRole && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                    className="w-full h-[80vh] fixed">
                    <form className='w-80 h-fit fixed right-10 bottom-20 flex flex-col gap-y-2 p-4 rounded-2xl bg-white border-4 border-sidebar '>
                        <span className='text-orange font-montserrat font-bold'>Add new Role</span>
                        <div className='flex items-center justify-between '>
                            <input onChange={(e) => { setNewRole(e.target.value.trim()), console.log(newRole) }}
                                type="text" requiredname="name" placeholder='Role name'
                                className="w-3/4 bg-gray-50 text-sm rounded-lg focus:ring-orange border outline-none p-2.5 "
                            />

                            <GiCheckMark cursor='pointer' color='#4bb543' onClick={addNewRole} />
                            <TbLetterX cursor='pointer' color='#ff3333' onClick={() => setAddRole(false)} />
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AddRole