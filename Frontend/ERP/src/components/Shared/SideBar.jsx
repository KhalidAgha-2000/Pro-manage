import React, { useContext, useEffect, useState } from 'react'
import { FaProjectDiagram } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { IoMdAnalytics } from "react-icons/io";
import { MdAdminPanelSettings, MdGroupAdd } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { HiOutlineLogout } from 'react-icons/hi'
import { SiGoogleanalytics } from 'react-icons/si'
import NavItem from './NavItem';
import axios from 'axios';
import { Context } from '../Context/Context';
import { motion } from "framer-motion";


const SideBar = (props) => {

    return (

        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }} className='sticky top-0 flex flex-col w-1/4 min-h-max
         text-light py-1 px-3 overflow-hidden bg-dark rounded-r-3xl
         ' >

            {/* SideBar -- SideNav */}

            <header className='relative flex flex-col items-center justify-center gap-3
             py-2 pb-15 bg-light text-dark rounded-xl my-6 border-4 border-orange'>
                <div className="profile h-20 aspect-square border-4 border-orange rounded-full ">
                    {
                        props.dataSpecificAdmin.image &&
                        <img
                            src={props.dataSpecificAdmin.image}
                            alt="admin-image"
                            className="profile--image h-full aspect-square rounded-full object-cover" />
                        || <MdAdminPanelSettings className='text-orange w-full h-full' />
                    }
                </div>
                <span className='text-xl font-semibold font-montserrat text-orange uppercase'>
                    {props.dataSpecificAdmin.username && props.dataSpecificAdmin.username || "..."}
                </span>
            </header>

            {/* Dashboard Links */}
            <div className="divider relative m-auto h-[1px] w-4/5 bg-light"></div>

            <NavItem title='Analysis' Icon={SiGoogleanalytics} linkTo={'dashboard/Analysis'} />
            <NavItem title='Admins' Icon={MdAdminPanelSettings} linkTo={'dashboard/Admins'} />
            <NavItem title='Employees' Icon={MdGroupAdd} />
            <NavItem title='Teams' Icon={RiTeamFill} />
            <NavItem title='Projects' Icon={FaProjectDiagram} />
            <NavItem title='Reports' Icon={TbReportAnalytics} />
            <NavItem title='KPIs' Icon={IoMdAnalytics} />

            <div className="divider relative m-auto h-[1px] w-4/5 bg-light"></div>

            <NavItem title='Logout' Icon={HiOutlineLogout} />

        </motion.div>
    )
}

export default SideBar