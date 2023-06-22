import React, { useContext, useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Context } from '../../Context/Context';
import { MdAdd } from 'react-icons/md';
import Cookies from 'js-cookie';
import { IconButtons } from '../Shared/Buttons';
import AddAdmin from './AddAdmin';
import Admin from './Admin';
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search'
import AdminCard from './AdminCard';
import GlobalToast from '../Shared/Toast';
import { FalidtoFetch } from '../Shared/Loading';
import { FormToEdit, FormToAdd } from '../Shared/FormToEdit';


const Admins = () => {
    const { setLoading, search, setOpenFormToAddEdit } = useContext(Context)

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
                            <AdminCard key={admin._id} data={admin} _id={admin._id}
                                removeAdmin={removeAdmin} setPrepareToRemove={setPrepareToRemove} prepareToRemove={prepareToRemove}
                            />
                        ))
            }

            {/* Add Admin */}
            <IconButtons Icon={MdAdd} onClick={() => setOpenFormToAddEdit({ openedToAdd: true })} className={'fixed right-6 bottom-6'} />
            <FormToAdd>
                <AddAdmin setAllAdminsData={setAllAdminsData} allAdminsData={allAdminsData} />
            </FormToAdd>

            {/* Edit Admin */}
            <FormToEdit>
                <Admin setAllAdminsData={setAllAdminsData} />
            </FormToEdit>
        </div>
    )
}

export default Admins