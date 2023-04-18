import React, { useContext, useState } from 'react'
import axiosInstance from '../../constants/axios'
import { Context } from '../Context/Context'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from "framer-motion"
import { GiCheckMark } from 'react-icons/gi'
import { TbLetterX } from 'react-icons/tb'


const UpdateKpi = ({ allKpis, setAllKpis, editKpi, setEditKpi }) => {
    const [updateTheKpi, setUpdateTheKpi] = useState('')
    const { setNotifications, setLoading, search } = useContext(Context)

    // Update KPI`s name
    const updateKPIName = async (e) => {
        e.preventDefault()
        // Check if the updateKpi state is empty
        if (!updateTheKpi) {
            setNotifications({
                notificationBar: true,
                pass: false,
                notificationBarMessage: 'Please enter a kpi name.'
            })
            return
        }

        try {
            const response = await axiosInstance.put(`/kpis/update-kpi-name/${editKpi.id}`, { name: updateTheKpi }, {
                headers: { token: Cookies.get('token') }
            })

            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })

            // Update allKpis state with the updated kpi data
            setAllKpis(allKpis.map((kpi) => kpi._id === editKpi.id ? { ...kpi, name: updateTheKpi } : kpi));
            setEditKpi({ ...editKpi, isOpen: false, id: '' })
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
            {editKpi.isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full -mt-3 h-[100vh] absolute flex flex-col items-center justify-center"
                >
                    <form className='inset-y-1/2 w-1/2 h-fit flex flex-col gap-y-2 -mt-[30%] p-4 rounded-2xl bg-white border-4 border-sidebar '>
                        <span className='text-orange text-[13px] font-montserrat'>You can modify the KPI name, however you should not change it because it is associated with employees data.</span>
                        {/* <span className='text-orange font-montserrat'>update the name of the KPI</span> */}
                        <div className='flex items-center justify-between '>
                            <input
                                type="text" required defaultValue={editKpi.name}
                                name="name" placeholder='name'
                                className="w-3/4 bg-gray-50 text-sm rounded-lg focus:ring-orange border outline-none p-2.5 "
                                onChange={(e) => setUpdateTheKpi(e.target.value)}
                            />
                            <GiCheckMark
                                cursor='pointer' color='#4bb543'
                                onClick={updateKPIName}
                            />
                            <TbLetterX
                                cursor='pointer' color='#ff3333'
                                onClick={() => setEditKpi({ ...editKpi, isOpen: false, id: '' })}
                            />

                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default UpdateKpi