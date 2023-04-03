import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiFireShield, GiProgression, GiTeamDowngrade } from "react-icons/gi";
import { FaFileArchive, } from "react-icons/fa";
import { BsPersonLinesFill } from "react-icons/bs";
import { AiFillProject } from "react-icons/ai";
import { VscSymbolVariable } from "react-icons/vsc";
import { IoMdArchive } from "react-icons/io";
import { motion } from "framer-motion";
import { Context } from './Context/Context';
import axiosInstance from '../constants/axios';
import Cookies from 'js-cookie';
import bubbles from "../assets/bubbles.jpg";
const Analysis = () => {

    const [analysisDataState, setAnalysisDataState] = useState({})
    const { setNotifications, setLoading } = useContext(Context)
    const iconsArray = [
        { icon: <MdAdminPanelSettings size={70} /> },
        { icon: <GiTeamDowngrade size={70} /> },
        { icon: <VscSymbolVariable size={70} /> },
        { icon: <IoMdArchive size={70} /> },
        { icon: <AiFillProject size={70} /> },
        { icon: <GiFireShield size={70} /> },
        { icon: <GiProgression size={70} /> },
        { icon: <BsPersonLinesFill size={70} /> },
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
        if (window.location.pathname === 'naly') {
            console.log('ww', window.location.pathname);
        }
        else { console.log('sss'); }
    }, [])

    return (
        <>
            <div className='flex flex-wrap items-center justify-center mt-3 gap-7 p-4 '>

                {Object.entries(analysisDataState).map((analys, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                        key={index}
                        className={`w-[30%] h-28 p-4 relative flex overflow-hidden gap-1 items-center my-1 rounded-3xl bg-dark
                            ${index >= Object.entries(analysisDataState).length - 2 ? 'w-[40%]' : ''}`
                        }
                    >

                        <span className='w-12 h-12 p-2 rounded-lg flex items-center justify-center text-orange bg-[#dfd6d3] '>{/**skew-y-6 skew-x-1 */}
                            {iconsArray[index] && iconsArray[index].icon}
                        </span>

                        <div className='w-full h-full flex flex-col gap-y-1 mx-2 '>
                            <h1 className='mt-3 text-xl font-black text-[#e87338] font-montserrat'>{analys[0]}</h1>

                            <span className="w-max h-auto text-2xl text-light font-montserrat px-2.5 py-0.5 rounded-lg">
                                {analys[1]}
                            </span>

                        </div>

                        {/* Circle */}
                        <span className='absolute -right-8 -bottom-2 w-14 h-14 object-cover bg-[#dfd6d3] rounded-full'></span>
                        <span className='absolute right-4 w-4 h-4 object-cover bg-[#dfd6d3] rounded-full'></span>
                        <span className='absolute right-2 w-1 h-1 object-cover bg-[#dfd6d3] rounded-full'></span>

                    </motion.div>
                ))}
            </div>
        </>

    )
}

export default Analysis




