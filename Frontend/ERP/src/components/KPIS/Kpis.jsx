import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../constants/axios'
import { Context } from '../Context/Context'
import Cookies from 'js-cookie'
import { IoMdAnalytics } from 'react-icons/io'
import { motion } from "framer-motion"
import { AiFillEdit } from 'react-icons/ai'
import { IconButtons } from '../Shared/Buttons'
import { Link } from "react-router-dom";
import { MdAdd } from 'react-icons/md';
import UpdateKpi from './UpdateKpi'
import AddKpi from './AddKpi'

const Kpis = () => {

    const [allKpis, setAllKpis] = useState([])
    const [editKpi, setEditKpi] = useState({ isOpen: false, id: '', name: '' })
    const [addKpi, setAddKpi] = useState(false)
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
            setAllKpis(response.data.data.sort(() => Math.random() * 100 - 50));// generates a random number between -50 and 50.
            // setAllKpis(response.data.data);
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
                    filteredEmployeesToSearch
                        .map((k) => (

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

            {/* Add Kpi*/}
            <div className='fixed z-[999] right-6 bottom-6'
                onClick={() => {
                    setAddKpi(true)
                }}
            >
                <IconButtons
                    Icon={MdAdd}
                />
            </div>

            <AddKpi
                allKpis={allKpis}
                setAllKpis={setAllKpis}
                addKpi={addKpi}
                setAddKpi={setAddKpi}
            />


            {/* Update Kpi */}
            <UpdateKpi
                allKpis={allKpis}
                setAllKpis={setAllKpis}
                editKpi={editKpi}
                setEditKpi={setEditKpi}
            />


        </div>
    )
}

export default Kpis