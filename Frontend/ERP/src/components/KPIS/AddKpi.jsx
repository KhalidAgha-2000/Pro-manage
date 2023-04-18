import React, { useContext, useState } from 'react'
import axiosInstance from '../../constants/axios'
import { Context } from '../Context/Context'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from "framer-motion"
import { GiCheckMark } from 'react-icons/gi'
import { TbLetterX } from 'react-icons/tb'


const AddKpi = ({ allKpis, setAllKpis, addKpi, setAddKpi }) => {
    const { setNotifications, setLoading } = useContext(Context)

    // Add KPI 
    const addNewKPI = async (e) => {
        e.preventDefault()
        // Check if the kpi inout is empty
        if (!addKpi) {
            setNotifications({
                notificationBar: true,
                pass: false,
                notificationBarMessage: 'Please enter a kpi name.'
            })
            return
        }

        try {
            const response = await axiosInstance.post('/kpis/add-kpi', { name: addKpi }, {
                headers: { token: Cookies.get('token') }
            })

            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })
            setAllKpis([...allKpis, response.data.data]);
            setAddKpi(false)

        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
            }
        } finally {
            setInterval(() => {
                setLoading(false)
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 4000);
        }
    }

    return (
        <AnimatePresence>
            {addKpi && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[80vh] fixed"
                >
                    <form
                        className='w-80 h-fit fixed right-10 bottom-20 flex flex-col gap-y-2 p-4 rounded-2xl bg-white border-4 border-sidebar '>
                        <span className='text-orange font-montserrat font-bold'>Add new KPI</span>
                        <div className='flex items-center justify-between '>
                            <input
                                type="text" required
                                name="name" placeholder='KPI name'
                                className="w-3/4 bg-gray-50 text-sm rounded-lg focus:ring-orange border outline-none p-2.5 "
                                onChange={(e) => setAddKpi(e.target.value)}
                            />
                            <GiCheckMark
                                cursor='pointer' color='#4bb543'
                                onClick={addNewKPI}
                            />
                            <TbLetterX
                                cursor='pointer' color='#ff3333'
                                onClick={() => setAddKpi(false)}
                            />
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AddKpi