import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../constants/axios'
import { Context } from '../Context/Context'
import Cookies from 'js-cookie'
import { IoMdAnalytics } from 'react-icons/io'
import { motion, AnimatePresence } from "framer-motion"
import { AiFillEdit } from 'react-icons/ai'
import { GiCheckMark } from 'react-icons/gi'
import { TbLetterX } from 'react-icons/tb'
import { Buttons } from '../Shared/Buttons'

const Kpis = () => {

    const [allKpis, setAllKpis] = useState([])
    const [editKpi, setEditKpi] = useState({ isOpen: false, id: '', name: '' })
    const [updateKpi, setUpdateKpi] = useState('')
    const { setNotifications, setLoading, search } = useContext(Context)

    // Filter
    const filteredEmployeesToSearch = allKpis.filter(val => {
        if (search === '') {
            return allKpis;
        } else if (val.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            return val;
        }
    })

    const getAllKpis = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/kpis/all-kpis'
                    , { headers: { token: Cookies.get('token') } }
                )
            setAllKpis(response.data.data);
            console.log('ree', response.data.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: "Oops! Some thing wrong, try to reload"
                })
            }
        }
        finally {
            setLoading(false);
            setInterval(() => {
                setNotifications({
                    pass: false,
                    notificationBarMessage: '',
                    notificationBar: false,
                })
            }, 4000);
        }
    }

    // Update KPI`s name / Remove 
    const updateKPIName = async (e) => {
        e.preventDefault()
        // Check if the updateKpi state is empty
        if (!updateKpi) {
            setNotifications({
                notificationBar: true,
                pass: false,
                notificationBarMessage: 'Please enter a kpi name.'
            })
            return
        }

        try {
            const response = await axiosInstance.put(`/kpis/update-kpi-name/${editKpi.id}`, { name: updateKpi }, {
                headers: { token: Cookies.get('token') }
            })

            setLoading(true)
            setNotifications({
                notificationBar: true,
                pass: true,
                notificationBarMessage: response.data.message
            })

            // console.log('ss', response.data.data)
            // Update allKpis state with the updated kpi data
            setAllKpis(allKpis.map((kpi) => kpi._id === editKpi.id ? { ...kpi, name: updateKpi } : kpi));
            setEditKpi({ ...editKpi, isOpen: false, id: '' })
        } catch (error) {
            if (error.response && error.response.data) {
                setNotifications({
                    notificationBar: true,
                    pass: false,
                    notificationBarMessage: error.response.data.message
                })
                // console.log(error.response.data.message);
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
    useEffect(() => {
        getAllKpis()
    }, [])

    return (
        <div className='w-full h-[75vh] relative flex flex-wrap justify-center items-start p-3 mt-4 gap-y-7 gap-x-6 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            {
                filteredEmployeesToSearch.length === 0 ? (
                    <h1 className='w-max h-fit m-auto p-3 my-8 rounded-md bg-orange text-lg font-montserrat text-light'>
                        No value match your search input
                    </h1>
                ) : (
                    filteredEmployeesToSearch.map((k) => (

                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ y: [50, 0], opacity: [0, 0, 1] }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            key={k._id}
                            className="flex items-center gap-x-2 bg-sidebar text-orange w-fit h-fit rounded-lg shadow-orange shadow-md p-5">
                            <IoMdAnalytics size={25} />
                            <h3 className="text-xl uppercase font-montserrat font-semibold text-dark">{k.name}</h3>
                            <AiFillEdit
                                size={20} cursor={'pointer'}
                                onClick={() => setEditKpi({ ...editKpi, isOpen: true, id: k._id, name: k.name })}
                                className='hover:scale-150 transition duration-200 ease-in-out text-xl text-dark opacity-60'
                            />

                        </motion.div>
                    ))
                )
            }

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
                            <span className='text-orange font-montserrat'>update the name of the KPI</span>
                            <div className='flex items-center justify-between '>
                                <input
                                    type="text" required defaultValue={editKpi.name}
                                    name="name" placeholder='name'
                                    className="w-3/4 bg-gray-50 text-sm rounded-lg focus:ring-orange border outline-none p-2.5 "
                                    onChange={(e) => setUpdateKpi(e.target.value)}
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

        </div>
    )
}

export default Kpis