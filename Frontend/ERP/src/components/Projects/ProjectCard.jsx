import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import Circles from '../Shared/Circles';
import { IoMdArchive, IoMdInformationCircle } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
import { AiOutlineEdit, AiOutlineStop } from "react-icons/ai";
import { MdOutlineNumbers } from "react-icons/md";
import { IoFastFood, IoPeopleCircleOutline } from "react-icons/io5";
import { TbLetterX } from "react-icons/tb";

const ProjectCard = ({ _id, data, changeProjectStatus }) => {

    const [moreSettings, setMoreSettings] = useState(false)

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ y: [50, 0], opacity: [0, 0, 1] }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}
            key={_id} className='mt-10 w-[30%] h-fit max-w-sm relative overflow-hidden bg-card flex flex-col justify-center items-start gap-y-6  text-dark p-4 rounded-xl border-r-4 border-b-4'>

            {/* Circles */}
            <Circles className1={'-right-8 -bottom-2 w-14 h-14 bg-sidebar'} className2={'right-4 bottom-10 w-4 h-4 bg-sidebar'} className3={'right-7 bottom-3 w-1 h-1 bg-sidebar '} />

            {/* Name */}
            <h1 className='w-3/4 h-auto text-3xl mt-4 uppercase m-auto text-center truncate font-montserrat font-semibold text-dark'>{data.name}</h1>
            <div className='w-11/12 m-auto relative shadow-sm shadow-light h-fit rounded-md font-bold text-lg flex flex-col gap-y-2 p-2 justify-start items-start'>

                {/* Team */}
                <div className='inline-flex gap-x-2 w-full uppercase'>
                    <IoPeopleCircleOutline size={25} color='#e04e17' />{data.teamName && data.teamName || "N/A"}
                </div>

                {/* Employees number */}
                <div className='inline-flex gap-x-2 w-full '>
                    <MdOutlineNumbers size={25} color='#e04e17' />
                    <span className='truncate'>{data.numberOfEmployees && data.numberOfEmployees || '0'} Employee(s)</span>
                </div>

                {/* Archived \\ Progress */}
                {!data.archive.archived ?
                    <div className='inline-flex gap-x-2 w-full'>
                        {data.in_progress ? <GiProgression size={25} color='#4bb543' />
                            : <AiOutlineStop size={25} color="#ff3333" />}<p>{data.in_progress ? "in_progress" : "inactive"}</p>
                    </div>
                    :
                    <div className='inline-flex gap-x-2 font-bold w-full '>
                        <IoMdArchive size={24} color='#4bb543' /> <span>{data.archive.arcivedDate}</span>
                    </div>
                }

                {/* More..... */}
                <div className='inline-flex gap-x-2 w-full '>
                    <AiOutlineEdit
                        onClick={() => { setMoreSettings(!moreSettings) }}
                        size={25} color='#e04e17' cursor='pointer' className='hover:scale-150  transition duration-200 ease-in-out' />
                    More...
                </div>

                {/* More Settings dialog */}
                <AnimatePresence>
                    {moreSettings &&
                        <motion.div
                            initial={{ opacity: 0, y: '100%', x: '-100%', width: 0, height: 0 }}
                            animate={{ opacity: 1, y: 0, x: 0, width: '100%', height: '100%' }}
                            exit={{ opacity: 0, y: '100%', x: '-100%', width: 0, height: 0 }}
                            transition={{ duration: 0.7 }}
                            className='w-full h-full  text-dark p-3 rounded-md bg-light absolute bottom-1 left-1'>
                            <TbLetterX size={20}
                                onClick={() => { setMoreSettings(!moreSettings) }}
                                cursor={'pointer'} color="#e04e17" className='absolute top-2 right-2' />
                            <ul className=' space-y-2'>
                                <li className='cursor-pointer text-lg w-fit font-bold font-montserrat text-dark hover:bg-orange rounded-md px-2 hover:scale-105 transition duration-200 ease-in-out '>- Fix Name</li>
                                <li className='cursor-pointer text-lg w-fit font-bold font-montserrat text-dark hover:bg-orange rounded-md px-2 hover:scale-105 transition duration-200 ease-in-out '>- Change Status</li>
                                <li className='cursor-pointer text-lg w-fit font-bold font-montserrat text-dark hover:bg-orange rounded-md px-2 hover:scale-105 transition duration-200 ease-in-out '>- Send to Archive</li>
                                <li className='cursor-pointer text-lg w-fit font-bold font-montserrat text-dark hover:bg-orange rounded-md px-2 hover:scale-105 transition duration-200 ease-in-out '>- Team Settings</li>
                            </ul>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>

        </motion.div>
    )
}

export default ProjectCard