import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';
import axiosInstance from '../../constants/axios';
import Cookies from 'js-cookie';
import { motion } from "framer-motion";
const Teams = () => {
    const { setNotifications, setLoading, search } = useContext(Context)
    const [teams, setTeams] = useState([]);

    const getAllTeams = async () => {
        try {
            setLoading(true)
            const response = await
                axiosInstance.get('/teams/all-teams'
                    , { headers: { token: Cookies.get('token') } }
                )
            setTeams(response.data.data);
            console.log('ree', response);
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
        getAllTeams()
    }, [])

    return (
        <div className='w-full h-[75vh] relative flex flex-wrap justify-center p-3 gap-x-4 gap-y-4 mt-4 overflow-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-dark'>
            {teams.map((t) => (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                    // transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    key={t._id}
                    className='bg-dark w-[32%] relative h-fit max-w-sm p-5 flex flex-col gap-y-1 rounded-lg shadow-lg font-montserrat overflow-hidden shadow-orange cursor-pointer hover:scale-105 hover:z-10 transition-all duration-300'>

                    <div className='w-full h-1/4 my-2 flex items-center'>
                        <span className='w-20 h-20 text-6xl uppercase font-alkatra flex items-center justify-center rounded-full bg-sidebar'>{t.name.charAt(0)}</span>
                        {/* Numbers */}
                        <div className='flex flex-col p-4 w-auto h-fit '>
                            <h1 className='text-sidebar text-xl'><span className='bg-orange w-1 h-1 px-2 mx-1 rounded-full'> {t.numberOfEmployees}</span>Employees</h1>
                            <h1 className='text-sidebar text-xl'><span className='bg-orange w-1 h-1 px-2 mx-1 rounded-full'> {t.numberOfProjects}</span>Projects</h1>
                        </div>
                    </div>

                    <h1 className='text-sidebar font-semibold font-montserrat text-2xl text-center uppercase'>{t.name}</h1>

                    {/* ------ */}
                    <span className='absolute -right-1 -bottom-2 w-10 h-10 object-cover bg-[#dfd6d3] rounded-full' />
                    <span className='absolute -right-2 bottom-8 w-4 h-4 object-cover bg-[#dfd6d3] rounded-full' />
                    <span className='absolute -right-1 bottom-14 w-4 h-4 object-cover bg-[#dfd6d3] rounded-full' />


                </motion.div >
            ))}
        </div >
    )
}

export default Teams