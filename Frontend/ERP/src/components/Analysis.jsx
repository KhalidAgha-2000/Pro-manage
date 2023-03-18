import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiFireShield, GiProgression, GiTeamDowngrade } from "react-icons/gi";
import { FaFileArchive, } from "react-icons/fa";
import { BsPersonLinesFill } from "react-icons/bs";
import { AiFillProject } from "react-icons/ai";
import { VscSymbolVariable } from "react-icons/vsc";
import { motion } from "framer-motion";
import { Context } from './Context/Context';
import axiosInstance from '../constants/axios';
import Cookies from 'js-cookie';

const Analysis = (props) => {
    const [analysisDataState, setAnalysisDataState] = useState({})
    const { setNotifications, setLoading } = useContext(Context)
    const iconsArray = [
        { icon: <MdAdminPanelSettings size={70} /> },
        { icon: <GiTeamDowngrade size={70} /> },
        { icon: <VscSymbolVariable size={70} /> },
        { icon: <BsPersonLinesFill size={70} /> },
        { icon: <AiFillProject size={70} /> },
        { icon: <GiFireShield size={70} /> },
        { icon: <GiProgression size={70} /> },
        { icon: <FaFileArchive size={70} /> },
    ]
    const getAllAnalysisData = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/analysis-data', {
                headers: { token: Cookies.get('token') }
            })
            // console.log(response.data.data);
            await setAnalysisDataState(response.data.data)
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
            setLoading(false)
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
        getAllAnalysisData()

    }, [])

    return (
        <>
            <div className='flex flex-wrap mt-10 gap-7 p-4'>

                {Object.entries(analysisDataState).map((analys, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                        key={index} className='w-40 h-28 p-4 relative flex flex-col items-start justify bg-light shadow-md shadow-orange rounded-lg 
                        hover:scale-90 transition-all delay-300 duration-300 ease-in-out
                        '>
                        <span className='w-10 h-10 p-2 rounded-md  flex items-center justify-center absolute -top-4 text-light  bg-orange'>
                            {iconsArray[index] && iconsArray[index].icon}
                        </span>
                        <div className='w-full h-full flex flex-col items-start justify-between'>

                            <h1 className='mt-3 text-xl font-montserrat'>{analys[0]}</h1>
                            <p className='font-semibold text-xl font-montserrat'>{analys[1]}</p>
                        </div>
                    </motion.div>
                ))}

                <div className='w-[720px] h-28 p-4 relative flex flex-col items-start justify bg-light shadow-md shadow-orange rounded-lg'>
                    <article className='font-montserrat text-sm'>
                        <b className='text-orange'>Dashboard!</b> This is the hub where you can find all the information about your projects, teams, and key performance indicators. You can monitor the progress of ongoing projects, track employee performance, and make data-driven decisions.You can quickly access the information you need. Stay on top  and take your business to the next level.
                    </article>
                </div>

            </div>
        </>

    )
}

export default Analysis


