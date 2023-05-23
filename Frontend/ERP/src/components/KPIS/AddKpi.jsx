import React, { useContext, useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Context } from '../../Context/Context'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from "framer-motion"
import { GiCheckMark } from 'react-icons/gi'
import { TbLetterX } from 'react-icons/tb'
import GlobalToast from '../Shared/Toast'


const AddKpi = ({ allKpisData, setAllKpisData, addKpi, setAddKpi }) => {

    const [newKpi, setNewKpi] = useState('')

    const { setLoading } = useContext(Context)

    // Add KPI 
    const addNewKPI = async (e) => {
        e.preventDefault()
        // Check if the kpi input is empty
        if (!newKpi) {
            GlobalToast('warn', 'Please enter a kpi name.')
            return
        }

        try {
            const response = await axiosInstance.post('/kpis/add-kpi', { name: newKpi }, { headers: { token: Cookies.get('token') } })
            setLoading(true)
            GlobalToast('success', response.data.message)
            setAllKpisData([...allKpisData, response.data.data]);
            setAddKpi(false)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('warn', error.response.data.message)
            }
        } setTimeout(() => { setLoading(false) }, 2000);
    }

    return (
        <AnimatePresence>
            {addKpi && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}
                    className="w-full h-[80vh] fixed">
                    <form className='w-80 h-fit fixed right-10 bottom-20 flex flex-col gap-y-2 p-4 rounded-2xl bg-white border-4 border-sidebar '>
                        <span className='text-orange font-montserrat font-bold'>Add new KPI</span>
                        <div className='flex items-center justify-between '>
                            <input onChange={(e) => setNewKpi(e.target.value.trim())}
                                type="text" requiredname="name" placeholder='KPI name'
                                className="w-3/4 bg-gray-50 text-sm rounded-lg focus:ring-orange border outline-none p-2.5 "
                            />

                            <GiCheckMark cursor='pointer' color='#4bb543' onClick={addNewKPI} />
                            <TbLetterX cursor='pointer' color='#ff3333' onClick={() => setAddKpi(false)} />
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AddKpi