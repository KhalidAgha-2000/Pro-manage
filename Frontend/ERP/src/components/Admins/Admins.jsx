import React, { useContext, useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Context } from '../../Context/Context';
import { MdAdd } from 'react-icons/md';
import { AnimatePresence, motion } from "framer-motion";
import Cookies from 'js-cookie';
import { IconButtons } from '../Shared/Buttons';
import AddAdmin from './AddAdmin';
import Admin from './Admin';
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search'
import AdminCard from './AdminCard';
import { AdminContext } from '../../Context/AdminContext';
import GlobalToast from '../Shared/Toast';
import { FalidtoFetch } from '../Shared/Loading';

const Admins = () => {
    const { setLoading, search } = useContext(Context)
    const { setIsOpenToAdd, isOpenToEdit } = useContext(AdminContext);

    const [allAdminsData, setAllAdminsData] = useState([])
    const [prepareToRemove, setPrepareToRemove] = useState(null)

    // Delete Admin
    const removeAdmin = async (id) => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.delete(`/admins/remove-admin/${id}`, { headers: { token: Cookies.get('token') } })
            GlobalToast('success', response.data.message)
            setAllAdminsData(allAdminsData.filter((admin) => admin._id !== id))
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        finally { setLoading(false) }
    }

    // Get Admins Data
    const getAllAdmins = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/admins/all-admins', { headers: { token: Cookies.get('token') } })
            setAllAdminsData(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        }
        setTimeout(() => { setLoading(false) }, 2000);
    }

    // Search
    const filteredAdminsToSearch = filteredArrayToSearch(allAdminsData, 'username', search)

    useEffect(() => {
        getAllAdmins()
        Cookies.get('id')
    }, [search])

    return (
        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 overflow-auto'>

            {allAdminsData.length == 0 ?
                <FalidtoFetch /> :
                filteredAdminsToSearch.length === 0 ?
                    <NoValueMatchSeaarch /> : filteredAdminsToSearch
                        .sort((loggedIn) => {
                            if (loggedIn._id === Cookies.get('id')) { return -1; }// Logedin admin should come first
                            else { return 0; }// keep the same order
                        }).map((admin) => (
                            <AdminCard key={admin._id}
                                _id={admin._id} image={admin.image} username={admin.username} email={admin.email}
                                removeAdmin={removeAdmin} setPrepareToRemove={setPrepareToRemove} prepareToRemove={prepareToRemove}
                            />
                        ))
            }

            {/* Add Button */}
            <IconButtons Icon={MdAdd} onClick={() => setIsOpenToAdd(true)} className={'fixed right-6 bottom-6'} />

            {/* Add Admin */}
            <AddAdmin setAllAdminsData={setAllAdminsData} allAdminsData={allAdminsData} />

            {/* Edit Admin */}
            <AnimatePresence>
                {isOpenToEdit &&
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
                    >
                        <Admin setAllAdminsData={setAllAdminsData} />
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default Admins