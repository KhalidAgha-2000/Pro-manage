import React, { useContext, useEffect, useState } from 'react'
import { MdAdminPanelSettings } from "react-icons/md";
import { GiFireShield, GiProgression, GiTeamDowngrade } from "react-icons/gi";
import { BsPersonLinesFill } from "react-icons/bs";
import { AiFillProject } from "react-icons/ai";
import { VscSymbolVariable } from "react-icons/vsc";
import { IoMdArchive } from "react-icons/io";
import { motion } from "framer-motion";
import { Context } from '../../Context/Context';
import axiosInstance from '../../utils/axios';
import Cookies from 'js-cookie';
import Circles from "../Shared/Circles";
import GlobalToast from '../Shared/Toast';
import { FalidtoFetch } from '../Shared/Loading';

const Analysis = () => {

    const [analysisDataState, setAnalysisDataState] = useState({})
    const { setLoading } = useContext(Context)

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

    // Get All Analysis
    const getAllAnalysisData = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/analysis-data', {
                headers: { token: Cookies.get('token') }
            })
            setAnalysisDataState(response.data.data)
        } catch (error) {
            if (error.response && error.response.data) {
                GlobalToast('error', 'Oops! Some thing wrong, try to reload')
            }
        }
        finally { setLoading(false) }
    }
    useEffect(() => {
        getAllAnalysisData()
    }, [])

    return (
        <div className='flex flex-wrap items-center justify-center mt-3 gap-7 p-4 '>

            {Object.entries(analysisDataState)
                .length == 0 ? <FalidtoFetch /> :
                Object.entries(analysisDataState).map((analys, index) => (
                    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                        key={index} className={`w-[30%] h-28 p-4 relative flex overflow-hidden gap-1 items-center my-1 rounded-3xl bg-card border-r-4 border-b-4
                            ${index >= Object.entries(analysisDataState).length - 2 ? 'w-[40%]' : ''}`}
                    >
                        <span className='w-12 h-12 p-2 rounded-lg flex items-center justify-center text-orange opacity-70 bg-sidebar '>
                            {iconsArray[index] && iconsArray[index].icon}
                        </span>

                        <div className='w-full h-full flex flex-col gap-y-1 mx-2'>
                            <h1 className='mt-3 text-2xl font-black text-dark font-alkatra'>{analys[0]}</h1>
                            <span className="w-max h-auto text-2xl text-orange font-alkatra px-2.5 py-0.5 rounded-lg">
                                {analys[1]}
                            </span>
                        </div>

                        {/* Circles */}
                        <Circles className1={"-right-8 -bottom-2 w-14 bg-sidebar h-14"} className2={'right-4 w-4 h-4 bg-sidebar'} className3={'right-2 w-1 h-1 bg-sidebar '} />

                    </motion.div>
                ))}
        </div>

    )
}

export default Analysis




