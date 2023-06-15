import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Context } from '../../Context/Context'
import Cookies from 'js-cookie'
import { AnimatePresence, motion } from "framer-motion"
import { IconButtons } from '../Shared/Buttons'
import { MdAdd } from 'react-icons/md';
import UpdateKpi from './UpdateKpi'
import AddKpi from './AddKpi'
import NoValueMatchSeaarch, { filteredArrayToSearch } from '../../utils/search'
import GlobalToast from '../Shared/Toast'
import { FalidtoFetch } from '../Shared/Loading'
import KpiCard from './KpiCard'

const Kpis = () => {

    const [allKpisData, setAllKpisData] = useState([])
    const [addKpi, setAddKpi] = useState(false)
    const [kpiToUpdate, setKpiToUpdate] = useState({ id: '', kpiName: '', isOpen: false })
    const { setLoading, search } = useContext(Context)

    // Search
    const filteredAdminsToSearch = filteredArrayToSearch(allKpisData, 'name', search)

    // Get KPIs Data
    const getAllKpisData = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/kpis/all-kpis'
                    , { headers: { token: Cookies.get('token') } }
                )
            setAllKpisData(response.data.data.sort(() => Math.random() * 100 - 50))// generates a random number between -50 and 50.
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', 'Oops! Some thing wrong, try to reload')
            }
        } setTimeout(() => { setLoading(false) }, 2000);

    }

    useEffect(() => {
        getAllKpisData()
    }, [search])

    return (
        <div className='w-full h-[75vh] relative flex flex-wrap justify-center items-start p-3 mt-4 gap-y-7 gap-x-6 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            {allKpisData.length == 0 ? <FalidtoFetch /> : filteredAdminsToSearch.length === 0 ?
                <NoValueMatchSeaarch /> : filteredAdminsToSearch.map((kpi) => (
                    <KpiCard _id={kpi._id} id={kpi.id} data={kpi} key={kpi._id} setKpiToUpdate={setKpiToUpdate} />
                ))
            }

            {/* Add Kpi*/}
            <IconButtons Icon={MdAdd} onClick={() => { setAddKpi(true) }} />
            <AddKpi allKpisData={allKpisData} setAllKpisData={setAllKpisData} addKpi={addKpi} setAddKpi={setAddKpi} />

            {/* Update Kpi */}
            <AnimatePresence>
                {kpiToUpdate.isOpen && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 w-full h-full z-10 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <UpdateKpi kpiToUpdate={kpiToUpdate} setKpiToUpdate={setKpiToUpdate} setAllKpisData={setAllKpisData} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div >
    )
}

export default Kpis