import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Circles from '../Shared/Circles';

const ProjectCard = ({ _id, name, teamName, in_progress, numberOfEmployees, }) => {

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ y: [50, 0], opacity: [0, 0, 1] }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}
            key={_id} className='mt-10 w-[32%] h-fit max-w-sm relative overflow-hidden bg-dark flex flex-col justify-center items-start  text-sidebar p-4 cursor-pointer rounded-xl'>
            <Link to={"/dashboard/projects/project/" + _id}>

                <div className='m-auto h-1/2  ml-10 flex items-center '>
                    <span className="rounded-full w-28 h-28 bg-sidebar z-10 flex items-center justify-center text-dark uppercase text-6xl font-alkatra shadow-sidebar shadow-lg">{name.charAt(0)}</span>
                    <span className="rounded-full w-28 h-28 bg-white transform -translate-x-6 z-0 flex items-center justify-center text-dark uppercase text-6xl font-alkatra shadow-sidebar shadow-lg">{teamName && teamName.charAt(0) || "N/A"}</span>
                </div>
                {/* Name */}
                <h1 className='w-3/4 h-auto text-xl mt-4 uppercase m-auto text-center truncate font-montserrat text-sidebar'>{name}</h1>

                {/* Team, Status, Employees Count */}
                <div className='w-full auto flex flex-col justify-start gap-y-1 mt-1'>
                    <h2 className='text-lg mx-1 w-3/4 truncate uppercase font-montserrat text-orange'>{teamName && teamName || "N/A"}</h2>
                    <div className='flex'>
                        <input type="checkbox" name="inProgress" id="inProgress" readOnly
                            className='accent-orange w-4 mx-1'
                            checked={in_progress ? true : false}
                        />
                        <p >in_progress</p>
                    </div>

                    <p><span className='bg-orange text-sidebar px-1 mx-1 rounded-sm'>{numberOfEmployees}</span>Employee(s)</p>

                </div>

                {/* Circles */}
                <Circles className1={'-right-2 -top-2 w-10 h-10 bg-sidebar '} className2={'right-0 top-10 w-4 h-4 bg-sidebar '} />

            </Link>
        </motion.div>
    )
}

export default ProjectCard