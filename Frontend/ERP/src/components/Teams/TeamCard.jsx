import React from 'react'
import { motion } from "framer-motion";
import Circles from '../Shared/Circles';
import { Link } from 'react-router-dom';
const TeamCard = ({ data, _id }) => {

    return (
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}
            className='w-[32%] relative h-fit max-w-sm p-5 flex flex-col gap-y-1 rounded-lg shadow-lg font-montserrat overflow-hidden
            bg-card border-r-4 border-b-4
            cursor-pointer hover:scale-105 hover:z-10 transition-all duration-300
            '
            key={_id}>

            <Link to={"/dashboard/teams/team/" + _id}>
                <div className='w-full h-1/4 my-2 flex items-center'>
                    <span className='w-20 h-20 text-6xl uppercase font-alkatra flex items-center justify-center rounded-full bg-light'>{data.name.charAt(0)}</span>
                    {/* Numbers */}
                    <div className='flex flex-col p-4 w-auto h-fit '>
                        <h1 className='text-dark text-xl font-montserrat'><span className='w-1 h-1 px-2 mx-1 rounded-full'>{data.numberOfEmployees}</span>Employees</h1>
                        <h1 className='text-orange text-xl font-montserrat'><span className='w-1 h-1 px-2 mx-1 rounded-full'>{data.numberOfProjects}</span>Projects</h1>
                    </div>
                </div>

                <h1 className='text-dark font-semibold font-alkatra w-3/4 m-auto truncate text-2xl text-center uppercase'>{data.name}</h1>

            </Link>

            {/* Circles */}
            <Circles className1={'-right-1 -bottom-2 w-10 h-10 bg-sidebar'} className2={'-right-2 bottom-8 w-4 h-4 bg-sidebar'} />

        </motion.div >
    )
}

export default TeamCard


