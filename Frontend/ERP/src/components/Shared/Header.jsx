import React, { useContext, useEffect } from 'react'
import Search from './Search'
import { motion } from "framer-motion";
import { Context } from '../Context/Context';

const Header = (props) => {

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
            className='bg-dark border-l-4 border-l-light border-b-4 border-b-light rounded-l-3xl font-montserrat w-full p-4 h-36 flex flex-col justify-start items-center'>
            <div className=' flex items-center w-1/2 justify-between text-orange'>
                <h1 className='text-3xl'><b>Dashboard</b></h1>
                <p className='relative ml-10 text-xl 
                before:absolute before:bg-[#4bb543] before:top-2 before:-left-6 before:w-4 before:h-4 before:rounded-full before:animate-pulse'
                >{props.dataSpecificAdmin.email && props.dataSpecificAdmin.email || "..."}</p>

            </div>

            {/* Search */}
            <Search />

        </motion.div>
    )
}

export default Header