import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Context } from '../../Context/Context'
import Cookies from 'js-cookie'
import { AnimatePresence, motion } from "framer-motion"
import { IconButtons } from '../Shared/Buttons'
import { MdAdd } from 'react-icons/md';
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search'
import GlobalToast from '../Shared/Toast'
import { FalidtoFetch } from '../Shared/Loading'
import RoleCard from './RoleCard'
import AddRole from './AddRole'
import UpdateRole from './UpdateRole'


const Roles = () => {
    const [allRolesData, setAllRolesData] = useState([])
    const [roleToUpdate, setRoleToUpdate] = useState({ id: '', roleName: '', isOpen: false })
    const [addRole, setAddRole] = useState(false)

    const { setLoading, search } = useContext(Context)

    // Search
    const filteredAdminsToSearch = filteredArrayToSearch(allRolesData, 'name', search)

    useEffect(() => {
        const getRolesData = async () => {
            try {
                setLoading(true)

                const data = await getAllRoles();
                if (data) {
                    setAllRolesData(data);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
                }
            } setTimeout(() => { setLoading(false) }, 2000);
        };
        getRolesData();
    }, [search])

    return (
        <div className='w-full h-[75vh] relative flex flex-wrap justify-center items-start p-3 mt-4 gap-y-7 gap-x-6 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            {allRolesData.length == 0 ? <FalidtoFetch /> : filteredAdminsToSearch.length === 0 ?
                <NoValueMatchSeaarch /> : filteredAdminsToSearch.map((role) => (
                    <RoleCard data={role} key={role._id} _id={role._id} setRoleToUpdate={setRoleToUpdate} roleToUpdate={roleToUpdate} />))}


            {/* Add Role*/}
            <IconButtons Icon={MdAdd} onClick={() => { setAddRole(true) }} />

            <AddRole
                allRolesData={allRolesData} setAllRolesData={setAllRolesData} addRole={addRole} setAddRole={setAddRole}
            />

            {/* Update Role */}
            <AnimatePresence>
                {roleToUpdate.isOpen && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 w-full h-full z-10 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <UpdateRole
                            setAllRolesData={setAllRolesData}
                            roleToUpdate={roleToUpdate}
                            setRoleToUpdate={setRoleToUpdate}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

}

export default Roles



//  Global Get Roles

export const getAllRoles = async () => {
    try {
        const response = await axiosInstance.get('/roles/all-roles', {
            headers: { token: Cookies.get('token') }
        });
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.data) {
            GlobalToast('warn', "Oops! Something went wrong, try to reload");
        }
        return null;
    }
};