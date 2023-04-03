import React, { useContext, useEffect } from 'react'
import Search from './Search'
import { motion } from "framer-motion";
import { Context } from '../Context/Context';
import { MdAdminPanelSettings } from 'react-icons/md';

const Header = (props) => {

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
            className=' relative  rounded-b-lg font-montserrat w-full px-10 h-36 flex  justify-around items-center
            bg-light shadow-md shadow-[#dfd6d3] border-b-2
            '>

            <div className="w-1/2 h-max flex items-center ">
                {/* Profile Image */}
                <div className='w-1/5'>
                    <div className={`profile relative w-20 h-20 rounded-full my-2
                ${props.dataSpecificAdmin.image && "after:absolute after:bg-green-500 after:w-3 after:h-3  after:bottom-1 after:right-3 after:rounded-full"}
                `}
                    >
                        {
                            props.dataSpecificAdmin.image &&
                            <img
                                src={props.dataSpecificAdmin.image}
                                alt="admin-image"
                                className="profile--image relative border-2 h-full w-full rounded-full object-cover object-center"
                            />
                            || <MdAdminPanelSettings className='text-orange border-2 rounded-full w-full h-full' />
                        }
                    </div>
                </div>

                {/* Profile Data */}
                <div className="flex flex-col w-4/5 p-2 font-montserrat font-semibold  h-auto">
                    <span className='uppercase'>
                        {props.dataSpecificAdmin.username && props.dataSpecificAdmin.username || "..."}
                    </span>
                    <span className='whitespace-normal  break-words'>
                        {props.dataSpecificAdmin.email && props.dataSpecificAdmin.email || "..."}
                    </span>
                </div>

            </div>

            {/* right */}
            <span className='absolute -right-4 -top-2 w-14 h-14 object-cover bg-[#dfd6d3] rounded-full'></span>
            <span className='absolute right-10 top-6 w-4 h-4 object-cover bg-[#dfd6d3] rounded-full'></span>
            <span className='absolute right-8 top-10 w-2 h-2 object-cover bg-[#dfd6d3] rounded-full'></span>

            {/* Search */}
            <Search />

        </motion.div >
    )
}

export default Header