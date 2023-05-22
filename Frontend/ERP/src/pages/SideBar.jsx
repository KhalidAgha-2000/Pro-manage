import React, { useState } from 'react'
import { FaProjectDiagram } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { IoMdAnalytics } from "react-icons/io";
import { MdAdminPanelSettings, MdGroupAdd } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { HiOutlineLogout } from 'react-icons/hi'
import { SiGoogleanalytics } from 'react-icons/si'
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logout from '../utils/logout';
import Circles from '../components/Shared/Circles';


const SideBar = () => {
    const [activeNavItem, setActiveNavItem] = useState('Analysis');
    const navigate = useNavigate()
    const location = useLocation()
    const navItems = [
        { title: "analysis", linkTo: "dashboard/analysis", icon: SiGoogleanalytics },
        { title: "admins", linkTo: "dashboard/admins", icon: MdAdminPanelSettings },
        { title: "employees", linkTo: "dashboard/employees", icon: MdGroupAdd },
        { title: "teams", linkTo: "dashboard/teams", icon: RiTeamFill },
        { title: "projects", linkTo: "dashboard/projects", icon: FaProjectDiagram },
        { title: "reports", linkTo: "ZZZ", icon: TbReportAnalytics },
        { title: "KPIs", linkTo: "dashboard/kpis", icon: IoMdAnalytics },
    ]

    return (

        <motion.div
            initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
            className='sticky top-0 flex flex-col justify-center w-[20%] min-h-max text-light pt-10 px-3 overflow-hidden bg-sidebar'>

            {/* Dashboard Links */}
            <div className=''>
                {navItems.map((n, index) => (
                    <Link to={`/${n.linkTo}`} key={index}>
                        <div onClick={() => setActiveNavItem(n.linkTo)}
                            className={`nav__item relative flex justify-start items-center text-light gap-10 py-3 px-10 rounded-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-light hover:text-dark hover:scale-105
                                          ${n.title === activeNavItem || location.pathname.includes(n.linkTo) ? 'bg-light' : ""}`}>

                            {/* {n.icon} */}
                            <n.icon size={25} color='#e04e17' />
                            <h2 className='text-base uppercase font-semibold text-dark font-montserrat'>{n.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>

            <div onClick={logout}
                className='relative flex justify-start items-center mt-20 text-dark gap-10 py-3 px-10 rounded-xl overflow-hidden cursor-pointer transition duration-200 ease-in-out hover:bg-light hover:text-orange'>
                <HiOutlineLogout size={25} color='#e04e17' />
                <h2 className='text-base font-semibold font-montserrat'>Logut</h2>
            </div>

            {/* Circles */}
            <Circles className1={'-left-6 -bottom-4 w-14 h-14 bg-orange'} className2={'left-7 bottom-7 w-4 h-4 bg-orange'} className3={'left-4 bottom-10 w-2 h-2 bg-orange'} />

        </motion.div >
    )
}

export default SideBar